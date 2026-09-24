"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { Card, CardContent } from "@/components/ui/card";
import type { HospitalFloor, HospitalLocation } from "@/types/hospital";

export function HospitalMapClient({ floors }: { floors: HospitalFloor[] }) {
  const [floorId, setFloorId] = useState(floors[0].floorId);
  const [query, setQuery] = useState("");
  const activeFloor = floors.find((floor) => floor.floorId === floorId) ?? floors[0];
  const locations = floors.flatMap((floor) => floor.locations);
  const [selected, setSelected] = useState<HospitalLocation>(activeFloor.locations.find((item) => item.name === "Cashier") ?? activeFloor.locations[0]);
  const searchResults = useMemo(() => locations.filter((location) => location.name.toLowerCase().includes(query.toLowerCase())), [locations, query]);
  function choose(location: HospitalLocation) { setSelected(location); setFloorId(location.floorId); }
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card><CardContent className="space-y-5"><div><p className="font-semibold">Floor</p><div className="mt-3 grid gap-2">{floors.map((floor) => <button key={floor.floorId} onClick={() => setFloorId(floor.floorId)} className={`rounded-md px-3 py-3 text-left text-sm font-semibold ${floorId === floor.floorId ? "bg-[var(--brand-primary)] text-white" : "bg-slate-100 text-slate-700"}`}>{floor.name}</button>)}</div></div><SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location" /><div className="max-h-72 space-y-2 overflow-auto">{searchResults.map((location) => <button key={location.locationId} onClick={() => choose(location)} className="w-full rounded-md border border-slate-200 p-3 text-left text-sm hover:bg-[var(--brand-surface-soft)]"><strong>{location.name}</strong><br /><span className="text-slate-500">{floors.find((floor) => floor.floorId === location.floorId)?.name}</span></button>)}</div></CardContent></Card>
      <div className="space-y-4"><div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"><svg viewBox="0 0 100 100" className="h-full w-full"><rect x="5" y="5" width="90" height="90" rx="2" fill="#f8fafc" stroke="#dbe7df" /><path d="M51 87 C51 72, 50 63, 50 55 C50 44, 49 38, 49 31" fill="none" stroke="var(--brand-secondary)" strokeWidth="2" strokeDasharray="3 2" /><circle cx="51" cy="87" r="2.5" fill="var(--brand-secondary)" /><text x="55" y="90" fontSize="3" fill="#111f18">You are here</text>{activeFloor.locations.map((location) => <g key={location.locationId} onClick={() => setSelected(location)} className="cursor-pointer"><rect x={location.x} y={location.y} width={location.width} height={location.height} rx="2" fill={selected.locationId === location.locationId ? "var(--brand-primary)" : location.type === "emergency" ? "#fff1ed" : "#f1f7f4"} stroke={selected.locationId === location.locationId ? "var(--brand-primary-hover)" : "#dbe7df"} /><text x={location.x + 2} y={location.y + 6} fontSize="3" fill={selected.locationId === location.locationId ? "white" : "#111f18"}>{location.name}</text></g>)}</svg></div><Card><CardContent className="grid gap-4 md:grid-cols-3"><div><p className="text-sm text-slate-500">You are here</p><p className="font-semibold">Main Entrance</p></div><div><p className="text-sm text-slate-500">Destination</p><p className="font-semibold">{selected.name}</p></div><div><p className="text-sm text-slate-500">Estimated walk</p><p className="font-semibold">2 minutes</p></div><p className="md:col-span-3 text-sm text-slate-600">{selected.description}</p></CardContent></Card></div>
    </div>
  );
}

