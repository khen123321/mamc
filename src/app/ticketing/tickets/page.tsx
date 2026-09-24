import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { InternalTicketList } from "@/components/ticketing/internal-ticket-list";

export default function TicketingTicketsPage() {
  return <TicketingShell><InternalTicketList /></TicketingShell>;
}
