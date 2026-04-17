/**
 * /api/posts — GET all posts, POST create new post
 * Auth: protected by JWT middleware cookie (admin_session)
 */
import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost, generateSlug, estimateReadTime } from "@/lib/posts";

// GET /api/posts — list posts (admin=1 includes drafts)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get("admin") === "1";
  const posts = getAllPosts();
  const result = admin ? posts : posts.filter((p) => p.status === "published");
  return NextResponse.json(result);
}

// POST /api/posts — create new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["title", "content", "excerpt", "categorySlug", "focusKeyword", "metaTitle", "metaDescription"];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json({ error: `Thiếu trường bắt buộc: ${field}` }, { status: 400 });
      }
    }

    const slug = body.slug?.trim() || generateSlug(body.title);
    const readTime = estimateReadTime(body.content);

    const post = createPost({
      title: body.title.trim(),
      slug,
      status: body.status ?? "draft",
      content: body.content,
      excerpt: body.excerpt.trim(),
      thumbnail: body.thumbnail?.trim() || "/images/blog/default.png",
      categorySlug: body.categorySlug,
      tags: body.tags ?? [],
      metaTitle: body.metaTitle.trim(),
      metaDescription: body.metaDescription.trim(),
      canonicalUrl: body.canonicalUrl?.trim(),
      focusKeyword: body.focusKeyword.trim(),
      keywords: body.keywords ?? [],
      ogTitle: body.ogTitle?.trim(),
      ogDescription: body.ogDescription?.trim(),
      ogImage: body.ogImage?.trim(),
      author: body.author ?? { name: "In Ly Giá Rẻ", role: "Biên tập viên" },
      readTime,
      isFeatured: body.isFeatured ?? false,
      publishedAt: body.publishedAt,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
