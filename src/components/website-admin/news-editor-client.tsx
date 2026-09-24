"use client";

import { useState } from "react";
import { contentService } from "@/lib/services/content-service";
import type { NewsItem } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NewsFormValues {
  title: string;
  category: string;
  excerpt: string;
}

const emptyForm: NewsFormValues = {
  title: "",
  category: "Hospital Update",
  excerpt: "",
};

export function NewsEditorClient() {
  const [form, setForm] = useState<NewsFormValues>(emptyForm);
  const [news, setNews] = useState<NewsItem[]>(() => contentService.getLatestNews());

  function publishNews() {
    if (!form.title.trim() || !form.excerpt.trim()) {
      return;
    }

    contentService.publishNews(form);
    setNews(contentService.getLatestNews());
    setForm(emptyForm);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-950">Publish News</h2>
          <p className="mt-1 text-sm text-slate-600">Mock CMS editor. Published items immediately appear in the public News page in this browser.</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Title
            <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Community wellness advisory" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Category
            <Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Excerpt
            <textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} rows={5} className="rounded-md border border-[var(--brand-border)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]" placeholder="Short public website summary..." />
          </label>
          <Button onClick={publishNews}>Publish Mock Update</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <p className="text-sm font-semibold text-[var(--brand-primary)]">{item.category} · {item.publishedAt}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
