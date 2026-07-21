"use client";

import Link from "next/link";
import Image from "next/image";
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
            className="relative bg-white section-padding"
        >
            <div className="shell !px-0">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-6 h-px bg-[#ee7c7e]" />
                            <span className="eyebrow">{t.collaborators.sectionLabel}</span>
                        </div>
                        <h2 className="section-title flex items-center gap-4">
                            <HandshakeIcon sx={{ fontSize: { xs: 28, md: 36 }, opacity: 0.55 }} />
                            {t.collaborators.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/beynelxalq/collaborations">
                            <button className="group inline-flex items-center gap-3 rounded-full border border-[#1a2355]/12 bg-white py-3 pl-6 pr-3 text-[13px] font-semibold text-[#10163a] transition-all duration-300 hover:border-[#1a2355] hover:bg-[#1a2355] hover:text-white cursor-pointer">
                                {t.collaborators.viewAll}
                                <span className="w-8 h-8 rounded-full bg-[#1a2355]/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/15">
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </span>
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
                    <div className="relative overflow-hidden rounded-[12px] bg-white border border-[#1a2355]/[0.09] py-10">

                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                        {doubled.length > 0 ? (
                            <div className="flex animate-marquee gap-8 w-max items-center">
                                {doubled.map((collab, idx) => (
                                    <a
                                        key={idx}
                                        href={collab.website_url || "#"}
                                        target={collab.website_url ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        title={collab.name}
                                        className="group relative flex-shrink-0 flex items-center justify-center w-52 h-32 bg-white rounded-[10px] transition-all duration-500 border border-[#1a2355]/[0.09] hover:border-[#1a2355]/20 overflow-hidden"
                                    >
                                        <div className="relative z-10 flex flex-col items-center gap-4 px-6">
                                            <Image
                                                src={`${API_BASE_URL}/${collab.logo}`}
                                                alt={collab.name}
                                                width={112}
                                                height={56}
                                                loading="lazy"
                                                sizes="112px"
                                                className="max-h-14 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-110"
                                                unoptimized={false}
                                            />
                                            <span className="text-[10px] font-semibold text-[#8a93ad] group-hover:text-[#10163a] text-center uppercase tracking-[0.12em] transition-colors duration-500 line-clamp-1 max-w-full">
                                                {collab.name}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="flex animate-pulse gap-8">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex-shrink-0 w-52 h-32 bg-[#1a2355]/[0.04] rounded-[10px]" />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
