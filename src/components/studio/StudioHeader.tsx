"use client";

import React from "react";
import Link from "next/link";
import { studioText } from "@/data/mockData";
import { useStudioState } from "@/hooks/useStudioState";

interface StudioHeaderProps {
  state: ReturnType<typeof useStudioState>;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({ state }) => {
  const { undo, redo, saveProject, saveStatus, elements } = state;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#1a1a1a]/10 bg-[#f4f2eb]/90 px-4 sm:px-6 py-3 shrink-0 backdrop-blur-md z-30">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#6d8869] hover:text-[#1a1a1a] transition-colors group"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span className="hidden sm:block text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors">
            Trang chủ
          </span>
        </Link>
        <div className="h-5 w-px bg-[#1a1a1a]/15" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#f8eb96]" style={{ fontSize: 15 }}>
              view_in_ar
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-display font-black tracking-tight text-[#1a1a1a] hidden sm:block">
            {studioText.pageTitle}
          </h1>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Element count badge */}
        {elements.length > 0 && (
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-[#1a1a1a]/8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6d8869]" />
            {elements.length} phần tử
          </span>
        )}

        {/* Undo */}
        <button
          onClick={undo}
          className="p-2 rounded-lg hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/40 hover:text-[#6d8869] transition-all"
          title="Hoàn tác (Ctrl+Z)"
        >
          <span className="material-symbols-outlined text-xl">undo</span>
        </button>

        {/* Redo */}
        <button
          onClick={redo}
          className="p-2 rounded-lg hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/40 hover:text-[#6d8869] transition-all"
          title="Làm lại (Ctrl+Y)"
        >
          <span className="material-symbols-outlined text-xl">redo</span>
        </button>

        <div className="h-5 w-px bg-slate-200 hidden sm:block mx-1" />

        {/* VR Lab */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-[#6d8869]/30 bg-[#6d8869]/8 text-[#6d8869] hover:bg-[#6d8869]/15 transition-all text-xs font-bold tracking-wider">
          <span className="material-symbols-outlined text-lg">vrpano</span>
          {studioText.vrLabLabel}
        </button>

        {/* Save */}
        <button
          onClick={saveProject}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all tracking-widest uppercase ${
            saveStatus === "saved"
              ? "bg-[#6d8869] text-white"
              : "bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f8eb96]"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {saveStatus === "saved" ? "check_circle" : "save"}
          </span>
          <span className="hidden sm:inline">
            {saveStatus === "saved" ? "Đã lưu!" : studioText.saveLabel}
          </span>
        </button>
      </div>
    </header>
  );
};

export default StudioHeader;
