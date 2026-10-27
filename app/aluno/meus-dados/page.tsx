import { count, eq, max, min } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { requireStudent } from "@/lib/auth";
import { attempts, classes, db, lessonCompletions, students, teachers } from "@/lib/db";
import { STUDENT_SESSION_HOURS } from "@/lib/privacy";

export const metadata: Metadata = { title: "Meus dados" };

const date = (d: Date | null) => (d ? d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "–");

/** O que o sistema guarda sobre o aluno logado (LGPD art. 18, II). */
export default async function MyDataPage() {
  const student = await requireStudent();
  const [[info], [answers], [lessons]] = await Promise.all([
    db
      .select({ createdAt: students.createdAt, teacher: teachers.name })
      .from(students)
      .innerJoin(classes, eq(classes.id, students.classId))
      .innerJoin(teachers, eq(teachers.id, classes.teacherId))
      .where(eq(students.id, student.id)),
    db
      .select({ total: count(), first: min(attempts.createdAt), last: max(attempts.createdAt) })
      .from(attempts)
      .where(eq(attempts.studentId, student.id)),
    db.select({ total: count() }).from(lessonCompletions).where(eq(lessonCompletions.studentId, student.id)),
  ]);

  const rows: [string, string][] = [
    ["Nome", student.name],
    ["Turma", student.className],
    ["Professor", info.teacher],
    ["Cadastrado em", date(info.createdAt)],
    ["Código de acesso", "Guardado para você entrar. Não mostramos aqui; está no seu cartão."],
    [
      "Respostas aos exercícios",
      answers.total
        ? `${answers.total} (de ${date(answers.first)} a ${date(answers.last)}): qual questão, se acertou e quando`
        : "Nenhuma ainda",
    ],
    ["Lições concluídas", `${lessons.total}, com a nota de cada uma`],
    ["Sessão", `Um cookie mantém você logado até fechar o navegador (no máximo ${STUDENT_SESSION_HOURS} horas), ou até você sair`],
  ];

  return (
    <div className="space-y-6">
      <BackLink href="/aluno">Seu mapa</BackLink>
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Meus dados</h1>
        <p className="text-muted-foreground">Isto é tudo o que o site guarda sobre você.</p>
      </div>
      <dl className="divide-y overflow-hidden rounded-2xl border bg-white">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 p-4 sm:grid-cols-[12rem_1fr]">
            <dt className="font-bold">{label}</dt>
            <dd className="text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="max-w-[60ch]">
        Nome errado? Quer uma cópia dos seus dados ou que eles sejam apagados? Fale com seu professor. Para saber mais,
        leia a{" "}
        <Link href="/privacidade" className="font-semibold underline underline-offset-4">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
