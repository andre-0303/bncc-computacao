import assert from "node:assert/strict";
import { test } from "node:test";
import { QUESTIONS, SKILLS } from "./index.ts";

test("todas as habilidades do 9º ano estão presentes", () => {
  const expected = Array.from({ length: 10 }, (_, i) => `EF09CO${String(i + 1).padStart(2, "0")}`);
  assert.deepEqual(SKILLS.map((s) => s.code), expected);
});

test("ids são únicos e seguem o prefixo da habilidade/lição", () => {
  const ids = SKILLS.flatMap((s) => [
    ...s.lessons.map((l) => l.id),
    ...s.lessons.flatMap((l) => l.questions.map((q) => q.id)),
  ]);
  assert.equal(new Set(ids).size, ids.length);
  for (const s of SKILLS)
    for (const l of s.lessons) {
      assert.ok(l.id.startsWith(s.code.toLowerCase()), l.id);
      for (const q of l.questions) assert.ok(q.id.startsWith(l.id), q.id);
    }
});

test("gabaritos válidos", () => {
  for (const { question: q } of QUESTIONS.values()) {
    assert.ok(q.options.length >= 2, q.id);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, q.id);
    assert.equal(new Set(q.options).size, q.options.length, q.id);
  }
});

