"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ComputerIcon from "@mui/icons-material/Computer";
import GroupsIcon from "@mui/icons-material/Groups";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
            className={`relative px-4 md:px-10 lg:px-20 py-24 ${dark ? 'bg-[#0a0c1a]' : 'bg-white dark:bg-[#0a0c1a]'} overflow-hidden transition-colors duration-500`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 ${dark ? 'opacity-[0.03]' : 'opacity-[0.1] dark:opacity-[0.03]'}`} 
                     style={{ backgroundImage: `radial-gradient(${dark ? 'white' : '#ee7c7e'} 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
                
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.02] dark:bg-[#1a2355]/[0.05] blur-[120px] rounded-full" />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${dark ? 'bg-blue-900/[0.03]' : 'bg-[#ee7c7e]/[0.02] dark:bg-[#ee7c7e]/[0.05]'} blur-[100px] rounded-full animate-pulse`} />
                
                {watermark && (
                    <div className="absolute left-10 bottom-10 select-none opacity-[0.01] dark:opacity-[0.03]">
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

export default function LMSGuidelinesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.lmsGuidelines;

    if (!data) return null;

    return (
        <main className="min-h-screen bg-white dark:bg-[#0a0c1a] transition-colors duration-500">
             <AboutPageBanner
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students', href: '#' },
                    { label: data.breadcrumb }
                ]}
            />

            {/* INTRO SECTION */}
            <HomeStyleSection 
                badge={lang === 'az' ? 'İcmal' : 'Overview'} 
                title={lang === 'az' ? 'Sistem' : 'LMS'} 
                accentTitle={lang === 'az' ? 'Haqqında' : 'System'}
                watermark="LMS"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="p-10 md:p-16 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl">
                        <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
                            {data.intro}
                        </p>
                    </div>
                    <div className="relative group">
                         <div className="absolute inset-0 bg-[#ee7c7e]/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
                         <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355] to-[#0b1330] flex items-center justify-center">
                                <ComputerIcon sx={{ fontSize: 120 }} className="text-white/10" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                     <div className="w-24 h-24 rounded-full bg-[#ee7c7e] flex items-center justify-center mb-6 shadow-[0_0_30px_#ee7c7e]">
                                        <IntegrationInstructionsIcon sx={{ fontSize: 40, color: 'white' }} />
                                     </div>
                                     <h3 className="text-white text-3xl font-black uppercase tracking-tighter">Smart Learning</h3>
                                     <p className="text-white/60 mt-4 font-medium uppercase text-xs tracking-widest">Digital Education Ecosystem</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </HomeStyleSection>

            {/* GUIDELINES PDF DOWNLOAD */}
            <HomeStyleSection 
                badge={lang === 'az' ? 'Təlimat' : 'Guidelines'} 
                title={data.guidelinesTitle} 
                dark={true}
                watermark="Rules"
            >
                <div className="p-10 md:p-16 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-[#ee7c7e] flex items-center justify-center text-white shadow-[0_0_30px_rgba(238,124,126,0.3)]">
                            <PictureAsPdfIcon sx={{ fontSize: 40 }} />
                        </div>
                        <div>
                            <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">{data.guidelinesTitle}</h3>
                            <p className="text-white/50 font-medium">{lang === 'az' ? 'KOICA və AzTU tərəfindən hazırlanan rəsmi istifadəçi təlimatı.' : 'Official user guidelines developed by KOICA and AzTU.'}</p>
                        </div>
                    </div>
                    <a 
                        href={data.guidelinesPdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-12 py-6 bg-white text-[#1a2355] rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ee7c7e] hover:text-white transition-all duration-500 shadow-2xl hover:shadow-[#ee7c7e]/40 hover:-translate-y-1"
                    >
                        {lang === 'az' ? 'Təlimatı Yüklə' : 'Download Guidelines'}
                    </a>
                </div>
            </HomeStyleSection>

            {/* STAFF SECTION */}
            <HomeStyleSection 
                badge={lang === 'az' ? 'Heyət' : 'Staff'} 
                title={data.staffTitle}
                watermark="Team"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <div className="p-10 md:p-16 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl h-full flex flex-col justify-center">
                             <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-8">
                                <GroupsIcon sx={{ fontSize: 32 }} />
                             </div>
                             <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold leading-relaxed mb-10">
                                {data.staffDescription}
                             </p>
                             <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 inline-flex">
                                <CheckCircleOutlineIcon className="text-[#ee7c7e]" />
                                <span className="font-bold text-[#1a2355] dark:text-white uppercase tracking-widest text-xs">{lang === 'az' ? 'Sertifikatlaşdırılmış Peşəkarlar' : 'Certified Professionals'}</span>
                             </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                         <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden h-full group hover:shadow-[#ee7c7e]/20 transition-all duration-500">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                             <div className="relative z-10">
                                <h4 className="text-2xl font-black uppercase tracking-tight mb-8">{data.staffListTitle}</h4>
                                <div className="space-y-6 mb-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e]" />
                                        <p className="text-white/60 font-medium italic">{lang === 'az' ? 'Təlim keçmiş heyətin tam siyahısı rəsmi sənəddə əks olunub.' : 'The full list of trained staff is reflected in the official document.'}</p>
                                    </div>
                                </div>
                                <a 
                                    href={data.staffPdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-[#ee7c7e] text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-white hover:text-[#ee7c7e] transition-all duration-500 shadow-2xl shadow-[#ee7c7e]/30"
                                >
                                    <PictureAsPdfIcon />
                                    {lang === 'az' ? 'Siyahını Yüklə' : 'Download List'}
                                </a>
                             </div>
                         </div>
                    </div>
                </div>
            </HomeStyleSection>

            {/* Features Highlight */}
            <section className="px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#0a0c1a]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                         <ComputerIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">{lang === 'az' ? 'Rəqəmsal Təhsil' : 'Digital Education'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">{lang === 'az' ? 'İstənilən vaxt, istənilən yerdən kurs materiallarına çıxış imkanı.' : 'Access to course materials anytime, anywhere.'}</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <IntegrationInstructionsIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">{lang === 'az' ? 'İnteraktivlik' : 'Interactivity'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">{lang === 'az' ? 'Müəllim və tələbələr arasında canlı ünsiyyət və rəy mübadiləsi.' : 'Live communication and feedback exchange between teachers and students.'}</p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                         <SchoolIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">{lang === 'az' ? 'Effektivlik' : 'Efficiency'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">{lang === 'az' ? 'Tədris prosesinin avtomatlaşdırılmış idarəedilməsi və qiymətləndirilməsi.' : 'Automated management and assessment of the teaching process.'}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
