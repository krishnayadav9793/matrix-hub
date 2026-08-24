"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Box from "./components/Box";

export default function HomePage() {
  const canvasRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    {
      category: "I. Fundamental Concepts & Notation",
      concepts: [
        "Definition of a Matrix",
        "Elements/Entries (Row and Column Indices)",
        "Order/Dimension of a Matrix (m x n)",
        "General Representation ([A]ij)",
        "Equality of Matrices"
      ]
    },
    {
      category: "II. Types and Classifications",
      concepts: [
        "Row Matrix (Row Vector)",
        "Column Matrix (Column Vector)",
        "Rectangular Matrix",
        "Square Matrix",
        "Zero (Null) Matrix",
        "Diagonal Matrix",
        "Scalar Matrix",
        "Identity (Unit) Matrix",
        "Upper Triangular Matrix",
        "Lower Triangular Matrix",
        "Strictly Triangular Matrix",
        "Tridiagonal Matrix"
      ]
    },
    {
      category: "III. Matrix Arithmetic & Operations",
      concepts: [
        "Matrix Addition and Subtraction",
        "Scalar Multiplication",
        "Matrix Multiplication (Row-by-Column Rule)",
        "Pre-multiplication vs. Post-multiplication",
        "Commutativity (Lack thereof)",
        "Transpose of a Matrix",
        "Trace of a Matrix",
        "Powers of a Matrix",
        "Matrix Polynomials"
      ]
    },
    {
      category: "IV. Symmetry and Special Real Matrices",
      concepts: [
        "Symmetric Matrix",
        "Skew-Symmetric Matrix",
        "Orthogonal Matrix",
        "Idempotent Matrix",
        "Involutory Matrix",
        "Nilpotent Matrix"
      ]
    },
    {
      category: "V. Determinants",
      concepts: [
        "Definition of Determinant",
        "Minors",
        "Cofactors",
        "Laplace Expansion (Cofactor Expansion)",
        "Reflection Property of Determinants",
        "Row/Column Switching Properties",
        "Singular Matrix",
        "Non-Singular Matrix"
      ]
    },
    {
      category: "VI. Inverse and Rank",
      concepts: [
        "Adjoint (Adjugate) Matrix",
        "Inverse of a Matrix",
        "Invertible Matrix Theorem",
        "Elementary Row Operations (EROs)",
        "Elementary Column Operations",
        "Row Echelon Form (REF)",
        "Reduced Row Echelon Form (RREF)",
        "Rank of a Matrix",
        "Nullity"
      ]
    },
    {
      category: "VII. Systems of Linear Equations",
      concepts: [
        "Matrix Representation (AX = B)",
        "Homogeneous Systems",
        "Non-Homogeneous Systems",
        "Augmented Matrix",
        "Consistency of Systems",
        "Gaussian Elimination",
        "Gauss-Jordan Elimination",
        "Cramer's Rule"
      ]
    },
    {
      category: "VIII. Vector Spaces and Linear Transformations",
      concepts: [
        "Column Space (Range)",
        "Row Space",
        "Null Space (Kernel)",
        "Rank-Nullity Theorem",
        "Basis and Dimension",
        "Change of Basis Matrix",
        "Linear Transformations"
      ]
    },
    {
      category: "IX. Eigenvalues and Eigenvectors",
      concepts: [
        "Eigenvalue Problem (Ax = lambda x)",
        "Characteristic Equation",
        "Spectrum of a Matrix",
        "Algebraic Multiplicity",
        "Geometric Multiplicity",
        "Cayley-Hamilton Theorem",
        "Similarity of Matrices",
        "Diagonalization",
        "Defective Matrices"
      ]
    },
    {
      category: "X. Matrix Factorizations (Decompositions)",
      concepts: [
        "LU Decomposition",
        "QR Decomposition",
        "Cholesky Decomposition",
        "Singular Value Decomposition (SVD)",
        "Spectral Decomposition"
      ]
    },
    {
      category: "XI. Complex Matrices",
      concepts: [
        "Conjugate Matrix",
        "Tranjugate (Conjugate Transpose)",
        "Hermitian Matrix",
        "Skew-Hermitian Matrix",
        "Unitary Matrix",
        "Normal Matrix"
      ]
    },
    {
      category: "XII. Advanced & Applied Topics",
      concepts: [
        "Quadratic Forms",
        "Positive Definite Matrices",
        "Positive Semi-definite Matrices",
        "Jordan Canonical Form",
        "Hessian Matrix",
        "Jacobian Matrix",
        "Block Matrices",
        "Tensors"
      ]
    }
  ];

  // Matrix Rain background effect on hero
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

    const cols = Math.floor(width / 22) + 1;
    const ypos = Array(cols).fill(0);

    const drawRain = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#10b981";
      ctx.font = "12px monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 22;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 12;
        }
      });
    };

    const loop = () => {
      drawRain();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Filter topics based on search query
  const filteredTopics = topics
    .map((topic) => {
      const matchedConcepts = topic.concepts.filter((concept) =>
        concept.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...topic,
        concepts: matchedConcepts
      };
    })
    .filter((topic) => topic.concepts.length > 0);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center overflow-x-hidden">
      
      {/* Dynamic Background Blob Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-[450px] right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative w-full border-b border-gray-800/40 bg-[#030712]/30 overflow-hidden flex flex-col items-center justify-center py-20 px-6 text-center select-none">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] w-full h-full" />
        
        {/* Soft bottom mask to blend the rain canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="relative z-20 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Computational Core Online
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Interactive Linear Algebra <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Matrix Workstation
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            A comprehensive developer toolkit detailing operations, transformations, and coordinate projections. Boot the computational console to analyze vectors and solve matrices in real time.
          </p>
          
          <div className="pt-4 flex justify-center gap-4">
            <Link href="/calculator">
              <button className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-lg shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer">
                Boot Computational Console
              </button>
            </Link>
            <Link href="/AIchatbot">
              <button className="px-6 py-3.5 bg-slate-900 border border-gray-800 hover:border-gray-700 text-slate-200 hover:text-white font-bold text-xs tracking-widest uppercase rounded-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer">
                Consult Chatbot
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Overview Grid */}
      <div className="relative z-20 w-full max-w-6xl px-6 py-16 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-xl border border-gray-800/80 bg-gray-900/40 backdrop-blur-md shadow-lg hover:border-emerald-500/30 hover:shadow-emerald-500/[0.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 font-bold group-hover:bg-emerald-500/20 transition-all">
              ∑
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Matrix Solver</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Add, multiply, transpose, and find determinants or inverses. Perform eigenvalues, eigenvectors, trace, rank, and advanced LU or SVD decompositions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl border border-gray-800/80 bg-gray-900/40 backdrop-blur-md shadow-lg hover:border-cyan-500/30 hover:shadow-cyan-500/[0.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 font-bold group-hover:bg-cyan-500/20 transition-all">
              ☷
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Concept Directory</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              12 mathematical sections categorizing classifications, symmetric matrices, vector spaces, complex systems, quadratic forms, and tensors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl border border-gray-800/80 bg-gray-900/40 backdrop-blur-md shadow-lg hover:border-indigo-500/30 hover:shadow-indigo-500/[0.02] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 font-bold group-hover:bg-indigo-500/20 transition-all">
              ⚛
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Oracle AI Chatbot</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Stuck on definitions or homework? Interact with a custom-trained linear algebra assistant powered by Gemini for immediate mathematical solutions.
            </p>
          </div>
          
        </div>
      </div>

      {/* Directory Search Section */}
      <div className="relative z-20 w-full max-w-6xl px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800/80 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Matrix Directory</h2>
            <p className="text-sm text-slate-400 font-light mt-1">Explore definitions, examples, and details of core matrix properties.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. Identity, LU)..."
              className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Categories Section */}
      <div className="relative z-20 w-full max-w-6xl px-6 pb-24">
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTopics.map((element, idx) => {
              // Extract original category index or construct one
              const categoryMatch = element.category.match(/^([IVX]+)\.\s*(.*)/);
              const indexStr = categoryMatch ? categoryMatch[1] : (idx + 1).toString();
              const categoryTitle = categoryMatch ? categoryMatch[2] : element.category;

              return (
                <Box 
                  key={element.category} 
                  category={element.category} 
                  indexBadge={indexStr}
                  categoryTitle={categoryTitle}
                >
                  {element.concepts.map((concept) => (
                    <div key={concept}>{concept}</div>
                  ))}
                </Box>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-800 rounded-xl bg-gray-900/20 backdrop-blur-sm">
            <div className="text-4xl mb-3 text-slate-600">🔍</div>
            <h3 className="text-lg font-bold text-slate-400">No matching concepts found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">Try adjusting your keywords (e.g., search for "matrix", "triangular", "eigenvalue")</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 px-4 py-2 bg-gray-800 text-xs font-semibold rounded-lg text-slate-300 hover:bg-gray-700 transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
}
