import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule } from "@/enums/operations";
import { systemUsers } from "@/lib/mock/users";
import { auditService } from "@/lib/services/audit-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { SystemUser } from "@/types/auth";

export const userService = {
  getUsers: (): SystemUser[] => getStoredValue<SystemUser[]>(demoStorageKeys.users, systemUsers),
  updateUser: (user: SystemUser): SystemUser[] => {
    const next = userService.getUsers().map((item) => (item.userId === user.userId ? user : item));
    setStoredValue<SystemUser[]>(demoStorageKeys.users, next);
    auditService.log({ module: AuditModule.UserManagement, action: AuditAction.UPDATE_USER_ROLE, recordId: user.userId, description: `Updated ${user.firstName} ${user.lastName} account role or status.` });
    return next;
  },
};

