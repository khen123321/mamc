import Link from "next/link";
import { Globe2, ListOrdered } from "lucide-react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoResetButton } from "@/components/demo/demo-reset-button";

const demoSystems = [
  { label: "Website Admin", href: "/website-admin", icon: Globe2, description: "Manage mock public website content and news updates." },
  { label: "Queue Management", href: "/queue-system", icon: ListOrdered, description: "Generate and operate public service queue numbers such as HMO-023." },
];

export default function DemoPage() {
  return (
    <>
      <PublicNavbar />
      <PageShell>
        <PageHeader eyebrow="Demo Hub" title="MCMC System Demo" description="Presentation entry point for the three separate systems in this prototype." />
        <div className="grid gap-6 md:grid-cols-2">
          {demoSystems.map((system) => {
            const Icon = system.icon;
            return (
              <Card key={system.href}>
                <CardContent>
                  <Icon className="h-8 w-8 text-[var(--brand-primary)]" />
                  <h2 className="mt-4 text-xl font-semibold text-slate-950">{system.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{system.description}</p>
                  <Link href={system.href} className="mt-5 inline-block"><Button>Open</Button></Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-8"><DemoResetButton /></div>
      </PageShell>
      <SiteFooter />
    </>
  );
}
