import { AuditLogsClient } from "@/components/admin/audit-logs-client";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";

export default function TicketingAuditLogsPage() {
  return <TicketingShell><AuditLogsClient /></TicketingShell>;
}
