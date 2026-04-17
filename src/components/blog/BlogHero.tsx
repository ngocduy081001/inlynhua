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
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-36 md:pb-24 px-6 md:px-12 bg-[#f4f2eb]">
      
      {/* Container limit */}
      <div className="relative max-w-[1200px] mx-auto z-10 w-full">
        
        {/* Top Content Grid: Title Left, Desc Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-20 mb-16">
          
          <div className="lg:max-w-2xl flex flex-col">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
              <Link href="/" className="hover:text-[#6d8869] transition-colors">
                Trang chủ
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-[#6d8869]">Tin tức</span>
            </nav>

            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Tin tức & Góc chia sẻ
            </p>
            <h1 className="font-display font-light italic text-6xl md:text-7xl xl:text-8xl text-[#1a1a1a] tracking-wide leading-[1.2]">
              {title}
            </h1>
          </div>

          <div className="lg:max-w-sm lg:pb-4">
            <p className="border-l-2 border-[#6d8869]/30 pl-5 py-1 text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
          
        </div>

        {/* Centered Full-Width Search Bar */}
        <div className="w-full flex justify-center mt-4">
          <div className="relative flex items-center bg-white rounded-full px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-4xl hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
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

      </div>
    </section>
  );
};

export default BlogHero;
