"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

const MONTHS_AZ = [
    "Yanvar","Fevral","Mart","Aprel","May","İyun",
    "İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr",
];

const MONTHS_EN = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function parseDate(iso: string, lang: string) {
    const d = new Date(iso);
    const months = lang === 'az' ? MONTHS_AZ : MONTHS_EN;
    return {
        date: String(d.getUTCDate()).padStart(2, "0"),
        month: months[d.getUTCMonth()],
        year: String(d.getUTCFullYear()),
    };
}

interface ApiAnnouncement {
    id: number;
    title: string;
    html_content: string;
    is_active: boolean;
    created_at: string;
    published_date: string;
    display_order: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function AnnouncementsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/announcement/public/all?start=0&end=100`)
            .then((r) => r.json())
            .then((data) => setAnnouncements(data.announcements ?? []))
            .catch(() => {});
    }, []);

    const featured = announcements[0];
    const rest = announcements.slice(1);

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={lang === 'az' ? "Elanlar" : "Announcements"}
                description={lang === 'az' ? "AzTU-nun akademik, tədris, qəbul və inzibati elanları ilə tanış olun." : "Stay updated with academic, educational, admission, and administrative announcements from AzTU."}
                breadcrumbs={[
                    { label: lang === 'az' ? "Elanlar" : "Announcements" }
                ]}
            >
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden lg:block">
                    <CampaignIcon sx={{ fontSize: 300, color: 'white' }} />
                </div>
            </PageHero>

            <PageContainer>
                {/* ── Empty state ── */}
                {announcements.length === 0 && (
                    <div className="text-center py-24 text-gray-400 font-black text-xl uppercase tracking-widest relative z-10">
                        {lang === 'az' ? "ELAN TAPILMADI" : "NO ANNOUNCEMENTS FOUND"}
                    </div>
                )}

                {featured && (
                    <div className="mb-20 relative z-10">
                        <Link href={`/announcements/${featured.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[4rem] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/10 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row hover:border-[#ee7c7e]/30 transition-all duration-700"
                            >
                                {/* Left: Date column */}
                                {(() => {
                                    const { date, month, year } = parseDate(featured.published_date, lang);
                                    return (
                                        <div className="lg:w-72 flex-shrink-0 bg-[#1a2355] flex flex-col items-center justify-center p-12 gap-3 relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(white 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
                                            <CalendarMonthIcon sx={{ color: "white", opacity: 0.5, fontSize: 40 }} />
                                            <p className="text-white font-black text-7xl leading-none relative z-10 tracking-tighter">{date}</p>
                                            <p className="text-white/90 text-xl font-black uppercase tracking-widest relative z-10">{month}</p>
                                            <p className="text-white/40 text-sm font-bold relative z-10">{year}</p>
                                        </div>
                                    );
                                })()}

                                {/* Right: Content */}
                                <div className="flex flex-col justify-center p-12 md:p-20 gap-8 flex-1 relative z-10">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/20 w-fit">
                                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                        <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em]">{lang === 'az' ? 'YENİ ELAN' : 'NEW ANNOUNCEMENT'}</span>
                                    </div>
                                    <h2 className="text-[#1a2355] dark:text-white font-black text-3xl md:text-5xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-500 tracking-tighter">
                                        {featured.title}
                                    </h2>

                                    {featured.html_content && (
                                        <div
                                            className="text-gray-500 dark:text-white/60 text-xl leading-relaxed line-clamp-3 text-justify font-medium"
                                            dangerouslySetInnerHTML={{ __html: featured.html_content }}
                                        />
                                    )}

                                    <div className="flex items-center gap-4 text-[#1a2355] dark:text-white font-black text-xs uppercase tracking-[0.3em] group-hover:text-[#ee7c7e] transition-all mt-6">
                                        {lang === 'az' ? 'ƏTRAFLI OXU' : 'READ MORE'}
                                        <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/5">
                                            <ChevronRightIcon sx={{ fontSize: 24 }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                )}

                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                        {rest.map((item, i) => {
                            const { date, month, year } = parseDate(item.published_date, lang);
                            return (
                                <motion.div
                                    key={item.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="h-full"
                                >
                                    <Link href={`/announcements/${item.id}`} className="group block h-full">
                                        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/10 dark:border-white/10 overflow-hidden flex flex-col h-full hover:border-[#ee7c7e]/30 transition-all duration-700 hover:-translate-y-2">
                                            <div className="p-12 flex flex-col h-full gap-8 relative z-10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-gray-400 dark:text-white/20 text-[10px] font-black uppercase tracking-widest">
                                                        <CalendarMonthIcon sx={{ fontSize: 18, color: '#ee7c7e' }} />
                                                        <span>{date} {month} {year}</span>
                                                    </div>
                                                    <CampaignIcon className="text-[#ee7c7e]/20" sx={{ fontSize: 28 }} />
                                                </div>

                                                <h3 className="text-2xl font-black text-[#1a2355] dark:text-white leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors duration-500 tracking-tight line-clamp-4">
                                                    {item.title}
                                                </h3>

                                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-[#1a2355]/5 dark:border-white/5">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355] dark:text-white/60 group-hover:text-[#ee7c7e] transition-colors">
                                                        {lang === 'az' ? 'ƏTRAFLI' : 'DETAILS'}
                                                    </span>
                                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/5">
                                                        <ChevronRightIcon sx={{ fontSize: 20 }} />
                                                    </div>
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
