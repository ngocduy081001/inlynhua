"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingContact() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  const contacts = [
    {
      label: "Gọi ngay",
      href: "tel:0396505693",
      color: "bg-[#1a1a1a] hover:bg-[#333]",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      label: "Zalo",
      href: "https://zalo.me/0396505693",
      color: "bg-[#0068FF] hover:bg-[#0055DD]",
      icon: (
        <img src="/images/cropped-logoZalo.png" alt="Zalo" className="w-6 h-6 object-contain" />
      ),
    },
    {
      label: "Facebook",
      href: "https://facebook.com/nqocduizz",
      color: "bg-[#1877F2] hover:bg-[#1466D8]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* Desktop: hiện thẳng luôn */}
      <div className="hidden md:flex flex-col items-end gap-3">
        {contacts.map((c) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 ${c.color} text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform`}
          >
            {c.icon}
            <span className="text-sm font-bold tracking-wide">{c.label}</span>
          </motion.a>
        ))}
      </div>

      {/* Mobile: bấm mới mở */}
      <div className="md:hidden flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 ${c.color} text-white p-3 rounded-full shadow-lg`}
            >
              {c.icon}
            </motion.a>
          ))}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${open ? "bg-[#1a1a1a] rotate-45" : "bg-[#6d8869] hover:bg-[#5a7558]"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M12 5v14M5 12h14" />
            ) : (
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            )}
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
