"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {  useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
export default function HomePage() {
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
          
          <div className="space-y-6">
            <DocCard
              title="1️⃣ Introduction to Matrices"
              text="A matrix is a rectangular array of numbers arranged in rows and columns. It represents linear transformations and systems of equations."
            />
            <DocCard
              title="2️⃣ Matrix Operations"
              text="Addition, subtraction, and scalar multiplication are element-wise operations. Multiplication involves dot products of rows and columns."
            />
            <DocCard
              title="3️⃣ Determinant & Inverse"
              text="The determinant indicates if a matrix is invertible. The inverse exists only for square matrices with non-zero determinant."
            />
            <DocCard
              title="4️⃣ Transpose & Symmetry"
              text="The transpose of a matrix swaps rows and columns. Symmetric matrices are equal to their transpose."
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <DocCard
              title="5️⃣ Rank & Linear Independence"
              text="The rank of a matrix indicates the number of linearly independent rows or columns — crucial for solving linear systems."
            />
            <DocCard
              title="6️⃣ Eigenvalues & Eigenvectors"
              text="Eigenvalues represent scaling factors; eigenvectors represent invariant directions under a linear transformation."
            />
            <DocCard
              title="7️⃣ Decompositions"
              text="LU, QR, and SVD decompositions are used to simplify solving systems, optimize computations, and analyze data."
            />
            <DocCard
              title="8️⃣ Applications"
              text="Matrices are used in graphics transformations, machine learning (PCA), networks, and solving real-world linear systems."
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} Matrix Explorer — Built by Krishana Yadav 🚀
      </footer>
    </main>
  );
}

function DocCard({ title, text }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative p-6 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(56,189,248,0.15), transparent 40%)`,
        }}
      />

      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600-to-violet-200 ">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed ">{text}</p>
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 border border-transparent rounded-2xl group-hover:border-blue-400/50 transition-all duration-300"></div>
    </motion.div>
  );
}