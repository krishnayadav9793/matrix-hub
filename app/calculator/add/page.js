"use client";

// import Matrix from "@/app/components/matrix";
import React, { useState } from "react";

export default function Page() {
    const [row, setRow] = useState("");
    const [col, setCol] = useState("");
    const [result, setResult] = useState(null);
    function Matrix(props) {
        const row = props.row
        const col = props.col
        const matrix = Array.from({ length: row }, () =>
            Array.from({ length: col }, () => 0)
        );
        const saveData = (r, c, data) => {
            const intdata = parseInt(data)
            matrix[r][c] = intdata

        }
        const setMatrix = () => {
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    matrix[i][j] += result[i][j]
                }
            }
            setResult(matrix);
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

                <button type="button" onClick={setMatrix}> Add </button>
            </div>

        )
    }
    const saveRowCol = () => {
        const r = parseInt(row);
        const c = parseInt(col);

        if (isNaN(r) || isNaN(c)) return;

        const matrix = Array.from({ length: r }, () =>
            Array.from({ length: c }, () => 0)
        );

        setResult(matrix);
    };
   
    return (
        <div className="p-4 min-h-screen flex justify-center items-center">
            {!result ? (
                <div className="flex justify-center items-center flex-col border-white border-2 p-4 gap-y-4">
                    <div className="flex gap-2">
                        <label>Rows:</label>
                        <input
                            value={row}
                            onChange={(e) => setRow(e.target.value)}
                            className="text-center"
                        />
                    </div>
                    <div className="flex gap-2">
                        <label>Cols:</label>
                        <input
                            value={col}
                            onChange={(e) => setCol(e.target.value)}
                            className="text-center"
                        />
                    </div>




                    <button onClick={saveRowCol} type="button" className="bg-blue-500 rounded-lg p-3">Get Matrix</button>
                </div>
            ) : (
                <div className=" flex min-h-[100%] w-full flex-col justify-center items-center">
                    <Matrix
                        row={row}
                        col={col}

                    />
                    <div className="border-white border-2 p-2 mb-3">
                        {result.map((row, i) => (
                            <div key={i} className="flex gap-2">
                                {row.map((cell, j) => (
                                    <span key={j} >{cell}</span>
                                ))}
                            </div>
                        ))}
                    </div>
                    {console.log(result)}
                    <button className="p-3 bg-blue-500 rounded-lg" onClick={() => setResult(null)}>Reset</button>
                </div>
            )}
        </div>
    );
}
