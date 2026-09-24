import { Badge } from "@/components/ui/badge";
import type { AvailabilityStatus } from "@/types/doctor";

export function StatusBadge({ status }: { status: AvailabilityStatus | "waiting" | "serving" | "completed" | "pending" | "available" | "fully-booked" | "blocked" | "on-leave" | "transferred" }) {
  const tone =
    status === "available" || status === "completed" || status === "serving"
      ? "green"
      : status === "unavailable" || status === "blocked" || status === "on-leave"
        ? "red"
        : status === "waiting" || status === "pending" || status === "limited" || status === "fully-booked"
          ? "amber"
          : status === "transferred"
            ? "purple"
            : "blue";
  const label = status.replace("-", " ").replace(/^./, (value) => value.toUpperCase());
  return <Badge tone={tone}>{label}</Badge>;
}
