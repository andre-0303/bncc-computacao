import type { Metadata } from "next";
import { Overpass, Overpass_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Computação 9º ano", template: "%s | Computação 9º ano" },
  description: "Microaprendizagem de Computação (BNCC) para o 9º ano, complemento às aulas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${overpass.variable} ${overpassMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-lg bg-ink px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {children}
        <SiteFooter />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
