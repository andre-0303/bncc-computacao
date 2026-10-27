import { PartyPopper } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { Quiz } from "@/components/quiz";
import { buttonVariants } from "@/components/ui/button";
import { QUESTIONS, toPublic } from "@/content";
import { requireStudent } from "@/lib/auth";
import { wrongQuestionIds } from "@/lib/queries";

export const metadata: Metadata = { title: "Revisar erros" };

export default async function ReviewPage() {
  const student = await requireStudent();
  const questions = (await wrongQuestionIds(student.id))
    .map((id) => QUESTIONS.get(id)?.question)
    .filter((q) => q !== undefined)
    .map(toPublic);

  return (
    // revisão mistura habilidades de várias linhas: usa a cor da tinta
    <div className="space-y-8" style={{ "--line": "var(--ink)" } as React.CSSProperties}>
      <BackLink href="/aluno">Mapa</BackLink>
      <header className="space-y-2 border-l-8 border-warn pl-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Revisar erros</h1>
        <p className="text-muted-foreground">
          Questões que você errou da última vez. Acertou agora? Ela sai da lista.
        </p>
      </header>
      {questions.length ? (
        <Quiz questions={questions} backHref="/aluno" autoStart />
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6">
          <PartyPopper className="size-8 text-ok" aria-hidden />
          <div>
            <h2 className="text-xl font-extrabold">Nada para revisar</h2>
            <p className="text-muted-foreground">Todas as questões que você fez estão certas.</p>
          </div>
          <Link href="/aluno" className={buttonVariants({ size: "lg" })}>
            Voltar ao mapa
          </Link>
        </div>
      )}
    </div>
  );
}
