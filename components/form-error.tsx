import { CircleAlert } from "lucide-react";

export function FormError({ error, id }: { error?: string; id?: string }) {
  if (!error) return null;
  return (
    <p
      id={id}
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border-l-4 border-bad bg-bad-soft px-3 py-2.5 text-sm font-medium text-[#8f1d22] animate-in fade-in slide-in-from-top-1"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-bad" aria-hidden />
      {error}
    </p>
  );
}
