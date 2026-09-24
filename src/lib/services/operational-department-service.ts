import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule, DepartmentStatus } from "@/enums/operations";
import { operationalDepartments } from "@/lib/mock/operational-departments";
import { auditService } from "@/lib/services/audit-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { OperationalDepartment } from "@/types/operations";

export const operationalDepartmentService = {
  getDepartments: (): OperationalDepartment[] => getStoredValue<OperationalDepartment[]>(demoStorageKeys.departments, operationalDepartments),
  saveDepartment: (department: OperationalDepartment): OperationalDepartment[] => {
    const exists = operationalDepartmentService.getDepartments().some((item) => item.id === department.id);
    const next = exists
      ? operationalDepartmentService.getDepartments().map((item) => (item.id === department.id ? department : item))
      : [department, ...operationalDepartmentService.getDepartments()];
    setStoredValue<OperationalDepartment[]>(demoStorageKeys.departments, next);
    auditService.log({ module: AuditModule.DepartmentManagement, action: AuditAction.UPDATE_DEPARTMENT, recordId: department.id, description: `Updated ${department.name} department configuration.` });
    return next;
  },
  setStatus: (departmentId: string, status: DepartmentStatus): OperationalDepartment[] => {
    const next = operationalDepartmentService.getDepartments().map((department) => (department.id === departmentId ? { ...department, status } : department));
    setStoredValue<OperationalDepartment[]>(demoStorageKeys.departments, next);
    const department = next.find((item) => item.id === departmentId);
    auditService.log({ module: AuditModule.DepartmentManagement, action: AuditAction.UPDATE_DEPARTMENT, recordId: departmentId, description: `${department?.name ?? "Department"} status changed to ${status}.` });
    return next;
  },
};

