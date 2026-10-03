import { DepartmentsClient } from "@/components/admin/departments-client";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function LegacyDepartmentsPage() {
  return <div className="min-h-screen bg-slate-100 lg:flex"><DashboardSidebar /><main className="flex-1 p-4 lg:p-8"><DepartmentsClient /></main></div>;
}
