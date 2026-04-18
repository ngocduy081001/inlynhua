/**
 * /api/posts/slug-check?slug=xxx
 * Kiểm tra slug đã tồn tại chưa (dùng cho real-time validation trong form admin)
 */
import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ available: false, error: "Thiếu slug" }, { status: 400 });

  const existing = await getPostBySlug(slug);
  return NextResponse.json({ available: !existing, slug });
}
