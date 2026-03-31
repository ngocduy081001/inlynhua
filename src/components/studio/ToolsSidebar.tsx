"use client";

import React from "react";
import { studioTools, studioText } from "@/data/mockData";

/* stitch-component: ToolsSidebar */
interface ToolsSidebarProps {
    readonly selectedTool: number;
    readonly lightingLevel: number;
    readonly onToolSelect: (index: number) => void;
    readonly onLightingChange: (value: number) => void;
}

export const ToolsSidebar: React.FC<ToolsSidebarProps> = ({
    selectedTool,
    lightingLevel,
    onToolSelect,
    onLightingChange,
}) => {
    return (
        <aside className="w-16 lg:w-64 border-r border-slate-800 flex flex-col shrink-0 bg-slate-950 z-20">
            <div className="p-3 lg:p-6">
                <h3 className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                    {studioText.toolsSectionTitle}
                </h3>
                <div className="flex flex-col gap-3">
                    {studioTools.map((tool, idx) => (
                        <button
                            key={idx}
                            onClick={() => onToolSelect(idx)}
                            className={`flex items-center gap-4 p-3 lg:px-4 lg:py-3 rounded-xl transition-all group border ${selectedTool === idx
                                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-400"
                                    : "hover:bg-slate-900 text-slate-400 hover:text-slate-100 border-transparent"
                                }`}
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {tool.icon}
                            </span>
                            <span className="hidden lg:inline text-sm font-medium">
                                {tool.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lighting slider */}
            <div className="mt-auto p-3 lg:p-6 border-t border-slate-900">
                <div className="hidden lg:block space-y-4">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {studioText.lightingLabel}
                    </label>
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-slate-800 rounded-full relative cursor-pointer">
                            <div
                                className="absolute inset-y-0 left-0 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all"
                                style={{ width: `${lightingLevel}%` }}
                            />
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={lightingLevel}
                                onChange={(e) => onLightingChange(Number(e.target.value))}
                                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-600">
                            <span>0%</span>
                            <span>{lightingLevel}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ToolsSidebar;
