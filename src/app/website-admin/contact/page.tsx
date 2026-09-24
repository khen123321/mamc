import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminContactPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Contact Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">Maintain public contact numbers, department contact copy, office hours, and inquiry page content.</p></CardContent></Card></WebsiteAdminShell>;
}
