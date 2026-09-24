export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type PatientType = "new" | "returning";

export interface Appointment {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  patientType: PatientType;
  reference: string;
}

export interface AppointmentRequest {
  departmentId: string;
  doctorId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  reason: string;
  patientType: PatientType;
}
