import { AuditAction, AuditModule } from "@/enums/operations";
import { Role } from "@/enums/role";
import type { AuditLog } from "@/types/operations";

export const auditLogs: AuditLog[] = [
  { auditId: "AUD-001", timestamp: "2026-10-05T10:42:00", actor: "Maria Reyes", actorId: "USR-004", role: Role.PATIENT_COORDINATOR, module: AuditModule.PatientAssignment, action: AuditAction.ASSIGN_DOCTOR, recordId: "VISIT-001", description: "Assigned visit MCMC-A7K9P2 / CARD-012 to Dr. Maria Santos." },
  { auditId: "AUD-002", timestamp: "2026-10-05T10:38:00", actor: "Andrea Santos", actorId: "USR-001", role: Role.IT_ADMIN, module: AuditModule.RoleManagement, action: AuditAction.UPDATE_PERMISSION, recordId: Role.PATIENT_COORDINATOR, description: "Updated Patient Coordinator permissions for queue transfer access." },
  { auditId: "AUD-003", timestamp: "2026-10-05T10:31:00", actor: "Maria Reyes", actorId: "USR-004", role: Role.PATIENT_COORDINATOR, module: AuditModule.PatientAssignment, action: AuditAction.ASSIGN_DOCTOR, recordId: "ASN-004", description: "Assigned CARD-025 to Dr. Maria Santos." },
];
