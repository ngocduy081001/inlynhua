"use client";

import React from "react";
import Link from "next/link";
import { studioText } from "@/data/mockData";

/* stitch-component: StudioHeader */
interface StudioHeaderProps {
    readonly className?: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
    className = "",
}) => {
    return (
        <header
            className={`flex items-center justify-between whitespace-nowrap border-b border-[#1a1a1a]/10 bg-[#f4f2eb]/80 px-4 sm:px-6 py-3 shrink-0 backdrop-blur-md z-30 ${className}`}
        >
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="size-8 text-[#6d8869] flex items-center justify-center"
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 28 }}
                    >
                        view_in_ar
                    </span>
                </Link>
                <h2 className="text-base sm:text-lg font-display font-light italic tracking-wide text-[#1a1a1a]">
                    {studioText.pageTitle}
                </h2>
            </div>

            <div className="flex flex-1 justify-end gap-3 sm:gap-6 items-center">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        className="p-2 hover:text-[#6d8869] transition-colors text-slate-400"
                        title="Hoàn tác"
                    >
                        <span className="material-symbols-outlined text-2xl">undo</span>
                    </button>
                    <button
                        className="p-2 hover:text-[#6d8869] transition-colors text-slate-400"
                        title="Làm lại"
                    >
                        <span className="material-symbols-outlined text-2xl">redo</span>
                    </button>
                    <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block" />
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[#6d8869]/30 bg-[#6d8869]/10 text-[#6d8869] hover:bg-[#6d8869]/20 transition-all group">
                        <span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500">
                            vrpano
                        </span>
                        <span className="text-sm font-bold tracking-wider">{studioText.vrLabLabel}</span>
                    </button>
                </div>
                <button className="bg-[#1a1a1a] hover:bg-[#6d8869] text-[#f4f2eb] px-5 py-2 rounded-full text-sm font-bold transition-all tracking-wider uppercase">
                    {studioText.saveLabel}
                </button>
            </div>
        </header>
    );
};

export default StudioHeader;
