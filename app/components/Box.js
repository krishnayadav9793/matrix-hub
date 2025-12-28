"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Popup from "reactjs-popup";
import {def} from '../util/def.js'
export default function Box({ category, children }) {
    const [con, setCon] = useState("Click button get Data");
    const formateCon =(terms)=>{
        return <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            
        >
            <h1 className="justify-center border-b-4">
                {terms.term}
            </h1>
            <div className="flex flex-col ">
                <div className="flex justify-center items-center break-words whitespace-pre-wrap overflow-x-hidden
">
                    {terms.description}
                </div>
                <div className="mt-3">
                    {terms.example}
                </div>
                
            </div>
        </motion.div>
    }
    const Getdata =  (item) => {
        console.log(item.key)
        console.log(def)
        def.forEach(element => {
            element.definitions.forEach(terms=>{
                if(terms.term===item.key){
                    const formatedCon =formateCon(terms)
                    setCon(formatedCon)
                }
            })
        });
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="p-6 rounded-xl bg-gray-100/70 
                 border border-gray-300 shadow-lg 
                 backdrop-blur-sm my-6"
        >
            <h1 className="text-xl font-bold text-gray-800 mb-4">
                {category}
            </h1>

            <div className="flex flex-wrap gap-3">
                {children.map((item, i) => (
                    <Popup
                        key={i}
                        trigger={
                            <button
                                className="px-3 py-1 bg-white/80 border border-gray-300 
                           rounded-full text-sm shadow-sm
                           hover:bg-white transition-all text-gray-800"
                                
                            >
                                {item}
                            </button>
                        }
                        modal
                        nested
                        lockScroll
                        closeOnDocumentClick={false}
                        overlayStyle={{
                            background: "grey",
                            opacity: 1,
                            position: "fixed",
                            inset: 0,
                            zIndex: 50,
                        }}
                    >
                        {(close) => (
                            <div className="p-3 rounded-xl bg-gray-100 
                              border border-gray-300 shadow-lg 
                              w-[350px] text-black flex flex-col relative">

                                <button
                                    className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
                                    onClick={()=>{ setCon("Click button get Data")
                                        close()
                                    }}
                                >
                                    &times;
                                </button>

                                <div className="header text-xl font-semibold mb-3">
                                    {item}
                                </div>

                                <pre className="content mb-4 no-scrollbar text-sm break-words whitespace-pre-wrap overflow-x-hidden
">
                                    {con}
                                    
                                </pre>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded mb-3"
                                    onClick={()=>Getdata(item)}
                                >
                                    Get Data
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                    onClick={()=>{ setCon("Click button get Data")
                                        close()
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </Popup>
                ))}
            </div>
        </motion.div>
    );
}
