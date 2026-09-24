import { notFound } from "next/navigation";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageShell } from "@/components/layout/page-shell";
import { DoctorProfilePanel } from "@/components/doctors/doctor-profile-panel";
import { doctorService } from "@/lib/services/doctor-service";

export default async function DoctorProfilePage({ params }: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = await params;
  const doctor = doctorService.getDoctorById(doctorId);
  if (!doctor) notFound();
  return <><PublicNavbar /><PageShell><DoctorProfilePanel doctor={doctor} /></PageShell><SiteFooter /></>;
}
