"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { getFaculties, type FacultySummary } from "@/services/facultyService/facultyService";
import { slugify } from "@/util/slugify";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
    }),
};

export default function FacultiesPage() {
    const { lang: currentLang } = useLanguage();
    const [faculties, setFaculties] = useState<FacultySummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFaculties({ lang: currentLang })
            .then((result) => {
                if (Array.isArray(result)) {
                    setFaculties(result);
                }
            })
            .finally(() => setLoading(false));
    }, [currentLang]);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        faculties: currentLang === "az" ? "Fakültələr" : "Faculties",
        title: currentLang === "az" ? "Akademik Fakültələr" : "Academic Faculties",
        description: currentLang === "az" 
            ? "Azərbaycan Texniki Universitetinin zəngin təhsil ənənələrinə malik, müasir texnologiyalar və innovativ yanaşmalarla tədris aparan fakültələri."
            : "The faculties of Azerbaijan Technical University have rich educational traditions and conduct teaching with modern technologies and innovative approaches.",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No data found.",
        cafedra: currentLang === "az" ? "Kafedra" : "Departments",
        deputy: currentLang === "az" ? "Müavin" : "Deputies",
        viewMore: currentLang === "az" ? "Ətraflı Bax" : "View More"
    };

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden pb-32 bg-white">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh opacity-100" />
            <div className="bg-grid-premium opacity-10" />
            
            <div className="fixed top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse" />
            <div className="fixed bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#ee7c7e]/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[
                    { label: t.faculties }
                ]}
                eyebrow="Academic Excellence"
            />

            <PageContainer fullWidth>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 -mt-24 relative z-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl border-2 border-gray-100 p-8 h-80" />
                        ))}
                    </div>
                ) : faculties.length === 0 ? (
                    <div className="text-center py-40 bg-white/60 backdrop-blur-3xl rounded-[4rem] border-2 border-dashed border-gray-200 shadow-2xl relative z-10 -mt-24">
                        <SchoolIcon sx={{ fontSize: 80, color: "#ee7c7e", opacity: 0.2 }} className="mb-6 animate-pulse" />
                        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm">
                            {t.noContent}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10 -mt-24">
                        {faculties.map((faculty, i) => {
                            const slug = slugify(faculty.title);
                            const academicPrefix = currentLang === "az" ? "akademik" : "academic";
                            const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
                            const baseLink = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${slug}`;
                            const aboutLink = `${baseLink}/${currentLang === "az" ? "haqqimizda" : "about"}`;

                            const accentColors = [
                                "from-blue-600 to-indigo-700 shadow-blue-500/20",
                                "from-emerald-600 to-teal-700 shadow-emerald-500/20",
                                "from-[#ee7c7e] to-[#f09395] shadow-red-500/20",
                                "from-purple-600 to-violet-700 shadow-purple-500/20",
                                "from-orange-600 to-amber-700 shadow-orange-500/20"
                            ];
                            const cardColor = accentColors[i % accentColors.length];

                            return (
                                <motion.div
                                    key={faculty.faculty_code}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="h-full"
                                >
                                    <Link
                                        href={aboutLink}
                                        className="group block relative h-full bg-white backdrop-blur-3xl rounded-[3rem] shadow-2xl shadow-blue-900/5 border-2 border-gray-100 p-8 transition-all duration-700 overflow-hidden hover:-translate-y-3 hover:border-[#ee7c7e]/30 hover:shadow-blue-900/10"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110 group-hover:bg-blue-50" />
                                        <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${cardColor} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cardColor} flex items-center justify-center text-white shadow-xl duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                                    <SchoolIcon sx={{ fontSize: 32 }} />
                                                </div>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-2 border-gray-50 px-4 py-2 rounded-xl group-hover:text-[#ee7c7e] transition-colors bg-white/50">
                                                    {faculty.faculty_code}
                                                </span>
                                            </div>

                                            <h2 className="text-[#1a2355] font-black text-xl lg:text-2xl leading-[1.2] group-hover:text-[#ee7c7e] transition-colors duration-500 mb-8 tracking-tight">
                                                {faculty.title}
                                            </h2>

                                            <div className="grid grid-cols-2 gap-4 mt-auto pt-8 border-t border-gray-50">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <AccountTreeIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e]" />
                                                        <span className="text-2xl font-black text-[#1a2355] leading-none">{faculty.cafedra_count || 0}</span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.cafedra}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <div className="flex items-center gap-2 justify-end mb-1">
                                                        <span className="text-2xl font-black text-[#1a2355] leading-none">{faculty.deputy_dean_count || 0}</span>
                                                        <GroupsIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e]" />
                                                    </div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.deputy}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-8 pt-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355]/40 group-hover:text-[#1a2355] transition-colors">
                                                    {t.viewMore}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 shadow-lg border border-gray-100">
                                                    <ChevronRightIcon sx={{ fontSize: 24 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </PageContainer>
        </main>
    );
}
