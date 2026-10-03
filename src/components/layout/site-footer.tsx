import Link from "next/link";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { MCMCTagline } from "@/components/brand/mcmc-tagline";
import { hospital } from "@/constants/hospital";

const patientServices = [
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Hospital Services", href: "/services" },
  { label: "HMO & Insurance", href: "/hmo" },
  { label: "Hospital Map", href: "/hospital-map" },
];

const information = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "HMO", href: "/hmo" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="mt-16 bg-[var(--brand-primary)] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0">
          <div className="inline-flex rounded-md bg-white p-3">
            <MCMCLogo variant="vertical" className="w-[190px] xl:w-[220px]" />
          </div>
          <MCMCTagline
            compact
            className="mt-4 text-lg text-white [&_em]:text-white"
          />
          <p className="mt-4 text-sm leading-6 text-white/80">
            Compassionate care, trusted expertise, and practical information for
            patients and visitors.
          </p>
        </div>

        <FooterColumn title="Patient Services" items={patientServices} />
        <FooterColumn title="Information" items={information} />

        <div className="min-w-0">
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/80 [overflow-wrap:anywhere]">
            <p>{hospital.address}</p>
            <p>
              {hospital.infoDesk.label}: {hospital.infoDesk.hours}
            </p>
            <p>{hospital.infoDesk.phoneNumbers.join(" | ")}</p>
            <p>{hospital.infoDesk.mobileNumbers.join(" | ")}</p>
            <p>{hospital.website}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-sm text-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Copyright © 2026 {hospital.name}. All rights reserved.</span>
            <span aria-hidden="true">|</span>
            <span>
              Made by{" "}
              <a
                href="https://www.taptaptap.shop/products"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#08AFC4] transition hover:text-[#35c7d8] hover:underline"
              >
                TapTapTap
              </a>
            </span>
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#footer" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-white/80">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
