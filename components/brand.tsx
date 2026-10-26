import Link from "next/link";

/** Marca: três linhas (os eixos da BNCC) chegando numa estação de baldeação. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M2 9h10l4 7" stroke="var(--line-pc)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 23h10l4-7" stroke="var(--line-md)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16h14" stroke="var(--line-cd)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="16" r="5" fill="#fff" stroke="var(--ink)" strokeWidth="3" />
    </svg>
  );
}

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-md font-extrabold tracking-tight">
      <BrandMark className="size-7" />
      <span>Computação 9º ano</span>
    </Link>
  );
}
