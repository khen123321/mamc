import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="Careers" title="Careers at MCMC" description="Join a healthcare team committed to compassionate service and excellence." /><div className="rounded-xl border border-[var(--brand-border)] bg-white p-6"><p className="leading-7 text-slate-600">Explore career opportunities, applicant guidance, and information for healthcare professionals interested in MCMC.</p><Button className="mt-6" variant="outline">View Open Positions</Button></div></PageShell><SiteFooter /></>;
}
