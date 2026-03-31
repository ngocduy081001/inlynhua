"use client";
import React from "react";
import Image from "next/image";
import { productImages } from "@/data/mockData";

export default function Theme3() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-body relative overflow-hidden flex flex-col justify-center p-6 lg:p-24 selection:bg-rose-200">
      
      {/* Minimal grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative z-10 items-center">
        
        {/* Abstract Minimal Text */}
        <div className="flex-1">
          <div className="w-16 h-1 bg-slate-900 mb-10 rounded-full" />
          
          <h1 className="text-6xl md:text-[5.5rem] font-display font-semibold leading-[0.95] tracking-[-0.04em] mb-12">
            Tinh giản. <br />
            Tuyệt đối.
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-slate-500 mb-14 max-w-lg leading-relaxed">
            Hơi hướng thiết kế Thụy Sĩ. Sử dụng khoảng trắng cỡ lớn (White Space) kèm đổ bóng sâu một chiều cực nhạt để mọi chi tiết tự nhiên bồng bềnh.
          </p>

          <div className="group inline-flex items-center gap-6 cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.4)] text-white group-hover:scale-110 group-hover:bg-rose-600 transition-all duration-300">
              <i className="fa-solid fa-play ml-1" />
            </div>
            <span className="text-lg font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
              Giao diện #03
            </span>
          </div>
        </div>

        {/* Minimal Floating Elements */}
        <div className="flex-1 relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
          
          {/* Main big squircle map/card */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[500px] h-[500px] bg-slate-50 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center overflow-hidden">
             
             {/* Geometric accent */}
             <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-slate-200 rounded-full blur-[60px]" />
             
             <Image
                src={productImages.nhuaNapCau}
                alt="Product"
                width={350}
                height={350}
                className="object-contain relative z-10 hover:scale-110 transition-transform duration-1000"
              />
          </div>

          {/* Floating Widget */}
          <div className="absolute -left-10 bottom-20 bg-white rounded-3xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100/50 flex flex-col gap-4 animate-float hover:scale-105 transition-transform z-20">
             <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-xl shadow-inner">
               <i className="fa-regular fa-star" />
             </div>
             <div className="text-sm font-bold text-slate-800">100% Nguyên Sinh</div>
             <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
               <div className="w-full h-full bg-rose-500 rounded-full" />
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}
