import React from "react";
import Link from "next/link";
import { categories, blogPosts } from "@/data/blogData";
import { PostCard } from "@/components/blog/PostCard";

/* stitch-component: BlogSidebar */
export const BlogSidebar: React.FC = () => {
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <aside className="space-y-8">
      {/* Categories Widget */}
      <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1a1a1a] mb-5 flex items-center gap-2 tracking-widest uppercase">
          <i className="fa-solid fa-folder text-[#6d8869] text-xs" />
          Chuyên mục
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/chuyen-muc/${cat.slug}`}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#f4f2eb] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f4f2eb] group-hover:bg-[#1a1a1a] group-hover:text-[#f8eb96] text-[#6d8869] flex items-center justify-center transition-colors">
                  <i className={`${cat.icon} text-[11px]`} />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-[#1a1a1a] transition-colors font-medium">
                  {cat.name}
                </span>
              </div>
              <span className="text-xs text-slate-400 bg-[#f4f2eb] px-2 py-0.5 rounded-full font-bold">
                {cat.postCount}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1a1a1a] mb-5 flex items-center gap-2 tracking-widest uppercase">
          <i className="fa-solid fa-clock-rotate-left text-[#6d8869] text-xs" />
          Gần đây
        </h3>
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Tags Widget */}
      <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1a1a1a] mb-5 flex items-center gap-2 tracking-widest uppercase">
          <i className="fa-solid fa-tags text-[#6d8869] text-xs" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "in ấn",
            "3D",
            "VR",
            "thiết kế",
            "bao bì",
            "thương hiệu",
            "bền vững",
            "UV",
            "render",
            "công nghệ",
            "ly nhựa",
            "case study",
          ].map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-[#f4f2eb] hover:bg-[#1a1a1a] hover:text-[#f8eb96] rounded-full transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Widget */}
      <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden p-8 bg-[#1a1a1a]">
        <div className="relative text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#f8eb96] flex items-center justify-center mb-5">
            <i className="fa-solid fa-cube text-[#1a1a1a] text-xl" />
          </div>
          <h4 className="font-display font-light italic text-xl text-[#f4f2eb] mb-3 tracking-wide">
            Bắt đầu thiết kế
          </h4>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed font-medium">
            Trải nghiệm công cụ thiết kế 3D miễn phí ngay hôm nay.
          </p>
          <Link
            href="/studio"
            className="inline-block px-8 py-3 bg-[#f8eb96] text-[#1a1a1a] text-sm font-bold rounded-full tracking-widest uppercase hover:bg-white transition-all duration-300"
          >
            Thử miễn phí
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
