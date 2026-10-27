import Link from "next/link";
import { BrandMark } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";
import { AXIS_LABEL, SKILLS } from "@/content";
import type { Axis } from "@/content/types";

const LINES: { axis: Axis; color: string; path: string; stations: [number, number][] }[] = [
  { axis: "PC", color: "var(--line-pc)", path: "M40 50 H150 L230 130", stations: [[40, 50], [95, 50], [150, 50]] },
  { axis: "MD", color: "var(--line-md)", path: "M60 210 H150 L230 130", stations: [[60, 210], [120, 210]] },
  {
    axis: "CD",
    color: "var(--line-cd)",
    path: "M230 130 H300 L340 170 V240",
    stations: [[265, 130], [300, 130], [340, 170], [340, 205], [340, 240]],
  },
];

/** Mapa de metrô com as 10 habilidades: cada linha é um eixo, cada estação uma habilidade. */
function HeroMap() {
  let n = 0;
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Mapa com as 10 habilidades de Computação do 9º ano, em três linhas">
      {LINES.map((l) => (
        <path key={l.axis} d={l.path} stroke={l.color} strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {LINES.map((l) =>
        l.stations.map(([x, y]) => {
          const code = SKILLS[n++].code.slice(-2);
          const below = l.axis !== "PC";
          return (
            <g key={code}>
              <circle cx={x} cy={y} r="7" fill="#fff" stroke="var(--ink)" strokeWidth="3" />
              <text
                x={l.axis === "CD" && x === 340 ? x - 16 : x}
                y={l.axis === "CD" && x === 340 ? y + 4 : below ? y + 24 : y - 16}
                textAnchor={l.axis === "CD" && x === 340 ? "end" : "middle"}
                className="fill-muted-foreground text-[11px] font-semibold"
              >
                {code}
              </text>
            </g>
          );
        }),
      )}
      <rect x="216" y="118" width="28" height="24" rx="12" fill="#fff" stroke="var(--ink)" strokeWidth="3.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <main id="conteudo" className="mx-auto grid w-full max-w-5xl flex-1 content-center items-center gap-10 px-4 py-10 md:grid-cols-[1fr_1.1fr] md:gap-14 md:py-16">
      <div className="space-y-6 md:order-1">
        <BrandMark className="size-10" />
        <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl">
          Computação do 9º ano, uma estação por vez.
        </h1>
        <p className="max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Lições de 5 minutos e exercícios rápidos para revisar o que você viu em aula. Cada habilidade da BNCC é uma
          estação no seu mapa.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/entrar" className={buttonVariants({ size: "lg", className: "h-12 px-6 text-base" })}>
            Entrar como aluno
          </Link>
          <Link
            href="/professor/login"
            className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 bg-white px-6 text-base" })}
          >
            Sou professor
          </Link>
        </div>
      </div>
      <figure className="md:order-2">
        <HeroMap />
        <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {(Object.keys(AXIS_LABEL) as Axis[]).map((axis) => (
            <span key={axis} className="flex items-center gap-2">
              <span className="h-1.5 w-5 rounded-full" style={{ background: `var(--line-${axis.toLowerCase()})` }} />
              {AXIS_LABEL[axis]}
            </span>
          ))}
        </figcaption>
      </figure>
    </main>
  );
}
