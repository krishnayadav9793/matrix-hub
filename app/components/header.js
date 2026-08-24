"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "AI Chatbot", href: "/AIchatbot" },
  { name: "Calculator", href: "/calculator" },
  { name: "Contact", href: "/contact" }
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Play click effect on navigation
  const playClick = () => {
    try {
      if (typeof window !== "undefined") {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch (e) {}
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/75 border-b border-gray-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] select-none">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Brand / Logo */}
        <Link 
          href="/" 
          onClick={playClick}
          className="text-lg font-extrabold tracking-wider text-slate-100 hover:scale-102 transition-all flex items-center gap-1.5"
        >
          <span className="w-2.5 h-2.5 rounded bg-emerald-500 shadow-[0_0_8px_#10b981] inline-block" />
          <span>MATRIX</span>
          <span className="text-emerald-400 font-light">HUB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative py-1.5"
              >
                <Link
                  href={item.href}
                  onClick={playClick}
                  className={`text-xs uppercase font-bold tracking-widest transition-colors duration-200 ${
                    isActive ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Underline Hover and Active visual effects */}
                {hovered === item.name && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_#10b981] bottom-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                {isActive && !hovered && (
                  <div className="absolute left-0 right-0 h-[2px] bg-emerald-500/50 bottom-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => {
            playClick();
            setMenuOpen(!menuOpen);
          }}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 border border-gray-800 rounded-lg bg-gray-900/60 focus:outline-none hover:border-emerald-500/50 transition-colors"
        >
          <div className="space-y-1.5">
            <span className={`block w-5 h-[2px] bg-slate-200 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-slate-200 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-slate-200 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#030712]/95 border-b border-gray-800"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-xs font-bold tracking-widest">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      playClick();
                      setMenuOpen(false);
                    }}
                    className={`block uppercase py-2 transition-colors ${
                      isActive ? "text-emerald-400 border-l-2 border-emerald-400 pl-3" : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
