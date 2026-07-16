"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Box from "./components/Box";

export default function HomePage() {
  const canvasRef = useRef(null);

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
      ctx.fillStyle = "rgba(2, 5, 2, 0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff41";
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

  return (
    <div className="relative min-h-screen bg-[#020502] text-[#33ff33] flex flex-col items-center">
      {/* Hero Canvas Banner */}
      <div className="relative w-full border-b border-[#1b3a1b] bg-black/60 overflow-hidden flex flex-col items-center justify-center py-16 px-6 text-center select-none">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] w-full h-full" />
        
        {/* Glow scanlines */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-[0.06]" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-block px-3 py-1 border border-[#00ff41] rounded text-[10px] tracking-widest text-[#00ff41] font-bold uppercase animate-pulse">
            System Mainframe Access Granted
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#00ff41] drop-shadow-[0_0_15px_rgba(0,255,65,0.4)]">
            MATRIX DIRECTORY
          </h1>
          <p className="text-sm md:text-base text-[#22aa22] leading-relaxed font-mono max-w-xl mx-auto">
            A comprehensive knowledge library detailing matrix arithmetic classifications, transformations, and coordinate projections.
          </p>
          <div className="pt-4">
            <Link href="/calculator">
              <button className="px-6 py-3 border border-[#00ff41] text-[#00ff41] font-bold text-xs tracking-widest uppercase rounded bg-black/40 hover:bg-[#0c220c] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] active:scale-98 transition-all cursor-pointer">
                [ BOOT COMPUTATIONAL CONSOLE ]
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Categories Section */}
      <div className="w-full max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((element) => (
            <Box key={element.category} category={element.category}>
              {element.concepts.map((concept) => (
                <div key={concept}>{concept}</div>
              ))}
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}
