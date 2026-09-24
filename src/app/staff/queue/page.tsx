import { redirect } from "next/navigation";

export default function LegacyStaffQueuePage() {
  redirect("/queue-system/operator");
}
