import Link from "next/link";
import { Quiz } from "@/components/quiz";
import { QUESTIONS, toPublic } from "@/content";
import { requireStudent } from "@/lib/auth";
import { wrongQuestionIds } from "@/lib/queries";

export default async function ReviewPage() {
  const student = await requireStudent();
  const questions = (await wrongQuestionIds(student.id))
    .map((id) => QUESTIONS.get(id)?.question)
    .filter((q) => q !== undefined)
    .map(toPublic);

  return (
    <div className="space-y-6">
      <Link href="/aluno" className="text-sm text-muted-foreground hover:underline">
        ← Voltar
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Revisar erros</h1>
      {questions.length ? (
        <Quiz questions={questions} backHref="/aluno" autoStart />
      ) : (
        <p className="text-muted-foreground">Nada para revisar. Bom trabalho!</p>
      )}
    </div>
  );
}
