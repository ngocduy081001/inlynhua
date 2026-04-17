"use client";

import React, { useRef } from "react";
import { studioText } from "@/data/mockData";
import { useStudioState } from "@/hooks/useStudioState";
import type { ToolType } from "@/hooks/useStudioState";

interface ToolsSidebarProps {
  state: ReturnType<typeof useStudioState>;
}

const TOOLS: { type: ToolType; icon: string; label: string }[] = [
  { type: "select",  icon: "arrow_selector_tool", label: "Chọn / Di chuyển" },
  { type: "text",    icon: "title",                label: "Thêm văn bản" },
  { type: "logo",    icon: "upload_file",          label: "Tải lên Logo" },
  { type: "image",   icon: "category",             label: "Hình ảnh" },
  { type: "color",   icon: "palette",              label: "Màu nền" },
  { type: "layers",  icon: "layers",               label: "Quản lý lớp" },
];

export const ToolsSidebar: React.FC<ToolsSidebarProps> = ({ state }) => {
  const {
    activeTool, lighting, showLayers,
    elements, selectedId, setSelectedId,
    handleToolSelect, setLighting, deleteElement, reorderElement,
  } = state;

  return (
    <aside className="w-16 lg:w-64 border-r border-[#1a1a1a]/8 flex flex-col shrink-0 bg-white z-20">
      <div className="p-3 lg:p-5 flex-1 overflow-y-auto">
        <h3 className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
          {studioText.toolsSectionTitle}
        </h3>
        <div className="flex flex-col gap-1.5">
          {TOOLS.map((tool) => (
            <button
              key={tool.type}
              onClick={() => handleToolSelect(tool.type)}
              title={tool.label}
              className={`flex items-center gap-3 p-3 lg:px-4 lg:py-3 rounded-xl transition-all group ${
                activeTool === tool.type
                  ? "bg-[#1a1a1a] text-[#f8eb96]"
                  : "hover:bg-[#f4f2eb] text-slate-400 hover:text-[#1a1a1a]"
              }`}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">{tool.icon}</span>
              <span className="hidden lg:inline text-sm font-medium">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Layer panel (inline) */}
        {showLayers && (
          <div className="mt-4 hidden lg:block">
            <div className="h-px bg-[#1a1a1a]/8 mb-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Các lớp ({elements.length})
            </h3>
            {elements.length === 0 ? (
              <p className="text-xs text-slate-300 text-center py-4">Chưa có phần tử nào</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {[...elements].reverse().map((el) => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-xs transition-all group ${
                      selectedId === el.id
                        ? "bg-[#1a1a1a] text-[#f8eb96]"
                        : "hover:bg-[#f4f2eb] text-slate-500"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {el.type === "text" ? "title" : "image"}
                    </span>
                    <span className="flex-1 truncate">
                      {el.type === "text" ? el.content.slice(0, 16) : "Hình ảnh"}
                    </span>
                    <div className="hidden group-hover:flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); reorderElement(el.id, "up"); }}
                        className="hover:text-[#6d8869] p-0.5"
                        title="Lên trên"
                      >
                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); reorderElement(el.id, "down"); }}
                        className="hover:text-[#6d8869] p-0.5"
                        title="Xuống dưới"
                      >
                        <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }}
                        className="hover:text-red-500 p-0.5"
                        title="Xoá"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lighting slider */}
      <div className="p-3 lg:p-5 border-t border-[#1a1a1a]/8">
        <div className="hidden lg:block space-y-3">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {studioText.lightingLabel}
          </label>
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-[#f4f2eb] rounded-full relative cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-[#6d8869] rounded-full transition-all"
                style={{ width: `${lighting}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={lighting}
                onChange={(e) => setLighting(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Tối</span>
              <span className="font-bold text-[#6d8869]">{lighting}%</span>
              <span>Sáng</span>
            </div>
          </div>
        </div>
        {/* Mobile lighting */}
        <div className="lg:hidden flex items-center justify-center">
          <button
            onClick={() => setLighting(l => l < 80 ? l + 20 : 20)}
            className="p-2 text-slate-400 hover:text-[#6d8869] transition-colors"
            title="Ánh sáng"
          >
            <span className="material-symbols-outlined text-[22px]">
              {lighting > 60 ? "light_mode" : lighting > 30 ? "partly_cloudy_day" : "dark_mode"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ToolsSidebar;
