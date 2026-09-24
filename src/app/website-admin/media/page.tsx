import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminMediaPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Media Library</h2><p className="mt-2 text-sm leading-6 text-slate-600">Presentation-only placeholder for managing public website images and downloadable public materials.</p></CardContent></Card></WebsiteAdminShell>;
}
