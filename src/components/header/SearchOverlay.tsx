"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import { searchAll } from "@/services/searchService/searchService";
import type { SearchDocType, SearchHit, SearchResults } from "@/types/search";


type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const SECTION_ORDER: SearchDocType[] = [
    "news",
    "announcement",
    "faculty",
    "cafedra",
    "department",
    "employee",
    "research_institute",
    "project",
    "collaboration",
];

type Status = "idle" | "loading" | "results" | "empty" | "degraded";

export default function SearchOverlay({ isOpen, onClose }: Props) {
    const t = useTranslation();
    const { lang } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<SearchResults>({});
    const [status, setStatus] = useState<Status>("idle");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const timeoutId = setTimeout(() => inputRef.current?.focus(), 130);
            return () => clearTimeout(timeoutId);
        }
        setSearchQuery("");
        setResults({});
        setStatus("idle");
    }, [isOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        const trimmed = searchQuery.trim();
        if (trimmed.length < 2) {
            setResults({});
            setStatus("idle");
            return;
        }

        const controller = new AbortController();
        setStatus("loading");
        const timeoutId = setTimeout(async () => {
            try {
                const response = await searchAll(trimmed, lang, { signal: controller.signal });
                if (controller.signal.aborted) return;
                if (response.degraded) {
                    setResults({});
                    setStatus("degraded");
                    return;
                }
                setResults(response.results);
                setStatus(response.total > 0 ? "results" : "empty");
            } catch {
                // CanceledError or transient — stay in loading until next debounce tick
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [searchQuery, lang]);

    const renderHit = (hit: SearchHit) => (
        <Link
            key={`${hit.type}-${hit.id}`}
            href={hit.url ?? "#"}
            onClick={onClose}
            className="block rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-[#5A9BD3]/15 hover:border-[#5A9BD3]/40 transition-all duration-200 px-4 py-3"
        >
            <div
                className="text-white/90 text-sm font-semibold leading-snug line-clamp-2"
                dangerouslySetInnerHTML={{ __html: hit.title ?? "" }}
            />
            {hit.snippet && (
                <div
                    className="text-white/45 text-xs mt-1 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: hit.snippet }}
                />
            )}
        </Link>
    );

    const sectionsWithHits = SECTION_ORDER
        .map((type) => ({ type, hits: results[type] ?? [] }))
        .filter((s) => s.hits.length > 0);

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
                        className="flex-1 flex flex-col items-center px-5 sm:px-10 pt-16 pb-10 overflow-y-auto"
                    >
                        <p className="text-[#5A9BD3] text-[11px] font-bold uppercase tracking-[0.12em] mb-6 select-none">
                            {t.search.header}
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
                                placeholder={t.search.placeholder}
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

                            <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#5A9BD3]/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Body: idle suggestions, loading, results, empty, degraded */}
                        <div className="mt-8 w-full max-w-2xl">
                            {status === "idle" && (
                                <div>
                                    <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3 select-none">
                                        {t.search.popularLabel}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {t.search.suggestions.map((term, i) => (
                                            <motion.button
                                                key={term}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.25, delay: 0.18 + i * 0.04 }}
                                                onClick={() => setSearchQuery(term)}
                                                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] hover:bg-[#5A9BD3]/20 hover:border-[#5A9BD3]/45 text-white/50 hover:text-white text-[13px] font-medium transition-all duration-200 cursor-pointer"
                                            >
                                                <ArrowForwardIcon sx={{ fontSize: 13 }} className="opacity-60" />
                                                {term}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {status === "loading" && (
                                <p className="text-white/40 text-sm text-center mt-6">{t.search.searching}</p>
                            )}

                            {status === "empty" && (
                                <p className="text-white/40 text-sm text-center mt-6">{t.search.noResults}</p>
                            )}

                            {status === "degraded" && (
                                <p className="text-white/40 text-sm text-center mt-6">{t.search.degraded}</p>
                            )}

                            {status === "results" && (
                                <div className="space-y-6">
                                    {sectionsWithHits.map(({ type, hits }) => (
                                        <section key={type}>
                                            <p className="text-[#5A9BD3] text-[11px] font-bold uppercase tracking-widest mb-2">
                                                {t.search.sections[type]}
                                            </p>
                                            <div className="space-y-2">
                                                {hits.map(renderHit)}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Bottom accent */}
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#5A9BD3]/35 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
