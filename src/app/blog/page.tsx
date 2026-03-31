import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryCard } from "@/components/blog/CategoryCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import Image from "next/image";
import Link from "next/link";
import {
  blogPosts,
  categories,
  getFeaturedPosts,
} from "@/data/blogData";

export const metadata = {
  title: "Tin tức | In Ly Nhựa Giá Rẻ",
  description:
    "Cập nhật xu hướng in ấn, thiết kế 3D, công nghệ VR và kiến thức thương hiệu mới nhất.",
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = blogPosts.filter((p) => !p.isFeatured);

  return (
    <>
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
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Link href="/" className="hover:text-[#6d8869] transition-colors">
                    Trang chủ
                  </Link>
                  <span className="text-slate-400">/</span>
                  <span className="text-[#6d8869] font-medium">Tin tức</span>
                </nav>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <p className="text-xs text-[#6d8869] font-bold tracking-widest uppercase mb-3">
                      Tin tức & Góc chia sẻ
                    </p>
                    <h1 className="font-display font-light italic text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] tracking-wide leading-[1.15]">
                      Tin tức
                    </h1>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm border-l-2 border-slate-300 pl-4">
                    Cập nhật xu hướng, chia sẻ kiến thức và khám phá công nghệ in ấn mới nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 -mt-6 relative z-10">
            <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-md max-w-lg">
              <i className="fa-solid fa-search text-slate-400 mr-3 text-sm" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-transparent text-[#1a1a1a] placeholder:text-slate-400 outline-none text-sm"
              />
              <button className="ml-3 px-5 py-2 bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f4f2eb] text-xs font-bold rounded-full transition-colors tracking-wider uppercase whitespace-nowrap">
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
