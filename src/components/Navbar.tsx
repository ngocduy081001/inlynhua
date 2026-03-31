"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/mockData";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export const Navbar: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } =
    useMobileMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#f4f2eb]/90 backdrop-blur-xl shadow-sm border-b border-[#1a1a1a]/10"
          : "py-6 bg-transparent"
      } ${className}`}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link
          href="/"
          className="group flex flex-col items-start justify-center relative z-50 transition-transform hover:scale-105"
        >
          <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-[#1a1a1a] uppercase leading-none pt-1">
            In Ly <span className="text-[#6d8869]">Giá Rẻ</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest hover:text-[#6d8869] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#1a1a1a] hover:after:w-full after:transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-50">
          <Link
            href="/#contact"
            className="hidden lg:inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1a1a1a] text-[#f4f2eb] text-sm font-bold tracking-widest uppercase hover:bg-[#6d8869] hover:text-white transition-all duration-300"
          >
            Báo giá
          </Link>

          {/* Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a1a] text-white hover:bg-[#6d8869] transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#f8eb96] flex flex-col justify-center px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-4xl sm:text-5xl font-display font-black uppercase text-[#1a1a1a] hover:text-white transition-colors tracking-tighter"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 + 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="px-10 py-4 rounded-full bg-[#1a1a1a] text-[#f4f2eb] font-bold text-lg uppercase tracking-widest hover:bg-[#6d8869] transition-colors"
                >
                  Nhận báo giá ngay
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
