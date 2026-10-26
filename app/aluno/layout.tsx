import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { requireStudent } from "@/lib/auth";

export default async function StudentLayout({ children }: LayoutProps<"/aluno">) {
  const student = await requireStudent();
  return (
    <>
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
          <Link href="/aluno" className="font-semibold">
            Computação 9º ano
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate">
              {student.nickname} · {student.className}
            </span>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="sm">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </>
  );
}
