"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClass } from "@/lib/actions";

export function CreateClassForm() {
  const [state, action, pending] = useActionState(createClass, undefined);
  useEffect(() => {
    if (state?.success) toast.success(state.success);
  }, [state]);

  return (
    <form action={action} className="grid gap-2">
      <Label htmlFor="class-name">Nova turma</Label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="class-name"
          name="name"
          aria-invalid={!!state?.error || undefined}
          aria-describedby={state?.error ? "class-name-error" : undefined}
          required
          placeholder="Ex.: 9º ano A"
          className="h-11 bg-white text-base"
        />
        <Button type="submit" size="lg" className="h-11 px-5" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : <Plus aria-hidden />}
          Criar turma
        </Button>
      </div>
      <FormError id="class-name-error" error={state?.error} />
    </form>
  );
}
