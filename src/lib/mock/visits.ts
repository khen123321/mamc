import { VisitStatus } from "@/enums/operations";
import type { Visit } from "@/types/visit";

export const visits: Visit[] = [
  {
    id: "VISIT-001",
    referenceCode: "MCMC-A7K9P2",
    patientId: "PAT-001",
    maskedPatientName: "Juan D.",
    appointmentId: "APT-2026-1051",
    doctorId: "DOC-001",
    doctorName: "Dr. Maria Santos",
    departmentId: "DEPT-CARD",
    departmentName: "Cardiology",
    appointmentDate: "October 5, 2026",
    appointmentTime: "10:30 AM",
    clinicName: "Cardiology Clinic",
    clinicRoom: "Room 204",
    mapDestination: "cardiology",
    activeDoctorQueueId: "DQ-CARD-012",
    doctorQueueNumber: "CARD-012",
    patientsAhead: 3,
    status: VisitStatus.WAITING_FOR_DOCTOR,
    createdAt: "2026-10-05T09:45:00",
    updatedAt: "2026-10-05T10:18:00",
    timeline: [
      { id: "VTL-001", timestamp: "2026-10-05T09:45:00", label: "Appointment confirmed", description: "Visit reference MCMC-A7K9P2 issued for the cardiology appointment." },
      { id: "VTL-002", timestamp: "2026-10-05T10:15:00", label: "Patient checked in", description: "Patient arrived and checked in for the doctor appointment." },
      { id: "VTL-003", timestamp: "2026-10-05T10:18:00", label: "Waiting for doctor assignment", description: "Visit is queued for cardiology assignment." },
    ],
  },
];
