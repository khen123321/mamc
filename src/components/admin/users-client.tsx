"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { Role } from "@/enums/role";
import { departments } from "@/lib/mock/departments";
import { roleDefinitions } from "@/constants/role-permissions";
import { systemUsers } from "@/lib/mock/users";
import { userService } from "@/lib/services/user-service";
import type { SystemUser } from "@/types/auth";

export function UsersClient() {
  const [users, setUsers] = useState<SystemUser[]>(systemUsers);

  useEffect(() => {
    const timer = window.setTimeout(() => setUsers(userService.getUsers()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateUser(user: SystemUser) {
    setUsers(userService.updateUser(user));
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">User Management</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-950">Internal Demo Accounts</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr className="border-b border-[var(--brand-border)]">
                <th className="py-3">Name</th>
                <th>Employee ID</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-b border-slate-100">
                  <td className="py-4 font-semibold text-slate-950">{user.firstName} {user.lastName}</td>
                  <td>{user.employeeId}</td>
                  <td>
                    <Select value={user.role} onChange={(event) => updateUser({ ...user, role: event.target.value as Role })}>
                      {roleDefinitions.map((role) => <option key={role.role} value={role.role}>{role.label}</option>)}
                    </Select>
                  </td>
                  <td>{departments.find((department) => department.departmentId === user.departmentId)?.name ?? user.departmentId}</td>
                  <td><Badge tone={user.status === "ACTIVE" ? "green" : "slate"}>{user.status}</Badge></td>
                  <td><Button variant="outline" size="sm" onClick={() => updateUser({ ...user, status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" })}>{user.status === "ACTIVE" ? "Disable" : "Enable"}</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
