// Cria um professor direto no banco. Não existe cadastro pela interface, por segurança.
// Uso: pnpm teacher:create "Nome do Professor" email@escola.br
import { randomBytes } from "node:crypto";
import { setDefaultResultOrder } from "node:dns";
import { neon } from "@neondatabase/serverless";
import { hashSecret } from "../lib/secrets.ts";

// IPv4 primeiro: ver lib/db/index.ts.
setDefaultResultOrder("ipv4first");

const [name, rawEmail] = process.argv.slice(2);
const email = rawEmail?.trim().toLowerCase();
if (!name?.trim() || !email?.includes("@")) {
  console.error('Uso: pnpm teacher:create "Nome do Professor" email@escola.br');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida (confira o .env).");
  process.exit(1);
}

// Senha gerada aqui e mostrada uma única vez: entregue ao professor por um canal seguro.
const password = randomBytes(12).toString("base64url");
const sql = neon(process.env.DATABASE_URL);
const rows = await sql`
  insert into teachers (name, email, password_hash)
  values (${name.trim()}, ${email}, ${await hashSecret(password)})
  on conflict (email) do nothing
  returning id`;

if (!rows.length) {
  console.error(`Já existe um professor com o e-mail ${email}.`);
  process.exit(1);
}
console.log(`Professor criado: ${name.trim()} <${email}>`);
console.log(`Senha: ${password}`);
console.log("Guarde agora: ela não será mostrada de novo.");
