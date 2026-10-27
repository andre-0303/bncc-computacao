"use client";

import { LoaderCircle, UserPlus } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addStudents } from "@/lib/actions";

export function AddStudentsForm({ classId }: { classId: string }) {
  const [state, action, pending] = useActionState(addStudents.bind(null, classId), undefined);
  useEffect(() => {
    if (state?.success) toast.success(state.success, { description: "Os códigos de acesso já aparecem na tabela." });
  }, [state]);

  return (
    <form action={action} className="grid max-w-xl gap-2">
      <Label htmlFor="names">Cadastrar alunos</Label>
      <textarea
        id="names"
        name="names"
        aria-invalid={!!state?.error || undefined}
        aria-describedby={state?.error ? "names-hint names-error" : "names-hint"}
        required
        rows={5}
        placeholder={"Um nome por linha, por exemplo:\nAna Souza\nBruno Lima"}
        className="rounded-lg border border-input bg-white px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive"
      />
      <p id="names-hint" className="text-sm text-muted-foreground">
        Dá para colar a lista de chamada. Cada aluno ganha um código de acesso pessoal.
      </p>
      <FormError id="names-error" error={state?.error} />
      <Button type="submit" size="lg" className="h-11 w-fit px-5" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : <UserPlus aria-hidden />}
        Cadastrar
      </Button>
    </form>
  );
}
