import { KioskClient } from "@/components/kiosk/kiosk-client";
import { queueService } from "@/lib/services/queue-service";

export default function QueueSystemKioskPage() {
  return <KioskClient services={queueService.getServices()} />;
}
