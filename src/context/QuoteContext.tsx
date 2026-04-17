"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { QuoteModal } from "@/components/QuoteModal";

interface QuoteContextValue {
  openQuote: (plan?: string) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue>({
  openQuote: () => {},
  closeQuote: () => {},
});

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  const openQuote = useCallback((plan?: string) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={closeQuote}
        selectedPlan={selectedPlan}
      />
    </QuoteContext.Provider>
  );
};
