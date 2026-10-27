import type { Metadata } from "next";

// A página é Client Component (useActionState); o título fica aqui.
export const metadata: Metadata = { title: "Área do professor" };

export default function Layout({ children }: LayoutProps<"/professor/login">) {
  return children;
}
