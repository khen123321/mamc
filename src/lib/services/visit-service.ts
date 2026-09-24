import { demoStorageKeys } from "@/constants/storage-keys";
import { VisitStatus } from "@/enums/operations";
import { visits } from "@/lib/mock/visits";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { PatientAssignment } from "@/types/operations";
import type { Visit, VisitTimelineItem } from "@/types/visit";

function getVisits(): Visit[] {
  return getStoredValue<Visit[]>(demoStorageKeys.visits, visits);
}

function saveVisits(next: Visit[]): Visit[] {
  return setStoredValue<Visit[]>(demoStorageKeys.visits, next);
}

function timelineItem(label: string, description: string): VisitTimelineItem {
  return {
    id: `VTL-${Date.now()}`,
    timestamp: new Date().toISOString(),
    label,
    description,
  };
}

function updateVisit(referenceCode: string, patch: Partial<Visit>, item?: VisitTimelineItem): Visit | undefined {
  let updated: Visit | undefined;
  const next = getVisits().map((visit) => {
    if (visit.referenceCode !== referenceCode) {
      return visit;
    }

    updated = {
      ...visit,
      ...patch,
      updatedAt: new Date().toISOString(),
      timeline: item ? [...visit.timeline, item] : visit.timeline,
    };
    return updated;
  });

  saveVisits(next);
  return updated;
}

export const visitService = {
  getVisits,
  getVisitByReference: (referenceCode: string): Visit | undefined => getVisits().find((visit) => visit.referenceCode.toUpperCase() === referenceCode.trim().toUpperCase()),
  markDoctorAssigned: (assignment: PatientAssignment, doctorName: string): Visit | undefined =>
    updateVisit(
      assignment.visitReference,
      {
        doctorId: assignment.doctorId,
        doctorName,
        activeDoctorQueueId: assignment.ticketId,
        doctorQueueNumber: assignment.doctorQueueNumber,
        patientsAhead: 3,
        status: VisitStatus.DOCTOR_ASSIGNED,
      },
      timelineItem("Doctor assigned", `Assigned to ${doctorName} with doctor queue ${assignment.doctorQueueNumber}.`),
    ),
  markDoctorCalled: (assignment: PatientAssignment): Visit | undefined =>
    updateVisit(
      assignment.visitReference,
      { status: VisitStatus.CALLED, patientsAhead: 0 },
      timelineItem("Doctor queue called", `${assignment.doctorQueueNumber} was called for consultation.`),
    ),
  markConsultationStarted: (assignment: PatientAssignment): Visit | undefined =>
    updateVisit(
      assignment.visitReference,
      { status: VisitStatus.IN_CONSULTATION, patientsAhead: 0 },
      timelineItem("Consultation started", `Consultation started for ${assignment.doctorQueueNumber}.`),
    ),
  markConsultationCompleted: (assignment: PatientAssignment): Visit | undefined =>
    updateVisit(
      assignment.visitReference,
      { status: VisitStatus.COMPLETED, patientsAhead: 0 },
      timelineItem("Visit completed", "Doctor consultation completed."),
    ),
};
