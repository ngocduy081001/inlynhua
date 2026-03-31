"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { productImages } from "@/data/mockData";

export default function Theme5() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-6 md:p-12 overflow-hidden font-body selection:bg-rose-500 selection:text-white">
      {/* Deep Dark Theme variant */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-[#0F172A] to-[#0F172A]" />
      <div className="absolute inset-0 bg-grid-slate/[0.05]" />

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left: Product in dark squircle */}
        <div className="flex-1 w-full flex justify-center">
          <div className="relative w-full max-w-md aspect-[3/4] bg-[#1E293B] rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-slate-700/50 flex items-center justify-center group overflow-hidden">
             {/* Ambient light for dark object */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/10 to-indigo-500/20" />
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />

             <Image
                src={productImages.petKimCuong}
                alt="Product Dark Theme"
                width={400}
                height={400}
                className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-90 group-hover:scale-110 group-hover:drop-shadow-[0_30px_60px_rgba(244,63,94,0.3)] transition-all duration-700"
              />

              {/* Tag */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-xs font-bold tracking-widest text-slate-300 z-20">
                #05 DARK MINIMAL
              </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 space-y-10">
           
           <h1 className="text-6xl md:text-8xl font-display font-semibold tracking-[-0.05em] leading-[0.9]">
             Đen tối. <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Sang trọng.</span>
           </h1>

           <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
             Giao diện nền tối (Dark mode) kết hợp bo tròn sâu góc độ 3rem. Bóng râm tán xạ rộng và quầng sáng (glow) để tạo chiều sâu thay vì dùng viền trắng vuông góc mảng miếng.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button className="px-10 py-5 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300">
               Kích hoạt
             </button>
             <button className="px-10 py-5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all duration-300">
               Khám phá
             </button>
           </div>

           {/* Stats minimal */}
           <div className="flex gap-12 pt-8 border-t border-slate-800/80">
             <div>
                <div className="text-3xl font-display font-semibold text-white mb-2">99%</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Hoàn hảo</div>
             </div>
             <div>
                <div className="text-3xl font-display font-semibold text-white mb-2">05</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Chủ đề</div>
             </div>
           </div>

        </div>

      </div>
    </main>
  );
}
