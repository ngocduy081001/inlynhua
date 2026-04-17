import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryCard } from "@/components/blog/CategoryCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  blogPosts,
  categories,
  getFeaturedPosts,
} from "@/data/blogData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inlygiaRe.vn";

export const metadata: Metadata = {
  title: "Tin Tức In Ấn | Kiến Thức In Ly Nhựa, Bao Bì Thương Hiệu",
  description:
    "Cập nhật xu hướng in ấn, kiến thức thiết kế bao bì, case study thực tế. Hướng dẫn chọn in ly nhựa đúng chất lượng, đúng giá cho quán trà sữa, cà phê.",
  keywords: [
    "tin tức in ấn",
    "kiến thức in ly nhựa",
    "xu hướng bao bì 2026",
    "thiết kế 3D bao bì",
    "in ly trà sữa",
    "case study in ấn",
  ],
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Tin Tức In Ấn | In Ly Giá Rẻ",
    description: "Xu hướng in ấn, kiến thức bao bì, case study thực tế từ đội ngũ In Ly Giá Rẻ.",
    url: `${siteUrl}/blog`,
    siteName: "In Ly Giá Rẻ",
    type: "website",
    images: [{ url: `${siteUrl}/images/blog/packaging-trends.png`, width: 1200, height: 630, alt: "Tin tức in ấn" }],
  },
};

// JSON-LD Blog schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog In Ly Giá Rẻ",
  description: "Tin tức, kiến thức và xu hướng ngành in ấn bao bì",
  url: `${siteUrl}/blog`,
  publisher: {
    "@type": "Organization",
    name: "In Ly Giá Rẻ",
    logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
  },
};


export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = blogPosts.filter((p) => !p.isFeatured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#f4f2eb]">
        {/* ─── Hero Banner with Image ─── */}
        <section className="relative pt-24 md:pt-28">
          {/* Hero Image */}
          <div className="relative h-[320px] md:h-[420px] overflow-hidden">
            <Image
              src="/images/blog/packaging-trends.png"
              alt="Tin tức In Ly Nhựa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f4f2eb] via-[#f4f2eb]/60 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-10 md:pb-14">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <nav className="flex items-center gap-2.5 text-[15px] md:text-base font-medium mb-3">
                      <Link href="/" className="text-[#647b93] hover:text-[#6d8869] transition-colors">
                        Trang chủ
                      </Link>
                      <span className="text-[#647b93] font-light">/</span>
                      <span className="text-[#6d8869]">Tin tức</span>
                    </nav>
                    <p className="text-sm md:text-[15px] text-[#6d8869] font-bold tracking-[0.15em] uppercase mb-1">
                      Tin tức & Góc chia sẻ
                    </p>
                    <h1 className="font-display font-light italic text-6xl md:text-8xl lg:text-[110px] text-[#1a1a1a] tracking-wider leading-none">
                      Tin tức
                    </h1>
                  </div>
                  <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed max-w-sm">
                    Cập nhật xu hướng, chia sẻ kiến thức và khám phá công nghệ in ấn mới nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-8 relative z-10 flex justify-center">
            <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-4xl hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-300">
              <i className="fa-solid fa-search text-slate-400 mr-4 text-base" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-transparent text-[#1a1a1a] placeholder:text-slate-400 outline-none text-base"
              />
              <button className="ml-3 px-8 py-3 bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f4f2eb] text-sm font-bold rounded-full transition-colors tracking-widest uppercase whitespace-nowrap">
                Tìm
              </button>
            </div>
          </div>
        </section>

        {/* ─── Featured Posts ─── */}
        <section className="px-6 md:px-12 pt-14 pb-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <i className="fa-solid fa-star text-[#f8eb96] text-xs" />
              </div>
              <p className="text-sm text-[#1a1a1a] font-bold tracking-widest uppercase">
                Nổi bật
              </p>
              <div className="flex-1 h-px bg-slate-300 ml-3" />
            </div>
            <div className="space-y-6">
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Categories Section ─── */}
        <section className="px-6 md:px-12 py-16 bg-white/50">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs text-[#6d8869] font-bold tracking-widest uppercase mb-3">
                  Chuyên mục
                </p>
                <h2 className="font-display font-light italic text-3xl md:text-4xl text-[#1a1a1a] tracking-wide">
                  Khám phá theo chủ đề
                </h2>
              </div>
              <span className="hidden md:inline text-sm text-slate-400 font-medium bg-white px-4 py-2 rounded-full shadow-sm">
                {categories.length} chuyên mục
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Latest Posts + Sidebar ─── */}
        <section className="px-6 md:px-12 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-full bg-[#6d8869] flex items-center justify-center">
                <i className="fa-solid fa-clock text-white text-xs" />
              </div>
              <div>
                <p className="text-sm text-[#1a1a1a] font-bold tracking-widest uppercase">
                  Mới nhất
                </p>
              </div>
              <div className="flex-1 h-px bg-slate-300 ml-3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posts Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button className="w-10 h-10 rounded-full bg-[#1a1a1a] text-[#f8eb96] font-bold text-sm flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] font-medium text-sm flex items-center justify-center transition-all shadow-sm">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] font-medium text-sm flex items-center justify-center transition-all shadow-sm">
                    3
                  </button>
                  <span className="text-slate-400 mx-1">...</span>
                  <button className="w-10 h-10 rounded-full bg-white text-slate-500 hover:bg-[#1a1a1a] hover:text-[#f8eb96] flex items-center justify-center transition-all shadow-sm">
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
