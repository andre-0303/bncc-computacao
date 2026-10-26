/** Esqueleto enquanto o mapa ou a trilha carregam: um trecho de linha com estações vazias. */
export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Carregando">
      <div className="space-y-3">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="h-4 w-64 max-w-full rounded bg-muted" />
      </div>
      <div className="relative space-y-6 motion-safe:animate-pulse">
        <span className="absolute top-4 bottom-4 left-[15px] w-2 rounded-full bg-muted" />
        {[40, 56, 48].map((w) => (
          <div key={w} className="relative flex items-center gap-4">
            <span className="size-8 shrink-0 rounded-full border-[5px] border-muted bg-white" />
            <span className="h-5 rounded bg-muted" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
