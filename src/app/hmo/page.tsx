import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function HmoPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="HMO & Insurance" title="HMO & Insurance Information" description="Prepare requirements and know where to go for insurance-related assistance." /><div className="rounded-xl border border-[var(--brand-border)] bg-white p-6"><p className="leading-7 text-slate-600">Patients may prepare HMO cards, valid identification, and authorization documents before proceeding to the HMO / Insurance counter.</p><Button className="mt-6" variant="outline">View Accredited HMOs</Button></div></PageShell><SiteFooter /></>;
}
