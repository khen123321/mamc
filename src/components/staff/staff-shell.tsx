import Link from "next/link";
import { Activity, CalendarDays, ClipboardList, LogOut, UserCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MCMCLogo } from "@/components/brand/mcmc-logo";

const navItems = [
  { label: "Queue Dashboard", href: "/staff/queue", icon: ClipboardList },
  { label: "My Queue", href: "/staff/doctor", icon: UserRound },
  { label: "Appointments", href: "/staff", icon: CalendarDays },
  { label: "Schedule", href: "/staff", icon: Activity },
  { label: "Visit Assignment", href: "/admin/patient-assignment", icon: UserCheck },
];

export function StaffShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="border-b border-slate-200 bg-[var(--brand-primary)] text-white lg:min-h-screen lg:w-72 lg:border-b-0">
        <div className="p-6">
          <Link href="/" className="inline-flex rounded-md bg-white p-3">
            <MCMCLogo variant="horizontal" className="w-[190px]" />
          </Link>
          <p className="mt-3 text-xs leading-5 text-white/80">Concept Demo - Mock Operational Data</p>
        </div>
        <nav className="grid gap-1 px-3 pb-4 md:grid-cols-2 lg:block">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/10">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mcmc-primary)]">Internal Operations</p>
              <h1 className="text-2xl font-semibold text-slate-950">Staff Portal</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <UserRound className="h-4 w-4" />
                Queue Staff
              </Button>
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
