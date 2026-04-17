"use client";

import React, { useEffect } from "react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { ToolsSidebar } from "@/components/studio/ToolsSidebar";
import { DesignCanvas } from "@/components/studio/DesignCanvas";
import { PropertiesPanel } from "@/components/studio/PropertiesPanel";
import { MobileBottomBar } from "@/components/studio/MobileBottomBar";
import { useStudioState } from "@/hooks/useStudioState";
import { useQuote } from "@/context/QuoteContext";

export default function StudioPage() {
  const state = useStudioState();
  const { openQuote } = useQuote();

  // Load saved project on mount
  useEffect(() => { state.loadProject(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") { e.preventDefault(); state.undo(); }
        if (e.key === "y" || (e.shiftKey && e.key === "z")) { e.preventDefault(); state.redo(); }
        if (e.key === "s") { e.preventDefault(); state.saveProject(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  const handleAddToCart = () => openQuote("studio");

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#f4f2eb]">
      <StudioHeader state={state} />

      <main className="flex flex-1 overflow-hidden relative">
        <ToolsSidebar state={state} />
        <DesignCanvas state={state} />
        <PropertiesPanel state={state} onAddToCart={handleAddToCart} />
      </main>

      {/* Mobile bottom spacing (for fixed bar) */}
      <div className="md:hidden h-32" />

      <MobileBottomBar state={state} onAddToCart={handleAddToCart} />
    </div>
  );
}
