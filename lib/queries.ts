import "server-only";
import { desc, eq, inArray } from "drizzle-orm";
import { attempts, db, lessonCompletions, students } from "@/lib/db";

export async function completedLessonIds(studentId: string) {
  const rows = await db
    .select({ lessonId: lessonCompletions.lessonId })
    .from(lessonCompletions)
    .where(eq(lessonCompletions.studentId, studentId));
  return new Set(rows.map((r) => r.lessonId));
}

/** Questões cujo último resultado do aluno foi erro. */
export async function wrongQuestionIds(studentId: string) {
  const latest = await db
    .selectDistinctOn([attempts.questionId], { questionId: attempts.questionId, correct: attempts.correct })
    .from(attempts)
    .where(eq(attempts.studentId, studentId))
    .orderBy(attempts.questionId, desc(attempts.createdAt));
  return latest.filter((a) => !a.correct).map((a) => a.questionId);
}

export async function classReport(classId: string) {
  const roster = await db
    .select({ id: students.id, nickname: students.nickname, locked: students.failedLogins })
    .from(students)
    .where(eq(students.classId, classId))
    .orderBy(students.nickname);
  const ids = roster.map((s) => s.id);
  if (!ids.length) return { roster, completions: [], latest: [] };

  const [completions, latest] = await Promise.all([
    db
      .select({ studentId: lessonCompletions.studentId, lessonId: lessonCompletions.lessonId })
      .from(lessonCompletions)
      .where(inArray(lessonCompletions.studentId, ids)),
    db
      .selectDistinctOn([attempts.studentId, attempts.questionId], {
        studentId: attempts.studentId,
        skillCode: attempts.skillCode,
        correct: attempts.correct,
      })
      .from(attempts)
      .where(inArray(attempts.studentId, ids))
      .orderBy(attempts.studentId, attempts.questionId, desc(attempts.createdAt)),
  ]);
  return { roster, completions, latest };
}
