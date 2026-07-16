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
    <div className="relative min-h-[92vh] bg-[#020502] text-[#33ff33] font-mono p-4 flex flex-col items-center justify-center">
      
      {/* Visual overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-[0.06]" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-reflection opacity-[0.05]" />

      <div className="relative z-10 w-full max-w-3xl bg-[#050a05] border-2 border-[#1b3a1b] rounded-xl flex flex-col shadow-[0_0_35px_rgba(0,255,0,0.1)] h-[80vh] max-h-[700px] overflow-hidden">
        
        {/* Terminal Titlebar */}
        <div className="flex justify-between items-center text-[10px] text-[#1a551a] bg-black/60 border-b border-[#1b3a1b] px-4 py-2 font-bold uppercase tracking-widest select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>Node: Oracle AI Session</span>
          </div>
          <span>SIGNAL STRENGTH: 98%</span>
        </div>

        {/* Chat History Panel */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-black/40">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-lg border text-xs leading-relaxed font-mono ${
                    msg.role === "user"
                      ? "bg-[#0c220c] border-[#00ff41] text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.05)]"
                      : "bg-[#040804] border-[#1b3a1b] text-[#22cc22]"
                  }`}
                >
                  <div className="text-[8px] opacity-40 uppercase tracking-widest font-bold mb-1 select-none">
                    {msg.role === "user" ? "[ Operator ]" : "[ Oracle ]"}
                  </div>
                  <div className="whitespace-pre-wrap break-words">
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
              <div className="bg-[#040804] border border-[#1b3a1b] text-[#22cc22]/60 max-w-[80%] p-3.5 rounded-lg text-xs leading-relaxed font-mono animate-pulse">
                <div className="text-[8px] opacity-40 uppercase tracking-widest font-bold mb-1 select-none">
                  [ Oracle ]
                </div>
                <span>DECRYPTING COGNITIVE PAYLOAD...</span>
              </div>
            </motion.div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Prompt input Form */}
        <form 
          onSubmit={getResponse}
          className="border-t border-[#1b3a1b] bg-black/60 p-4 flex gap-3 select-none items-center"
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
            className="flex-1 bg-black/90 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono p-3 rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.1)] transition-all placeholder-[#1a551a]"
          />
          <button
            type="submit"
            className="px-6 py-3 border border-[#00ff41] text-[#00ff41] bg-black hover:bg-[#0c220c] font-bold text-xs tracking-widest uppercase rounded shadow-[0_0_10px_rgba(0,255,65,0.1)] hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] active:scale-95 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
