import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule } from "@/enums/operations";
import { removeStoredValue } from "@/lib/services/demo-store";
import { auditService } from "@/lib/services/audit-service";

export const demoResetService = {
  resetInternalOperations: () => {
    removeStoredValue(demoStorageKeys.websiteNews);
    removeStoredValue(demoStorageKeys.rolePermissions);
    removeStoredValue(demoStorageKeys.visits);
    removeStoredValue(demoStorageKeys.assignments);
    removeStoredValue(demoStorageKeys.departments);
    removeStoredValue(demoStorageKeys.queueConfigurations);
    removeStoredValue(demoStorageKeys.auditLogs);
    removeStoredValue(demoStorageKeys.users);
    auditService.log({ module: AuditModule.System, action: AuditAction.RESET_DEMO, recordId: "MCMC-DEMO", description: "Reset website content, queue management configuration, users, roles, and audit logs for the local demo." });
  },
};
