"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "AI Chatbot", href: "/AIchatbot" },
  { name: "Contact", href: "/contact" },
  { name: "Calculator", href: "/calculator" },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <nav className="flex items-center justify-between px-6 py-4 md:justify-center">

        {/* Logo / Title */}
        <div className="md:hidden text-lg font-bold">
          Matrix Hub
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer"
            >
              <Link
                href={item.href}
                className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
              >
                {item.name}
              </Link>

              {hovered === item.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-black" />
            <span className="block w-6 h-[2px] bg-black" />
            <span className="block w-6 h-[2px] bg-black" />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md shadow-md"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-black transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
