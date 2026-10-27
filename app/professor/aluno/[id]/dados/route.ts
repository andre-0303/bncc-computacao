import { and, asc, eq } from "drizzle-orm";
import { requireTeacher } from "@/lib/auth";
import { attempts, classes, db, lessonCompletions, students } from "@/lib/db";

/** Cópia dos dados de um aluno em JSON (LGPD art. 18, acesso e portabilidade). Só para o professor da turma. */
export async function GET(_req: Request, ctx: RouteContext<"/professor/aluno/[id]/dados">) {
  const { id } = await ctx.params;
  const teacher = await requireTeacher();
  const [student] = await db
    .select({ name: students.name, className: classes.name, createdAt: students.createdAt })
    .from(students)
    .innerJoin(classes, eq(classes.id, students.classId))
    .where(and(eq(students.id, id), eq(classes.teacherId, teacher.id)))
    .catch(() => []); // id que não é uuid
  if (!student) return new Response("Aluno não encontrado.", { status: 404 });

  const [completions, answers] = await Promise.all([
    db
      .select({ lessonId: lessonCompletions.lessonId, score: lessonCompletions.score, completedAt: lessonCompletions.completedAt })
      .from(lessonCompletions)
      .where(eq(lessonCompletions.studentId, id))
      .orderBy(asc(lessonCompletions.completedAt)),
    db
      .select({
        skillCode: attempts.skillCode,
        lessonId: attempts.lessonId,
        questionId: attempts.questionId,
        correct: attempts.correct,
        createdAt: attempts.createdAt,
      })
      .from(attempts)
      .where(eq(attempts.studentId, id))
      .orderBy(asc(attempts.createdAt)),
  ]);

  // O código de acesso fica de fora de propósito: é credencial, e o arquivo pode ser repassado.
  const body = {
    exportadoEm: new Date(),
    aluno: { nome: student.name, turma: student.className, cadastradoEm: student.createdAt },
    licoesConcluidas: completions,
    respostas: answers,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="dados-aluno-${id.slice(0, 8)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
