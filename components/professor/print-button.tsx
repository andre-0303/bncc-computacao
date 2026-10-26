"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button size="lg" className="h-11 px-5" onClick={() => window.print()}>
      <Printer aria-hidden />
      Imprimir
    </Button>
  );
}
