"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Plus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select, Textarea } from "@/components/ui/input";
import { DepartmentStatus } from "@/enums/operations";
import { operationalDepartments } from "@/lib/mock/operational-departments";
import { operationalDepartmentService } from "@/lib/services/operational-department-service";
import type { OperationalDepartment } from "@/types/operations";

function createEmptyDepartment(): OperationalDepartment {
  return { id: `OPD-${Date.now()}`, departmentId: `DEPT-${Date.now()}`, code: "", name: "", description: "", status: DepartmentStatus.ACTIVE, queueEnabled: true, appointmentEnabled: false, doctorAssignmentEnabled: false };
}

export function DepartmentsClient() {
  const [departments, setDepartments] = useState<OperationalDepartment[]>(operationalDepartments);
  const [selected, setSelected] = useState<OperationalDepartment>(operationalDepartments[0] ?? createEmptyDepartment());
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [message, setMessage] = useState<string>("");

  const filtered = useMemo(() => departments.filter((department) => {
    const matchesSearch = `${department.name} ${department.code}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || department.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [departments, search, statusFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedDepartments = operationalDepartmentService.getDepartments();
      setDepartments(storedDepartments);
      setSelected((current) => storedDepartments.find((department) => department.id === current.id) ?? storedDepartments[0] ?? current);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateSelected(patch: Partial<OperationalDepartment>) {
    setSelected((current) => ({ ...current, ...patch }));
  }

  function saveDepartment() {
    const normalized: OperationalDepartment = { ...selected, code: selected.code.trim().toUpperCase(), name: selected.name.trim(), description: selected.description.trim() };
    if (!normalized.code || !normalized.name) {
      setMessage("Department code and name are required.");
      return;
    }
    const next = operationalDepartmentService.saveDepartment(normalized);
    setDepartments(next);
    setSelected(normalized);
    setMessage("Department updated");
  }

  function toggleStatus(department: OperationalDepartment) {
    const nextStatus = department.status === DepartmentStatus.ACTIVE ? DepartmentStatus.INACTIVE : DepartmentStatus.ACTIVE;
    if (nextStatus === DepartmentStatus.INACTIVE && !window.confirm(`Disable ${department.name}? This only changes demo status and does not delete the department.`)) {
      return;
    }
    const next = operationalDepartmentService.setStatus(department.id, nextStatus);
    setDepartments(next);
    setSelected(next.find((item) => item.id === department.id) ?? selected);
    setMessage(`${department.name} status updated`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Departments</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Clinical and Operational Departments</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All statuses</option>
                {Object.values(DepartmentStatus).map((status) => <option key={status} value={status}>{status}</option>)}
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState title="No departments found." />
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {filtered.map((department) => (
                <button key={department.id} onClick={() => setSelected(department)} className={`rounded-md border p-4 text-left transition ${selected.id === department.id ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)]" : "border-[var(--brand-border)] bg-white hover:border-[var(--brand-secondary)]"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{department.name}</p>
                      <p className="text-sm text-slate-500">Code: {department.code}</p>
                    </div>
                    <Badge tone={department.status === DepartmentStatus.ACTIVE ? "green" : "slate"}>{department.status}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
                    <span>Queue: {department.queueEnabled ? "Enabled" : "Off"}</span>
                    <span>Appointment: {department.appointmentEnabled ? "Enabled" : "Off"}</span>
                    <span>Assignment: {department.doctorAssignmentEnabled ? "Enabled" : "Off"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Department Form</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">{selected.name || "New Department"}</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelected(createEmptyDepartment())}><Plus className="h-4 w-4" />Create</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {message ? <p className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800"><CheckCircle2 className="h-4 w-4" />{message}</p> : null}
          <Input value={selected.name} onChange={(event) => updateSelected({ name: event.target.value })} placeholder="Department name" />
          <Input value={selected.code} onChange={(event) => updateSelected({ code: event.target.value.toUpperCase() })} placeholder="Code" />
          <Textarea value={selected.description} onChange={(event) => updateSelected({ description: event.target.value })} placeholder="Description" />
          <Select value={selected.status} onChange={(event) => updateSelected({ status: event.target.value as DepartmentStatus })}>
            {Object.values(DepartmentStatus).map((status) => <option key={status} value={status}>{status}</option>)}
          </Select>
          {[
            ["queueEnabled", "Queue Enabled"],
            ["appointmentEnabled", "Appointment Enabled"],
            ["doctorAssignmentEnabled", "Doctor Assignment Enabled"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between rounded-md border border-[var(--brand-border)] px-4 py-3 text-sm font-medium text-slate-700">
              {label}
              <input type="checkbox" checked={Boolean(selected[key as keyof OperationalDepartment])} onChange={(event) => updateSelected({ [key]: event.target.checked } as Partial<OperationalDepartment>)} className="h-4 w-4 accent-[var(--brand-primary)]" />
            </label>
          ))}
          <div className="flex gap-2">
            <Button onClick={saveDepartment}><Save className="h-4 w-4" />Save</Button>
            <Button variant="outline" onClick={() => toggleStatus(selected)}>{selected.status === DepartmentStatus.ACTIVE ? "Disable" : "Enable"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
