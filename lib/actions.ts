"use server";

import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { correctAnswerText, isCorrect, passingScore, QUESTIONS } from "@/content";
import type { Lesson } from "@/content/types";
import { createSession, destroySession, requireStudent, requireTeacher } from "@/lib/auth";
import { attempts, classes, db, lessonCompletions, sessions, students, teachers } from "@/lib/db";
import { normalizeAccessCode } from "@/lib/access-code";
import { hashSecret, newAccessCode, verifySecret } from "@/lib/secrets";

/**
 * `success` vira toast no cliente. `fields` devolve o que foi digitado: o React limpa o
 * formulário depois da action, e ninguém quer redigitar o e-mail por causa de uma senha errada.
 */
export type FormState = { error?: string; success?: string; fields?: Record<string, string> } | undefined;

// ponytail: sem limite de tentativas por IP no login do aluno; o código de 8 caracteres
// (~1 trilhão de combinações) torna adivinhar inviável. Adicionar se o sistema for exposto em escala.
export async function studentLogin(_: FormState, form: FormData): Promise<FormState> {
  const code = normalizeAccessCode(String(form.get("code") ?? ""));
  const fields = { code: String(form.get("code") ?? "") };
  if (code.length !== 8) return { error: "O código tem 8 letras e números, como K7XQ-2MPA.", fields };

  const [student] = await db.select({ id: students.id }).from(students).where(eq(students.accessCode, code));
  if (!student) return { error: "Código não encontrado. Confira com seu professor.", fields };

  await createSession({ studentId: student.id });
  redirect("/aluno");
}

// Professores são criados direto no banco (pnpm teacher:create), não pela interface.
// ponytail: sem limite de tentativas no login do professor; adicionar se virar alvo
// Hash descartável: e-mail inexistente também paga um scrypt, para o tempo de resposta não revelar quais e-mails existem.
const DUMMY_HASH = hashSecret(crypto.randomUUID());

export async function teacherLogin(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  const [teacher] = await db.select().from(teachers).where(eq(teachers.email, email));
  if (!(await verifySecret(password, teacher?.passwordHash ?? (await DUMMY_HASH))) || !teacher)
    return { error: "E-mail ou senha incorretos.", fields: { email } };

  await createSession({ teacherId: teacher.id });
  redirect("/professor");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function createClass(_: FormState, form: FormData): Promise<FormState> {
  const teacher = await requireTeacher();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return { error: "Dê um nome para a turma (ex.: 9º ano A)." };

  await db.insert(classes).values({ teacherId: teacher.id, name });
  revalidatePath("/professor");
  return { success: `Turma ${name} criada. Agora cadastre os alunos.` };
}

/** Turmas do professor logado, para checar posse antes de mexer em alunos. */
async function ownedClassIds() {
  const teacher = await requireTeacher();
  return db.select({ id: classes.id }).from(classes).where(eq(classes.teacherId, teacher.id));
}

const MAX_NAME = 60;
const MAX_PER_SUBMIT = 60;

/** Cadastra alunos (um nome por linha) e gera o código de acesso de cada um. */
export async function addStudents(classId: string, _: FormState, form: FormData): Promise<FormState> {
  const owned = await ownedClassIds();
  if (!owned.some((c) => c.id === classId)) return { error: "Turma não encontrada." };

  const names = String(form.get("names") ?? "")
    .split("\n")
    .map((n) => n.trim().replace(/\s+/g, " "))
    .filter(Boolean);
  if (!names.length) return { error: "Escreva pelo menos um nome, um por linha." };
  if (names.length > MAX_PER_SUBMIT) return { error: `Cadastre no máximo ${MAX_PER_SUBMIT} alunos por vez.` };
  if (names.some((n) => n.length > MAX_NAME)) return { error: `Cada nome pode ter até ${MAX_NAME} caracteres.` };

  // Colisão de código é rarísima; se acontecer, só os que falharam ganham código novo.
  let pending = names;
  for (let i = 0; i < 3 && pending.length; i++) {
    const inserted = await db
      .insert(students)
      .values(pending.map((name) => ({ classId, name, accessCode: newAccessCode() })))
      .onConflictDoNothing()
      .returning({ name: students.name });
    const done = inserted.map((r) => r.name);
    pending = pending.filter((n) => {
      const k = done.indexOf(n);
      if (k < 0) return true;
      done.splice(k, 1);
      return false;
    });
  }
  if (pending.length) return { error: "Não foi possível gerar alguns códigos. Tente de novo." };

  revalidatePath("/professor", "layout");
  return { success: names.length === 1 ? `${names[0]} cadastrado.` : `${names.length} alunos cadastrados.` };
}

/** Troca o código do aluno (ex.: vazou). O código antigo para de funcionar e as sessões abertas caem. */
export async function newStudentCode(studentId: string) {
  const owned = db.select({ id: classes.id }).from(classes).where(eq(classes.teacherId, (await requireTeacher()).id));
  for (let i = 0; i < 3; i++) {
    const code = newAccessCode();
    const [updated] = await db
      .update(students)
      .set({ accessCode: code })
      .where(and(eq(students.id, studentId), inArray(students.classId, owned)))
      .returning({ id: students.id })
      .catch(() => []); // colisão de código único: tenta outro
    if (updated) {
      await db.delete(sessions).where(eq(sessions.studentId, studentId));
      revalidatePath("/professor", "layout");
      return code;
    }
  }
  throw new Error("Não foi possível gerar o código");
}

/** Remove o aluno e todo o progresso dele (sessões, tentativas e conclusões caem por ON DELETE CASCADE). */
export async function removeStudent(studentId: string) {
  const owned = db.select({ id: classes.id }).from(classes).where(eq(classes.teacherId, (await requireTeacher()).id));
  await db.delete(students).where(and(eq(students.id, studentId), inArray(students.classId, owned)));
  revalidatePath("/professor", "layout");
}

/** Apaga a turma; o ON DELETE CASCADE leva junto alunos, sessões, tentativas e conclusões. */
export async function removeClass(classId: string) {
  const teacher = await requireTeacher();
  await db.delete(classes).where(and(eq(classes.id, classId), eq(classes.teacherId, teacher.id)));
  revalidatePath("/professor", "layout");
  redirect("/professor");
}

/** Corrige o nome do aluno sem mexer no código de acesso nem no progresso. */
export async function renameStudent(studentId: string, rawName: string): Promise<FormState> {
  const name = rawName.trim().replace(/\s+/g, " ");
  if (!name) return { error: "O nome não pode ficar vazio." };
  if (name.length > MAX_NAME) return { error: `O nome pode ter até ${MAX_NAME} caracteres.` };

  const owned = db.select({ id: classes.id }).from(classes).where(eq(classes.teacherId, (await requireTeacher()).id));
  const [updated] = await db
    .update(students)
    .set({ name })
    .where(and(eq(students.id, studentId), inArray(students.classId, owned)))
    .returning({ id: students.id });
  if (!updated) return { error: "Aluno não encontrado." };
  revalidatePath("/professor", "layout");
  return { success: `Nome alterado para ${name}.` };
}

export async function answerQuestion(questionId: string, answer: number) {
  const student = await requireStudent();
  const found = QUESTIONS.get(questionId);
  if (!found) throw new Error("Questão não encontrada");
  const { skill, lesson, question } = found;

  const correct = isCorrect(question, answer);
  await db.insert(attempts).values({
    studentId: student.id,
    skillCode: skill.code,
    lessonId: lesson.id,
    questionId,
    correct,
  });
  return {
    correct,
    correctAnswer: correctAnswerText(question),
    why: question.why,
    lesson: await updateCompletion(student.id, lesson),
  };
}

/**
 * Recalcula a lição pela última tentativa de cada questão dela. Conclui quando todas foram
 * respondidas e os acertos chegam a 60%; vale também para acertos feitos na revisão.
 * Uma lição concluída nunca "desconclui", e guarda a melhor nota.
 */
async function updateCompletion(studentId: string, lesson: Lesson) {
  const ids = lesson.questions.map((q) => q.id);
  const latest = await db
    .selectDistinctOn([attempts.questionId], { correct: attempts.correct })
    .from(attempts)
    .where(and(eq(attempts.studentId, studentId), inArray(attempts.questionId, ids)))
    .orderBy(attempts.questionId, desc(attempts.createdAt));

  const total = ids.length;
  const score = latest.filter((a) => a.correct).length;
  const passed = latest.length === total && score >= passingScore(total);
  if (passed) {
    await db
      .insert(lessonCompletions)
      .values({ studentId, lessonId: lesson.id, score })
      .onConflictDoUpdate({
        target: [lessonCompletions.studentId, lessonCompletions.lessonId],
        set: { score: sql`greatest(${lessonCompletions.score}, excluded.score)`, completedAt: new Date() },
      });
    // Sem revalidatePath: re-renderizar a rota no meio do quiz desmontaria a revisão.
    // As páginas do aluno são dinâmicas e já buscam dados novos a cada navegação.
  }
  return { score, total, passed, needed: passingScore(total) };
}
