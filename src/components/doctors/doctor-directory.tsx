"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/input";
import { DoctorCard } from "@/components/doctors/doctor-card";
import type { Doctor } from "@/types/doctor";

export function DoctorDirectory({ doctors, specialties }: { doctors: Doctor[]; specialties: string[] }) {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availability, setAvailability] = useState("all");
  const filtered = useMemo(() => doctors.filter((doctor) => {
    const q = query.toLowerCase();
    const matchesQuery = doctor.name.toLowerCase().includes(q) || doctor.specialty.toLowerCase().includes(q);
    const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
    const matchesAvailability = availability === "all" || doctor.availability === availability;
    return matchesQuery && matchesSpecialty && matchesAvailability;
  }), [availability, doctors, query, specialty]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-[var(--brand-border)] bg-white p-6 md:grid-cols-[1fr_220px_220px]">
        <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, specialty, or department" />
        <Select value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option value="all">All specialties</option>{specialties.map((item) => <option key={item}>{item}</option>)}</Select>
        <Select value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">All availability</option><option value="available">Available today</option><option value="limited">Limited slots</option><option value="unavailable">Unavailable</option></Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((doctor) => <DoctorCard key={doctor.doctorId} doctor={doctor} />)}</div>
      {filtered.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No matching doctors found.</div> : null}
    </div>
  );
}
