import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const teachers = pgTable("teachers", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull(),
  passwordHash: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const classes = pgTable("classes", {
  id: uuid().primaryKey().defaultRandom(),
  teacherId: uuid()
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" }),
  name: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

/** Alunos são cadastrados pelo professor; entram só com o código de acesso pessoal. */
export const students = pgTable("students", {
  id: uuid().primaryKey().defaultRandom(),
  classId: uuid()
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  name: text().notNull(),
  accessCode: text().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  token: text().primaryKey(),
  teacherId: uuid().references(() => teachers.id, { onDelete: "cascade" }),
  studentId: uuid().references(() => students.id, { onDelete: "cascade" }),
  expiresAt: timestamp().notNull(),
});

export const attempts = pgTable(
  "attempts",
  {
    id: uuid().primaryKey().defaultRandom(),
    studentId: uuid()
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    skillCode: text().notNull(),
    lessonId: text().notNull(),
    questionId: text().notNull(),
    correct: boolean().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (t) => [index().on(t.studentId, t.questionId, t.createdAt)],
);

export const lessonCompletions = pgTable(
  "lesson_completions",
  {
    studentId: uuid()
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    lessonId: text().notNull(),
    score: integer().notNull(),
    completedAt: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.studentId, t.lessonId] })],
);
