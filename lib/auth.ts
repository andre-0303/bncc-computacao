import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { classes, db, sessions, students, teachers } from "@/lib/db";

const scryptAsync = promisify(scrypt) as (pw: string, salt: string, len: number) => Promise<Buffer>;
const COOKIE = "session";
const SESSION_DAYS = 30;

export async function hashSecret(secret: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(secret, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifySecret(secret: string, stored: string) {
  const [salt, hex] = stored.split(":");
  const hash = await scryptAsync(secret, salt, 64);
  return timingSafeEqual(hash, Buffer.from(hex, "hex"));
}

export async function createSession(owner: { teacherId: string } | { studentId: string }) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await db.insert(sessions).values({ token, expiresAt, ...owner });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
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
    .select({ id: students.id, nickname: students.nickname, className: classes.name })
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
