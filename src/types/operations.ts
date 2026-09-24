import type { AuditAction, AuditModule, AssignmentStatus, DepartmentStatus, DoctorAvailability, DoctorQueueStatus } from "@/enums/operations";
import type { Role } from "@/enums/role";

export interface Specialization {
  specializationId: string;
  departmentId: string;
  name: string;
}

export interface OperationalDepartment {
  id: string;
  departmentId: string;
  code: string;
  name: string;
  description: string;
  status: DepartmentStatus;
  queueEnabled: boolean;
  appointmentEnabled: boolean;
  doctorAssignmentEnabled: boolean;
}

export interface AssignmentHistoryItem {
  id: string;
  timestamp: string;
  action: "CHECKED_IN" | "ASSIGNED" | "REASSIGNED" | "CALLED" | "STARTED_CONSULTATION" | "COMPLETED";
  description: string;
  actorName: string;
  previousDoctorId?: string;
  newDoctorId?: string;
}

export interface PatientAssignment {
  assignmentId: string;
  visitId: string;
  visitReference: string;
  doctorQueueNumber: string;
  ticketId: string;
  ticketNumber: string;
  patientId: string;
  patientName: string;
  departmentId: string;
  status: AssignmentStatus;
  waitingMinutes: number;
  doctorId?: string;
  assignedBy?: string;
  assignedAt?: string;
  encounterReference?: string;
  history: AssignmentHistoryItem[];
}

export interface DoctorAvailabilitySummary {
  doctorId: string;
  doctorName: string;
  departmentId: string;
  specialty: string;
  patientsWaiting: number;
  availability: DoctorAvailability;
}

export interface DoctorQueueItem {
  assignmentId: string;
  visitReference: string;
  doctorQueueNumber: string;
  ticketNumber: string;
  patientName: string;
  departmentId: string;
  doctorId: string;
  waitingMinutes: number;
  status: DoctorQueueStatus;
  encounterReference?: string;
}

export interface QueueConfiguration {
  id: string;
  serviceId: string;
  serviceName: string;
  prefix: string;
  startingNumber: number;
  counterCount: number;
  priorityEnabled: boolean;
  transferEnabled: boolean;
  isActive: boolean;
}

export interface AuditLog {
  auditId: string;
  timestamp: string;
  actor: string;
  actorId: string;
  role: Role;
  module: AuditModule;
  action: AuditAction;
  recordId: string;
  description: string;
  metadata?: Record<string, string>;
}
