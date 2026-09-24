import { cn } from "@/lib/utils";

export function MCMCTagline({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("block font-semibold leading-tight tracking-tight text-[var(--brand-text)]", className)}>
      <span>where </span>
      <em className="font-serif italic text-[var(--brand-primary)]">Compassion</em>
      {compact ? <span> meets </span> : <span> </span>}
      {!compact ? <br /> : null}
      {!compact ? <span>meets </span> : null}
      <em className="font-serif italic text-[var(--brand-secondary)]">Excellence</em>
    </span>
  );
}
