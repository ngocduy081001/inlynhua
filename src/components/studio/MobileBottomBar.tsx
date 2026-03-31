"use client";

import React from "react";
import { productSpecs, studioText } from "@/data/mockData";

/* stitch-component: MobileBottomBar */
interface MobileBottomBarProps {
    readonly className?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
    className = "",
}) => {
    return (
        <div
            className={`md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950 p-4 flex gap-4 z-50 ${className}`}
        >
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl h-14 bg-slate-900 text-slate-400 text-sm font-bold border border-slate-800">
                <span className="material-symbols-outlined">tune</span>
            </button>
            <button className="flex-[3] flex items-center justify-center gap-3 rounded-xl h-14 bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-900/40 neon-border border border-cyan-400/50">
                <span className="text-sm">
                    {productSpecs.price} {productSpecs.currency} |{" "}
                    {studioText.addToCartLabel.replace("THÊM VÀO ", "")}
                </span>
            </button>
        </div>
    );
};

export default MobileBottomBar;
