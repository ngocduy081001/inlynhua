"use client";
import React, { useState, useMemo } from "react";
import cupData from "@/data/cup_prices.json";

type Cup = (typeof cupData)[number];

export function PricingCalculator() {
  const [material, setMaterial] = useState("PP");
  const [selectedCode, setSelectedCode] = useState("");
  const [quantity, setQuantity] = useState("5000");

  const materials = [
    { id: "PP", name: "Ly Nhựa PP" },
    { id: "PET", name: "Ly Nhựa PET" },
    { id: "PAPER", name: "Ly Giấy" },
  ];

  const quantities = [
    { id: "1000", name: "1.000 Ly", print: 150 },
    { id: "3000", name: "3.000 Ly", print: 130 },
    { id: "5000", name: "5.000 Ly", print: 110 },
    { id: "10000", name: "10.000+ Ly", print: 90 },
  ];

  // Filter cups by selected material
  const cupsByMaterial = useMemo(() => {
    return (cupData as Cup[]).filter((c) => c.material === material);
  }, [material]);

  // Group by volume for easier browsing
  const cupOptions = useMemo(() => {
    const unique = new Map<string, Cup>();
    cupsByMaterial.forEach((c) => {
      // Pick the standard/cheapest variant per volume
      const key = `${c.volume_ml}`;
      if (!unique.has(key) || (c.price_per_unit_high < (unique.get(key)?.price_per_unit_high || Infinity))) {
        unique.set(key, c);
      }
    });
    return Array.from(unique.values()).sort((a, b) => (a.volume_ml || 0) - (b.volume_ml || 0));
  }, [cupsByMaterial]);

  // When material changes, auto-select first cup
  const selectedCup = useMemo(() => {
    if (selectedCode) {
      const found = (cupData as Cup[]).find((c) => c.code === selectedCode);
      if (found) return found;
    }
    return cupOptions[0] || null;
  }, [selectedCode, cupOptions]);

  // Reset selection when material changes
  const handleMaterialChange = (m: string) => {
    setMaterial(m);
    setSelectedCode("");
  };

  // Pricing calculation
  const { unitPrice, totalPrice, cupCost, printCost } = useMemo(() => {
    if (!selectedCup) return { unitPrice: 0, totalPrice: 0, cupCost: 0, printCost: 0 };

    const cup = selectedCup.price_per_unit_high; // giá sỉ / ly
    const print = quantities.find((q) => q.id === quantity)?.print || 150;
    const unit = cup + print;
    const qtyNum = parseInt(quantity, 10);

    return { unitPrice: unit, totalPrice: unit * qtyNum, cupCost: cup, printCost: print };
  }, [selectedCup, quantity]);

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 max-w-5xl mx-auto mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f8eb96] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-display font-light italic text-[#1a1a1a]">
            Dự Toán <span className="text-[#6d8869] font-bold">Chi Phí</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm">Chọn loại ly từ bảng giá thực tế và số lượng để xem dự toán</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* 1. Chất Liệu */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. Chất Liệu</label>
            <div className="flex flex-col gap-2">
              {materials.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleMaterialChange(t.id)}
                  className={`p-3 text-left rounded-xl border transition-all text-sm font-medium ${material === t.id ? "border-[#6d8869] bg-[#6d8869]/10 text-[#6d8869]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Chọn Ly */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. Chọn Ly Cụ Thể</label>
            <select
              value={selectedCup?.code || ""}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium bg-white text-slate-700 mb-3"
            >
              {cupsByMaterial.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} — {c.price_per_unit_high.toLocaleString("vi-VN")}đ/ly
                </option>
              ))}
            </select>

            {selectedCup && (
              <div className="bg-[#f4f2eb] rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Mã ly:</span>
                  <span className="font-mono font-bold text-[#6d8869]">{selectedCup.code}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Dung tích:</span>
                  <span className="font-bold">{selectedCup.volume_ml ? `${selectedCup.volume_ml}ml` : "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Kích thước:</span>
                  <span className="font-bold">{selectedCup.size_group || "—"}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Giá vỏ ly:</span>
                  <span className="font-black text-[#1a1a1a]">{selectedCup.price_per_unit_high.toLocaleString("vi-VN")}đ/ly</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Số Lượng */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">3. Số Lượng & Gói In</label>
            <div className="flex flex-col gap-2">
              {quantities.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQuantity(q.id)}
                  className={`p-3 flex justify-between items-center rounded-xl border transition-all text-sm font-medium ${quantity === q.id ? "border-[#1a1a1a] bg-[#1a1a1a] text-[#f8eb96]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  <span>{q.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${quantity === q.id ? "bg-[#f8eb96]/20 text-[#f8eb96]" : "bg-slate-100 text-slate-500"}`}>
                    In: {q.print}đ/ly
                  </span>
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
              {unitPrice.toLocaleString("vi-VN")} <span className="text-lg text-slate-500 font-medium">đ / ly</span>
            </div>
            <div className="text-xs text-slate-500 mt-2 font-medium">
              Vỏ ly: {cupCost.toLocaleString("vi-VN")}đ + In ấn: {printCost.toLocaleString("vi-VN")}đ
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-slate-300"></div>

          <div className="text-right w-full md:w-auto">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 md:text-right">Tổng Hoá Đơn</span>
            <div className="text-4xl md:text-5xl font-display font-black text-[#6d8869]">
              {totalPrice.toLocaleString("vi-VN")} <span className="text-xl text-slate-500 font-medium">đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
