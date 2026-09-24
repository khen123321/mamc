import { Role } from "@/enums/role";
import type { DemoUser, SystemUser } from "@/types/auth";

export const demoUsers: Record<Role, DemoUser> = {
  [Role.IT_ADMIN]: { userId: "USR-001", employeeId: "ADM-001", name: "Andrea Santos", role: Role.IT_ADMIN, departmentId: "DEPT-ADMIN", title: "IT Administrator" },
  [Role.HOSPITAL_ADMIN]: { userId: "USR-002", employeeId: "ADM-002", name: "Roberto Mercado", role: Role.HOSPITAL_ADMIN, departmentId: "DEPT-ADMIN", title: "Hospital Administrator" },
  [Role.FRONT_DESK]: { userId: "USR-003", employeeId: "FD-001", name: "Elena Garcia", role: Role.FRONT_DESK, departmentId: "DEPT-REG", title: "Front Desk Associate" },
  [Role.PATIENT_COORDINATOR]: { userId: "USR-004", employeeId: "PC-001", name: "Maria Reyes", role: Role.PATIENT_COORDINATOR, departmentId: "DEPT-OPS", title: "Patient Coordinator" },
  [Role.DOCTOR]: { userId: "USR-005", employeeId: "DOC-001", name: "Dr. Maria Santos", role: Role.DOCTOR, departmentId: "DEPT-CARD", title: "Cardiologist" },
  [Role.NURSE]: { userId: "USR-006", employeeId: "NRS-001", name: "Camille Bautista", role: Role.NURSE, departmentId: "DEPT-OPS", title: "Nurse" },
  [Role.RECORDS_STAFF]: { userId: "USR-007", employeeId: "REC-001", name: "Luis Ong", role: Role.RECORDS_STAFF, departmentId: "DEPT-MR", title: "Records Staff" },
  [Role.CONTENT_ADMIN]: { userId: "USR-008", employeeId: "CNT-001", name: "Patricia Lim", role: Role.CONTENT_ADMIN, departmentId: "DEPT-MKT", title: "Content Administrator" },
  [Role.PATIENT]: { userId: "USR-009", employeeId: "PAT-001", name: "Juan Dela Cruz", role: Role.PATIENT, departmentId: "DEPT-PATIENT", title: "Patient" },
};

export const systemUsers: SystemUser[] = [
  { userId: "USR-001", employeeId: "ADM-001", firstName: "Andrea", lastName: "Santos", role: Role.IT_ADMIN, departmentId: "DEPT-ADMIN", status: "ACTIVE" },
  { userId: "USR-004", employeeId: "PC-001", firstName: "Maria", lastName: "Reyes", role: Role.PATIENT_COORDINATOR, departmentId: "DEPT-OPS", status: "ACTIVE" },
  { userId: "USR-005", employeeId: "DOC-001", firstName: "Maria", lastName: "Santos", role: Role.DOCTOR, departmentId: "DEPT-CARD", specializationId: "SPEC-CARD-001", status: "ACTIVE" },
  { userId: "USR-003", employeeId: "FD-001", firstName: "Elena", lastName: "Garcia", role: Role.FRONT_DESK, departmentId: "DEPT-REG", status: "ACTIVE" },
  { userId: "USR-006", employeeId: "NRS-001", firstName: "Camille", lastName: "Bautista", role: Role.NURSE, departmentId: "DEPT-OPS", status: "ACTIVE" },
];

