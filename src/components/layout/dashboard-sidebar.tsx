"use client";

import { Activity, Building2, CalendarDays, ClipboardList, FileClock, HeartPulse, LayoutDashboard, Newspaper, Settings, ShieldCheck, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { DemoRoleSwitcher } from "@/components/auth/demo-role-switcher";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { hospital } from "@/constants/hospital";
import { Permission } from "@/enums/permission";
import { authService } from "@/lib/services/auth-service";

interface AdminNavGroup {
  label: string;
  items: { label: string; href: string; icon: LucideIcon; permission: Permission }[];
}

const navGroups: AdminNavGroup[] = [
  { label: "Dashboard", items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard, permission: Permission.DASHBOARD_VIEW }] },
  {
    label: "Operations",
    items: [
      { label: "Patients", href: "/admin/users", icon: Users, permission: Permission.PATIENT_VIEW },
      { label: "Appointments", href: "/portal/appointments", icon: CalendarDays, permission: Permission.APPOINTMENT_VIEW },
      { label: "Queue / Ticketing", href: "/staff/queue", icon: ClipboardList, permission: Permission.TICKET_VIEW },
      { label: "Patient Assignment", href: "/admin/patient-assignment", icon: UserCheck, permission: Permission.ASSIGNMENT_VIEW },
    ],
  },
  {
    label: "Clinical Setup",
    items: [
      { label: "Doctors", href: "/doctors", icon: HeartPulse, permission: Permission.DOCTOR_VIEW },
      { label: "Departments", href: "/admin/departments", icon: Building2, permission: Permission.DEPARTMENT_VIEW },
      { label: "Doctor Schedules", href: "/admin/schedule", icon: Activity, permission: Permission.DOCTOR_MANAGE_SCHEDULE },
    ],
  },
  { label: "Website", items: [{ label: "News", href: "/news", icon: Newspaper, permission: Permission.CONTENT_VIEW }] },
  {
    label: "Administration",
    items: [
      { label: "Users", href: "/admin/users", icon: Users, permission: Permission.USER_VIEW },
      { label: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck, permission: Permission.ROLE_VIEW },
      { label: "Queue Configuration", href: "/admin/queue-configuration", icon: Settings, permission: Permission.QUEUE_CONFIG_VIEW },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: FileClock, permission: Permission.AUDIT_LOG_VIEW },
      { label: "Settings", href: "/admin", icon: Settings, permission: Permission.SYSTEM_SETTINGS_VIEW },
    ],
  },
];

export function DashboardSidebar() {
  const user = authService.getCurrentUser();

  return (
    <aside className="w-full border-b border-slate-200 bg-[var(--brand-primary)] text-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="p-6">
        <Link href="/" className="block"><span className="inline-flex rounded-md bg-white p-3"><MCMCLogo variant="horizontal" className="w-[190px]" /></span><p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/80">Admin Suite</p><p className="mt-1 text-xs text-white/70">{hospital.conceptLabel}</p></Link>
        <div className="mt-5"><DemoRoleSwitcher /></div>
      </div>
      <nav className="space-y-4 px-3 pb-4">
        {navGroups.map((group) => {
          const items = group.items.filter((item) => authService.hasPermission(user, item.permission));
          if (items.length === 0) {
            return null;
          }

          return (
            <div key={group.label}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{group.label}</p>
              <div className="mt-1 grid gap-1 md:grid-cols-2 lg:block">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={`${group.label}-${item.href}-${item.label}`} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
