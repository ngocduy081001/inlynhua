/**
 * /api/posts/[slug] — GET single, PUT update, DELETE remove
 */
import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePost, getAllPosts, estimateReadTime } from "@/lib/posts";

function isAuthorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret");
  return secret === (process.env.ADMIN_SECRET ?? "dev_secret");
}

// GET /api/posts/[slug]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  return NextResponse.json(post);
}

// PUT /api/posts/[slug]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  try {
    const body = await req.json();

    // Recalculate readTime if content changed
    const readTime = body.content ? estimateReadTime(body.content) : post.readTime;

    // Check slug uniqueness if slug is being changed
    if (body.slug && body.slug !== post.slug) {
      const allPosts = await getAllPosts();
      if (allPosts.some((p) => p.slug === body.slug && p.id !== post.id)) {
        return NextResponse.json({ error: `Slug "${body.slug}" đã tồn tại` }, { status: 400 });
      }
    }

    const updated = await updatePost(post.id, { ...body, readTime });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/posts/[slug]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  await deletePost(post.id);
  return NextResponse.json({ success: true });
}
