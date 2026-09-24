export interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  slug: string;
}

export interface PresentationImage {
  src: string;
  alt: string;
  sourceName: string;
  sourceUrl: string;
}
