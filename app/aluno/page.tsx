import { ArrowRight, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { lineStyle, Station } from "@/components/metro";
import { AXIS_LABEL, SKILLS } from "@/content";
import type { Axis } from "@/content/types";
import { requireStudent } from "@/lib/auth";
import { completedLessons, wrongQuestionIds } from "@/lib/queries";

export default async function StudentHome() {
  const student = await requireStudent();
  const [done, wrong] = await Promise.all([completedLessons(student.id), wrongQuestionIds(student.id)]);

  const totalLessons = SKILLS.reduce((n, s) => n + s.lessons.length, 0);
  const next = SKILLS.flatMap((skill) => skill.lessons.map((lesson) => ({ skill, lesson }))).find(
    ({ lesson }) => !done.has(lesson.id),
  );

  return (
    <div className="space-y-10">
      <section className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Seu mapa</h1>
        <p className="text-muted-foreground">
          {done.size === 0
            ? "Escolha qualquer estação para começar, ou siga a próxima parada."
            : `${done.size} de ${totalLessons} lições concluídas.`}
        </p>
      </section>

      {wrong.length > 0 && (
        <Link
          href="/aluno/revisar"
          className="flex items-center gap-3 rounded-xl border-2 border-ink bg-warn px-4 py-3 font-bold text-ink shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <TriangleAlert className="size-6 shrink-0" aria-hidden />
          <span className="flex-1">
            {wrong.length === 1 ? "1 questão" : `${wrong.length} questões`} para revisar
          </span>
          <ArrowRight className="size-5" aria-hidden />
        </Link>
      )}

      {next && (
        <Link
          href={`/aluno/${next.skill.code.toLowerCase()}/${next.lesson.id}`}
          style={lineStyle(next.skill.axis)}
          className="group flex items-center gap-4 rounded-xl bg-(--line) p-4 text-white transition-[filter] hover:brightness-110"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full border-4 border-white bg-white/20" aria-hidden>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-white/85">Próxima parada: {next.skill.title}</span>
            <span className="block truncate text-lg font-extrabold">{next.lesson.title}</span>
          </span>
        </Link>
      )}

      {(Object.keys(AXIS_LABEL) as Axis[]).map((axis) => {
        const skills = SKILLS.filter((s) => s.axis === axis);
        return (
          <section key={axis} style={lineStyle(axis)} aria-labelledby={`linha-${axis}`}>
            <h2 id={`linha-${axis}`} className="mb-3 flex items-center gap-3 text-lg font-extrabold">
              <span className="h-2 w-8 rounded-full bg-(--line)" aria-hidden />
              {AXIS_LABEL[axis]}
            </h2>
            <ol className="relative">
              {/* trilho da linha passando por trás das estações */}
              <span className="absolute top-6 bottom-6 left-[19px] w-2 rounded-full bg-(--line)" aria-hidden />
              {skills.map((skill) => {
                const completed = skill.lessons.filter((l) => done.has(l.id)).length;
                const progress = completed / skill.lessons.length;
                return (
                  <li key={skill.code} className="relative">
                    <Link
                      href={`/aluno/${skill.code.toLowerCase()}`}
                      className="flex items-center gap-4 rounded-xl py-3 pr-3 pl-2 transition-colors hover:bg-white"
                    >
                      <Station progress={progress} className="size-8" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg leading-snug font-bold">{skill.title}</span>
                        <span className="block text-sm text-muted-foreground">
                          {completed} de {skill.lessons.length} lições
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground tabular-nums">{skill.code}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
