import { DepartmentStatus } from "@/enums/operations";
import type { OperationalDepartment } from "@/types/operations";

export const operationalDepartments: OperationalDepartment[] = [
  { id: "OPD-CARD", departmentId: "DEPT-CARD", code: "CARD", name: "Cardiology", description: "Heart consultation and diagnostics.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: true, doctorAssignmentEnabled: true },
  { id: "OPD-PEDS", departmentId: "DEPT-PEDS", code: "PED", name: "Pediatrics", description: "Child wellness and pediatric consultations.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: true, doctorAssignmentEnabled: true },
  { id: "OPD-IM", departmentId: "DEPT-IM", code: "IM", name: "Internal Medicine", description: "Adult medicine and coordinated care.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: true, doctorAssignmentEnabled: true },
  { id: "OPD-OB", departmentId: "DEPT-OB", code: "OBGYN", name: "OB-GYN", description: "Women's health and maternity coordination.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: true, doctorAssignmentEnabled: true },
  { id: "OPD-ORTHO", departmentId: "DEPT-ORTHO", code: "ORTHO", name: "Orthopedics", description: "Bone, joint, and spine services.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: true, doctorAssignmentEnabled: true },
  { id: "OPD-RAD", departmentId: "DEPT-RAD", code: "RAD", name: "Radiology", description: "Imaging registration and procedure queue.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
  { id: "OPD-LAB", departmentId: "DEPT-LAB", code: "LAB", name: "Laboratory", description: "Specimen collection and diagnostic processing.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
  { id: "OPD-PHARM", departmentId: "DEPT-PHARM", code: "PHARM", name: "Pharmacy", description: "Medicine validation and pickup.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
  { id: "OPD-ADM", departmentId: "DEPT-ADM", code: "ADM", name: "Admission", description: "Admission intake and room coordination.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
  { id: "OPD-HMO", departmentId: "DEPT-HMO", code: "HMO", name: "HMO / Insurance", description: "Eligibility and guarantee letter processing.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
  { id: "OPD-CASH", departmentId: "DEPT-CASH", code: "CASH", name: "Cashier", description: "Payments and official receipts.", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false },
];
