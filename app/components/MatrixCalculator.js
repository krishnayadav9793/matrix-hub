"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/useAudio";
import * as math from "../util/matrixMath";

const OPERATIONS = [
  { id: "add", name: "Addition [A+B]", double: true },
  { id: "subtract", name: "Subtraction [A-B]", double: true },
  { id: "multiply", name: "Multiplication [A*B]", double: true },
  { id: "transpose", name: "Transpose [Aᵀ]", double: false },
  { id: "determinent", name: "Determinant [det(A)]", double: false, squareOnly: true },
  { id: "inverse", name: "Inverse [A⁻¹]", double: false, squareOnly: true },
  { id: "trace", name: "Trace [tr(A)]", double: false, squareOnly: true },
  { id: "rank", name: "Rank [rank(A)]", double: false },
  { id: "eigonvalues-eigonvectors", name: "Eigenvalues [A-λI]", double: false, squareOnly: true, maxDim: 3 },
  { id: "diagonalization", name: "Diagonalization [PDP⁻¹]", double: false, squareOnly: true, maxDim: 3 },
  { id: "LUTransformation", name: "LU Decomposition [A=LU]", double: false, squareOnly: true },
  { id: "SVD", name: "SVD Decomposition [UΣVᵀ]", double: false, maxDim: 2, minDim: 2, squareOnly: true }
];

export default function MatrixCalculator({ initialOp = "add" }) {
  const [op, setOp] = useState(initialOp);
  const [powerOn, setPowerOn] = useState(true);
  const [crtFlicker, setCrtFlicker] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [rowA, setRowA] = useState(3);
  const [colA, setColA] = useState(3);
  const [rowB, setRowB] = useState(3);
  const [colB, setColB] = useState(3);

  const [matrixA, setMatrixA] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [matrixB, setMatrixB] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );

  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const canvasRef = useRef(null);
  const terminalBottomRef = useRef(null);

  // Audio effects hook
  const { muted, setMuted, playClick, playBeep, playProcessing } = useAudio();

  // Handle operation change
  const selectOp = (newOpId) => {
    playClick();
    setOp(newOpId);
    setResult(null);
    setSteps([]);
    setErrorMsg("");

    const targetOp = OPERATIONS.find(o => o.id === newOpId);
    if (targetOp) {
      // If square only, force dimensions to match
      if (targetOp.squareOnly) {
        setColA(rowA);
      }
      // Max dimensions check
      if (targetOp.maxDim && rowA > targetOp.maxDim) {
        setRowA(targetOp.maxDim);
        setColA(targetOp.maxDim);
      }
      // Min dimensions check
      if (targetOp.minDim) {
        setRowA(targetOp.minDim);
        setColA(targetOp.minDim);
      }
    }
  };

  // Dimensions adjustment helper
  const handleDimChange = (matrix, type, val) => {
    playClick();
    const num = Math.min(6, Math.max(1, parseInt(val) || 1));
    const targetOp = OPERATIONS.find(o => o.id === op);

    if (matrix === "A") {
      if (type === "row") {
        if (targetOp?.minDim && num < targetOp.minDim) return;
        if (targetOp?.maxDim && num > targetOp.maxDim) return;
        setRowA(num);
        if (targetOp?.squareOnly) setColA(num);
      } else {
        if (targetOp?.squareOnly) return;
        setColA(num);
      }
    } else {
      if (type === "row") {
        setRowB(num);
      } else {
        setColB(num);
      }
    }
    setResult(null);
    setSteps([]);
    setErrorMsg("");
  };

  // Auto synchronise matrix sizes when rows/cols change
  useEffect(() => {
    setMatrixA(prev => {
      const next = Array.from({ length: rowA }, (_, r) => 
        Array.from({ length: colA }, (_, c) => (prev[r] && prev[r][c] !== undefined ? prev[r][c] : 0))
      );
      return next;
    });
  }, [rowA, colA]);

  useEffect(() => {
    setMatrixB(prev => {
      const next = Array.from({ length: rowB }, (_, r) => 
        Array.from({ length: colB }, (_, c) => (prev[r] && prev[r][c] !== undefined ? prev[r][c] : 0))
      );
      return next;
    });
  }, [rowB, colB]);

  // Synchronise dimension rules based on current operation
  useEffect(() => {
    const targetOp = OPERATIONS.find(o => o.id === op);
    if (!targetOp) return;

    if (op === "multiply") {
      // Columns of A must equal rows of B
      setRowB(colA);
    } else if (op === "add" || op === "subtract") {
      // Dimensions of A must match B
      setRowB(rowA);
      setColB(colA);
    }
  }, [op, rowA, colA]);

  // Update specific cell values
  const handleCellChange = (matrixName, r, c, val) => {
    playClick();
    const floatVal = parseFloat(val);
    const finalVal = isNaN(floatVal) ? 0 : floatVal;

    if (matrixName === "A") {
      setMatrixA(prev => {
        const next = prev.map(row => [...row]);
        next[r][c] = finalVal;
        return next;
      });
    } else {
      setMatrixB(prev => {
        const next = prev.map(row => [...row]);
        next[r][c] = finalVal;
        return next;
      });
    }
  };

  // Perform Calculation
  const handleCalculate = () => {
    playProcessing();
    setLoading(true);
    setResult(null);
    setErrorMsg("");

    const loadingPhases = [
      "INITIALIZING NEURAL TRANSLATION PROCESSOR...",
      "FETCHING MEMORY REGISTER CELLS...",
      "REDUCING DIMENSIONAL INTERSECTORS...",
      "CALCULATING MATRIX EIGEN-BASIS COMPONENT...",
      "OUTPUTTING TERMINAL PHOSPHOR SCAN LINES..."
    ];

    let phaseIndex = 0;
    setLoadingText(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        setLoadingText(loadingPhases[phaseIndex]);
      }
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);

      let res = null;
      try {
        switch (op) {
          case "add":
            res = math.add(matrixA, matrixB);
            break;
          case "subtract":
            res = math.subtract(matrixA, matrixB);
            break;
          case "multiply":
            res = math.multiply(matrixA, matrixB);
            break;
          case "transpose":
            res = math.transpose(matrixA);
            break;
          case "determinent":
            res = math.determinant(matrixA);
            break;
          case "inverse":
            res = math.inverse(matrixA);
            break;
          case "trace":
            res = math.trace(matrixA);
            break;
          case "rank":
            res = math.rank(matrixA);
            break;
          case "eigonvalues-eigonvectors":
            res = math.eigenvaluesAndEigenvectors(matrixA);
            break;
          case "diagonalization":
            res = math.diagonalization(matrixA);
            break;
          case "LUTransformation":
            res = math.luDecomposition(matrixA);
            break;
          case "SVD":
            res = math.SVD(matrixA);
            break;
          default:
            res = { success: false, error: "Unknown matrix instruction" };
        }

        if (res && res.success) {
          setResult(res.result);
          setSteps(res.steps);
          playBeep();
        } else {
          setErrorMsg(res ? res.error : "Unknown calculation error occurred.");
          setSteps(res ? res.steps || [] : []);
          playBeep();
        }
      } catch (err) {
        setErrorMsg("System error while running algorithm. Check matrices structure.");
        console.error(err);
      }
    }, 1000);
  };

  // Matrix falling rain animation setup
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const cols = Math.floor(width / 18) + 1;
    const ypos = Array(cols).fill(0);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff41"; // Classic green Matrix code rain color
      ctx.font = "13px monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 18;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 13;
        }
      });
    };

    const loop = () => {
      drawMatrix();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [powerOn]);

  // Auto scroll terminal output
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [steps, loading, errorMsg]);

  // Quick helper to fill current matrix with random values
  const fillRandom = (name) => {
    playClick();
    const targetSet = name === "A" ? setMatrixA : setMatrixB;
    const rCount = name === "A" ? rowA : rowB;
    const cCount = name === "A" ? colA : colB;

    targetSet(
      Array.from({ length: rCount }, () =>
        Array.from({ length: cCount }, () => Math.floor(Math.random() * 20) - 10)
      )
    );
  };

  // Quick helper to clear current matrix values
  const fillClear = (name) => {
    playClick();
    const targetSet = name === "A" ? setMatrixA : setMatrixB;
    const rCount = name === "A" ? rowA : rowB;
    const cCount = name === "A" ? colA : colB;

    targetSet(
      Array.from({ length: rCount }, () => Array(cCount).fill(0))
    );
    setResult(null);
    setSteps([]);
  };

  const isDouble = OPERATIONS.find(o => o.id === op)?.double;

  return (
    <div className="relative min-h-[92vh] bg-[#020502] text-[#33ff33] font-mono p-4 flex flex-col items-center justify-center overflow-x-hidden selection:bg-[#00ff41] selection:text-black">
      {/* Code Rain Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Main realistic terminal structure */}
      <div className="relative w-full max-w-6xl z-10 bg-[#070d07] border-4 border-[#1b3a1b] rounded-2xl shadow-[0_0_50px_rgba(0,255,0,0.15)] flex flex-col md:flex-row overflow-hidden backdrop-blur-md">
        
        {/* PHYSICAL PANEL LEFT: Controls, Toggles, Modes */}
        <div className="w-full md:w-80 bg-[#050905] border-r-2 border-[#1b3a1b] p-5 flex flex-col justify-between select-none">
          <div>
            {/* Console Branding */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#1b3a1b] pb-4">
              <div className="w-4 h-4 rounded-full bg-[#00ff41] animate-ping" />
              <div className="text-sm font-bold tracking-widest text-[#00ff41]">
                MATRIX HUB v2.0
              </div>
            </div>

            {/* Hardware knobs & switches */}
            <div className="space-y-4 mb-6">
              <div className="text-xs text-[#1a551a] uppercase font-bold tracking-widest">
                Hardware Settings
              </div>

              {/* Power Switch */}
              <div className="flex items-center justify-between text-xs border border-[#1b3a1b] p-2 rounded bg-black/40">
                <span>CRT POWER</span>
                <button
                  onClick={() => {
                    playClick();
                    setPowerOn(!powerOn);
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    powerOn ? "bg-[#00ff41]" : "bg-red-900"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      powerOn ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between text-xs border border-[#1b3a1b] p-2 rounded bg-black/40">
                <span>AUDIO SYNTH</span>
                <button
                  onClick={() => setMuted(!muted)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    !muted ? "bg-[#00ff41]" : "bg-zinc-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      !muted ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Screen Filters */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <button
                  onClick={() => {
                    playClick();
                    setScanlines(!scanlines);
                  }}
                  className={`border border-[#1b3a1b] py-1 rounded bg-black/40 ${
                    scanlines ? "text-[#00ff41] bg-[#0c220c]" : "text-[#1a551a]"
                  }`}
                >
                  SCANLINES: {scanlines ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setCrtFlicker(!crtFlicker);
                  }}
                  className={`border border-[#1b3a1b] py-1 rounded bg-black/40 ${
                    crtFlicker ? "text-[#00ff41] bg-[#0c220c]" : "text-[#1a551a]"
                  }`}
                >
                  FLICKER: {crtFlicker ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Calculations selector list */}
            <div className="space-y-1">
              <div className="text-xs text-[#1a551a] uppercase font-bold tracking-widest mb-2">
                Operations Menu
              </div>
              <div className="h-64 overflow-y-auto pr-1 space-y-1 border border-[#1b3a1b] p-2 rounded bg-black/60 custom-scrollbar text-xs">
                {OPERATIONS.map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => selectOp(operation.id)}
                    className={`w-full text-left px-2 py-1.5 rounded transition-all duration-150 uppercase flex justify-between items-center ${
                      op === operation.id
                        ? "bg-[#00ff41] text-black font-bold shadow-[0_0_10px_rgba(0,255,65,0.4)]"
                        : "hover:bg-[#0a1f0a] hover:text-[#00ff41] text-[#22aa22]"
                    }`}
                  >
                    <span>{operation.name}</span>
                    {op === operation.id && <span className="text-[10px] animate-pulse">◀</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Console footer state info */}
          <div className="border-t border-[#1b3a1b] pt-4 mt-4 text-[10px] text-[#1a551a] space-y-1">
            <div>CONSOLE STATE: ONLINE</div>
            <div>SECTOR: MATRIX_CALC</div>
            <div>BUFFER: HEX_0x4FF8A</div>
          </div>
        </div>

        {/* CRT TERMINAL SCREEN RIGHT: Interactive Matrix Interface */}
        <div className="flex-1 flex flex-col bg-black relative p-6">
          {/* CRT Screen scanline & flicker effects */}
          {powerOn && scanlines && (
            <div className="absolute inset-0 pointer-events-none z-30 bg-scanlines opacity-[0.09]" />
          )}
          {powerOn && crtFlicker && (
            <div className="absolute inset-0 pointer-events-none z-30 bg-crt-flicker opacity-[0.02]" />
          )}
          
          {/* Glass curved reflection effect */}
          <div className="absolute inset-0 pointer-events-none z-30 bg-radial-reflection opacity-[0.1]" />

          {/* CRT Screen on/off animation container */}
          <AnimatePresence mode="wait">
            {!powerOn ? (
              <motion.div
                key="power-off-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-1 bg-[#010401] flex items-center justify-center border border-[#0d220d] rounded-lg shadow-inner min-h-[500px]"
              >
                <div className="text-center text-[#113311]">
                  <div className="text-4xl">🖳</div>
                  <div className="text-xs uppercase mt-2 tracking-widest">
                    CRT Monitor Offline. Flip Power Switch.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="power-on-screen"
                initial={{ scaleX: 0.005, scaleY: 0.005, opacity: 0.1 }}
                animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                {/* CRT terminal head banner */}
                <div className="flex justify-between items-center text-xs border border-[#1b3a1b] bg-[#050905] p-2 rounded mb-6 select-none shadow-[inset_0_0_10px_rgba(0,255,0,0.1)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="uppercase text-[#00ff41] font-bold">
                      {OPERATIONS.find((o) => o.id === op)?.name} Console
                    </span>
                  </div>
                  <div className="text-[10px] text-[#22aa22]">
                    [ GRID CONTROL CENTER ]
                  </div>
                </div>

                {/* MATRIX DIMENSIONS TACTILE SLIDERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border border-[#1b3a1b] p-4 rounded bg-[#030603] select-none">
                  {/* Matrix A Dimensions */}
                  <div className="space-y-3">
                    <div className="text-[10px] text-[#00ff41] uppercase tracking-wider font-bold">
                      Matrix A Grid Scale ({rowA}x{colA})
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs w-10">Rows:</span>
                      <input
                        type="range"
                        min="1"
                        max={OPERATIONS.find(o => o.id === op)?.maxDim || 6}
                        value={rowA}
                        onChange={(e) => handleDimChange("A", "row", e.target.value)}
                        className="flex-1 accent-[#00ff41] cursor-ew-resize bg-zinc-900 border border-[#1b3a1b] h-2 rounded-lg"
                      />
                      <span className="text-xs w-4 text-center text-[#00ff41]">{rowA}</span>
                    </div>

                    {!OPERATIONS.find((o) => o.id === op)?.squareOnly && (
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-10">Cols:</span>
                        <input
                          type="range"
                          min="1"
                          max={OPERATIONS.find(o => o.id === op)?.maxDim || 6}
                          value={colA}
                          onChange={(e) => handleDimChange("A", "col", e.target.value)}
                          className="flex-1 accent-[#00ff41] cursor-ew-resize bg-zinc-900 border border-[#1b3a1b] h-2 rounded-lg"
                        />
                        <span className="text-xs w-4 text-center text-[#00ff41]">{colA}</span>
                      </div>
                    )}
                    
                    {OPERATIONS.find((o) => o.id === op)?.squareOnly && (
                      <div className="text-[9px] text-[#1a551a] italic">
                        * Operation requires a square matrix. Dimensions forced ($n \times n$).
                      </div>
                    )}
                  </div>

                  {/* Matrix B Dimensions (Only displayed if Double Matrix operation) */}
                  {isDouble ? (
                    <div className="space-y-3 border-t md:border-t-0 md:border-l border-[#1b3a1b] pt-3 md:pt-0 md:pl-4">
                      <div className="text-[10px] text-[#00ff41] uppercase tracking-wider font-bold">
                        Matrix B Grid Scale ({rowB}x{colB})
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-10">Rows:</span>
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value={rowB}
                          disabled={op === "multiply" || op === "add" || op === "subtract"}
                          onChange={(e) => handleDimChange("B", "row", e.target.value)}
                          className={`flex-1 accent-[#00ff41] h-2 rounded-lg bg-zinc-900 border border-[#1b3a1b] ${
                            op === "multiply" || op === "add" || op === "subtract"
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-ew-resize"
                          }`}
                        />
                        <span className="text-xs w-4 text-center text-[#00ff41]">{rowB}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-10">Cols:</span>
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value={colB}
                          disabled={op === "add" || op === "subtract"}
                          onChange={(e) => handleDimChange("B", "col", e.target.value)}
                          className={`flex-1 accent-[#00ff41] h-2 rounded-lg bg-zinc-900 border border-[#1b3a1b] ${
                            op === "add" || op === "subtract"
                              ? "opacity-40 cursor-not-allowed"
                              : "cursor-ew-resize"
                          }`}
                        />
                        <span className="text-xs w-4 text-center text-[#00ff41]">{colB}</span>
                      </div>
                      <div className="text-[9px] text-[#1a551a] italic">
                        {op === "multiply"
                          ? "* Multiply size lock: Rows of B forced equals cols of A."
                          : "* Addition/Subtraction size lock: Dimensions of B must match A."}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border-t md:border-t-0 md:border-l border-[#1b3a1b] pt-3 md:pt-0 md:pl-4 text-[10px] text-[#1a551a] text-center italic">
                      Single matrix calculation. No auxiliary input grid required.
                    </div>
                  )}
                </div>

                {/* THE REALISTIC NEON GREEN GRID INPUTS */}
                <div className="flex flex-col xl:flex-row gap-6 items-center justify-center mb-6">
                  {/* MATRIX A DISPLAY */}
                  <div className="flex flex-col items-center">
                    <div className="text-[10px] text-[#22aa22] uppercase tracking-wider mb-2 font-bold select-none">
                      Input Matrix [A]
                    </div>
                    
                    {/* Matrix Grid brackets styling */}
                    <div className="flex items-center">
                      <div className="border-l-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-l" />
                      <div className="grid gap-2 p-3 bg-black/60 shadow-[inset_0_0_15px_rgba(0,255,0,0.05)] border border-[#1b3a1b] rounded mx-1">
                        {matrixA.map((row, r) => (
                          <div key={`rowA-${r}`} className="flex gap-2">
                            {row.map((cell, c) => (
                              <input
                                key={`cellA-${r}-${c}`}
                                type="number"
                                step="any"
                                value={cell === 0 && cell !== "" ? "" : cell}
                                placeholder="0"
                                onChange={(e) => handleCellChange("A", r, c, e.target.value)}
                                className="w-12 md:w-14 h-8 text-center bg-black/85 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono font-bold rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.2)] transition-all placeholder-[#1a551a]"
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="border-r-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-r" />
                    </div>

                    {/* Quick controls for Matrix A */}
                    <div className="flex gap-2 mt-3 select-none text-[10px]">
                      <button
                        onClick={() => fillRandom("A")}
                        className="px-2 py-0.5 border border-[#1b3a1b] rounded hover:bg-[#0c220c] hover:border-[#00ff41] transition-colors"
                      >
                        RANDOM
                      </button>
                      <button
                        onClick={() => fillClear("A")}
                        className="px-2 py-0.5 border border-[#1b3a1b] rounded hover:bg-[#220c0c] hover:border-red-500 transition-colors"
                      >
                        CLEAR
                      </button>
                    </div>
                  </div>

                  {/* OPERATOR SYMBOL IF DOUBLE */}
                  {isDouble && (
                    <div className="text-xl md:text-3xl font-bold text-[#00ff41] bg-[#0c220c] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#1b3a1b] rounded-full select-none shadow-[0_0_10px_rgba(0,255,0,0.1)]">
                      {op === "add" ? "+" : op === "subtract" ? "-" : "×"}
                    </div>
                  )}

                  {/* MATRIX B DISPLAY */}
                  {isDouble && (
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] text-[#22aa22] uppercase tracking-wider mb-2 font-bold select-none">
                        Input Matrix [B]
                      </div>
                      
                      {/* Matrix Grid brackets styling */}
                      <div className="flex items-center">
                        <div className="border-l-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-l" />
                        <div className="grid gap-2 p-3 bg-black/60 shadow-[inset_0_0_15px_rgba(0,255,0,0.05)] border border-[#1b3a1b] rounded mx-1">
                          {matrixB.map((row, r) => (
                            <div key={`rowB-${r}`} className="flex gap-2">
                              {row.map((cell, c) => (
                                <input
                                  key={`cellB-${r}-${c}`}
                                  type="number"
                                  step="any"
                                  value={cell === 0 && cell !== "" ? "" : cell}
                                  placeholder="0"
                                  onChange={(e) => handleCellChange("B", r, c, e.target.value)}
                                  className="w-12 md:w-14 h-8 text-center bg-black/85 border border-[#1b3a1b] text-[#00ff41] text-xs font-mono font-bold rounded focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] focus:outline-none shadow-[0_0_5px_rgba(0,100,0,0.2)] transition-all placeholder-[#1a551a]"
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="border-r-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-r" />
                      </div>

                      {/* Quick controls for Matrix B */}
                      <div className="flex gap-2 mt-3 select-none text-[10px]">
                        <button
                          onClick={() => fillRandom("B")}
                          className="px-2 py-0.5 border border-[#1b3a1b] rounded hover:bg-[#0c220c] hover:border-[#00ff41] transition-colors"
                        >
                          RANDOM
                        </button>
                        <button
                          onClick={() => fillClear("B")}
                          className="px-2 py-0.5 border border-[#1b3a1b] rounded hover:bg-[#220c0c] hover:border-red-500 transition-colors"
                        >
                          CLEAR
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* BIG TACTILE CALCULATE SWITCH BUTTON */}
                <div className="flex justify-center mb-6 select-none">
                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className={`group relative px-8 py-3.5 bg-black border-2 border-[#00ff41] text-[#00ff41] font-bold text-sm tracking-widest uppercase rounded shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] active:translate-y-0.5 active:shadow-[0_0_5px_rgba(0,255,65,0.1)] transition-all cursor-pointer ${
                      loading ? "opacity-50 cursor-wait" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-[#00ff41] opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                    <span>[ RUN MATRIX EVALUATION ]</span>
                  </button>
                </div>

                {/* THE TERMINAL DIAGNOSTIC LOG SCREEN: Calculation Results, Explanations */}
                <div className="flex-1 flex flex-col border border-[#1b3a1b] rounded bg-black/80 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] min-h-[250px]">
                  
                  {/* Terminal titlebar */}
                  <div className="flex justify-between items-center text-[10px] text-[#1a551a] bg-[#030603] border-b border-[#1b3a1b] px-3 py-1.5 select-none font-bold">
                    <span>TERMINAL DIAGNOSTICS & SYSTEM FEEDBACK</span>
                    <span>LOG_BUFFER: {steps.length + (loading ? 1 : 0)} RECORDS</span>
                  </div>

                  {/* Terminal console text output area */}
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#22aa22] space-y-2 h-72 custom-scrollbar">
                    
                    {/* Simulated Boot sequence text initially */}
                    {steps.length === 0 && !loading && !errorMsg && !result && (
                      <div className="space-y-1">
                        <div className="text-[#00ff41] font-bold">&gt; MAIN QUANTUM GRID LOADED SUCCESSFULLY.</div>
                        <div>&gt; READY FOR OPERATION DECOMPOSITION.</div>
                        <div>&gt; INPUT VALUES IN GIVEN CELLS AND CLICK RUN EVALUATION.</div>
                        <div className="text-[10px] text-[#1a551a] mt-4 font-bold uppercase">&gt; system status: stable. RAM capacity: 100% free. cores: active.</div>
                      </div>
                    )}

                    {/* Rendering processing diagnostics state */}
                    {loading && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[#00ff41]">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-green-500 animate-pulse" />
                          <span className="font-bold">{loadingText}</span>
                        </div>
                        <div className="text-[#1a551a] animate-pulse">
                          EVALUATING MULTIDIMENSIONAL MATRIX COEFFICIENTS...
                        </div>
                      </div>
                    )}

                    {/* Rendering evaluation steps if finished */}
                    {!loading && (steps.length > 0 || errorMsg || result) && (
                      <div className="space-y-2">
                        <div className="text-[#00ff41] font-bold border-b border-[#1a551a]/30 pb-1 flex justify-between">
                          <span>&gt; DIAGNOSTIC REPORT:</span>
                          <span className="text-[9px] text-[#1a551a]">COMPLETED</span>
                        </div>

                        {/* Calculations Steps listing */}
                        <div className="space-y-1 font-mono text-[#22cc22]">
                          {steps.map((step, idx) => (
                            <pre key={`step-${idx}`} className="whitespace-pre-wrap font-mono break-words leading-relaxed text-[11px]">
                              {step}
                            </pre>
                          ))}
                        </div>

                        {/* Errors report */}
                        {errorMsg && (
                          <div className="mt-4 p-3 bg-red-950/20 border border-red-900/60 rounded text-red-500">
                            <span className="font-bold font-mono">CRITICAL ERROR:</span> {errorMsg}
                          </div>
                        )}

                        {/* Rendering Matrix values Result */}
                        {result !== null && !errorMsg && (
                          <div className="mt-4 p-4 border border-[#00ff41]/50 rounded bg-[#030703]/70 shadow-[0_0_15px_rgba(0,255,0,0.05)]">
                            <div className="text-[#00ff41] font-bold text-xs uppercase tracking-wider mb-3 select-none flex items-center gap-1.5">
                              <span>▶</span> <span>EVALUATION RESULT MATRIX:</span>
                            </div>

                            {/* Render value result (Determinant, Trace, Rank) */}
                            {typeof result === "number" ? (
                              <div className="text-xl md:text-2xl font-bold font-mono text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">
                                {result.toFixed(4).replace(/\.0000$/, "")}
                              </div>
                            ) : result.L && result.U ? (
                              /* Render LU decomposition split result */
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Matrix L (Lower)</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.L)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Matrix U (Upper)</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.U)}
                                  </pre>
                                </div>
                              </div>
                            ) : result.U && result.Sigma && result.V ? (
                              /* Render SVD decomposition result */
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Matrix U</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.U)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Matrix Σ (Sigma)</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.Sigma)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Matrix Vᵀ (Transpose)</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.V)}
                                  </pre>
                                </div>
                              </div>
                            ) : result.eigenvalues && result.eigenvectors ? (
                              /* Render Eigenvalues/Eigenvectors result */
                              <div className="space-y-3">
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold">Eigenvalues (λ)</div>
                                  <div className="text-sm text-[#00ff41] font-bold font-mono">
                                    {result.eigenvalues.map((val, idx) => `λ${idx+1} = ${val.toFixed(4)}`).join(", ")}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold">Eigenvectors (v)</div>
                                  <div className="space-y-1 mt-1 text-sm text-[#00ff41] font-mono">
                                    {result.eigenvectors.map((vec, idx) => (
                                      <div key={`eigenvec-${idx}`}>
                                        v{idx+1} = [{vec.map(v => v.toFixed(4)).join(", ")}]
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : result.P && result.D && result.P_inv ? (
                              /* Render Diagonalization result A = PDP^-1 */
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Modal Matrix P</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.P)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Diagonal Matrix D</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.D)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-[#1a551a] uppercase font-bold mb-1">Modal Inverse P⁻¹</div>
                                  <pre className="text-sm text-[#00ff41] font-mono leading-relaxed">
                                    {math.formatMatrixStr(result.P_inv)}
                                  </pre>
                                </div>
                              </div>
                            ) : (
                              /* Render resulting output matrix */
                              <div className="flex items-center">
                                <div className="border-l-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-l" />
                                <div className="p-3 font-mono font-bold text-sm md:text-base leading-relaxed tracking-wider text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,0,0.4)]">
                                  {math.formatMatrixStr(result)}
                                </div>
                                <div className="border-r-4 border-t-4 border-b-4 border-[#00ff41] w-2.5 h-full self-stretch rounded-r" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div ref={terminalBottomRef} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Retro CSS styling inject */}
      <style jsx global>{`
        .bg-scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        .bg-crt-flicker {
          animation: crt-glow 0.15s infinite;
        }
        .bg-radial-reflection {
          background: radial-gradient(
            circle at 50% 15%,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 60%
          );
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020502;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1b3a1b;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00ff41;
        }
        @keyframes crt-glow {
          0% { opacity: 0.015; }
          50% { opacity: 0.025; }
          100% { opacity: 0.015; }
        }
      `}</style>
    </div>
  );
}
