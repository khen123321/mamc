import type { Doctor } from "@/types/doctor";
import { presentationImages } from "@/constants/presentation-images";

const doctorImages = presentationImages.doctors;

const commonDates = [
  { date: "2026-10-05", label: "October 5, 2026", slots: [
    { id: "slot-0900", time: "9:00 AM", available: true },
    { id: "slot-0930", time: "9:30 AM", available: true },
    { id: "slot-1000", time: "10:00 AM", available: false },
    { id: "slot-1030", time: "10:30 AM", available: true },
    { id: "slot-1100", time: "11:00 AM", available: true },
  ] },
  { date: "2026-10-07", label: "October 7, 2026", slots: [
    { id: "slot-1300", time: "1:00 PM", available: true },
    { id: "slot-1330", time: "1:30 PM", available: false },
    { id: "slot-1400", time: "2:00 PM", available: true },
    { id: "slot-1430", time: "2:30 PM", available: true },
  ] },
];

const schedule = (doctorId: string) => ({
  doctorId,
  weeklySlots: [
    { id: `${doctorId}-mon-am`, day: "Monday", startTime: "9:00 AM", endTime: "12:00 PM", status: "available" as const },
    { id: `${doctorId}-mon-pm`, day: "Monday", startTime: "2:00 PM", endTime: "5:00 PM", status: "available" as const },
    { id: `${doctorId}-wed-am`, day: "Wednesday", startTime: "9:00 AM", endTime: "12:00 PM", status: "fully-booked" as const },
    { id: `${doctorId}-fri-pm`, day: "Friday", startTime: "1:00 PM", endTime: "5:00 PM", status: "available" as const },
  ],
  availableDates: commonDates,
});

export const doctors: Doctor[] = [
  { doctorId: "DOC-001", name: "Dr. Maria Santos", specialty: "Cardiology", departmentId: "DEPT-CARD", qualifications: ["MD", "FPCP", "FPCC"], clinicRoom: "Room 204", floor: "Second Floor", scheduleSummary: "Mon/Wed/Fri", availability: "available", bio: "Senior cardiologist focused on preventive heart care and patient-friendly treatment planning.", image: doctorImages.femalePortraitOne, accent: "bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]", schedule: schedule("DOC-001") },
  { doctorId: "DOC-002", name: "Dr. Rafael Cruz", specialty: "Internal Medicine", departmentId: "DEPT-IM", qualifications: ["MD", "FPCP"], clinicRoom: "Room 212", floor: "Second Floor", scheduleSummary: "Tue/Thu/Sat", availability: "limited", bio: "Internist supporting adults with chronic care, diagnostics, and coordinated referrals.", image: doctorImages.malePortraitOne, accent: "bg-[var(--brand-surface-soft)] text-[var(--brand-secondary)]", schedule: schedule("DOC-002") },
  { doctorId: "DOC-003", name: "Dr. Andrea Lim", specialty: "Pediatrics", departmentId: "DEPT-PEDS", qualifications: ["MD", "FPPS"], clinicRoom: "Room 218", floor: "Second Floor", scheduleSummary: "Mon/Tue/Thu", availability: "available", bio: "Pediatrician known for calm family consultations and preventive child health.", image: doctorImages.femalePortraitTwo, accent: "bg-green-50 text-green-800", schedule: schedule("DOC-003") },
  { doctorId: "DOC-004", name: "Dr. Jonathan Reyes", specialty: "Orthopedics", departmentId: "DEPT-ORTHO", qualifications: ["MD", "FPOA"], clinicRoom: "Room 309", floor: "Third Floor", scheduleSummary: "Wed/Fri", availability: "unavailable", bio: "Orthopedic surgeon for sports injuries, fracture care, and joint conditions.", image: doctorImages.malePortraitTwo, accent: "bg-slate-100 text-slate-800", schedule: schedule("DOC-004") },
  { doctorId: "DOC-005", name: "Dr. Angela Gomez", specialty: "Dermatology", departmentId: "DEPT-DERM", qualifications: ["MD", "FPDS"], clinicRoom: "Room 318", floor: "Third Floor", scheduleSummary: "Mon/Thu", availability: "available", bio: "Dermatologist managing medical dermatology and skin wellness programs.", image: doctorImages.femalePortraitOne, accent: "bg-orange-50 text-orange-800", schedule: schedule("DOC-005") },
  { doctorId: "DOC-006", name: "Dr. Paolo Mendoza", specialty: "Radiology", departmentId: "DEPT-RAD", qualifications: ["MD", "FPCR"], clinicRoom: "Imaging Suite", floor: "Second Floor", scheduleSummary: "Daily", availability: "available", bio: "Radiologist specializing in diagnostic imaging quality and rapid reporting.", image: doctorImages.malePortraitThree, accent: "bg-sky-50 text-sky-800", schedule: schedule("DOC-006") },
  { doctorId: "DOC-007", name: "Dr. Katrina Yu", specialty: "ENT", departmentId: "DEPT-ENT", qualifications: ["MD", "FPSOHNS"], clinicRoom: "Room 326", floor: "Third Floor", scheduleSummary: "Tue/Fri", availability: "limited", bio: "ENT consultant for sinus, hearing, voice, and throat conditions.", image: doctorImages.femalePortraitTwo, accent: "bg-[var(--brand-surface-soft)] text-[var(--brand-secondary)]", schedule: schedule("DOC-007") },
  { doctorId: "DOC-008", name: "Dr. Miguel Tan", specialty: "Emergency Medicine", departmentId: "DEPT-ER", qualifications: ["MD", "FPCEM"], clinicRoom: "ER Bay 1", floor: "Ground Floor", scheduleSummary: "24/7 Rotation", availability: "available", bio: "Emergency physician supporting acute triage and urgent care operations.", image: doctorImages.malePortraitTwo, accent: "bg-orange-50 text-orange-800", schedule: schedule("DOC-008") },
  { doctorId: "DOC-009", name: "Dr. Sophia Villanueva", specialty: "Laboratory Medicine", departmentId: "DEPT-LAB", qualifications: ["MD", "FPSP"], clinicRoom: "Lab Office", floor: "Ground Floor", scheduleSummary: "Mon-Fri", availability: "available", bio: "Pathologist overseeing laboratory quality and diagnostic interpretation.", image: doctorImages.femalePortraitOne, accent: "bg-purple-50 text-purple-800", schedule: schedule("DOC-009") },
  { doctorId: "DOC-010", name: "Dr. Carlo Navarro", specialty: "Family Medicine", departmentId: "DEPT-IM", qualifications: ["MD", "PAFP"], clinicRoom: "Room 216", floor: "Second Floor", scheduleSummary: "Daily", availability: "available", bio: "Family physician for continuity care, wellness, and first-contact consults.", image: doctorImages.malePortraitOne, accent: "bg-green-50 text-green-800", schedule: schedule("DOC-010") },
];

