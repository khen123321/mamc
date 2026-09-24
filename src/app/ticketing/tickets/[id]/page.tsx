import { notFound } from "next/navigation";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { internalTicketService } from "@/lib/services/internal-ticket-service";

export default async function InternalTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = internalTicketService.getTicketById(id);
  if (!ticket) notFound();
  return (
    <TicketingShell>
      <Card>
        <CardContent>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">{ticket.ticketNumber}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{ticket.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{ticket.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Detail label="Department" value={ticket.departmentName} />
            <Detail label="Status" value={ticket.status} />
            <Detail label="Assigned To" value={ticket.assignedUserName ?? ticket.assignedDoctorName ?? "Unassigned"} />
          </div>
        </CardContent>
      </Card>
    </TicketingShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p><p className="mt-1 font-semibold text-slate-950">{value}</p></div>;
}
