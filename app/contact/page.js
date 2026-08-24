"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "../lib/useAudio";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusText, setStatusText] = useState("Awaiting secure connection...");
  const { playClick, playBeep, playProcessing } = useAudio();

  const handleInputChange = (field, value) => {
    playClick();
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      playBeep();
      setStatusText("All channels must be populated.");
      return;
    }
    
    playProcessing();
    setStatusText("TRANSMITTING SECURE PAYLOAD...");
    setTimeout(() => {
      playBeep();
      setStatusText("SIGNAL SENT. HOST CONFIRMED RECEIPT.");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="relative min-h-[92vh] bg-[#030712] text-slate-200 p-6 flex flex-col items-center justify-center select-none overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-gray-900/35 border border-gray-800/80 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Terminal Titlebar */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-gray-800 pb-4 mb-6 font-bold uppercase tracking-widest font-sans">
          <span>Signal: Secure Comm Link</span>
          <span>Status: Secure</span>
        </div>

        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
          <h1 className="text-xl font-extrabold tracking-wider text-white uppercase font-sans">
            Send Transmission
          </h1>
        </div>

        <form onSubmit={handleSend} className="space-y-5 relative z-10 font-sans">
          
          {/* Name Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Operator Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-gray-950/40 border border-gray-800 text-slate-200 text-xs p-3 rounded-xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-700"
              placeholder="e.g. Neo"
              required
              autoComplete="off"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Signal Node (Email)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-gray-950/40 border border-gray-800 text-slate-200 text-xs p-3 rounded-xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-700"
              placeholder="operator@matrix.net"
              required
              autoComplete="off"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Encryption Message (Payload)
            </label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="bg-gray-950/40 border border-gray-800 text-slate-200 text-xs p-3 rounded-xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-700 resize-none"
              placeholder="Enter message text here..."
              required
            />
          </div>

          {/* Transmission status line */}
          <div className="text-[10px] text-slate-500 uppercase py-1 italic font-bold font-mono">
            &gt; {statusText}
          </div>

          {/* Transmission Action button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.45)] active:translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Transmit Signal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
