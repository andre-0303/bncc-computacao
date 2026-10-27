"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      <div className="space-y-2 border-l-8 border-warn pl-4">
        <h1 className="text-3xl font-extrabold tracking-tight">A página não carregou</h1>
        <p className="text-muted-foreground">
          Pode ser a conexão com a internet. Tente de novo em alguns segundos.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset} className="h-12 px-6 text-base">
          <RotateCcw aria-hidden />
          Tentar de novo
        </Button>
        <Link href="/" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-6 text-base" })}>
          Ir para o início
        </Link>
      </div>
    </main>
  );
}
