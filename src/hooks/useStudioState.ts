"use client";

import { useState, useCallback } from "react";

export function useStudioState() {
    const [selectedTool, setSelectedTool] = useState(0);
    const [quantity, setQuantity] = useState("1000");
    const [lightingLevel, setLightingLevel] = useState(66);
    const [showQR, setShowQR] = useState(false);

    const handleToolSelect = useCallback((index: number) => {
        setSelectedTool(index);
    }, []);

    const handleQuantityChange = useCallback((value: string) => {
        setQuantity(value);
    }, []);

    const handleLightingChange = useCallback((value: number) => {
        setLightingLevel(value);
    }, []);

    const handleShowQR = useCallback((visible: boolean) => {
        setShowQR(visible);
    }, []);

    return {
        selectedTool,
        quantity,
        lightingLevel,
        showQR,
        handleToolSelect,
        handleQuantityChange,
        handleLightingChange,
        handleShowQR,
    };
}
