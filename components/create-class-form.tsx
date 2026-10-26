"use client";

import { useActionState } from "react";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClass } from "@/lib/actions";

export function CreateClassForm() {
  const [state, action, pending] = useActionState(createClass, undefined);
  return (
    <form action={action} className="grid gap-2">
      <div className="flex gap-2">
        <Input name="name" required placeholder="Nome da turma (ex.: 9º ano A)" aria-label="Nome da turma" className="h-10" />
        <Button type="submit" size="lg" className="h-10" disabled={pending}>
          Criar turma
        </Button>
      </div>
      <FormError error={state?.error} />
    </form>
  );
}
