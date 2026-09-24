"use client";

import { useEffect, useState } from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { DoctorQueueStatus } from "@/enums/operations";
import { assignmentService } from "@/lib/services/assignment-service";
import type { DoctorQueueItem } from "@/types/operations";

const doctorId = "DOC-001";

const doctorQueueStatusLabels: Record<DoctorQueueStatus, string> = {
  [DoctorQueueStatus.WAITING]: "Waiting",
  [DoctorQueueStatus.CALLED]: "Called",
  [DoctorQueueStatus.IN_CONSULTATION]: "In Consultation",
  [DoctorQueueStatus.COMPLETED]: "Completed",
};

export function DoctorQueueClient() {
  const [queue, setQueue] = useState<DoctorQueueItem[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const timer = window.setTimeout(() => setQueue(assignmentService.getDoctorQueue(doctorId)), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function refresh(text?: string) {
    setQueue(assignmentService.getDoctorQueue(doctorId));
    setMessage(text ?? "");
  }

  function startConsultation(assignmentId: string) {
    assignmentService.startConsultation(assignmentId);
    refresh("Consultation started");
  }

  function completeConsultation(assignmentId: string) {
    assignmentService.completeConsultation(assignmentId);
    refresh("Consultation completed");
  }

  function callPatient(assignmentId: string) {
    assignmentService.callDoctorQueue(assignmentId);
    refresh("Doctor queue number called");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">My Queue</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">Dr. Maria Santos</h2>
              <p className="text-sm text-slate-600">Cardiology · assigned patients only</p>
            </div>
            <Badge tone="green">{queue.length} active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {message ? <p className="mb-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm font-semibold text-green-800"><CheckCircle2 className="h-4 w-4" />{message}</p> : null}
          {queue.length === 0 ? (
            <EmptyState title="No assigned patients in your queue." description="Assigned patients will appear here after Patient Assignment." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {queue.map((item) => (
                <div key={item.assignmentId} className="rounded-md border border-[var(--brand-border)] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-semibold text-slate-950">{item.doctorQueueNumber}</p>
                      <p className="mt-1 font-medium text-slate-700">{item.patientName}</p>
                      <p className="text-sm text-slate-500">{item.visitReference}</p>
                      <p className="text-sm text-slate-500">{item.waitingMinutes} minutes waiting</p>
                    </div>
                    <Badge tone={item.status === DoctorQueueStatus.IN_CONSULTATION ? "purple" : "amber"}>{doctorQueueStatusLabels[item.status]}</Badge>
                  </div>
                  {item.encounterReference ? <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">Encounter: <span className="font-semibold text-slate-950">{item.encounterReference}</span></p> : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => callPatient(item.assignmentId)} disabled={item.status === DoctorQueueStatus.IN_CONSULTATION}>Call</Button>
                    <Button onClick={() => startConsultation(item.assignmentId)} disabled={item.status === DoctorQueueStatus.IN_CONSULTATION}><Play className="h-4 w-4" />Start Consultation</Button>
                    <Button variant="secondary" onClick={() => completeConsultation(item.assignmentId)} disabled={item.status !== DoctorQueueStatus.IN_CONSULTATION}><CheckCircle2 className="h-4 w-4" />Complete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Clinical Scope Notice</p></CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-600">This demo starts a lightweight encounter reference only. It does not create diagnosis, clinical notes, prescriptions, laboratory results, medical history, or medical record attachments.</p>
        </CardContent>
      </Card>
    </div>
  );
}
