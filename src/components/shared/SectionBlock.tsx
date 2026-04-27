"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
  dark?: boolean;
}

export default function SectionBlock({ title, children, className = "", accent = false, dark = false }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        relative rounded-[2rem] p-6 md:p-10 transition-all duration-500 overflow-hidden
        ${dark 
          ? 'bg-[#1a2355] text-white shadow-2xl border-2 border-[#ee7c7e]/30' 
          : 'bg-white/80 backdrop-blur-3xl text-[#1a2355] shadow-2xl border-2 border-[#1a2355]/5 group hover:border-[#ee7c7e]/30'
        }
        ${className}
      `}
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ee7c7e]/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#ee7c7e]/10 transition-colors" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

      {title && (
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
            <h2 className={`text-xl md:text-2xl font-black uppercase tracking-tighter ${dark ? 'text-white' : 'text-[#1a2355]'}`}>
              {title}
            </h2>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
