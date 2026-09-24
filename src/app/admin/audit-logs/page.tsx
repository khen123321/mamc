import { redirect } from "next/navigation";

export default function LegacyAuditLogsPage() {
  redirect("/ticketing/admin/audit-logs");
}
