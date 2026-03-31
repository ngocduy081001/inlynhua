import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, formatDate } from "@/data/blogData";

/* stitch-component: PostCard */
interface PostCardProps {
  readonly post: BlogPost;
  readonly variant?: "default" | "horizontal";
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = "default",
}) => {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex gap-4 p-3 rounded-xl hover:bg-[#f4f2eb] transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-24 md:w-28 md:h-20 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[11px] font-bold text-[#6d8869] uppercase tracking-wider mb-1">
            {post.category.name}
          </span>
          <h3 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#6d8869] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <span className="text-xs text-slate-400 mt-1.5">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl md:rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 md:h-52 overflow-hidden">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Read time badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/80 backdrop-blur-sm text-[#1a1a1a] text-[11px] font-bold rounded-full flex items-center gap-1">
            <i className="fa-regular fa-clock text-[9px]" />
            {post.readTime} phút
          </span>
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1a1a1a] text-[#f8eb96] tracking-wider uppercase">
            <i className={`${post.category.icon} text-[9px]`} />
            {post.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-display font-black text-[#1a1a1a] mb-2.5 group-hover:text-[#6d8869] transition-colors leading-snug line-clamp-2 tracking-tight">
          {post.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-5">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={28}
              height={28}
              unoptimized
              className="rounded-full ring-1 ring-[#f4f2eb]"
            />
            <span className="text-xs font-bold text-[#1a1a1a]">
              {post.author.name}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
