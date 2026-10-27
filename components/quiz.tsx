"use client";

import { Check, LoaderCircle, RotateCcw, X, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Station } from "@/components/metro";
import { Button, buttonVariants } from "@/components/ui/button";
import type { PublicQuestion } from "@/content/types";
import { answerQuestion } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Result = Awaited<ReturnType<typeof answerQuestion>>;
const LETTERS = "ABCD";

export function Quiz({
  questions: initialQuestions,
  lessonId,
  backHref,
  nextHref,
  autoStart = false,
}: {
  questions: PublicQuestion[];
  /** ausente na revisão de erros: não registra conclusão de lição */
  lessonId?: string;
  backHref: string;
  nextHref?: string;
  autoStart?: boolean;
}) {
  // Congela a lista: revalidações do servidor (ex.: ao concluir uma lição na revisão)
  // não podem trocar as questões no meio do exercício.
  const [questions] = useState(initialQuestions);
  const [started, setStarted] = useState(autoStart);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [outcomes, setOutcomes] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [pending, startTransition] = useTransition();

  // No celular o painel de resposta cobre a parte de baixo da tela: a cada questão
  // (e no resultado) o exercício volta para o topo e o foco vai para o enunciado,
  // que o leitor de tela anuncia. Não rola nem move o foco ao abrir a página.
  const top = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  // Depois de verificar, foco em Continuar (as alternativas ficam desabilitadas).
  // Espera o fim da transição: até lá o botão está desabilitado e não recebe foco.
  const continueButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (result && !pending) continueButton.current?.focus();
  }, [result, pending]);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!started) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    top.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    heading.current?.focus({ preventScroll: true });
  }, [started, index, finished]);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  function check() {
    if (answer === null || result || pending) return;
    startTransition(async () => {
      const r = await answerQuestion(q.id, answer);
      setResult(r);
      setOutcomes((o) => [...o, r.correct]);
      setStreak((s) => (r.correct ? s + 1 : 0));
    });
  }

  function restart() {
    setIndex(0);
    setAnswer(null);
    setResult(null);
    setOutcomes([]);
    setStreak(0);
    setFinished(false);
  }

  function next() {
    if (!result || pending) return;
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setAnswer(null);
    setResult(null);
  }

  // Atalhos, só com o foco dentro do exercício (WCAG 2.1.4): 1-4 ou A-D escolhem,
  // Enter numa alternativa verifica. Setas e espaço são os dos rádios nativos;
  // depois de verificar, o foco está em Continuar e Enter funciona normalmente.
  function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (result || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (e.key === "Enter") {
      if (target instanceof HTMLInputElement && target.type === "radio") {
        e.preventDefault();
        check();
      }
      return;
    }
    const i = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : LETTERS.indexOf(e.key.toUpperCase());
    if (e.key.length !== 1 || i < 0 || i >= q.options.length) return;
    setAnswer(i);
    e.currentTarget.querySelectorAll<HTMLInputElement>("input[type=radio]")[i]?.focus();
  }

  if (!started)
    return (
      <section ref={top} className="flex scroll-mt-20 flex-col gap-4 rounded-2xl bg-ink p-6 text-white sm:flex-row sm:items-center">
        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-extrabold">Hora de praticar</h2>
          <p className="text-white/75">
            {questions.length} exercícios. O que você errar vai para a revisão, sem problema.
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => setStarted(true)}
          className="h-12 bg-white px-6 text-base font-bold text-ink hover:bg-white/90"
        >
          Começar exercícios
        </Button>
      </section>
    );

  if (finished) {
    const hits = outcomes.filter(Boolean).length;
    const perfect = hits === questions.length;
    // a última resposta traz a situação da lição calculada no servidor
    const lesson = lessonId ? result?.lesson : undefined;
    const failed = lesson && !lesson.passed;
    return (
      <section
        ref={top}
        className="scroll-mt-20 space-y-6 rounded-2xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_var(--ink)]"
      >
        {lesson?.passed && (
          // a estação da lição acende na linha: o trecho percorrido fica cheio
          <div className="-mx-2 flex items-center" aria-hidden>
            <span className="h-2.5 flex-1 rounded-l-full bg-(--line)" />
            <Station progress={1} className="station-on size-14 border-8 [&_svg]:size-6" />
            <span className="h-2.5 flex-1 rounded-r-full bg-(--line) opacity-25" />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2" role="img" aria-label={`${hits} acertos de ${questions.length}`}>
          {outcomes.map((ok, i) => (
            <span
              key={i}
              className={cn(
                "station-on grid size-9 place-items-center rounded-full text-white",
                ok ? "bg-ok" : "bg-bad",
              )}
              style={{ animationDelay: `${(lesson?.passed ? 300 : 0) + i * 120}ms` }}
            >
              {ok ? <Check className="size-5" strokeWidth={3.5} /> : <X className="size-5" strokeWidth={3.5} />}
            </span>
          ))}
        </div>
        <div className="space-y-1">
          <h2 ref={heading} tabIndex={-1} className="text-3xl font-extrabold tracking-tight">
            {perfect ? "Acertou tudo!" : failed ? "Faltou pouco" : `Você acertou ${hits} de ${questions.length}`}
          </h2>
          <p className="text-muted-foreground">
            {failed
              ? `Você acertou ${hits} de ${questions.length}. Para concluir esta estação, acerte pelo menos ${lesson.needed}. Releia a explicação e tente de novo.`
              : perfect
                ? "Estação concluída. Pode seguir para a próxima parada."
                : lessonId
                  ? "Estação concluída. As que você errou estão esperando em Revisar erros."
                  : "Ainda ficou alguma? Ela continua na revisão para outra tentativa."}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {failed && (
            <Button size="lg" onClick={restart} className="h-12 px-6 text-base">
              <RotateCcw aria-hidden />
              Tentar de novo
            </Button>
          )}
          {nextHref && !failed && (
            <Link href={nextHref} className={buttonVariants({ size: "lg", className: "h-12 px-6 text-base" })}>
              Próxima lição
            </Link>
          )}
          <Link
            href={nextHref || failed ? backHref : "/aluno"}
            className={buttonVariants({
              size: "lg",
              variant: nextHref || failed ? "outline" : "default",
              className: "h-12 px-6 text-base",
            })}
          >
            {nextHref || failed ? "Voltar à trilha" : "Voltar ao mapa"}
          </Link>
        </div>
      </section>
    );
  }

  const correctIndex = result ? q.options.indexOf(result.correctAnswer) : -1;

  return (
    <section ref={top} className="scroll-mt-20 space-y-6" aria-label="Exercícios" onKeyDown={onKeyDown}>
      <div className="flex items-center gap-4">
        {/* progresso só visual: o número da questão está no enunciado */}
        <ol className="relative flex flex-1 items-center justify-between" aria-hidden>
          <span className="absolute inset-x-1 h-1.5 rounded-full bg-(--line)/25" aria-hidden />
          {questions.map((_, i) => (
            <li
              key={i}
              className={cn(
                "relative grid size-4 place-items-center rounded-full border-4 text-white transition-all",
                outcomes[i] === true && "size-5 border-0 bg-ok",
                outcomes[i] === false && "size-5 border-0 bg-bad",
                outcomes[i] === undefined && i === index && "size-5 border-(--line) bg-white",
                outcomes[i] === undefined && i !== index && "border-(--line)/35 bg-white",
              )}
            >
              {/* ícone além da cor (WCAG 1.4.1) */}
              {outcomes[i] === true && <Check className="size-3" strokeWidth={4} />}
              {outcomes[i] === false && <X className="size-3" strokeWidth={4} />}
            </li>
          ))}
        </ol>
        {streak >= 2 && (
          <span
            key={streak}
            className="flex items-center gap-1 rounded-full bg-warn px-2.5 py-1 text-sm font-extrabold text-ink animate-in zoom-in-50"
          >
            <Zap className="size-4 fill-current" aria-hidden />
            {streak} seguidas
          </span>
        )}
      </div>

      <h2 ref={heading} tabIndex={-1} className="text-xl leading-snug font-bold whitespace-pre-line sm:text-2xl">
        <span className="sr-only">
          Questão {index + 1} de {questions.length}:{" "}
        </span>
        {q.prompt}
      </h2>

      <fieldset className="grid min-w-0 gap-2.5">
        <legend className="sr-only">Alternativas</legend>
        {q.options.map((option, i) => {
          const picked = answer === i;
          const showRight = result && i === correctIndex;
          const showWrong = result && picked && !result.correct;
          return (
            <label
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 bg-white p-3 text-left text-base font-semibold transition-all has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
                !result && "cursor-pointer hover:border-(--line) active:scale-[0.99]",
                picked && !result && "border-(--line) shadow-[0_0_0_3px_color-mix(in_oklab,var(--line)_25%,transparent)]",
                showRight && "border-ok bg-ok-soft",
                showWrong && "border-bad bg-bad-soft",
                result && !showRight && !showWrong && "opacity-50",
              )}
            >
              <input
                type="radio"
                name={`questao-${q.id}`}
                className="sr-only"
                checked={picked}
                disabled={!!result}
                onChange={() => setAnswer(i)}
              />
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg border-2 text-sm font-extrabold",
                  picked && !result && "border-(--line) bg-(--line) text-white",
                  showRight && "border-ok bg-ok text-white",
                  showWrong && "border-bad bg-bad text-white",
                )}
                aria-hidden
              >
                {showRight ? <Check className="size-4" strokeWidth={3.5} /> : showWrong ? <X className="size-4" strokeWidth={3.5} /> : LETTERS[i]}
              </span>
              {option}
              {showRight && <span className="sr-only"> (resposta certa)</span>}
              {showWrong && <span className="sr-only"> (sua resposta, errada)</span>}
            </label>
          );
        })}
      </fieldset>

      {!result && (
        <Button size="lg" className="h-12 w-full text-base" onClick={check} disabled={answer === null || pending}>
          {pending && <LoaderCircle className="animate-spin" aria-hidden />}
          Verificar
        </Button>
      )}

      {result && (
        <>
          {/* espaço para o painel fixo não cobrir as alternativas */}
          <div className="h-48" aria-hidden />
          {/* lido ao focar Continuar (aria-describedby); scroll-padding em globals.css evita foco escondido atrás dele */}
          <div
            data-feedback-panel
            className={cn(
              "fixed inset-x-0 bottom-0 z-30 border-t-4 animate-in slide-in-from-bottom duration-300",
              result.correct ? "border-ok bg-ok-soft" : "border-bad bg-bad-soft",
            )}
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center">
              <div className="flex flex-1 gap-3">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full text-white",
                    result.correct ? "bg-ok" : "bg-bad",
                  )}
                  aria-hidden
                >
                  {result.correct ? <Check className="size-6" strokeWidth={3.5} /> : <X className="size-6" strokeWidth={3.5} />}
                </span>
                <div id="quiz-feedback" className={result.correct ? "text-[#0f4d2c]" : "text-[#7a1a1e]"}>
                  <p className="text-lg font-extrabold">
                    {!result.correct && <span className="sr-only">Errou. </span>}
                    {result.correct ? "Acertou!" : `Resposta certa: ${result.correctAnswer}`}
                  </p>
                  <p className="leading-snug">{result.why}</p>
                </div>
              </div>
              <Button
                size="lg"
                ref={continueButton}
                aria-describedby="quiz-feedback"
                onClick={next}
                disabled={pending}
                className={cn(
                  "h-12 px-8 text-base font-bold text-white sm:w-auto",
                  // hover escurece: clarear derrubaria o contraste do texto branco
                  result.correct
                    ? "bg-ok hover:bg-[color-mix(in_oklab,var(--ok),black_15%)]"
                    : "bg-bad hover:bg-[color-mix(in_oklab,var(--bad),black_15%)]",
                )}
              >
                {pending && <LoaderCircle className="animate-spin" aria-hidden />}
                {isLast ? "Ver resultado" : "Continuar"}
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
