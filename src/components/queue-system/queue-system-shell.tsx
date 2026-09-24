"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BarChart3, Monitor, PanelsTopLeft, Settings, TabletSmartphone, UserRoundCog } from "lucide-react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { cn } from "@/lib/utils";

const queueSystemNavItems = [
  { label: "Dashboard", href: "/queue-system", icon: PanelsTopLeft },
  { label: "Operator", href: "/queue-system/operator", icon: UserRoundCog },
  { label: "Configuration", href: "/queue-system/configuration", icon: Settings },
  { label: "Kiosk", href: "/queue-system/kiosk", icon: TabletSmartphone },
  { label: "Display", href: "/queue-system/display", icon: Monitor },
  { label: "Reports", href: "/queue-system/reports", icon: BarChart3 },
];

export function QueueSystemShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/queue-system">
            <MCMCLogo variant="horizontal" className="max-h-14 max-w-[210px]" />
          </Link>
        </div>
        <nav className="grid gap-1 p-4">
          {queueSystemNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-[var(--brand-primary)]", active && "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)] hover:text-white")}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0">
        <header className="border-b border-slate-200 bg-white px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">Queue Management System</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">Queue number generation, counters, kiosk, and display</h1>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
