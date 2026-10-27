import { Printer, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { LINE } from "@/components/metro";
import { AddStudentsForm } from "@/components/professor/add-students-form";
import { StudentActions } from "@/components/professor/student-actions";
import { TeacherHeader } from "@/components/professor/teacher-header";
import { buttonVariants } from "@/components/ui/button";
import { SKILLS } from "@/content";
import { formatAccessCode } from "@/lib/access-code";
import { requireTeacher } from "@/lib/auth";
import { classReport, ownedClass } from "@/lib/queries";
import { cn } from "@/lib/utils";

const pct = (hits: number, total: number) => (total ? Math.round((hits / total) * 100) : null);

function tally(rows: { skillCode: string; correct: boolean }[], skillCode: string) {
  const answered = rows.filter((r) => r.skillCode === skillCode);
  return pct(answered.filter((r) => r.correct).length, answered.length);
}

/** Célula sem respostas mostra um traço; o leitor de tela ouve o texto. */
function percent(accuracy: number | null) {
  if (accuracy !== null) return `${accuracy}%`;
  return (
    <>
      <span aria-hidden>–</span>
      <span className="sr-only">sem respostas</span>
    </>
  );
}

/** Faixas do mapa de calor: abaixo de 50% pede atenção, 75% ou mais está bem. */
function heat(accuracy: number | null) {
  if (accuracy === null) return "bg-muted/60 text-muted-foreground";
  if (accuracy < 50) return "bg-bad-soft text-[#8f1d22]";
  if (accuracy < 75) return "bg-warn-soft text-[#6b5000]";
  return "bg-ok-soft text-[#0f4d2c]";
}

export async function generateMetadata({ params }: PageProps<"/professor/turma/[id]">): Promise<Metadata> {
  return { title: (await ownedClass((await params).id)).name };
}

export default async function ClassPage({ params }: PageProps<"/professor/turma/[id]">) {
  const { id } = await params;
  const teacher = await requireTeacher();
  const klass = await ownedClass(id);

  const { roster, completions, firstTry } = await classReport(klass.id);

  const classAccuracy = SKILLS.map((s) => ({ skill: s, accuracy: tally(firstTry, s.code) }));
  const weakest = classAccuracy
    .filter((s) => s.accuracy !== null)
    .sort((a, b) => a.accuracy! - b.accuracy!)[0];

  return (
    <>
      <TeacherHeader name={teacher.name} />
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8">
        <BackLink href="/professor">Turmas</BackLink>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{klass.name}</h1>
            <p className="text-muted-foreground">
              {roster.length === 1 ? "1 aluno" : `${roster.length} alunos`}
            </p>
          </div>
          {roster.length > 0 && (
            <Link
              href={`/professor/turma/${klass.id}/cartoes`}
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5" })}
            >
              <Printer aria-hidden />
              Imprimir códigos de acesso
            </Link>
          )}
        </div>

        {weakest && weakest.accuracy! < 75 && (
          <div className="flex items-start gap-3 rounded-xl border-2 border-ink bg-warn p-4 text-ink shadow-[4px_4px_0_var(--ink)]">
            <TriangleAlert className="mt-0.5 size-6 shrink-0" aria-hidden />
            <p>
              <strong>Vale retomar em aula: {weakest.skill.title}</strong> ({weakest.skill.code}). É a habilidade com
              menos acertos da turma, {weakest.accuracy}%.
            </p>
          </div>
        )}

        {roster.length ? (
          // rolável no celular: focável para rolar pelo teclado
          <div
            role="region"
            aria-label="Acertos por aluno e habilidade"
            tabIndex={0}
            className="overflow-x-auto rounded-2xl border bg-white"
          >
            <table className="w-full min-w-[900px] table-fixed border-separate border-spacing-1 p-2 text-sm">
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-32 bg-white px-2 pb-2 text-left align-bottom font-bold">
                    Aluno
                  </th>
                  {SKILLS.map((s) => (
                    <th key={s.code} scope="col" title={`${s.code}: ${s.title}`} className="px-1 pb-2 align-top font-bold">
                      <span className="mx-auto mb-1.5 block h-1.5 w-8 rounded-full" style={{ background: LINE[s.axis] }} aria-hidden />
                      {s.code.slice(-2)}
                      <span className="mt-0.5 line-clamp-2 block text-[11px] leading-tight font-semibold text-muted-foreground">
                        <span className="sr-only">: </span>
                        {s.title}
                      </span>
                    </th>
                  ))}
                  <th scope="col" className="w-32">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {roster.map((student) => {
                  const mine = firstTry.filter((r) => r.studentId === student.id);
                  const done = new Set(completions.filter((c) => c.studentId === student.id).map((c) => c.lessonId));
                  return (
                    <tr key={student.id}>
                      <th scope="row" className="sticky left-0 z-10 bg-white px-2 text-left text-base font-semibold">
                        <span className="block truncate" title={student.name}>
                          {student.name}
                        </span>
                        <span className="block font-mono text-xs font-normal tracking-wider text-muted-foreground">
                          <span className="sr-only">Código de acesso: </span>
                          {formatAccessCode(student.accessCode)}
                        </span>
                      </th>
                      {SKILLS.map((s) => {
                        const accuracy = tally(mine, s.code);
                        const lessons = s.lessons.filter((l) => done.has(l.id)).length;
                        return (
                          <td key={s.code} className={cn("rounded-lg px-1 py-2 text-center tabular-nums", heat(accuracy))}>
                            <span className="block text-base font-extrabold">{percent(accuracy)}</span>
                            <span className="block text-xs">
                              {lessons}/{s.lessons.length} lições
                            </span>
                          </td>
                        );
                      })}
                      <td className="pl-2 text-right">
                        <StudentActions studentId={student.id} name={student.name} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" className="sticky left-0 z-10 bg-white px-2 pt-2 text-left text-base font-bold">
                    Turma
                  </th>
                  {classAccuracy.map(({ skill, accuracy }) => (
                    <td
                      key={skill.code}
                      className={cn(
                        "rounded-lg px-1 py-2 text-center text-base font-extrabold tabular-nums",
                        heat(accuracy),
                        skill === weakest?.skill && "ring-2 ring-ink",
                      )}
                    >
                      {percent(accuracy)}
                    </td>
                  ))}
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="max-w-[60ch] space-y-2 rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-extrabold">Nenhum aluno cadastrado</h2>
            <p className="text-muted-foreground">
              Cadastre os alunos abaixo. Cada um recebe um código de acesso pessoal, que você imprime e entrega. Eles
              entram no site com esse código, sem senha nem e-mail.
            </p>
          </div>
        )}

        {roster.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>% de acerto na primeira tentativa de cada questão:</span>
            {[
              ["bg-bad-soft", "abaixo de 50%"],
              ["bg-warn-soft", "50 a 74%"],
              ["bg-ok-soft", "75% ou mais"],
              ["bg-muted", "ainda não respondeu"],
            ].map(([cls, label]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={cn("size-3.5 rounded", cls)} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        )}
        <section className="rounded-2xl border bg-white p-6">
          <AddStudentsForm classId={klass.id} />
        </section>
        {roster.length > 0 && (
          <p className="text-sm text-muted-foreground">
            O código de acesso fica embaixo do nome. Se um código vazar, use o botão de gerar novo: o antigo para de
            funcionar na hora.
          </p>
        )}
      </main>
    </>
  );
}
