import { setDefaultResultOrder } from "node:dns";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// O Neon publica endereços IPv4 e IPv6. Em redes sem rota IPv6, o Node às vezes tenta
// o IPv6 primeiro e a consulta estoura o tempo (fetch failed, ETIMEDOUT). IPv4 primeiro evita isso.
setDefaultResultOrder("ipv4first");

export const db = drizzle(process.env.DATABASE_URL!, { schema, casing: "snake_case" });
export * from "./schema";
