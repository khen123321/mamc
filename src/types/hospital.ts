import type { PresentationImage } from "@/types/content";

export interface Department {
  departmentId: string;
  name: string;
  floor: string;
  description: string;
  icon: string;
  image?: PresentationImage;
}

export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  memberSince: string;
}

export interface HospitalLocation {
  locationId: string;
  name: string;
  floorId: string;
  type: "entrance" | "desk" | "clinic" | "service" | "amenity" | "emergency" | "admin";
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
}

export interface HospitalFloor {
  floorId: string;
  name: string;
  level: number;
  locations: HospitalLocation[];
}

export interface AnalyticsPoint {
  label: string;
  value: number;
  secondary?: number;
}
