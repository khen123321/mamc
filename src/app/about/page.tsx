import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, HandHeart, HeartPulse, Hospital, MapPin, ShieldCheck, Sparkles, Stethoscope, Users } from "lucide-react";
import { PublicContainer, PublicSection } from "@/components/layout/page-shell";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { hospital } from "@/constants/hospital";
import { presentationImages } from "@/constants/presentation-images";
import { contentService } from "@/lib/services/content-service";
import type { NewsItem, PresentationImage } from "@/types/content";

const heroFacts = [
  { label: "Established", value: hospital.foundedYear },
  { label: "Location", value: "Cagayan de Oro City" },
  { label: "Emergency", value: hospital.emergency.availability },
];

const historyFacts = [
  { label: "Serving since", value: hospital.foundedYear },
  { label: "Community", value: "Cagayan de Oro" },
  { label: "Patient support", value: "Families" },
];

const careValues = [
  {
    title: "Compassion",
    description: "Care delivered with warmth, respect, and attention to each patient and family.",
    icon: HandHeart,
  },
  {
    title: "Excellence",
    description: "A disciplined commitment to dependable service and continuous improvement.",
    icon: Sparkles,
  },
  {
    title: "Patient-Centered Care",
    description: "Practical information and support that help patients prepare for each visit.",
    icon: Users,
  },
  {
    title: "Trust",
    description: "Clear communication and responsible guidance for patients and visitors.",
    icon: ShieldCheck,
  },
  {
    title: "Partnership",
    description: "Working with families, clinicians, and service teams throughout the care journey.",
    icon: Stethoscope,
  },
  {
    title: "Sustainable Service",
    description: "Thoughtful systems that make hospital access easier and more consistent.",
    icon: Hospital,
  },
];

const hospitalHighlights = [
  { label: "Founded", value: hospital.foundedYear, icon: CalendarDays },
  { label: "Emergency Care", value: hospital.emergency.availability, icon: HeartPulse },
  { label: "Info Desk", value: "Mon-Sat", icon: Clock },
  { label: "City", value: "CDO", icon: MapPin },
];

const newsImageMap: Record<string, PresentationImage> = {
  "health-update": presentationImages.services.pediatrics,
  "rainy-season": presentationImages.services.laboratory,
  "wellness-promo": presentationImages.aboutHospitalCare,
};

export default function AboutPage() {
  const news = contentService.getLatestNews().slice(0, 3);

  return (
    <>
      <PublicNavbar />
      <main className="bg-white">
        <AboutHero />
        <HistorySection />
        <DirectionSection />
        <ValuesSection />
        <HighlightsSection />
        <NewsSection news={news} />
        <HelpfulCta />
      </main>
      <SiteFooter />
    </>
  );
}

function AboutHero() {
  return (
    <PublicSection className="bg-[#f7f9f8] py-12 md:py-16 lg:py-[88px]">
      <PublicContainer>
        <div className="grid items-center gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm font-medium text-slate-500">
              <Link href="/" className="hover:text-[var(--brand-primary)]">
                Home
              </Link>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-700">About</span>
            </nav>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">About MCMC</p>
            <h1 className="mt-4 max-w-2xl text-[32px] font-bold leading-[1.14] tracking-tight text-[#1f2933] sm:text-[38px] md:text-[48px] lg:text-[54px]">
              Compassionate Care. Trusted Since {hospital.foundedYear}.
            </h1>
            <p className="mt-5 max-w-[520px] text-base font-normal leading-[1.7] text-slate-700 md:text-lg lg:text-[19px]">
              {hospital.name} serves patients and families in {hospital.location}, combining practical access to services with a commitment to compassionate healthcare.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-[#dbe7df] rounded-xl border border-[#dbe7df] bg-white">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="px-4 py-4">
                  <p className="text-lg font-bold text-[var(--brand-primary)] md:text-xl">{fact.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[#dbe7df] bg-white shadow-sm md:min-h-[420px] lg:min-h-[480px]">
            <Image src={presentationImages.heroHospital.src} alt={presentationImages.heroHospital.alt} fill priority sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function HistorySection() {
  return (
    <PublicSection className="bg-white">
      <PublicContainer>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e3e8e5] bg-slate-100">
            <Image src={presentationImages.aboutHospitalCare.src} alt={presentationImages.aboutHospitalCare.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </div>

          <div className="max-w-[620px]">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">Our History</p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-[#1f2933] md:text-[34px] lg:text-[40px]">
              Serving the Community Since {hospital.foundedYear}
            </h2>
            <div className="mt-6 space-y-5 text-base font-normal leading-[1.7] text-slate-700 md:text-[17px]">
              <p>
                {hospital.name} supports patients and families with compassionate care, practical access to services, and a commitment to excellence in healthcare.
              </p>
              <p>
                Based in {hospital.location}, MCMC continues to provide public-facing information that helps patients prepare for visits, find services, and connect with the hospital team.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 divide-x divide-[#dbe7df] border-y border-[#dbe7df] py-5">
              {historyFacts.map((fact) => (
                <div key={fact.label} className="px-4 first:pl-0">
                  <p className="text-[30px] font-bold leading-tight text-[var(--brand-primary)] md:text-[34px]">{fact.value}</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function DirectionSection() {
  return (
    <PublicSection className="bg-[#eef7f2]">
      <PublicContainer>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">Vision & Mission</p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-[#1f2933] md:text-[34px] lg:text-[40px]">Our Direction</h2>
          <p className="mt-4 text-base font-normal leading-[1.7] text-slate-700 md:text-[17px]">
            Guided by compassion and excellence, MCMC keeps the patient and family experience at the center of its public service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#dbe7df] bg-white p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f2] text-[var(--brand-primary)]">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-[22px] font-semibold leading-[1.3] text-[#1f2933] md:text-2xl">Vision</h3>
            <p className="mt-4 text-base font-normal leading-[1.7] text-slate-700">
              To be a trusted hospital for patients and families seeking compassionate care, practical access, and dependable health information.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--brand-primary)] p-8 text-white md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white">
              <HandHeart className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-[22px] font-semibold leading-[1.3] md:text-2xl">Mission</h3>
            <p className="mt-4 text-base font-normal leading-[1.7] text-white/86">
              To support patients and families with compassionate service, trusted expertise, and clear pathways to the hospital services they need.
            </p>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function ValuesSection() {
  return (
    <PublicSection className="bg-white">
      <PublicContainer>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">Core Values</p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-[#1f2933] md:text-[34px] lg:text-[40px]">Values That Guide Our Care</h2>
          <p className="mt-4 text-base font-normal leading-[1.7] text-slate-700 md:text-[17px]">
            These care principles reflect the existing MCMC brand promise of compassion, excellence, and practical support for patients and visitors.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {careValues.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="min-h-[170px] rounded-2xl border border-[#e3e8e5] bg-white p-6 transition hover:border-[#b9d3c4] hover:bg-[#fbfdfb]">
                <Icon className="h-7 w-7 text-[var(--brand-primary)]" aria-hidden="true" />
                <h3 className="mt-5 text-[20px] font-semibold leading-[1.3] text-[#1f2933] md:text-[22px]">{value.title}</h3>
                <p className="mt-3 text-[15px] font-normal leading-[1.65] text-slate-600 md:text-base">{value.description}</p>
              </div>
            );
          })}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function HighlightsSection() {
  return (
    <PublicSection className="bg-[var(--brand-primary)] text-white">
      <PublicContainer>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70">Hospital Highlights</p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight md:text-[34px] lg:text-[40px]">A focused view of MCMC</h2>
          </div>
          <p className="max-w-2xl text-base font-normal leading-[1.7] text-white/76 md:text-[17px] lg:ml-auto">
            Key public-facing details patients and visitors commonly need when planning a hospital visit.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-white/14 overflow-hidden border-y border-white/14 md:grid-cols-4 md:divide-y-0">
          {hospitalHighlights.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 first:pl-0 md:p-7 md:first:pl-0">
                <Icon className="h-6 w-6 text-white/78" aria-hidden="true" />
                <p className="mt-5 text-[34px] font-bold leading-tight tracking-tight md:text-[42px] lg:text-[46px]">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-white/72 md:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <PublicSection className="bg-[#f7f9f8]">
      <PublicContainer>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">News & Updates</p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.2] tracking-tight text-[#1f2933] md:text-[34px] lg:text-[40px]">Latest from MCMC</h2>
            <p className="mt-4 text-base font-normal leading-[1.7] text-slate-700 md:text-[17px]">
              Read hospital announcements, community updates, and helpful patient information.
            </p>
          </div>
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-secondary)]">
            View all news
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#e3e8e5] bg-white">
                <Image src={getNewsImage(item).src} alt={getNewsImage(item).alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="pt-5">
                <p className="text-sm font-semibold text-[var(--brand-primary)]">
                  {item.category} · {item.publishedAt}
                </p>
                <h3 className="mt-2 line-clamp-2 text-[20px] font-semibold leading-[1.3] text-[#1f2933] md:text-[22px]">{item.title}</h3>
                <p className="mt-3 line-clamp-3 text-[15px] font-normal leading-[1.65] text-slate-600 md:text-base">{item.excerpt}</p>
                <Link href="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-secondary)]">
                  Read article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function HelpfulCta() {
  return (
    <PublicSection className="bg-white py-12 md:py-16">
      <PublicContainer>
        <div className="rounded-2xl border border-[#dbe7df] bg-[#eef7f2] px-6 py-8 md:px-10 md:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-secondary)]">Patient Guidance</p>
            <h2 className="mt-3 text-[26px] font-semibold leading-[1.2] tracking-tight text-[#1f2933] md:text-[32px]">Need help finding the right service?</h2>
            <p className="mt-3 text-base font-normal leading-[1.7] text-slate-700">
              Explore hospital services or find the right doctor for your needs before your visit.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link href="/doctors">
              <Button size="lg">Find a Doctor</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="secondary">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </PublicContainer>
    </PublicSection>
  );
}

function getNewsImage(item: NewsItem): PresentationImage {
  return newsImageMap[item.image] ?? presentationImages.aboutHospitalCare;
}
