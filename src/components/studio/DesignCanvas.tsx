"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { images, studioText } from "@/data/mockData";
import { useStudioState } from "@/hooks/useStudioState";
import type { CanvasElement } from "@/hooks/useStudioState";

interface DesignCanvasProps {
  state: ReturnType<typeof useStudioState>;
}

// ── Draggable Element ─────────────────────────────────────────────────────────
function DraggableElement({
  el,
  selected,
  onSelect,
  onMove,
  onMoveEnd,
  onDoubleClick,
  canvasRef,
}: {
  el: CanvasElement;
  selected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onMoveEnd: (id: string, x: number, y: number) => void;
  onDoubleClick: (id: string) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  const dragging = useRef(false);
  const startPos = useRef({ mouseX: 0, mouseY: 0, elX: 0, elY: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (el.locked) return;
    e.stopPropagation();
    onSelect(el.id);
    dragging.current = true;
    startPos.current = { mouseX: e.clientX, mouseY: e.clientY, elX: el.x, elY: el.y };

    const onMove = (me: MouseEvent) => {
      if (!dragging.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((me.clientX - startPos.current.mouseX) / rect.width) * 100;
      const dy = ((me.clientY - startPos.current.mouseY) / rect.height) * 100;
      const nx = Math.max(0, Math.min(95, startPos.current.elX + dx));
      const ny = Math.max(0, Math.min(95, startPos.current.elY + dy));
      el.x = nx; el.y = ny;
      (e.currentTarget as HTMLElement)?.parentElement?.style.setProperty("--x", `${nx}%`);
      const target = document.getElementById(`el-${el.id}`);
      if (target) { target.style.left = `${nx}%`; target.style.top = `${ny}%`; }
    };

    const onUp = (me: MouseEvent) => {
      if (!dragging.current || !canvasRef.current) return;
      dragging.current = false;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((me.clientX - startPos.current.mouseX) / rect.width) * 100;
      const dy = ((me.clientY - startPos.current.mouseY) / rect.height) * 100;
      const nx = Math.max(0, Math.min(95, startPos.current.elX + dx));
      const ny = Math.max(0, Math.min(95, startPos.current.elY + dy));
      onMoveEnd(el.id, nx, ny);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      id={`el-${el.id}`}
      onMouseDown={onMouseDown}
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick(el.id); }}
      style={{
        position: "absolute",
        left: `${el.x}%`,
        top: `${el.y}%`,
        opacity: el.opacity,
        transform: `rotate(${el.rotation}deg)`,
        userSelect: "none",
        cursor: el.locked ? "not-allowed" : "move",
        zIndex: selected ? 50 : 10,
      }}
    >
      {/* Selection ring */}
      {selected && (
        <div className="absolute -inset-2 border-2 border-dashed border-[#6d8869] rounded-lg pointer-events-none" />
      )}

      {el.type === "text" ? (
        <span
          style={{
            fontSize: el.fontSize,
            fontWeight: el.fontWeight,
            color: el.color,
            backgroundColor: el.bgColor === "transparent" ? undefined : el.bgColor,
            padding: "2px 4px",
            borderRadius: 4,
            whiteSpace: "pre",
            lineHeight: 1.4,
          }}
        >
          {el.content}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={el.content}
          alt="element"
          style={{ maxWidth: 200, maxHeight: 200, objectFit: "contain", display: "block" }}
          draggable={false}
        />
      )}
    </div>
  );
}

// ── Inline text editor ────────────────────────────────────────────────────────
function InlineEditor({
  el,
  canvasRef,
  onDone,
}: {
  el: CanvasElement;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onDone: (text: string) => void;
}) {
  const [val, setVal] = useState(el.content);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { ref.current?.focus(); ref.current?.select(); }, []);

  const canvasRect = canvasRef.current?.getBoundingClientRect();
  const canvasW = canvasRect?.width ?? 600;
  const canvasH = canvasRect?.height ?? 400;

  return (
    <div
      style={{
        position: "absolute",
        left: `${el.x}%`,
        top: `${el.y}%`,
        zIndex: 100,
      }}
    >
      <textarea
        ref={ref}
        value={val}
        onChange={e => setVal(e.target.value)}
        onBlur={() => onDone(val)}
        onKeyDown={e => { if (e.key === "Escape" || (e.key === "Enter" && !e.shiftKey)) { e.preventDefault(); onDone(val); } }}
        style={{
          fontSize: el.fontSize,
          fontWeight: el.fontWeight,
          color: el.color,
          background: "rgba(255,255,255,0.95)",
          border: "2px solid #6d8869",
          borderRadius: 6,
          padding: "4px 8px",
          outline: "none",
          resize: "both",
          minWidth: 120,
          lineHeight: 1.4,
          fontFamily: "inherit",
        }}
        rows={2}
      />
      <div className="text-[10px] text-slate-400 mt-1">Enter để xác nhận · Esc để huỷ</div>
    </div>
  );
}

// ── Main DesignCanvas ─────────────────────────────────────────────────────────
export const DesignCanvas: React.FC<DesignCanvasProps> = ({ state }) => {
  const {
    elements, selectedId, activeTool, zoom, lighting, showQR, background,
    setSelectedId, handleCanvasClick, handleImageUpload,
    updateElement, deleteElement, zoomIn, zoomOut, zoomReset,
    setShowQR,
  } = state;

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Keyboard: Delete selected
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        // Only when not editing text
        if (editingId) return;
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        deleteElement(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, editingId, deleteElement]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Clicked on canvas background
    if (e.target !== canvasRef.current && !(e.target as HTMLElement).classList.contains("canvas-bg")) return;
    setSelectedId(null);
    if (activeTool === "text" && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      handleCanvasClick(xPct, yPct);
    }
    if (activeTool === "logo") {
      fileInputRef.current?.click();
    }
  }, [activeTool, handleCanvasClick, setSelectedId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleImageUpload(file, 30, 30);
    e.target.value = "";
  };

  const startEdit = (id: string) => setEditingId(id);
  const finishEdit = (text: string) => {
    if (editingId) {
      updateElement(editingId, { content: text || "Văn bản" }, true);
      setEditingId(null);
    }
  };

  const handleMoveEnd = useCallback((id: string, x: number, y: number) => {
    updateElement(id, { x, y }, true);
  }, [updateElement]);

  const getCursor = () => {
    if (activeTool === "text") return "text";
    if (activeTool === "logo") return "pointer";
    return "default";
  };

  return (
    <section className="flex-1 flex flex-col relative bg-[#f4f2eb] overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Zoom indicator */}
      <div className="absolute top-4 right-4 z-20 text-[10px] font-bold text-[#1a1a1a]/40 pointer-events-none select-none">
        {Math.round(zoom * 100)}%
      </div>

      {/* Tool hint banner */}
      {activeTool !== "select" && activeTool !== "layers" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#1a1a1a]/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm select-none">
          {activeTool === "text" && "📝 Click vào canvas để thêm văn bản"}
          {activeTool === "logo" && "🖼️ Click vào canvas để chọn file logo"}
          {activeTool === "color" && "🎨 Chọn màu nền trong bảng bên phải"}
          {activeTool === "image" && "🖼️ Click vào canvas để tải ảnh lên"}
        </div>
      )}

      {/* Canvas wrapper (zoom transform) */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-8">
        <div
          style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease", transformOrigin: "center center" }}
        >
          {/* Actual design canvas */}
          <div
            ref={canvasRef}
            className="canvas-bg relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: 560,
              height: 480,
              cursor: getCursor(),
              filter: `brightness(${0.4 + (lighting / 100) * 0.8})`,
              backgroundColor: background === "transparent" ? "#f4f2eb" : background,
              transition: "filter 0.3s, background-color 0.3s",
            }}
            onMouseDown={handleCanvasMouseDown}
          >
            {/* Cup image */}
            <div className="canvas-bg absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="canvas-bg relative">
                {/* Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-xl rounded-full" />
                <Image
                  src={images.cupProduct}
                  alt="3D Cup Preview"
                  width={300}
                  height={360}
                  className="object-contain drop-shadow-2xl select-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            </div>

            {/* Design zone outline */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl transition-all pointer-events-none ${
                activeTool === "text" || activeTool === "logo"
                  ? "border-[#6d8869] border-dashed bg-[#6d8869]/5 w-36 h-28"
                  : "border-transparent w-36 h-28"
              }`}
            />

            {/* Canvas elements */}
            {elements.map(el =>
              editingId === el.id ? (
                <InlineEditor
                  key={el.id}
                  el={el}
                  canvasRef={canvasRef}
                  onDone={finishEdit}
                />
              ) : (
                <DraggableElement
                  key={el.id}
                  el={el}
                  selected={selectedId === el.id}
                  canvasRef={canvasRef}
                  onSelect={setSelectedId}
                  onMove={(id, x, y) => updateElement(id, { x, y })}
                  onMoveEnd={handleMoveEnd}
                  onDoubleClick={el.type === "text" ? startEdit : () => {}}
                />
              )
            )}

            {/* Empty state */}
            {elements.length === 0 && (
              <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
                <span className="text-[11px] text-[#1a1a1a]/30 font-medium">
                  Chọn công cụ bên trái để bắt đầu thiết kế
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VR QR Button */}
      <div
        className="absolute top-6 left-6 group"
        onMouseEnter={() => setShowQR(true)}
        onMouseLeave={() => setShowQR(false)}
      >
        <button className="bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full flex items-center gap-2 text-[#6d8869] hover:scale-105 transition-all border border-[#6d8869]/30 shadow-sm text-sm font-bold">
          <span className="material-symbols-outlined text-base">qr_code_scanner</span>
          {studioText.vrButtonLabel}
        </button>
        <div className={`absolute top-full mt-3 left-0 bg-white/95 backdrop-blur-sm p-4 rounded-2xl transition-all pointer-events-none w-44 text-center border border-[#1a1a1a]/10 shadow-xl ${showQR ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <Image src={images.qrCode} alt="QR VR" width={128} height={128} className="w-28 h-28 mx-auto rounded-xl" unoptimized />
          <p className="text-[11px] text-slate-400 mt-2 leading-tight">{studioText.qrHint}</p>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        {[
          { icon: "zoom_in", label: "Phóng to", action: zoomIn },
          { icon: "zoom_out", label: "Thu nhỏ", action: zoomOut },
          { icon: "refresh", label: "Đặt lại", action: zoomReset },
        ].map(({ icon, label, action }) => (
          <button
            key={icon}
            title={label}
            onClick={action}
            className="w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:text-[#6d8869] hover:bg-white transition-all text-slate-400 border border-[#1a1a1a]/10 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </button>
        ))}
      </div>

      {/* Delete selected hint */}
      {selectedId && !editingId && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1a1a1a]/80 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm">
          <span>Kéo để di chuyển · Double-click để sửa text</span>
          <button
            onClick={() => deleteElement(selectedId)}
            className="ml-2 text-red-400 hover:text-red-300 font-bold"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
};

export default DesignCanvas;
