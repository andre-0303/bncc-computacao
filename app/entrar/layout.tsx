import type { Metadata } from "next";

// A página é Client Component (useActionState); o título fica aqui.
export const metadata: Metadata = { title: "Entrar" };

export default function Layout({ children }: LayoutProps<"/entrar">) {
  return children;
}
