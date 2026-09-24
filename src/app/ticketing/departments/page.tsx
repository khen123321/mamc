import { DepartmentsClient } from "@/components/admin/departments-client";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";

export default function TicketingDepartmentsPage() {
  return <TicketingShell><DepartmentsClient /></TicketingShell>;
}
