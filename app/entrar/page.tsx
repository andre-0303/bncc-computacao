"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { BrandMark } from "@/components/brand";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentLogin } from "@/lib/actions";

export default function StudentLoginPage() {
  const [state, action, pending] = useActionState(studentLogin, undefined);
  const input = useRef<HTMLInputElement>(null);
  // Código recusado: volta o foco ao campo para corrigir (o erro é lido pela descrição)
  useEffect(() => {
    if (state?.error) input.current?.focus();
  }, [state]);
  return (
    <main id="conteudo" className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8 px-4 py-12">
      <Link href="/" aria-label="Início" className="w-fit rounded-md">
        <BrandMark className="size-10" />
      </Link>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Entrar</h1>
        <p className="text-muted-foreground">Digite o código de acesso que seu professor entregou para você.</p>
      </div>
      <form action={action} className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="code">Código de acesso</Label>
          <Input
            ref={input}
            id="code"
            name="code"
            aria-invalid={!!state?.error || undefined}
            aria-describedby={state?.error ? "code-hint code-error" : "code-hint"}
            defaultValue={state?.fields?.code}
            required
            maxLength={9}
            autoFocus
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="K7XQ-2MPA"
            className="h-14 bg-white text-center font-mono text-2xl tracking-[0.25em] uppercase"
          />
          <p id="code-hint" className="text-sm text-muted-foreground">
            Pode digitar com ou sem o traço. Não mostre seu código para os colegas.
          </p>
        </div>
        <FormError id="code-error" error={state?.error} />
        <Button type="submit" size="lg" className="h-12 text-base" disabled={pending}>
          {pending && <LoaderCircle className="animate-spin" aria-hidden />}
          {pending ? "Entrando" : "Entrar"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Quer saber quais dados o site guarda sobre você?{" "}
        <Link href="/privacidade" className="font-semibold text-foreground underline underline-offset-4">
          Leia a política de privacidade
        </Link>
        .
      </p>
    </main>
  );
}
