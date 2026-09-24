import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminServicesPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Public Services Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">Maintain service descriptions, patient-facing instructions, and visibility settings for public website service pages.</p></CardContent></Card></WebsiteAdminShell>;
}
