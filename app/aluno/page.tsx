import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AXIS_LABEL, SKILLS } from "@/content";
import type { Axis } from "@/content/types";
import { requireStudent } from "@/lib/auth";
import { completedLessonIds, wrongQuestionIds } from "@/lib/queries";

export default async function StudentHome() {
  const student = await requireStudent();
  const [done, wrong] = await Promise.all([completedLessonIds(student.id), wrongQuestionIds(student.id)]);

  return (
    <div className="space-y-8">
      {wrong.length > 0 && (
        <Link href="/aluno/revisar" className="block">
          <Card className="ring-amber-500/40 transition-colors hover:bg-amber-50">
            <CardHeader>
              <CardTitle>Revisar erros</CardTitle>
              <CardDescription>
                Você tem {wrong.length} {wrong.length === 1 ? "questão" : "questões"} para tentar de novo.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}

      {(Object.keys(AXIS_LABEL) as Axis[]).map((axis) => (
        <section key={axis} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{AXIS_LABEL[axis]}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SKILLS.filter((s) => s.axis === axis).map((skill) => {
              const completed = skill.lessons.filter((l) => done.has(l.id)).length;
              return (
                <Link key={skill.code} href={`/aluno/${skill.code.toLowerCase()}`}>
                  <Card className="h-full transition-colors hover:bg-muted/50">
                    <CardHeader className="gap-2">
                      <Badge variant="secondary" className="w-fit font-mono">
                        {skill.code}
                      </Badge>
                      <CardTitle>{skill.title}</CardTitle>
                      <Progress value={(completed / skill.lessons.length) * 100} aria-label="Progresso" />
                      <CardDescription>
                        {completed} de {skill.lessons.length} lições
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
