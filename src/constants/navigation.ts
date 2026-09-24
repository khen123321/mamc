import { hospital } from "@/constants/hospital";

export const HOSPITAL_NAME = hospital.name;

export const publicNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Patients & Visitors", href: "/hmo", children: [
    { label: "HMO & Insurance", href: "/hmo" },
    { label: "Hospital Map", href: "/hospital-map" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Information", href: "/contact" },
  ] },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const secondaryNavItems = [
  { label: "Careers", href: "/careers" },
];

export const demoNavItems = [
  { label: "Demo Hub", href: "/demo" },
];
