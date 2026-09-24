import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketingSettingsPage() {
  return <TicketingShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Ticketing Settings</h2><p className="mt-2 text-sm leading-6 text-slate-600">Configure internal ticketing workflow preferences. Queue counters and public website content are managed in their own systems.</p></CardContent></Card></TicketingShell>;
}
