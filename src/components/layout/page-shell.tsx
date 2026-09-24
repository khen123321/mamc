import { cn } from "@/lib/utils";

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn("mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-[88px]", className)}>{children}</main>;
}

export function PublicContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function PublicSection({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-12 md:py-16 lg:py-[88px]", className)} {...props}>{children}</section>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 md:text-base">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 md:text-base">{description}</p> : null}
    </div>
  );
}
