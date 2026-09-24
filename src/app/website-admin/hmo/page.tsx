import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminHmoPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">HMO & Insurance Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">Update public guidance for accepted HMOs, requirements, and insurance desk information.</p></CardContent></Card></WebsiteAdminShell>;
}
