"use client";

import { useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ToolType = "select" | "text" | "logo" | "image" | "color" | "layers";

export interface CanvasElement {
  id: string;
  type: "text" | "image";
  // position as % of canvas (0–100)
  x: number;
  y: number;
  content: string;   // text string OR image dataURL/src
  color: string;
  bgColor: string;
  fontSize: number;
  fontWeight: string;
  opacity: number;
  rotation: number;
  locked: boolean;
}

interface HistoryEntry {
  elements: CanvasElement[];
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useStudioState() {
  const [elements, setElements]         = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId]     = useState<string | null>(null);
  const [activeTool, setActiveTool]     = useState<ToolType>("select");
  const [zoom, setZoom]                 = useState(1);
  const [lighting, setLighting]         = useState(66);
  const [showQR, setShowQR]             = useState(false);
  const [background, setBackground]     = useState("transparent");
  const [quantity, setQuantity]         = useState("1000");
  const [saveStatus, setSaveStatus]     = useState<"idle" | "saved">("idle");
  const [showLayers, setShowLayers]     = useState(false);

  // Undo/Redo history
  const history     = useRef<HistoryEntry[]>([{ elements: [] }]);
  const historyIdx  = useRef(0);

  // ── History helpers ──
  const pushHistory = useCallback((els: CanvasElement[]) => {
    // Slice off any redo entries
    history.current = history.current.slice(0, historyIdx.current + 1);
    history.current.push({ elements: els.map(e => ({ ...e })) });
    historyIdx.current = history.current.length - 1;
  }, []);

  const undo = useCallback(() => {
    if (historyIdx.current <= 0) return;
    historyIdx.current--;
    const state = history.current[historyIdx.current];
    setElements(state.elements.map(e => ({ ...e })));
    setSelectedId(null);
  }, []);

  const redo = useCallback(() => {
    if (historyIdx.current >= history.current.length - 1) return;
    historyIdx.current++;
    const state = history.current[historyIdx.current];
    setElements(state.elements.map(e => ({ ...e })));
    setSelectedId(null);
  }, []);

  // ── Element helpers ──
  const addElement = useCallback((el: CanvasElement) => {
    setElements(prev => {
      const next = [...prev, el];
      pushHistory(next);
      return next;
    });
    setSelectedId(el.id);
    setActiveTool("select");
  }, [pushHistory]);

  const updateElement = useCallback((id: string, patch: Partial<CanvasElement>, addToHistory = false) => {
    setElements(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...patch } : e);
      if (addToHistory) pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => {
      const next = prev.filter(e => e.id !== id);
      pushHistory(next);
      return next;
    });
    setSelectedId(null);
  }, [pushHistory]);

  const reorderElement = useCallback((id: string, dir: "up" | "down") => {
    setElements(prev => {
      const idx = prev.findIndex(e => e.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      if (dir === "up" && idx < next.length - 1) {
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      } else if (dir === "down" && idx > 0) {
        [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
      }
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  // ── Tool actions ──
  const handleToolSelect = useCallback((tool: ToolType) => {
    setActiveTool(tool);
    if (tool !== "select") setSelectedId(null);
    if (tool === "layers") setShowLayers(v => !v);
    else setShowLayers(false);
  }, []);

  // ── Add text on canvas click ──
  const handleCanvasClick = useCallback((xPct: number, yPct: number) => {
    if (activeTool !== "text") return;
    const id = `text_${Date.now()}`;
    addElement({
      id, type: "text",
      x: xPct, y: yPct,
      content: "Nhập văn bản",
      color: "#1a1a1a", bgColor: "transparent",
      fontSize: 18, fontWeight: "600",
      opacity: 1, rotation: 0, locked: false,
    });
  }, [activeTool, addElement]);

  // ── Logo/Image upload ──
  const handleImageUpload = useCallback((file: File, xPct: number, yPct: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const id = `img_${Date.now()}`;
      addElement({
        id, type: "image",
        x: xPct, y: yPct,
        content: src,
        color: "", bgColor: "transparent",
        fontSize: 0, fontWeight: "",
        opacity: 1, rotation: 0, locked: false,
      });
    };
    reader.readAsDataURL(file);
  }, [addElement]);

  // ── Zoom ──
  const zoomIn  = useCallback(() => setZoom(z => Math.min(3, +(z + 0.2).toFixed(1))), []);
  const zoomOut = useCallback(() => setZoom(z => Math.max(0.3, +(z - 0.2).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(1), []);

  // ── Save to localStorage ──
  const saveProject = useCallback(() => {
    const data = { elements, background, quantity };
    localStorage.setItem("studio_project", JSON.stringify(data));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  }, [elements, background, quantity]);

  // ── Load from localStorage ──
  const loadProject = useCallback(() => {
    const raw = localStorage.getItem("studio_project");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      setElements(data.elements ?? []);
      setBackground(data.background ?? "transparent");
      setQuantity(data.quantity ?? "1000");
      pushHistory(data.elements ?? []);
    } catch { /* ignore */ }
  }, [pushHistory]);

  const selectedElement = elements.find(e => e.id === selectedId) ?? null;

  return {
    // State
    elements, selectedId, selectedElement,
    activeTool, zoom, lighting, showQR,
    background, quantity, saveStatus, showLayers,
    // Setters
    setSelectedId, setActiveTool, setBackground, setQuantity,
    setLighting, setShowQR,
    // Actions
    handleToolSelect, handleCanvasClick, handleImageUpload,
    addElement, updateElement, deleteElement, reorderElement,
    undo, redo, zoomIn, zoomOut, zoomReset,
    saveProject, loadProject,
  };
}
