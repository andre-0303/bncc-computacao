import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { CreateClassForm } from "@/components/create-class-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/lib/actions";
import { requireTeacher } from "@/lib/auth";
import { classes, db } from "@/lib/db";

export default async function TeacherHome() {
  const teacher = await requireTeacher();
  const list = await db
    .select()
    .from(classes)
    .where(eq(classes.teacherId, teacher.id))
    .orderBy(desc(classes.createdAt));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Olá, {teacher.name}</h1>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">
            Sair
          </Button>
        </form>
      </div>
      <CreateClassForm />
      <div className="grid gap-3">
        {list.map((c) => (
          <Link key={c.id} href={`/professor/turma/${c.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>{c.name}</CardTitle>
                <CardDescription>
                  Código: <span className="font-mono text-base font-semibold tracking-widest text-foreground">{c.code}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {!list.length && <p className="text-muted-foreground">Crie sua primeira turma e passe o código para os alunos.</p>}
      </div>
    </main>
  );
}
