"use client";

import { useActionState } from "react";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teacherLogin, teacherSignup } from "@/lib/actions";

export default function TeacherLoginPage() {
  const [loginState, loginAction, loggingIn] = useActionState(teacherLogin, undefined);
  const [signupState, signupAction, signingUp] = useActionState(teacherSignup, undefined);

  return (
    <main className="mx-auto grid w-full max-w-3xl flex-1 content-center gap-4 px-4 py-12 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="grid gap-4">
            <Field id="login-email" name="email" label="E-mail" type="email" autoComplete="email" />
            <Field id="login-password" name="password" label="Senha" type="password" autoComplete="current-password" />
            <FormError error={loginState?.error} />
            <Button type="submit" size="lg" disabled={loggingIn}>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Criar conta de professor</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signupAction} className="grid gap-4">
            <Field id="name" name="name" label="Nome" autoComplete="name" />
            <Field id="email" name="email" label="E-mail" type="email" autoComplete="email" />
            <Field id="password" name="password" label="Senha (mín. 8)" type="password" minLength={8} autoComplete="new-password" />
            <FormError error={signupState?.error} />
            <Button type="submit" size="lg" variant="outline" disabled={signingUp}>
              Criar conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function Field({ label, ...props }: React.ComponentProps<"input"> & { label: string }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={props.id}>{label}</Label>
      <Input required className="h-10" {...props} />
    </div>
  );
}
