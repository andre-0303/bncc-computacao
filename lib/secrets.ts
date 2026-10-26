// Sem imports com "@/": este arquivo também é usado pelo script scripts/create-teacher.ts.
import { randomBytes, randomInt, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (pw: string, salt: string, len: number) => Promise<Buffer>;

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

// Sem 0/O/1/I para não confundir na hora de copiar.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Código de acesso do aluno: 8 caracteres (32^8 ≈ 1 trilhão de combinações), guardado
 * em texto puro porque o professor precisa consultá-lo para imprimir ou reenviar.
 */
export const newAccessCode = () => Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
