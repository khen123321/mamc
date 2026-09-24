import { QueueSystemShell } from "@/components/queue-system/queue-system-shell";
import { StaffQueueDashboard } from "@/components/queue/staff-queue-dashboard";

export default function QueueSystemOperatorPage() {
  return <QueueSystemShell><StaffQueueDashboard /></QueueSystemShell>;
}
