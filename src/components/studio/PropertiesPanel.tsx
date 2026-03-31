"use client";

import React from "react";
import {
    pantoneColors,
    quantityOptions,
    productSpecs,
    studioText,
} from "@/data/mockData";

/* stitch-component: PropertiesPanel */
interface PropertiesPanelProps {
    readonly quantity: string;
    readonly onQuantityChange: (value: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
    quantity,
    onQuantityChange,
}) => {
    return (
        <aside className="hidden md:flex w-80 border-l border-slate-800 flex-col shrink-0 bg-slate-950 z-20 overflow-y-auto">
            {/* Technical specs */}
            <div className="p-6 border-b border-slate-900">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                    {studioText.specsTitle}
                </h3>
                <div className="space-y-5">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Kích thước</span>
                        <span className="text-white font-medium px-2 py-1 bg-slate-900 rounded border border-slate-800">
                            {productSpecs.size}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Chất liệu</span>
                        <span className="text-white font-medium">
                            {productSpecs.material}
                        </span>
                    </div>
                    <div className="space-y-2">
                        <span className="text-slate-400 text-sm">Số lượng đặt hàng</span>
                        <select
                            value={quantity}
                            onChange={(e) => onQuantityChange(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:ring-cyan-500 focus:border-cyan-500 py-2 px-3 appearance-none cursor-pointer hover:border-slate-700 transition-colors"
                        >
                            {quantityOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* VR Preview */}
            <div className="p-6 flex-1">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                    {studioText.vrPreviewTitle}
                </h3>
                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative group cursor-pointer hover:border-cyan-500/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-cyan-400/50 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                            play_circle
                        </span>
                    </div>
                    <div className="absolute bottom-2 left-2 text-[8px] text-cyan-400/70 font-mono">
                        {productSpecs.vrRenderVersion}
                    </div>
                </div>

                {/* Pantone colors */}
                <div className="mt-8 space-y-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {studioText.pantoneTitle}
                    </div>
                    <div className="flex gap-3">
                        {pantoneColors.map((c, idx) => (
                            <div
                                key={idx}
                                className={`size-7 rounded-full ${c.tailwindClass} border border-white/20 cursor-pointer hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-cyan-400/50`}
                                title={c.label}
                            />
                        ))}
                        <button className="size-7 rounded-full flex items-center justify-center border border-dashed border-slate-700 text-slate-600 hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all">
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing + CTA */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 backdrop-blur sticky bottom-0">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase">
                            {studioText.subtotalLabel}
                        </span>
                        <span className="text-xl font-bold text-white tracking-tight">
                            {productSpecs.price}{" "}
                            <span className="text-xs font-normal">{productSpecs.currency}</span>
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] font-bold text-green-500 uppercase">
                            {productSpecs.shippingLabel}
                        </span>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95 neon-border border border-cyan-400/50">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span>{studioText.addToCartLabel}</span>
                </button>
            </div>
        </aside>
    );
};

export default PropertiesPanel;
