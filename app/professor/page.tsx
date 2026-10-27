import { count, desc, eq } from "drizzle-orm";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CreateClassForm } from "@/components/professor/create-class-form";
import { TeacherHeader } from "@/components/professor/teacher-header";
import { requireTeacher } from "@/lib/auth";
import { classes, db, students } from "@/lib/db";

export const metadata: Metadata = { title: "Suas turmas" };

export default async function TeacherHome() {
  const teacher = await requireTeacher();
  const list = await db
    .select({ id: classes.id, name: classes.name, students: count(students.id) })
    .from(classes)
    .leftJoin(students, eq(students.classId, classes.id))
    .where(eq(classes.teacherId, teacher.id))
    .groupBy(classes.id)
    .orderBy(desc(classes.createdAt));

  return (
    <>
      <TeacherHeader name={teacher.name} />
      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 space-y-10 px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Suas turmas</h1>
        <CreateClassForm />
        {list.length ? (
          <ul className="divide-y overflow-hidden rounded-2xl border bg-white">
            {list.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/professor/turma/${c.id}`}
                  className="group flex items-center gap-3 p-4 transition-colors hover:bg-secondary/50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-lg font-bold">{c.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {c.students === 0 ? "Nenhum aluno ainda" : c.students === 1 ? "1 aluno" : `${c.students} alunos`}
                    </span>
                  </span>
                  <ChevronRight
                    className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-[50ch] text-muted-foreground">
            Crie sua primeira turma e depois cadastre os alunos. Cada aluno recebe um código de acesso pessoal para
            entrar, sem e-mail nem senha.
          </p>
        )}
      </main>
    </>
  );
}
