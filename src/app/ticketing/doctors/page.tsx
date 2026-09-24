import { TicketingShell } from "@/components/ticketing/ticketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { doctorService } from "@/lib/services/doctor-service";

export default function TicketingDoctorsPage() {
  const doctors = doctorService.getDoctors();
  return <TicketingShell><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{doctors.map((doctor) => <Card key={doctor.doctorId}><CardContent><p className="text-sm font-semibold text-[var(--brand-primary)]">{doctor.specialty}</p><h2 className="mt-2 text-lg font-semibold text-slate-950">{doctor.name}</h2><p className="mt-2 text-sm text-slate-600">{doctor.clinicRoom}</p><p className="mt-1 text-sm text-slate-500">{doctor.availability}</p></CardContent></Card>)}</div></TicketingShell>;
}
