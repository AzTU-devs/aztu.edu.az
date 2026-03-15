"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { getCollaborations, type CollaborationItem } from "@/services/collaborationService/collaborationService";
import { API_BASE_URL } from "@/util/apiClient";

export default function Collaborators() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);

    useEffect(() => {
        getCollaborations({ start: 0, end: 30, lang: "az" }).then((res) => {
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setCollaborations(res.collaborations);
            }
        });
    }, []);

    const doubled = [...collaborations, ...collaborations];

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50 dark:bg-[#0a1120] overflow-hidden relative"
        >
            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
            >
                <div>
                    <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                        Qlobal Tərəfdaşlar
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2355] dark:text-white leading-tight flex items-center gap-3">
                        <HandshakeIcon sx={{ fontSize: 34, opacity: 0.7 }} />
                        Əməkdaşlar
                    </h2>
                </div>
                <Link href="/beynelxalq/collaborations">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-2 bg-[#1a2355] py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer hover:bg-[#0b1330] transition-colors duration-300"
                    >
                        Bütün Əməkdaşlar
                        <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </motion.button>
                </Link>
            </motion.div>

            {/* Marquee Track */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden"
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-gray-50 dark:from-[#0a1120] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 dark:from-[#0a1120] to-transparent pointer-events-none" />

                {doubled.length > 0 ? (
                    <div className="flex animate-marquee gap-6 w-max">
                        {doubled.map((collab, idx) => (
                            <a
                                key={idx}
                                href={collab.website_url || "#"}
                                target={collab.website_url ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                title={collab.name}
                                className="group flex-shrink-0 flex flex-col items-center justify-center gap-2 w-44 h-28 bg-white dark:bg-slate-800 rounded-2xl shadow-md px-4 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#1a2355]/20 dark:hover:border-white/10"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`${API_BASE_URL}/${collab.logo}`}
                                    alt={collab.name}
                                    className="max-h-11 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-[#1a2355] dark:group-hover:text-white text-center uppercase tracking-wide transition-colors duration-300">
                                    {collab.name}
                                </span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="flex animate-pulse gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex-shrink-0 w-44 h-28 bg-gray-200 dark:bg-slate-800 rounded-2xl" />
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
