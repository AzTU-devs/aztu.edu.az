"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function HonoraryDoctorsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.community.honoraryDoctors;

    const communityLabel = lang === "az" ? "İcma" : "Community";
    const communityHref = lang === "az" ? "/az/icma" : "/en/community";
    const honorsLabel = lang === "az" ? "AzTU-nun Fəxriləri" : "AzTU's Honors";
    const honorsHref = lang === "az" ? "/az/icma/aztu-nun-fexrileri" : "/en/community/aztus-honors";

    return (
        <main className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND DECORATIVE ELEMENTS */}
            <div className="absolute top-[60vh] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#ee7c7e]/15 via-transparent to-transparent blur-[120px] pointer-events-none -z-0" />
            <div className="absolute bottom-[10vh] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-[#1a2355]/10 via-transparent to-transparent blur-[120px] pointer-events-none -z-0" />

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
                            Home
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
                            <p className="text-xl lg:text-2xl text-white/80 font-medium mb-10 leading-relaxed">
                                {p.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* DOCTORS LIST SECTION */}
            <div className="relative px-4 md:px-10 lg:px-20 py-24 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {p.doctors.map((doctor: { name: string; description: string; award: string; date: string; image: string }, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-white dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Colorful gradient top bar on hover */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ee7c7e] via-[#1a2355] to-[#ee7c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Avatar */}
                                <div className="relative p-1.5 rounded-full border-2 border-dashed border-[#ee7c7e]/30 group-hover:border-[#ee7c7e] transition-all duration-500 group-hover:scale-105">
                                    <div className="w-40 h-40 rounded-full bg-gray-50 dark:bg-slate-700 overflow-hidden shadow-inner flex items-center justify-center text-[#1a2355]/20 group-hover:bg-[#ee7c7e]/10 transition-all duration-500 relative">
                                        {doctor.image ? (
                                            <Image 
                                                src={doctor.image} 
                                                alt={doctor.name} 
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
                                    <div className="space-y-1">
                                        <h3 className="font-black text-[#1a2355] dark:text-white text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {doctor.name}
                                        </h3>
                                        <div className="inline-block px-3 py-1 rounded-full bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355]/60 dark:text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                            {doctor.award}
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                                        {doctor.description}
                                    </p>
                                </div>

                                <div className="w-full pt-6 border-t border-gray-100 dark:border-slate-700/50">
                                    <div className="flex items-center justify-center gap-2 text-[#1a2355] dark:text-white/60 font-bold text-xs">
                                        <CalendarTodayIcon sx={{ fontSize: 16, color: "#ee7c7e" }} />
                                        {doctor.date}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER SPACER */}
            <div className="pb-24"></div>
        </main>
    );
}
