"use client";

import { motion } from "framer-motion";

export interface TimelineItem {
    year?: string;
    period?: string;
    title: string;
    description?: string;
    inst?: string;
    degree?: string;
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

export default function Timeline({ items, className = "" }: TimelineProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Vertical Line */}
            <div className="absolute left-[19px] md:left-[23px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#ee7c7e] via-[#1a2355] to-[#ee7c7e] rounded-full opacity-30 dark:opacity-50" />

            <div className="space-y-12">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-12 md:pl-16 group"
                    >
                        {/* Dot */}
                        <div className="absolute left-0 top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-[#050816] border-4 border-[#ee7c7e] z-10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                             <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                        </div>
                        
                        {/* Glow */}
                        <div className="absolute left-[-10px] top-[-10px] w-24 h-24 bg-[#ee7c7e]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-[#ee7c7e]/20 shadow-xl hover:shadow-2xl hover:border-[#ee7c7e]/40 transition-all duration-300">
                            {(item.year || item.period) && (
                                <span className="inline-block px-3 py-1 rounded-lg bg-[#ee7c7e]/10 text-[#ee7c7e] text-[10px] font-black uppercase tracking-widest mb-3">
                                    {item.year || item.period}
                                </span>
                            )}
                            <h3 className="text-xl md:text-2xl font-black text-[#1a2355] dark:text-white mb-2 group-hover:text-[#ee7c7e] transition-colors">
                                {item.title || item.degree}
                            </h3>
                            {item.inst && (
                                <p className="text-[#ee7c7e] font-bold text-sm mb-2">{item.inst}</p>
                            )}
                            {item.description && (
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
