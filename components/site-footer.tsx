import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 py-6 text-center text-sm text-muted-foreground print:hidden">
      <Link href="/privacidade" className="rounded-md underline-offset-4 hover:text-foreground hover:underline">
        Privacidade e cookies
      </Link>
    </footer>
  );
}
