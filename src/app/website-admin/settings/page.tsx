import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function WebsiteAdminSettingsPage() {
  return <WebsiteAdminShell><Card><CardContent><h2 className="text-xl font-semibold text-slate-950">Website Settings</h2><p className="mt-2 text-sm leading-6 text-slate-600">Configure website publication preferences for the mock demo. This does not manage hospital staff roles or queue operations.</p></CardContent></Card></WebsiteAdminShell>;
}
