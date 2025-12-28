"use client";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Box from "./components/Box";
import Popup from "reactjs-popup";

export default function HomePage() {
  const topics = [
  {
    "category": "I. Fundamental Concepts & Notation",
    "concepts": [
      "Definition of a Matrix",
      "Elements/Entries (Row and Column Indices)",
      "Order/Dimension of a Matrix (m x n)",
      "General Representation ([A]ij)",
      "Equality of Matrices"
    ]
  },
  {
    "category": "II. Types and Classifications",
    "concepts": [
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
    "category": "III. Matrix Arithmetic & Operations",
    "concepts": [
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
    "category": "IV. Symmetry and Special Real Matrices",
    "concepts": [
      "Symmetric Matrix",
      "Skew-Symmetric Matrix",
      "Orthogonal Matrix",
      "Idempotent Matrix",
      "Involutory Matrix",
      "Nilpotent Matrix"
    ]
  },
  {
    "category": "V. Determinants",
    "concepts": [
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
    "category": "VI. Inverse and Rank",
    "concepts": [
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
    "category": "VII. Systems of Linear Equations",
    "concepts": [
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
    "category": "VIII. Vector Spaces and Linear Transformations",
    "concepts": [
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
    "category": "IX. Eigenvalues and Eigenvectors",
    "concepts": [
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
    "category": "X. Matrix Factorizations (Decompositions)",
    "concepts": [
      "LU Decomposition",
      "QR Decomposition",
      "Cholesky Decomposition",
      "Singular Value Decomposition (SVD)",
      "Spectral Decomposition"
    ]
  },
  {
    "category": "XI. Complex Matrices",
    "concepts": [
      "Conjugate Matrix",
      "Tranjugate (Conjugate Transpose)",
      "Hermitian Matrix",
      "Skew-Hermitian Matrix",
      "Unitary Matrix",
      "Normal Matrix"
    ]
  },
  {
    "category": "XII. Advanced & Applied Topics",
    "concepts": [
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
]
  
  return (
    <div>
      {topics.map(element => (
        <Box key={element.category} category={element.category}>
          {element.concepts.map(concept => (
            <div key={concept}>
              <div >
                {concept}
              </div>
            </div>
          ))}
        </Box>
      ))}
    </div>
  );
}

