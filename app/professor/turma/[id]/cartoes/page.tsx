import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { BackLink } from "@/components/back-link";
import { BrandMark } from "@/components/brand";
import { PrintButton } from "@/components/professor/print-button";
import { TeacherHeader } from "@/components/professor/teacher-header";
import { formatAccessCode } from "@/lib/access-code";
import { requireTeacher } from "@/lib/auth";
import { db, students } from "@/lib/db";
import { ownedClass } from "@/lib/queries";

export async function generateMetadata({ params }: PageProps<"/professor/turma/[id]/cartoes">): Promise<Metadata> {
  return { title: `Códigos de acesso, ${(await ownedClass((await params).id)).name}` };
}

/** Cartões recortáveis com o código de acesso de cada aluno. */
export default async function CardsPage({
  params,
}: PageProps<"/professor/turma/[id]/cartoes">) {
  const { id } = await params;
  const teacher = await requireTeacher();
  const klass = await ownedClass(id);

  const roster = await db
    .select({ name: students.name, accessCode: students.accessCode })
    .from(students)
    .where(eq(students.classId, klass.id))
    .orderBy(students.name);
  const site = (await headers()).get("host") ?? "";

  return (
    <>
      <div className="print:hidden">
        <TeacherHeader name={teacher.name} />
      </div>
      <main id="conteudo" className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8 print:max-w-none print:p-0">
        <div className="space-y-4 print:hidden">
          <BackLink href={`/professor/turma/${klass.id}`}>
            {klass.name}
          </BackLink>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Códigos de acesso
              </h1>
              <p className="text-muted-foreground">
                Imprima, recorte na linha tracejada e entregue a cada aluno.
              </p>
            </div>
            <PrintButton />
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-0">
          {roster.map((s) => (
            <li
              key={s.accessCode}
              className="flex break-inside-avoid flex-col gap-3 rounded-xl border-2 border-dashed border-input bg-white p-5 print:rounded-none"
            >
              <div className="flex items-center gap-2 text-sm font-bold">
                <BrandMark className="size-6" />
                Computação 9º ano
              </div>
              <div>
                <p className="text-lg font-extrabold">{s.name}</p>
                <p className="text-sm text-muted-foreground">{klass.name}</p>
              </div>
              <p className="font-mono text-3xl font-bold tracking-[0.2em]">
                {formatAccessCode(s.accessCode)}
              </p>
              <p className="text-sm text-muted-foreground">
                Entre em <strong className="text-foreground">{site}</strong>,
                toque em Entrar como aluno e digite seu código. Não mostre para
                os colegas.
              </p>
            </li>
          ))}
        </ul>
        {!roster.length && (
          <p className="text-muted-foreground print:hidden">
            Nenhum aluno cadastrado nesta turma.
          </p>
        )}
      </main>
    </>
  );
}
