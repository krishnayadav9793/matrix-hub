"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../lib/useAudio";
import * as math from "../util/matrixMath";

const OPERATIONS = [
  // Arithmetic Group
  { id: "add", name: "Addition [A+B]", double: true, group: "Arithmetic" },
  { id: "subtract", name: "Subtraction [A-B]", double: true, group: "Arithmetic" },
  { id: "multiply", name: "Multiplication [A*B]", double: true, group: "Arithmetic" },
  { id: "transpose", name: "Transpose [Aᵀ]", double: false, group: "Arithmetic" },
  
  // Properties Group
  { id: "determinent", name: "Determinant [det(A)]", double: false, squareOnly: true, group: "Properties" },
  { id: "inverse", name: "Inverse [A⁻¹]", double: false, squareOnly: true, group: "Properties" },
  { id: "trace", name: "Trace [tr(A)]", double: false, squareOnly: true, group: "Properties" },
  { id: "rank", name: "Rank [rank(A)]", double: false, group: "Properties" },
  
  // Advanced & Decompositions
  { id: "eigonvalues-eigonvectors", name: "Eigenvalues [A-λI]", double: false, squareOnly: true, maxDim: 3, group: "Decomposition" },
  { id: "diagonalization", name: "Diagonalization [PDP⁻¹]", double: false, squareOnly: true, maxDim: 3, group: "Decomposition" },
  { id: "LUTransformation", name: "LU Decomposition [A=LU]", double: false, squareOnly: true, group: "Decomposition" },
  { id: "SVD", name: "SVD Decomposition [UΣVᵀ]", double: false, maxDim: 2, minDim: 2, squareOnly: true, group: "Decomposition" }
];

function Switch({ checked, onChange, label }) {
  return (
    <div className="flex items-center justify-between text-xs py-1.5 font-sans">
      <span className="text-slate-400 font-medium">{label}</span>
      <button
        onClick={onChange}
        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
          checked ? "bg-emerald-500" : "bg-gray-800"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function MatrixCalculator({ initialOp = "add" }) {
  const [op, setOp] = useState(initialOp);
  const [powerOn, setPowerOn] = useState(true);
  const [crtFlicker, setCrtFlicker] = useState(false);
  const [scanlines, setScanlines] = useState(false);
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
      setRowB(colA);
    } else if (op === "add" || op === "subtract") {
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
      "INITIALIZING NUMERICAL PROCESSOR...",
      "FETCHING REGISTER DATA CELLS...",
      "REDUCING MATRIX DIMENSIONS...",
      "EVALUATING COEFFICIENTS...",
      "RENDERING COMPUTE BUFFERS..."
    ];

    let phaseIndex = 0;
    setLoadingText(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        setLoadingText(loadingPhases[phaseIndex]);
      }
    }, 150);

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
        setErrorMsg("Matrix computation error. Check cell inputs.");
        console.error(err);
      }
    }, 800);
  };

  // Matrix falling rain animation setup
  useEffect(() => {
    if (!canvasRef.current || !powerOn) return;
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
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#10b981";
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

  // Group operations for cleaner list layout
  const groupedOps = {
    Arithmetic: OPERATIONS.filter(o => o.group === "Arithmetic"),
    Properties: OPERATIONS.filter(o => o.group === "Properties"),
    Decomposition: OPERATIONS.filter(o => o.group === "Decomposition")
  };

  return (
    <div className="relative min-h-[92vh] bg-[#030712] text-slate-200 p-4 md:p-6 flex flex-col items-center justify-center overflow-x-hidden">
      
      {/* Background Glowing Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Code Rain Overlay */}
      {powerOn && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      )}

      {/* Main modern dashboard structure */}
      <div className="relative w-full max-w-6xl z-10 bg-gray-950/60 border border-gray-800/80 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden backdrop-blur-md">
        
        {/* PANEL LEFT: Controls & Operations Selector */}
        <div className="w-full md:w-80 bg-gray-900/35 border-b md:border-b-0 md:border-r border-gray-800/60 p-5 flex flex-col justify-between select-none">
          <div className="space-y-6">
            
            {/* Console Branding */}
            <div className="flex items-center gap-2 border-b border-gray-800/85 pb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <div className="text-sm font-extrabold tracking-wider text-slate-100 font-sans">
                WORKSTATION <span className="text-emerald-400 font-light">CONSOLE</span>
              </div>
            </div>

            {/* Dashboard settings switches */}
            <div className="space-y-2 border border-gray-800/60 p-4 rounded-xl bg-gray-950/20">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2 font-sans">
                Workspace Customizer
              </div>
              <Switch 
                checked={powerOn} 
                onChange={() => { playClick(); setPowerOn(!powerOn); }} 
                label="Ambient Canvas Rain" 
              />
              <Switch 
                checked={!muted} 
                onChange={() => setMuted(!muted)} 
                label="Audio Synthesizer" 
              />
              <Switch 
                checked={scanlines} 
                onChange={() => { playClick(); setScanlines(!scanlines); }} 
                label="CRT Phosphor Lines" 
              />
              <Switch 
                checked={crtFlicker} 
                onChange={() => { playClick(); setCrtFlicker(!crtFlicker); }} 
                label="CRT Screen Flicker" 
              />
            </div>

            {/* Operations selector */}
            <div className="space-y-4">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-sans">
                Select Operation
              </div>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {Object.entries(groupedOps).map(([groupName, ops]) => (
                  <div key={groupName} className="space-y-1">
                    <h4 className="text-[9px] font-bold text-slate-650 uppercase tracking-widest pl-2 mb-1.5 font-sans">
                      {groupName}
                    </h4>
                    <div className="space-y-1">
                      {ops.map((operation) => (
                        <button
                          key={operation.id}
                          onClick={() => selectOp(operation.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 text-xs font-semibold font-sans tracking-wide flex justify-between items-center ${
                            op === operation.id
                              ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm"
                              : "hover:bg-gray-900 hover:text-slate-200 text-slate-400 border border-transparent"
                          }`}
                        >
                          <span>{operation.name}</span>
                          {op === operation.id && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="border-t border-gray-900 pt-4 mt-6 text-[10px] text-slate-500 space-y-0.5 font-mono">
            <div>STATUS: CONSOLE ONLINE</div>
            <div>MEMORY: DEALLOCATED</div>
          </div>
        </div>

        {/* WORKSPACE RIGHT: Interactive Grid & Results */}
        <div className="flex-1 flex flex-col bg-[#030712]/40 relative p-6">
          
          {/* CRT Filters overlay */}
          {powerOn && scanlines && (
            <div className="absolute inset-0 pointer-events-none z-30 bg-scanlines opacity-[0.05]" />
          )}
          {powerOn && crtFlicker && (
            <div className="absolute inset-0 pointer-events-none z-30 bg-crt-flicker opacity-[0.01]" />
          )}
          
          <div className="absolute inset-0 pointer-events-none z-30 bg-radial-reflection opacity-[0.03]" />

          <AnimatePresence mode="wait">
            {!powerOn ? (
              <motion.div
                key="power-off-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex-1 bg-gray-950/20 border border-gray-900 rounded-2xl flex items-center justify-center min-h-[480px]"
              >
                <div className="text-center text-slate-550 select-none">
                  <div className="text-5xl mb-3">🖳</div>
                  <div className="text-xs uppercase tracking-widest font-sans font-bold">
                    Workspace Monitor Disabled. Turn on Ambient Canvas Rain.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="power-on-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full flex-1 flex flex-col space-y-6"
              >
                {/* Header status bar */}
                <div className="flex justify-between items-center text-xs border border-gray-800/80 bg-gray-900/40 p-3 rounded-xl select-none shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-extrabold text-slate-200 uppercase font-sans tracking-wider">
                      {OPERATIONS.find((o) => o.id === op)?.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-sans">
                    Workplace Grid
                  </div>
                </div>

                {/* MATRIX GRID DIMENSIONS SCALERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-850 bg-gray-900/10 p-5 rounded-2xl select-none">
                  
                  {/* Matrix A Scaler */}
                  <div className="space-y-3.5">
                    <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold font-sans">
                      Matrix A Scale ({rowA} × {colA})
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-12 font-sans font-medium">Rows:</span>
                        <input
                          type="range"
                          min="1"
                          max={OPERATIONS.find(o => o.id === op)?.maxDim || 6}
                          value={rowA}
                          onChange={(e) => handleDimChange("A", "row", e.target.value)}
                          className="flex-1 accent-emerald-500 cursor-ew-resize bg-gray-800 h-1.5 rounded-lg border-none outline-none"
                        />
                        <span className="text-xs font-mono font-bold w-4 text-emerald-400 text-center">{rowA}</span>
                      </div>

                      {!OPERATIONS.find((o) => o.id === op)?.squareOnly && (
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-12 font-sans font-medium">Columns:</span>
                          <input
                            type="range"
                            min="1"
                            max={OPERATIONS.find(o => o.id === op)?.maxDim || 6}
                            value={colA}
                            onChange={(e) => handleDimChange("A", "col", e.target.value)}
                            className="flex-1 accent-emerald-500 cursor-ew-resize bg-gray-800 h-1.5 rounded-lg border-none outline-none"
                          />
                          <span className="text-xs font-mono font-bold w-4 text-emerald-400 text-center">{colA}</span>
                        </div>
                      )}
                    </div>
                    
                    {OPERATIONS.find((o) => o.id === op)?.squareOnly && (
                      <div className="text-[9px] text-slate-500 italic font-sans">
                        * Square matrix restriction active. Rows and columns locked ($n \times n$).
                      </div>
                    )}
                  </div>

                  {/* Matrix B Scaler */}
                  {isDouble ? (
                    <div className="space-y-3.5 border-t md:border-t-0 md:border-l border-gray-800/80 pt-4 md:pt-0 md:pl-5">
                      <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold font-sans">
                        Matrix B Scale ({rowB} × {colB})
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-12 font-sans font-medium">Rows:</span>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            value={rowB}
                            disabled={op === "multiply" || op === "add" || op === "subtract"}
                            onChange={(e) => handleDimChange("B", "row", e.target.value)}
                            className={`flex-1 accent-emerald-500 h-1.5 rounded-lg bg-gray-850 ${
                              op === "multiply" || op === "add" || op === "subtract"
                                ? "opacity-30 cursor-not-allowed"
                                : "cursor-ew-resize"
                            }`}
                          />
                          <span className="text-xs font-mono font-bold w-4 text-emerald-400 text-center">{rowB}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-12 font-sans font-medium">Columns:</span>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            value={colB}
                            disabled={op === "add" || op === "subtract"}
                            onChange={(e) => handleDimChange("B", "col", e.target.value)}
                            className={`flex-1 accent-emerald-500 h-1.5 rounded-lg bg-gray-850 ${
                              op === "add" || op === "subtract"
                                ? "opacity-30 cursor-not-allowed"
                                : "cursor-ew-resize"
                            }`}
                          />
                          <span className="text-xs font-mono font-bold w-4 text-emerald-400 text-center">{colB}</span>
                        </div>
                      </div>
                      
                      <div className="text-[9px] text-slate-505 italic font-sans">
                        {op === "multiply"
                          ? "* Multiplication rule: Rows of B forced to match Columns of A."
                          : "* Arithmetic rule: Dimensions of B must match Matrix A."}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-800/80 pt-4 md:pt-0 md:pl-5 text-[10px] text-slate-500 text-center italic font-sans select-none">
                      Single-matrix operator active. Auxiliary Grid B disabled.
                    </div>
                  )}
                </div>

                {/* THE GRID WORKSPACE */}
                <div className="flex flex-col lg:flex-row gap-8 items-center justify-center py-4 bg-gray-900/10 rounded-2xl border border-gray-900">
                  
                  {/* Grid A */}
                  <div className="flex flex-col items-center">
                    <div className="text-[10px] text-slate-450 uppercase tracking-widest mb-3.5 font-bold font-sans">
                      Grid [A]
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-2 self-stretch border-l-2 border-t-2 border-b-2 border-slate-700 hover:border-emerald-500 transition-colors rounded-l-md" />
                      <div className="grid gap-2 p-3.5 bg-gray-950/40 rounded-lg mx-1 border border-gray-900">
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
                                className="w-12 md:w-14 h-8 text-center bg-gray-900/60 border border-gray-800 text-slate-200 text-xs font-mono font-bold rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-700"
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="w-2 self-stretch border-r-2 border-t-2 border-b-2 border-slate-700 hover:border-emerald-500 transition-colors rounded-r-md" />
                    </div>

                    <div className="flex gap-2 mt-4 text-[10px] font-sans font-semibold">
                      <button
                        onClick={() => fillRandom("A")}
                        className="px-2.5 py-1 bg-gray-900 border border-gray-800 hover:border-gray-700 text-slate-350 hover:text-white rounded-lg transition-all"
                      >
                        Random
                      </button>
                      <button
                        onClick={() => fillClear("A")}
                        className="px-2.5 py-1 bg-gray-900 border border-gray-800 hover:border-rose-900/50 hover:text-rose-400 text-slate-350 rounded-lg transition-all"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Oper Sign */}
                  {isDouble && (
                    <div className="text-lg font-bold text-emerald-400 bg-gray-900/60 border border-gray-850 w-11 h-11 flex items-center justify-center rounded-full select-none shadow-sm">
                      {op === "add" ? "+" : op === "subtract" ? "−" : "×"}
                    </div>
                  )}

                  {/* Grid B */}
                  {isDouble && (
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] text-slate-450 uppercase tracking-widest mb-3.5 font-bold font-sans">
                        Grid [B]
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-2 self-stretch border-l-2 border-t-2 border-b-2 border-slate-700 hover:border-emerald-500 transition-colors rounded-l-md" />
                        <div className="grid gap-2 p-3.5 bg-gray-950/40 rounded-lg mx-1 border border-gray-900">
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
                                  className="w-12 md:w-14 h-8 text-center bg-gray-900/60 border border-gray-800 text-slate-200 text-xs font-mono font-bold rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all placeholder-slate-700"
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="w-2 self-stretch border-r-2 border-t-2 border-b-2 border-slate-700 hover:border-emerald-500 transition-colors rounded-r-md" />
                      </div>

                      <div className="flex gap-2 mt-4 text-[10px] font-sans font-semibold">
                        <button
                          onClick={() => fillRandom("B")}
                          className="px-2.5 py-1 bg-gray-900 border border-gray-800 hover:border-gray-700 text-slate-350 hover:text-white rounded-lg transition-all"
                        >
                          Random
                        </button>
                        <button
                          onClick={() => fillClear("B")}
                          className="px-2.5 py-1 bg-gray-900 border border-gray-800 hover:border-rose-900/50 hover:text-rose-400 text-slate-350 rounded-lg transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* CALCULATE CTA */}
                <div className="flex justify-center select-none pt-2">
                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className={`px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      loading ? "opacity-50 cursor-wait" : ""
                    }`}
                  >
                    <span>Run Evaluation Solver</span>
                  </button>
                </div>

                {/* THE TERMINAL / SOLVER OUTPUT WINDOW */}
                <div className="flex-1 flex flex-col border border-gray-900 bg-gray-950/45 rounded-2xl overflow-hidden shadow-inner min-h-[300px]">
                  
                  {/* Solver title */}
                  <div className="flex justify-between items-center text-[10px] text-slate-500 bg-gray-950/80 border-b border-gray-900/80 px-4 py-2.5 select-none font-bold font-sans">
                    <span>SOLVER ENGINE REPORT & SOLUTIONS</span>
                    <span>LOG BUFFER: {steps.length + (loading ? 1 : 0)} OPERATIONS</span>
                  </div>

                  {/* Solver console text output area */}
                  <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-350 space-y-3 h-80 custom-scrollbar">
                    
                    {steps.length === 0 && !loading && !errorMsg && !result && (
                      <div className="space-y-1.5 font-sans py-4 text-center text-slate-500">
                        <div className="text-3xl mb-2 text-slate-700">🧮</div>
                        <h4 className="text-sm font-bold text-slate-400">Ready for Matrix Evaluation</h4>
                        <p className="text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                          Input scalar coefficients into the matrix grids above and trigger the Solver engine. Complete steps will be listed here.
                        </p>
                      </div>
                    )}

                    {/* Rendering processing diagnostics state */}
                    {loading && (
                      <div className="space-y-2.5 py-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-sans font-bold">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>{loadingText}</span>
                        </div>
                        <div className="text-slate-500 animate-pulse text-[11px] pl-4 font-mono">
                          Evaluating multidimensional matrix coefficients and reducing dimensions...
                        </div>
                      </div>
                    )}

                    {/* Rendering evaluation steps if finished */}
                    {!loading && (steps.length > 0 || errorMsg || result) && (
                      <div className="space-y-4">
                        
                        {/* Summary of calculation */}
                        <div className="text-slate-400 font-bold border-b border-gray-900 pb-2 flex justify-between font-sans text-[11px] tracking-wide uppercase select-none">
                          <span>Computation Diagnostics</span>
                          <span className="text-[10px] text-emerald-500">SUCCESS</span>
                        </div>

                        {/* Calculations Steps listing */}
                        {steps.length > 0 && (
                          <div className="space-y-2.5 font-mono text-slate-300 bg-gray-950/60 p-4 rounded-xl border border-gray-900/60">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold mb-1 border-b border-gray-900 pb-1">
                              Step-by-step Reduction Analysis
                            </div>
                            {steps.map((step, idx) => (
                              <pre key={`step-${idx}`} className="whitespace-pre-wrap font-mono break-words leading-relaxed text-[11px] text-slate-300">
                                {step}
                              </pre>
                            ))}
                          </div>
                        )}

                        {/* Errors report */}
                        {errorMsg && (
                          <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-rose-400 font-sans text-xs">
                            <span className="font-extrabold uppercase block mb-1">Computation Failure</span>
                            {errorMsg}
                          </div>
                        )}

                        {/* Rendering Matrix values Result */}
                        {result !== null && !errorMsg && (
                          <div className="p-5 border border-gray-800 bg-[#080d19]/45 rounded-xl shadow-lg mt-4">
                            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-3.5 select-none flex items-center gap-1.5 font-sans">
                              <span>▶</span> <span>Evaluation Result Matrix:</span>
                            </div>

                            {/* Render value result (Determinant, Trace, Rank) */}
                            {typeof result === "number" ? (
                              <div className="text-3xl font-extrabold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                                {result.toFixed(4).replace(/\.0000$/, "")}
                              </div>
                            ) : result.L && result.U ? (
                              /* Render LU decomposition split result */
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Matrix L (Lower)</div>
                                  <pre className="text-sm text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.L)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Matrix U (Upper)</div>
                                  <pre className="text-sm text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.U)}
                                  </pre>
                                </div>
                              </div>
                            ) : result.U && result.Sigma && result.V ? (
                              /* Render SVD decomposition result */
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Matrix U</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.U)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Matrix Σ (Sigma)</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.Sigma)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Matrix Vᵀ (Transpose)</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.V)}
                                  </pre>
                                </div>
                              </div>
                            ) : result.eigenvalues && result.eigenvectors ? (
                              /* Render Eigenvalues/Eigenvectors result */
                              <div className="space-y-4 bg-gray-950/40 p-4 border border-gray-900 rounded-xl">
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold font-sans mb-1 tracking-wide">Eigenvalues (λ)</div>
                                  <div className="text-base text-emerald-400 font-bold font-mono">
                                    {result.eigenvalues.map((val, idx) => `λ${idx+1} = ${val.toFixed(4)}`).join(", ")}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold font-sans mb-1.5 tracking-wide">Eigenvectors (v)</div>
                                  <div className="space-y-1.5 text-xs text-slate-355 font-mono">
                                    {result.eigenvectors.map((vec, idx) => (
                                      <div key={`eigenvec-${idx}`} className="bg-gray-950/60 py-1.5 px-3 rounded border border-gray-900/40">
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
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Modal Matrix P</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.P)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Diagonal Matrix D</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.D)}
                                  </pre>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 font-sans tracking-wide">Modal Inverse P⁻¹</div>
                                  <pre className="text-xs text-emerald-400 bg-gray-950/60 p-3 rounded-lg border border-gray-900/60 font-mono leading-relaxed overflow-x-auto select-all">
                                    {math.formatMatrixStr(result.P_inv)}
                                  </pre>
                                </div>
                              </div>
                            ) : (
                              /* Render resulting output matrix */
                              <div className="flex items-center w-fit">
                                <div className="w-2.5 self-stretch border-l-2 border-t-2 border-b-2 border-emerald-500 rounded-l-md" />
                                <div className="p-4 bg-gray-950/30 rounded mx-1 font-mono font-bold text-sm md:text-base leading-relaxed tracking-wider text-emerald-400 select-all border border-gray-900">
                                  {math.formatMatrixStr(result)}
                                </div>
                                <div className="w-2.5 self-stretch border-r-2 border-t-2 border-b-2 border-emerald-500 rounded-r-md" />
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

      <style jsx global>{`
        .bg-scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        .bg-crt-flicker {
          animation: crt-glow 0.25s infinite;
        }
        .bg-radial-reflection {
          background: radial-gradient(
            circle at 50% 15%,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 65%
          );
        }
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
        @keyframes crt-glow {
          0% { opacity: 0.008; }
          50% { opacity: 0.015; }
          100% { opacity: 0.008; }
        }
      `}</style>
    </div>
  );
}
