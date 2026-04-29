"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getNavSections } from "@/config/navigation";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LanguageIcon from "@mui/icons-material/Language";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

// Logos
import QsLogo from "@/../public/logos/qs-logo.svg";
import TheLogo from "@/../public/logos/the-logo.svg";
import GreenMetricLogo from "@/../public/logos/greenmetric-logo.png";

export default function RankingsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const sections = getNavSections(t, lang as any);
    const aboutSection = sections.find(s => s.key === "about");
    
    // Fallback and type-safe access
    const aboutPages = (t.pages as any)?.about || {};
    const rankings = aboutPages.rankings || {};
    const nav = (t.nav as any)?.sections || {};

    const systemLogos: Record<string, any> = {
        "QS World University Rankings": QsLogo,
        "Times Higher Education (THE) Rankings": TheLogo,
        "UI GreenMetric World University Rankings": GreenMetricLogo
    };

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-white">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh opacity-100" />
            <div className="bg-grid-premium opacity-10" />
            
            <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
            <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            <PageHero
                title={rankings.title}
                description={rankings.subtitle}
                breadcrumbs={[
                    { label: nav.about || (lang === "az" ? "Haqqımızda" : "About"), href: lang === "az" ? "/haqqimizda" : "/about" },
                    { label: rankings.breadcrumb }
                ]}
                eyebrow={rankings.eyebrow}
            />

            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-20">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Importance Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 p-10 md:p-16 shadow-2xl shadow-blue-900/5 relative overflow-hidden group hover:border-[#ee7c7e]/20 transition-all duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
                            <h2 className="text-3xl font-black text-[#1a2355] uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <VerifiedIcon className="text-[#ee7c7e] text-4xl" />
                                {rankings.importanceTitle}
                            </h2>
                            <ul className="space-y-6">
                                {rankings.importanceItems?.map((item: string, idx: number) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4 text-gray-700 text-lg font-medium leading-relaxed"
                                    >
                                        <div className="mt-2 w-2 h-2 rounded-full bg-[#ee7c7e] shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Ranking Systems */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-[#1a2355] uppercase tracking-tighter flex items-center gap-4">
                                <TrendingUpIcon className="text-[#ee7c7e] text-4xl" />
                                {lang === "az" ? "Reytinq Sistemləri" : "Ranking Systems"}
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {rankings.systems?.map((system: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border-2 border-[#1a2355]/5 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:border-[#ee7c7e]/50 transition-all duration-500"
                                    >
                                        <div className="w-32 h-32 relative shrink-0 bg-white rounded-3xl p-4 shadow-lg border border-gray-100 flex items-center justify-center">
                                            <Image 
                                                src={systemLogos[system.name] || QsLogo} 
                                                alt={system.name}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="space-y-4 text-center md:text-left">
                                            <h3 className="text-2xl font-black text-[#1a2355] group-hover:text-[#ee7c7e] transition-colors">
                                                {system.name}
                                            </h3>
                                            <p className="text-gray-600 font-medium">
                                                <span className="text-[#1a2355] font-bold">
                                                    {lang === "az" ? "Meyarlar: " : "Criteria: "}
                                                </span>
                                                {system.criteria}
                                            </p>
                                            <Link 
                                                href={system.methodology}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 text-[#ee7c7e] font-black uppercase tracking-wider text-sm hover:underline"
                                            >
                                                {lang === "az" ? "Metodologiya" : "Methodology"}
                                                <ChevronRightIcon sx={{ fontSize: 18 }} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Optional Bottom Feature Style for Other Pages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-12"
                        >
                            <h2 className="text-3xl font-black text-[#1a2355] uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.3)]" />
                                {lang === "az" ? "Haqqımızda bölməsini kəşf et" : "Explore About section"}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {aboutSection?.items
                                    .filter((i: any) => i.slug !== (lang === "az" ? "reytinqler" : "rankings"))
                                    .slice(0, 4)
                                    .map((other: any, idx: number) => (
                                        <Link
                                            key={idx}
                                            href={`${aboutSection.basePath}/${other.slug}`}
                                            className="group relative h-full flex flex-col justify-between p-8 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border-2 border-[#1a2355]/5 transition-all duration-500 hover:border-[#ee7c7e]/50 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />
                                            
                                            <div className="relative z-10 flex items-center justify-between gap-6">
                                                <span className="text-lg font-black text-[#1a2355] group-hover:text-[#ee7c7e] leading-tight transition-colors">
                                                    {other.title}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white shadow-lg border border-[#1a2355]/5">
                                                    <ChevronRightIcon
                                                        sx={{ fontSize: 24 }}
                                                        className="group-hover:translate-x-1 transition-transform"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar: Positions */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-28 p-10 rounded-[3rem] bg-white border-2 border-[#1a2355]/5 text-[#1a2355] shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
                                    <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                    <span className="text-[#1a2355]/60 text-[10px] font-black uppercase tracking-[0.3em]">
                                        {lang === "az" ? "Mövqelər" : "Positions"}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">
                                    {rankings.positionsTitle}
                                </h3>
                                
                                <div className="space-y-6">
                                    {rankings.positions?.map((pos: any, idx: number) => (
                                        <div key={idx} className="flex flex-col gap-1 border-b border-gray-100 pb-4 last:border-0">
                                            <span className="text-xs font-black text-[#1a2355]/40 uppercase tracking-widest">
                                                {pos.name}
                                            </span>
                                            <span className="text-2xl font-black text-[#ee7c7e]">
                                                #{pos.position}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link 
                                    href={rankings.profileUrl || "#"}
                                    target="_blank"
                                    className="mt-10 inline-flex items-center gap-3 w-full justify-center bg-[#1a2355] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ee7c7e] transition-all shadow-xl shadow-blue-900/10"
                                >
                                    <LanguageIcon sx={{ fontSize: 18 }} />
                                    {rankings.profileLink}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
