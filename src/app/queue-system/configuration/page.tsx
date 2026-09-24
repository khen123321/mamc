import { QueueConfigurationClient } from "@/components/admin/queue-configuration-client";
import { QueueSystemShell } from "@/components/queue-system/queue-system-shell";

export default function QueueSystemConfigurationPage() {
  return <QueueSystemShell><QueueConfigurationClient /></QueueSystemShell>;
}
