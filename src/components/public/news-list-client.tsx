"use client";

import { useEffect, useState } from "react";
import { contentService } from "@/lib/services/content-service";
import type { NewsItem } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";

export function NewsListClient() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    function refreshNews() {
      setNews(contentService.getLatestNews());
    }

    refreshNews();
    window.addEventListener("mcmc-demo-state-change", refreshNews);
    return () => window.removeEventListener("mcmc-demo-state-change", refreshNews);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {news.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <p className="text-sm font-semibold text-[var(--brand-primary)]">{item.publishedAt}</p>
            <h2 className="mt-2 font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
