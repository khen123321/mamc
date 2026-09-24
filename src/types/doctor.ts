import type { PresentationImage } from "@/types/content";

export type AvailabilityStatus = "available" | "unavailable" | "limited";

export interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  status: "available" | "fully-booked" | "blocked" | "on-leave";
}

export interface DoctorSchedule {
  doctorId: string;
  weeklySlots: ScheduleSlot[];
  availableDates: {
    date: string;
    label: string;
    slots: { id: string; time: string; available: boolean }[];
  }[];
}

export interface Doctor {
  doctorId: string;
  name: string;
  specialty: string;
  departmentId: string;
  qualifications: string[];
  clinicRoom: string;
  floor: string;
  scheduleSummary: string;
  availability: AvailabilityStatus;
  bio: string;
  image: PresentationImage;
  accent: string;
  schedule: DoctorSchedule;
}
