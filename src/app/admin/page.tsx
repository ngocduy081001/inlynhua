"use client";
import React, { useState, useEffect, useCallback } from "react";
import { categories } from "@/data/blogData";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  categorySlug: string;
  tags: string;
  status: "draft" | "published";
  // SEO
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string;
  canonicalUrl: string;
  // OG
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  // Author
  authorName: string;
  authorRole: string;
  isFeatured: boolean;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt?: string;
  updatedAt: string;
  metaTitle: string;
  focusKeyword: string;
  categorySlug: string;
}

const EMPTY_FORM: PostForm = {
  title: "", slug: "", excerpt: "", content: "", thumbnail: "",
  categorySlug: categories[0]?.slug ?? "", tags: "", status: "draft",
  metaTitle: "", metaDescription: "", focusKeyword: "", keywords: "",
  canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "",
  authorName: "In Ly Giá Rẻ", authorRole: "Biên tập viên", isFeatured: false,
};



// ─── SEO Score ────────────────────────────────────────────────────────────────
function calcSeoScore(form: PostForm): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  if (form.metaTitle.length >= 50 && form.metaTitle.length <= 60) score += 20;
  else issues.push(`Meta title nên 50-60 ký tự (hiện tại: ${form.metaTitle.length})`);

  if (form.metaDescription.length >= 150 && form.metaDescription.length <= 160) score += 20;
  else issues.push(`Meta description nên 150-160 ký tự (hiện tại: ${form.metaDescription.length})`);

  if (form.focusKeyword && form.title.toLowerCase().includes(form.focusKeyword.toLowerCase())) score += 15;
  else issues.push("Từ khóa chính chưa có trong tiêu đề");

  if (form.focusKeyword && form.metaDescription.toLowerCase().includes(form.focusKeyword.toLowerCase())) score += 10;
  else issues.push("Từ khóa chính chưa có trong meta description");

  if (form.excerpt.length >= 120 && form.excerpt.length <= 165) score += 15;
  else issues.push(`Mô tả ngắn nên 120-165 ký tự (hiện tại: ${form.excerpt.length})`);

  if (form.thumbnail) score += 10;
  else issues.push("Thiếu ảnh thumbnail");

  if (form.tags.split(",").filter(Boolean).length >= 3) score += 5;
  else issues.push("Nên có ít nhất 3 tags");

  if (form.ogImage) score += 5;
  else issues.push("Thiếu ảnh OG (Open Graph)");

  return { score, issues };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [form, setForm] = useState<PostForm>(EMPTY_FORM);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");
  const [activeSection, setActiveSection] = useState<"content" | "seo" | "og">("content");
  const [slugStatus, setSlugStatus] = useState<"idle" | "ok" | "taken">("idle");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const seo = calcSeoScore(form);

  // ── Auto-generate slug from title ──
  useEffect(() => {
    if (!editingId && form.title) {
      const slug = form.title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
      setForm((f) => ({ ...f, slug }));
    }
  }, [form.title, editingId]);

  // ── Auto-fill SEO from title/excerpt ──
  useEffect(() => {
    if (!editingId) {
      setForm((f) => ({
        ...f,
        metaTitle: f.metaTitle || f.title.slice(0, 60),
        metaDescription: f.metaDescription || f.excerpt.slice(0, 160),
      }));
    }
  }, [form.title, form.excerpt, editingId]);

  // ── Check slug availability ──
  const checkSlug = useCallback(async (slug: string) => {
    if (!slug) return;
    const res = await fetch(`/api/posts/slug-check?slug=${slug}`);
    const data = await res.json();
    setSlugStatus(data.available ? "ok" : "taken");
  }, []);

  useEffect(() => {
    if (form.slug && !editingId) {
      const t = setTimeout(() => checkSlug(form.slug), 400);
      return () => clearTimeout(t);
    }
  }, [form.slug, editingId, checkSlug]);

  // ── Load posts ──
  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/posts?admin=1");
    if (res.ok) setPosts(await res.json());
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      keywords: form.keywords.split(",").map((t) => t.trim()).filter(Boolean),
      author: { name: form.authorName, role: form.authorRole },
    };

    try {
      const url = editingId ? `/api/posts/${form.slug}` : "/api/posts";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Lỗi server");
      }

      setSaveMsg(editingId ? "✓ Đã cập nhật bài viết!" : "✓ Đã tạo bài viết!");
      setForm(EMPTY_FORM);
      setEditingId(null);
      setActiveTab("list");
      loadPosts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Lỗi không xác định";
      setSaveMsg(`✗ ${message}`);
    } finally {
      setSaving(false);
    }
  };

  // ── Edit ──
  const handleEdit = async (slug: string) => {
    const res = await fetch(`/api/posts/${slug}`);
    if (!res.ok) return;
    const post = await res.json();
    setForm({
      title: post.title, slug: post.slug, excerpt: post.excerpt,
      content: post.content, thumbnail: post.thumbnail,
      categorySlug: post.categorySlug, tags: post.tags.join(", "),
      status: post.status, metaTitle: post.metaTitle,
      metaDescription: post.metaDescription, focusKeyword: post.focusKeyword,
      keywords: (post.keywords ?? []).join(", "), canonicalUrl: post.canonicalUrl ?? "",
      ogTitle: post.ogTitle ?? "", ogDescription: post.ogDescription ?? "",
      ogImage: post.ogImage ?? "", authorName: post.author?.name ?? "",
      authorRole: post.author?.role ?? "", isFeatured: post.isFeatured ?? false,
    });
    setEditingId(post.id);
    setSlugStatus("ok");
    setActiveTab("form");
    setActiveSection("content");
    setSaveMsg("");
  };

  // ── Delete ──
  const handleDelete = async (slug: string) => {
    if (!confirm("Xác nhận xoá bài viết này?")) return;
    setDeleting(slug);
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    setDeleting(null);
    loadPosts();
  };

  const F = (key: keyof PostForm, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ── Logout ──
  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f4f2eb] font-body">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a] px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <span className="text-[#f8eb96] font-display font-black text-xl tracking-tight">
            In Ly Giá Rẻ
          </span>
          <span className="text-slate-500 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/tin-tuc" target="_blank"
            className="text-slate-400 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7 1H11V5M11 1L5 7M1 3H4.5V11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Xem blog
          </a>
          <button
            onClick={() => { setActiveTab("form"); setForm(EMPTY_FORM); setEditingId(null); setSaveMsg(""); setSlugStatus("idle"); }}
            className="px-5 py-2 rounded-full bg-[#f8eb96] text-[#1a1a1a] text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
          >
            + Bài viết mới
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-white/10 text-slate-400 text-xs font-medium hover:text-white hover:border-white/30 transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Save message */}
        {saveMsg && (
          <div className={`mb-6 px-5 py-3.5 rounded-xl text-sm font-semibold border ${
            saveMsg.startsWith("✓")
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-100"
          }`}>{saveMsg}</div>
        )}

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          {(["list", "form"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-[#1a1a1a] text-[#f8eb96]"
                  : "bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] shadow-sm"
              }`}>
              {tab === "list" ? `Danh sách (${posts.length})` : (editingId ? "Chỉnh sửa bài viết" : "Tạo bài viết")}
            </button>
          ))}
        </div>

        {/* ── LIST TAB ── */}
        {activeTab === "list" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-[#1a1a1a] tracking-tight">Tất cả bài viết</h2>
              <span className="text-xs text-slate-400">{posts.filter(p=>p.status==="published").length} đã xuất bản · {posts.filter(p=>p.status==="draft").length} bản nháp</span>
            </div>
            {posts.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                Chưa có bài viết nào.
                <button onClick={() => setActiveTab("form")} className="block mx-auto mt-3 text-[#6d8869] font-semibold hover:underline">
                  + Tạo bài viết đầu tiên
                </button>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="text-left px-6 py-3">Tiêu đề</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Chuyên mục</th>
                    <th className="text-left px-4 py-3 hidden lg:table-cell">Từ khóa</th>
                    <th className="text-left px-4 py-3">Trạng thái</th>
                    <th className="text-right px-6 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#1a1a1a] line-clamp-1">{post.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">/{post.slug}</div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs bg-[#f4f2eb] text-[#6d8869] px-3 py-1 rounded-full font-medium">
                          {categories.find(c => c.slug === post.categorySlug)?.name ?? post.categorySlug}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs text-slate-500">{post.focusKeyword}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {post.status === "published" ? "Đã xuất bản" : "Nháp"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/${post.slug}`} target="_blank"
                            className="text-xs text-slate-400 hover:text-[#6d8869] transition-colors px-2 py-1">
                            Xem
                          </a>
                          <button onClick={() => handleEdit(post.slug)}
                            className="text-xs text-[#1a1a1a] hover:text-[#6d8869] font-semibold transition-colors px-2 py-1">
                            Sửa
                          </button>
                          <button onClick={() => handleDelete(post.slug)}
                            disabled={deleting === post.slug}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1">
                            {deleting === post.slug ? "..." : "Xoá"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── FORM TAB ── */}
        {activeTab === "form" && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Main content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Section tabs */}
              <div className="flex gap-2">
                {(["content", "seo", "og"] as const).map((s) => (
                  <button type="button" key={s} onClick={() => setActiveSection(s)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      activeSection === s
                        ? "bg-[#1a1a1a] text-[#f8eb96]"
                        : "bg-white text-slate-500 hover:text-[#1a1a1a] shadow-sm"
                    }`}>
                    {s === "content" ? "Nội dung" : s === "seo" ? "SEO" : "Open Graph"}
                  </button>
                ))}
              </div>

              {/* Content Section */}
              {activeSection === "content" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                  <Field label="Tiêu đề bài viết *" hint="Tên bài, nên chứa từ khóa, 60-80 ký tự">
                    <input value={form.title} onChange={e => F("title", e.target.value)}
                      required placeholder="VD: Top 10 Xu hướng In Ly Nhựa 2026..." className={inputClass} />
                    <CharCount val={form.title} warn={80} />
                  </Field>

                  <Field label="Slug URL *" hint="URL-friendly, tự động tạo từ tiêu đề">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">/</span>
                      <input value={form.slug} onChange={e => { F("slug", e.target.value); setSlugStatus("idle"); }}
                        required placeholder="top-10-xu-huong-in-ly-2026" className={`${inputClass} flex-1`} />
                      {slugStatus === "ok" && <span className="text-green-500 text-xs font-bold whitespace-nowrap">✓ Có thể dùng</span>}
                      {slugStatus === "taken" && <span className="text-red-500 text-xs font-bold whitespace-nowrap">✗ Đã tồn tại</span>}
                    </div>
                  </Field>

                  <Field label="Mô tả ngắn (Excerpt) *" hint="Tóm tắt bài viết, 120-165 ký tự">
                    <textarea value={form.excerpt} onChange={e => F("excerpt", e.target.value)}
                      required rows={3} placeholder="Khám phá những xu hướng in ấn nổi bật..." className={inputClass} />
                    <CharCount val={form.excerpt} min={120} warn={165} />
                  </Field>

                  <Field label="Nội dung bài viết *" hint="Viết bằng HTML hoặc văn bản thường">
                    <textarea value={form.content} onChange={e => F("content", e.target.value)}
                      required rows={16} placeholder="<h2>Giới thiệu</h2><p>Nội dung bài viết...</p>"
                      className={`${inputClass} font-mono text-xs leading-relaxed`} />
                    <div className="text-xs text-slate-400 mt-1">
                      {form.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length} từ · ~{Math.max(1, Math.ceil(form.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 200))} phút đọc
                    </div>
                  </Field>

                  <Field label="Ảnh thumbnail *" hint="URL ảnh đại diện bài viết (JPG/PNG, tỉ lệ 16:9)">
                    <input value={form.thumbnail} onChange={e => F("thumbnail", e.target.value)}
                      placeholder="/images/blog/ten-bai-viet.png" className={inputClass} />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Chuyên mục *">
                      <select value={form.categorySlug} onChange={e => F("categorySlug", e.target.value)} className={inputClass}>
                        {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                      </select>
                    </Field>
                    <Field label="Tags" hint="Phân cách bằng dấu phẩy">
                      <input value={form.tags} onChange={e => F("tags", e.target.value)}
                        placeholder="in ấn, bao bì, thương hiệu" className={inputClass} />
                    </Field>
                  </div>
                </div>
              )}

              {/* SEO Section */}
              {activeSection === "seo" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-[#f4f2eb] rounded-xl">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                      seo.score >= 80 ? "bg-green-500 text-white" : seo.score >= 50 ? "bg-amber-400 text-white" : "bg-red-400 text-white"
                    }`}>
                      {seo.score}
                    </div>
                    <div>
                      <div className="font-bold text-[#1a1a1a] text-sm">Điểm SEO: {seo.score}/100</div>
                      <div className="text-xs text-slate-500">{seo.score >= 80 ? "🟢 Tốt" : seo.score >= 50 ? "🟡 Trung bình" : "🔴 Cần cải thiện"}</div>
                    </div>
                  </div>

                  {seo.issues.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                      {seo.issues.map((issue, i) => <li key={i} className="flex items-start gap-1.5"><span>•</span>{issue}</li>)}
                    </ul>
                  )}

                  <Field label="Từ khóa chính (Focus Keyword) *" hint="Từ khóa quan trọng nhất bài viết nhắm đến">
                    <input value={form.focusKeyword} onChange={e => F("focusKeyword", e.target.value)}
                      required placeholder="VD: in ly nhựa giá rẻ" className={inputClass} />
                  </Field>

                  <Field label="Từ khóa phụ" hint="Phân cách bằng dấu phẩy, tối đa 5-8 từ">
                    <input value={form.keywords} onChange={e => F("keywords", e.target.value)}
                      placeholder="in ấn bao bì, ly nhựa tùy chỉnh, in CMYK" className={inputClass} />
                  </Field>

                  <Field label="Meta Title *" hint="Tiêu đề hiển thị trên Google, 50-60 ký tự">
                    <input value={form.metaTitle} onChange={e => F("metaTitle", e.target.value)}
                      required placeholder="In Ly Nhựa Giá Rẻ | In Ly Giá Rẻ" className={inputClass} />
                    <CharCount val={form.metaTitle} min={50} warn={60} />
                  </Field>

                  <Field label="Meta Description *" hint="Mô tả xuất hiện dưới tiêu đề Google, 150-160 ký tự">
                    <textarea value={form.metaDescription} onChange={e => F("metaDescription", e.target.value)}
                      required rows={3} placeholder="Dịch vụ in ly nhựa giá rẻ, chất lượng cao..." className={inputClass} />
                    <CharCount val={form.metaDescription} min={150} warn={160} />
                  </Field>

                  <Field label="Canonical URL" hint="Để trống nếu không cần override">
                    <input value={form.canonicalUrl} onChange={e => F("canonicalUrl", e.target.value)}
                      placeholder="https://inlygiaRe.vn/slug-bai-viet" className={inputClass} />
                  </Field>

                  {/* SERP Preview */}
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Xem trước Google SERP</div>
                    <div className="text-xs text-green-700 mb-0.5">inlygiaRe.vn › blog › {form.slug || "slug-bai-viet"}</div>
                    <div className="text-[#1a77d9] text-base font-medium hover:underline cursor-default line-clamp-1">
                      {form.metaTitle || "Meta Title của bài viết"}
                    </div>
                    <div className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                      {form.metaDescription || "Meta description sẽ xuất hiện ở đây..."}
                    </div>
                  </div>
                </div>
              )}

              {/* OG Section */}
              {activeSection === "og" && (
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
                  <p className="text-xs text-slate-500 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                    Open Graph dùng khi chia sẻ lên Facebook, Zalo, Messenger. Để trống sẽ dùng giá trị từ Meta.
                  </p>
                  <Field label="OG Title" hint="Tiêu đề khi chia sẻ mạng xã hội">
                    <input value={form.ogTitle} onChange={e => F("ogTitle", e.target.value)}
                      placeholder={form.metaTitle || "Tiêu đề Open Graph"} className={inputClass} />
                  </Field>
                  <Field label="OG Description">
                    <textarea value={form.ogDescription} onChange={e => F("ogDescription", e.target.value)}
                      rows={2} placeholder={form.metaDescription || "Mô tả Open Graph"} className={inputClass} />
                  </Field>
                  <Field label="OG Image URL" hint="Ảnh khi share: kích thước 1200×630px, JPG/PNG">
                    <input value={form.ogImage} onChange={e => F("ogImage", e.target.value)}
                      placeholder={form.thumbnail || "https://inlygiaRe.vn/og-image.jpg"} className={inputClass} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Tên tác giả">
                      <input value={form.authorName} onChange={e => F("authorName", e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Chức vụ">
                      <input value={form.authorRole} onChange={e => F("authorRole", e.target.value)} className={inputClass} />
                    </Field>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Settings sidebar */}
            <div className="space-y-5">
              {/* Publish */}
              <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Xuất bản</h3>
                <Field label="Trạng thái">
                  <select value={form.status} onChange={e => F("status", e.target.value as "draft" | "published")} className={inputClass}>
                    <option value="draft">📝 Bản nháp</option>
                    <option value="published">🟢 Xuất bản</option>
                  </select>
                </Field>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isFeatured}
                    onChange={e => F("isFeatured", e.target.checked)}
                    className="w-4 h-4 rounded accent-[#6d8869]" />
                  <span className="text-sm font-medium text-[#1a1a1a]">Bài viết nổi bật</span>
                </label>
                <div className="pt-3 flex flex-col gap-2">
                  <button type="submit" disabled={saving || (slugStatus === "taken" && !editingId)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all ${
                      saving || (slugStatus === "taken" && !editingId)
                        ? "bg-slate-200 text-slate-400"
                        : "bg-[#1a1a1a] text-[#f8eb96] hover:bg-[#6d8869] active:scale-[0.98]"
                    }`}>
                    {saving ? "Đang lưu..." : editingId ? "Cập nhật bài viết" : "Tạo bài viết"}
                  </button>
                  <button type="button" onClick={() => { setActiveTab("list"); setSaveMsg(""); setForm(EMPTY_FORM); setEditingId(null); }}
                    className="w-full py-3 rounded-xl text-slate-500 text-sm hover:bg-slate-100 transition-colors">
                    Huỷ
                  </button>
                </div>
              </div>

              {/* SEO Quick Summary */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Checklist SEO</h3>
                <div className="space-y-2">
                  {[
                    { label: "Meta title 50-60 ký tự", ok: form.metaTitle.length >= 50 && form.metaTitle.length <= 60 },
                    { label: "Meta desc 150-160 ký tự", ok: form.metaDescription.length >= 150 && form.metaDescription.length <= 160 },
                    { label: "Từ khóa trong tiêu đề", ok: !!form.focusKeyword && form.title.toLowerCase().includes(form.focusKeyword.toLowerCase()) },
                    { label: "Từ khóa trong meta desc", ok: !!form.focusKeyword && form.metaDescription.toLowerCase().includes(form.focusKeyword.toLowerCase()) },
                    { label: "Có ảnh thumbnail", ok: !!form.thumbnail },
                    { label: "Có ảnh OG", ok: !!form.ogImage },
                    { label: "Có ít nhất 3 tags", ok: form.tags.split(",").filter(Boolean).length >= 3 },
                  ].map(({ label, ok }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${ok ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                        {ok ? "✓" : "○"}
                      </span>
                      <span className={`text-xs ${ok ? "text-slate-700" : "text-slate-400"}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-[#f4f2eb] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6d8869]/30 focus:border-[#6d8869] transition-all";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-[2px] text-slate-500">
        {label}
      </label>
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
      {children}
    </div>
  );
}

function CharCount({ val, min, warn }: { val: string; min?: number; warn: number }) {
  const len = val.length;
  const color = min ? (len >= min && len <= warn ? "text-green-600" : len > warn ? "text-red-500" : "text-slate-400") : (len <= warn ? "text-slate-400" : "text-red-500");
  return <div className={`text-xs mt-1 ${color}`}>{len} ký tự{min ? ` (tối ưu: ${min}–${warn})` : ` (tối đa: ${warn})`}</div>;
}
