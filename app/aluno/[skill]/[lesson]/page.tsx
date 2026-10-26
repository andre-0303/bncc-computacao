import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { Quiz } from "@/components/quiz";
import { skillBySlug, toPublic } from "@/content";

export default async function LessonPage({ params }: PageProps<"/aluno/[skill]/[lesson]">) {
  const { skill: slug, lesson: lessonId } = await params;
  const skill = skillBySlug(slug);
  const lesson = skill?.lessons.find((l) => l.id === lessonId) ?? notFound();

  return (
    <article className="space-y-6">
      <Link href={`/aluno/${slug}`} className="text-sm text-muted-foreground hover:underline">
        ← {skill!.title}
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>
      <Markdown>{lesson.explanation}</Markdown>
      <details className="group rounded-xl border bg-background p-4">
        <summary className="cursor-pointer font-medium">Não entendi, explica de outro jeito</summary>
        <div className="mt-3">
          <Markdown>{lesson.simpler}</Markdown>
        </div>
      </details>
      <Quiz
        questions={lesson.questions.map(toPublic)}
        lessonId={lesson.id}
        backHref={`/aluno/${slug}`}
      />
    </article>
  );
}
