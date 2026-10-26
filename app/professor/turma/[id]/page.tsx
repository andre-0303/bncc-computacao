import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SKILLS } from "@/content";
import { resetStudentPin } from "@/lib/actions";
import { requireTeacher } from "@/lib/auth";
import { classes, db } from "@/lib/db";
import { classReport } from "@/lib/queries";
import { cn } from "@/lib/utils";

const pct = (hits: number, total: number) => (total ? Math.round((hits / total) * 100) : null);

function tally(rows: { skillCode: string; correct: boolean }[], skillCode: string) {
  const answered = rows.filter((r) => r.skillCode === skillCode);
  return pct(answered.filter((r) => r.correct).length, answered.length);
}

export default async function ClassPage({ params }: PageProps<"/professor/turma/[id]">) {
  const { id } = await params;
  const teacher = await requireTeacher();
  const [klass] = await db
    .select()
    .from(classes)
    .where(and(eq(classes.id, id), eq(classes.teacherId, teacher.id)));
  if (!klass) notFound();

  const { roster, completions, latest } = await classReport(klass.id);

  const classAccuracy = SKILLS.map((s) => ({ code: s.code, accuracy: tally(latest, s.code) }));
  const weakest = classAccuracy
    .filter((s) => s.accuracy !== null)
    .sort((a, b) => a.accuracy! - b.accuracy!)[0];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-8">
      <Link href="/professor" className="text-sm text-muted-foreground hover:underline">
        ← Turmas
      </Link>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{klass.name}</h1>
        <p className="text-muted-foreground">
          Código: <span className="font-mono text-lg font-semibold tracking-widest text-foreground">{klass.code}</span>
        </p>
      </div>

      {weakest && (
        <p className="rounded-lg border border-amber-500/40 bg-amber-50 p-3 text-sm text-amber-950">
          Habilidade com mais erros na turma: <strong>{weakest.code}</strong> (
          {SKILLS.find((s) => s.code === weakest.code)!.title}), {weakest.accuracy}% de acerto. Vale retomar em aula.
        </p>
      )}

      {roster.length ? (
        <div className="rounded-xl border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                {SKILLS.map((s) => (
                  <TableHead key={s.code} title={s.title} className="text-center font-mono text-xs">
                    {s.code.slice(4)}
                  </TableHead>
                ))}
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {roster.map((student) => {
                const mine = latest.filter((r) => r.studentId === student.id);
                const done = new Set(completions.filter((c) => c.studentId === student.id).map((c) => c.lessonId));
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.nickname}
                      {student.locked >= 5 && (
                        <Badge variant="destructive" className="ml-2">
                          bloqueado
                        </Badge>
                      )}
                    </TableCell>
                    {SKILLS.map((s) => {
                      const accuracy = tally(mine, s.code);
                      const lessons = s.lessons.filter((l) => done.has(l.id)).length;
                      return (
                        <TableCell key={s.code} className="text-center text-xs">
                          <div>
                            {lessons}/{s.lessons.length}
                          </div>
                          <div
                            className={cn(
                              "text-muted-foreground",
                              accuracy !== null && accuracy < 60 && "font-semibold text-red-700",
                            )}
                          >
                            {accuracy === null ? "–" : `${accuracy}%`}
                          </div>
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <form action={resetStudentPin.bind(null, student.id)}>
                        <Button type="submit" variant="outline" size="sm">
                          Resetar PIN
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell>Turma</TableCell>
                {classAccuracy.map((s) => (
                  <TableCell key={s.code} className="text-center text-xs">
                    {s.accuracy === null ? "–" : `${s.accuracy}%`}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Nenhum aluno ainda. Peça para acessarem o site, tocarem em &quot;Sou aluno&quot; e usarem o código {klass.code}.
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Cada célula: lições concluídas / total e % de acerto (última tentativa de cada questão). Colunas = EF09CO01 a
        EF09CO10; passe o mouse no cabeçalho para ver o nome. Resetar PIN: o aluno define um novo no próximo acesso.
      </p>
    </main>
  );
}
