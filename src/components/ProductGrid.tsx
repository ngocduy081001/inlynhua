"use client";

import React, { useState } from "react";
import Image from "next/image";
import { products } from "@/data/mockData";
import Link from "next/link";

export const ProductGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 8);

  return (
    <section id="products" className="bg-[#f4f2eb] relative z-20">

      {/* Seamless transition area — breathing space between hero and products */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-20 pb-16">

        {/* Section intro — editorial style matching hero's italic light tone */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 mb-20">

          {/* Left: Heading that continues the hero narrative */}
          <div className="lg:max-w-lg">
            <p className="text-sm text-[#6d8869] font-bold tracking-widest uppercase mb-4">
              Mẫu đã in
            </p>
            <h2 className="font-display font-light italic text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-wide leading-[1.2] mb-6">
              Khách hàng<br />
              đã tin dùng
            </h2>
          </div>

          {/* Right: Description + CTA — like hero's description style */}
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 font-medium leading-relaxed mb-8">
              Đa dạng size từ 360ml đến 700ml. Mỗi mẫu là một câu chuyện thương hiệu — từ logo tối giản đến hoạ tiết full-wrap.
            </p>
            <Link
              href="/#products"
              className="group flex items-center gap-4 px-8 py-4 rounded-full bg-[#1a1a1a] w-fit text-[#f4f2eb] font-bold text-sm tracking-widest uppercase hover:bg-[#6d8869] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Báo giá ngay</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedProducts.map((product, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 flex flex-col hover:-translate-y-3 transition-all duration-500 overflow-hidden relative shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="relative w-full aspect-square mb-4 md:mb-6 flex items-center justify-center p-2 md:p-4 bg-transparent">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-xl mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                />
              </div>

              <div className="flex items-end justify-between mt-auto pt-1 md:pt-2 relative z-20 gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm md:text-lg lg:text-xl font-black text-[#1a1a1a] mb-1 uppercase tracking-tight leading-tight truncate">
                    {product.name}
                  </h3>
                  <p className="text-[11px] md:text-xs font-medium text-slate-400">
                    {product.specs}
                  </p>
                </div>
                
                <button className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#f4f2eb] flex items-center justify-center text-[#1a1a1a] font-bold group-hover:bg-[#1a1a1a] group-hover:text-[#f8eb96] transition-colors shrink-0 text-base md:text-lg">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {products.length > 8 && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-3 px-10 py-4 rounded-full border-2 border-slate-300 text-[#1a1a1a] font-bold text-sm tracking-widest uppercase hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f2eb] transition-all duration-300"
            >
              <span>{showAll ? "Thu gọn" : `Xem thêm ${products.length - 8} mẫu nữa`}</span>
              <span className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}>↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
