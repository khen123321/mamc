import { UsersClient } from "@/components/admin/users-client";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";

export default function TicketingUsersPage() {
  return <TicketingShell><UsersClient /></TicketingShell>;
}
