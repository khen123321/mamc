import { demoStorageKeys } from "@/constants/storage-keys";
import { AuditAction, AuditModule } from "@/enums/operations";
import { newsItems } from "@/lib/mock/news";
import { auditService } from "@/lib/services/audit-service";
import { getStoredValue, setStoredValue } from "@/lib/services/demo-store";
import type { NewsItem } from "@/types/content";

export interface NewsItemInput {
  title: string;
  category: string;
  excerpt: string;
}

export const contentService = {
  getLatestNews: (): NewsItem[] => getStoredValue<NewsItem[]>(demoStorageKeys.websiteNews, newsItems),
  publishNews: (input: NewsItemInput): NewsItem => {
    const normalizedTitle = input.title.trim();
    const newsItem: NewsItem = {
      id: `NEWS-${Date.now()}`,
      title: normalizedTitle,
      category: input.category.trim() || "Hospital Update",
      excerpt: input.excerpt.trim(),
      image: newsItems[0]?.image ?? "/images/hospital-exterior.jpg",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      slug: normalizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    setStoredValue<NewsItem[]>(demoStorageKeys.websiteNews, [newsItem, ...contentService.getLatestNews()]);
    auditService.log({
      module: AuditModule.WebsiteAdmin,
      action: AuditAction.PUBLISH_CONTENT,
      recordId: newsItem.id,
      description: `Published public website news item "${newsItem.title}".`,
    });
    return newsItem;
  },
};
