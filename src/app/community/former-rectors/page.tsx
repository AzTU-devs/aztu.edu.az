"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from '@mui/icons-material/History';
import VerifiedIcon from "@mui/icons-material/Verified";

export default function FormerRectorsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.community.formerRectors;

    const communityLabel = lang === "az" ? "İcma" : "Community";
    const communityHref = lang === "az" ? "/az/icma" : "/en/community";
    const honorsLabel = lang === "az" ? "AzTU-nun Fəxriləri" : "AzTU's Honors";
    const honorsHref = lang === "az" ? "/az/icma/aztu-nun-fexrileri" : "/en/community/aztus-honors";

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            {/* HERO SECTION */}
            <div className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col pt-44 lg:pt-48 z-10">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {lang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={communityHref} className="hover:text-white transition-colors">
                            {communityLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={honorsHref} className="hover:text-white transition-colors">
                            {honorsLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/80 font-medium mb-10 leading-relaxed max-w-2xl">
                                {p.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* RECTORS LIST SECTION */}
            <div className="relative px-4 md:px-10 lg:px-20 py-24 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {p.rectors.map((rector: { name: string; bio: string; tenure: string; image: string }, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-[0_4px_20px_-4px_rgba(26,35,85,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(26,35,85,0.2)] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ee7c7e] via-[#1a2355] to-[#ee7c7e] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Avatar */}
                                <div className="relative p-2 rounded-full border-2 border-dashed border-[#ee7c7e]/40 group-hover:border-[#ee7c7e] transition-all duration-500 group-hover:scale-105">
                                    <div className="w-40 h-40 rounded-full bg-[#1a2355]/5 dark:bg-[#1a2355]/20 overflow-hidden shadow-inner flex items-center justify-center text-[#1a2355]/20 group-hover:bg-[#ee7c7e]/10 transition-all duration-500 relative border border-[#1a2355]/5">
                                        {rector.image ? (
                                            <Image 
                                                src={rector.image} 
                                                alt={rector.name} 
                                                fill 
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <PersonIcon sx={{ fontSize: 80 }} />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#ee7c7e] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                                        <VerifiedIcon sx={{ fontSize: 20 }} />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-black text-[#1a2355] dark:text-white text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {rector.name}
                                        </h3>
                                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10 text-[#1a2355] dark:text-white/70 text-[10px] font-black uppercase tracking-widest">
                                            {rector.tenure}
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500 font-medium">
                                        {rector.bio}
                                    </p>
                                </div>

                                <div className="w-full pt-6 border-t border-[#1a2355]/5 dark:border-white/5">
                                    <div className="flex items-center justify-center gap-2 text-[#1a2355] dark:text-white/60 font-black text-xs uppercase tracking-widest">
                                        <HistoryIcon sx={{ fontSize: 16, color: "#ee7c7e" }} />
                                        {lang === "az" ? "Rektorluq dövrü" : "Tenure Period"}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pb-24"></div>
        </main>
    );
}
