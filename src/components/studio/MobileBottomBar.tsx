"use client";

import React from "react";
import { productSpecs, studioText } from "@/data/mockData";
import { useStudioState } from "@/hooks/useStudioState";

interface MobileBottomBarProps {
  state: ReturnType<typeof useStudioState>;
  onAddToCart: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ state, onAddToCart }) => {
  const { activeTool, handleToolSelect } = state;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#1a1a1a]/10 bg-white/95 backdrop-blur-md z-50">
      {/* Tool quick bar */}
      <div className="flex border-b border-[#1a1a1a]/6 px-2 py-1.5 gap-1 overflow-x-auto">
        {[
          { type: "select" as const,  icon: "arrow_selector_tool", label: "Chọn" },
          { type: "text" as const,    icon: "title",                label: "Text" },
          { type: "logo" as const,    icon: "upload_file",          label: "Logo" },
          { type: "color" as const,   icon: "palette",              label: "Màu" },
          { type: "layers" as const,  icon: "layers",               label: "Lớp" },
        ].map(t => (
          <button
            key={t.type}
            onClick={() => handleToolSelect(t.type)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-[10px] font-bold transition-all ${
              activeTool === t.type ? "bg-[#1a1a1a] text-[#f8eb96]" : "text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex gap-3 p-3">
        <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl h-13 bg-[#f4f2eb] text-slate-500 text-sm font-bold border border-[#1a1a1a]/8 py-3">
          <span className="material-symbols-outlined text-[#6d8869] text-lg">tune</span>
          <span className="text-xs font-bold text-[#1a1a1a]">Tuỳ chỉnh</span>
        </button>
        <button
          onClick={onAddToCart}
          className="flex-[3] flex items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f8eb96] font-bold transition-all active:scale-95 py-3"
        >
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          <span className="text-sm tracking-wide">
            {productSpecs.price} {productSpecs.currency} · {studioText.addToCartLabel.replace("THÊM VÀO ", "")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
