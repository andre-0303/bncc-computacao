"use client";

import { LoaderCircle, RefreshCw, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { newStudentCode, removeStudent } from "@/lib/actions";
import { formatAccessCode } from "@/lib/access-code";

export function StudentActions({ studentId, name }: { studentId: string; name: string }) {
  const [pending, startTransition] = useTransition();

  function regenerate() {
    if (!confirm(`Gerar um código novo para ${name}? O código atual para de funcionar.`)) return;
    startTransition(async () => {
      try {
        const code = await newStudentCode(studentId);
        toast.success(`Novo código de ${name}: ${formatAccessCode(code)}`, {
          description: "Entregue só para esse aluno. O código antigo não funciona mais.",
          duration: Infinity,
          closeButton: true,
        });
      } catch {
        toast.error("Não foi possível gerar o código. Recarregue a página e tente de novo.");
      }
    });
  }

  function remove() {
    if (!confirm(`Remover ${name} da turma? Todo o progresso dele será apagado.`)) return;
    startTransition(async () => {
      await removeStudent(studentId);
      toast.success(`${name} removido da turma`);
    });
  }

  return (
    <div className="flex justify-end gap-1">
      {pending ? (
        <LoaderCircle className="m-2 size-4 animate-spin text-muted-foreground" aria-label="Aguarde" />
      ) : (
        <>
          <Button variant="ghost" size="icon-sm" onClick={regenerate} aria-label={`Gerar novo código para ${name}`} title="Gerar novo código">
            <RefreshCw aria-hidden />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={remove} aria-label={`Remover ${name}`} title="Remover aluno" className="hover:text-bad">
            <Trash2 aria-hidden />
          </Button>
        </>
      )}
    </div>
  );
}
