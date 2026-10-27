// Retenção (LGPD art. 15/16): apaga turmas sem nenhuma resposta de aluno há PRIVACY.retentionMonths
// meses, criadas há mais tempo que isso. O CASCADE leva alunos, sessões, tentativas e conclusões.
// Uso: pnpm data:purge            (só lista o que seria apagado)
//      pnpm data:purge --apply    (apaga de verdade)
import { setDefaultResultOrder } from "node:dns";
import { neon } from "@neondatabase/serverless";
import { PRIVACY } from "../lib/privacy.ts";

// IPv4 primeiro: ver lib/db/index.ts.
setDefaultResultOrder("ipv4first");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida (confira o .env).");
  process.exit(1);
}
const apply = process.argv.includes("--apply");
const months = PRIVACY.retentionMonths;
const sql = neon(process.env.DATABASE_URL);

const stale = sql`
  select c.id from classes c
  where c.created_at < now() - make_interval(months => ${months})
    and not exists (
      select 1 from students s join attempts a on a.student_id = s.id
      where s.class_id = c.id and a.created_at >= now() - make_interval(months => ${months}))`;

const rows = apply
  ? await sql`delete from classes where id in (${stale}) returning name`
  : await sql`select name from classes where id in (${stale})`;

console.log(`${apply ? "Apagadas" : "Seriam apagadas"} ${rows.length} turma(s) sem atividade há ${months} meses.`);
for (const r of rows) console.log(`- ${r.name}`);
if (!apply && rows.length) console.log("Rode com --apply para apagar.");
