import type { AnalyticsPoint } from "@/types/hospital";

export const analyticsService = {
  getStats: () => [
    { label: "Patients Today", value: "428" },
    { label: "Appointments Today", value: "156" },
    { label: "Active Queue Tickets", value: "74" },
    { label: "Average Wait Time", value: "14 min" },
    { label: "Completed Transactions", value: "312" },
    { label: "Loyalty Members", value: "8,420" },
  ],
  getPatientsByDepartment: (): AnalyticsPoint[] => [
    { label: "Cardiology", value: 78 },
    { label: "Internal Medicine", value: 104 },
    { label: "Pediatrics", value: 64 },
    { label: "Radiology", value: 51 },
    { label: "Laboratory", value: 131 },
  ],
  getQueueByHour: (): AnalyticsPoint[] => [
    { label: "8 AM", value: 24, secondary: 12 },
    { label: "10 AM", value: 44, secondary: 16 },
    { label: "12 PM", value: 36, secondary: 18 },
    { label: "2 PM", value: 51, secondary: 14 },
    { label: "4 PM", value: 28, secondary: 11 },
  ],
};
