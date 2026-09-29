import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Baby, CalendarDays, HeartPulse, Hospital, Map, MapPin, Microscope, Pill, Search, Siren, Stethoscope, Users } from "lucide-react";
import { DoctorCard } from "@/components/doctors/doctor-card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicContainer, PublicSection, SectionHeader } from "@/components/layout/page-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { hospital } from "@/constants/hospital";
import { presentationImages } from "@/constants/presentation-images";
import { contentService } from "@/lib/services/content-service";
import { doctorService } from "@/lib/services/doctor-service";

const patientActions = [
  { label: "Find a Doctor", href: "/doctors", icon: Search },
  { label: "Our Services", href: "/services", icon: Hospital },
  { label: "HMO & Insurance", href: "/hmo", icon: Users },
  { label: "Hospital Map", href: "/hospital-map", icon: Map },
];

const heroTrustIndicators = [
  { value: hospital.foundedYear, label: "Serving since", icon: CalendarDays },
  { value: hospital.location.replace(", Philippines", ""), label: "Location", icon: MapPin },
  { value: hospital.emergency.availability, label: "Emergency Care", icon: HeartPulse },
];

const services = [
  { label: "Emergency Care", description: "Urgent care and emergency response available around the clock.", icon: Siren, image: presentationImages.services.emergency },
  { label: "Laboratory", description: "Specimen collection and diagnostic support services.", icon: Microscope, image: presentationImages.services.laboratory },
  { label: "Imaging / Radiology", description: "Imaging coordination and radiology services.", icon: Hospital, image: presentationImages.services.radiology },
  { label: "Pharmacy", description: "Medication pickup and pharmacy assistance.", icon: Pill },
  { label: "Outpatient Services", description: "Clinic-based consultations and follow-up visits.", icon: Stethoscope, image: presentationImages.services.outpatientCare },
  { label: "Maternity Care", description: "Supportive care for mothers and families.", icon: HeartPulse },
  { label: "Pediatric Care", description: "Child wellness and pediatric consultations.", icon: Baby, image: presentationImages.services.pediatrics },
  { label: "Specialty Clinics", description: "Focused care across specialty departments.", icon: Hospital },
];

export default function Home() {
  const featuredDoctors = doctorService.getFeaturedDoctors();
  const news = contentService.getLatestNews();

  return (
    <>
      <PublicNavbar />
      <main>
        <PublicSection className="border-b border-[var(--brand-border)] bg-[#f7f9f8] py-10 md:py-14 lg:py-16">
          <PublicContainer>
            <div className="grid items-center gap-10 xl:min-h-[560px] xl:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] xl:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-secondary)] md:text-[13px]">
                  {hospital.name}
                </p>
                <h1 className="mt-4 max-w-[530px]">
                  <HeroTagline />
                </h1>
                <p className="mt-5 max-w-[540px] text-base font-normal leading-[1.7] text-slate-700 md:text-lg">
                  Compassionate care, trusted expertise, and easier access to the services you need.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/doctors" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--brand-primary)] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--brand-primary-hover)]">
                    Find a Doctor
                  </Link>
                  <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--brand-primary)] bg-white px-5 text-base font-semibold text-[var(--brand-primary)] transition hover:bg-[var(--brand-surface-soft)]">
                    View Services
                  </Link>
                </div>
                <div className="mt-9 grid max-w-[620px] gap-4 sm:grid-cols-3">
                  {heroTrustIndicators.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3 border-t border-[#dbe7df] pt-4">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-secondary)]" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold leading-tight text-[var(--brand-primary)] md:text-base">{item.value}</p>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[18px] border border-[#dbe7df] bg-white p-2 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-slate-100">
                  <Image
                    src={presentationImages.heroHospital.src}
                    alt={presentationImages.heroHospital.alt}
                    fill
                    priority
                    sizes="(max-width: 1279px) 100vw, 690px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </PublicContainer>
        </PublicSection>

        <section className="relative z-10 bg-white">
          <PublicContainer className="-mt-px">
            <div className="grid grid-cols-2 overflow-hidden rounded-none border-x border-b border-[var(--brand-border)] bg-white lg:grid-cols-4">
              {patientActions.map((action, index) => {
                const Icon = action.icon;
                const mobileDivider = index % 2 === 0 ? "border-r md:border-r-0" : "";
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`${mobileDivider} group flex min-h-20 items-center justify-between gap-4 border-t border-[var(--brand-border)] px-5 py-4 transition hover:bg-[var(--brand-surface-soft)] lg:border-l lg:border-t-0 lg:px-6 lg:first:border-l-0`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[var(--brand-primary)]" aria-hidden="true" />
                      <span className="text-sm font-semibold text-slate-900 md:text-[15px]">{action.label}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[var(--brand-primary)]" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </PublicContainer>
        </section>

        <PublicSection id="doctors" className="bg-white">
          <PublicContainer>
            <SectionHeader title="Find a Doctor" description="Search by name, specialty, or department." />
            <div className="mb-6 flex flex-wrap gap-2">
              {["Pediatrics", "Cardiology", "Internal Medicine", "OB-GYN", "Orthopedics", "Surgery"].map((specialty) => (
                <span key={specialty} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700">
                  {specialty}
                </span>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredDoctors.map((doctor) => (
                <DoctorCard key={doctor.doctorId} doctor={doctor} />
              ))}
            </div>
            <Link href="/doctors" className="mt-8 inline-block">
              <Button variant="outline">View Doctor Directory</Button>
            </Link>
          </PublicContainer>
        </PublicSection>

        <PublicSection id="services" className="bg-slate-50">
          <PublicContainer>
            <SectionHeader title="Hospital Services" description="Find the department or service area that matches your visit." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.label}>
                    <CardContent className="space-y-4">
                      {service.image ? (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
                          <Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                        </div>
                      ) : null}
                      <Icon className="h-7 w-7 text-[var(--brand-primary)]" />
                      <div>
                        <p className="font-semibold text-slate-950">{service.label}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Link href="/services" className="mt-8 inline-block">
              <Button variant="outline">View All Services</Button>
            </Link>
          </PublicContainer>
        </PublicSection>

        <PublicSection className="bg-white">
          <PublicContainer>
            <div className="grid items-center gap-12 lg:grid-cols-[420px_1fr]">
              <Card>
                <CardContent>
                  <div className="aspect-[4/3] rounded-xl bg-slate-50 p-4">
                    <div className="grid h-full grid-cols-2 gap-3">
                      {["HMO", "Cashier", "Laboratory", "Pharmacy", "Clinics", "Emergency"].map((place, index) => (
                        <div key={place} className={index === 1 ? "rounded-xl bg-[var(--brand-primary)] p-3 text-sm font-semibold text-white" : "rounded-xl bg-white p-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200"}>
                          {place}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div>
                <SectionHeader title="Find your way around MCMC" description="Search departments, choose a floor, and see simple directions for common hospital destinations." />
                <Link href="/hospital-map">
                  <Button size="lg">Open Hospital Map</Button>
                </Link>
              </div>
            </div>
          </PublicContainer>
        </PublicSection>

        <PublicSection className="bg-slate-50">
          <PublicContainer>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <SectionHeader title="HMO & Insurance" description="Prepare requirements and know where to go for insurance-related assistance." />
                <p className="max-w-3xl text-base leading-7 text-slate-600">
                  Patients may review HMO guidance, prepare documents, and proceed to the appropriate service area upon arrival.
                </p>
                <Link href="/hmo" className="mt-6 inline-block">
                  <Button variant="outline">View HMO Information</Button>
                </Link>
              </div>
              <Card>
                <CardContent>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Emergency Care</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Need urgent care?</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Emergency services are available {hospital.emergency.availability}. For general information, contact the Info Desk.
                  </p>
                  <Link href="/contact" className="mt-5 inline-block">
                    <Button variant="danger">Contact Information</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </PublicContainer>
        </PublicSection>

        <PublicSection id="about" className="bg-white">
          <PublicContainer>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <SectionHeader title={`Serving the community since ${hospital.foundedYear}`} description={`${hospital.name} is based in ${hospital.location}, supporting patients and families across Cagayan de Oro and Northern Mindanao.`} />
                <Link href="/about">
                  <Button variant="outline">Learn About MCMC</Button>
                </Link>
              </div>
              <div className="grid gap-4">
                <StatBlock label="Since" value={hospital.foundedYear} />
                <StatBlock label="Location" value="Cagayan de Oro City" />
                <StatBlock label="Emergency Services" value={hospital.emergency.availability} />
              </div>
            </div>
          </PublicContainer>
        </PublicSection>

        <PublicSection id="news" className="bg-slate-50">
          <PublicContainer>
            <SectionHeader title="News & Health Updates" description="Read hospital announcements, community updates, and helpful patient information." />
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item) => (
                <Card key={item.id}>
                  <CardContent>
                    <p className="text-sm font-semibold text-[var(--brand-primary)]">{item.publishedAt}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/news" className="mt-8 inline-block">
              <Button variant="outline">View All News</Button>
            </Link>
          </PublicContainer>
        </PublicSection>
      </main>
      <SiteFooter />
    </>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--brand-border)] bg-white p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function HeroTagline() {
  return (
    <span className="block leading-[0.98] tracking-[-0.025em] text-[#123126]">
      <span className="block whitespace-nowrap">
        <span className="align-baseline text-[clamp(2.1rem,8.2vw,3.05rem)] font-semibold text-[#123126]">Where</span>{" "}
        <em className="font-serif align-baseline text-[clamp(2.45rem,9.4vw,3.55rem)] font-semibold italic text-[var(--brand-primary)]">Compassion</em>
      </span>
      <span className="block whitespace-nowrap">
        <span className="align-baseline text-[clamp(2.1rem,8.2vw,3.05rem)] font-semibold text-[#123126]">Meets</span>{" "}
        <em className="font-serif align-baseline text-[clamp(2.45rem,9.4vw,3.55rem)] font-semibold italic text-[var(--brand-secondary)]">Excellence</em>
      </span>
    </span>
  );
}
