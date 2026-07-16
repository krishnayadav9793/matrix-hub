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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/85 border-b border-[#1b3a1b] shadow-[0_2px_15px_rgba(0,255,0,0.07)] select-none">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Brand / Logo */}
        <Link 
          href="/" 
          onClick={playClick}
          className="text-lg font-bold tracking-widest text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)] hover:scale-102 transition-transform"
        >
          ■ MATRIX HUB
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative py-1"
              >
                <Link
                  href={item.href}
                  onClick={playClick}
                  className={`text-sm uppercase font-semibold font-mono tracking-wider transition-colors duration-200 ${
                    isActive ? "text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]" : "text-[#22aa22] hover:text-[#00ff41]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Underline Hover and Active visual effects */}
                {hovered === item.name && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute left-0 right-0 h-[2px] bg-[#00ff41] shadow-[0_0_8px_#00ff41] bottom-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                {isActive && !hovered && (
                  <div className="absolute left-0 right-0 h-[2px] bg-[#1b3a1b] bottom-0" />
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
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-[#1b3a1b] rounded bg-black/40 focus:outline-none hover:border-[#00ff41] transition-colors"
        >
          <div className="space-y-1">
            <span className={`block w-4 h-[2px] bg-[#00ff41] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-4 h-[2px] bg-[#00ff41] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-[2px] bg-[#00ff41] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-black/95 border-b border-[#1b3a1b]"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 font-mono text-sm">
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
                    className={`block uppercase tracking-wider py-1.5 transition-colors ${
                      isActive ? "text-[#00ff41] border-l-2 border-[#00ff41] pl-2" : "text-[#22aa22] hover:text-[#00ff41]"
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
