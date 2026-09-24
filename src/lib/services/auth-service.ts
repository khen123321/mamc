import { defaultRolePermissions } from "@/constants/role-permissions";
import { demoStorageKeys } from "@/constants/storage-keys";
import { Permission } from "@/enums/permission";
import { Role } from "@/enums/role";
import { demoUsers } from "@/lib/mock/users";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { DemoUser } from "@/types/auth";

export const authService = {
  getCurrentRole: (): Role => getStoredValue<Role>(demoStorageKeys.currentRole, Role.IT_ADMIN),
  setCurrentRole: (role: Role): Role => setStoredValue<Role>(demoStorageKeys.currentRole, role),
  getCurrentUser: (): DemoUser => demoUsers[authService.getCurrentRole()],
  getRolePermissions: (): Record<Role, Permission[]> => getStoredValue<Record<Role, Permission[]>>(demoStorageKeys.rolePermissions, defaultRolePermissions),
  updateRolePermissions: (role: Role, permissions: Permission[]): Record<Role, Permission[]> => {
    if (role === Role.IT_ADMIN) {
      return authService.getRolePermissions();
    }

    const next = { ...authService.getRolePermissions(), [role]: permissions };
    return setStoredValue<Record<Role, Permission[]>>(demoStorageKeys.rolePermissions, next);
  },
  hasPermission: (user: DemoUser, permission: Permission): boolean => {
    if (user.role === Role.IT_ADMIN) {
      return true;
    }

    return authService.getRolePermissions()[user.role]?.includes(permission) ?? false;
  },
  hasAnyPermission: (user: DemoUser, permissions: Permission[]): boolean => permissions.some((permission) => authService.hasPermission(user, permission)),
  hasAllPermissions: (user: DemoUser, permissions: Permission[]): boolean => permissions.every((permission) => authService.hasPermission(user, permission)),
};

