"use client"
import React, { react, useState, useEffect, useRef } from 'react'
import { POST } from '../api/gemini/route';

function cleanMarkdown(text) {
  return text
    .replace(/\*\*/g, "")      // remove bold **
    .replace(/\*/g, "")        // remove single *
    .replace(/#+/g, "")        // remove headings #
    .replace(/[`>]/g, "")      // remove ` and > 
    .replace(/\n{2,}/g, "\n") // reduce double line breaks
}
function AI() {

  const [response, setResponse] = useState("Ask doubts");
  const [pro ,setPro]= useState();
  const getResponse = async () => {
    setResponse("Thinking.....")
    const prompt = document.getElementById("prompt input").value
    setPro(prompt)

    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();
    console.log(data.output);
    const result =cleanMarkdown(data.output)
    setResponse(result)

  }
  return (
    <div>
      <div  className='p-6 rounded-xl bg-gray-100/70 
                 border border-gray-300 shadow-lg 
                  m-4 text-black' >
        <div className='border-b-4 justify-center align-middle flex capitalize text-3xl pb-3'>
          {pro}
        </div>
        <div className='pt-3'>
            {response}
        </div>
        
      </div>
      <div className='prompt-input justify-center border-1 flex flex-row p-2 m-4  bottom-4 w-100% rounded-xl  static'>
        <input type='text' placeholder='Ask doubts....' autocomplete="off" id="prompt input" className='justify-center  border-radius-50 w-full focus:outline-none'>
        </input>
        <button className=' rounded-xl bg-white
                 border border-gray-300 shadow-lg 
                  m-4 text-black px-4' onClick={getResponse}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default AI
