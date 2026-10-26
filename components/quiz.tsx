"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PublicQuestion } from "@/content/types";
import { answerQuestion, completeLesson } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Result = Awaited<ReturnType<typeof answerQuestion>>;

export function Quiz({
  questions,
  lessonId,
  backHref,
  autoStart = false,
}: {
  questions: PublicQuestion[];
  /** ausente na revisão de erros: não registra conclusão de lição */
  lessonId?: string;
  backHref: string;
  autoStart?: boolean;
}) {
  const [started, setStarted] = useState(autoStart);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [hits, setHits] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!started)
    return (
      <Button size="lg" className="h-12 w-full text-base" onClick={() => setStarted(true)}>
        Fazer os exercícios ({questions.length})
      </Button>
    );

  if (finished)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Você acertou {hits} de {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {hits === questions.length
              ? "Mandou bem! Tudo certo."
              : "As questões que você errou ficam em \"Revisar erros\" para tentar de novo depois."}
          </p>
          <Link href={backHref} className={buttonVariants({ size: "lg", className: "h-11" })}>
            Continuar
          </Link>
        </CardContent>
      </Card>
    );

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const hasAnswer = answer !== null;

  function check() {
    startTransition(async () => {
      const r = await answerQuestion(q.id, answer!);
      setResult(r);
      if (r.correct) setHits((h) => h + 1);
    });
  }

  function next() {
    if (isLast) {
      startTransition(async () => {
        if (lessonId) await completeLesson(lessonId);
        setFinished(true);
      });
      return;
    }
    setIndex(index + 1);
    setAnswer(null);
    setResult(null);
  }

  return (
    <Card>
      <CardHeader className="gap-3">
        <Progress value={(index / questions.length) * 100} aria-label="Progresso nos exercícios" />
        <p className="text-sm text-muted-foreground">
          Questão {index + 1} de {questions.length}
        </p>
        <CardTitle className="text-lg leading-snug whitespace-pre-line">{q.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2" role="radiogroup">
          {q.options.map((option, i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={answer === i}
              disabled={!!result}
              onClick={() => setAnswer(i)}
              className={cn(
                "rounded-lg border bg-background p-3 text-left transition-colors hover:bg-muted disabled:hover:bg-background",
                answer === i && "border-primary ring-2 ring-primary/30",
                result && answer === i && (result.correct ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"),
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {result && (
          <div
            role="status"
            className={cn(
              "space-y-1 rounded-lg border p-3 text-sm",
              result.correct ? "border-green-600/40 bg-green-50 text-green-950" : "border-red-600/40 bg-red-50 text-red-950",
            )}
          >
            <p className="font-semibold">
              {result.correct ? "Acertou!" : `Não foi dessa vez. Resposta certa: ${result.correctAnswer}`}
            </p>
            <p>{result.why}</p>
          </div>
        )}

        {result ? (
          <Button size="lg" className="h-11 w-full" onClick={next} disabled={pending}>
            {isLast ? "Ver resultado" : "Próxima"}
          </Button>
        ) : (
          <Button size="lg" className="h-11 w-full" onClick={check} disabled={!hasAnswer || pending}>
            {pending ? "Verificando..." : "Verificar"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
