"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/useAudio";

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "NEURAL NETWORK OPERATIONAL. I AM THE ORACLE. ASK YOUR DOUBTS REGARDING THE MATRIX OR COMPUTATIONS."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);
  const { playClick, playBeep, playProcessing } = useAudio();

  const getResponse = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    playProcessing();
    const prompt = inputText;
    setInputText("");

    // Add user message to state
    const userMsg = { id: Date.now() + "-user", role: "user", text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt })
      });

      const data = await response.json();
      playBeep();

      const cleanedText = data.output
        ? data.output
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/#+/g, "")
            .replace(/[`>]/g, "")
            .trim()
        : "UNABLE TO DECRYPT RESPONSE.";

      const aiMsg = { id: Date.now() + "-ai", role: "assistant", text: cleanedText };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      playBeep();
      const errMsg = { id: Date.now() + "-err", role: "assistant", text: "TRANSMISSION INTERRUPTION. RE-ESTABLISHING HOST CONTEXT..." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom when messages or loading changes
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className="relative min-h-[92vh] bg-[#030712] text-slate-200 p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl bg-gray-900/35 border border-gray-800/80 rounded-2xl flex flex-col shadow-2xl h-[80vh] max-h-[700px] overflow-hidden backdrop-blur-md">
        
        {/* Terminal Titlebar */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 bg-gray-950/80 border-b border-gray-850 px-5 py-3 font-bold uppercase tracking-widest select-none font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span>Node: Oracle AI Session</span>
          </div>
          <span>SIGNAL: 100% ONLINE</span>
        </div>

        {/* Chat History Panel */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 custom-scrollbar bg-gray-950/10">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl border text-xs leading-relaxed font-sans ${
                    msg.role === "user"
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-350 shadow-sm"
                      : "bg-gray-900/40 border-gray-800/80 text-slate-300"
                  }`}
                >
                  <div className="text-[8px] opacity-40 uppercase tracking-widest font-bold mb-1.5 select-none font-mono">
                    {msg.role === "user" ? "Operator" : "Oracle"}
                  </div>
                  <div className="whitespace-pre-wrap break-words leading-relaxed font-sans">
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-900/40 border border-gray-800/80 text-slate-400 max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-sans animate-pulse">
                <div className="text-[8px] opacity-40 uppercase tracking-widest font-bold mb-1.5 select-none font-mono">
                  Oracle
                </div>
                <span className="font-mono text-[10px] tracking-wide">DECRYPTING COGNITIVE PAYLOAD...</span>
              </div>
            </motion.div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Prompt input Form */}
        <form 
          onSubmit={getResponse}
          className="border-t border-gray-850 bg-gray-950/60 p-4 flex gap-3 select-none items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              playClick();
              setInputText(e.target.value);
            }}
            placeholder="Query the Oracle..."
            autoComplete="off"
            className="flex-1 bg-gray-900/60 border border-gray-800 text-slate-200 text-xs p-3 rounded-xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-600 font-sans"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>
    </div>
  );
}
