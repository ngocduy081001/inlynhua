/**
 * /sitemap.xml — Tự động tạo sitemap cho Google Search Console
 * Bao gồm: trang chủ, tin tức, tất cả bài viết, chuyên mục
 */
import { MetadataRoute } from "next";
import { blogPosts, categories } from "@/data/blogData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/tin-tuc`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/studio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/bang-gia`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/tin-tuc/chuyen-muc/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static blog posts
  const staticPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.isFeatured ? 0.8 : 0.6,
  }));

  // Dynamic posts (SQLite) — skip if DB unavailable
  let dynamicPostPages: MetadataRoute.Sitemap = [];
  try {
    const { getPublishedPosts } = await import("@/lib/posts");
    const dynamicPosts = await getPublishedPosts();
    dynamicPostPages = dynamicPosts.map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: post.isFeatured ? 0.8 : 0.6,
    }));
  } catch {
    // SQLite / better-sqlite3 not available on production — skip
  }

  return [...staticPages, ...categoryPages, ...staticPostPages, ...dynamicPostPages];
}
