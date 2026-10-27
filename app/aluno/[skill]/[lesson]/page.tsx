import { Lightbulb } from "lucide-react";
import { BackLink } from "@/components/back-link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { lineStyle } from "@/components/metro";
import { Quiz } from "@/components/quiz";
import { skillBySlug, toPublic } from "@/content";

export default async function LessonPage({ params }: PageProps<"/aluno/[skill]/[lesson]">) {
  const { skill: slug, lesson: lessonId } = await params;
  const skill = skillBySlug(slug) ?? notFound();
  const index = skill.lessons.findIndex((l) => l.id === lessonId);
  if (index < 0) notFound();
  const lesson = skill.lessons[index];
  const next = skill.lessons[index + 1];

  return (
    <article className="space-y-8" style={lineStyle(skill.axis)}>
      {/* barra de leitura no topo da tela, na cor da linha; avança com a rolagem */}
      <div className="reading-bar fixed inset-x-0 top-0 z-30 h-1 bg-(--line)" aria-hidden />
      <BackLink href={`/aluno/${slug}`}>{skill.title}</BackLink>

      <header className="space-y-2 border-l-8 border-(--line) pl-4">
        <p className="text-sm font-semibold text-muted-foreground">
          Lição {index + 1} de {skill.lessons.length}
        </p>
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight">{lesson.title}</h1>
      </header>

      <Markdown>{lesson.explanation}</Markdown>

      <details className="group max-w-[65ch] rounded-xl border-2 border-dashed border-(--line)/50 bg-white open:border-solid open:border-(--line)">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl p-4 font-bold [&::-webkit-details-marker]:hidden">
          <Lightbulb className="size-5 shrink-0 text-(--line)" aria-hidden />
          <span className="flex-1">Não entendi, explica de outro jeito</span>
          <span className="text-sm font-semibold text-muted-foreground group-open:hidden">Abrir</span>
          <span className="hidden text-sm font-semibold text-muted-foreground group-open:inline">Fechar</span>
        </summary>
        <div className="px-4 pb-5 animate-in fade-in slide-in-from-top-1">
          <Markdown>{lesson.simpler}</Markdown>
        </div>
      </details>

      <Quiz
        questions={lesson.questions.map(toPublic)}
        lessonId={lesson.id}
        backHref={`/aluno/${slug}`}
        nextHref={next ? `/aluno/${slug}/${next.id}` : undefined}
      />
    </article>
  );
}
