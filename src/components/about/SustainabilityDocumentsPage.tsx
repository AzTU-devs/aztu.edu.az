"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import { useLanguage } from "@/context/LanguageContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.aztu.edu.az";
const DIR = "/media/prod/documents/sdg";

interface SdgDocument {
    titleAz: string;
    titleEn: string;
    file: string;
}

const DOCUMENTS: SdgDocument[] = [
    {
        titleAz: "AzTU-nun İqlim Tədbirləri Planı",
        titleEn: "Climate Action Plans of AzTU",
        file: "Climate Action Plans of AzTU.pdf",
    },
    {
        titleAz: "Davamlı İnkişaf Məqsədləri üzrə Açar Sözlər",
        titleEn: "SDG Key Words",
        file: "SDG key words.pdf",
    },
    {
        titleAz: "Fənnlərarası Korrelyasiya",
        titleEn: "Subject Correlation Designed",
        file: "Subject correlation designed.pdf",
    },
    {
        titleAz: "AzTU-nun Davamlılıq Planı",
        titleEn: "Sustainability Plan of AzTU",
        file: "Sustainability Plan of AzTU.pdf",
    },
];

const COPY = {
    az: {
        eyebrow: "Normativ Sənədlər",
        title: "Davamlılıq Sənədləri",
        subtitle: "AzTU-nun davamlı inkişaf və iqlim tədbirləri çərçivəsində qəbul etdiyi əsas sənədlər.",
        crumbAbout: "Haqqımızda",
        crumbRegulatory: "Normativ Sənədlər",
        preview: "Önizləmə",
        download: "Yüklə",
        openNewTab: "Yeni səhifədə aç",
        documentsCount: "sənəd",
    },
    en: {
        eyebrow: "Regulatory Documents",
        title: "Sustainability Documents",
        subtitle: "Core documents adopted by AzTU under its sustainable development and climate action commitments.",
        crumbAbout: "About",
        crumbRegulatory: "Regulatory Documents",
        preview: "Preview",
        download: "Download",
        openNewTab: "Open in new tab",
        documentsCount: "documents",
    },
} as const;

function buildUrl(file: string): string {
    return `${API_BASE}${DIR}/${encodeURIComponent(file)}`;
}

export default function SustainabilityDocumentsPage() {
    const { lang } = useLanguage();
    const c = COPY[(lang as "az" | "en") || "az"];
    const [active, setActive] = useState<SdgDocument | null>(null);

    useEffect(() => {
        if (!active) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [active]);

    return (
        <main className="min-h-screen bg-page dark:bg-[#0f172a]">
            <AboutPageBanner
                eyebrow={c.eyebrow}
                title={c.title}
                subtitle={c.subtitle}
                breadcrumbs={[
                    { label: c.crumbAbout, href: lang === "az" ? "/az/haqqimizda" : "/en/about" },
                    {
                        label: c.crumbRegulatory,
                        href:
                            lang === "az"
                                ? "/az/haqqimizda/normativ-senedler"
                                : "/en/about/regulatory-documents",
                    },
                    { label: c.title },
                ]}
            />

            <div className="px-4 md:px-10 lg:px-20 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <EnergySavingsLeafIcon />
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1a2355]/60 dark:text-white/50">
                        {DOCUMENTS.length} {c.documentsCount}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DOCUMENTS.map((doc, i) => {
                        const title = lang === "az" ? doc.titleAz : doc.titleEn;
                        const url = buildUrl(doc.file);
                        return (
                            <motion.button
                                key={doc.file}
                                type="button"
                                onClick={() => setActive(doc)}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="group relative text-left bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-[#1a2355]/10 dark:border-white/10 p-7 hover:border-[#ee7c7e] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="relative z-10 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0 group-hover:scale-110 transition-transform">
                                        <PictureAsPdfIcon sx={{ fontSize: 28 }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-black text-[#1a2355] dark:text-white leading-snug group-hover:text-[#ee7c7e] transition-colors mb-3">
                                            {title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                                                <OpenInNewIcon sx={{ fontSize: 12 }} />
                                                {c.preview}
                                            </span>
                                            <a
                                                href={url}
                                                download={doc.file}
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-white bg-gray-50 dark:bg-slate-800 hover:bg-[#1a2355] hover:text-white dark:hover:bg-[#ee7c7e] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors"
                                            >
                                                <DownloadIcon sx={{ fontSize: 12 }} />
                                                {c.download}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 26, stiffness: 240 }}
                            className="relative w-full max-w-6xl h-[88vh] bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                        <PictureAsPdfIcon sx={{ fontSize: 22 }} />
                                    </div>
                                    <h3 className="text-sm md:text-base font-black text-[#1a2355] dark:text-white truncate">
                                        {lang === "az" ? active.titleAz : active.titleEn}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <a
                                        href={buildUrl(active.file)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={c.openNewTab}
                                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#1a2355] dark:text-white bg-gray-50 dark:bg-slate-800 hover:bg-[#1a2355] hover:text-white px-2.5 sm:px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                                        <span className="hidden sm:inline">{c.openNewTab}</span>
                                    </a>
                                    <a
                                        href={buildUrl(active.file)}
                                        download={active.file}
                                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-[#ee7c7e] hover:bg-[#d96b6d] px-3 py-2 rounded-lg transition-colors"
                                    >
                                        <DownloadIcon sx={{ fontSize: 14 }} />
                                        {c.download}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setActive(null)}
                                        className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#1a2355] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                                        aria-label="Close"
                                    >
                                        <CloseIcon sx={{ fontSize: 18 }} />
                                    </button>
                                </div>
                            </div>
                            <iframe
                                src={buildUrl(active.file)}
                                className="flex-1 w-full bg-gray-100 dark:bg-slate-950"
                                title={lang === "az" ? active.titleAz : active.titleEn}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
