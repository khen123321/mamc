import type { Permission } from "@/enums/permission";
import type { Role } from "@/enums/role";

export interface RoleDefinition {
  role: Role;
  label: string;
  description: string;
}

export interface RolePermission {
  role: Role;
  permissions: Permission[];
}

export interface SystemUser {
  userId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  role: Role;
  departmentId: string;
  specializationId?: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface DemoUser {
  userId: string;
  employeeId: string;
  name: string;
  role: Role;
  departmentId: string;
  title: string;
}

