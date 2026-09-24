import Image from "next/image";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { departmentService } from "@/lib/services/department-service";

export default function ServicesPage() {
  const departments = departmentService.getDepartments();
  return (
    <>
      <PublicNavbar />
      <PageShell>
        <PageHeader eyebrow="Services" title="Hospital Services" description="Find the department or service area that matches your visit." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((department) => (
            <Card key={department.departmentId} className="overflow-hidden">
              <CardContent className="space-y-4">
                {department.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
                    <Image src={department.image.src} alt={department.image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                  </div>
                ) : null}
                <div>
                  <h2 className="font-semibold text-slate-950">{department.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{department.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[var(--mcmc-primary)]">{department.floor}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageShell>
      <SiteFooter />
    </>
  );
}
