"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { queueService } from "@/lib/services/queue-service";
import type { QueueService } from "@/types/queue";

export function QueueGenerator({ services, ticketPath = "/queue-system/kiosk" }: { services: QueueService[]; ticketPath?: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState("QS-ADM");
  function generate() {
    const ticket = queueService.generateTicket(selected);
    window.localStorage.setItem("sr-queue-ticket", JSON.stringify(ticket));
    router.push(ticketPath);
  }
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <button key={service.serviceId} onClick={() => setSelected(service.serviceId)} className={`rounded-lg border bg-white p-5 text-left shadow-sm transition ${selected === service.serviceId ? "border-[var(--brand-primary)] ring-4 ring-[var(--brand-focus)]" : "border-slate-200 hover:border-[var(--brand-secondary)]"}`}><ClipboardList className="h-7 w-7 text-[var(--brand-primary)]" /><p className="mt-4 font-semibold text-slate-950">{service.name}</p><p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p></button>)}</div>
      <Card><CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-secondary)]">Selected Service</p><p className="mt-1 text-xl font-semibold text-slate-950">{services.find((service) => service.serviceId === selected)?.name}</p></div><Button onClick={generate} size="lg">Generate Queue Number</Button></CardContent></Card>
    </div>
  );
}

