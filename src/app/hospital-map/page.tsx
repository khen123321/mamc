import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { HospitalMapClient } from "@/components/map/hospital-map-client";
import { mapService } from "@/lib/services/map-service";

export default function HospitalMapPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="Wayfinding" title="Hospital Map" description="Search departments, choose a floor, and see simple directions for common hospital destinations." /><HospitalMapClient floors={mapService.getFloors()} /></PageShell><SiteFooter /></>;
}
