import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Baby, HeartPulse, Hospital, Map, Microscope, Pill, Search, Siren, Stethoscope, Users } from "lucide-react";
import { MCMCTagline } from "@/components/brand/mcmc-tagline";
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
  { label: "Find a Doctor", description: "Search by name, specialty, or department.", href: "/doctors", icon: Search },
  { label: "Hospital Services", description: "Review departments, specialty clinics, and patient service areas.", href: "/services", icon: Hospital },
  { label: "HMO & Insurance", description: "Prepare requirements before visiting the insurance desk.", href: "/hmo", icon: Users },
  { label: "Hospital Map", description: "Find clinics, departments, and service areas.", href: "/hospital-map", icon: Map },
  { label: "Careers", description: "Explore hospital career information and recruitment updates.", href: "/careers", icon: Stethoscope },
  { label: "Contact Us", description: "Find public contact details and information desk hours.", href: "/contact", icon: HeartPulse },
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
        <PublicSection className="bg-white py-10 md:py-14 lg:py-[72px]">
          <PublicContainer>
            <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-20">
              <div>
                <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-slate-950 md:text-5xl lg:text-[52px] lg:leading-[1.1]">
                  <MCMCTagline />
                </h1>
                <p className="mt-5 max-w-[540px] text-base leading-7 text-slate-600 md:text-lg">
                  Compassionate care, trusted expertise, and easier access to the services you need.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/doctors">
                    <Button size="lg">Find a Doctor</Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="secondary">View Services</Button>
                  </Link>
                  <Link href="/demo" className="inline-flex h-12 items-center px-2 text-sm font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-secondary)]">
                    Demo Hub
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[16/9] max-h-[460px] overflow-hidden rounded-xl border border-[var(--brand-border)] bg-slate-100 shadow-sm xl:aspect-[4/3] xl:max-h-none">
                <Image
                  src={presentationImages.heroHospital.src}
                  alt={presentationImages.heroHospital.alt}
                  fill
                  priority
                  sizes="(max-width: 1279px) 100vw, 625px"
                  className="object-cover"
                />
              </div>
            </div>
          </PublicContainer>
        </PublicSection>

        <PublicSection className="bg-slate-50 py-12 md:py-16 lg:py-[72px]">
          <PublicContainer>
            <SectionHeader title="How can we help you today?" description="Choose a service, find a doctor, or prepare for your visit before you arrive." />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {patientActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <Card className="h-full transition hover:border-[var(--brand-secondary)]">
                      <CardContent>
                        <Icon className="h-7 w-7 text-[var(--brand-primary)]" />
                        <p className="mt-4 text-lg font-semibold text-slate-950">{action.label}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </PublicContainer>
        </PublicSection>

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
