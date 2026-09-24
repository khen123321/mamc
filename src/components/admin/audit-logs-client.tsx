"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import { AuditAction, AuditModule } from "@/enums/operations";
import { auditLogs } from "@/lib/mock/audit-logs";
import { auditService } from "@/lib/services/audit-service";
import { formatDateTime } from "@/lib/format";
import type { AuditLog } from "@/types/operations";

export function AuditLogsClient() {
  const [logs, setLogs] = useState<AuditLog[]>(auditLogs);
  const [search, setSearch] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLogs(auditService.getLogs()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const users = useMemo(() => Array.from(new Set(logs.map((log) => log.actor))), [logs]);
  const filteredLogs = useMemo(() => logs.filter((log) => {
    const matchesSearch = `${log.actor} ${log.description} ${log.recordId}`.toLowerCase().includes(search.toLowerCase());
    const matchesUser = userFilter === "all" || log.actor === userFilter;
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter);
    return matchesSearch && matchesUser && matchesModule && matchesAction && matchesDate;
  }), [actionFilter, dateFilter, logs, moduleFilter, search, userFilter]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="grid gap-3 lg:grid-cols-5">
            <Input placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
            <Select value={userFilter} onChange={(event) => setUserFilter(event.target.value)}>
              <option value="all">All users</option>
              {users.map((user) => <option key={user} value={user}>{user}</option>)}
            </Select>
            <Select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)}>
              <option value="all">All modules</option>
              {Object.values(AuditModule).map((module) => <option key={module} value={module}>{module}</option>)}
            </Select>
            <Select value={actionFilter} onChange={(event) => setActionFilter(event.target.value)}>
              <option value="all">All actions</option>
              {Object.values(AuditAction).map((action) => <option key={action} value={action}>{action}</option>)}
            </Select>
            <Input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <EmptyState title="No audit logs match the selected filters." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr className="border-b border-[var(--brand-border)]">
                    <th className="py-3">Timestamp</th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Module</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.auditId} className="border-b border-slate-100">
                      <td className="py-4 text-slate-600">{formatDateTime(log.timestamp)}</td>
                      <td className="font-medium text-slate-950">{log.actor}</td>
                      <td>{log.role.replaceAll("_", " ")}</td>
                      <td>{log.module}</td>
                      <td><Badge tone="slate">{log.action}</Badge></td>
                      <td className="max-w-sm text-slate-600">{log.description}</td>
                      <td><Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}><Eye className="h-4 w-4" />Details</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedLog ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Audit Detail</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">{selectedLog.auditId}</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedLog(null)}>Close</Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              ["Timestamp", formatDateTime(selectedLog.timestamp)],
              ["Actor", selectedLog.actor],
              ["Role", selectedLog.role.replaceAll("_", " ")],
              ["Module", selectedLog.module],
              ["Action", selectedLog.action],
              ["Record ID", selectedLog.recordId],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <p className="mt-1 font-medium text-slate-950">{value}</p>
              </div>
            ))}
            <div className="rounded-md bg-slate-50 p-4 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Description</p>
              <p className="mt-1 text-slate-700">{selectedLog.description}</p>
              <p className="mt-3 text-xs text-slate-500">Demo audit events are presentation records only and are not cryptographically secured.</p>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
