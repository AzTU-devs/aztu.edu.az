"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HandshakeIcon from "@mui/icons-material/Handshake";

interface CollaboratorInterface {
    name: string;
    logo: string;
    url: string;
    acronym?: string;
}

const collaborators: CollaboratorInterface[] = [
    {
        name: "UNESCO",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/UNESCO_logo.svg/320px-UNESCO_logo.svg.png",
        url: "https://www.unesco.org",
    },
    {
        name: "ERASMUS+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Erasmus%2B_Logo.svg/320px-Erasmus%2B_Logo.svg.png",
        url: "https://erasmus-plus.ec.europa.eu",
    },
    {
        name: "TÜBİTAK",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/T%C3%BCbitak_logo.svg/320px-T%C3%BCbitak_logo.svg.png",
        url: "https://www.tubitak.gov.tr",
    },
    {
        name: "SOCAR",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/SOCAR_logo.svg/320px-SOCAR_logo.svg.png",
        url: "https://www.socar.az",
    },
    {
        name: "TEMPUS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png",
        url: "https://eacea.ec.europa.eu/tempus",
        acronym: "TEMPUS",
    },
    {
        name: "Bologna Process",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png",
        url: "https://www.ehea.info",
        acronym: "EHEA",
    },
    {
        name: "British Council",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/British_Council_logo.svg/320px-British_Council_logo.svg.png",
        url: "https://www.britishcouncil.org",
    },
    {
        name: "DAAD",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/DAAD_logo.svg/320px-DAAD_logo.svg.png",
        url: "https://www.daad.de",
    },
];

const doubled = [...collaborators, ...collaborators];

export default function Collaborators() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

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
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-2 bg-[#1a2355] py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer hover:bg-[#0b1330] transition-colors duration-300"
                >
                    Bütün Əməkdaşlar
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </motion.button>
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

                <div className="flex animate-marquee gap-6 w-max">
                    {doubled.map((collab, idx) => (
                        <a
                            key={idx}
                            href={collab.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={collab.name}
                            className="group flex-shrink-0 flex flex-col items-center justify-center gap-2 w-44 h-28 bg-white dark:bg-slate-800 rounded-2xl shadow-md px-4 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#1a2355]/20 dark:hover:border-white/10"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={collab.logo}
                                alt={collab.name}
                                className="max-h-11 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-105"
                            />
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-[#1a2355] dark:group-hover:text-white text-center uppercase tracking-wide transition-colors duration-300">
                                {collab.acronym ?? collab.name}
                            </span>
                        </a>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
