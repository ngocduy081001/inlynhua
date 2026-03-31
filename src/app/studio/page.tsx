"use client";

import { StudioHeader } from "@/components/studio/StudioHeader";
import { ToolsSidebar } from "@/components/studio/ToolsSidebar";
import { DesignCanvas } from "@/components/studio/DesignCanvas";
import { PropertiesPanel } from "@/components/studio/PropertiesPanel";
import { MobileBottomBar } from "@/components/studio/MobileBottomBar";
import { useStudioState } from "@/hooks/useStudioState";

export default function StudioPage() {
    const {
        selectedTool,
        quantity,
        lightingLevel,
        showQR,
        handleToolSelect,
        handleQuantityChange,
        handleLightingChange,
        handleShowQR,
    } = useStudioState();

    return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-slate-950">
            <StudioHeader />

            <main className="flex flex-1 overflow-hidden relative">
                <ToolsSidebar
                    selectedTool={selectedTool}
                    lightingLevel={lightingLevel}
                    onToolSelect={handleToolSelect}
                    onLightingChange={handleLightingChange}
                />

                <DesignCanvas showQR={showQR} onShowQR={handleShowQR} />

                <PropertiesPanel
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                />
            </main>

            <MobileBottomBar />
        </div>
    );
}
