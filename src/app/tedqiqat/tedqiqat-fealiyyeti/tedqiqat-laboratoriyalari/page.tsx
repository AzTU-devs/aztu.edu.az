"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import { useLanguage } from "@/context/LanguageContext";
import { getLaboratories, getCafedras, type ResearchLaboratory } from "@/services/cafedraService/cafedraService";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.05, ease: "easeOut" as const },
    }),
};

const plainText = (html?: string | null) =>
    html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";

interface DeptGroup {
    code: string;
    name: string;
    labs: ResearchLaboratory[];
}

export default function ResearchLaboratoriesPage() {
    const { lang: currentLang } = useLanguage();

    const [labs, setLabs] = useState<ResearchLaboratory[]>([]);
    const [cafedraNames, setCafedraNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        research: currentLang === "az" ? "Tədqiqat" : "Research",
        activity: currentLang === "az" ? "Tədqiqat fəaliyyəti" : "Research activity",
        labs: currentLang === "az" ? "Tədqiqat laboratoriyaları" : "Research laboratories",
        title: currentLang === "az" ? "Tədqiqat Laboratoriyaları" : "Research Laboratories",
        description: currentLang === "az"
            ? "Azərbaycan Texniki Universitetinin müxtəlif kafedraları nəzdində fəaliyyət göstərən müasir tədqiqat və tədris laboratoriyaları."
            : "Modern research and teaching laboratories operating under various departments of Azerbaijan Technical University.",
        viewMore: currentLang === "az" ? "Ətraflı Bax" : "View More",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No data found.",
        other: currentLang === "az" ? "Digər" : "Other",
    };

    useEffect(() => {
        let active = true;
        setLoading(true);
        Promise.all([
            getLaboratories({ lang: currentLang }),
            getCafedras({ lang: currentLang, start: 0, end: 500 }),
        ])
            .then(([labsRes, cafedrasRes]) => {
                if (!active) return;
                setLabs(Array.isArray(labsRes) ? labsRes : []);
                if (Array.isArray(cafedrasRes)) {
                    const map: Record<string, string> = {};
                    cafedrasRes.forEach((c) => {
                        const name = c.title ?? c.cafedra_name;
                        if (name) map[c.cafedra_code] = name;
                    });
                    setCafedraNames(map);
                }
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [currentLang]);

    const groups = useMemo<DeptGroup[]>(() => {
        const byCode = new Map<string, ResearchLaboratory[]>();
        labs.forEach((lab) => {
            const list = byCode.get(lab.cafedra_code) ?? [];
            list.push(lab);
            byCode.set(lab.cafedra_code, list);
        });
        return Array.from(byCode.entries()).map(([code, groupLabs]) => ({
            code,
            name: cafedraNames[code] ?? t.other,
            labs: groupLabs,
        }));
    }, [labs, cafedraNames, t.other]);

    const breadcrumbs = [
        { label: t.home, href: "/" },
        { label: t.research, href: currentLang === "az" ? "/tedqiqat" : "/research" },
        { label: t.activity, href: currentLang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti" : "/research/research-activity" },
        { label: t.labs }
    ];

    return (
        <main className="min-h-screen bg-page dark:bg-slate-900 transition-colors pb-20">
            {/* Page Banner */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full min-h-[400px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                    >
                        <source src="/heroBgVideos/research.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/60 to-transparent" />
                </div>

                <div className="relative z-20 w-full">
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap font-black uppercase tracking-[0.3em]"
                    >
                        {breadcrumbs.map((crumb, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-white transition-colors flex items-center gap-1">
                                        {i === 0 && <HomeIcon sx={{ fontSize: 16 }} />}
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#ee7c7e]">{crumb.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && <ChevronRightIcon sx={{ fontSize: 13 }} />}
                            </div>
                        ))}
                    </motion.nav>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tighter"
                    >
                        {t.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/70 text-lg max-w-2xl font-medium leading-relaxed"
                    >
                        {t.description}
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <section className="px-4 md:px-10 lg:px-12 py-16 -mt-10 relative z-30 w-full">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-64 rounded-[1.5rem] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 animate-pulse" />
                        ))}
                    </div>
                ) : groups.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-slate-700 shadow-sm">
                        <ScienceIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">
                            {t.noContent}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {groups.map((group) => (
                            <div key={group.code} className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-[#1a2355] flex items-center justify-center text-white shadow-lg">
                                        <BusinessIcon />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                        {group.name}
                                    </h2>
                                    <div className="flex-grow h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-slate-700 ml-4 hidden md:block" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {group.labs.map((lab, i) => {
                                        const path = currentLang === "az"
                                            ? `/az/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-laboratoriyalari/${lab.id}`
                                            : `/en/research/research-activity/research-laboratories/${lab.id}`;
                                        const img = getImageUrl(lab.image_url);

                                        return (
                                            <motion.div
                                                key={lab.id}
                                                custom={i}
                                                variants={cardVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="h-full"
                                            >
                                                <Link
                                                    href={path}
                                                    className="group block relative h-full bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm hover:shadow-[0_20px_50px_rgba(26,35,85,0.1)] border border-gray-100 dark:border-slate-700 hover:border-[#ee7c7e]/20 overflow-hidden transition-all duration-500"
                                                >
                                                    {img ? (
                                                        <div className="relative h-40 w-full overflow-hidden">
                                                            <Image
                                                                src={img}
                                                                alt={lab.title ?? ""}
                                                                fill
                                                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-40 w-full items-center justify-center bg-gray-50 dark:bg-slate-700">
                                                            <ScienceIcon sx={{ fontSize: 40, color: "#1a2355", opacity: 0.15 }} />
                                                        </div>
                                                    )}

                                                    <div className="relative z-10 flex flex-col p-6">
                                                        <h3 className="text-[#1a2355] dark:text-white font-black text-lg leading-snug group-hover:text-[#ee7c7e] transition-colors duration-300 mb-4 line-clamp-2">
                                                            {lab.title}
                                                        </h3>

                                                        <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 font-medium">
                                                            {plainText(lab.html_content)}
                                                        </p>

                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-blue-400 mt-auto group-hover:text-[#ee7c7e] transition-colors">
                                                            {t.viewMore}
                                                            <ChevronRightIcon
                                                                sx={{ fontSize: 16 }}
                                                                className="transition-transform duration-300 group-hover:translate-x-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
