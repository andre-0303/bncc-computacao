"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { BrandMark } from "@/components/brand";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teacherLogin } from "@/lib/actions";

export default function TeacherLoginPage() {
  const [state, action, pending] = useActionState(teacherLogin, undefined);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8 px-4 py-12">
      <Link href="/" aria-label="Início" className="w-fit rounded-md">
        <BrandMark className="size-10" />
      </Link>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Área do professor</h1>
        <p className="text-muted-foreground">Cadastre suas turmas e acompanhe em quais habilidades a turma mais erra.</p>
      </div>

      <form action={action} className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" defaultValue={state?.fields?.email} required autoComplete="email" className="h-12 bg-white text-base" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-12 bg-white text-base"
          />
        </div>
        <FormError error={state?.error} />
        <Button type="submit" size="lg" className="h-12 text-base" disabled={pending}>
          {pending && <LoaderCircle className="animate-spin" aria-hidden />}
          Entrar
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">
        Ainda não tem acesso? Peça a conta para quem administra o sistema na sua escola.
      </p>
    </main>
  );
}
