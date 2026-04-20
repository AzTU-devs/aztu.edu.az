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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`
        relative rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 overflow-hidden border-premium
        ${dark 
          ? 'bg-[#1a2355] text-white shadow-2xl' 
          : 'bg-white/70 dark:bg-white/5 backdrop-blur-xl text-[#1a2355] dark:text-white shadow-xl shadow-blue-900/5'
        }
        ${className}
      `}
    >
      {/* Subtle Background Glow for Dark Mode */}
      {dark && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      )}

      {title && (
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            {accent && (
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e]/40" />
              </div>
            )}
            <h2 className={`text-sm font-black uppercase tracking-[0.3em] ${dark ? 'text-[#ee7c7e]' : 'text-[#ee7c7e]'}`}>
              {title}
            </h2>
          </div>
          <div className={`h-px w-20 bg-gradient-to-r from-[#ee7c7e] to-transparent`} />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
