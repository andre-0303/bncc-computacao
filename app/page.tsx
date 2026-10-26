import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Computação 9º ano</h1>
        <p className="text-muted-foreground">
          Atividades curtas e explicações para reforçar o que você viu em aula, seguindo a BNCC Computação.
        </p>
      </div>
      <div className="grid gap-3">
        <Link href="/entrar" className={buttonVariants({ size: "lg", className: "h-12 text-base" })}>
          Sou aluno
        </Link>
        <Link
          href="/professor/login"
          className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 text-base" })}
        >
          Sou professor
        </Link>
      </div>
    </main>
  );
}
