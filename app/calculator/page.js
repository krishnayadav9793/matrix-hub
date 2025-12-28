"use client"

import React, { useState } from 'react'
import Matrix from '../components/matrix'
import Popup from 'reactjs-popup'
import { matrixArray } from '../util/array'
function page() {
  // let matrixArray = []
  const [matrix, setMatrix] = useState();
  const [allMatrix, setAllMatrix] = useState([1, 2, 3], [2, 1, 2]);
  const getMatrix = () => {
    const row = document.getElementById("row").value;
    const col = document.getElementById("col").value;

    setMatrix(<Matrix row={row} col={col} matrixArray={matrixArray} setAllMatrix={setAllMatrix} />)
    document.getElementById("matrix").style.display = "enable"
  }
  const [isShow, setIsShow] = useState(false);
  const selectMatrix = () => {
    console.log("clicked")
    setIsShow(true);

  }
  return (
    <div>
      <button onClick={selectMatrix} >select matrices</button>
      {allMatrix.map((ele) => {
        ele.map(e => {
          return <div>{e}</div>
        })
      })
      }
      <Popup
        trigger={<button className="trigger-button">Add a matrix</button>}
        position="center center" modal nested
      >
        {
          close =>
          (<div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>

            <div className='flex flex-col  p-2 border-2 border-white gap-5'>
              <label>Row:</label>
              <input type='number' id="row"></input>
              <label>Column:</label>
              <input type='number' id="col"></input>
              <button onClick={getMatrix}>Add a matrix</button>
            </div>
            <div className='disabled' id="matrix">
              {matrix}
            </div>
          </div>)

        }
      </Popup>
      <div>
        <h1>Operations</h1>
        <div className='flex gap-5 w-full flex-wrap'>
          <button >Add</button>
          <button>Subtraction</button>
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
    </div>
  )
}

export default page
