import Image from "next/image";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { hospital } from "@/constants/hospital";
import { presentationImages } from "@/constants/presentation-images";

export default function AboutPage() {
  return (
    <>
      <PublicNavbar />
      <PageShell>
        <PageHeader eyebrow="About MCMC" title="About Madonna and Child Medical Center" description={`${hospital.name} has served the Cagayan de Oro community since ${hospital.foundedYear}.`} />
        <div className="grid gap-8 rounded-xl border border-[var(--brand-border)] bg-white p-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="leading-7 text-slate-600">
              Madonna and Child Medical Center supports patients and families with compassionate care, practical access to services, and a commitment to excellence in healthcare.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
            <Image src={presentationImages.aboutHospitalCare.src} alt={presentationImages.aboutHospitalCare.alt} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
          </div>
        </div>
      </PageShell>
      <SiteFooter />
    </>
  );
}
