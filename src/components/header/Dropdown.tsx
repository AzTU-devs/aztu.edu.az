"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { MenuHeader } from "@/services/menu/menuService";
import { getArticleCounters, type ArticleCounters } from "@/services/article/articleService";
import AzTUBg from "@/../public/aztu.png";
import ScopusLogo from "@/../public/logos/scopus-logo.svg";
import WosLogo from "@/../public/logos/wos-logo.svg";

type Props = {
  header: MenuHeader;
};

export default function Dropdown({ header }: Props) {
  const isResearch = header.slug === "tedqiqat";
  const [counters, setCounters] = useState<ArticleCounters | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isResearch) return;
    setLoading(true);
    getArticleCounters().then((data) => {
      setCounters(data);
      setLoading(false);
    });
  }, [isResearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-x-0 top-full w-full bg-white dark:bg-[#0b1330] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-t border-[#1a2355]/20 dark:border-[#ee7c7e]/15 z-40 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Dotted Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.04]"
               style={{ backgroundImage: 'radial-gradient(#ee7c7e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

          {/* Technical Blueprint Lines */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]">
              <svg width="100%" height="100%" fill="none">
                  <defs>
                      <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
                          <path d="M 160 0 L 0 0 0 160" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
          </div>

          {/* Floating Geometric Accents */}
          <div className="absolute top-20 right-[15%] w-32 h-32 border border-[#ee7c7e]/25 rounded-3xl rotate-12 animate-pulse" />
          <div className="absolute bottom-40 left-[10%] w-48 h-48 border border-[#1a2355]/20 dark:border-[#ee7c7e]/15 rounded-full" />

          {/* Subtle Mesh Gradients / Glow Orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ee7c7e]/[0.04] dark:bg-[#ee7c7e]/[0.08] blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[20%] left-[-5%] w-[30%] h-[40%] bg-[#1a2355]/[0.03] dark:bg-blue-500/[0.04] blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#1a2355]/[0.03] dark:bg-white/[0.02] blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[25%] bg-[#ee7c7e]/[0.02] blur-[80px] rounded-full" />
          
          {/* Brand Watermark */}
          <div className="absolute right-10 bottom-10 select-none opacity-[0.03] dark:opacity-[0.06]">
              <h1 className="text-[200px] font-black tracking-tighter leading-none text-[#1a2355] dark:text-white">AzTU</h1>
          </div>
      </div>

      <div className="relative z-10 flex items-stretch px-[40px] md:px-[60px] xl:px-[80px] py-12 max-w-[1800px] mx-auto gap-10 min-h-[600px]">
        
        {/* LEFT VISUAL: The Immersive Banner */}
        <div className="hidden lg:block w-[340px] xl:w-[440px] flex-shrink-0 relative rounded-[3rem] overflow-hidden shadow-2xl group/banner ring-1 ring-black/5 dark:ring-white/10">
            <Image
                src={AzTUBg}
                alt="AzTU"
                fill
                className="object-cover transition-transform duration-1000 group-hover/banner:scale-110"
                priority
            />
            {/* Multi-layered dark/brand overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355] via-[#1a2355]/40 to-transparent dark:from-[#0b1330] dark:via-transparent" />
            <div className="absolute inset-0 bg-black/10 dark:bg-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-6 shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                            Global Leader
                        </span>
                    </div>
                    <h3 className="text-white text-5xl font-black leading-tight tracking-tighter mb-4 drop-shadow-2xl">
                        {header.title}
                    </h3>
                    <p className="text-white/60 text-base font-bold leading-relaxed max-w-[300px] uppercase tracking-widest border-l-2 border-[#ee7c7e] pl-4">
                        Defining the next generation of technical education.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* RIGHT CONTENT: High-Density Card Grid */}
        <div className="flex-1 py-2 relative">
            {/* Background Content Panel */}
            <div className="absolute inset-0 bg-gray-50/40 dark:bg-white/[0.01] rounded-[3rem] -m-6 pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {header.items.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                        className="group/item flex flex-col bg-white dark:bg-white/5 hover:bg-white dark:hover:bg-white/[0.08] p-8 rounded-[2.5rem] border border-[#1a2355]/20 dark:border-[#ee7c7e]/15 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all duration-500"
                    >
                        {/* Category Header */}
                        <div className="relative mb-6">
                            {item.direct_url ? (
                                <Link
                                    href={item.direct_url}
                                    className="inline-flex items-center group/title"
                                >
                                    <span className="text-[13px] font-black uppercase tracking-[0.25em] text-[#1a2355] dark:text-blue-300 group-hover/title:text-[#ee7c7e] transition-colors duration-300">
                                        {item.title}
                                    </span>
                                </Link>
                            ) : (
                                <span className="text-[13px] font-black uppercase tracking-[0.25em] text-[#1a2355]/30 dark:text-white/20">
                                    {item.title}
                                </span>
                            )}
                            {/* Stylish Dot Indicator */}
                            <div className="h-1.5 w-1.5 bg-[#ee7c7e] rounded-full mt-2 group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_#ee7c7e] transition-all duration-300" />
                        </div>

                        {/* Level 3 Link List */}
                        {item.sub_items && item.sub_items.length > 0 && (
                            <ul className="flex flex-col gap-1">
                                {item.sub_items.map((sub) => (
                                    <li key={sub.id}>
                                        <Link
                                            href={sub.direct_url}
                                            className="group/link flex items-center py-2 text-[14.5px] font-bold text-gray-500 dark:text-white/50 hover:text-[#1a2355] dark:hover:text-white transition-all duration-300"
                                        >
                                            <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                                                {sub.title}
                                            </span>
                                            <ChevronRightIcon 
                                                sx={{ fontSize: 14 }} 
                                                className="ml-2 text-[#ee7c7e] opacity-0 group-hover/link:opacity-100 transition-all duration-300"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Scopus & WoS counter widget — only for the Research (Tedqiqat) dropdown */}
      {isResearch && (
        <div className="absolute bottom-8 right-[40px] md:right-[60px] xl:right-[80px] z-20 flex gap-3">
          {/* Scopus card */}
          <div className="flex flex-col items-center gap-2 bg-white dark:bg-white/5 border border-[#1a2355]/15 dark:border-[#ee7c7e]/15 rounded-2xl px-5 py-3 shadow-lg min-w-[120px]">
            <Image src={ScopusLogo} alt="Scopus" width={90} height={28} className="object-contain" />
            <div className="text-center">
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#F08300] border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <span className="text-xl font-black text-[#F08300]">
                  {counters?.scopus ?? "—"}
                </span>
              )}
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mt-0.5">articles</p>
            </div>
          </div>

          {/* Web of Science card */}
          <div className="flex flex-col items-center gap-2 bg-white dark:bg-white/5 border border-[#1a2355]/15 dark:border-[#ee7c7e]/15 rounded-2xl px-5 py-3 shadow-lg min-w-[120px]">
            <Image src={WosLogo} alt="Web of Science" width={110} height={28} className="object-contain" />
            <div className="text-center">
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#005A9C] border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <span className="text-xl font-black text-[#005A9C]">
                  {counters?.wos ?? "—"}
                </span>
              )}
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mt-0.5">articles</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ChevronRightIcon({ className, sx }: { className?: string; sx?: any }) {
    return (
        <svg 
            className={className}
            style={sx}
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );
}
