"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import { motion, useInView } from "framer-motion";
import { useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
                        <h1 className={`text-[120px] md:text-[180px] font-black tracking-tighter leading-none ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} uppercase`}>{watermark}</h1>
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

interface Props {
    params: Promise<{ slug: string }>;
}

export default function ScientificJournalPage({ params }: Props) {
    const { slug } = use(params);
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.research?.scientificJournals;

    if (!data) return null;

    let journal: any = null;
    const normalizedSlug = slug.toLowerCase();
    
    if (normalizedSlug === "machine-science" || normalizedSlug === "masin-elmi") {
        journal = data.machineScience;
    } else if (normalizedSlug === "energy-sustainability-risks-and-decision-making" || normalizedSlug === "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi") {
        journal = data.energySustainability;
    }

    if (!journal) return (
         <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-3xl font-bold text-[#1a2355] mb-4">{lang === 'az' ? 'Jurnal tapılmadı' : 'Journal not found'}</h1>
            <Link href="/" className="flex items-center gap-1 bg-[#1a2355] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors">
                {lang === 'az' ? 'Ana səhifəyə qayıt' : 'Back to home'}
                <ChevronRightIcon sx={{ fontSize: 18 }} />
            </Link>
        </main>
    );

    const detailLabels: Record<string, string> = {
        issn: "ISSN",
        eissn: "E-ISSN",
        year: lang === 'az' ? "Təsis ili" : "Year of Establishment",
        issuesPerYear: lang === 'az' ? "İllik buraxılış sayı" : "Issues per Year",
        language: lang === 'az' ? "Dil" : "Language",
        founder: lang === 'az' ? "Təsisçi" : "Founder",
        doi: "DOI",
        link: lang === 'az' ? "Jurnal linki" : "Journal Link"
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#0b1330] transition-colors duration-500">
             <AboutPageBanner
                eyebrow={data.eyebrow}
                title={journal.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tədqiqat' : 'Research', href: '#' },
                    { label: data.breadcrumb }
                ]}
            />

            {/* OVERVIEW & IMAGE */}
            <HomeStyleSection 
                badge={lang === 'az' ? 'İcmal' : 'Overview'} 
                title={lang === 'az' ? 'Jurnal' : 'The'} 
                accentTitle={lang === 'az' ? 'Haqqında' : 'Journal'}
                watermark="About"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7 space-y-12">
                         <div className="p-10 md:p-16 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl">
                            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed text-justify">
                                {journal.about}
                            </p>
                        </div>
                        
                        {/* Detail Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.entries(journal.details).map(([key, value]: [string, any]) => (
                                <div key={key} className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg group hover:border-[#ee7c7e]/30 transition-all">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e] mb-2">{detailLabels[key]}</p>
                                    {key === 'link' ? (
                                        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] break-all transition-colors flex items-center gap-2">
                                            {value} <PublicIcon sx={{ fontSize: 14 }} />
                                        </a>
                                    ) : (
                                        <p className="text-sm font-bold text-[#1a2355] dark:text-white">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5 relative group">
                         <div className="absolute inset-0 bg-[#ee7c7e]/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
                         <div className="relative rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl">
                            {journal.image ? (
                                <Image 
                                    src={journal.image} 
                                    alt={journal.title} 
                                    width={800} 
                                    height={1000} 
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                                />
                            ) : (
                                <div className="aspect-[3/4] bg-gradient-to-br from-[#1a2355] to-[#0b1330] flex items-center justify-center">
                                     <MenuBookIcon sx={{ fontSize: 120, color: 'white', opacity: 0.1 }} />
                                </div>
                            )}
                         </div>
                    </div>
                </div>
            </HomeStyleSection>

            {/* EDITORIAL BOARD (If exists) */}
            {journal.chiefEditor && (
                <HomeStyleSection 
                    badge={lang === 'az' ? 'Heyət' : 'Board'} 
                    title={lang === 'az' ? 'Redaksiya' : 'Editorial'} 
                    accentTitle={lang === 'az' ? 'Heyəti' : 'Board'}
                    dark={true}
                    watermark="Board"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5">
                             <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-center shadow-2xl group hover:border-[#ee7c7e]/30 transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-8">
                                    <PersonIcon sx={{ fontSize: 32 }} />
                                </div>
                                <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-4">{lang === 'az' ? 'Baş Redaktor' : 'Chief Editor'}</h4>
                                <p className="text-white text-3xl font-black leading-tight group-hover:text-[#ee7c7e] transition-colors">
                                    {journal.chiefEditor}
                                </p>
                             </div>
                        </div>
                        <div className="lg:col-span-7">
                             <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                                <div className="flex items-center gap-6 mb-12">
                                     <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                        <GroupsIcon />
                                     </div>
                                     <h4 className="text-white text-2xl font-black uppercase tracking-tight">{lang === 'az' ? 'Redaksiya Heyəti' : 'Editorial Board'}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {journal.editorialBoard.map((member: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e]" />
                                            <p className="text-white/70 font-bold group-hover:text-white transition-colors">{member}</p>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>
                </HomeStyleSection>
            )}

            {/* EXTERNAL LINK CTA */}
            <section className="px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#0b1330]/50">
                <div className="max-w-[1600px] mx-auto">
                    <div className="p-12 md:p-20 rounded-[4rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden text-center flex flex-col items-center group">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                         <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ee7c7e]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                         
                         <div className="w-20 h-20 rounded-[2rem] bg-[#ee7c7e] flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(238,124,126,0.4)]">
                            <DescriptionIcon sx={{ fontSize: 40 }} />
                         </div>
                         <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            {lang === 'az' ? 'Arxivə daxil olun və' : 'Access the Archives and'} <br/>
                            {lang === 'az' ? 'Məqalələri oxuyun' : 'Read the Articles'}
                         </h3>
                         <a 
                            href={journal.details.link.startsWith('http') ? journal.details.link : `https://${journal.details.link}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-12 py-6 bg-white text-[#1a2355] rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ee7c7e] hover:text-white transition-all duration-500 shadow-2xl hover:shadow-[#ee7c7e]/40 hover:-translate-y-1 flex items-center gap-3"
                         >
                            {lang === 'az' ? 'Jurnalın Rəsmi Saytı' : 'Official Journal Website'}
                            <PublicIcon sx={{ fontSize: 18 }} />
                         </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
