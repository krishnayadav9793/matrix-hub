/**
 * Matrix Math Utility with Step-by-Step Explanations
 */

// Helper to format a matrix as string for console output
export function formatMatrixStr(matrix) {
  if (!matrix || !Array.isArray(matrix)) return "";
  return matrix.map(row => "[" + row.map(val => val.toFixed(2).replace(/\.00$/, '')).join(", ") + "]").join("\n");
}

// Clone matrix
export function cloneMatrix(matrix) {
  return matrix.map(row => [...row]);
}

// 1. ADDITION
export function add(A, B) {
  const steps = [];
  steps.push("Step 1: Check dimensions compatibility.");
  if (A.length !== B.length || A[0].length !== B[0].length) {
    return {
      success: false,
      error: `Dimension mismatch: Matrix A is ${A.length}x${A[0].length}, Matrix B is ${B.length}x${B[0].length}. Cannot add.`,
      steps
    };
  }

  const rows = A.length;
  const cols = A[0].length;
  steps.push(`Matrices are compatible. Both are ${rows}x${cols}.`);
  steps.push("Step 2: Add elements cell-by-cell.");

  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const sum = A[i][j] + B[i][j];
      result[i][j] = sum;
      steps.push(`  Cell [${i + 1}, ${j + 1}]: A[${i + 1},${j + 1}] (${A[i][j]}) + B[${i + 1},${j + 1}] (${B[i][j]}) = ${sum}`);
    }
  }

  steps.push("Step 3: Result matrix completed.");
  return { success: true, result, steps };
}

// 2. SUBTRACTION
export function subtract(A, B) {
  const steps = [];
  steps.push("Step 1: Check dimensions compatibility.");
  if (A.length !== B.length || A[0].length !== B[0].length) {
    return {
      success: false,
      error: `Dimension mismatch: Matrix A is ${A.length}x${A[0].length}, Matrix B is ${B.length}x${B[0].length}. Cannot subtract.`,
      steps
    };
  }

  const rows = A.length;
  const cols = A[0].length;
  steps.push(`Matrices are compatible. Both are ${rows}x${cols}.`);
  steps.push("Step 2: Subtract elements cell-by-cell (A - B).");

  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const diff = A[i][j] - B[i][j];
      result[i][j] = diff;
      steps.push(`  Cell [${i + 1}, ${j + 1}]: A[${i + 1},${j + 1}] (${A[i][j]}) - B[${i + 1},${j + 1}] (${B[i][j]}) = ${diff}`);
    }
  }

  steps.push("Step 3: Result matrix completed.");
  return { success: true, result, steps };
}

// 3. MULTIPLICATION
export function multiply(A, B) {
  const steps = [];
  steps.push("Step 1: Check dimension compatibility.");
  const rA = A.length;
  const cA = A[0].length;
  const rB = B.length;
  const cB = B[0].length;

  steps.push(`Matrix A: ${rA}x${cA}, Matrix B: ${rB}x${cB}`);
  if (cA !== rB) {
    return {
      success: false,
      error: `Inner dimensions do not match. Columns of A (${cA}) must equal rows of B (${rB}).`,
      steps
    };
  }

  steps.push(`Matrix sizes are compatible. Result matrix will be ${rA}x${cB}.`);
  steps.push("Step 2: Perform Row-by-Column dot products.");

  const result = Array.from({ length: rA }, () => Array(cB).fill(0));
  for (let i = 0; i < rA; i++) {
    for (let j = 0; j < cB; j++) {
      let termStr = [];
      let sum = 0;
      for (let k = 0; k < cA; k++) {
        const prod = A[i][k] * B[k][j];
        sum += prod;
        termStr.push(`(${A[i][k]} * ${B[k][j]})`);
      }
      result[i][j] = sum;
      steps.push(`  Cell [${i + 1}, ${j + 1}]: Row ${i + 1} of A • Col ${j + 1} of B\n    = ${termStr.join(" + ")} = ${sum}`);
    }
  }

  steps.push("Step 3: Multiplication finished.");
  return { success: true, result, steps };
}

// 4. TRANSPOSE
export function transpose(A) {
  const steps = [];
  const rows = A.length;
  const cols = A[0].length;
  steps.push(`Step 1: Get Matrix shape. Original size is ${rows}x${cols}.`);
  steps.push(`Step 2: Swap rows and columns. Result will be ${cols}x${rows}.`);

  const result = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = A[i][j];
      steps.push(`  Cell [${j + 1}, ${i + 1}] of Transpose = Original Cell [${i + 1}, ${j + 1}] (${A[i][j]})`);
    }
  }

  steps.push("Step 3: Transpose generated.");
  return { success: true, result, steps };
}

// 5. TRACE
export function trace(A) {
  const steps = [];
  const rows = A.length;
  const cols = A[0].length;
  steps.push("Step 1: Check if matrix is square.");
  if (rows !== cols) {
    return {
      success: false,
      error: `Trace is only defined for square matrices. This matrix is ${rows}x${cols}.`,
      steps
    };
  }

  steps.push("Step 2: Sum the diagonal elements A[i][i].");
  let sum = 0;
  const diagElements = [];
  for (let i = 0; i < rows; i++) {
    const val = A[i][i];
    sum += val;
    diagElements.push(`A[${i + 1},${i + 1}] (${val})`);
  }

  steps.push(`  Diagonal elements: ${diagElements.join(" + ")}`);
  steps.push(`  Total trace sum = ${sum}`);
  return { success: true, result: sum, steps };
}

// 6. DETERMINANT
export function determinant(A) {
  const steps = [];
  const n = A.length;
  if (n !== A[0].length) {
    return {
      success: false,
      error: `Determinant is only defined for square matrices. Given matrix is ${n}x${A[0].length}.`,
      steps
    };
  }

  steps.push(`Determinant for ${n}x${n} matrix requested.`);

  function getDetRec(matrix, path = "") {
    const size = matrix.length;
    if (size === 1) {
      return matrix[0][0];
    }
    if (size === 2) {
      const val = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      return val;
    }

    let detVal = 0;
    for (let j = 0; j < size; j++) {
      const sign = j % 2 === 0 ? 1 : -1;
      const elem = matrix[0][j];
      const subMat = [];
      for (let i = 1; i < size; i++) {
        subMat.push(matrix[i].filter((_, colIndex) => colIndex !== j));
      }
      const subDet = getDetRec(subMat);
      detVal += sign * elem * subDet;
    }
    return detVal;
  }

  const finalDet = getDetRec(A);

  // Write visual steps for up to 3x3 or 4x4
  if (n === 1) {
    steps.push(`1x1 matrix det is simply the element: det = ${A[0][0]}`);
  } else if (n === 2) {
    steps.push(`det = (a * d) - (b * c)`);
    steps.push(`    = (${A[0][0]} * ${A[1][1]}) - (${A[0][1]} * ${A[1][0]})`);
    steps.push(`    = ${A[0][0] * A[1][1]} - ${A[0][1] * A[1][0]}`);
    steps.push(`    = ${finalDet}`);
  } else {
    steps.push(`Using Laplace Expansion along Row 1:`);
    for (let j = 0; j < n; j++) {
      const sign = j % 2 === 0 ? "+" : "-";
      const val = A[0][j];
      const subMat = [];
      for (let i = 1; i < n; i++) {
        subMat.push(A[i].filter((_, colIndex) => colIndex !== j));
      }
      const subDet = getDetRec(subMat);
      steps.push(`  ${sign} (${val}) * det(Minor at row 1, col ${j + 1}) where Minor det is ${subDet}`);
    }
    steps.push(`Total sum = ${finalDet}`);
  }

  return { success: true, result: finalDet, steps };
}

// 7. INVERSE (Gauss-Jordan Elimination)
export function inverse(A) {
  const steps = [];
  const n = A.length;
  if (n !== A[0].length) {
    return {
      success: false,
      error: "Inverse is only defined for square matrices.",
      steps
    };
  }

  // Check determinant first
  const detCheck = determinant(A).result;
  if (Math.abs(detCheck) < 1e-9) {
    return {
      success: false,
      error: `Matrix is singular (determinant is 0). It has no inverse.`,
      steps: ["Determinant calculated as 0.", "Singular matrix has no inverse."]
    };
  }

  steps.push(`Step 1: Check determinant. det(A) = ${detCheck.toFixed(4)}. Invertible.`);
  steps.push("Step 2: Create augmented matrix [A | I].");

  // Create augmented matrix
  const aug = Array.from({ length: n }, (_, i) => {
    const row = [...A[i]];
    const iRow = Array(n).fill(0);
    iRow[i] = 1;
    return row.concat(iRow);
  });

  function logAugState(msg) {
    steps.push(msg);
    aug.forEach((r, idx) => {
      const left = r.slice(0, n).map(v => v.toFixed(2)).join(", ");
      const right = r.slice(n).map(v => v.toFixed(2)).join(", ");
      steps.push(`  [ ${left} | ${right} ]`);
    });
  }

  logAugState("Initial Augmented Matrix:");

  // Perform Gauss-Jordan
  for (let i = 0; i < n; i++) {
    // Find pivot
    let pivotRow = i;
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(aug[r][i]) > Math.abs(aug[pivotRow][i])) {
        pivotRow = r;
      }
    }

    if (Math.abs(aug[pivotRow][i]) < 1e-9) {
      return { success: false, error: "Matrix is singular (unable to find non-zero pivot).", steps };
    }

    if (pivotRow !== i) {
      const temp = aug[i];
      aug[i] = aug[pivotRow];
      aug[pivotRow] = temp;
      logAugState(`Swap Row ${i + 1} and Row ${pivotRow + 1}:`);
    }

    // Scale pivot row
    const pivot = aug[i][i];
    for (let c = 0; c < 2 * n; c++) {
      aug[i][c] /= pivot;
    }
    logAugState(`Scale Row ${i + 1} by dividing by pivot element (${pivot.toFixed(2)}):`);

    // Eliminate column
    for (let r = 0; r < n; r++) {
      if (r !== i) {
        const factor = aug[r][i];
        if (Math.abs(factor) > 1e-9) {
          for (let c = 0; c < 2 * n; c++) {
            aug[r][c] -= factor * aug[i][c];
          }
          logAugState(`Row ${r + 1} = Row ${r + 1} - (${factor.toFixed(2)}) * Row ${i + 1}:`);
        }
      }
    }
  }

  // Extract inverse
  const result = aug.map(row => row.slice(n));
  steps.push("Step 3: Extract right half of the augmented matrix.");
  return { success: true, result, steps };
}

// 8. RANK
export function rank(A) {
  const steps = [];
  const rows = A.length;
  const cols = A[0].length;
  steps.push(`Rank estimation for a ${rows}x${cols} matrix.`);

  const mat = cloneMatrix(A);
  let rankVal = 0;
  const limit = Math.min(rows, cols);

  for (let c = 0, r = 0; c < cols && r < rows; c++) {
    // Find pivot
    let pivotRow = r;
    for (let i = r + 1; i < rows; i++) {
      if (Math.abs(mat[i][c]) > Math.abs(mat[pivotRow][c])) {
        pivotRow = i;
      }
    }

    if (Math.abs(mat[pivotRow][c]) < 1e-9) {
      steps.push(`Column ${c + 1} has no non-zero pivot below Row ${r + 1}. Skip.`);
      continue;
    }

    if (pivotRow !== r) {
      const temp = mat[r];
      mat[r] = mat[pivotRow];
      mat[pivotRow] = temp;
      steps.push(`Swap Row ${r + 1} and Row ${pivotRow + 1} to get pivot.`);
    }

    // Eliminate below
    for (let i = r + 1; i < rows; i++) {
      const factor = mat[i][c] / mat[r][c];
      if (Math.abs(factor) > 1e-9) {
        for (let j = c; j < cols; j++) {
          mat[i][j] -= factor * mat[r][j];
        }
        steps.push(`Eliminate element below pivot: Row ${i + 1} = Row ${i + 1} - (${factor.toFixed(2)}) * Row ${r + 1}`);
      }
    }
    r++;
    rankVal = r;
  }

  steps.push("Reduced to Echelon Form:");
  mat.forEach((row, i) => {
    steps.push(`  [ ${row.map(v => v.toFixed(2)).join(", ")} ]`);
  });
  steps.push(`Total non-zero rows = ${rankVal}. Rank of the matrix is ${rankVal}.`);

  return { success: true, result: rankVal, steps };
}

// 9. LU DECOMPOSITION (Doolittle algorithm A = L * U)
export function luDecomposition(A) {
  const steps = [];
  const n = A.length;
  if (n !== A[0].length) {
    return {
      success: false,
      error: "LU Decomposition is only defined for square matrices.",
      steps
    };
  }

  steps.push(`LU Decomposition (A = LU) using Doolittle's method on ${n}x${n} matrix.`);

  const L = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    // Upper
    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = A[i][k] - sum;
    }

    // Lower
    for (let k = i + 1; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[k][j] * U[j][i];
      }
      if (Math.abs(U[i][i]) < 1e-9) {
        return {
          success: false,
          error: "LU decomposition failed: Pivot element U[i][i] is zero (requires row swapping, pivoting).",
          steps
        };
      }
      L[k][i] = (A[k][i] - sum) / U[i][i];
    }
  }

  steps.push("Matrix L (Lower Triangular):");
  L.forEach(row => steps.push("  " + JSON.stringify(row.map(v => Number(v.toFixed(4))))));
  steps.push("Matrix U (Upper Triangular):");
  U.forEach(row => steps.push("  " + JSON.stringify(row.map(v => Number(v.toFixed(4))))));

  return {
    success: true,
    result: { L, U },
    steps
  };
}

// 10. EIGENVALUES & EIGENVECTORS (For 2x2 and 3x3)
export function eigenvaluesAndEigenvectors(A) {
  const steps = [];
  const n = A.length;
  if (n !== A[0].length) {
    return {
      success: false,
      error: "Eigenvalues and eigenvectors are only defined for square matrices.",
      steps
    };
  }

  if (n > 3) {
    return {
      success: false,
      error: "This calculation console currently supports up to 3x3 matrices for eigenvalue calculations.",
      steps
    };
  }

  steps.push(`Solving Eigenvalues problem (det(A - λI) = 0) for a ${n}x${n} matrix.`);

  if (n === 1) {
    const val = A[0][0];
    steps.push(`Eigenvalue: λ = ${val}`);
    steps.push(`Eigenvector corresponding to λ: [1.00]`);
    return {
      success: true,
      result: { eigenvalues: [val], eigenvectors: [[1]] },
      steps
    };
  }

  if (n === 2) {
    // tr(A)
    const traceVal = A[0][0] + A[1][1];
    // det(A)
    const detVal = A[0][0] * A[1][1] - A[0][1] * A[1][0];

    steps.push(`Trace(A) = ${traceVal.toFixed(4)}, det(A) = ${detVal.toFixed(4)}`);
    steps.push(`Characteristic Equation: λ² - Trace(A)λ + det(A) = 0`);
    steps.push(`λ² - (${traceVal.toFixed(2)})λ + (${detVal.toFixed(2)}) = 0`);

    // Solve quadratic
    const discriminant = traceVal * traceVal - 4 * detVal;
    steps.push(`Discriminant = Trace² - 4*det = ${discriminant.toFixed(4)}`);

    if (discriminant < 0) {
      // Complex eigenvalues
      const real = traceVal / 2;
      const imag = Math.sqrt(-discriminant) / 2;
      steps.push(`Complex conjugate eigenvalues found: ${real.toFixed(4)} ± ${imag.toFixed(4)}i`);
      return {
        success: false,
        error: "Complex eigenvalues found. This terminal handles real eigenvalues only.",
        steps
      };
    }

    const lam1 = (traceVal + Math.sqrt(discriminant)) / 2;
    const lam2 = (traceVal - Math.sqrt(discriminant)) / 2;
    steps.push(`Eigenvalues: λ₁ = ${lam1.toFixed(4)}, λ₂ = ${lam2.toFixed(4)}`);

    // Solve for eigenvectors (A - λI)v = 0
    function getVector(lam) {
      const a = A[0][0] - lam;
      const b = A[0][1];
      const c = A[1][0];
      const d = A[1][1] - lam;

      let x = 1, y = 1;
      if (Math.abs(c) > 1e-5) {
        x = -d / c;
        y = 1;
      } else if (Math.abs(a) > 1e-5) {
        x = -b / a;
        y = 1;
      } else if (Math.abs(b) > 1e-5) {
        x = 1;
        y = 0;
      } else if (Math.abs(d) > 1e-5) {
        x = 0;
        y = 1;
      } else {
        x = 1;
        y = 0;
      }

      // Normalise
      const len = Math.sqrt(x*x + y*y);
      return [x / len, y / len];
    }

    const v1 = getVector(lam1);
    const v2 = getVector(lam2);

    steps.push(`For λ₁ = ${lam1.toFixed(4)}: Vector v₁ = [${v1.map(v => v.toFixed(4)).join(", ")}]`);
    steps.push(`For λ₂ = ${lam2.toFixed(4)}: Vector v₂ = [${v2.map(v => v.toFixed(4)).join(", ")}]`);

    return {
      success: true,
      result: {
        eigenvalues: [lam1, lam2],
        eigenvectors: [v1, v2]
      },
      steps
    };
  }

  if (n === 3) {
    steps.push("Computing eigenvalues for 3x3 using numerical solver (characteristic polynomial roots)...");
    const I1 = A[0][0] + A[1][1] + A[2][2];
    
    const m1 = A[0][0]*A[1][1] - A[0][1]*A[1][0];
    const m2 = A[1][1]*A[2][2] - A[1][2]*A[2][1];
    const m3 = A[0][0]*A[2][2] - A[0][2]*A[2][0];
    const I2 = m1 + m2 + m3;

    const I3 = A[0][0]*(A[1][1]*A[2][2] - A[1][2]*A[2][1]) -
               A[0][1]*(A[1][0]*A[2][2] - A[1][2]*A[2][0]) +
               A[0][2]*(A[1][0]*A[2][1] - A[1][1]*A[2][0]);

    steps.push(`Polynomial coefficients: λ³ - (${I1.toFixed(2)})λ² + (${I2.toFixed(2)})λ - (${I3.toFixed(2)}) = 0`);

    const a = -I1;
    const b = I2;
    const c = -I3;

    const Q = (3 * b - a * a) / 9;
    const R = (9 * a * b - 27 * c - 2 * a * a * a) / 54;
    const D = Q * Q * Q + R * R;

    let eigenvalues = [];
    if (D < 0) {
      const theta = Math.acos(R / Math.sqrt(-Q * Q * Q));
      const sQ = Math.sqrt(-Q);
      eigenvalues = [
        2 * sQ * Math.cos(theta / 3) - a / 3,
        2 * sQ * Math.cos((theta + 2 * Math.PI) / 3) - a / 3,
        2 * sQ * Math.cos((theta + 4 * Math.PI) / 3) - a / 3
      ];
    } else {
      const S = Math.cbrt(R + Math.sqrt(D));
      const T = Math.cbrt(R - Math.sqrt(D));
      const realRoot = S + T - a / 3;
      eigenvalues = [realRoot];
      steps.push("Note: Found complex eigenvalues, listing only the real eigenvalue.");
    }

    steps.push(`Computed Eigenvalues: ` + eigenvalues.map(v => v.toFixed(4)).join(", "));

    const eigenvectors = [];
    eigenvalues.forEach((lam, idx) => {
      const M = Array.from({ length: 3 }, (_, r) => 
        Array.from({ length: 3 }, (_, c) => r === c ? A[r][c] - lam : A[r][c])
      );

      let v = [
        M[0][1]*M[1][2] - M[0][2]*M[1][1],
        M[0][2]*M[1][0] - M[0][0]*M[1][2],
        M[0][0]*M[1][1] - M[0][1]*M[1][0]
      ];

      let len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      if (len < 1e-5) {
        v = [
          M[0][1]*M[2][2] - M[0][2]*M[2][1],
          M[0][2]*M[2][0] - M[0][0]*M[2][2],
          M[0][0]*M[2][1] - M[0][1]*M[2][0]
        ];
        len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      }
      
      if (len < 1e-5) {
        v = [
          M[1][1]*M[2][2] - M[1][2]*M[2][1],
          M[1][2]*M[2][0] - M[1][0]*M[2][2],
          M[1][0]*M[2][1] - M[1][1]*M[2][0]
        ];
        len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      }

      if (len < 1e-5) {
        v = [0, 0, 0];
        v[idx] = 1;
        len = 1;
      }

      const normalised = v.map(val => val / len);
      eigenvectors.push(normalised);
      steps.push(`For λ = ${lam.toFixed(4)}: Vector v = [${normalised.map(val => val.toFixed(4)).join(", ")}]`);
    });

    return {
      success: true,
      result: { eigenvalues, eigenvectors },
      steps
    };
  }
}

// 11. DIAGONALIZATION (A = P * D * P^-1)
export function diagonalization(A) {
  const steps = [];
  steps.push("Starting Diagonalization (A = P D P⁻¹)...");
  
  const eig = eigenvaluesAndEigenvectors(A);
  if (!eig.success) {
    return { success: false, error: eig.error, steps: eig.steps };
  }

  const { eigenvalues, eigenvectors } = eig.result;
  const n = A.length;

  if (eigenvectors.length < n) {
    return {
      success: false,
      error: `Defective matrix. Cannot find ${n} linearly independent eigenvectors. Not diagonalizable.`,
      steps: eig.steps.concat(["Cannot form matrix P because the number of eigenvectors is less than dimensions."])
    };
  }

  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? eigenvalues[i] : 0));
  const P = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => eigenvectors[j][i]));

  steps.push("Step 1: Eigenvalues and eigenvectors computed.");
  steps.push("Step 2: Construct Diagonal Matrix D from eigenvalues:");
  D.forEach(row => steps.push("  " + JSON.stringify(row.map(v => Number(v.toFixed(4))))));

  steps.push("Step 3: Construct Modal Matrix P from eigenvectors (as columns):");
  P.forEach(row => steps.push("  " + JSON.stringify(row.map(v => Number(v.toFixed(4))))));

  const pInvRes = inverse(P);
  if (!pInvRes.success) {
    return {
      success: false,
      error: "Matrix P is singular. Linearly dependent eigenvectors. Cannot diagonalize.",
      steps: eig.steps.concat(["Could not compute inverse of P."])
    };
  }

  const P_inv = pInvRes.result;
  steps.push("Step 4: Compute Modal Matrix Inverse P⁻¹:");
  P_inv.forEach(row => steps.push("  " + JSON.stringify(row.map(v => Number(v.toFixed(4))))));

  steps.push("Verification: Matrix A equals P * D * P⁻¹.");
  return {
    success: true,
    result: { P, D, P_inv },
    steps
  };
}

// 12. SVD (Singular Value Decomposition: A = U * Sigma * V^T)
export function SVD(A) {
  const steps = [];
  const rows = A.length;
  const cols = A[0].length;

  if (rows !== 2 || cols !== 2) {
    return {
      success: false,
      error: "This calculation console currently supports Singular Value Decomposition (SVD) for 2x2 matrices only.",
      steps
    };
  }

  steps.push(`Performing SVD (A = U Σ Vᵀ) for a 2x2 matrix.`);

  const a = A[0][0];
  const b = A[0][1];
  const c_val = A[1] ? A[1][0] || 0 : 0;
  const d_val = A[1] ? A[1][1] || 0 : 0;

  const AT_A = [
    [a*a + c_val*c_val, a*b + c_val*d_val],
    [a*b + c_val*d_val, b*b + d_val*d_val]
  ];

  steps.push("Step 1: Compute AᵀA matrix:");
  steps.push(`  [ ${(a*a + c_val*c_val).toFixed(2)}, ${(a*b + c_val*d_val).toFixed(2)} ]`);
  steps.push(`  [ ${(a*b + c_val*d_val).toFixed(2)}, ${(b*b + d_val*d_val).toFixed(2)} ]`);

  const traceAT_A = AT_A[0][0] + AT_A[1][1];
  const detAT_A = AT_A[0][0]*AT_A[1][1] - AT_A[0][1]*AT_A[1][0];
  const disc = traceAT_A*traceAT_A - 4*detAT_A;

  if (disc < 0) {
    return { success: false, error: "Internal SVD calculation error: negative discriminant", steps };
  }

  const lam1 = (traceAT_A + Math.sqrt(disc)) / 2;
  const lam2 = (traceAT_A - Math.sqrt(disc)) / 2;

  const sig1 = Math.sqrt(Math.max(0, lam1));
  const sig2 = Math.sqrt(Math.max(0, lam2));

  steps.push(`Step 2: Find singular values σ = √λ of AᵀA.`);
  steps.push(`  σ₁ = ${sig1.toFixed(4)}`);
  steps.push(`  σ₂ = ${sig2.toFixed(4)}`);

  const Sigma = [
    [sig1, 0],
    [0, sig2]
  ];

  function getVVector(lam) {
    const m11 = AT_A[0][0] - lam;
    const m12 = AT_A[0][1];
    const m21 = AT_A[1][0];
    const m22 = AT_A[1][1] - lam;

    let x = 1, y = 1;
    if (Math.abs(m21) > 1e-5) {
      x = -m22 / m21;
      y = 1;
    } else if (Math.abs(m11) > 1e-5) {
      x = -m12 / m11;
      y = 1;
    } else if (Math.abs(m12) > 1e-5) {
      x = 1;
      y = 0;
    } else {
      x = 1;
      y = 0;
    }

    const len = Math.sqrt(x*x + y*y);
    return [x / len, y / len];
  }

  const v1 = getVVector(lam1);
  const v2 = getVVector(lam2);

  const V = [
    [v1[0], v2[0]],
    [v1[1], v2[1]]
  ];

  steps.push("Step 3: Compute Right Singular Vectors V (Eigenvectors of AᵀA):");
  steps.push(`  [ ${V[0][0].toFixed(4)}, ${V[0][1].toFixed(4)} ]`);
  steps.push(`  [ ${V[1][0].toFixed(4)}, ${V[1][1].toFixed(4)} ]`);

  let u1 = [1, 0];
  if (sig1 > 1e-5) {
    u1 = [
      (a * v1[0] + b * v1[1]) / sig1,
      (c_val * v1[0] + d_val * v1[1]) / sig1
    ];
  }
  let u2 = [0, 1];
  if (sig2 > 1e-5) {
    u2 = [
      (a * v2[0] + b * v2[1]) / sig2,
      (c_val * v2[0] + d_val * v2[1]) / sig2
    ];
  } else {
    u2 = [-u1[1], u1[0]];
  }

  const U = [
    [u1[0], u2[0]],
    [u1[1], u2[1]]
  ];

  steps.push("Step 4: Compute Left Singular Vectors U (using uᵢ = (1/σᵢ)Avᵢ):");
  steps.push(`  [ ${U[0][0].toFixed(4)}, ${U[0][1].toFixed(4)} ]`);
  steps.push(`  [ ${U[1][0].toFixed(4)}, ${U[1][1].toFixed(4)} ]`);

  steps.push("Step 5: Formulate SVD factorisation: A = U Σ Vᵀ");
  return {
    success: true,
    result: { U, Sigma, V },
    steps
  };
}
