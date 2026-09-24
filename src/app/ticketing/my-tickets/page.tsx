import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { InternalTicketList } from "@/components/ticketing/internal-ticket-list";

export default function MyTicketsPage() {
  return <TicketingShell><InternalTicketList assigneeName="Nurse Camille" /></TicketingShell>;
}
