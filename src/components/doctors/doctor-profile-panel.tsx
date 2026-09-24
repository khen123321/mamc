"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Doctor } from "@/types/doctor";

export function DoctorProfilePanel({ doctor }: { doctor: Doctor }) {
  const [date, setDate] = useState(doctor.schedule.availableDates[0]?.date ?? "");
  const [time, setTime] = useState("10:30 AM");
  const activeDate = doctor.schedule.availableDates.find((item) => item.date === date) ?? doctor.schedule.availableDates[0];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6">
        <Card>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image src={doctor.image.src} alt={doctor.image.alt} fill sizes="(max-width: 768px) 100vw, 180px" className="object-cover" priority />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-secondary)]">{doctor.specialty}</p>
                <h1 className="mt-2 text-4xl font-semibold text-slate-950">{doctor.name}</h1>
                <p className="mt-4 leading-7 text-slate-600">{doctor.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">{doctor.qualifications.map((item) => <span key={item} className="rounded-md bg-[var(--brand-surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-primary)]">{item}</span>)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><h2 className="text-xl font-semibold">Consultation Schedule</h2></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{doctor.schedule.weeklySlots.map((slot) => <div key={slot.id} className="rounded-lg border border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><p className="font-semibold">{slot.day}</p><StatusBadge status={slot.status} /></div><p className="mt-2 text-sm text-slate-600">{slot.startTime} - {slot.endTime}</p></div>)}</CardContent></Card>
      </div>
        <Card className="h-fit"><CardHeader><h2 className="text-xl font-semibold">Clinic Availability</h2><p className="mt-1 text-sm text-slate-500">Preview available clinic dates and times. Appointment booking is not active in this demo.</p></CardHeader><CardContent className="space-y-4"><div className="grid gap-2">{doctor.schedule.availableDates.map((item) => <button key={item.date} onClick={() => setDate(item.date)} className={`rounded-md border px-3 py-3 text-left text-sm font-semibold ${date === item.date ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]" : "border-slate-200 bg-white text-slate-700"}`}>{item.label}</button>)}</div><div className="grid grid-cols-2 gap-2">{activeDate?.slots.map((slot) => <button key={slot.id} disabled={!slot.available} onClick={() => setTime(slot.time)} className={`rounded-md border px-3 py-3 text-sm font-semibold ${time === slot.time ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white" : "border-slate-200 bg-white text-slate-700"} disabled:bg-slate-100 disabled:text-slate-400`}>{slot.time}</button>)}</div><Link href="/contact"><Button className="w-full" size="lg">Contact Clinic</Button></Link></CardContent></Card>
    </div>
  );
}

