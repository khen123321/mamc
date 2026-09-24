import type { NewsItem } from "@/types/content";

export const newsItems: NewsItem[] = [
  {
    id: "NEWS-001",
    title: "Hand, Foot, and Mouth Disease (HFMD)",
    category: "News",
    excerpt: "Helpful information for families on symptoms, prevention, and when to seek medical advice.",
    image: "health-update",
    publishedAt: "July 29, 2026",
    slug: "hand-foot-and-mouth-disease",
  },
  {
    id: "NEWS-002",
    title: "Leptospirosis",
    category: "News",
    excerpt: "Rainy season reminders on prevention, early symptoms, and timely consultation.",
    image: "rainy-season",
    publishedAt: "July 27, 2026",
    slug: "leptospirosis",
  },
  {
    id: "NEWS-003",
    title: "This Father's Day, Give the Gift that Truly Matters: Good Health",
    category: "Promo",
    excerpt: "Wellness reminders for fathers and families who want to stay proactive about health.",
    image: "wellness-promo",
    publishedAt: "June 8, 2026",
    slug: "fathers-day-health",
  },
];
