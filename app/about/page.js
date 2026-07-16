"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-[92vh] bg-[#020502] text-[#33ff33] font-mono p-6 flex flex-col items-center justify-center select-none">
      
      {/* Scanlines overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-[0.06]" />
      
      {/* Glass curved reflection effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-reflection opacity-[0.05]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-[#050a05] border-2 border-[#1b3a1b] rounded-xl p-8 shadow-[0_0_35px_rgba(0,255,0,0.1)] relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center text-[10px] text-[#1a551a] border-b border-[#1b3a1b] pb-4 mb-6 font-bold uppercase tracking-widest">
          <span>Module: About Mainframe</span>
          <span>Buffer: System Profile</span>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00ff41] rounded-full animate-ping" />
            <h1 className="text-xl font-bold tracking-widest text-[#00ff41] uppercase">
              System Specifications
            </h1>
          </div>

          <p className="text-sm leading-relaxed text-[#22cc22]">
            Welcome to Matrix Hub. This terminal is designed as an interactive portal mapping the mathematical domain of matrix transformations. It serves as a linear directory compiling notation, properties, and algebraic definitions.
          </p>

          <p className="text-sm leading-relaxed text-[#22cc22]">
            Beyond simple lookup tables, Matrix Hub integrates a full-scale, Web-Audio-powered computational console capable of executing multidimensional matrix operations (addition, determinants, eigenvectors, LU decompositions, SVDs) with step-by-step row reduction analysis.
          </p>

          {/* Diagnostic variables list */}
          <div className="mt-8 border border-[#1b3a1b]/60 bg-black/40 p-4 rounded text-xs space-y-1 text-[#1a551a]">
            <div>&gt; HOSTNAME: NEBUCHADNEZZAR_CELL</div>
            <div>&gt; ENGINE: NEXT.JS + REACT</div>
            <div>&gt; CORE SYSTEMS: DEPLOYED (100% ONLINE)</div>
            <div>&gt; STABLE SECTOR: LYNX_PROJ_92</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
