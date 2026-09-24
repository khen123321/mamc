import Link from "next/link";
import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { internalTicketService } from "@/lib/services/internal-ticket-service";

export default function TicketingPage() {
  const stats = internalTicketService.getStats();
  return (
    <TicketingShell>
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Object.entries(stats).map(([label, value]) => (
          <Card key={label}><CardContent><p className="text-sm capitalize text-slate-500">{label.replace(/([A-Z])/g, " $1")}</p><p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p></CardContent></Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Internal staff workflow</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Internal tickets use TKT-2026-XXXX references and are separate from Queue Management numbers.</p>
          </div>
          <Link href="/ticketing/tickets"><Button>View Internal Tickets</Button></Link>
        </CardContent>
      </Card>
    </TicketingShell>
  );
}
