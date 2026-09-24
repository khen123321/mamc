import { redirect } from "next/navigation";

export default function LegacyRolesPage() {
  redirect("/ticketing/admin/roles");
}
