import type { Axis, PublicQuestion, Question, Skill } from "./types.ts";
import { ef09co01 } from "./ef09co01.ts";
import { ef09co02 } from "./ef09co02.ts";
import { ef09co03 } from "./ef09co03.ts";
import { ef09co04 } from "./ef09co04.ts";
import { ef09co05 } from "./ef09co05.ts";
import { ef09co06 } from "./ef09co06.ts";
import { ef09co07 } from "./ef09co07.ts";
import { ef09co08 } from "./ef09co08.ts";
import { ef09co09 } from "./ef09co09.ts";
import { ef09co10 } from "./ef09co10.ts";

export const SKILLS: Skill[] = [
  ef09co01, ef09co02, ef09co03, ef09co04, ef09co05,
  ef09co06, ef09co07, ef09co08, ef09co09, ef09co10,
];

// Embaralha alternativas (exceto V/F) de forma fixa por id, para a resposta certa
// não cair sempre na mesma letra. A mesma questão aparece sempre na mesma ordem.
function seed(s: string) {
  let h = 2166136261; // FNV-1a + mistura final do murmur3
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return (h ^ (h >>> 16)) >>> 0;
}
for (const q of SKILLS.flatMap((s) => s.lessons.flatMap((l) => l.questions))) {
  if (q.options.length <= 2) continue;
  const correct = q.options[q.answer];
  q.options = q.options
    .map((option, i) => ({ option, key: seed(q.id + i) }))
    .sort((a, b) => a.key - b.key)
    .map((o) => o.option);
  q.answer = q.options.indexOf(correct);
}

export const AXIS_LABEL: Record<Axis, string> = {
  PC: "Pensamento Computacional",
  MD: "Mundo Digital",
  CD: "Cultura Digital",
};

export const skillBySlug = (slug: string) => SKILLS.find((s) => s.code.toLowerCase() === slug);

export const QUESTIONS = new Map(
  SKILLS.flatMap((skill) =>
    skill.lessons.flatMap((lesson) =>
      lesson.questions.map((question) => [question.id, { skill, lesson, question }] as const),
    ),
  ),
);

/** Acertos mínimos para a lição contar como concluída (60%). */
export const passingScore = (total: number) => Math.ceil(total * 0.6);

export const isCorrect = (q: Question, answer: number) => answer === q.answer;

export const correctAnswerText = (q: Question) => q.options[q.answer];

export const toPublic = ({ id, prompt, options }: Question): PublicQuestion => ({ id, prompt, options });
