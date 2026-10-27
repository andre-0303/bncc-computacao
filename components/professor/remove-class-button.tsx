"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { removeClass } from "@/lib/actions";

export function RemoveClassButton({ classId, name }: { classId: string; name: string }) {
  const [pending, startTransition] = useTransition();

  function remove() {
    if (!confirm(`Apagar a turma ${name}? Todos os alunos e os dados deles serão apagados, sem como desfazer.`)) return;
    startTransition(() => removeClass(classId));
  }

  return (
    <Button variant="outline" onClick={remove} disabled={pending} className="hover:text-bad">
      {pending ? <LoaderCircle className="animate-spin" aria-hidden /> : <Trash2 aria-hidden />}
      Apagar turma
    </Button>
  );
}
