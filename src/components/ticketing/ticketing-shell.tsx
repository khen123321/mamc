"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ClipboardList, FileCheck2, History, LayoutDashboard, Settings, Shield, Stethoscope, Users } from "lucide-react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { DemoRoleSwitcher } from "@/components/auth/demo-role-switcher";
import { cn } from "@/lib/utils";

const ticketingNavItems = [
  { label: "Dashboard", href: "/ticketing", icon: LayoutDashboard },
  { label: "All Tickets", href: "/ticketing/tickets", icon: ClipboardList },
  { label: "Assignments", href: "/ticketing/assignments", icon: FileCheck2 },
  { label: "Doctors", href: "/ticketing/doctors", icon: Stethoscope },
  { label: "My Tickets", href: "/ticketing/my-tickets", icon: ClipboardList },
  { label: "Departments", href: "/ticketing/departments", icon: Users },
  { label: "Users", href: "/ticketing/admin/users", icon: Users },
  { label: "Roles", href: "/ticketing/admin/roles", icon: Shield },
  { label: "Audit Logs", href: "/ticketing/admin/audit-logs", icon: History },
  { label: "Settings", href: "/ticketing/admin/settings", icon: Settings },
];

export function TicketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[292px_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/ticketing">
            <MCMCLogo variant="horizontal" className="max-h-14 max-w-[210px]" />
          </Link>
        </div>
        <div className="border-b border-slate-100 p-4">
          <DemoRoleSwitcher />
        </div>
        <nav className="grid gap-1 p-4">
          {ticketingNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/ticketing" && pathname.startsWith(`${item.href}/`));
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">Internal Ticketing System</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">Staff and doctor workflow management</h1>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
