import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/** Volta um nível. O ::after aumenta a área de toque para ~44px sem mexer no layout. */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-semibold text-muted-foreground after:absolute after:-inset-x-2 after:-inset-y-3 hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden />
      {children}
    </Link>
  );
}
