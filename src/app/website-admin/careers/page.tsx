import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminCareersPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Careers Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">Manage public job posts, recruitment notes, and careers page messaging for the hospital website.</p></CardContent></Card></WebsiteAdminShell>;
}
