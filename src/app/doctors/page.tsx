import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { DoctorDirectory } from "@/components/doctors/doctor-directory";
import { doctorService } from "@/lib/services/doctor-service";

export default function DoctorsPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="Find a Doctor" title="Doctor Directory" description="Search by name, specialty, or department." /><DoctorDirectory doctors={doctorService.getDoctors()} specialties={doctorService.getSpecialties()} /></PageShell><SiteFooter /></>;
}
