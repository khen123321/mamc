import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { InternalTicketList } from "@/components/ticketing/internal-ticket-list";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketingAssignmentsPage() {
  return <TicketingShell><Card className="mb-6"><CardContent><h2 className="text-xl font-semibold text-slate-950">Assignments</h2><p className="mt-2 text-sm leading-6 text-slate-600">Assign and review internal workflow tickets for staff and doctors. This is not Queue Management.</p></CardContent></Card><InternalTicketList /></TicketingShell>;
}
