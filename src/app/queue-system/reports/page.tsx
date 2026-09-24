import { QueueSystemShell } from "@/components/queue-system/queue-system-shell";
import { Card, CardContent } from "@/components/ui/card";
import { queueService } from "@/lib/services/queue-service";

export default function QueueSystemReportsPage() {
  const counters = queueService.getCounters();
  return <QueueSystemShell><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{counters.map((counter) => <Card key={counter.counterId}><CardContent><p className="text-sm text-slate-500">{queueService.getServiceById(counter.serviceId)?.name ?? counter.serviceId}</p><h2 className="mt-2 text-2xl font-semibold text-slate-950">{counter.currentTicketNumber}</h2><p className="mt-1 text-sm text-slate-600">{counter.label}</p></CardContent></Card>)}</div></QueueSystemShell>;
}
