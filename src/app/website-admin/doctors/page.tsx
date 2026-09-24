import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";
import { doctorService } from "@/lib/services/doctor-service";

export default function WebsiteAdminDoctorsPage() {
  const doctors = doctorService.getDoctors();
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Doctor Directory Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">{doctors.length} doctors are available in the mock public directory. This area is reserved for profile visibility and website copy management.</p></CardContent></Card></WebsiteAdminShell>;
}
