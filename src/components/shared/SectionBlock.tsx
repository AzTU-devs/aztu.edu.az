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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        relative rounded-[12px] p-6 md:p-9 transition-all duration-400 overflow-hidden
        ${dark
          ? 'bg-[#1a2355] text-white border border-[#1a2355]'
          : 'surface-card text-[#10163a]'
        }
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center gap-3 mb-7">
          <span className="w-1 h-5 bg-[#ee7c7e] rounded-full" />
          <h2 className={`text-lg md:text-xl font-semibold tracking-[-0.02em] ${dark ? 'text-white' : 'text-[#10163a]'}`}>
            {title}
          </h2>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
