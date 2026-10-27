import { setDefaultResultOrder } from "node:dns";
import { defineConfig } from "drizzle-kit";

// IPv4 primeiro: ver lib/db/index.ts.
setDefaultResultOrder("ipv4first");

export default defineConfig({
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
