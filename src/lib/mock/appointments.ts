import type { Appointment } from "@/types/appointment";

const doctorIds = ["DOC-001", "DOC-002", "DOC-003", "DOC-004", "DOC-005", "DOC-006", "DOC-007", "DOC-008", "DOC-009", "DOC-010"];
const departmentIds = ["DEPT-CARD", "DEPT-IM", "DEPT-PEDS", "DEPT-ORTHO", "DEPT-DERM", "DEPT-RAD", "DEPT-ENT", "DEPT-ER", "DEPT-LAB", "DEPT-IM"];

export const appointments: Appointment[] = Array.from({ length: 30 }, (_, index) => {
  const number = 1051 + index;
  return {
    appointmentId: `APT-${number}`,
    patientId: "PAT-001",
    doctorId: doctorIds[index % doctorIds.length],
    departmentId: departmentIds[index % departmentIds.length],
    date: `2026-10-${String(5 + (index % 20)).padStart(2, "0")}`,
    time: ["9:00 AM", "9:30 AM", "10:30 AM", "1:00 PM", "2:30 PM"][index % 5],
    status: index % 6 === 0 ? "completed" : "confirmed",
    reason: ["Follow-up consultation", "Annual checkup", "New symptom evaluation", "Diagnostic review"][index % 4],
    patientType: index % 3 === 0 ? "new" : "returning",
    reference: `APT-2026-${number}`,
  };
});
