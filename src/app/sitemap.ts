/**
 * /sitemap.xml — Tự động tạo sitemap cho Google Search Console
 * Bao gồm: trang chủ, tin tức, tất cả bài viết, chuyên mục
 */
import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { blogPosts, categories } from "@/data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/tin-tuc/chuyen-muc/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static blog posts — URLs at root (/{slug})
  const staticPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.isFeatured ? 0.8 : 0.6,
  }));

  // Dynamic posts (từ SQLite DB) — URLs at root (/{slug})
  const dynamicPosts = getPublishedPosts();
  const dynamicPostPages: MetadataRoute.Sitemap = dynamicPosts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: post.isFeatured ? 0.8 : 0.6,
  }));

  return [...staticPages, ...categoryPages, ...staticPostPages, ...dynamicPostPages];
}
