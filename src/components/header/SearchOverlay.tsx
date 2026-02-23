"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";

const SUGGESTED_SEARCHES = [
    "Qəbul şərtləri",
    "Kafedra siyahısı",
    "Tədris planı",
    "Magistratura",
    "Elmi jurnallar",
    "Laboratoriyalar",
];

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => inputRef.current?.focus(), 130);
            return () => clearTimeout(t);
        } else {
            setSearchQuery("");
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="search-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="fixed inset-0 z-[9999] bg-[#060f24]/96 backdrop-blur-2xl flex flex-col"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-5 sm:px-10 py-4 border-b border-white/[0.07]">
                        <Image
                            src={AzTULogoDark}
                            alt="AzTU"
                            width={40}
                            height={40}
                            className="h-9 w-auto opacity-75"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.07] hover:bg-white/[0.15] text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
                            aria-label="Close search"
                        >
                            <CloseIcon sx={{ fontSize: 22 }} />
                        </button>
                    </div>

                    {/* Main area */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.07 }}
                        className="flex-1 flex flex-col items-center justify-center px-5 sm:px-10 -mt-10"
                    >
                        <p className="text-[#5A9BD3] text-[11px] font-bold uppercase tracking-[0.22em] mb-6 select-none">
                            AzTU-da axtar
                        </p>

                        {/* Input */}
                        <div className="relative w-full max-w-2xl group">
                            <SearchIcon
                                sx={{ fontSize: 22 }}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#5A9BD3] transition-colors duration-200 pointer-events-none"
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Axtarış sorğusu daxil edin…"
                                className="w-full bg-white/[0.05] border border-white/[0.10] hover:border-white/[0.18] focus:border-[#5A9BD3]/60 focus:bg-white/[0.08] text-white placeholder-white/25 text-lg font-medium px-5 py-4 pl-14 pr-12 rounded-2xl outline-none transition-all duration-300 caret-[#5A9BD3]"
                            />

                            <AnimatePresence>
                                {searchQuery && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.7 }}
                                        transition={{ duration: 0.15 }}
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/75 transition-colors cursor-pointer"
                                        aria-label="Clear"
                                    >
                                        <CloseIcon sx={{ fontSize: 18 }} />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Focus glow line */}
                            <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#5A9BD3]/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Suggestions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.18 }}
                            className="mt-8 w-full max-w-2xl"
                        >
                            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3 select-none">
                                Populyar axtarışlar
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_SEARCHES.map((term, i) => (
                                    <motion.button
                                        key={term}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.22 + i * 0.04 }}
                                        onClick={() => setSearchQuery(term)}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] hover:bg-[#5A9BD3]/20 hover:border-[#5A9BD3]/45 text-white/50 hover:text-white text-[13px] font-medium transition-all duration-200 cursor-pointer"
                                    >
                                        <ArrowForwardIcon sx={{ fontSize: 13 }} className="opacity-60" />
                                        {term}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom accent */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#5A9BD3]/35 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
