"use client";

import React from "react";
import { pantoneColors, quantityOptions, productSpecs, studioText } from "@/data/mockData";
import { useStudioState } from "@/hooks/useStudioState";

interface PropertiesPanelProps {
  state: ReturnType<typeof useStudioState>;
  onAddToCart: () => void;
}

const BG_PRESETS = [
  { label: "Trong suốt", value: "transparent", cls: "bg-white border-2 border-dashed border-slate-200" },
  { label: "Trắng", value: "#ffffff", cls: "bg-white border border-slate-200" },
  { label: "Đen", value: "#1a1a1a", cls: "bg-[#1a1a1a]" },
  { label: "Kem", value: "#f4f2eb", cls: "bg-[#f4f2eb] border border-slate-200" },
  { label: "Xanh Sage", value: "#6d8869", cls: "bg-[#6d8869]" },
  { label: "Vàng", value: "#f8eb96", cls: "bg-[#f8eb96] border border-slate-200" },
  { label: "Xanh dương", value: "#3b82f6", cls: "bg-blue-500" },
  { label: "Đỏ", value: "#ef4444", cls: "bg-red-500" },
];

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ state, onAddToCart }) => {
  const {
    selectedElement, activeTool, background, quantity,
    setBackground, setQuantity,
    updateElement, deleteElement, setSelectedId,
  } = state;

  return (
    <aside className="hidden md:flex w-80 border-l border-[#1a1a1a]/8 flex-col shrink-0 bg-white z-20 overflow-y-auto">

      {/* ── Element properties (when selected) */}
      {selectedElement ? (
        <div className="p-5 border-b border-[#1a1a1a]/6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {selectedElement.type === "text" ? "Chỉnh sửa văn bản" : "Chỉnh sửa hình ảnh"}
            </h3>
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
              title="Xoá phần tử"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Text content */}
            {selectedElement.type === "text" && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Nội dung</label>
                <textarea
                  value={selectedElement.content}
                  onChange={e => updateElement(selectedElement.id, { content: e.target.value })}
                  onBlur={() => updateElement(selectedElement.id, {}, true)}
                  rows={2}
                  className="w-full bg-[#f4f2eb] border border-[#1a1a1a]/10 rounded-xl px-3 py-2 text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#6d8869]/30 focus:border-[#6d8869] outline-none resize-none"
                />
              </div>
            )}

            {/* Text color */}
            {selectedElement.type === "text" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Màu chữ</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedElement.color}
                      onChange={e => updateElement(selectedElement.id, { color: e.target.value }, true)}
                      className="w-8 h-8 rounded-lg border border-[#1a1a1a]/10 cursor-pointer"
                    />
                    <span className="text-xs text-slate-400 font-mono">{selectedElement.color}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Cỡ chữ</label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateElement(selectedElement.id, { fontSize: Math.max(8, selectedElement.fontSize - 2) }, true)}
                      className="w-7 h-7 rounded-lg bg-[#f4f2eb] flex items-center justify-center text-sm hover:bg-[#1a1a1a] hover:text-white transition-all"
                    >-</button>
                    <span className="flex-1 text-center text-sm font-bold">{selectedElement.fontSize}px</span>
                    <button
                      onClick={() => updateElement(selectedElement.id, { fontSize: Math.min(72, selectedElement.fontSize + 2) }, true)}
                      className="w-7 h-7 rounded-lg bg-[#f4f2eb] flex items-center justify-center text-sm hover:bg-[#1a1a1a] hover:text-white transition-all"
                    >+</button>
                  </div>
                </div>
              </div>
            )}

            {/* Font weight */}
            {selectedElement.type === "text" && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Độ đậm</label>
                <div className="flex gap-2">
                  {["400", "600", "700", "900"].map(w => (
                    <button
                      key={w}
                      onClick={() => updateElement(selectedElement.id, { fontWeight: w }, true)}
                      style={{ fontWeight: w }}
                      className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${
                        selectedElement.fontWeight === w
                          ? "bg-[#1a1a1a] text-[#f8eb96]"
                          : "bg-[#f4f2eb] text-slate-500 hover:bg-[#1a1a1a]/5"
                      }`}
                    >
                      {w === "400" ? "Thường" : w === "600" ? "Vừa" : w === "700" ? "Đậm" : "Rất đậm"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Opacity */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Độ mờ: {Math.round(selectedElement.opacity * 100)}%
              </label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={selectedElement.opacity}
                onChange={e => updateElement(selectedElement.id, { opacity: Number(e.target.value) })}
                onMouseUp={() => updateElement(selectedElement.id, {}, true)}
                className="w-full accent-[#6d8869] cursor-pointer"
              />
            </div>

            {/* Rotation */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Xoay: {selectedElement.rotation}°
              </label>
              <input
                type="range"
                min={-180}
                max={180}
                step={5}
                value={selectedElement.rotation}
                onChange={e => updateElement(selectedElement.id, { rotation: Number(e.target.value) })}
                onMouseUp={() => updateElement(selectedElement.id, {}, true)}
                className="w-full accent-[#6d8869] cursor-pointer"
              />
            </div>

            <button
              onClick={() => setSelectedId(null)}
              className="w-full py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-[#f4f2eb] transition-colors"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      ) : (
        /* ── Background color (when color tool or no selection) */
        <div className="p-5 border-b border-[#1a1a1a]/6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            {activeTool === "color" ? "Màu nền canvas" : "Thông số kỹ thuật"}
          </h3>

          {activeTool === "color" ? (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {BG_PRESETS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setBackground(p.value)}
                    title={p.label}
                    className={`w-full aspect-square rounded-xl transition-all hover:scale-110 ${p.cls} ${
                      background === p.value ? "ring-2 ring-[#6d8869] ring-offset-2" : ""
                    }`}
                  />
                ))}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Màu tuỳ chỉnh</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={background === "transparent" ? "#ffffff" : background}
                    onChange={e => setBackground(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-[#1a1a1a]/10 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 font-mono">{background}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Kích thước</span>
                <span className="text-[#1a1a1a] font-semibold px-3 py-1 bg-[#f4f2eb] rounded-lg text-xs">
                  {productSpecs.size}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Chất liệu</span>
                <span className="text-[#1a1a1a] font-semibold text-xs">{productSpecs.material}</span>
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-slate-400">Số lượng đặt hàng</label>
                <select
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full bg-[#f4f2eb] border border-[#1a1a1a]/10 rounded-xl text-sm text-[#1a1a1a] focus:ring-2 focus:ring-[#6d8869]/30 focus:border-[#6d8869] py-2.5 px-3 appearance-none cursor-pointer hover:border-[#6d8869]/40 transition-all outline-none font-medium"
                >
                  {quantityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── VR Preview */}
      <div className="p-5 flex-1">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
          {studioText.vrPreviewTitle}
        </h3>
        <div className="aspect-video bg-[#f4f2eb] rounded-2xl overflow-hidden border border-[#1a1a1a]/8 relative group cursor-pointer hover:border-[#6d8869]/30 transition-colors shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6d8869]/8 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#6d8869]">play_circle</span>
            </div>
          </div>
          <div className="absolute bottom-2 left-3 text-[9px] text-[#6d8869]/60 font-mono">
            {productSpecs.vrRenderVersion}
          </div>
        </div>

        {/* Pantone Colors */}
        <div className="mt-6 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {studioText.pantoneTitle}
          </div>
          <div className="flex gap-2 flex-wrap">
            {pantoneColors.map((c, idx) => (
              <button
                key={idx}
                title={c.label}
                onClick={() => {
                  if (selectedElement?.type === "text") {
                    const colorMap: Record<string, string> = {
                      "bg-[#1a1a1a]": "#1a1a1a",
                      "bg-[#6d8869]": "#6d8869",
                      "bg-[#f8eb96]": "#f8eb96",
                      "bg-white border border-slate-200": "#ffffff",
                      "bg-[#f4f2eb] border border-slate-200": "#f4f2eb",
                    };
                    const hex = colorMap[c.tailwindClass] ?? "#1a1a1a";
                    updateElement(selectedElement.id, { color: hex }, true);
                  }
                }}
                className={`size-8 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-[#6d8869]/50 shadow-sm ${c.tailwindClass}`}
              />
            ))}
            <button className="size-8 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 hover:text-[#6d8869] hover:border-[#6d8869] cursor-pointer transition-all">
              <span className="material-symbols-outlined text-[14px]">add</span>
            </button>
          </div>
          {selectedElement?.type === "text" && (
            <p className="text-[10px] text-slate-400">Click màu để áp dụng cho văn bản đang chọn</p>
          )}
        </div>
      </div>

      {/* ── Pricing + CTA */}
      <div className="p-5 border-t border-[#1a1a1a]/8 bg-white sticky bottom-0">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              {studioText.subtotalLabel}
            </span>
            <span className="text-2xl font-black text-[#1a1a1a] tracking-tight">
              {productSpecs.price}
              <span className="text-sm font-normal text-slate-400 ml-1">{productSpecs.currency}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-[#6d8869] uppercase tracking-widest">
              {productSpecs.shippingLabel}
            </span>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f8eb96] font-bold py-4 rounded-full transition-all active:scale-95 text-sm tracking-widest uppercase"
        >
          <span className="material-symbols-outlined text-xl">shopping_cart</span>
          <span>{studioText.addToCartLabel}</span>
        </button>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
