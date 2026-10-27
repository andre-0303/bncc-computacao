import { Check } from "lucide-react";
import type { Axis } from "@/content/types";
import { cn } from "@/lib/utils";

/** Cor da linha de cada eixo, usada via style={{ "--line": LINE[axis] }}. */
export const LINE: Record<Axis, string> = {
  PC: "var(--line-pc)",
  MD: "var(--line-md)",
  CD: "var(--line-cd)",
};

export const lineStyle = (axis: Axis) => ({ "--line": LINE[axis] }) as React.CSSProperties;

/** Estação do mapa: anel na cor da linha, preenchido conforme o progresso (0 a 1). */
export function Station({
  progress,
  className,
  label,
}: {
  progress: number;
  className?: string;
  label?: string;
}) {
  const done = progress >= 1;
  return (
    <span
      role="img"
      aria-label={label ?? (done ? "Concluída" : `${Math.round(progress * 100)}% concluída`)}
      className={cn(
        "relative grid size-7 shrink-0 place-items-center rounded-full border-[5px] border-(--line)",
        className,
      )}
      style={{
        background: done
          ? "var(--line)"
          : `conic-gradient(var(--line) ${progress * 360}deg, #fff 0)`,
      }}
    >
      {done && <Check className="size-3.5 text-white" strokeWidth={4} aria-hidden />}
    </span>
  );
}
