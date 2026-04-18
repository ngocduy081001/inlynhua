/**
 * lib/posts.ts — Blog storage layer backed by MySQL
 */
import { getPool, initSchema } from "@/lib/db";
import { categories } from "@/data/blogData";
import { RowDataPacket } from "mysql2";

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

// Ensure table exists on first call
let _initialized = false;
async function ensureInit() {
  if (_initialized) return;
  await initSchema();
  _initialized = true;
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
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : (row.tags ?? []),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url ?? undefined,
    focusKeyword: row.focus_keyword,
    keywords: typeof row.keywords === "string" ? JSON.parse(row.keywords) : (row.keywords ?? []),
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
export async function getAllPosts(): Promise<Post[]> {
  await ensureInit();
  const pool = getPool();
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM posts ORDER BY created_at DESC");
  return rows.map(rowToPost);
}

export async function getPublishedPosts(): Promise<Post[]> {
  await ensureInit();
  const pool = getPool();
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC, created_at DESC"
  );
  return rows.map(rowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  await ensureInit();
  const pool = getPool();
  const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM posts WHERE slug = ?", [slug]);
  return rows[0] ? rowToPost(rows[0]) : undefined;
}

export async function createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post> {
  await ensureInit();
  const pool = getPool();

  // Validate slug uniqueness
  const [existing] = await pool.execute<RowDataPacket[]>("SELECT id FROM posts WHERE slug = ?", [data.slug]);
  if (existing.length > 0) throw new Error(`Slug "${data.slug}" đã tồn tại`);

  const now = new Date().toISOString();
  const id = `post_${Date.now()}`;
  const publishedAt = data.status === "published" ? (data.publishedAt ?? now) : null;

  await pool.execute(
    `INSERT INTO posts (
      id, title, slug, status, content, excerpt, thumbnail,
      category_slug, tags, meta_title, meta_description, canonical_url,
      focus_keyword, keywords, og_title, og_description, og_image,
      author_name, author_role, author_avatar, read_time, is_featured,
      created_at, updated_at, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, data.title, data.slug, data.status, data.content, data.excerpt, data.thumbnail,
      data.categorySlug, JSON.stringify(data.tags), data.metaTitle, data.metaDescription, data.canonicalUrl ?? null,
      data.focusKeyword, JSON.stringify(data.keywords), data.ogTitle ?? null, data.ogDescription ?? null, data.ogImage ?? null,
      data.author.name, data.author.role ?? null, data.author.avatar ?? null, data.readTime, data.isFeatured ? 1 : 0,
      now, now, publishedAt,
    ]
  );

  const post = await getPostBySlug(data.slug);
  if (!post) throw new Error("Failed to create post");
  return post;
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  await ensureInit();
  const pool = getPool();

  const [existingRows] = await pool.execute<RowDataPacket[]>("SELECT * FROM posts WHERE id = ?", [id]);
  if (existingRows.length === 0) throw new Error("Bài viết không tồn tại");

  const current = rowToPost(existingRows[0]);
  const now = new Date().toISOString();
  const publishedAt =
    data.status === "published" && !current.publishedAt
      ? now
      : (data.publishedAt ?? current.publishedAt ?? null);

  await pool.execute(
    `UPDATE posts SET
      title = ?, slug = ?, status = ?, content = ?, excerpt = ?, thumbnail = ?,
      category_slug = ?, tags = ?, meta_title = ?, meta_description = ?,
      canonical_url = ?, focus_keyword = ?, keywords = ?, og_title = ?, og_description = ?,
      og_image = ?, author_name = ?, author_role = ?, read_time = ?, is_featured = ?,
      updated_at = ?, published_at = ?
    WHERE id = ?`,
    [
      data.title ?? current.title, data.slug ?? current.slug, data.status ?? current.status,
      data.content ?? current.content, data.excerpt ?? current.excerpt, data.thumbnail ?? current.thumbnail,
      data.categorySlug ?? current.categorySlug, JSON.stringify(data.tags ?? current.tags),
      data.metaTitle ?? current.metaTitle, data.metaDescription ?? current.metaDescription,
      data.canonicalUrl ?? current.canonicalUrl ?? null, data.focusKeyword ?? current.focusKeyword,
      JSON.stringify(data.keywords ?? current.keywords), data.ogTitle ?? current.ogTitle ?? null,
      data.ogDescription ?? current.ogDescription ?? null, data.ogImage ?? current.ogImage ?? null,
      data.author?.name ?? current.author.name, data.author?.role ?? current.author.role ?? null,
      data.readTime ?? current.readTime, (data.isFeatured ?? current.isFeatured) ? 1 : 0,
      now, publishedAt ?? null, id,
    ]
  );

  const post = await getPostBySlug(data.slug ?? current.slug);
  if (!post) throw new Error("Failed to update post");
  return post;
}

export async function deletePost(id: string): Promise<void> {
  await ensureInit();
  const pool = getPool();
  await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
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
