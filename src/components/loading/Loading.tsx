"use client";

import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#0b1330] overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dotted Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.05]" 
                    style={{ 
                        backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', 
                        backgroundSize: '32px 32px' 
                    }} 
                />
                
                {/* Glow Orbs */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#1a2355] blur-[120px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#ee7c7e] blur-[100px] rounded-full" 
                />
            </div>

            {/* Logo and Progress */}
            <div className="relative flex flex-col items-center gap-12 z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="relative"
                >
                    {/* Pulsing ring around logo */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.15, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-[-40px] border border-white/20 rounded-full"
                    />
                    <motion.div
                        animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute inset-[-80px] border border-white/10 rounded-full"
                    />

                    <div className="bg-white/5 backdrop-blur-xl p-12 rounded-full border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image
                            src={AzTULogoLight}
                            alt="Azərbaycan Texniki Universiteti"
                            width={160}
                            priority
                            className="relative z-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col items-center gap-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-white text-lg md:text-xl font-black uppercase tracking-[0.4em] text-center max-w-md leading-relaxed"
                    >
                        Azərbaycan Texniki Universiteti
                    </motion.h1>
                    
                    {/* Animated Progress Bar */}
                    <div className="w-64 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden relative">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Watermark */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-10 select-none"
            >
                <h2 className="text-[120px] font-black tracking-tighter text-white uppercase">Loading</h2>
            </motion.div>
        </div>
    );
}
