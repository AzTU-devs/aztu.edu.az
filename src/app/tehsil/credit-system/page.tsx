"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SpeedIcon from "@mui/icons-material/Speed";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

export default function CreditSystemPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.creditSystem;

    if (!data) return null;

    return (
        <main className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0a0c1a]">
             <PageHero
                title={data.title}
                description={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students' },
                    { label: data.breadcrumb }
                ]}
                eyebrow={data.eyebrow}
            />

            <PageContainer>
                {/* DOWNLOAD PDF CTA */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-8 md:p-12 rounded-[3rem] bg-white dark:bg-slate-800/50 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-2xl shadow-blue-900/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
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
                        className="group flex items-center gap-4 px-10 py-5 bg-[#1a2355] text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ee7c7e] transition-all duration-500 shadow-2xl shadow-[#1a2355]/20 hover:shadow-[#ee7c7e]/40"
                    >
                        {lang === 'az' ? 'Sənədi Yüklə' : 'Download Document'}
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20">
                            <ChevronRightIcon sx={{ fontSize: 18 }} />
                        </div>
                    </a>
                </motion.section>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
                    {data.sections.map((section: any, idx: number) => (
                        <motion.section 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col h-full bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-[3rem] border border-gray-100 dark:border-white/10 p-8 md:p-10 shadow-2xl shadow-blue-900/5 hover:border-[#ee7c7e]/30 transition-all duration-500"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="flex-1 space-y-8">
                                {section.content && (
                                    <p className="text-lg font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {section.content}
                                    </p>
                                )}

                                {section.list && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {section.list.map((item: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                                <div className="w-6 h-6 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] shrink-0">
                                                    <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                                                </div>
                                                <span className="text-sm font-bold text-[#1a2355] dark:text-gray-200">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.table && (
                                    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-[#1a2355]/5 dark:bg-black/20">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#1a2355] text-white uppercase text-[9px] font-black tracking-[0.1em]">
                                                    {section.table.headers.map((h: string, i: number) => (
                                                        <th key={i} className="px-4 py-3 border-b border-white/10">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                                {section.table.rows.map((row: string[], i: number) => (
                                                    <tr key={i} className="group hover:bg-[#ee7c7e]/5 transition-colors">
                                                        {row.map((cell: string, j: number) => (
                                                            <td key={j} className={`px-4 py-2.5 text-[11px] font-bold ${j === 1 ? 'text-[#ee7c7e] font-black' : 'text-gray-600 dark:text-gray-300'} group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors`}>
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
                        </motion.section>
                    ))}
                </div>

                {/* Feature Highlights */}
                <section className="pt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group"
                    >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                         <SpeedIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Çeviklik' : 'Flexibility'}</h4>
                         <p className="text-white/60 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Tələbələr öz fərdi tədris planlarını maraqlarına uyğun formalaşdıra bilərlər.' : 'Students can shape their individual study plans according to their interests.'}</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 rounded-[3rem] bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                         <AutoStoriesIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Keyfiyyət' : 'Quality'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Bolonya prosesi standartlarına uyğun tədris keyfiyyətinə zəmanət verilir.' : 'Teaching quality is guaranteed in accordance with Bologna process standards.'}</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 rounded-[3rem] bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                         <HistoryEduIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Tanınma' : 'Recognition'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Kreditlər beynəlxalq səviyyədə tanınır və tələbə mübadiləsini asanlaşdırır.' : 'Credits are internationally recognized and facilitate student exchange.'}</p>
                    </motion.div>
                </section>
            </PageContainer>
        </main>
    );
}
