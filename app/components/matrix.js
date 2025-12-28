"use client"
import React from 'react'

function Matrix(props) {
  const row = props.row
  const col = props.col
  let matrixArray = props.matrixArray
  const setAllMatrix =props.setAllMatrix
  const matrix = []
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = 0;
    }
  }
  const saveData = (r, c, data) => {
    const intdata = parseInt(data)
    matrix[r][c] = intdata;
    // console.log(matrix)
  }
  const storeData = ()=>{
    // console.log("clicked")
    
    matrixArray.push(matrix)
    setAllMatrix(matrixArray)
    console.log(matrixArray)
  }
  return (
    <div id="matrix" className="grid gap-2  p-6 rounded-xl bg-gray-100/70 
                 border border-gray-300 shadow-lg 
                  m-4 text-black w-fit">
      {Array.from({ length: row }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: col }).map((_, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              className="w-16 border p-1 rounded"
              onChange={(e) => saveData(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button className='bg-blue-600 rounded-b-md' onClick={storeData}>
        Save
      </button>

    </div>

  )
}

export default Matrix
