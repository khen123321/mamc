"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { AdminCharts } from "@/components/dashboard/admin-charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { analyticsService } from "@/lib/services/analytics-service";
import { auditLogs } from "@/lib/mock/audit-logs";
import { operationalDepartments } from "@/lib/mock/operational-departments";
import { patientAssignments } from "@/lib/mock/assignments";
import { assignmentService } from "@/lib/services/assignment-service";
import { auditService } from "@/lib/services/audit-service";
import { demoResetService } from "@/lib/services/demo-reset-service";
import { operationalDepartmentService } from "@/lib/services/operational-department-service";
import { formatDateTime } from "@/lib/format";
import type { AuditLog, OperationalDepartment, PatientAssignment } from "@/types/operations";

export function AdminDashboardClient() {
  const [resetMessage, setResetMessage] = useState<string>("");
  const [assignments, setAssignments] = useState<PatientAssignment[]>(patientAssignments);
  const [departments, setDepartments] = useState<OperationalDepartment[]>(operationalDepartments);
  const [logs, setLogs] = useState<AuditLog[]>(auditLogs.slice(0, 5));
  const stats = [
    ...analyticsService.getStats(),
    { label: "Waiting Assignment", value: String(assignments.filter((assignment) => !assignment.doctorId).length) },
    { label: "Doctors Available", value: "12" },
    { label: "Active Queues", value: "8" },
    { label: "Managed Departments", value: String(departments.length) },
  ];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAssignments(assignmentService.getAssignments());
      setDepartments(operationalDepartmentService.getDepartments());
      setLogs(auditService.getLogs().slice(0, 5));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function resetDemo() {
    if (!window.confirm("Reset visit tracking, assignments, doctor queue changes, departments, service queue configuration, users, role permissions, and audit demo changes?")) {
      return;
    }
    demoResetService.resetInternalOperations();
    setResetMessage("Visit tracking and queue management demo state restored");
    setTimeout(() => window.location.reload(), 450);
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Admin Demo</p>
          <h1 className="text-3xl font-semibold text-slate-950">MCMC Operations Dashboard</h1>
          <p className="mt-2 text-slate-600">Enterprise-style mock analytics and operational overview.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/roles"><Button variant="outline">Role Management</Button></Link>
          <Link href="/admin/patient-assignment"><Button>Patient Assignment</Button></Link>
          <Button variant="secondary" onClick={resetDemo}><RotateCcw className="h-4 w-4" />Reset Demo</Button>
        </div>
      </div>

      {resetMessage ? <p className="mb-4 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800">{resetMessage}</p> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} label={stat.label} value={stat.value} />)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <AdminCharts />
        <Card>
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Recent Activity</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">Audit Events</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {logs.map((log) => (
              <div key={log.auditId} className="border-l-2 border-[var(--brand-secondary)] pl-4">
                <p className="text-xs font-semibold text-slate-500">{formatDateTime(log.timestamp)}</p>
                <p className="text-sm font-semibold text-slate-950">{log.action}</p>
                <p className="text-sm text-slate-600">{log.description}</p>
              </div>
            ))}
            <Link href="/admin/audit-logs"><Button variant="outline" className="w-full">View Audit Logs</Button></Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
