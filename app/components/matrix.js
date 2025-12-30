"use client"
import React from 'react'

function Matrix(props) {
  const row = props.row
  const col = props.col
  // let matrixArray = props.matrixArray
  const setAllMatrix =props.setResult
  const matrix = props.result;
  const setMat=props.setMat;
  const saveData = (r, c, data) => {
    const intdata = parseInt(data)
    matrix[r][c]=intdata
    
  }
  const setMatrix = ()=>{
    setAllMatrix(matrix)
    // setMat();
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
      
      <button type="button" onClick={setMatrix}> save</button>
    </div>

  )
}

export default Matrix
