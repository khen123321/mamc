"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { hospital } from "@/constants/hospital";
import { doctorService } from "@/lib/services/doctor-service";
import type { ScheduleSlot } from "@/types/doctor";

const nextStatus: Record<ScheduleSlot["status"], ScheduleSlot["status"]> = { available: "fully-booked", "fully-booked": "blocked", blocked: "on-leave", "on-leave": "available" };

export default function AdminSchedulePage() {
  const doctors = doctorService.getDoctors().slice(0, 5);
  const [slots, setSlots] = useState<Record<string, ScheduleSlot["status"]>>({});
  return <div className="min-h-screen bg-slate-100 lg:flex"><DashboardSidebar /><main className="flex-1 p-4 lg:p-8"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mcmc-primary)]">Schedule Management</p><h1 className="text-3xl font-semibold text-slate-950">{hospital.shortName} Doctor / Staff Schedule</h1><p className="mt-2 text-slate-600">Click any slot to cycle through available, fully booked, blocked, and on leave states. {hospital.conceptLabel}</p></div><div className="grid gap-5">{doctors.map((doctor) => <Card key={doctor.doctorId}><CardHeader><h2 className="text-xl font-semibold">{doctor.name}</h2><p className="text-sm text-slate-500">{doctor.specialty} - {doctor.clinicRoom}</p></CardHeader><CardContent className="grid gap-3 md:grid-cols-4">{doctor.schedule.weeklySlots.map((slot) => { const status = slots[slot.id] ?? slot.status; return <button key={slot.id} onClick={() => setSlots({ ...slots, [slot.id]: nextStatus[status] })} className="rounded-lg border border-slate-200 bg-white p-4 text-left hover:border-[var(--brand-secondary)]"><div className="flex items-center justify-between gap-2"><p className="font-semibold">{slot.day}</p><StatusBadge status={status} /></div><p className="mt-2 text-sm text-slate-600">{slot.startTime} - {slot.endTime}</p></button>; })}</CardContent></Card>)}</div></main></div>;
}

