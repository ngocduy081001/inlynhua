"use client";
import React from "react";
import Image from "next/image";
import { productImages } from "@/data/mockData";

export default function Theme4() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] relative overflow-hidden flex items-center justify-center p-6 font-body">
      
      {/* Huge Smooth Blobs */}
      <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[20%] right-[0%] w-[40vw] h-[40vw] bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[150px] opacity-50 animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Massive Glass Container */}
      <div className="relative w-full max-w-7xl min-h-[70vh] rounded-[3rem] bg-white/20 backdrop-blur-2xl border border-white/60 shadow-[0_20px_80px_rgba(31,38,135,0.07)] overflow-hidden flex flex-col md:flex-row p-12 lg:p-20 z-10 gap-16">
        
        {/* Glass reflection line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <div className="flex-1 flex flex-col justify-center">
          <div className="px-6 py-2 rounded-full border border-white/50 bg-white/30 backdrop-blur-md w-fit text-xs font-bold uppercase tracking-widest text-[#2f3542] mb-8 shadow-sm">
            Kính Mờ (Glassmorphism)
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-semibold text-[#1e272e] leading-[1.1] mb-8 tracking-tight">
            Nghệ thuật của <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Sự Trong Trẻo.</span>
          </h1>

          <p className="text-xl text-slate-700/80 mb-12 max-w-lg font-medium leading-relaxed">
            Bo tròn tối đa, bóng mờ khuếch tán diện rộng và nền kính (Glass effect). Một bản phối hợp giữa sự sặc sỡ và thanh lịch.
          </p>

          <div className="flex gap-4">
            <button className="px-8 py-4 rounded-full bg-white/80 backdrop-blur shadow-[0_10px_30px_rgba(255,255,255,0.8)] border border-white text-slate-800 font-bold hover:bg-white hover:scale-105 transition-all duration-300">
               Theme Số 04
            </button>
            <button className="px-8 py-4 rounded-full bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-white font-bold hover:bg-slate-800 hover:scale-105 transition-all duration-300">
               Liên hệ In
            </button>
          </div>
        </div>

        {/* Product side */}
        <div className="flex-1 flex items-center justify-center relative">
          
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white/30 backdrop-blur-3xl rounded-full border border-white/50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center group pointer-events-none">
             
             {/* Small glass orbs */}
             <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/40 backdrop-blur-lg rounded-full border border-white/60 shadow-xl" />
             <div className="absolute -bottom-10 -right-4 w-32 h-32 bg-white/40 backdrop-blur-lg rounded-full border border-white/60 shadow-xl" />

             <Image
               src={productImages.nhuaNapCau}
               alt="Product"
               width={350}
               height={350}
               className="object-contain filter drop-shadow-[0_40px_40px_rgba(0,0,0,0.2)]"
             />
          </div>

        </div>

      </div>
    </main>
  );
}
