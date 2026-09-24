import Link from "next/link";
import { QueueSystemShell } from "@/components/queue-system/queue-system-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { queueService } from "@/lib/services/queue-service";

export default function QueueSystemPage() {
  const services = queueService.getServices();
  const counters = queueService.getCounters();
  return (
    <QueueSystemShell>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent><p className="text-sm text-slate-500">Queue Services</p><p className="mt-2 text-3xl font-semibold text-slate-950">{services.length}</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-slate-500">Active Counters</p><p className="mt-2 text-3xl font-semibold text-slate-950">{counters.length}</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-slate-500">Public Display</p><p className="mt-2 text-3xl font-semibold text-slate-950">Live</p></CardContent></Card>
      </div>
      <Card className="mt-6">
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><h2 className="text-xl font-semibold text-slate-950">Queue numbers only</h2><p className="mt-2 text-sm leading-6 text-slate-600">This system generates service queue numbers such as HMO-023 and CASH-041. It does not manage internal staff workflow tickets.</p></div>
          <div className="flex flex-wrap gap-2"><Link href="/queue-system/operator"><Button>Open Operator</Button></Link><Link href="/queue-system/kiosk"><Button variant="outline">Open Kiosk</Button></Link></div>
        </CardContent>
      </Card>
    </QueueSystemShell>
  );
}
