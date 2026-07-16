"use client";

import React from "react";
import MatrixCalculator from "../components/MatrixCalculator";

export default function CalculatorPage() {
  return (
    <div className="bg-[#020502] min-h-screen">
      <MatrixCalculator initialOp="add" />
    </div>
  );
}

