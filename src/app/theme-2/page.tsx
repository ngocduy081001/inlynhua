"use client";
import React from "react";
import Image from "next/image";
import { productImages } from "@/data/mockData";

export default function Theme2() {
  return (
    <main className="min-h-screen bg-[#e0e5ec] flex flex-col justify-center items-center py-20 px-6 font-body text-slate-700">
      
      {/* Neumorphism Wrapper */}
      <div className="w-full max-w-6xl rounded-[3rem] p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20"
           style={{
             boxShadow: "20px 20px 60px #bec3c9, -20px -20px 60px #ffffff"
           }}>
        
        {/* Text Content */}
        <div className="flex flex-col justify-center gap-8">
          <div className="self-start px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs text-blue-500"
               style={{
                 boxShadow: "inset 5px 5px 10px #bec3c9, inset -5px -5px 10px #ffffff"
               }}>
            Chủ đề 02
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-medium text-slate-800 leading-tight">
            Soft UI <br/> (Neumorphism)
          </h1>
          
          <p className="text-lg text-slate-500 max-w-md">
            Những thành phần tệp vào nền hệt như được đúc nổi từ cùng một chất liệu. Đổ bóng đôi đối lập tạo rãnh sâu và cảm giác chạm tinh tế.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-6">
            <button className="px-10 py-4 rounded-full text-blue-600 font-bold tracking-wide transition-all active:shadow-[inset_5px_5px_10px_#bec3c9,inset_-5px_-5px_10px_#ffffff]"
                    style={{
                      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)"
                    }}>
              Đặt hàng
            </button>

             <button className="px-10 py-4 rounded-full text-slate-600 font-bold tracking-wide transition-all active:scale-[0.98]"
                    style={{
                      boxShadow: "inset 5px 5px 10px #bec3c9, inset -5px -5px 10px #ffffff"
                    }}>
              Xem trước
            </button>
          </div>
        </div>
        
        {/* Neumorphic Image Circle */}
        <div className="flex justify-center items-center relative py-12">
          {/* Big Outer Soft Circle */}
          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full flex justify-center items-center"
               style={{
                 boxShadow: "20px 20px 60px #bec3c9, -20px -20px 60px #ffffff"
               }}>
             {/* Inner Extruded Circle */}
             <div className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full"
                  style={{
                    boxShadow: "inset 10px 10px 20px #bec3c9, inset -10px -10px 20px #ffffff"
                  }}>
             </div>
          </div>
          
          {/* The Product floating above the soft UI */}
          <Image
            src={productImages.petKimCuong}
            alt="Product"
            width={400}
            height={400}
            className="absolute z-10 drop-shadow-[0_40px_30px_rgba(0,0,0,0.15)] hover:-translate-y-5 hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
        </div>

      </div>
    </main>
  );
}
