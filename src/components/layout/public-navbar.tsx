"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { hospital } from "@/constants/hospital";
import { demoNavItems, publicNavItems, secondaryNavItems } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { PublicContainer } from "@/components/layout/page-shell";

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-[var(--mcmc-primary-dark)] text-white">
        <PublicContainer className="flex h-9 items-center justify-between gap-4 text-xs font-medium md:h-10">
          <span>
            {hospital.infoDesk.label}: {hospital.infoDesk.hours}
          </span>
          <span className="hidden items-center gap-4 sm:flex">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Phone className="h-3.5 w-3.5" />
              {hospital.infoDesk.phoneNumbers[0]}
            </span>
            <span className="whitespace-nowrap">
              {hospital.emergency.label}: {hospital.emergency.availability}
            </span>
          </span>
        </PublicContainer>
      </div>

      <PublicContainer className="flex h-16 items-center justify-between xl:grid xl:h-[86px] xl:grid-cols-[220px_minmax(0,1fr)_auto] xl:gap-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <MCMCLogo variant="mark" className="max-h-10 w-auto sm:hidden" />
          <MCMCLogo variant="horizontal" className="hidden max-h-12 w-auto max-w-[180px] sm:block xl:max-h-16 xl:max-w-[220px]" />
        </Link>

        <nav className="hidden items-center justify-center gap-6 text-sm font-medium text-slate-600 xl:flex">
          {publicNavItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="inline-flex items-center gap-1 py-7 hover:text-[var(--mcmc-primary)]">
                {item.label}
                {item.children ? <ChevronDown className="h-3.5 w-3.5" /> : null}
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
          ))}
        </nav>

        <div className="hidden items-center justify-end xl:flex">
          <Link href={demoNavItems[0].href}>
            <Button>Demo Hub</Button>
          </Link>
        </div>

        <button className="rounded-md border border-slate-200 p-2 xl:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </PublicContainer>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/30 xl:hidden">
          <div className="ml-auto min-h-full w-full max-w-sm bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <MCMCLogo variant="horizontal" className="max-h-16 w-auto max-w-[190px]" />
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
                  <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-semibold text-slate-800 hover:bg-slate-50">
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
              <Link href="/demo" onClick={() => setOpen(false)}>
                <Button className="w-full">Demo Hub</Button>
              </Link>
              <Link href="/doctors" onClick={() => setOpen(false)}>
                <Button className="w-full" variant="secondary">
                  Find a Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
