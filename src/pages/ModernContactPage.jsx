import React from 'react';
import { motion } from "framer-motion"; // Assuming framer-motion is installed

function ModernContactPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            className="min-h-screen bg-black text-white py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-12 text-center">
                Get in Touch
            </motion.h1>

            <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center text-gray-300 mb-12">
                <p className="text-lg md:text-xl leading-relaxed">
                    Have a question, suggestion, or just want to say hello? Feel free to reach out to us!
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8">
                {/* Email */}
                <a 
                    href="mailto:your.email@example.com" 
                    className="flex flex-col items-center text-gray-400 hover:text-white transition-colors group"
                >
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-gray-800 rounded-full mb-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v5a2 2 0 002 2h14a2 2 0 002-2v-5m-18 0l2.617-1.745A2 2 0 017.55 9m8.9 0a2 2 0 011.333 1.995L21 12m-3 0a2 2 0 00-2 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 00-2-2z" />
                        </svg>
                    </motion.div>
                    <motion.span variants={itemVariants} className="text-lg font-semibold group-hover:underline">Email Us</motion.span>
                </a>

                {/* Social Media - Placeholder */}
                <div className="flex flex-col items-center text-gray-400 group">
                     <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                        className="p-4 bg-gray-800 rounded-full mb-4"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.5 20.5v-5.5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v5.5m0 0v.5a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-.5m-10 0h10m-10 0l.5-2m9.5 2l-.5-2m-5 2v-.5m0 0v-2.5m0 3h-3m3 0h3"/>
                       </svg>
                    </motion.div>
                    <motion.span variants={itemVariants} className="text-lg font-semibold group-hover:underline">Follow Us</motion.span>
                </div>

                {/* Add more contact options like a form or address if needed */}
            </motion.div>

             {/* Placeholder for a simple form or address if needed later */}
             {/*
             <motion.div variants={itemVariants} className="w-full max-w-md mt-12 p-8 bg-gray-800 rounded-lg shadow-lg">
                 <h2 className="text-2xl font-bold text-white mb-6 text-center">Send us a message</h2>
                 {/* Add a simple form here */}
                 <p className="text-gray-400 text-center">Form coming soon...</p>
             </motion.div>
             */}
        </motion.div>
    );
}

export default ModernContactPage; 