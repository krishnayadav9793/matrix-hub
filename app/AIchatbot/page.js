"use client"
import React, { react, useState, useEffect, useRef } from 'react'
import { POST } from '../api/gemini/route';
import { MotionConfig } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [pro, setPro] = useState();
  const inputRef = useRef();
  const getResponse = async () => {
    setResponse("Thinking.....")
    const prompt = document.getElementById("prompt input").value
    setPro(prompt)
    inputRef.current.value = "";
    try{
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
    const result = cleanMarkdown(data.output)
    setResponse(result)
    }catch(err){
      setResponse("Something went wrong .....")
    }
  

  }
  return (
    <div>
      <div className='p-6 rounded-xl bg-gray-100/70 
                 border border-gray-300 shadow-lg 
                  m-4 text-black' >
        <div className='border-b-4 justify-center align-middle flex capitalize text-3xl pb-3'>
          {pro}
        </div>
        <AnimatePresence mode="wait">
          <motion.div className='pt-3'
            key={response}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            {response}
          </motion.div>
        </AnimatePresence>


      </div>


      <div className='prompt-input justify-center border-1 flex flex-row p-2 m-4  bottom-4 w-100% rounded-xl  static'>
        <input type='text' ref={inputRef} placeholder='Ask doubts....' onChange={(e) => setValue(e.target.value)} autocomplete="off" id="prompt input" className='justify-center  border-radius-50 w-full focus:outline-none'>
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
