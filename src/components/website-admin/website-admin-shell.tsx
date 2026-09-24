"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, ImageIcon, Newspaper, Phone, Settings, ShieldCheck, Stethoscope, Users } from "lucide-react";
import type { ReactNode } from "react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { cn } from "@/lib/utils";

const websiteAdminNavItems = [
  { label: "Dashboard", href: "/website-admin", icon: Home },
  { label: "Homepage", href: "/website-admin/homepage", icon: FileText },
  { label: "Services", href: "/website-admin/services", icon: Stethoscope },
  { label: "Doctors", href: "/website-admin/doctors", icon: Users },
  { label: "News", href: "/website-admin/news", icon: Newspaper },
  { label: "HMO", href: "/website-admin/hmo", icon: ShieldCheck },
  { label: "Careers", href: "/website-admin/careers", icon: FileText },
  { label: "Contact", href: "/website-admin/contact", icon: Phone },
  { label: "Media", href: "/website-admin/media", icon: ImageIcon },
  { label: "Settings", href: "/website-admin/settings", icon: Settings },
];

export function WebsiteAdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/website-admin">
            <MCMCLogo variant="horizontal" className="max-h-14 max-w-[210px]" />
          </Link>
        </div>
        <nav className="grid gap-1 p-4">
          {websiteAdminNavItems.map((item) => {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-primary)]">Website Admin</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">Public website content management</h1>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
