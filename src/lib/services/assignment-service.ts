import { AuditAction, AuditModule, AssignmentStatus, DoctorAvailability, DoctorQueueStatus } from "@/enums/operations";
import { doctors } from "@/lib/mock/doctors";
import { patientAssignments } from "@/lib/mock/assignments";
import { demoStorageKeys } from "@/constants/storage-keys";
import { auditService } from "@/lib/services/audit-service";
import { authService } from "@/lib/services/auth-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import { visitService } from "@/lib/services/visit-service";
import type { DoctorAvailabilitySummary, DoctorQueueItem, PatientAssignment } from "@/types/operations";

function getAssignments(): PatientAssignment[] {
  return getStoredValue<PatientAssignment[]>(demoStorageKeys.assignments, patientAssignments);
}

function saveAssignments(assignments: PatientAssignment[]): PatientAssignment[] {
  return setStoredValue<PatientAssignment[]>(demoStorageKeys.assignments, assignments);
}

export const assignmentService = {
  getAssignments,
  getAssignmentById: (assignmentId: string): PatientAssignment | undefined => getAssignments().find((item) => item.assignmentId === assignmentId),
  getDoctorOptionsForDepartment: (departmentId: string): DoctorAvailabilitySummary[] => {
    const assignments = getAssignments();
    return doctors
      .filter((doctor) => doctor.departmentId === departmentId)
      .map((doctor, index) => {
        const waiting = assignments.filter((assignment) => assignment.doctorId === doctor.doctorId && assignment.status !== AssignmentStatus.COMPLETED).length;
        return {
          doctorId: doctor.doctorId,
          doctorName: doctor.name,
          departmentId: doctor.departmentId,
          specialty: doctor.specialty,
          patientsWaiting: waiting,
          availability: index === 1 ? DoctorAvailability.IN_CONSULTATION : DoctorAvailability.AVAILABLE,
        };
      });
  },
  assignDoctor: (assignmentId: string, doctorId: string): PatientAssignment | undefined => {
    const actor = authService.getCurrentUser();
    const doctor = doctors.find((item) => item.doctorId === doctorId);
    let updatedAssignment: PatientAssignment | undefined;
    const next = getAssignments().map((assignment) => {
      if (assignment.assignmentId !== assignmentId || !doctor) {
        return assignment;
      }

      updatedAssignment = {
        ...assignment,
        doctorId,
        status: AssignmentStatus.WAITING_DOCTOR,
        assignedBy: actor.name,
        assignedAt: new Date().toISOString(),
        history: [
          ...assignment.history,
          {
            id: `ASH-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: "ASSIGNED",
            description: `Assigned to ${doctor.name}.`,
            actorName: actor.name,
            newDoctorId: doctorId,
          },
        ],
      };
      return updatedAssignment;
    });

    saveAssignments(next);
    if (updatedAssignment && doctor) {
      auditService.log({ module: AuditModule.PatientAssignment, action: AuditAction.ASSIGN_DOCTOR, recordId: assignmentId, description: `${actor.name} assigned ${updatedAssignment.ticketNumber} to ${doctor.name}.` });
      visitService.markDoctorAssigned(updatedAssignment, doctor.name);
    }
    return updatedAssignment;
  },
  reassignDoctor: (assignmentId: string, doctorId: string): PatientAssignment | undefined => {
    const actor = authService.getCurrentUser();
    const doctor = doctors.find((item) => item.doctorId === doctorId);
    let updatedAssignment: PatientAssignment | undefined;
    const next = getAssignments().map((assignment) => {
      if (assignment.assignmentId !== assignmentId || !doctor) {
        return assignment;
      }

      updatedAssignment = {
        ...assignment,
        doctorId,
        status: AssignmentStatus.WAITING_DOCTOR,
        assignedBy: actor.name,
        assignedAt: new Date().toISOString(),
        history: [
          ...assignment.history,
          {
            id: `ASH-${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: "REASSIGNED",
            description: `Reassigned to ${doctor.name}.`,
            actorName: actor.name,
            previousDoctorId: assignment.doctorId,
            newDoctorId: doctorId,
          },
        ],
      };
      return updatedAssignment;
    });

    saveAssignments(next);
    if (updatedAssignment && doctor) {
      auditService.log({ module: AuditModule.PatientAssignment, action: AuditAction.REASSIGN_DOCTOR, recordId: assignmentId, description: `${actor.name} reassigned ${updatedAssignment.ticketNumber} to ${doctor.name}.` });
      visitService.markDoctorAssigned(updatedAssignment, doctor.name);
    }
    return updatedAssignment;
  },
  getDoctorQueue: (doctorId: string): DoctorQueueItem[] =>
    getAssignments()
      .filter((assignment) => assignment.doctorId === doctorId && assignment.status !== AssignmentStatus.COMPLETED)
      .map((assignment) => ({
        assignmentId: assignment.assignmentId,
        visitReference: assignment.visitReference,
        doctorQueueNumber: assignment.doctorQueueNumber,
        ticketNumber: assignment.ticketNumber,
        patientName: assignment.patientName,
        departmentId: assignment.departmentId,
        doctorId,
        waitingMinutes: assignment.waitingMinutes,
        status: assignment.status === AssignmentStatus.IN_CONSULTATION ? DoctorQueueStatus.IN_CONSULTATION : assignment.status === AssignmentStatus.CALLED ? DoctorQueueStatus.CALLED : DoctorQueueStatus.WAITING,
        encounterReference: assignment.encounterReference,
      })),
  callDoctorQueue: (assignmentId: string): PatientAssignment | undefined => {
    const actor = authService.getCurrentUser();
    let updatedAssignment: PatientAssignment | undefined;
    const next = getAssignments().map((assignment) => {
      if (assignment.assignmentId !== assignmentId) {
        return assignment;
      }

      updatedAssignment = {
        ...assignment,
        status: AssignmentStatus.CALLED,
        history: [...assignment.history, { id: `ASH-${Date.now()}`, timestamp: new Date().toISOString(), action: "CALLED", description: `${assignment.doctorQueueNumber} called for consultation.`, actorName: actor.name }],
      };
      return updatedAssignment;
    });

    saveAssignments(next);
    if (updatedAssignment) {
      auditService.log({ module: AuditModule.DoctorQueue, action: AuditAction.CALL_DOCTOR_QUEUE, recordId: assignmentId, description: `${actor.name} called ${updatedAssignment.doctorQueueNumber}.` });
      visitService.markDoctorCalled(updatedAssignment);
    }
    return updatedAssignment;
  },
  startConsultation: (assignmentId: string): PatientAssignment | undefined => {
    const actor = authService.getCurrentUser();
    let updatedAssignment: PatientAssignment | undefined;
    const encounterReference = `ENC-2026-${String(Math.floor(Date.now() / 1000)).slice(-3)}`;
    const next = getAssignments().map((assignment) => {
      if (assignment.assignmentId !== assignmentId) {
        return assignment;
      }

      updatedAssignment = {
        ...assignment,
        status: AssignmentStatus.IN_CONSULTATION,
        encounterReference,
        history: [
          ...assignment.history,
          { id: `ASH-${Date.now()}`, timestamp: new Date().toISOString(), action: "STARTED_CONSULTATION", description: `Consultation started. Encounter ${encounterReference}.`, actorName: actor.name },
        ],
      };
      return updatedAssignment;
    });

    saveAssignments(next);
    if (updatedAssignment) {
      auditService.log({ module: AuditModule.DoctorQueue, action: AuditAction.START_CONSULTATION, recordId: assignmentId, description: `${actor.name} started consultation for ${updatedAssignment.ticketNumber}.`, metadata: { encounterReference } });
      visitService.markConsultationStarted(updatedAssignment);
    }
    return updatedAssignment;
  },
  completeConsultation: (assignmentId: string): PatientAssignment | undefined => {
    const actor = authService.getCurrentUser();
    let updatedAssignment: PatientAssignment | undefined;
    const next = getAssignments().map((assignment) => {
      if (assignment.assignmentId !== assignmentId) {
        return assignment;
      }

      updatedAssignment = {
        ...assignment,
        status: AssignmentStatus.COMPLETED,
        history: [...assignment.history, { id: `ASH-${Date.now()}`, timestamp: new Date().toISOString(), action: "COMPLETED", description: "Consultation completed.", actorName: actor.name }],
      };
      return updatedAssignment;
    });

    saveAssignments(next);
    if (updatedAssignment) {
      auditService.log({ module: AuditModule.DoctorQueue, action: AuditAction.COMPLETE_CONSULTATION, recordId: assignmentId, description: `${actor.name} completed consultation for ${updatedAssignment.ticketNumber}.` });
      visitService.markConsultationCompleted(updatedAssignment);
    }
    return updatedAssignment;
  },
};
