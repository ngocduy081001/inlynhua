import React from "react";

export const Logo: React.FC<{ className?: string }> = ({
  className = "w-12 h-12",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} overflow-visible group-hover:scale-105 transition-transform duration-500`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* BACKGROUND BARCODE / RETAIL AESTHETIC (representing "Giá Rẻ" & "Sản xuất") */}
      <g className="opacity-40 text-white">
        <rect x="15" y="25" width="2" height="50" fill="currentColor" />
        <rect x="22" y="25" width="6" height="50" fill="currentColor" />
        <rect x="33" y="25" width="3" height="50" fill="currentColor" />
        <rect x="42" y="25" width="8" height="50" fill="currentColor" />
        <rect x="55" y="25" width="2" height="50" fill="currentColor" />
        <rect x="62" y="25" width="5" height="50" fill="currentColor" />
        <rect x="72" y="25" width="8" height="50" fill="currentColor" />
        <rect x="85" y="25" width="2" height="50" fill="currentColor" />
      </g>

      {/* CMYK INK DROPS / GLARE (representing "In Ấn") */}
      <circle
        cx="40"
        cy="50"
        r="18"
        fill="#00f3ff"
        className="mix-blend-screen opacity-80 group-hover:-translate-x-2 group-hover:-translate-y-1 transition-transform duration-500"
      />
      <circle
        cx="60"
        cy="50"
        r="18"
        fill="#ff003c"
        className="mix-blend-screen opacity-80 group-hover:translate-x-2 group-hover:translate-y-1 transition-transform duration-500"
      />

      {/* PRINT REGISTRATION CROSSHAIRS (The core of printing) */}
      <path
        d="M 50 5 L 50 95"
        stroke="#070709"
        strokeWidth="2"
        className="z-10"
      />
      <path
        d="M 5 50 L 95 50"
        stroke="#070709"
        strokeWidth="2"
        className="z-10"
      />

      {/* Target Circle */}
      <circle
        cx="50"
        cy="50"
        r="28"
        stroke="white"
        strokeWidth="3"
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20"
      />
      <circle
        cx="50"
        cy="50"
        r="10"
        stroke="white"
        strokeWidth="3"
        className="z-20"
      />

      {/* Glitch Frame Corners */}
      <path d="M 5 20 L 5 5 L 20 5" stroke="#00f3ff" strokeWidth="4" />
      <path d="M 95 20 L 95 5 L 80 5" stroke="#ff003c" strokeWidth="4" />
      <path d="M 5 80 L 5 95 L 20 95" stroke="#ff003c" strokeWidth="4" />
      <path d="M 95 80 L 95 95 L 80 95" stroke="#00f3ff" strokeWidth="4" />
    </svg>
  );
};
