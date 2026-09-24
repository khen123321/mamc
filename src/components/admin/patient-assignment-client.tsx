"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, RefreshCw, UserCheck } from "lucide-react";
import { Can } from "@/components/auth/permission-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/input";
import { AssignmentStatus, DoctorAvailability } from "@/enums/operations";
import { Permission } from "@/enums/permission";
import { doctors } from "@/lib/mock/doctors";
import { departments } from "@/lib/mock/departments";
import { patientAssignments } from "@/lib/mock/assignments";
import { assignmentService } from "@/lib/services/assignment-service";
import { formatTime } from "@/lib/format";
import type { DoctorAvailabilitySummary, PatientAssignment } from "@/types/operations";

const assignmentStatusLabels: Record<AssignmentStatus, string> = {
  [AssignmentStatus.WAITING_ASSIGNMENT]: "Waiting Assignment",
  [AssignmentStatus.ASSIGNED]: "Assigned",
  [AssignmentStatus.WAITING_DOCTOR]: "Waiting Doctor",
  [AssignmentStatus.CALLED]: "Called",
  [AssignmentStatus.IN_CONSULTATION]: "In Consultation",
  [AssignmentStatus.COMPLETED]: "Completed",
};

export function PatientAssignmentClient() {
  const [assignments, setAssignments] = useState<PatientAssignment[]>(patientAssignments);
  const [selectedId, setSelectedId] = useState<string>(assignments[0]?.assignmentId ?? "");
  const [search, setSearch] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [message, setMessage] = useState<string>("");

  const selectedAssignment = assignments.find((assignment) => assignment.assignmentId === selectedId) ?? assignments[0];
  const doctorOptions = useMemo<DoctorAvailabilitySummary[]>(() => {
    if (!selectedAssignment) {
      return [];
    }

    return doctors
      .filter((doctor) => doctor.departmentId === selectedAssignment.departmentId)
      .map((doctor, index) => ({
        doctorId: doctor.doctorId,
        doctorName: doctor.name,
        departmentId: doctor.departmentId,
        specialty: doctor.specialty,
        patientsWaiting: assignments.filter((assignment) => assignment.doctorId === doctor.doctorId && assignment.status !== AssignmentStatus.COMPLETED).length,
        availability: index === 1 ? DoctorAvailability.IN_CONSULTATION : DoctorAvailability.AVAILABLE,
      }));
  }, [assignments, selectedAssignment]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedAssignments = assignmentService.getAssignments();
      setAssignments(storedAssignments);
      setSelectedId((current) => current || storedAssignments[0]?.assignmentId || "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredAssignments = useMemo(() => assignments.filter((assignment) => {
    const matchesSearch = `${assignment.visitReference} ${assignment.doctorQueueNumber} ${assignment.patientName}`.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || assignment.departmentId === departmentFilter;
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  }), [assignments, departmentFilter, search, statusFilter]);

  function refresh(next?: PatientAssignment | undefined) {
    const updated = assignmentService.getAssignments();
    setAssignments(updated);
    if (next) {
      setSelectedId(next.assignmentId);
    }
  }

  function assignDoctor(doctorId: string, reassignment: boolean) {
    if (!selectedAssignment) {
      return;
    }

    const doctor = doctors.find((item) => item.doctorId === doctorId);
    if (!doctor) {
      return;
    }

    if (reassignment && !window.confirm(`Reassign ${selectedAssignment.visitReference} to ${doctor.name}?`)) {
      return;
    }

    const updated = reassignment ? assignmentService.reassignDoctor(selectedAssignment.assignmentId, doctorId) : assignmentService.assignDoctor(selectedAssignment.assignmentId, doctorId);
    refresh(updated);
    setMessage(reassignment ? "Patient reassigned successfully" : "Patient assigned successfully");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Checked-In Visits</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Doctor Assignment Queue</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient or visit reference" />
              <Select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                <option value="all">All departments</option>
                {departments.map((department) => <option key={department.departmentId} value={department.departmentId}>{department.name}</option>)}
              </Select>
              <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All statuses</option>
                {Object.values(AssignmentStatus).map((status) => <option key={status} value={status}>{assignmentStatusLabels[status]}</option>)}
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAssignments.length === 0 ? (
            <EmptyState title="No patients waiting for assignment." description="Try changing the search, department, or status filters." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr className="border-b border-[var(--brand-border)]">
                    <th className="py-3">Visit</th>
                    <th>Doctor Queue</th>
                    <th>Patient</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Waiting</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => {
                    const department = departments.find((item) => item.departmentId === assignment.departmentId);
                    const doctor = doctors.find((item) => item.doctorId === assignment.doctorId);
                    return (
                      <tr key={assignment.assignmentId} onClick={() => setSelectedId(assignment.assignmentId)} className={`cursor-pointer border-b border-slate-100 ${selectedId === assignment.assignmentId ? "bg-[var(--brand-surface-soft)]" : "hover:bg-slate-50"}`}>
                        <td className="py-4 font-semibold text-slate-950">{assignment.visitReference}</td>
                        <td>{assignment.doctorQueueNumber}</td>
                        <td>{assignment.patientName}</td>
                        <td>{department?.name ?? assignment.departmentId}</td>
                        <td><Badge tone={assignment.status === AssignmentStatus.WAITING_ASSIGNMENT ? "amber" : assignment.status === AssignmentStatus.IN_CONSULTATION ? "purple" : "green"}>{assignmentStatusLabels[assignment.status]}</Badge></td>
                        <td>{assignment.waitingMinutes} min</td>
                        <td>{doctor?.name ?? "Not assigned"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="min-w-0">
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Selected Visit</p>
            {selectedAssignment ? <h2 className="mt-1 text-2xl font-semibold text-slate-950">{selectedAssignment.visitReference}</h2> : null}
          </CardHeader>
          <CardContent>
            {!selectedAssignment ? (
              <EmptyState title="No ticket selected." />
            ) : (
              <div className="space-y-4">
                <div className="rounded-md bg-slate-50 p-4">
                  <p className="font-semibold text-slate-950">{selectedAssignment.patientName}</p>
                  <p className="text-sm text-slate-600">{departments.find((department) => department.departmentId === selectedAssignment.departmentId)?.name} · {selectedAssignment.doctorQueueNumber}</p>
                </div>
                {message ? <p className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800"><CheckCircle2 className="h-4 w-4" />{message}</p> : null}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Available Doctors</p>
                  <div className="mt-3 space-y-3">
                    {doctorOptions.length === 0 ? <EmptyState title="No doctors available in this department." /> : doctorOptions.map((doctor) => (
                      <DoctorOption key={doctor.doctorId} doctor={doctor} selectedAssignment={selectedAssignment} onAssign={assignDoctor} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Assignment History</p></CardHeader>
          <CardContent className="space-y-3">
            {selectedAssignment?.history.length ? selectedAssignment.history.map((item) => (
              <div key={item.id} className="border-l-2 border-[var(--brand-secondary)] pl-4">
                <p className="text-xs font-semibold text-slate-500">{formatTime(item.timestamp)}</p>
                <p className="text-sm font-semibold text-slate-950">{item.description}</p>
                <p className="text-xs text-slate-500">By {item.actorName}</p>
              </div>
            )) : <EmptyState title="No assignment history yet." />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DoctorOption({ doctor, selectedAssignment, onAssign }: { doctor: DoctorAvailabilitySummary; selectedAssignment: PatientAssignment; onAssign: (doctorId: string, reassignment: boolean) => void }) {
  const isCurrent = selectedAssignment.doctorId === doctor.doctorId;
  const canReassign = Boolean(selectedAssignment.doctorId && !isCurrent);
  return (
    <div className="rounded-md border border-[var(--brand-border)] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-950">{doctor.doctorName}</p>
          <p className="text-sm text-slate-600">{doctor.specialty} · {doctor.patientsWaiting} patients waiting</p>
        </div>
        <Badge tone={doctor.availability === DoctorAvailability.AVAILABLE ? "green" : "amber"}>{doctor.availability === DoctorAvailability.AVAILABLE ? "Available" : "In Consultation"}</Badge>
      </div>
      <div className="mt-4 flex justify-end">
        {canReassign ? (
          <Can permission={Permission.ASSIGNMENT_REASSIGN_DOCTOR} fallback={<Button disabled variant="outline"><RefreshCw className="h-4 w-4" />Reassign</Button>}>
            <Button variant="outline" onClick={() => onAssign(doctor.doctorId, true)}><RefreshCw className="h-4 w-4" />Reassign</Button>
          </Can>
        ) : (
          <Can permission={Permission.ASSIGNMENT_ASSIGN_DOCTOR} fallback={<Button disabled><UserCheck className="h-4 w-4" />Assign Doctor</Button>}>
            <Button disabled={isCurrent} onClick={() => onAssign(doctor.doctorId, false)}><UserCheck className="h-4 w-4" />{isCurrent ? "Assigned" : "Assign Doctor"}</Button>
          </Can>
        )}
      </div>
    </div>
  );
}
