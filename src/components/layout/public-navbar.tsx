"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { hospital } from "@/constants/hospital";
import { publicNavItems, secondaryNavItems } from "@/constants/navigation";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { PublicContainer } from "@/components/layout/page-shell";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="border-b border-white/10 bg-[var(--brand-primary)] text-white">
        <PublicContainer className="flex min-h-8 items-center justify-between gap-4 py-1.5 text-[12px] font-medium leading-none md:min-h-9 md:text-[13px]">
          <span className="hidden sm:inline">
            {hospital.infoDesk.label}: {hospital.infoDesk.hours}
          </span>
          <a href={`tel:${hospital.infoDesk.phoneNumbers[0].replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-white/85 sm:hidden">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {hospital.infoDesk.phoneNumbers[0]}
          </a>
          <span className="hidden items-center gap-5 sm:flex">
            <a href={`tel:${hospital.infoDesk.phoneNumbers[0].replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 whitespace-nowrap hover:text-white/85">
              <Phone className="h-3.5 w-3.5" />
              {hospital.infoDesk.phoneNumbers[0]}
            </a>
            <span className="whitespace-nowrap">
              {hospital.emergency.label}: {hospital.emergency.availability}
            </span>
          </span>
          <span className="whitespace-nowrap sm:hidden">
            {hospital.emergency.label}: {hospital.emergency.availability}
          </span>
        </PublicContainer>
      </div>

      <PublicContainer className="flex h-[74px] items-center justify-between xl:grid xl:h-[104px] xl:grid-cols-[370px_minmax(0,1fr)] xl:gap-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <MCMCLogo variant="mark" className="max-h-[58px] w-auto sm:hidden" />
          <MCMCLogo variant="horizontal" className="hidden max-h-[72px] w-auto max-w-[280px] sm:block xl:max-h-[100px] xl:max-w-[365px]" />
        </Link>

        <nav className="hidden items-center justify-end gap-7 text-[15px] font-medium text-slate-600 xl:flex">
          {publicNavItems.map((item) => {
            const isActive = pathname === item.href || Boolean(item.children?.some((child) => pathname === child.href));
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center gap-1 py-8 transition hover:text-[var(--brand-primary)]",
                    isActive ? "text-[var(--brand-primary)] after:absolute after:bottom-5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[var(--brand-primary)]" : "",
                  )}
                >
                  {item.label}
                  {item.children ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[var(--brand-primary)]">
                        {child.label}
                      </Link>
                    ))}
                    {secondaryNavItems.map((child) => (
                      <Link key={child.href} href={child.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[var(--brand-primary)]">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button className="rounded-md border border-slate-200 p-2 xl:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </PublicContainer>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/30 xl:hidden">
          <div className="ml-auto min-h-full w-full max-w-sm bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <MCMCLogo variant="horizontal" className="max-h-[76px] w-auto max-w-[260px]" />
              </div>
              <button className="rounded-md border border-slate-200 p-2" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              Info Desk: {hospital.infoDesk.phoneNumbers[0]}
            </p>
            <nav className="mt-5 grid gap-2">
              {publicNavItems.map((item) => (
                <div key={item.label}>
                  <Link href={item.href} onClick={() => setOpen(false)} className={cn("block rounded-md px-3 py-3 font-semibold text-slate-800 hover:bg-slate-50", pathname === item.href ? "text-[var(--brand-primary)]" : "")}>
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="ml-3 grid gap-1 border-l border-slate-200 pl-3">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {secondaryNavItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-semibold text-slate-800 hover:bg-slate-50">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid gap-2">
              <Link href="/doctors" onClick={() => setOpen(false)} className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--brand-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--brand-primary-hover)]">
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
