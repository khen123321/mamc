"use client";

import { useEffect, useState } from "react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { hospital } from "@/constants/hospital";
import { queueService } from "@/lib/services/queue-service";

export function QueueDisplay() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const counters = queueService.getNowServing();
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--brand-primary)] p-4 text-white sm:p-8">
      <div className="flex flex-col gap-6 border-b border-white/15 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex rounded-md bg-white p-3"><MCMCLogo variant="horizontal" className="max-h-14 w-auto max-w-[220px]" /></div>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/80 sm:text-lg sm:tracking-[0.24em]">{hospital.name}</p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Now Serving</h1>
        </div>
        <div className="text-left md:text-right"><p className="text-3xl font-semibold sm:text-4xl">{now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p><p className="mt-2 text-lg text-white/80 sm:text-xl">{now.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })}</p></div>
      </div>
      <div className="mt-10 grid gap-6 xl:grid-cols-2">{counters.map((counter) => <div key={counter.counterId} className="rounded-lg border border-white/10 bg-white p-5 text-[var(--brand-primary)] sm:p-8"><p className="text-5xl font-bold tracking-tight sm:text-7xl">{counter.currentTicketNumber}</p><p className="mt-4 text-2xl font-semibold text-[var(--brand-primary)] sm:text-3xl">{counter.label}</p></div>)}</div>
      <p className="mt-10 text-center text-2xl text-white/80 sm:text-3xl">Please wait for your number to be called.</p>
    </main>
  );
}

