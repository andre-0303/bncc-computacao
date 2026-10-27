import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <main id="conteudo" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      {/* fim da linha: depois da última estação, só trilho pontilhado */}
      <svg viewBox="0 0 200 40" className="h-10 w-48" aria-hidden>
        <path d="M6 20H96" stroke="var(--line-pc)" strokeWidth="10" strokeLinecap="round" />
        <circle cx="96" cy="20" r="11" fill="#fff" stroke="var(--ink)" strokeWidth="4" />
        <path d="M124 20H190" stroke="var(--input)" strokeWidth="10" strokeLinecap="round" strokeDasharray="0 20" />
      </svg>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Essa estação não existe</h1>
        <p className="text-muted-foreground">O endereço pode estar errado ou a página mudou de lugar.</p>
      </div>
      <Link href="/" className={buttonVariants({ size: "lg", className: "h-12 w-fit px-6 text-base" })}>
        Ir para o início
      </Link>
    </main>
  );
}
