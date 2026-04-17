/**
 * /[slug] — Trang chi tiết bài viết (URL không có tiền tố /blog/)
 * SEO: generateMetadata, JSON-LD Article schema, canonical, OG tags
 */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { getCategoryBySlug, formatDate, blogPosts } from "@/data/blogData";

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const dynamicPosts = getPublishedPosts();
  const staticSlugs = blogPosts.map((p) => ({ slug: p.slug }));
  const dynamicSlugs = dynamicPosts.map((p) => ({ slug: p.slug }));
  return [...staticSlugs, ...dynamicSlugs];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const dynPost = getPostBySlug(slug);
  const staticPost = blogPosts.find((p) => p.slug === slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";
  const canonicalUrl = `${siteUrl}/${slug}`;

  if (dynPost) {
    return {
      title: dynPost.metaTitle,
      description: dynPost.metaDescription,
      keywords: [dynPost.focusKeyword, ...dynPost.keywords],
      alternates: { canonical: dynPost.canonicalUrl ?? canonicalUrl },
      authors: [{ name: dynPost.author.name }],
      openGraph: {
        title: dynPost.ogTitle ?? dynPost.metaTitle,
        description: dynPost.ogDescription ?? dynPost.metaDescription,
        url: canonicalUrl,
        siteName: "In Ly Giá Rẻ",
        images: [{ url: dynPost.ogImage ?? dynPost.thumbnail, width: 1200, height: 630, alt: dynPost.title }],
        type: "article",
        publishedTime: dynPost.publishedAt,
        modifiedTime: dynPost.updatedAt,
        authors: [dynPost.author.name],
        tags: dynPost.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: dynPost.ogTitle ?? dynPost.metaTitle,
        description: dynPost.ogDescription ?? dynPost.metaDescription,
        images: [dynPost.ogImage ?? dynPost.thumbnail],
      },
    };
  }

  if (staticPost) {
    const title = `${staticPost.title} | In Ly Giá Rẻ`;
    return {
      title,
      description: staticPost.excerpt,
      keywords: [...staticPost.tags],
      alternates: { canonical: canonicalUrl },
      authors: [{ name: staticPost.author.name }],
      openGraph: {
        title,
        description: staticPost.excerpt,
        url: canonicalUrl,
        siteName: "In Ly Giá Rẻ",
        images: [{ url: staticPost.thumbnail, width: 1200, height: 630, alt: staticPost.title }],
        type: "article",
        publishedTime: staticPost.publishedAt,
        authors: [staticPost.author.name],
        tags: [...staticPost.tags],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: staticPost.excerpt,
        images: [staticPost.thumbnail],
      },
    };
  }

  return { title: "Không tìm thấy bài viết | In Ly Giá Rẻ" };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
function ArticleSchema({
  post,
  siteUrl,
  slug,
}: {
  post: {
    title: string;
    excerpt: string;
    thumbnail: string;
    publishedAt?: string;
    updatedAt?: string;
    author: { name: string; role?: string };
    tags: readonly string[] | string[];
  };
  siteUrl: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail.startsWith("http") ? post.thumbnail : `${siteUrl}${post.thumbnail}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "In Ly Giá Rẻ",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/${slug}` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";

  const dynPost = getPostBySlug(slug);
  const staticPost = blogPosts.find((p) => p.slug === slug);

  if (!dynPost && !staticPost) notFound();

  const post = dynPost
    ? {
        title: dynPost.title,
        slug: dynPost.slug,
        excerpt: dynPost.excerpt,
        content: dynPost.content,
        thumbnail: dynPost.thumbnail,
        publishedAt: dynPost.publishedAt,
        updatedAt: dynPost.updatedAt,
        tags: dynPost.tags,
        author: dynPost.author,
        readTime: dynPost.readTime,
        isFeatured: dynPost.isFeatured,
        category: getCategoryBySlug(dynPost.categorySlug) ?? {
          name: dynPost.categorySlug,
          slug: dynPost.categorySlug,
        },
      }
    : {
        title: staticPost!.title,
        slug: staticPost!.slug,
        excerpt: staticPost!.excerpt,
        content: staticPost!.content ?? staticPost!.excerpt,
        thumbnail: staticPost!.thumbnail,
        publishedAt: staticPost!.publishedAt,
        updatedAt: staticPost!.publishedAt,
        tags: [...staticPost!.tags],
        author: staticPost!.author,
        readTime: staticPost!.readTime,
        isFeatured: staticPost!.isFeatured,
        category: staticPost!.category,
      };

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category.slug === post.category.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <ArticleSchema post={post} siteUrl={siteUrl} slug={slug} />

      <main className="min-h-screen bg-[#f4f2eb]">
        {/* ─── Hero Image ─── */}
        <div className="relative pt-20 h-[420px] md:h-[560px] overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12 w-full">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm mb-4">
                <Link href="/" className="text-white/50 hover:text-white transition-colors">Trang chủ</Link>
                <span className="text-white/30">/</span>
                <Link href="/tin-tuc" className="text-white/50 hover:text-white transition-colors">Tin tức</Link>
                <span className="text-white/30">/</span>
                <Link
                  href={`/tin-tuc/chuyen-muc/${post.category.slug}`}
                  className="text-[#f8eb96] hover:text-white transition-colors"
                >
                  {post.category.name}
                </Link>
              </nav>

              <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#6d8869] flex items-center justify-center text-[10px] font-bold text-white">
                    {post.author.name.charAt(0)}
                  </div>
                  <span className="text-white/80">{post.author.name}</span>
                </span>
                {post.publishedAt && (
                  <span>{formatDate(post.publishedAt)}</span>
                )}
                <span>{post.readTime} phút đọc</span>
                {post.isFeatured && (
                  <span className="px-3 py-1 bg-[#f8eb96] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Nổi bật
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Content Area ─── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Body */}
            <article className="lg:col-span-2">
              <blockquote className="border-l-4 border-[#6d8869] pl-5 py-2 mb-10 text-slate-600 italic text-lg leading-relaxed bg-white/60 pr-5 rounded-r-xl">
                {post.excerpt}
              </blockquote>

              <div
                className="prose prose-slate max-w-none
                  prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#1a1a1a]
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base
                  prose-a:text-[#6d8869] prose-a:underline hover:prose-a:text-[#1a1a1a]
                  prose-strong:text-[#1a1a1a] prose-strong:font-bold
                  prose-ul:text-slate-600 prose-li:marker:text-[#6d8869]
                  prose-blockquote:border-[#6d8869] prose-blockquote:bg-[#f4f2eb] prose-blockquote:rounded-r-xl
                  prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] hover:border-[#1a1a1a] transition-all cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#6d8869] flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#1a1a1a]">{post.author.name}</div>
                  {post.author.role && (
                    <div className="text-xs text-[#6d8869] font-semibold uppercase tracking-wider mt-0.5">
                      {post.author.role}
                    </div>
                  )}
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Đội ngũ chuyên gia tại In Ly Giá Rẻ — mang đến giải pháp in ấn chất lượng cao, giá tốt nhất thị trường.
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Chuyên mục</p>
                <Link
                  href={`/tin-tuc/chuyen-muc/${post.category.slug}`}
                  className="flex items-center gap-2 text-[#6d8869] font-semibold hover:underline"
                >
                  <span className="w-2 h-2 rounded-full bg-[#6d8869]" />
                  {post.category.name}
                </Link>
              </div>

              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6d8869] mb-3">In Ly Giá Rẻ</p>
                <h3 className="font-display font-black text-xl leading-tight mb-3">
                  Cần tư vấn <span className="text-[#f8eb96]">báo giá?</span>
                </h3>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  Đội ngũ sẽ phản hồi trong 2 giờ làm việc.
                </p>
                <Link
                  href="/#pricing"
                  className="block w-full text-center py-3 rounded-full bg-[#f8eb96] text-[#1a1a1a] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Xem bảng giá
                </Link>
              </div>

              {related.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Bài viết liên quan</p>
                  <div className="space-y-4">
                    {related.map((rp) => (
                      <Link key={rp.id} href={`/${rp.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 relative">
                          <Image
                            src={rp.thumbnail}
                            alt={rp.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#6d8869] transition-colors line-clamp-2 leading-tight">
                            {rp.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">{rp.readTime} phút đọc</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
