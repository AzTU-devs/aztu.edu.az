"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SearchIcon from "@mui/icons-material/Search";
import LayersIcon from "@mui/icons-material/Layers";
import GavelIcon from "@mui/icons-material/Gavel";
import SchoolIcon from "@mui/icons-material/School";
import DiversityIcon from "@mui/icons-material/Diversity3";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppsIcon from "@mui/icons-material/Apps";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import { useLanguage } from "@/context/LanguageContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api.aztu.edu.az";
const AZ_DIR = "/media/prod/policies/policies_az";
const EN_DIR = "/media/prod/policies/policies_en";

type CategoryId = "sustainability" | "ethics" | "academic" | "diversity" | "wellbeing";

interface Policy {
    titleAz: string;
    titleEn: string;
    fileAz: string;
    fileEn: string;
    category: CategoryId;
}

const POLICIES: Policy[] = [
    {
        titleAz: "Açıq Giriş Siyasəti",
        titleEn: "Open Access Policy",
        fileAz: "Açıq Giriş Siyasəti.pdf",
        fileEn: "Open access policy.pdf",
        category: "academic",
    },
    {
        titleAz: "Akademik Azadlıq Siyasəti",
        titleEn: "Academic Freedom Policy",
        fileAz: "Akademik Azadlıq Siyasəti.pdf",
        fileEn: "Academic Freedom Policy.pdf",
        category: "academic",
    },
    {
        titleAz: "Ayrı-seçkiliyin Qadağan Edilməsi və Təqibin Qarşısının Alınması Siyasəti",
        titleEn: "Non-discrimination Policy",
        fileAz: "Ayrı-seçkiliyin Qadağan Edilməsi və Təqibin Qarşısının Alınması Siyasəti.pdf",
        fileEn: "Non-discrimination Policy.pdf",
        category: "diversity",
    },
    {
        titleAz: "Bərabərlik, Müxtəliflik və İnklüzivlik Siyasəti",
        titleEn: "Equality, Diversity and Inclusivity Policy",
        fileAz: "Bərabərlik, Müxtəliflik və İnklüzivlik Siyasəti.pdf",
        fileEn: "Equality-Diversity-Inclusivity Policy of AzTU.pdf",
        category: "diversity",
    },
    {
        titleAz: "Davamlı İnvestisiya Siyasəti",
        titleEn: "Sustainable Investment Policy",
        fileAz: "Davamlı İnvestisiya Siyasəti.pdf",
        fileEn: "Sustainable Investment Policy of Azerbaijan Technical University (1).pdf",
        category: "sustainability",
    },
    {
        titleAz: "Davamlılıq Siyasəti",
        titleEn: "Sustainability Policy",
        fileAz: "Davamlılıq Siyasəti.pdf",
        fileEn: "Sustainability Policy.pdf",
        category: "sustainability",
    },
    {
        titleAz: "Davamlı Maliyyələşdirmə Siyasəti",
        titleEn: "Sustainable Funding Policy",
        fileAz: "Davamlı Maliyyələşdirmə Siyasəti.pdf",
        fileEn: "Sustainable Funding Policy.pdf",
        category: "sustainability",
    },
    {
        titleAz: "Davamlı Satınalma Siyasəti",
        titleEn: "Sustainable Procurement Policy",
        fileAz: "Davamlı Satınalma Siyasəti.pdf",
        fileEn: "Sustainable Procurement  Policy of Azerbaijan Technical University (1).pdf",
        category: "sustainability",
    },
    {
        titleAz: "Davranış Kodeksi Siyasəti",
        titleEn: "Code of Conduct",
        fileAz: "Davranış Kodeksi Siyasəti.pdf",
        fileEn: "Code-of-Conduct.pdf",
        category: "ethics",
    },
    {
        titleAz: "Enerji Səmərəliliyi və Təmiz Enerji Siyasəti",
        titleEn: "Energy Efficiency and Clean Energy Policy",
        fileAz: "Enerji Səmərəliliyi və Təmiz Enerji Siyasəti.pdf",
        fileEn: "Energy Efficiency and Clean Energy.pdf",
        category: "sustainability",
    },
    {
        titleAz: "Əlilliyi olan tələbə və əməkdaşlar üçün uyğunlaşdırma siyasəti",
        titleEn: "Disability Accommodation Policy",
        fileAz: "Əlilliyi olan tələbə və əməkdaşlar üçün uyğunlaşdırma siyasəti.pdf",
        fileEn: "Disability Accomodation Policy.pdf",
        category: "diversity",
    },
    {
        titleAz: "Əmək Hüquqları Siyasəti",
        titleEn: "Labor Policy",
        fileAz: "Əmək Hüquqları Siyasəti.pdf",
        fileEn: "Labor Policy.pdf",
        category: "wellbeing",
    },
    {
        titleAz: "Ətraf Mühit Siyasəti",
        titleEn: "Environmental Policy",
        fileAz: "Ətraf Mühit Siyasəti.pdf",
        fileEn: "Environmental Policy.pdf",
        category: "sustainability",
    },
    {
        titleAz: "Gender Bərabərliyi Siyasəti",
        titleEn: "Gender Equality Policy",
        fileAz: "Gender Bərabərliyi Siyasəti.pdf",
        fileEn: "Gender Equality Policy of Azerbaijan Technical University.pdf",
        category: "diversity",
    },
    {
        titleAz: "Holistik Etik Siyasət",
        titleEn: "Holistic Ethical Policy",
        fileAz: "Holistik Etik Siyasət.pdf",
        fileEn: "Holistic Ethical Policy.pdf",
        category: "ethics",
    },
    {
        titleAz: "İdarəetmə Siyasəti",
        titleEn: "Governance Policy",
        fileAz: "İdarəetmə Siyasəti.pdf",
        fileEn: "Governance-Policy-of-Azerbaijan-Technical-University-2-4.pdf",
        category: "ethics",
    },
    {
        titleAz: "İqlim Dəyişikliyi ilə Mübarizə Siyasəti",
        titleEn: "Climate Action Policy",
        fileAz: "İqlim Dəyişikliyi ilə Mübarizə Siyasəti.pdf",
        fileEn: "Climate Action Policy of Azerbaijan Technical University.pdf",
        category: "sustainability",
    },
    {
        titleAz: "Kampusdaxili Mobillik Siyasəti",
        titleEn: "Campus Internal Mobility Policy",
        fileAz: "Kampusdaxili Mobillik Siyasəti.pdf",
        fileEn: "Campus Internal Mobility Policy.pdf",
        category: "wellbeing",
    },
    {
        titleAz: "Keyfiyyətin Təminatı Siyasəti",
        titleEn: "Quality Assurance Policy",
        fileAz: "Keyfiyyətin Təminatı Siyasəti.pdf",
        fileEn: "Quality Assurance Policy of AzTU.pdf",
        category: "academic",
    },
    {
        titleAz: "Menecment Siyasəti",
        titleEn: "Management Policy",
        fileAz: "Menecment Siyasəti.pdf",
        fileEn: "Management Policy of AzTU.pdf",
        category: "ethics",
    },
    {
        titleAz: "Rüşvətə və Korrupsiyaya Qarşı Siyasəti",
        titleEn: "Anti-Bribery and Anti-Corruption Policy",
        fileAz: "Rüşvətə və Korrupsiyaya Qarşı Siyasəti.pdf",
        fileEn: "Anti-Bribery-and-Anti-Corruption-Policy-of-Azerbaijan-Technical-University.pdf",
        category: "ethics",
    },
    {
        titleAz: "Sağlamlıq, Rifah və Təhlükəsizlik Siyasəti",
        titleEn: "Health, Welfare and Safety Policy",
        fileAz: "Sağlamlıq, Rifah və Təhlükəsizlik Siyasəti.pdf",
        fileEn: "Health, Welfare and Safety Policy of AzTU.pdf",
        category: "wellbeing",
    },
    {
        titleAz: "Su Təkrar İstifadəsi Siyasəti",
        titleEn: "Water Recycling Program Implementation Policy",
        fileAz: "Su Təkrar İstifadəsi Siyasəti.pdf",
        fileEn: "Water Recycling Program Implementation Policy (1).pdf",
        category: "sustainability",
    },
    {
        titleAz: "Tədris və Öyrənmə Siyasəti",
        titleEn: "Teaching and Learning Policy",
        fileAz: "Tədris və Öyrənmə Siyasəti.pdf",
        fileEn: "Teaching and Learning Policy.pdf",
        category: "academic",
    },
    {
        titleAz: "Tələbə İnnovasiya və Liderlik Dairəsi Siyasəti",
        titleEn: "Student Innovation and Leadership Circle Policy",
        fileAz: "Tələbə İnnovasiya və Liderlik Dairəsi  Siyasəti.pdf",
        fileEn: "SILC.pdf",
        category: "academic",
    },
    {
        titleAz: "Yerləşdirmə Siyasəti",
        titleEn: "Accommodation Policy",
        fileAz: "Yerləşdirmə Siyasəti.pdf",
        fileEn: "Accommodation-Policy-of-Azerbaijan-Technical-University.pdf",
        category: "wellbeing",
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
        searchPlaceholder: "Siyasət sənədini axtar...",
        all: "Hamısı",
        noResults: "Heç bir sənəd tapılmadı",
        noResultsHint: "Axtarış sözünü dəyişin və ya filtri sıfırlayın.",
        clearFilters: "Filtri sıfırla",
        showing: "Göstərilir",
        of: "/",
        categoriesLabel: "Kateqoriyalar",
        statSubtitle: "kateqoriya üzrə qruplaşdırılmış",
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
        searchPlaceholder: "Search policies...",
        all: "All",
        noResults: "No documents found",
        noResultsHint: "Try a different search term or clear the filter.",
        clearFilters: "Clear filters",
        showing: "Showing",
        of: "of",
        categoriesLabel: "Categories",
        statSubtitle: "organized into themes",
    },
};

const CATEGORIES: Record<
    CategoryId,
    { az: string; en: string; icon: typeof LayersIcon; tint: string; ring: string; text: string; chip: string }
> = {
    sustainability: {
        az: "Davamlılıq",
        en: "Sustainability",
        icon: EnergySavingsLeafIcon,
        tint: "bg-emerald-500/10",
        ring: "border-emerald-500/30",
        text: "text-emerald-600 dark:text-emerald-400",
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    },
    ethics: {
        az: "Etika və idarəetmə",
        en: "Ethics & Governance",
        icon: GavelIcon,
        tint: "bg-amber-500/10",
        ring: "border-amber-500/30",
        text: "text-amber-600 dark:text-amber-400",
        chip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
    },
    academic: {
        az: "Akademik",
        en: "Academic",
        icon: SchoolIcon,
        tint: "bg-sky-500/10",
        ring: "border-sky-500/30",
        text: "text-sky-600 dark:text-sky-400",
        chip: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
    },
    diversity: {
        az: "Bərabərlik və inklüzivlik",
        en: "Diversity & Inclusion",
        icon: DiversityIcon,
        tint: "bg-fuchsia-500/10",
        ring: "border-fuchsia-500/30",
        text: "text-fuchsia-600 dark:text-fuchsia-400",
        chip: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:border-fuchsia-500/20",
    },
    wellbeing: {
        az: "Rifah və əmək",
        en: "Wellbeing & HR",
        icon: FavoriteBorderIcon,
        tint: "bg-rose-500/10",
        ring: "border-rose-500/30",
        text: "text-rose-600 dark:text-rose-400",
        chip: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20",
    },
};

function buildUrl(file: string, lang: "az" | "en"): string {
    const dir = lang === "az" ? AZ_DIR : EN_DIR;
    return `${API_BASE}${dir}/${encodeURIComponent(file)}`;
}

const CATEGORY_ORDER: CategoryId[] = ["sustainability", "ethics", "academic", "diversity", "wellbeing"];

export default function GeneralPoliciesPage() {
    const { lang } = useLanguage();
    const c = COPY[lang as "az" | "en"];
    const [active, setActive] = useState<Policy | null>(null);
    const [filter, setFilter] = useState<CategoryId | "all">("all");
    const [query, setQuery] = useState("");

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

    const counts = useMemo(() => {
        const result: Record<CategoryId | "all", number> = {
            all: POLICIES.length,
            sustainability: 0,
            ethics: 0,
            academic: 0,
            diversity: 0,
            wellbeing: 0,
        };
        for (const p of POLICIES) result[p.category] += 1;
        return result;
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase(lang === "az" ? "az" : "en");
        return POLICIES.filter((p) => {
            if (filter !== "all" && p.category !== filter) return false;
            if (!q) return true;
            const hay = (lang === "az" ? p.titleAz : p.titleEn).toLocaleLowerCase(lang === "az" ? "az" : "en");
            return hay.includes(q);
        });
    }, [filter, query, lang]);

    const activeUrl = active ? buildUrl(lang === "az" ? active.fileAz : active.fileEn, lang as "az" | "en") : "";
    const activeTitle = active ? (lang === "az" ? active.titleAz : active.titleEn) : "";

    const isFiltered = filter !== "all" || query.trim().length > 0;

    return (
        <main className="min-h-screen bg-page dark:bg-[#0f172a]">
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

            {/* CONTROLS BAR (search + filter chips) */}
            <section className="px-4 md:px-10 lg:px-20 pt-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Stat block */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-4 flex items-center gap-4 bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border-2 border-[#1a2355]/15 dark:border-white/10 p-5"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center shrink-0">
                                <LayersIcon sx={{ fontSize: 26 }} />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-[#1a2355] dark:text-white tabular-nums">
                                        {POLICIES.length}
                                    </span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-bold">
                                        {c.countLabel}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    {CATEGORY_ORDER.length} {c.statSubtitle}
                                </p>
                            </div>
                        </motion.div>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="lg:col-span-8"
                        >
                            <div className="relative group">
                                <SearchIcon
                                    sx={{ fontSize: 20 }}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none group-focus-within:text-[#ee7c7e] transition-colors"
                                />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={c.searchPlaceholder}
                                    className="w-full pl-14 pr-14 py-4 lg:py-5 rounded-3xl bg-white dark:bg-slate-900/60 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-sm font-medium outline-none focus:border-[#ee7c7e] transition-colors shadow-sm"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                                        aria-label={c.clearFilters}
                                    >
                                        <CloseIcon sx={{ fontSize: 16 }} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Category chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-6 flex flex-wrap gap-2.5"
                    >
                        <button
                            type="button"
                            onClick={() => setFilter("all")}
                            className={`group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-300 ${
                                filter === "all"
                                    ? "bg-[#1a2355] text-white border-[#1a2355] shadow-md"
                                    : "bg-white dark:bg-slate-900/60 text-[#1a2355] dark:text-white border-[#1a2355]/15 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-white/30"
                            }`}
                        >
                            <AppsIcon sx={{ fontSize: 16 }} />
                            <span>{c.all}</span>
                            <span
                                className={`text-[10px] tabular-nums px-2 py-0.5 rounded-full ${
                                    filter === "all"
                                        ? "bg-white/15 text-white"
                                        : "bg-[#1a2355]/10 dark:bg-white/10 text-[#1a2355] dark:text-white"
                                }`}
                            >
                                {counts.all}
                            </span>
                        </button>

                        {CATEGORY_ORDER.map((id) => {
                            const cat = CATEGORIES[id];
                            const Icon = cat.icon;
                            const isActive = filter === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFilter(id)}
                                    className={`group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-300 ${
                                        isActive
                                            ? `${cat.tint} ${cat.text} ${cat.ring} shadow-sm`
                                            : "bg-white dark:bg-slate-900/60 text-[#1a2355] dark:text-white border-[#1a2355]/15 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-white/30"
                                    }`}
                                >
                                    <Icon sx={{ fontSize: 16 }} className={isActive ? cat.text : ""} />
                                    <span>{lang === "az" ? cat.az : cat.en}</span>
                                    <span
                                        className={`text-[10px] tabular-nums px-2 py-0.5 rounded-full ${
                                            isActive
                                                ? `${cat.tint} ${cat.text}`
                                                : "bg-[#1a2355]/10 dark:bg-white/10 text-[#1a2355] dark:text-white"
                                        }`}
                                    >
                                        {counts[id]}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Showing N of M */}
                    <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest font-black text-[#1a2355]/60 dark:text-white/50">
                        <span>
                            {c.showing}{" "}
                            <span className="text-[#ee7c7e] tabular-nums">{filtered.length}</span> {c.of}{" "}
                            <span className="tabular-nums">{POLICIES.length}</span>
                        </span>
                        {isFiltered && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter("all");
                                    setQuery("");
                                }}
                                className="inline-flex items-center gap-2 text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors"
                            >
                                <ClearAllIcon sx={{ fontSize: 14 }} />
                                {c.clearFilters}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* GRID */}
            <section className="px-4 md:px-10 lg:px-20 py-10 pb-24">
                <div className="max-w-[1400px] mx-auto">
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-3xl border-2 border-dashed border-[#1a2355]/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center mb-5">
                                <SearchIcon sx={{ fontSize: 32 }} className="text-[#1a2355]/40 dark:text-white/40" />
                            </div>
                            <h3 className="text-lg font-black text-[#1a2355] dark:text-white mb-2">
                                {c.noResults}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{c.noResultsHint}</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setFilter("all");
                                    setQuery("");
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a2355] text-white text-xs font-black uppercase tracking-widest hover:bg-[#ee7c7e] transition-colors"
                            >
                                <ClearAllIcon sx={{ fontSize: 14 }} />
                                {c.clearFilters}
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {filtered.map((p, i) => {
                                const title = lang === "az" ? p.titleAz : p.titleEn;
                                const cat = CATEGORIES[p.category];
                                const CatIcon = cat.icon;
                                return (
                                    <motion.button
                                        key={p.fileAz}
                                        type="button"
                                        onClick={() => setActive(p)}
                                        layout
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.25) }}
                                        className="group relative text-left flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-[#1a2355]/15 dark:border-white/10 p-6 md:p-7 shadow-sm hover:shadow-2xl hover:shadow-[#1a2355]/15 hover:border-[#ee7c7e] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1a2355] via-[#ee7c7e] to-[#1a2355] opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#ee7c7e]/5 blur-3xl group-hover:bg-[#ee7c7e]/15 transition-colors" />

                                        <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
                                            <div
                                                className={`w-12 h-12 rounded-2xl ${cat.tint} ${cat.ring} border flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-colors`}
                                            >
                                                <CatIcon
                                                    sx={{ fontSize: 22 }}
                                                    className={`${cat.text} group-hover:text-white transition-colors`}
                                                />
                                            </div>
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${cat.chip}`}
                                            >
                                                {lang === "az" ? cat.az : cat.en}
                                            </span>
                                        </div>

                                        <h3 className="text-base md:text-lg font-bold text-[#1a2355] dark:text-white leading-snug flex-1 relative z-10 group-hover:text-[#ee7c7e] transition-colors">
                                            {title}
                                        </h3>

                                        <div className="mt-6 flex items-center justify-between relative z-10 pt-5 border-t border-[#1a2355]/10 dark:border-white/5">
                                            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355]/60 dark:text-white/50 group-hover:text-[#ee7c7e] transition-colors">
                                                <PictureAsPdfIcon sx={{ fontSize: 14 }} />
                                                PDF · {c.viewLabel}
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
                    )}
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
                                <div className="flex-1 min-w-0">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border mb-1 ${CATEGORIES[active.category].chip}`}
                                    >
                                        {lang === "az" ? CATEGORIES[active.category].az : CATEGORIES[active.category].en}
                                    </span>
                                    <h2 className="text-sm md:text-base font-bold text-[#1a2355] dark:text-white line-clamp-2">
                                        {activeTitle}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={activeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={c.openTab}
                                        className="inline-flex items-center gap-2 px-2.5 md:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white hover:bg-[#ee7c7e]/10 hover:text-[#ee7c7e] border border-[#1a2355]/30 dark:border-white/10 transition-colors"
                                    >
                                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                                        <span className="hidden md:inline">{c.openTab}</span>
                                    </a>
                                    <a
                                        href={activeUrl}
                                        download
                                        aria-label={c.download}
                                        className="inline-flex items-center gap-2 px-2.5 md:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ee7c7e] text-white hover:bg-[#d96b6d] transition-colors shadow-md"
                                    >
                                        <DownloadIcon sx={{ fontSize: 14 }} />
                                        <span className="hidden md:inline">{c.download}</span>
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
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white border border-[#1a2355]/30 dark:border-white/10"
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
