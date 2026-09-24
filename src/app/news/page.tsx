import { PublicNavbar } from "@/components/layout/public-navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { NewsListClient } from "@/components/public/news-list-client";

export default function NewsPage() {
  return <><PublicNavbar /><PageShell><PageHeader eyebrow="News" title="News & Events" description="Read hospital announcements, community updates, and helpful patient information." /><NewsListClient /></PageShell><SiteFooter /></>;
}
