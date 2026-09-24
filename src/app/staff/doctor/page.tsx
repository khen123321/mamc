import { redirect } from "next/navigation";

export default function LegacyStaffDoctorPage() {
  redirect("/ticketing/my-tickets");
}
