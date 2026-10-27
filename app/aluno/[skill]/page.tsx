import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { notFound } from "next/navigation";
import { lineStyle } from "@/components/metro";
import { AXIS_LABEL, skillBySlug } from "@/content";
import { requireStudent } from "@/lib/auth";
import { completedLessons } from "@/lib/queries";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/aluno/[skill]">): Promise<Metadata> {
  return { title: skillBySlug((await params).skill)?.title };
}

export default async function SkillPage({ params }: PageProps<"/aluno/[skill]">) {
  const { skill: slug } = await params;
  const skill = skillBySlug(slug) ?? notFound();
  const student = await requireStudent();
  const done = await completedLessons(student.id);
  const nextId = skill.lessons.find((l) => !done.has(l.id))?.id;

  return (
    <div className="space-y-8" style={lineStyle(skill.axis)}>
      <BackLink href="/aluno">Mapa</BackLink>

      <header className="space-y-3 border-l-8 border-(--line) pl-4">
        <p className="text-sm font-semibold text-muted-foreground">
          {AXIS_LABEL[skill.axis]}, {skill.code}
        </p>
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight">{skill.title}</h1>
        <p className="max-w-[60ch] text-muted-foreground">{skill.bnccText}</p>
      </header>

      <ol className="relative space-y-2">
        <span className="absolute top-7 bottom-7 left-[23px] w-2 rounded-full bg-(--line)" aria-hidden />
        {skill.lessons.map((lesson, i) => {
          const isDone = done.has(lesson.id);
          const isNext = lesson.id === nextId;
          return (
            <li key={lesson.id} className="relative">
              <Link
                href={`/aluno/${slug}/${lesson.id}`}
                className={cn(
                  "flex items-center gap-4 rounded-xl p-2 pr-4 transition-colors hover:bg-white",
                  isNext && "bg-white ring-2 ring-(--line)",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full border-[5px] border-(--line) font-extrabold",
                    isDone ? "bg-(--line) text-white" : "bg-white",
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg leading-snug font-bold">{lesson.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {isDone
                      ? `Concluída com ${done.get(lesson.id)} de ${lesson.questions.length} acertos`
                      : `${lesson.questions.length} exercícios, uns 5 minutos`}
                  </span>
                </span>
                {isNext && (
                  <span className="rounded-full bg-(--line) px-2.5 py-1 text-xs font-bold text-white">Próxima</span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
