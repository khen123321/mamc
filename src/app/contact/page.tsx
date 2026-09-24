import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { hospital } from "@/constants/hospital";

export default function ContactPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="Contact" title="Contact MCMC" description="Find location, hours, and phone information for patient inquiries." /><div className="grid gap-6 md:grid-cols-2"><div className="rounded-xl border border-[var(--brand-border)] bg-white p-6"><h2 className="font-semibold text-slate-950">Address</h2><p className="mt-2 text-slate-600">{hospital.address}</p></div><div className="rounded-xl border border-[var(--brand-border)] bg-white p-6"><h2 className="font-semibold text-slate-950">Info Desk</h2><p className="mt-2 text-slate-600">{hospital.infoDesk.hours}</p><p className="mt-2 text-slate-600">{hospital.infoDesk.phoneNumbers.join(" | ")}</p><p className="text-slate-600">{hospital.infoDesk.mobileNumbers.join(" | ")}</p></div></div></PageShell><SiteFooter /></>;
}
