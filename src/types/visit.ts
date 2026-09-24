import type { VisitStatus } from "@/enums/operations";

export interface VisitTimelineItem {
  id: string;
  timestamp: string;
  label: string;
  description: string;
}

export interface Visit {
  id: string;
  referenceCode: string;
  patientId: string;
  maskedPatientName: string;
  appointmentId?: string;
  doctorId?: string;
  doctorName?: string;
  departmentId?: string;
  departmentName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  clinicName?: string;
  clinicRoom?: string;
  mapDestination?: string;
  activeDoctorQueueId?: string;
  doctorQueueNumber?: string;
  patientsAhead?: number;
  status: VisitStatus;
  createdAt: string;
  updatedAt: string;
  timeline: VisitTimelineItem[];
}
