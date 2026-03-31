import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, formatDate } from "@/data/blogData";

/* stitch-component: FeaturedPost */
interface FeaturedPostProps {
  readonly post: BlogPost;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-[400px] overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent md:hidden" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-[#1a1a1a] text-[#f8eb96] text-xs font-bold rounded-full flex items-center gap-1.5 tracking-wider uppercase">
              <i className="fa-solid fa-star text-[10px]" />
              Nổi bật
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          {/* Category chip */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f4f2eb] text-[#6d8869] w-fit mb-4 tracking-wider uppercase">
            <i className={`${post.category.icon} text-[10px]`} />
            {post.category.name}
          </span>

          <h2 className="text-2xl md:text-3xl font-display font-black text-[#1a1a1a] mb-4 group-hover:text-[#6d8869] transition-colors leading-tight tracking-tight">
            {post.title}
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={36}
              height={36}
              unoptimized
              className="rounded-full ring-2 ring-[#f4f2eb]"
            />
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">
                {post.author.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPost;
