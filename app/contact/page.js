"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "../lib/useAudio";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusText, setStatusText] = useState("Awaiting Operator Input...");
  const { playClick, playBeep, playProcessing } = useAudio();

  const handleInputChange = (field, value) => {
    playClick();
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      playBeep();
      setStatusText("Error: All channels must be populated.");
      return;
    }
    
    playProcessing();
    setStatusText("TRANSMITTING ENCRYPTED PACKET...");
    setTimeout(() => {
      playBeep();
      setStatusText("TRANSMISSION SUCCESSFUL. SIGNAL SENT.");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="relative min-h-[92vh] bg-[#020502] text-[#33ff33] font-mono p-6 flex flex-col items-center justify-center select-none">
      
      {/* Scanline filters */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-[0.06]" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-reflection opacity-[0.05]" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-[#050a05] border-2 border-[#1b3a1b] rounded-xl p-8 shadow-[0_0_35px_rgba(0,255,0,0.1)] relative overflow-hidden"
      >
        {/* Terminal Titlebar */}
        <div className="flex justify-between items-center text-[10px] text-[#1a551a] border-b border-[#1b3a1b] pb-4 mb-6 font-bold uppercase tracking-widest">
          <span>Signal: Secure Comm Link</span>
          <span>Status: Secure</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
          <h1 className="text-xl font-bold tracking-widest text-[#00ff41] uppercase">
            SEND TRANSMISSION
          </h1>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          
          {/* Name Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#1a551a] tracking-wider">
              Operator Designation (Name)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-black/80 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono p-2.5 rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.1)] transition-all placeholder-[#1a551a]"
              placeholder="e.g. Neo"
              required
              autoComplete="off"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#1a551a] tracking-wider">
              Signal Freq / Node (Email)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-black/80 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono p-2.5 rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.1)] transition-all placeholder-[#1a551a]"
              placeholder="operator@matrix.net"
              required
              autoComplete="off"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#1a551a] tracking-wider">
              Signal Payload (Message)
            </label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="bg-black/80 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono p-2.5 rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.1)] transition-all placeholder-[#1a551a] resize-none"
              placeholder="Enter encryption message here..."
              required
            />
          </div>

          {/* Transmission status line */}
          <div className="text-[10px] text-[#1a551a] uppercase py-2 italic font-bold">
            &gt; {statusText}
          </div>

          {/* Transmission Action button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 border-2 border-[#00ff41] text-[#00ff41] bg-black hover:bg-[#0c220c] font-bold text-xs tracking-widest uppercase rounded shadow-[0_0_15px_rgba(0,255,65,0.15)] hover:shadow-[0_0_20px_rgba(0,255,65,0.35)] active:translate-y-0.5 active:shadow-[0_0_5px_rgba(0,255,65,0.1)] transition-all cursor-pointer"
            >
              [ TRANSMIT TRANSMISSION ]
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
