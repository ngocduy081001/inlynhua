"use client";

import React, { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 transition-colors rounded cursor-pointer active:scale-95 ${className}`}
      title="Sao chép mã giảm giá"
    >
      <span className="font-mono text-[11px] font-extrabold tracking-wide">{text}</span>
      {copied ? (
        <i className="fa-solid fa-check text-[10px]" />
      ) : (
        <i className="fa-solid fa-copy text-[10px]" />
      )}
    </button>
  );
};
