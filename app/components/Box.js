"use client";
import { motion } from "framer-motion";

export default function Box({ category, children }) {
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
                    <div
                        key={i}
                        className="px-3 py-1 bg-white/80 border border-gray-300 
                       rounded-full text-sm shadow-sm
                       hover:bg-white transition-all text-gray-800"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
