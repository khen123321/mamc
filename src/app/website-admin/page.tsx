import Link from "next/link";
import { Newspaper, Settings, Stethoscope, Users } from "lucide-react";
import { WebsiteAdminShell } from "@/components/website-admin/website-admin-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contentService } from "@/lib/services/content-service";

const websiteAdminCards = [
  { label: "Homepage", href: "/website-admin/homepage", icon: Settings },
  { label: "Services", href: "/website-admin/services", icon: Stethoscope },
  { label: "Doctors", href: "/website-admin/doctors", icon: Users },
  { label: "News", href: "/website-admin/news", icon: Newspaper },
];

export default function WebsiteAdminPage() {
  const news = contentService.getLatestNews();
  return (
    <WebsiteAdminShell>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {websiteAdminCards.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition hover:border-[var(--brand-secondary)]">
                <CardContent>
                  <Icon className="h-7 w-7 text-[var(--brand-primary)]" />
                  <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Manage mock public website content for this section.</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <Card className="mt-6">
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">Latest Public Updates</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">{news.length} news items available</h2>
          </div>
          <Link href="/website-admin/news"><Button>Publish News</Button></Link>
        </CardContent>
      </Card>
    </WebsiteAdminShell>
  );
}
