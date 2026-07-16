"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Popup from "reactjs-popup";
import { def } from '../util/def.js';
import { useAudio } from "../lib/useAudio";

export default function Box({ category, children }) {
  const [con, setCon] = useState("Click button to get Data");
  const { playClick, playBeep, playProcessing } = useAudio();

  const formatCon = (terms) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 className="text-[#00ff41] text-lg font-bold border-b border-[#1b3a1b] pb-2 font-mono uppercase tracking-wider">
          {terms.term}
        </h2>
        <div className="text-sm leading-relaxed text-[#22cc22] font-mono break-words whitespace-pre-wrap">
          {terms.description}
        </div>
        {terms.example && (
          <div className="mt-4 p-3 bg-[#060c06] border border-[#1b3a1b] rounded text-xs">
            <div className="text-[#00ff41] font-bold uppercase mb-1.5 text-[10px] tracking-widest">
              [ Example Usage ]
            </div>
            <pre className="font-mono text-[#00ff41]/80 whitespace-pre-wrap select-all">
              {terms.example}
            </pre>
          </div>
        )}
      </motion.div>
    );
  };

  const Getdata = (item) => {
    playProcessing();
    let found = false;
    def.forEach(element => {
      element.definitions.forEach(terms => {
        if (terms.term === item.props.children) {
          const formattedCon = formatCon(terms);
          setCon(formattedCon);
          found = true;
        }
      });
    });
    if (!found) {
      setCon(<div className="text-red-500 font-mono">Definition file record not found.</div>);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-6 rounded-xl bg-black/40 border border-[#1b3a1b] shadow-[0_0_20px_rgba(0,255,0,0.02)] hover:shadow-[0_0_25px_rgba(0,255,65,0.06)] hover:border-[#22aa22] transition-all duration-300 backdrop-blur-sm my-6 select-none"
    >
      <h2 className="text-base font-bold text-[#00ff41] uppercase tracking-widest border-b border-[#1b3a1b] pb-3 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse" />
        {category}
      </h2>

      <div className="flex flex-wrap gap-3">
        {children.map((item, i) => (
          <Popup
            key={i}
            trigger={
              <button
                onClick={playClick}
                className="px-3.5 py-1.5 bg-black/60 border border-[#1b3a1b] rounded text-xs tracking-wider shadow-sm hover:border-[#00ff41] hover:text-[#00ff41] active:scale-95 transition-all text-[#22cc22] font-mono cursor-pointer uppercase"
              >
                {item.props.children}
              </button>
            }
            modal
            nested
            lockScroll
            closeOnDocumentClick={false}
            overlayStyle={{
              background: "rgba(0, 5, 0, 0.75)",
              backdropFilter: "blur(4px)",
              position: "fixed",
              inset: 0,
              zIndex: 50,
            }}
          >
            {(close) => (
              <div className="relative p-6 border-2 border-[#00ff41] bg-[#020502] rounded-xl shadow-[0_0_40px_rgba(0,255,65,0.25)] w-full max-w-lg mx-auto text-[#22aa22] font-mono overflow-hidden">
                
                {/* Scanlines visual element */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-[0.07]" />
                <div className="absolute inset-0 pointer-events-none z-10 bg-crt-flicker opacity-[0.015]" />
                <div className="absolute inset-0 pointer-events-none z-10 bg-radial-reflection opacity-[0.05]" />

                {/* Main panel */}
                <div className="relative z-20 flex flex-col justify-center">
                  
                  {/* Close cross */}
                  <button
                    className="absolute top-0 right-0 text-xl text-[#22aa22] hover:text-[#00ff41] font-bold cursor-pointer transition-colors"
                    onClick={() => {
                      playClick();
                      setCon("Click button to get Data");
                      close();
                    }}
                  >
                    &times;
                  </button>

                  <div className="text-[10px] text-[#1a551a] font-bold uppercase tracking-widest mb-4">
                    [ Mainframe query cell ]
                  </div>

                  <div className="min-h-[160px] mb-6 border border-[#1b3a1b]/60 bg-black/50 p-4 rounded text-xs custom-scrollbar overflow-y-auto">
                    {con}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      className="px-4 py-2 border border-[#00ff41] text-[#00ff41] rounded text-xs font-bold tracking-widest uppercase hover:bg-[#0c220c] active:scale-95 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,65,0.1)]"
                      onClick={() => Getdata(item)}
                    >
                      Retrieve Data
                    </button>
                    <button
                      className="px-4 py-2 border border-red-950 text-red-500 rounded text-xs font-bold tracking-widest uppercase hover:bg-red-950/20 active:scale-95 transition-all cursor-pointer"
                      onClick={() => {
                        playClick();
                        setCon("Click button to get Data");
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
        ))}
      </div>
    </motion.div>
  );
}
