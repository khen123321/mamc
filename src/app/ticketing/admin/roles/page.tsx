import { RolesManagementClient } from "@/components/admin/roles-management-client";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";

export default function TicketingRolesPage() {
  return <TicketingShell><RolesManagementClient /></TicketingShell>;
}
