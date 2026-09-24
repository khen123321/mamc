import { defaultRolePermissions, roleDefinitions } from "@/constants/role-permissions";
import { Permission } from "@/enums/permission";
import { Role } from "@/enums/role";
import { authService } from "@/lib/services/auth-service";
import type { RoleDefinition } from "@/types/auth";

export const roleService = {
  getRoles: (): RoleDefinition[] => roleDefinitions,
  getRoleByCode: (role: Role): RoleDefinition | undefined => roleDefinitions.find((item) => item.role === role),
  getPermissionsForRole: (role: Role): Permission[] => authService.getRolePermissions()[role] ?? [],
  updatePermissions: (role: Role, permissions: Permission[]): Permission[] => {
    authService.updateRolePermissions(role, permissions);
    return roleService.getPermissionsForRole(role);
  },
  resetPermissions: (role: Role): Permission[] => {
    authService.updateRolePermissions(role, defaultRolePermissions[role] ?? []);
    return roleService.getPermissionsForRole(role);
  },
};

