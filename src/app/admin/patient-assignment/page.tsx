import { redirect } from "next/navigation";

export default function LegacyPatientAssignmentPage() {
  redirect("/ticketing/assignments");
}
