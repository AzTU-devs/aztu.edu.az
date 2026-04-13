"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { getCollaborations, type CollaborationItem } from "@/services/collaborationService/collaborationService";
import { API_BASE_URL } from "@/util/apiClient";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function Collaborators() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const t = useTranslation();
    const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);
    const { lang } = useLanguage();

    useEffect(() => {
        getCollaborations({ start: 0, end: 30, lang }).then((res) => {
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setCollaborations(res.collaborations);
            }
        });
    }, [lang]);

    const doubled = [...collaborations, ...collaborations];

    return (
        <section
            ref={sectionRef}
            className="relative px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#0b1330] overflow-hidden transition-colors duration-500"
        >
            {/* BACKGROUND DECORATIONS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03]" 
                     style={{ backgroundImage: 'radial-gradient(#1a2355 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
                
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] bg-[#ee7c7e]/[0.03] dark:bg-[#ee7c7e]/[0.05] blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[30%] bg-[#1a2355]/[0.02] dark:bg-blue-500/[0.03] blur-[80px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 mb-6 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className="text-[#1a2355] dark:text-white text-[11px] font-black uppercase tracking-[0.4em]">
                                {t.collaborators.sectionLabel}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter flex items-center gap-4">
                            <HandshakeIcon sx={{ fontSize: { xs: 32, md: 48 }, opacity: 0.8 }} />
                            {t.collaborators.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/beynelxalq/collaborations">
                            <button className="group flex items-center gap-4 bg-[#1a2355] dark:bg-white/5 backdrop-blur-xl py-4 px-8 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-[#ee7c7e] dark:hover:bg-[#ee7c7e] transition-all duration-500 shadow-xl shadow-[#1a2355]/20 dark:shadow-none cursor-pointer border border-transparent dark:border-white/10">
                                {t.collaborators.viewAll}
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                                </div>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Marquee Track */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Visual container with rounded corners and subtle shadow */}
                    <div className="relative overflow-hidden rounded-[3rem] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm border border-white dark:border-white/5 p-12">
                        
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white/80 dark:from-[#0b1330] to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white/80 dark:from-[#0b1330] to-transparent pointer-events-none" />

                        {doubled.length > 0 ? (
                            <div className="flex animate-marquee gap-8 w-max items-center">
                                {doubled.map((collab, idx) => (
                                    <a
                                        key={idx}
                                        href={collab.website_url || "#"}
                                        target={collab.website_url ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        title={collab.name}
                                        className="group relative flex-shrink-0 flex items-center justify-center w-56 h-36 bg-white dark:bg-white/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 hover:border-[#ee7c7e]/20 dark:hover:border-[#ee7c7e]/30 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className="relative z-10 flex flex-col items-center gap-4 px-6">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`${API_BASE_URL}/${collab.logo}`}
                                                alt={collab.name}
                                                className="max-h-14 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                            <span className="text-[10px] font-black text-[#1a2355]/30 dark:text-white/20 group-hover:text-[#1a2355] dark:group-hover:text-white text-center uppercase tracking-[0.2em] transition-colors duration-500 line-clamp-1 max-w-full">
                                                {collab.name}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="flex animate-pulse gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex-shrink-0 w-56 h-36 bg-gray-100 dark:bg-white/5 rounded-[2.5rem]" />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Subtle bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        </section>
    );
}
