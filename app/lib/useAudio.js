"use client";

import { useEffect, useRef, useState } from "react";

export function useAudio() {
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef(null);

  // Initialize audio context
  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClick = () => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio click failed", e);
    }
  };

  const playBeep = () => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.setValueAtTime(1500, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio beep failed", e);
    }
  };

  const playProcessing = () => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Play a quick sequence of 3 rapid blips
      const times = [0, 0.06, 0.12];
      const freqs = [600, 900, 1200];

      times.forEach((t, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + t);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.05);
      });
    } catch (e) {
      console.warn("Audio processing sound failed", e);
    }
  };

  return {
    muted,
    setMuted: (val) => {
      setMuted(val);
      // Play a small beep to acknowledge state change
      if (!val) {
        setTimeout(() => playBeep(), 50);
      }
    },
    playClick,
    playBeep,
    playProcessing
  };
}
