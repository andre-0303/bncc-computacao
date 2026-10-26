"use client";

import { useActionState } from "react";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentLogin } from "@/lib/actions";

export default function StudentLoginPage() {
  const [state, action, pending] = useActionState(studentLogin, undefined);
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Entrar na turma</CardTitle>
          <CardDescription>
            Primeira vez? Escolha um apelido e um PIN de 4 números. Não use seu nome completo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="code">Código da turma</Label>
              <Input id="code" name="code" required autoCapitalize="characters" autoComplete="off" className="h-11 uppercase tracking-widest" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="nickname">Apelido</Label>
              <Input id="nickname" name="nickname" required minLength={2} maxLength={20} autoComplete="username" className="h-11" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pin">PIN (4 números)</Label>
              <Input id="pin" name="pin" required inputMode="numeric" pattern="\d{4}" maxLength={4} type="password" autoComplete="current-password" className="h-11 tracking-widest" />
            </div>
            <FormError error={state?.error} />
            <Button type="submit" size="lg" className="h-11" disabled={pending}>
              {pending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
