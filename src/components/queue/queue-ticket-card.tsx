import Link from "next/link";
import { Map, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QueueService, QueueTicket } from "@/types/queue";

export function QueueTicketCard({ ticket, service }: { ticket: QueueTicket; service: QueueService }) {
  return (
    <Card className="mx-auto max-w-xl overflow-hidden">
      <div className="bg-[var(--brand-primary)] px-6 py-6 text-center text-white"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{service.name}</p><h1 className="mt-3 text-6xl font-bold tracking-tight">{ticket.ticketNumber}</h1></div>
      <CardContent className="space-y-5 text-center">
        <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-slate-50 p-4"><p className="text-sm text-slate-500">Now Serving</p><p className="mt-1 text-2xl font-semibold text-slate-950">{service.prefix}{String(Number(ticket.ticketNumber.split("-")[1]) - 5).padStart(3, "0")}</p></div><div className="rounded-lg bg-slate-50 p-4"><p className="text-sm text-slate-500">Counter</p><p className="mt-1 text-2xl font-semibold text-slate-950">{ticket.counter}</p></div></div>
        <p className="text-lg font-semibold text-slate-950">{ticket.peopleAhead} people ahead</p><p className="text-slate-600">Estimated waiting time: ~{ticket.estimatedWaitMinutes} minutes</p>
        <div className="flex flex-wrap justify-center gap-2"><Link href="/hospital-map"><Button variant="outline"><Map className="h-4 w-4" />View Hospital Map</Button></Link><Button variant="danger">Leave Queue</Button><Link href="/queue-system/kiosk"><Button variant="secondary"><Home className="h-4 w-4" />Return to Kiosk</Button></Link></div>
      </CardContent>
    </Card>
  );
}

