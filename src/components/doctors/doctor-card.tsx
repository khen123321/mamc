import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Doctor } from "@/types/doctor";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={doctor.image.src}
              alt={doctor.image.alt}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-6 text-slate-950">{doctor.name}</h3>
            <p className="mt-1 text-sm font-medium text-[var(--brand-primary)]">{doctor.specialty}</p>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-3">
            <span>Availability</span>
            <StatusBadge status={doctor.availability} />
          </div>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{doctor.clinicRoom}, {doctor.floor}</p>
          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-slate-400" />{doctor.scheduleSummary}</p>
        </div>

        <div className="mt-auto grid gap-2 sm:grid-cols-2">
          <Link href={`/doctors/${doctor.doctorId}`}><Button variant="outline" className="w-full">View Profile</Button></Link>
          <Link href="/contact"><Button className="w-full" variant="secondary">Contact Clinic</Button></Link>
        </div>
      </CardContent>
    </Card>
  );
}

