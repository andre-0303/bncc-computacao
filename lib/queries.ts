import "server-only";
import { and, desc, eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { cache } from "react";
import { QUESTIONS, SKILLS } from "@/content";
import { requireTeacher } from "@/lib/auth";
import { attempts, classes, db, lessonCompletions, students } from "@/lib/db";

// Só conta o que ainda existe no conteúdo: questões ou lições removidas deixam de pesar no progresso.
const QUESTION_IDS = [...QUESTIONS.keys()];
const LESSON_IDS = SKILLS.flatMap((s) => s.lessons.map((l) => l.id));

/** Turma do professor logado; memoizada para a página e o título da aba não consultarem duas vezes. */
export const ownedClass = cache(async (id: string) => {
  const teacher = await requireTeacher();
  const [klass] = await db
    .select()
    .from(classes)
    .where(and(eq(classes.id, id), eq(classes.teacherId, teacher.id)));
  return klass ?? notFound();
});

/** lessonId → melhor nota da lição concluída */
export async function completedLessons(studentId: string) {
  const rows = await db
    .select({ lessonId: lessonCompletions.lessonId, score: lessonCompletions.score })
    .from(lessonCompletions)
    .where(and(eq(lessonCompletions.studentId, studentId), inArray(lessonCompletions.lessonId, LESSON_IDS)));
  return new Map(rows.map((r) => [r.lessonId, r.score]));
}

/** Questões cujo último resultado do aluno foi erro. */
export async function wrongQuestionIds(studentId: string) {
  const latest = await db
    .selectDistinctOn([attempts.questionId], { questionId: attempts.questionId, correct: attempts.correct })
    .from(attempts)
    .where(and(eq(attempts.studentId, studentId), inArray(attempts.questionId, QUESTION_IDS)))
    .orderBy(attempts.questionId, desc(attempts.createdAt));
  return latest.filter((a) => !a.correct).map((a) => a.questionId);
}

export async function classReport(classId: string) {
  const roster = await db
    .select({ id: students.id, name: students.name, accessCode: students.accessCode })
    .from(students)
    .where(eq(students.classId, classId))
    .orderBy(students.name);
  const ids = roster.map((s) => s.id);
  if (!ids.length) return { roster, completions: [], firstTry: [] };

  // O relatório conta a primeira tentativa: depois de errar o aluno vê a resposta certa,
  // então acertar na segunda não mostra que aprendeu.
  const [completions, firstTry] = await Promise.all([
    db
      .select({ studentId: lessonCompletions.studentId, lessonId: lessonCompletions.lessonId })
      .from(lessonCompletions)
      .where(and(inArray(lessonCompletions.studentId, ids), inArray(lessonCompletions.lessonId, LESSON_IDS))),
    db
      .selectDistinctOn([attempts.studentId, attempts.questionId], {
        studentId: attempts.studentId,
        skillCode: attempts.skillCode,
        correct: attempts.correct,
      })
      .from(attempts)
      .where(and(inArray(attempts.studentId, ids), inArray(attempts.questionId, QUESTION_IDS)))
      .orderBy(attempts.studentId, attempts.questionId, attempts.createdAt),
  ]);
  return { roster, completions, firstTry };
}
