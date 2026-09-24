"use client";

import { useState } from "react";
import { ArrowRightLeft, CheckCircle2, RotateCcw, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { queueService } from "@/lib/services/queue-service";
import type { QueueService, QueueTicket } from "@/types/queue";

export function StaffQueueDashboard({ services = queueService.getServices() }: { services?: QueueService[] }) {
  const [serviceId, setServiceId] = useState("QS-ADM");
  const [ticket, setTicket] = useState<QueueTicket>(queueService.generateTicket("QS-ADM"));
  const [transferTo, setTransferTo] = useState("QS-CASH");
  const service = queueService.getServiceById(serviceId) ?? services[0];
  function callNext() { const next = queueService.callNext(serviceId) ?? queueService.generateTicket(serviceId); setTicket({ ...next, status: "serving", counter: service.counterLabel }); }
  function transfer() { setTicket(queueService.transferTicket({ ...ticket, status: "completed" }, transferTo)); }
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <Card><CardHeader><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-secondary)]">{service.name}</p><h1 className="mt-2 text-3xl font-semibold">Now Serving</h1></div><Select value={serviceId} onChange={(e) => { setServiceId(e.target.value); setTicket(queueService.generateTicket(e.target.value)); }}>{services.map((item) => <option key={item.serviceId} value={item.serviceId}>{item.name}</option>)}</Select></div></CardHeader><CardContent className="space-y-6"><div className="rounded-lg bg-[var(--brand-primary)] p-8 text-center text-white"><p className="text-sm uppercase tracking-[0.22em] text-white/80">{ticket.counter}</p><p className="mt-4 text-7xl font-bold tracking-tight">{ticket.ticketNumber}</p></div><div className="grid gap-3 sm:grid-cols-5"><Button onClick={callNext}><Volume2 className="h-4 w-4" />Call Next</Button><Button variant="outline"><RotateCcw className="h-4 w-4" />Recall</Button><Button variant="outline"><SkipForward className="h-4 w-4" />Skip</Button><Button variant="secondary" onClick={transfer}><ArrowRightLeft className="h-4 w-4" />Transfer</Button><Button variant="outline" onClick={() => setTicket({ ...ticket, status: "completed" })}><CheckCircle2 className="h-4 w-4" />Complete</Button></div><div className="grid gap-3 sm:grid-cols-4">{[["Waiting", "13"], ["Serving", "3"], ["Completed Today", "86"], ["Average Wait", "14 min"]].map(([label, value]) => <div key={label} className="rounded-lg bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div>)}</div></CardContent></Card>
      <Card><CardHeader><h2 className="text-xl font-semibold">Optional Transfer</h2><p className="text-sm text-slate-500">Create a new queue number only when staff intentionally transfers this service transaction.</p></CardHeader><CardContent className="space-y-4"><Select value={transferTo} onChange={(e) => setTransferTo(e.target.value)}>{services.filter((item) => item.serviceId !== serviceId).map((item) => <option key={item.serviceId} value={item.serviceId}>{item.name}</option>)}</Select><Button onClick={transfer} className="w-full">Generate Transfer Number</Button><div className="space-y-3"><p className="font-semibold">Queue Number Journey</p>{ticket.journey.map((step) => <div key={`${step.ticketNumber}-${step.time}`} className="rounded-lg border border-slate-200 p-3"><p className="font-semibold">{step.ticketNumber}</p><p className="text-sm text-slate-500">{step.serviceName} - {step.status} - {step.time}</p></div>)}</div></CardContent></Card>
    </div>
  );
}

