import "server-only";
import { randomBytes } from "node:crypto";
import { and, eq, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { classes, db, sessions, students, teachers } from "@/lib/db";
import { SESSION_COOKIE as COOKIE, STUDENT_SESSION_HOURS, TEACHER_SESSION_DAYS } from "@/lib/privacy";

export async function createSession(owner: { teacherId: string } | { studentId: string }) {
  const token = randomBytes(32).toString("hex");
  const isTeacher = "teacherId" in owner;
  const expiresAt = new Date(Date.now() + (isTeacher ? TEACHER_SESSION_DAYS * 24 : STUDENT_SESSION_HOURS) * 3_600_000);
  // Limpeza das sessões vencidas a cada login: mantém a tabela pequena sem precisar de cron.
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
  await db.insert(sessions).values({ token, expiresAt, ...owner });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // Aluno: sem expires, o cookie some quando o navegador fecha.
    ...(isTeacher && { expires: expiresAt }),
    path: "/",
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await db.delete(sessions).where(eq(sessions.token, token));
  store.delete(COOKIE);
}

const getSession = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [row] = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())));
  return row ?? null;
});

export const getStudent = cache(async () => {
  const session = await getSession();
  if (!session?.studentId) return null;
  const [row] = await db
    .select({ id: students.id, name: students.name, className: classes.name })
    .from(students)
    .innerJoin(classes, eq(classes.id, students.classId))
    .where(eq(students.id, session.studentId));
  return row ?? null;
});

export const getTeacher = cache(async () => {
  const session = await getSession();
  if (!session?.teacherId) return null;
  const [row] = await db
    .select({ id: teachers.id, name: teachers.name })
    .from(teachers)
    .where(eq(teachers.id, session.teacherId));
  return row ?? null;
});

export async function requireStudent() {
  return (await getStudent()) ?? redirect("/entrar");
}

export async function requireTeacher() {
  return (await getTeacher()) ?? redirect("/professor/login");
}
