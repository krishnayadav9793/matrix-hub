"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-[92vh] bg-[#030712] text-slate-200 p-6 flex flex-col items-center justify-center select-none overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl bg-gray-900/35 border border-gray-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Decorative glowing gradient inside modal */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Terminal Header */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-gray-800 pb-4 mb-6 font-bold uppercase tracking-widest font-sans">
          <span>Module: System Specifications</span>
          <span>Security status: SECURE</span>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
            <h1 className="text-xl font-extrabold tracking-wider text-white uppercase font-sans">
              Matrix Hub Profile
            </h1>
          </div>

          <p className="text-sm leading-relaxed text-slate-350 font-sans">
            Welcome to Matrix Hub. This application is designed as an interactive portal mapping the mathematical domain of matrix transformations, vector arithmetic, coordinate projections, and linear decompositions.
          </p>

          <p className="text-sm leading-relaxed text-slate-350 font-sans">
            Beyond standard static lookup tables, Matrix Hub integrates a full-scale, Web-Audio-powered computational console capable of executing multidimensional matrix operations (addition, multiplication, determinants, inverses, eigenvalues, rank, and trace) alongside advanced decompositions (LU and SVD) with step-by-step row reduction diagnostics.
          </p>

          {/* Diagnostic variables list */}
          <div className="mt-8 border border-gray-800/60 bg-gray-950/40 p-4 rounded-xl text-xs space-y-1.5 text-slate-400 font-mono shadow-inner">
            <div className="flex gap-1.5"><span className="text-emerald-500">&gt;</span> <span>HOSTNAME: MATRIX_COGNITIVE_NODE</span></div>
            <div className="flex gap-1.5"><span className="text-emerald-500">&gt;</span> <span>ENGINE: NEXT.JS 16 + REACT 19</span></div>
            <div className="flex gap-1.5"><span className="text-emerald-500">&gt;</span> <span>UI FRAMEWORK: TAILWIND CSS V4 + MOTION</span></div>
            <div className="flex gap-1.5"><span className="text-emerald-500">&gt;</span> <span>SECTOR STABLE: DEPLOYED (100% OPERATIONAL)</span></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
