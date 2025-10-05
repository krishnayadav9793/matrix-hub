"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [hovered, setHovered] = useState(null);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <nav className="flex justify-center space-x-8 py-4">
        {navItems.map((item) => (
          <div
            key={item.name}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative group cursor-pointer"
          >
            <Link
              href={item.href}
              className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
            >
              {item.name}
            </Link>

            {/* Animated underline */}
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
      </nav>
    </header>
  );
}
