"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MCMC_BRAND } from "@/constants/brand";
import { analyticsService } from "@/lib/services/analytics-service";

export function AdminCharts() {
  const departmentData = analyticsService.getPatientsByDepartment();
  const queueData = analyticsService.getQueueByHour();
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader><h2 className="text-xl font-semibold">Patients per Department</h2></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={departmentData}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 12 }} /><YAxis /><Tooltip /><Bar dataKey="value" fill={MCMC_BRAND.colors.spartanGreen} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      <Card><CardHeader><h2 className="text-xl font-semibold">Queue Volume by Hour</h2></CardHeader><CardContent className="h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={queueData}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke={MCMC_BRAND.colors.spartanGreen} strokeWidth={3} /><Line type="monotone" dataKey="secondary" stroke={MCMC_BRAND.colors.excellenceGreen} strokeWidth={3} /></LineChart></ResponsiveContainer></CardContent></Card>
    </div>
  );
}

