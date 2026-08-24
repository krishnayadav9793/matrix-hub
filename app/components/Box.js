"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Popup from "reactjs-popup";
import { def } from '../util/def.js';
import { useAudio } from "../lib/useAudio";

export default function Box({ category, indexBadge, categoryTitle, children }) {
  const [con, setCon] = useState("Loading definition data...");
  const { playClick, playProcessing } = useAudio();

  // Normalize inputs for safety (if parent is not passing them explicitly)
  const displayTitle = categoryTitle || category;
  const displayBadge = indexBadge || "•";

  const formatCon = (terms) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 className="text-white text-lg font-bold border-b border-gray-800 pb-2.5 font-sans tracking-wide">
          {terms.term}
        </h2>
        <p className="text-sm leading-relaxed text-slate-300 font-sans break-words whitespace-pre-wrap">
          {terms.description}
        </p>
        {terms.example && (
          <div className="mt-5 p-4 bg-gray-950/60 border border-gray-800/80 rounded-xl text-xs">
            <div className="text-emerald-400 font-semibold uppercase mb-2 text-[10px] tracking-widest font-sans">
              Example Usage
            </div>
            <pre className="font-mono text-slate-300 whitespace-pre-wrap select-all bg-gray-900/40 p-2.5 rounded-lg border border-gray-800/40">
              {terms.example}
            </pre>
          </div>
        )}
      </motion.div>
    );
  };

  const loadData = (itemName) => {
    playProcessing();
    let found = false;
    
    for (const cat of def) {
      for (const terms of cat.definitions) {
        if (terms.term === itemName) {
          const formattedCon = formatCon(terms);
          setCon(formattedCon);
          found = true;
          break;
        }
      }
      if (found) break;
    }
    
    if (!found) {
      setCon(
        <div className="text-rose-400 font-sans text-sm p-4 text-center border border-rose-500/20 rounded-xl bg-rose-955/10">
          Definition data not found in catalog logs.
        </div>
      );
    }
  };

  // Safe wrapper to handle kids conversion
  const childrenArray = Array.isArray(children) ? children : children ? [children] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 rounded-2xl bg-gray-900/25 border border-gray-800/80 shadow-lg hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group select-none"
    >
      {/* Decorative overlapping back number */}
      {indexBadge && (
        <div className="absolute -right-2 -bottom-6 text-8xl font-black text-gray-850/10 pointer-events-none select-none font-mono group-hover:text-emerald-500/5 transition-colors duration-300">
          {displayBadge}
        </div>
      )}

      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest border-b border-gray-800/80 pb-3.5 mb-5 flex items-center gap-2 font-sans">
        <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
        {indexBadge && <span className="text-slate-500 font-medium font-mono mr-0.5">{displayBadge}.</span>}
        <span>{displayTitle}</span>
      </h3>

      <div className="flex flex-wrap gap-2.5 relative z-10">
        {childrenArray.map((item, i) => {
          const conceptName = item.props?.children || item;
          return (
            <Popup
              key={i}
              trigger={
                <button
                  onClick={() => {
                    playClick();
                    loadData(conceptName);
                  }}
                  className="px-3 py-2 bg-gray-900/60 border border-gray-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 rounded-xl text-xs font-medium tracking-wide shadow-sm hover:shadow-[0_4px_12px_rgba(16,185,129,0.1)] active:scale-95 transition-all cursor-pointer font-sans"
                >
                  {conceptName}
                </button>
              }
              modal
              nested
              lockScroll
              closeOnDocumentClick={true}
              overlayStyle={{
                background: "rgba(3, 7, 18, 0.75)",
                backdropFilter: "blur(8px)",
                position: "fixed",
                inset: 0,
                zIndex: 100,
              }}
            >
              {(close) => (
                <div className="relative p-6 border border-gray-800 bg-[#0b0f19] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] w-full max-w-lg mx-auto text-slate-200 font-sans overflow-hidden">
                  
                  {/* Decorative glowing gradient background inside modal */}
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Main panel */}
                  <div className="relative z-20 flex flex-col justify-center">
                    
                    {/* Close cross */}
                    <button
                      className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-950/40 border border-gray-800 hover:border-gray-700 text-slate-400 hover:text-white text-base cursor-pointer transition-colors shadow-sm"
                      onClick={() => {
                        playClick();
                        setCon("Loading definition data...");
                        close();
                      }}
                    >
                      &times;
                    </button>

                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 font-sans">
                      Matrix Concept Catalog
                    </div>

                    <div className="min-h-[140px] mb-5 border border-gray-800/80 bg-gray-950/30 p-4 rounded-xl text-sm leading-relaxed text-slate-300 custom-scrollbar overflow-y-auto font-sans">
                      {con}
                    </div>

                    <div className="flex gap-3 justify-end border-t border-gray-900 pt-4">
                      <button
                        className="px-4 py-2 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-slate-300 rounded-lg text-xs font-semibold tracking-wide hover:text-white transition-all cursor-pointer"
                        onClick={() => {
                          playClick();
                          setCon("Loading definition data...");
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          );
        })}
      </div>
    </motion.div>
  );
}
