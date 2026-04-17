/**
 * lib/posts.ts — Blog storage layer backed by SQLite
 * Thay thế file JSON bằng DB thật (better-sqlite3)
 */
import { getDb } from "@/lib/db";
import { categories } from "@/data/blogData";

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface PostAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  categorySlug: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  focusKeyword: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  author: PostAuthor;
  readTime: number;
  isFeatured?: boolean;
}

// ─── DB Row → Post ──────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status as "draft" | "published",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? undefined,
    content: row.content,
    excerpt: row.excerpt,
    thumbnail: row.thumbnail,
    categorySlug: row.category_slug,
    tags: JSON.parse(row.tags ?? "[]"),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url ?? undefined,
    focusKeyword: row.focus_keyword,
    keywords: JSON.parse(row.keywords ?? "[]"),
    ogTitle: row.og_title ?? undefined,
    ogDescription: row.og_description ?? undefined,
    ogImage: row.og_image ?? undefined,
    author: {
      name: row.author_name,
      role: row.author_role ?? undefined,
      avatar: row.author_avatar ?? undefined,
    },
    readTime: row.read_time,
    isFeatured: row.is_featured === 1,
  };
}

// ─── CRUD ───────────────────────────────────────────────────────────────────────
export function getAllPosts(): Post[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
  return rows.map(rowToPost);
}

export function getPublishedPosts(): Post[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC")
    .all();
  return rows.map(rowToPost);
}

export function getPostBySlug(slug: string): Post | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM posts WHERE slug = ?").get(slug);
  return row ? rowToPost(row) : undefined;
}

export function createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Post {
  const db = getDb();

  // Validate slug uniqueness
  const existing = db.prepare("SELECT id FROM posts WHERE slug = ?").get(data.slug);
  if (existing) throw new Error(`Slug "${data.slug}" đã tồn tại`);

  const now = new Date().toISOString();
  const id = `post_${Date.now()}`;
  const publishedAt = data.status === "published" ? (data.publishedAt ?? now) : null;

  db.prepare(`
    INSERT INTO posts (
      id, title, slug, status, content, excerpt, thumbnail,
      category_slug, tags, meta_title, meta_description, canonical_url,
      focus_keyword, keywords, og_title, og_description, og_image,
      author_name, author_role, author_avatar, read_time, is_featured,
      created_at, updated_at, published_at
    ) VALUES (
      @id, @title, @slug, @status, @content, @excerpt, @thumbnail,
      @category_slug, @tags, @meta_title, @meta_description, @canonical_url,
      @focus_keyword, @keywords, @og_title, @og_description, @og_image,
      @author_name, @author_role, @author_avatar, @read_time, @is_featured,
      @created_at, @updated_at, @published_at
    )
  `).run({
    id,
    title: data.title,
    slug: data.slug,
    status: data.status,
    content: data.content,
    excerpt: data.excerpt,
    thumbnail: data.thumbnail,
    category_slug: data.categorySlug,
    tags: JSON.stringify(data.tags),
    meta_title: data.metaTitle,
    meta_description: data.metaDescription,
    canonical_url: data.canonicalUrl ?? null,
    focus_keyword: data.focusKeyword,
    keywords: JSON.stringify(data.keywords),
    og_title: data.ogTitle ?? null,
    og_description: data.ogDescription ?? null,
    og_image: data.ogImage ?? null,
    author_name: data.author.name,
    author_role: data.author.role ?? null,
    author_avatar: data.author.avatar ?? null,
    read_time: data.readTime,
    is_featured: data.isFeatured ? 1 : 0,
    created_at: now,
    updated_at: now,
    published_at: publishedAt,
  });

  return getPostBySlug(data.slug)!;
}

export function updatePost(id: string, data: Partial<Post>): Post {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  if (!existing) throw new Error("Bài viết không tồn tại");

  const current = rowToPost(existing);
  const now = new Date().toISOString();
  const publishedAt =
    data.status === "published" && !current.publishedAt
      ? now
      : (data.publishedAt ?? current.publishedAt ?? null);

  db.prepare(`
    UPDATE posts SET
      title = @title, slug = @slug, status = @status,
      content = @content, excerpt = @excerpt, thumbnail = @thumbnail,
      category_slug = @category_slug, tags = @tags,
      meta_title = @meta_title, meta_description = @meta_description,
      canonical_url = @canonical_url, focus_keyword = @focus_keyword,
      keywords = @keywords, og_title = @og_title, og_description = @og_description,
      og_image = @og_image, author_name = @author_name, author_role = @author_role,
      read_time = @read_time, is_featured = @is_featured,
      updated_at = @updated_at, published_at = @published_at
    WHERE id = @id
  `).run({
    id,
    title: data.title ?? current.title,
    slug: data.slug ?? current.slug,
    status: data.status ?? current.status,
    content: data.content ?? current.content,
    excerpt: data.excerpt ?? current.excerpt,
    thumbnail: data.thumbnail ?? current.thumbnail,
    category_slug: data.categorySlug ?? current.categorySlug,
    tags: JSON.stringify(data.tags ?? current.tags),
    meta_title: data.metaTitle ?? current.metaTitle,
    meta_description: data.metaDescription ?? current.metaDescription,
    canonical_url: data.canonicalUrl ?? current.canonicalUrl ?? null,
    focus_keyword: data.focusKeyword ?? current.focusKeyword,
    keywords: JSON.stringify(data.keywords ?? current.keywords),
    og_title: data.ogTitle ?? current.ogTitle ?? null,
    og_description: data.ogDescription ?? current.ogDescription ?? null,
    og_image: data.ogImage ?? current.ogImage ?? null,
    author_name: data.author?.name ?? current.author.name,
    author_role: data.author?.role ?? current.author.role ?? null,
    read_time: data.readTime ?? current.readTime,
    is_featured: (data.isFeatured ?? current.isFeatured) ? 1 : 0,
    updated_at: now,
    published_at: publishedAt ?? null,
  });

  return getPostBySlug(data.slug ?? current.slug)!;
}

export function deletePost(id: string): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
