"use client";
import React, { useState, useMemo } from "react";
import cupData from "@/data/cup_prices.json";

type Cup = (typeof cupData)[number];

export function CupPriceTable() {
  const [material, setMaterial] = useState("ALL");
  const [sizeGroup, setSizeGroup] = useState("ALL");
  const [search, setSearch] = useState("");

  const materials = ["ALL", "PP", "PET", "PAPER"];
  const materialLabels: Record<string, string> = { ALL: "Tất cả", PP: "Ly PP", PET: "Ly PET", PAPER: "Ly Giấy" };

  const sizeGroups = useMemo(() => {
    const groups = new Set(cupData.map((c: Cup) => c.size_group).filter(Boolean));
    return ["ALL", ...Array.from(groups).sort()];
  }, []);

  const filtered = useMemo(() => {
    return (cupData as Cup[]).filter((c) => {
      if (material !== "ALL" && c.material !== material) return false;
      if (sizeGroup !== "ALL" && c.size_group !== sizeGroup) return false;
      if (search) {
        const s = search.toLowerCase();
        return c.code.toLowerCase().includes(s) || c.name.toLowerCase().includes(s);
      }
      return true;
    });
  }, [material, sizeGroup, search]);

  return (
    <div className="mb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-display font-light italic text-[#1a1a1a]">
          Bảng Giá <span className="text-[#6d8869] font-bold">Ly Nhựa</span>
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Dữ liệu cập nhật từ nhà cung cấp Uy Kiệt — {cupData.length} sản phẩm
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Material chips */}
        <div className="flex gap-2 flex-wrap">
          {materials.map((m) => (
            <button
              key={m}
              onClick={() => setMaterial(m)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${material === m ? "bg-[#1a1a1a] text-[#f8eb96]" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"}`}
            >
              {materialLabels[m] || m}
            </button>
          ))}
        </div>

        {/* Size group */}
        <select
          value={sizeGroup}
          onChange={(e) => setSizeGroup(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white text-slate-700"
        >
          <option value="ALL">Tất cả phi</option>
          {sizeGroups.filter((s) => s !== "ALL").map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Tìm mã ly hoặc tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white flex-1 min-w-[200px]"
        />

        <span className="px-4 py-2 text-sm text-slate-400 font-medium self-center">
          {filtered.length} kết quả
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-auto max-h-[70vh]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#1a1a1a] text-white">
                <th className="p-4 text-xs font-bold tracking-widest uppercase">Mã Ly</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase">Tên Sản Phẩm</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-center">Chất liệu</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-center">Dung tích</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-center">ĐVT</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-center">SL/đơn vị</th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-right">
                  <span className="text-[#f8eb96]">Giá sỉ</span>
                  <br /><span className="text-[10px] text-slate-400 font-normal">≥15 thùng</span>
                </th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-right">
                  Giá lẻ
                  <br /><span className="text-[10px] text-slate-400 font-normal">&lt;15 thùng</span>
                </th>
                <th className="p-4 text-xs font-bold tracking-widest uppercase text-right">
                  <span className="text-[#f8eb96]">Đơn giá/ly</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cup, i) => (
                <tr key={`${cup.code}-${i}`} className="hover:bg-[#f4f2eb]/50 transition-colors">
                  <td className="p-4 text-xs font-mono font-bold text-[#6d8869]">{cup.code}</td>
                  <td className="p-4 text-sm text-slate-700">{cup.name}</td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${cup.material === "PP" ? "bg-blue-50 text-blue-600" : cup.material === "PET" ? "bg-purple-50 text-purple-600" : "bg-amber-50 text-amber-700"}`}>
                      {cup.material}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-center font-medium text-slate-600">
                    {cup.volume_ml ? `${cup.volume_ml}ml` : "—"}
                  </td>
                  <td className="p-4 text-xs text-center text-slate-500">{cup.unit}</td>
                  <td className="p-4 text-sm text-center text-slate-600">{cup.quantity_per_unit.toLocaleString("vi-VN")}</td>
                  <td className="p-4 text-sm text-right font-bold text-[#6d8869]">
                    {cup.price_high.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="p-4 text-sm text-right text-slate-600">
                    {cup.price_low.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-black text-[#1a1a1a]">{cup.price_per_unit_high.toLocaleString("vi-VN")}đ</span>
                    <span className="text-[10px] text-slate-400 ml-1">/ly</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
