import { LogOut } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { requireStudent } from "@/lib/auth";

export default async function StudentLayout({ children }: LayoutProps<"/aluno">) {
  const student = await requireStudent();
  return (
    <>
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Brand href="/aluno" />
          <div className="flex items-center gap-1">
            <div className="text-right text-sm leading-tight">
              <p className="max-w-[12ch] truncate font-bold">{student.name}</p>
              <p className="max-w-[16ch] truncate text-muted-foreground">{student.className}</p>
            </div>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="icon-lg" className="size-11" aria-label="Sair">
                <LogOut aria-hidden />
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-16">{children}</main>
    </>
  );
}
