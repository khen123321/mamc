"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { InternalTicketStatus } from "@/enums/operations";
import { internalTicketService } from "@/lib/services/internal-ticket-service";
import type { InternalTicket } from "@/types/internal-ticket";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statusLabels: Record<InternalTicketStatus, string> = {
  [InternalTicketStatus.OPEN]: "Open",
  [InternalTicketStatus.ASSIGNED]: "Assigned",
  [InternalTicketStatus.IN_PROGRESS]: "In Progress",
  [InternalTicketStatus.PENDING]: "Pending",
  [InternalTicketStatus.RESOLVED]: "Resolved",
  [InternalTicketStatus.CLOSED]: "Closed",
  [InternalTicketStatus.CANCELLED]: "Cancelled",
};

export function InternalTicketList({ assigneeName }: { assigneeName?: string }) {
  const [tickets, setTickets] = useState<InternalTicket[]>(() => (assigneeName ? internalTicketService.getMyTickets(assigneeName) : internalTicketService.getTickets()));

  const visibleTickets = useMemo(() => tickets, [tickets]);

  function updateStatus(ticketId: string, status: InternalTicketStatus) {
    internalTicketService.updateTicket({ ticketId, status });
    setTickets(assigneeName ? internalTicketService.getMyTickets(assigneeName) : internalTicketService.getTickets());
  }

  return (
    <div className="grid gap-4">
      {visibleTickets.map((ticket) => (
        <Card key={ticket.id}>
          <CardContent className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{ticket.ticketNumber}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">{statusLabels[ticket.status]}</span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{ticket.priority}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950">{ticket.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{ticket.description}</p>
              <p className="mt-3 text-sm text-slate-500">
                {ticket.departmentName} · Assigned to {ticket.assignedUserName ?? ticket.assignedDoctorName ?? "Unassigned"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button variant="outline" size="sm" onClick={() => updateStatus(ticket.id, InternalTicketStatus.IN_PROGRESS)}>
                Start
              </Button>
              <Button variant="outline" size="sm" onClick={() => updateStatus(ticket.id, InternalTicketStatus.RESOLVED)}>
                Resolve
              </Button>
              <Link href={`/ticketing/tickets/${ticket.ticketNumber}`}>
                <Button size="sm">
                  View
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
