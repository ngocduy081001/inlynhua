"use client";

import React from "react";
import Image from "next/image";
import { images, studioText } from "@/data/mockData";

/* stitch-component: DesignCanvas */
interface DesignCanvasProps {
    readonly showQR: boolean;
    readonly onShowQR: (visible: boolean) => void;
}

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
    showQR,
    onShowQR,
}) => {
    return (
        <section className="flex-1 flex flex-col relative bg-slate-950 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-panel-bg)_0%,_var(--color-dark-bg)_100%)]" />
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-cyan-950/20 to-transparent" />
            <div className="absolute inset-0 grid-bg pointer-events-none" />

            {/* Canvas area */}
            <div className="flex-1 w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing z-10">
                <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                    {/* Product image */}
                    <Image
                        src={images.cupProduct}
                        alt="Realistic 3D Cup"
                        width={600}
                        height={600}
                        className="w-4/5 h-4/5 object-contain cyan-reflection"
                        unoptimized
                    />

                    {/* Edit zone overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 w-1/3 h-1/4 rounded-xl flex items-center justify-center group hover:border-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer">
                        <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity neon-text">
                            {studioText.editZone}
                        </span>
                    </div>
                </div>

                {/* VR button */}
                <div
                    className="absolute top-6 left-6 sm:top-10 sm:left-10 group"
                    onMouseEnter={() => onShowQR(true)}
                    onMouseLeave={() => onShowQR(false)}
                >
                    <button className="glass-panel px-4 sm:px-5 py-3 rounded-full flex items-center gap-3 text-cyan-400 hover:scale-105 transition-all border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <span className="material-symbols-outlined animate-pulse">
                            qr_code_scanner
                        </span>
                        <span className="font-bold text-xs sm:text-sm tracking-wide">
                            {studioText.vrButtonLabel}
                        </span>
                    </button>

                    {/* QR Code popup */}
                    <div
                        className={`absolute top-full mt-4 left-0 glass-panel p-4 rounded-xl transition-all pointer-events-none w-48 text-center border border-cyan-500/30 ${showQR
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                    >
                        <div className="bg-white p-2 rounded-lg mb-3 inline-block">
                            <Image
                                src={images.qrCode}
                                alt="QR VR"
                                width={128}
                                height={128}
                                className="w-32 h-32"
                                unoptimized
                            />
                        </div>
                        <p className="text-[10px] text-slate-300 leading-tight">
                            {studioText.qrHint}
                        </p>
                    </div>
                </div>

                {/* Zoom controls */}
                <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex flex-col gap-3">
                    {["zoom_in", "zoom_out", "refresh"].map((icon) => (
                        <button
                            key={icon}
                            className="w-12 h-12 glass-panel rounded-full flex items-center justify-center hover:text-cyan-400 transition-colors text-slate-400 border border-slate-800"
                        >
                            <span className="material-symbols-outlined">{icon}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DesignCanvas;
