"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, LockKeyhole, RotateCcw, Save } from "lucide-react";
import { defaultRolePermissions, permissionGroups, permissionLabels } from "@/constants/role-permissions";
import { AuditAction, AuditModule } from "@/enums/operations";
import { Permission } from "@/enums/permission";
import { Role } from "@/enums/role";
import { auditService } from "@/lib/services/audit-service";
import { roleService } from "@/lib/services/role-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RolesManagementClient() {
  const roles = roleService.getRoles();
  const [search, setSearch] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Role>(Role.PATIENT_COORDINATOR);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(defaultRolePermissions[Role.PATIENT_COORDINATOR]);
  const [message, setMessage] = useState<string>("");

  const selectedRoleDefinition = roles.find((role) => role.role === selectedRole) ?? roles[0];
  const isItAdmin = selectedRole === Role.IT_ADMIN;
  const filteredRoles = useMemo(() => roles.filter((role) => role.label.toLowerCase().includes(search.toLowerCase())), [roles, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSelectedPermissions(roleService.getPermissionsForRole(selectedRole)), 0);
    return () => window.clearTimeout(timer);
  }, [selectedRole]);

  function selectRole(role: Role) {
    setSelectedRole(role);
    setSelectedPermissions(roleService.getPermissionsForRole(role));
    setMessage("");
  }

  function togglePermission(permission: Permission) {
    if (isItAdmin) {
      return;
    }

    setSelectedPermissions((current) => (current.includes(permission) ? current.filter((item) => item !== permission) : [...current, permission]));
  }

  function saveChanges() {
    if (isItAdmin && !window.confirm("IT Administrator has full system access. Continue without changing core access?")) {
      return;
    }

    const before = roleService.getPermissionsForRole(selectedRole);
    roleService.updatePermissions(selectedRole, selectedPermissions);
    const added = selectedPermissions.filter((permission) => !before.includes(permission));
    const removed = before.filter((permission) => !selectedPermissions.includes(permission));
    auditService.log({
      module: AuditModule.RoleManagement,
      action: AuditAction.UPDATE_PERMISSION,
      recordId: selectedRole,
      description: `Updated ${selectedRoleDefinition.label} permissions. Added: ${added.map((permission) => permissionLabels[permission]).join(", ") || "None"}. Removed: ${removed.map((permission) => permissionLabels[permission]).join(", ") || "None"}.`,
    });
    setMessage(`${selectedRoleDefinition.label} permissions updated`);
  }

  function resetRole() {
    if (!window.confirm(`Reset ${selectedRoleDefinition.label} permissions to the demo default?`)) {
      return;
    }

    setSelectedPermissions(roleService.resetPermissions(selectedRole));
    setMessage(`${selectedRoleDefinition.label} permissions reset`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <Card>
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Roles</p>
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search roles" className="mt-3" />
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredRoles.map((role) => (
            <button key={role.role} onClick={() => selectRole(role.role)} className={`w-full rounded-md border px-4 py-3 text-left transition ${selectedRole === role.role ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)]" : "border-slate-200 bg-white hover:border-[var(--brand-secondary)]"}`}>
              <span className="block text-sm font-semibold text-slate-950">{role.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{role.description}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Permission Matrix</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">{selectedRoleDefinition.label}</h2>
              <p className="mt-1 text-sm text-slate-600">{selectedRoleDefinition.description}</p>
            </div>
            <Badge tone={isItAdmin ? "green" : "slate"}>{selectedPermissions.length} permissions</Badge>
          </div>
          {isItAdmin ? (
            <div className="mt-4 flex items-start gap-3 rounded-md bg-green-50 p-4 text-sm text-green-900">
              <LockKeyhole className="mt-0.5 h-4 w-4" />
              <p>IT Administrator has full system access. Core IT Admin permissions are read-only in this demo.</p>
            </div>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            {permissionGroups.map((group) => (
              <section key={group.label} className="rounded-md border border-[var(--brand-border)] p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{group.label}</h3>
                <div className="mt-3 space-y-2">
                  {group.permissions.map((permission) => {
                    const checked = isItAdmin || selectedPermissions.includes(permission);
                    return (
                      <label key={permission} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-slate-50">
                        <input type="checkbox" checked={checked} disabled={isItAdmin} onChange={() => togglePermission(permission)} className="h-4 w-4 accent-[var(--brand-primary)]" />
                        <span className="text-slate-700">{permissionLabels[permission]}</span>
                      </label>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[var(--brand-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            {message ? <p className="flex items-center gap-2 text-sm font-semibold text-green-700"><CheckCircle2 className="h-4 w-4" />{message}</p> : <p className="text-sm text-slate-500">Changes are stored locally for the presentation demo.</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetRole}><RotateCcw className="h-4 w-4" />Reset</Button>
              <Button onClick={saveChanges}><Save className="h-4 w-4" />Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
