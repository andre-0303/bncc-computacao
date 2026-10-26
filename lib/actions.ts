"use server";

import { randomInt } from "node:crypto";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { correctAnswerText, isCorrect, QUESTIONS } from "@/content";
import {
  createSession,
  destroySession,
  hashSecret,
  requireStudent,
  requireTeacher,
  verifySecret,
} from "@/lib/auth";
import { attempts, classes, db, lessonCompletions, students, teachers } from "@/lib/db";

export type FormState = { error?: string } | undefined;

const MAX_FAILED_LOGINS = 5;

export async function studentLogin(_: FormState, form: FormData): Promise<FormState> {
  const code = String(form.get("code") ?? "").trim().toUpperCase();
  const nickname = String(form.get("nickname") ?? "").trim();
  const pin = String(form.get("pin") ?? "");

  if (nickname.length < 2 || nickname.length > 20) return { error: "O apelido precisa ter de 2 a 20 letras." };
  if (!/^\d{4}$/.test(pin)) return { error: "O PIN precisa ter 4 números." };

  const [klass] = await db.select().from(classes).where(eq(classes.code, code));
  if (!klass) return { error: "Turma não encontrada. Confira o código com seu professor." };

  const [student] = await db
    .select()
    .from(students)
    .where(and(eq(students.classId, klass.id), eq(sql`lower(${students.nickname})`, nickname.toLowerCase())));

  if (!student) {
    const [created] = await db
      .insert(students)
      .values({ classId: klass.id, nickname, pinHash: await hashSecret(pin) })
      .returning({ id: students.id });
    await createSession({ studentId: created.id });
    redirect("/aluno");
  }

  if (student.failedLogins >= MAX_FAILED_LOGINS)
    return { error: "Acesso bloqueado por muitas tentativas. Peça ao professor para resetar seu PIN." };

  if (student.pinHash && !(await verifySecret(pin, student.pinHash))) {
    await db
      .update(students)
      .set({ failedLogins: student.failedLogins + 1 })
      .where(eq(students.id, student.id));
    return { error: "PIN incorreto. Se esse apelido não é seu, escolha outro." };
  }

  // PIN nulo = resetado pelo professor: o PIN digitado agora vira o novo.
  await db
    .update(students)
    .set({ failedLogins: 0, pinHash: student.pinHash ?? (await hashSecret(pin)) })
    .where(eq(students.id, student.id));
  await createSession({ studentId: student.id });
  redirect("/aluno");
}

export async function teacherSignup(_: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  if (!name || !email.includes("@")) return { error: "Preencha nome e e-mail." };
  if (password.length < 8) return { error: "A senha precisa ter pelo menos 8 caracteres." };

  const [created] = await db
    .insert(teachers)
    .values({ name, email, passwordHash: await hashSecret(password) })
    .onConflictDoNothing()
    .returning({ id: teachers.id });
  if (!created) return { error: "Já existe uma conta com esse e-mail." };

  await createSession({ teacherId: created.id });
  redirect("/professor");
}

// ponytail: sem limite de tentativas no login do professor; adicionar se virar alvo
export async function teacherLogin(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  const [teacher] = await db.select().from(teachers).where(eq(teachers.email, email));
  if (!teacher || !(await verifySecret(password, teacher.passwordHash)))
    return { error: "E-mail ou senha incorretos." };

  await createSession({ teacherId: teacher.id });
  redirect("/professor");
}

export async function logout() {
  await destroySession();
  redirect("/");
}

// Sem 0/O/1/I para não confundir na hora de copiar do quadro.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export async function createClass(_: FormState, form: FormData): Promise<FormState> {
  const teacher = await requireTeacher();
  const name = String(form.get("name") ?? "").trim();
  if (!name) return { error: "Dê um nome para a turma (ex.: 9º ano A)." };

  for (let i = 0; i < 5; i++) {
    const code = Array.from({ length: 6 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join("");
    const [created] = await db
      .insert(classes)
      .values({ teacherId: teacher.id, name, code })
      .onConflictDoNothing()
      .returning();
    if (created) {
      revalidatePath("/professor");
      return;
    }
  }
  return { error: "Não foi possível gerar o código. Tente de novo." };
}

export async function resetStudentPin(studentId: string) {
  const teacher = await requireTeacher();
  const owned = db
    .select({ id: classes.id })
    .from(classes)
    .where(eq(classes.teacherId, teacher.id));
  await db
    .update(students)
    .set({ pinHash: null, failedLogins: 0 })
    .where(and(eq(students.id, studentId), inArray(students.classId, owned)));
  revalidatePath("/professor/turma/[id]", "page");
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
  return { correct, correctAnswer: correctAnswerText(question), why: question.why };
}

export async function completeLesson(lessonId: string) {
  const student = await requireStudent();
  const latest = await db
    .selectDistinctOn([attempts.questionId], { correct: attempts.correct })
    .from(attempts)
    .where(and(eq(attempts.studentId, student.id), eq(attempts.lessonId, lessonId)))
    .orderBy(attempts.questionId, desc(attempts.createdAt));
  const score = latest.filter((a) => a.correct).length;

  await db
    .insert(lessonCompletions)
    .values({ studentId: student.id, lessonId, score })
    .onConflictDoUpdate({
      target: [lessonCompletions.studentId, lessonCompletions.lessonId],
      set: { score, completedAt: new Date() },
    });
  revalidatePath("/aluno", "layout");
  return score;
}
