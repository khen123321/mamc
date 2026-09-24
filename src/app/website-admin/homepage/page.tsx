import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminHomepagePage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Homepage Content</h2><p className="mt-2 text-sm leading-6 text-slate-600">Manage hero copy, quick links, service highlights, and public homepage feature sections for the mock website demo.</p></CardContent></Card></WebsiteAdminShell>;
}
