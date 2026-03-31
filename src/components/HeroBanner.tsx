"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { productImages } from "@/data/mockData";

export const HeroBanner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#f4f2eb] overflow-hidden pt-20 pb-0">

      {/* Background Diagonal Yellow Band */}
      <div className="absolute top-[30%] left-[-10%] w-[120%] h-[400px] bg-[#f8eb96] -rotate-12 z-0 opacity-80" />

      {/* Subtle grainy texture (optional but adds to the editorial feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col pt-10 pb-32">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">

          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-4 flex flex-col items-start relative z-20">

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-display font-light italic text-[#1a1a1a] tracking-widest leading-[1.2] mb-4 uppercase py-4"
            >
              In Ly <br />
              Giá Rẻ
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm border-l-2 border-slate-300 pl-4 py-1 text-slate-500 max-w-[280px] font-medium leading-relaxed mb-8"
            >
              In theo yêu cầu chỉ từ 1.000 ly
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="group flex items-center gap-4 px-8 py-4 rounded-full bg-[#1a1a1a] text-[#f4f2eb] font-bold text-sm tracking-widest uppercase hover:bg-[#6d8869] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Đặt ngay <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>



          </div>

          {/* CENTER/RIGHT PRODUCT DISPLAY area */}
          <div className="lg:col-span-8 relative h-[600px] lg:h-[700px] flex items-center justify-center w-full z-10 mt-16 lg:mt-0">

            {/* Decorative text upper right - like reference */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute top-0 right-0 lg:right-10 text-right font-display font-bold text-[#b4ac8f] text-lg lg:text-2xl tracking-tight leading-snug z-0"
            >
              Từ Ý Tưởng<br />
              Đến Tay Khách
            </motion.div>



            {/* The Product Images - Dynamic Overlapping Layout like Relea */}
            <div className="relative w-full h-full flex items-center justify-center z-10">

              {/* Product 1 - Milk Tea Cup (Behind, angled left) */}
              <motion.div
                initial={{ opacity: 0, y: 80, rotate: -25 }}
                animate={{ opacity: 1, y: 0, rotate: -15 }}
                transition={{ duration: 1, delay: 0.9, type: "spring", bounce: 0.3 }}
                className="absolute left-[5%] lg:left-[10%] top-[10%] lg:top-[5%] z-10 drop-shadow-2xl"
              >
                <Image
                  src="/images/custom-hero-standard.png"
                  alt="Ly trà sữa"
                  width={350}
                  height={350}
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Product 2 - Matcha Cup (Front, prominent, slightly tilted right) */}
              <motion.div
                initial={{ opacity: 0, y: 100, rotate: 15 }}
                animate={{ opacity: 1, y: 0, rotate: 5 }}
                transition={{ duration: 1, delay: 1.1, type: "spring", bounce: 0.3 }}
                className="absolute right-[5%] lg:right-[10%] top-[15%] lg:top-[10%] z-20 drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)]"
              >
                <Image
                  src="/images/custom-hero-premium.png"
                  alt="Ly matcha cao cấp"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </motion.div>

            </div>

            {/* Contact CTA - phone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring", bounce: 0.4 }}
              className="absolute bottom-14 lg:bottom-20 right-0 lg:right-4 z-30"
            >
              <a
                href="tel:0396505693"
                className="flex items-center gap-3 bg-[#1a1a1a] px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6d8869] transition-all duration-300 group"
              >
                <span className="w-10 h-10 rounded-full bg-[#f8eb96] flex items-center justify-center text-[#1a1a1a] group-hover:bg-white transition-colors">
                  <i className="fa-solid fa-phone text-sm" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hotline</span>
                  <span className="font-display font-black text-white text-lg tracking-tight">0396 505 693</span>
                </div>
              </a>
            </motion.div>

          </div>
        </div>

        {/* MASSIVE BOTTOM TEXT OVERLAP - like "VACUUM CUP" in reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.7, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 w-full text-center z-40 pointer-events-none"
        >
          <h2 className="text-[10vw] lg:text-[10vw] font-display font-black text-[#1a1a1a] opacity-[0.08] leading-none tracking-tighter uppercase select-none whitespace-nowrap py-6">
            IN LY GIÁ RẺ
          </h2>
        </motion.div>

      </div>
    </section>
  );
};
