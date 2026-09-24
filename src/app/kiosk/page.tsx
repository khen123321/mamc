import { redirect } from "next/navigation";

export default function LegacyKioskPage() {
  redirect("/queue-system/kiosk");
}
