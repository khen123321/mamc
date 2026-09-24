"use client";

import type { ReactNode } from "react";
import { Permission } from "@/enums/permission";
import { authService } from "@/lib/services/auth-service";

export function Can({ permission, children, fallback = null }: { permission: Permission; children: ReactNode; fallback?: ReactNode }) {
  const user = authService.getCurrentUser();
  return authService.hasPermission(user, permission) ? <>{children}</> : <>{fallback}</>;
}

export function PermissionGate({ permissions, mode = "all", children, fallback = null }: { permissions: Permission[]; mode?: "all" | "any"; children: ReactNode; fallback?: ReactNode }) {
  const user = authService.getCurrentUser();
  const allowed = mode === "all" ? authService.hasAllPermissions(user, permissions) : authService.hasAnyPermission(user, permissions);
  return allowed ? <>{children}</> : <>{fallback}</>;
}

