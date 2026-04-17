"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function HomeStyleSection({ 
    badge, 
    title, 
    accentTitle, 
    children, 
    dark = false,
    watermark = ""
}: { 
    badge: string; 
    title: string; 
    accentTitle?: string; 
    children: React.ReactNode; 
    dark?: boolean;
    watermark?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className={`relative px-4 md:px-10 lg:px-20 py-24 ${dark ? 'bg-[#0b1330]' : 'bg-white dark:bg-[#0b1330]'} overflow-hidden transition-colors duration-500`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 ${dark ? 'opacity-[0.04]' : 'opacity-[0.12] dark:opacity-[0.04]'}`} 
                     style={{ backgroundImage: `radial-gradient(${dark ? 'white' : '#ee7c7e'} 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
                
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.03] dark:bg-[#1a2355]/[0.1] blur-[120px] rounded-full" />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${dark ? 'bg-blue-500/[0.05]' : 'bg-[#ee7c7e]/[0.03] dark:bg-[#ee7c7e]/[0.08]'} blur-[100px] rounded-full animate-pulse`} />
                
                {watermark && (
                    <div className="absolute left-10 bottom-10 select-none opacity-[0.02] dark:opacity-[0.05]">
                        <h1 className={`text-[150px] font-black tracking-tighter leading-none ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} uppercase`}>{watermark}</h1>
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl ${dark ? 'bg-white/5 border-white/10' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10'} border mb-6 shadow-sm`}>
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className={`${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} text-[11px] font-black uppercase tracking-[0.4em]`}>
                                {badge}
                            </span>
                        </div>
                        <h2 className={`text-4xl md:text-6xl font-black ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} leading-tight tracking-tighter`}>
                            {title} {accentTitle && <span className="text-[#ee7c7e]">{accentTitle}</span>}
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

export default function CreditSystemPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.creditSystem;

    if (!data) return null;

    return (
        <main className="min-h-screen bg-white dark:bg-[#0b1330] transition-colors duration-500">
             <AboutPageBanner
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students', href: '#' },
                    { label: data.breadcrumb }
                ]}
            />

            {/* DOWNLOAD PDF CTA */}
            <section className="px-4 md:px-10 lg:px-20 py-12 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                            <PictureAsPdfIcon sx={{ fontSize: 32 }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                {lang === 'az' ? 'Kredit Sistemi Qaydaları' : 'Credit System Rules'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                {lang === 'az' ? 'Rəsmi qaydalar PDF formatında' : 'Official rules in PDF format'}
                            </p>
                        </div>
                    </div>
                    <a 
                        href={data.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-10 py-5 bg-[#1a2355] text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ee7c7e] transition-all duration-500 shadow-2xl shadow-[#1a2355]/20 hover:shadow-[#ee7c7e]/40 hover:-translate-y-1"
                    >
                        {lang === 'az' ? 'Sənədi Yüklə' : 'Download Document'}
                    </a>
                </div>
            </section>

            {data.sections.map((section: any, idx: number) => (
                <HomeStyleSection 
                    key={idx}
                    badge={lang === 'az' ? `Bölmə ${idx + 1}` : `Section ${idx + 1}`} 
                    title={section.title} 
                    dark={idx % 2 === 1}
                    watermark={idx === 0 ? "Bologna" : idx === 1 ? "Workload" : idx === 2 ? "Credits" : "Summer"}
                >
                    <div className={`p-10 md:p-16 rounded-[3rem] border ${idx % 2 === 1 ? 'border-white/10 bg-white/5 backdrop-blur-xl' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5'} shadow-2xl`}>
                        {section.content && (
                            <p className={`text-2xl font-bold mb-10 ${idx % 2 === 1 ? 'text-white/90' : 'text-[#1a2355] dark:text-white'}`}>
                                {section.content}
                            </p>
                        )}

                        {section.list && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.list.map((item: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <CheckCircleOutlineIcon className="text-[#ee7c7e]" />
                                        <span className={`font-bold ${idx % 2 === 1 ? 'text-white' : 'text-[#1a2355] dark:text-white'}`}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {section.table && (
                            <div className="overflow-x-auto rounded-3xl border border-white/10">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/10 text-white uppercase text-[11px] font-black tracking-widest">
                                            {section.table.headers.map((h: string, i: number) => (
                                                <th key={i} className="px-8 py-6 border-b border-white/10">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.table.rows.map((row: string[], i: number) => (
                                            <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                                                {row.map((cell: string, j: number) => (
                                                    <td key={j} className={`px-8 py-5 text-sm ${j === 1 ? 'font-black text-[#ee7c7e]' : (idx % 2 === 1 ? 'text-white' : 'text-gray-600 dark:text-gray-300')} font-bold`}>
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </HomeStyleSection>
            ))}

            {/* Feature Highlights */}
            <section className="px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#0b1330]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                         <SpeedIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">{lang === 'az' ? 'Çeviklik' : 'Flexibility'}</h4>
                         <p className="text-white/60 font-medium leading-relaxed">{lang === 'az' ? 'Tələbələr öz fərdi tədris planlarını maraqlarına uyğun formalaşdıra bilərlər.' : 'Students can shape their individual study plans according to their interests.'}</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <AutoStoriesIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">{lang === 'az' ? 'Keyfiyyət' : 'Quality'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">{lang === 'az' ? 'Bolonya prosesi standartlarına uyğun tədris keyfiyyətinə zəmanət verilir.' : 'Teaching quality is guaranteed in accordance with Bologna process standards.'}</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <HistoryEduIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">{lang === 'az' ? 'Tanınma' : 'Recognition'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">{lang === 'az' ? 'Kreditlər beynəlxalq səviyyədə tanınır və tələbə mübadiləsini asanlaşdırır.' : 'Credits are internationally recognized and facilitate student exchange.'}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
