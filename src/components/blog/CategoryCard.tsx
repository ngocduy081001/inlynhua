import React from "react";
import Link from "next/link";
import { Category } from "@/data/blogData";

interface CategoryCardProps {
  readonly category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/tin-tuc/chuyen-muc/${category.slug}`}
      className="group relative flex flex-col items-start p-8 bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
    >
      {/* Icon Box */}
      <div className="w-14 h-14 rounded-full bg-[#f4f2eb] flex items-center justify-center mb-8 text-[#6d8869] group-hover:bg-[#1a1a1a] group-hover:text-[#f8eb96] transition-colors duration-300">
        <i className={`${category.icon} text-xl`} />
      </div>

      <h3 className="font-display text-xl font-black text-[#1a1a1a] mb-3 tracking-tight group-hover:text-[#6d8869] transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow font-medium">
        {category.description}
      </p>

      {/* Footer */}
      <div className="w-full flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-xs font-bold text-[#6d8869] tracking-widest uppercase">
          {String(category.postCount).padStart(2, "0")} bài viết
        </span>
        <span className="text-sm font-bold text-slate-400 group-hover:text-[#1a1a1a] transition-colors group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
