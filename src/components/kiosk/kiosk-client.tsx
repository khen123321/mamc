"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { Button } from "@/components/ui/button";
import { hospital } from "@/constants/hospital";
import { queueService } from "@/lib/services/queue-service";
import type { QueueService, QueueTicket } from "@/types/queue";

export function KioskClient({ services }: { services: QueueService[] }) {
  const [selected, setSelected] = useState<QueueService | null>(null);
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  return (
    <main className="min-h-screen bg-[var(--brand-primary)] p-6 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center">
        <div className="mx-auto inline-flex rounded-md bg-white p-4">
          <MCMCLogo variant="vertical" className="w-[280px]" />
        </div>
        <p className="mt-8 text-center text-xl uppercase tracking-[0.25em] text-white/80">Welcome to</p><h1 className="mt-3 text-center text-5xl font-semibold">{hospital.name}</h1>
        {!ticket ? <><h2 className="mt-12 text-center text-3xl font-semibold">What can we help you with today?</h2><div className="mt-8 grid gap-4 md:grid-cols-4">{services.map((service) => <button key={service.serviceId} onClick={() => setSelected(service)} className={`min-h-32 rounded-lg border p-6 text-left text-xl font-semibold shadow-lg ${selected?.serviceId === service.serviceId ? "border-white bg-white text-[var(--brand-primary)]" : "border-white/20 bg-white/10 hover:bg-white/15"}`}>{service.name}</button>)}</div><div className="mt-8 flex justify-center"><Button size="lg" disabled={!selected} onClick={() => selected && setTicket(queueService.generateTicket(selected.serviceId))}>Generate Queue Number</Button></div></> : <div className="mx-auto mt-12 w-full max-w-xl rounded-lg bg-white p-10 text-center text-[var(--brand-primary)]"><p className="text-lg uppercase tracking-[0.2em] text-slate-500">Your Number</p><p className="mt-4 text-7xl font-bold">{ticket.ticketNumber}</p><p className="mt-4 text-xl text-slate-600">Please proceed to the waiting area.</p><Button className="mt-8"><Printer className="h-4 w-4" />Print Ticket</Button></div>}
      </div>
    </main>
  );
}

