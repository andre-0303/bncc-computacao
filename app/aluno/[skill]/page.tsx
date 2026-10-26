import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { skillBySlug } from "@/content";
import { requireStudent } from "@/lib/auth";
import { completedLessonIds } from "@/lib/queries";

export default async function SkillPage({ params }: PageProps<"/aluno/[skill]">) {
  const { skill: slug } = await params;
  const skill = skillBySlug(slug) ?? notFound();
  const student = await requireStudent();
  const done = await completedLessonIds(student.id);

  return (
    <div className="space-y-6">
      <Link href="/aluno" className="text-sm text-muted-foreground hover:underline">
        ← Voltar
      </Link>
      <div className="space-y-2">
        <Badge variant="secondary" className="font-mono">
          {skill.code}
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{skill.title}</h1>
        <p className="text-sm text-muted-foreground">{skill.bnccText}</p>
      </div>
      <ol className="grid gap-3">
        {skill.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link href={`/aluno/${slug}/${lesson.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>
                    {i + 1}. {lesson.title}
                  </CardTitle>
                  {done.has(lesson.id) ? <Badge>Concluída</Badge> : <Badge variant="outline">~5 min</Badge>}
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
