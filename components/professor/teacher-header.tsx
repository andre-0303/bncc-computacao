import { LogOut } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";

export function TeacherHeader({ name }: { name: string }) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Brand href="/professor" />
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden font-semibold sm:inline">{name}</span>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut aria-hidden />
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
