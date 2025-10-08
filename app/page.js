"use client";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ---------- MAIN PAGE ----------
export default function HomePage() {
  const topics = [
    "Introduction to Matrices",
    "Matrix Operations",
    "Determinant & Inverse",
    "Transpose & Symmetry",
    "Rank & Linear Independence",
    "Eigenvalues & Eigenvectors",
    "Decompositions",
    "Applications",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center text-center px-6 py-16">
      {/* Hero Section */}
      <section className="max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
        >
          The Matrix Hub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Dive deep into the world of matrices — learn, calculate, visualize, and understand
          everything about matrices in one beautiful interactive place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Link
            href="/calculator"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Launch Calculator
          </Link>
          <Link
            href="#docs"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
          >
            Read Documentation
          </Link>
        </motion.div>
      </section>

      {/* Decorative line */}
      <div className="h-[2px] w-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full my-12"></div>

      {/* Documentation Section */}
      <section id="docs" className="max-w-5xl text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          Matrix Documentation
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-1 gap-8"
        >
          {topics.map((topic, index) => (
            <DocCard key={index} title={`${index + 1}️⃣ ${topic}`} promptTopic={topic} />
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} Matrix Explorer — Built by Krishana Yadav 🚀
      </footer>
    </main>
  );
}

// ---------- DOCCARD COMPONENT ----------
export function DocCard({ title, promptTopic }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("Loading...");

  
  useEffect(() => {
    async function fetchGeminiData() {
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Explain ${promptTopic} in detail in simple, easy-to-understand text format only. No salutations.`,
          }),
        });
        const data = await res.json();
        setContent(data.text || "No data received.");
      } catch (err) {
        console.error(err);
        setContent("Failed to load from Gemini.");
      }
    }

    fetchGeminiData();
  }, [promptTopic]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative p-6 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      {/* Hover light effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(56,189,248,0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h3>

        {/* Expand/Collapse with animation */}
        <AnimatePresence initial={false}>
          {!isOpen ? (
            <motion.p
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-600 leading-relaxed line-clamp-1"
            >
              {content}
            </motion.p>
          ) : (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 leading-relaxed mt-2"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Border glow */}
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-blue-400/50 transition-all duration-300"></div>
    </motion.div>
  );
}
