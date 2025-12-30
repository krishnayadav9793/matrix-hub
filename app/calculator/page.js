"use client"

import Link from 'next/link'
import React, { useState } from 'react'

function page() {
  // let matrixArray = []

  return (
    <div className='grid grid-rows-2 min-h-screen'>
      <h1 className='text-center'>Operations</h1>
      <div className='flex gap-5 w-full flex-wrap'>
        <Link href={"calculator/add"}> <button type="button">Add</button></Link>
        <Link href={"calculator/subtract"}> <button type='button'>Subtraction</button></Link>

        
        <button>Multiplication</button>
        <button>Traverese</button>
        <button>Inverse</button>
        <button>SDV</button>
        <button>Determinant</button>
        <button>Trace</button>
        <button>Rank</button>
        <button>Eigenvectors & Eigenvalues</button>
        <button>Diagonalization</button>
        <button>LU Transformations</button>
      </div>
    </div>
  )
}

export default page
