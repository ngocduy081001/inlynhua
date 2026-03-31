import React from "react";
import Link from "next/link";

/* stitch-component: BlogHero */
interface BlogHeroProps {
  readonly title?: string;
  readonly subtitle?: string;
}

export const BlogHero: React.FC<BlogHeroProps> = ({
  title = "Tin tức",
  subtitle = "Cập nhật xu hướng, chia sẻ kiến thức và khám phá công nghệ in ấn mới nhất.",
}) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-20 px-6 md:px-12 bg-[#f4f2eb]">

      <div className="relative max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-[#6d8869] transition-colors">
            Trang chủ
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#6d8869] font-medium">Blog</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
          <div className="lg:max-w-2xl">
            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Blog
            </p>
            <h1 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2] mb-6">
              {title}
            </h1>
          </div>

          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* Search bar */}
            <div className="relative flex items-center bg-white rounded-full px-5 py-3 shadow-sm">
              <i className="fa-solid fa-search text-slate-400 mr-3 text-sm" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-transparent text-[#1a1a1a] placeholder:text-slate-400 outline-none text-sm"
              />
              <button className="ml-3 px-5 py-2 bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f4f2eb] text-xs font-bold rounded-full transition-colors tracking-wider uppercase">
                Tìm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
