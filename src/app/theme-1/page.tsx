"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { productImages } from "@/data/mockData";

export default function Theme1() {
  return (
    <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6 md:p-12 font-body selection:bg-blue-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-7xl bg-white rounded-[40px] shadow-[0_30px_60px_rgba(20,30,40,0.06)] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16"
      >
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Bản Thể Tối Giản số 01
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-medium text-slate-900 leading-[1.1] tracking-tight">
            Nổi Bật Nhờ <br />
            <span className="text-slate-400">Sự Đơn Giản.</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-md leading-relaxed font-medium">
            Phong cách Floating Island. Mọi thành phần được đặt trên một khối màu trắng tinh khôi bo tròn khổng lồ, tách biệt hoàn toàn với nền tảng qua đổ bóng siêu mềm.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(15,23,42,0.3)] transition-all duration-300">
              Khám phá ngay
            </button>
            <button className="px-8 py-4 rounded-full bg-slate-50 text-slate-800 font-semibold hover:bg-slate-100 transition-all duration-300">
              Chi tiết
            </button>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="flex-1 w-full relative aspect-square max-w-[500px]">
          <div className="absolute inset-0 bg-blue-50/50 rounded-[40px] transform rotate-3" />
          <div className="absolute inset-0 bg-indigo-50/50 rounded-[40px] transform -rotate-3" />
          
          <div className="absolute inset-0 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 flex items-center justify-center p-12">
            <Image
              src={productImages.petKimCuong || "https://images.unsplash.com/photo-1544371994-1a3b1d3ef974"}
              alt="Ly mẫu"
              width={400}
              height={400}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
