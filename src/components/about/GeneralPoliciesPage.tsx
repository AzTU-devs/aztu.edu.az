"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import { useLanguage } from "@/context/LanguageContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.aztu.edu.az";
const AZ_DIR = "/media/prod/policies/policies_az";
const EN_DIR = "/media/prod/policies/policies_en";

interface Policy {
    titleAz: string;
    titleEn: string;
    fileAz: string;
    fileEn: string;
}

const POLICIES: Policy[] = [
    {
        titleAz: "Açıq Giriş Siyasəti",
        titleEn: "Open Access Policy",
        fileAz: "Açıq Giriş Siyasəti.pdf",
        fileEn: "Open access policy.pdf",
    },
    {
        titleAz: "Akademik Azadlıq Siyasəti",
        titleEn: "Academic Freedom Policy",
        fileAz: "Akademik Azadlıq Siyasəti.pdf",
        fileEn: "Academic Freedom Policy.pdf",
    },
    {
        titleAz: "Ayrı-seçkiliyin Qadağan Edilməsi və Təqibin Qarşısının Alınması Siyasəti",
        titleEn: "Non-discrimination Policy",
        fileAz: "Ayrı-seçkiliyin Qadağan Edilməsi və Təqibin Qarşısının Alınması Siyasəti.pdf",
        fileEn: "Non-discrimination Policy.pdf",
    },
    {
        titleAz: "Bərabərlik, Müxtəliflik və İnklüzivlik Siyasəti",
        titleEn: "Equality, Diversity and Inclusivity Policy",
        fileAz: "Bərabərlik, Müxtəliflik və İnklüzivlik Siyasəti.pdf",
        fileEn: "Equality-Diversity-Inclusivity Policy of AzTU.pdf",
    },
    {
        titleAz: "Davamlı İnvestisiya Siyasəti",
        titleEn: "Sustainable Investment Policy",
        fileAz: "Davamlı İnvestisiya Siyasəti.pdf",
        fileEn: "Sustainable Investment Policy of Azerbaijan Technical University (1).pdf",
    },
    {
        titleAz: "Davamlılıq Siyasəti",
        titleEn: "Sustainability Policy",
        fileAz: "Davamlılıq Siyasəti.pdf",
        fileEn: "Sustainability Policy.pdf",
    },
    {
        titleAz: "Davamlı Maliyyələşdirmə Siyasəti",
        titleEn: "Sustainable Funding Policy",
        fileAz: "Davamlı Maliyyələşdirmə Siyasəti.pdf",
        fileEn: "Sustainable Funding Policy.pdf",
    },
    {
        titleAz: "Davamlı Satınalma Siyasəti",
        titleEn: "Sustainable Procurement Policy",
        fileAz: "Davamlı Satınalma Siyasəti.pdf",
        fileEn: "Sustainable Procurement  Policy of Azerbaijan Technical University (1).pdf",
    },
    {
        titleAz: "Davranış Kodeksi Siyasəti",
        titleEn: "Code of Conduct",
        fileAz: "Davranış Kodeksi Siyasəti.pdf",
        fileEn: "Code-of-Conduct.pdf",
    },
    {
        titleAz: "Enerji Səmərəliliyi və Təmiz Enerji Siyasəti",
        titleEn: "Energy Efficiency and Clean Energy Policy",
        fileAz: "Enerji Səmərəliliyi və Təmiz Enerji Siyasəti.pdf",
        fileEn: "Energy Efficiency and Clean Energy.pdf",
    },
    {
        titleAz: "Əlilliyi olan tələbə və əməkdaşlar üçün uyğunlaşdırma siyasəti",
        titleEn: "Disability Accommodation Policy",
        fileAz: "Əlilliyi olan tələbə və əməkdaşlar üçün uyğunlaşdırma siyasəti.pdf",
        fileEn: "Disability Accomodation Policy.pdf",
    },
    {
        titleAz: "Əmək Hüquqları Siyasəti",
        titleEn: "Labor Policy",
        fileAz: "Əmək Hüquqları Siyasəti.pdf",
        fileEn: "Labor Policy.pdf",
    },
    {
        titleAz: "Ətraf Mühit Siyasəti",
        titleEn: "Environmental Policy",
        fileAz: "Ətraf Mühit Siyasəti.pdf",
        fileEn: "Environmental Policy.pdf",
    },
    {
        titleAz: "Gender Bərabərliyi Siyasəti",
        titleEn: "Gender Equality Policy",
        fileAz: "Gender Bərabərliyi Siyasəti.pdf",
        fileEn: "Gender Equality Policy of Azerbaijan Technical University.pdf",
    },
    {
        titleAz: "Holistik Etik Siyasət",
        titleEn: "Holistic Ethical Policy",
        fileAz: "Holistik Etik Siyasət.pdf",
        fileEn: "Holistic Ethical Policy.pdf",
    },
    {
        titleAz: "İdarəetmə Siyasəti",
        titleEn: "Governance Policy",
        fileAz: "İdarəetmə Siyasəti.pdf",
        fileEn: "Governance-Policy-of-Azerbaijan-Technical-University-2-4.pdf",
    },
    {
        titleAz: "İqlim Dəyişikliyi ilə Mübarizə Siyasəti",
        titleEn: "Climate Action Policy",
        fileAz: "İqlim Dəyişikliyi ilə Mübarizə Siyasəti.pdf",
        fileEn: "Climate Action Policy of Azerbaijan Technical University.pdf",
    },
    {
        titleAz: "Kampusdaxili Mobillik Siyasəti",
        titleEn: "Campus Internal Mobility Policy",
        fileAz: "Kampusdaxili Mobillik Siyasəti.pdf",
        fileEn: "Campus Internal Mobility Policy.pdf",
    },
    {
        titleAz: "Keyfiyyətin Təminatı Siyasəti",
        titleEn: "Quality Assurance Policy",
        fileAz: "Keyfiyyətin Təminatı Siyasəti.pdf",
        fileEn: "Quality Assurance Policy of AzTU.pdf",
    },
    {
        titleAz: "Menecment Siyasəti",
        titleEn: "Management Policy",
        fileAz: "Menecment Siyasəti.pdf",
        fileEn: "Management Policy of AzTU.pdf",
    },
    {
        titleAz: "Rüşvətə və Korrupsiyaya Qarşı Siyasəti",
        titleEn: "Anti-Bribery and Anti-Corruption Policy",
        fileAz: "Rüşvətə və Korrupsiyaya Qarşı Siyasəti.pdf",
        fileEn: "Anti-Bribery-and-Anti-Corruption-Policy-of-Azerbaijan-Technical-University.pdf",
    },
    {
        titleAz: "Sağlamlıq, Rifah və Təhlükəsizlik Siyasəti",
        titleEn: "Health, Welfare and Safety Policy",
        fileAz: "Sağlamlıq, Rifah və Təhlükəsizlik Siyasəti.pdf",
        fileEn: "Health, Welfare and Safety Policy of AzTU.pdf",
    },
    {
        titleAz: "Su Təkrar İstifadəsi Siyasəti",
        titleEn: "Water Recycling Program Implementation Policy",
        fileAz: "Su Təkrar İstifadəsi Siyasəti.pdf",
        fileEn: "Water Recycling Program Implementation Policy (1).pdf",
    },
    {
        titleAz: "Tədris və Öyrənmə Siyasəti",
        titleEn: "Teaching and Learning Policy",
        fileAz: "Tədris və Öyrənmə Siyasəti.pdf",
        fileEn: "Teaching and Learning Policy.pdf",
    },
    {
        titleAz: "Tələbə İnnovasiya və Liderlik Dairəsi Siyasəti",
        titleEn: "Student Innovation and Leadership Circle Policy",
        fileAz: "Tələbə İnnovasiya və Liderlik Dairəsi  Siyasəti.pdf",
        fileEn: "SILC.pdf",
    },
    {
        titleAz: "Yerləşdirmə Siyasəti",
        titleEn: "Accommodation Policy",
        fileAz: "Yerləşdirmə Siyasəti.pdf",
        fileEn: "Accommodation-Policy-of-Azerbaijan-Technical-University.pdf",
    },
];

const COPY = {
    az: {
        eyebrow: "Normativ Sənədlər",
        title: "Ümumi Siyasətlər",
        subtitle:
            "Azərbaycan Texniki Universitetinin fəaliyyətini tənzimləyən əsas siyasət sənədləri.",
        breadcrumbAbout: "Haqqımızda",
        breadcrumbDocs: "Normativ Sənədlər",
        breadcrumbPage: "Ümumi Siyasətlər",
        hrefAbout: "/haqqimizda",
        countLabel: "siyasət sənədi",
        viewLabel: "Bax",
        openTab: "Yeni pəncərədə aç",
        download: "Yüklə",
        close: "Bağla",
        previewUnavailable: "Önizləmə mövcud deyil",
        previewHint: "Sənədi açmaq üçün yeni pəncərədə açın və ya yükləyin.",
    },
    en: {
        eyebrow: "Regulatory Documents",
        title: "General Policies",
        subtitle:
            "The core policy documents that govern the operations of Azerbaijan Technical University.",
        breadcrumbAbout: "About",
        breadcrumbDocs: "Regulatory Documents",
        breadcrumbPage: "General Policies",
        hrefAbout: "/about",
        countLabel: "policy documents",
        viewLabel: "View",
        openTab: "Open in new tab",
        download: "Download",
        close: "Close",
        previewUnavailable: "Preview unavailable",
        previewHint: "Open the document in a new tab or download it instead.",
    },
};

function buildUrl(file: string, lang: "az" | "en"): string {
    const dir = lang === "az" ? AZ_DIR : EN_DIR;
    return `${API_BASE}${dir}/${encodeURIComponent(file)}`;
}

export default function GeneralPoliciesPage() {
    const { lang } = useLanguage();
    const c = COPY[lang as "az" | "en"];
    const [active, setActive] = useState<Policy | null>(null);

    useEffect(() => {
        if (active) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [active]);

    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    const activeUrl = active ? buildUrl(lang === "az" ? active.fileAz : active.fileEn, lang as "az" | "en") : "";
    const activeTitle = active ? (lang === "az" ? active.titleAz : active.titleEn) : "";

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
            <AboutPageBanner
                eyebrow={c.eyebrow}
                title={c.title}
                subtitle={c.subtitle}
                breadcrumbs={[
                    { label: c.breadcrumbAbout, href: c.hrefAbout },
                    { label: c.breadcrumbDocs },
                    { label: c.breadcrumbPage },
                ]}
            />

            <section className="px-4 md:px-10 lg:px-20 py-14">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-10"
                >
                    <div className="w-2 h-8 rounded-full bg-[#ee7c7e]" />
                    <span className="text-[#1a2355] dark:text-white font-black uppercase tracking-[0.25em] text-xs">
                        {POLICIES.length} {c.countLabel}
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {POLICIES.map((p, i) => {
                        const title = lang === "az" ? p.titleAz : p.titleEn;
                        return (
                            <motion.button
                                key={p.fileAz}
                                type="button"
                                onClick={() => setActive(p)}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.3) }}
                                className="group relative text-left flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-[#1a2355]/5 dark:border-white/10 p-6 md:p-7 shadow-sm hover:shadow-2xl hover:border-[#ee7c7e]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#ee7c7e]/5 blur-2xl group-hover:bg-[#ee7c7e]/15 transition-colors" />

                                <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0 border border-[#ee7c7e]/20 group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-colors">
                                        <PictureAsPdfIcon
                                            sx={{ fontSize: 24 }}
                                            className="text-[#ee7c7e] group-hover:text-white transition-colors"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355]/50 dark:text-white/40">
                                        PDF
                                    </span>
                                </div>

                                <h3 className="text-base md:text-lg font-bold text-[#1a2355] dark:text-white leading-snug flex-1 relative z-10 group-hover:text-[#ee7c7e] transition-colors">
                                    {title}
                                </h3>

                                <div className="mt-6 flex items-center justify-between relative z-10">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355]/60 dark:text-white/50 group-hover:text-[#ee7c7e] transition-colors">
                                        {c.viewLabel}
                                    </span>
                                    <span className="w-9 h-9 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#ee7c7e] transition-colors">
                                        <ArrowOutwardIcon
                                            sx={{ fontSize: 16 }}
                                            className="text-[#1a2355] dark:text-white group-hover:text-white transition-colors"
                                        />
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm"
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10"
                        >
                            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0f172a]">
                                <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0 border border-[#ee7c7e]/20">
                                    <PictureAsPdfIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e]" />
                                </div>
                                <h2 className="flex-1 text-sm md:text-base font-bold text-[#1a2355] dark:text-white line-clamp-2">
                                    {activeTitle}
                                </h2>
                                <div className="hidden md:flex items-center gap-2">
                                    <a
                                        href={activeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white hover:bg-[#ee7c7e]/10 hover:text-[#ee7c7e] border border-[#1a2355]/10 dark:border-white/10 transition-colors"
                                    >
                                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                                        {c.openTab}
                                    </a>
                                    <a
                                        href={activeUrl}
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ee7c7e] text-white hover:bg-[#d96b6d] transition-colors shadow-md"
                                    >
                                        <DownloadIcon sx={{ fontSize: 14 }} />
                                        {c.download}
                                    </a>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActive(null)}
                                    aria-label={c.close}
                                    className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#ee7c7e] hover:text-white transition-colors shrink-0"
                                >
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>

                            <div className="flex-1 bg-gray-100 dark:bg-[#0a0c1a] relative">
                                <iframe
                                    key={activeUrl}
                                    src={activeUrl}
                                    title={activeTitle}
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>

                            <div className="md:hidden flex items-center gap-2 p-3 border-t border-gray-200 dark:border-white/10">
                                <a
                                    href={activeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white border border-[#1a2355]/10 dark:border-white/10"
                                >
                                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                                    {c.openTab}
                                </a>
                                <a
                                    href={activeUrl}
                                    download
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ee7c7e] text-white shadow-md"
                                >
                                    <DownloadIcon sx={{ fontSize: 14 }} />
                                    {c.download}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
