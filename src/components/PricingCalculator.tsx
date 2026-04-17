"use client";
import React, { useState, useMemo } from "react";

export function PricingCalculator() {
  const [cupType, setCupType] = useState("PP");
  const [volume, setVolume] = useState("500");
  const [quantity, setQuantity] = useState("5000");

  const types = [
    { id: "PP", name: "Ly Nhựa PP (Ép Màng)" },
    { id: "PET", name: "Ly Nhựa PET (Cứng, Sang)" },
    { id: "PAPER", name: "Ly Giấy Kraft" }
  ];

  const volumes = [
    { id: "360", name: "360ml" },
    { id: "500", name: "500ml" },
    { id: "700", name: "700ml" }
  ];

  const quantities = [
    { id: "1000", name: "1.000 Ly" },
    { id: "3000", name: "3.000 Ly" },
    { id: "5000", name: "5.000 Ly" },
    { id: "10000", name: "10.000+ Ly" }
  ];

  // ===================================================================
  // GIÁ LY TỪ PDF UY KIỆT (đồng / ly)
  // Giá thùng ÷ 1.000 cái
  // VD: PP 500ml = 506.000đ/thùng ÷ 1.000 = 506đ/ly
  // ===================================================================
  const cupCostPerUnit = {
    PP:    { "360": 413, "500": 506, "700": 618 },
    PET:   { "360": 518, "500": 571, "700": 739 },
    PAPER: { "360": 760, "500": 870, "700": 970 },
  };

  // ===================================================================
  // GIÁ IN ẤN TỪ TRANG CHỦ (đồng / ly)
  // Khởi Nghiệp: 120đ | Vận Hành: 110đ | Chuyên Nghiệp: 100đ
  // ===================================================================
  const printCostPerUnit = {
    "1000":  150,
    "3000":  130,
    "5000":  110,
    "10000": 90, // Đại lý / Liên hệ
  };

  const { unitPrice, totalPrice, cupCost, printCost } = useMemo(() => {
    // 1. Giá vỏ ly (từ PDF Uy Kiệt)
    const typeMap = cupCostPerUnit[cupType as keyof typeof cupCostPerUnit];
    const cup = typeMap?.[volume as keyof typeof typeMap] || 506;

    // 2. Giá in ấn (từ bảng giá trang chủ)
    const print = printCostPerUnit[quantity as keyof typeof printCostPerUnit] || 150;

    // 3. Tổng đơn giá = ly + in
    const unit = cup + print;
    const qtyNum = parseInt(quantity, 10);

    return {
      unitPrice: unit,
      totalPrice: unit * qtyNum,
      cupCost: cup,
      printCost: print,
    };
  }, [cupType, volume, quantity]);

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 max-w-4xl mx-auto mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8eb96] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-display font-light italic text-[#1a1a1a]">
            Dự Toán <span className="text-[#6d8869] font-bold">Chi Phí</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Chọn loại ly, dung tích và số lượng để xem giá ưu đãi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Loại Ly */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. Chất Liệu Ly</label>
            <div className="flex flex-col gap-2">
              {types.map(t => (
                <button
                  key={t.id}
                  onClick={() => setCupType(t.id)}
                  className={`p-3 text-left rounded-xl border transition-all text-sm font-medium ${cupType === t.id ? 'border-[#6d8869] bg-[#6d8869]/10 text-[#6d8869]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dung Tích */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. Dung Tích</label>
            <div className="flex flex-col gap-2">
              {volumes.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVolume(v.id)}
                  className={`p-3 text-left rounded-xl border transition-all text-sm font-medium ${volume === v.id ? 'border-[#6d8869] bg-[#6d8869]/10 text-[#6d8869]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Số Lượng */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">3. Số Lượng Cần Mua</label>
            <div className="flex flex-col gap-2">
              {quantities.map(q => (
                <button
                  key={q.id}
                  onClick={() => setQuantity(q.id)}
                  className={`p-3 flex justify-between items-center rounded-xl border transition-all text-sm font-medium ${quantity === q.id ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#f8eb96]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  {q.name}
                  {parseInt(q.id) >= 5000 && <span className={`text-[10px] px-2 py-0.5 rounded-md ml-2 ${quantity === q.id ? 'bg-[#f8eb96]/20 text-[#f8eb96]' : 'bg-red-100 text-red-600'}`}>Giảm giá!</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kết quả */}
        <div className="bg-[#f4f2eb] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200">
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Đơn Giá</span>
            <div className="text-3xl font-display font-black text-[#1a1a1a]">
              {unitPrice.toLocaleString('vi-VN')} <span className="text-lg text-slate-500 font-medium">đ / ly</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              Vỏ ly: {cupCost.toLocaleString('vi-VN')}đ + In ấn: {printCost.toLocaleString('vi-VN')}đ
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-slate-300"></div>

          <div className="text-right w-full md:w-auto">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:text-right">Tổng Hoá Đơn</span>
            <div className="text-4xl md:text-5xl font-display font-black text-[#6d8869]">
              {totalPrice.toLocaleString('vi-VN')} <span className="text-xl text-slate-500 font-medium">đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
