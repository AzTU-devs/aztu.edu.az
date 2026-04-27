"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TranslateIcon from '@mui/icons-material/Translate';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EngineeringIcon from '@mui/icons-material/Engineering';

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import Timeline from "@/components/shared/Timeline";

export default function HEIPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* STUNNING HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {lang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={lang === "az" ? "/haqqimizda" : "/about"} className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                                &quot;{p.subtitle}&quot;
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-10 lg:px-20 py-24 space-y-32 bg-white dark:bg-[#0b1330] relative overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto">
                    
                    {/* 1. ABOUT & DIRECTOR */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-8"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.aboutTitle}</h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                {p.paragraphs.map((para: string, i: number) => <p key={i}>{para}</p>)}
                            </div>

                            {/* Mission Section */}
                            <div className="mt-16 p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <h3 className="text-2xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                    <EngineeringIcon className="text-[#ee7c7e]" />
                                    {p.missionTitle}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic">&quot;{p.missionText}&quot;</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {p.strategicDirections.map((item: string, i: number) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="w-5 h-5 rounded-full bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] text-[10px] shrink-0 mt-0.5">{i+1}</div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Director Profile */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-4 space-y-8"
                        >
                            <div>
                                <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                                    {p.director.title}
                                </h3>
                                <PersonCard
                                    fullName={p.director.name}
                                    academicDegree={p.director.degree}
                                    title={p.title + " " + p.director.title}
                                    email={p.director.email}
                                    size="lg"
                                />
                            </div>

                            <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                                    <span className="text-gray-600 dark:text-gray-300 font-bold">{p.director.phone}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                                    <span className="text-gray-600 dark:text-gray-300 font-bold">{p.director.office}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <AccessTimeIcon className="text-[#ee7c7e]" fontSize="small" />
                                    <span className="text-gray-600 dark:text-gray-300 font-bold">{p.director.hours}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. ACADEMIC & RESEARCH */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                        {/* Academic Opportunities */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <SchoolIcon sx={{ fontSize: 150 }} />
                            </div>
                            <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                                <SchoolIcon className="text-[#ee7c7e]" sx={{ fontSize: 40 }} />
                                {p.academicOpportunities.title}
                            </h2>
                            <p className="text-white/70 mb-10 text-lg leading-relaxed">{p.academicOpportunities.description}</p>
                            <div className="grid grid-cols-2 gap-6 mb-12">
                                {p.academicOpportunities.stats.map((stat: string, i: number) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                        <p className="text-2xl font-black text-[#ee7c7e] mb-1">{stat.split(' ')[0]}</p>
                                        <p className="text-xs uppercase font-black tracking-widest text-white/40">{stat.split(' ').slice(1).join(' ')}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-8 border-t border-white/10">
                                <h4 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6 flex items-center gap-3">
                                    <TranslateIcon sx={{ fontSize: 16 }} />
                                    {p.academicOpportunities.languagesTitle}
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {p.academicOpportunities.languages.map((lang: string) => (
                                        <span key={lang} className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold border border-white/5">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Research & Innovation */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="bg-white dark:bg-white/5 rounded-[3rem] p-10 md:p-14 border border-gray-100 dark:border-white/10 shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ScienceIcon sx={{ fontSize: 150 }} />
                            </div>
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-4">
                                <ScienceIcon className="text-[#ee7c7e]" sx={{ fontSize: 40 }} />
                                {p.researchTitle}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">{p.researchDescription}</p>
                            <div className="space-y-4">
                                {p.researchItems.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] font-black shrink-0">0{i+1}</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* 3. DOCTORAL EDUCATION */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        className="bg-gray-50 dark:bg-white/5 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-white/10 mb-32"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-7">
                                <h2 className="text-4xl font-black text-[#1a2355] dark:text-white mb-8">{p.doctoralTitle}</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">{p.doctoralDescription}</p>
                                
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#ee7c7e] mb-6">{p.doctoralDuration.title}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
                                                <h5 className="font-black text-[#1a2355] dark:text-white mb-4 flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-[#ee7c7e] rounded-full" />
                                                    {p.doctoralDuration.phd.title}
                                                </h5>
                                                <ul className="space-y-2">
                                                    {p.doctoralDuration.phd.items.map((item: string) => <li key={item} className="text-sm text-gray-500">{item}</li>)}
                                                </ul>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm">
                                                <h5 className="font-black text-[#1a2355] dark:text-white mb-4 flex items-center gap-2">
                                                    <div className="w-1.5 h-4 bg-[#ee7c7e] rounded-full" />
                                                    {p.doctoralDuration.ds.title}
                                                </h5>
                                                <ul className="space-y-2">
                                                    {p.doctoralDuration.ds.items.map((item: string) => <li key={item} className="text-sm text-gray-500">{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 italic">{p.doctoralDuration.footer}</p>
                                </div>
                            </div>
                            <div className="lg:col-span-5 space-y-8">
                                <div className="p-8 rounded-[2rem] bg-[#ee7c7e] text-white shadow-xl shadow-[#ee7c7e]/20">
                                    <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                        <AssignmentIndIcon />
                                        {lang === "az" ? "Qəbul" : "Admission"}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-white/90">{p.doctoralAdmission}</p>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#1a2355] dark:text-white mb-6">{p.doctoralFormatsTitle}</h4>
                                    <div className="space-y-3">
                                        {p.doctoralFormats.map((format: string) => (
                                            <div key={format} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 font-bold">
                                                <div className="w-2 h-2 rounded-full bg-[#ee7c7e]" />
                                                {format}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. DIRECTOR BIO & EDUCATION */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 border-t border-gray-100 dark:border-white/10 pt-32">
                        <div className="lg:col-span-8 space-y-12">
                            <section>
                                <h3 className="text-3xl font-black text-[#1a2355] dark:text-white mb-8">{p.director.name}</h3>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    {p.director.bio.split('\n\n').map((para: string, i: number) => (
                                        <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-6">{para}</p>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-[#1a2355] dark:text-[#ee7c7e] bg-[#ee7c7e]/10 p-6 rounded-2xl border border-[#ee7c7e]/20">{p.director.achievements}</p>
                            </section>

                            <section>
                                <h4 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-8 flex items-center gap-3">
                                    <div className="w-2 h-4 bg-[#ee7c7e] rounded-full" />
                                    {p.director.researchInterestsTitle}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {p.director.researchInterests.map((interest: string) => (
                                        <div key={interest} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm font-bold text-gray-700 dark:text-gray-200">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] shrink-0" />
                                            {interest}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#1a2355] dark:text-white mb-8">{p.director.educationTitle}</h4>
                            <Timeline 
                                items={p.director.educationItems.map((item: any) => ({
                                    period: item.period,
                                    title: item.degree,
                                    inst: item.inst
                                }))} 
                            />
                        </div>
                    </div>

                    {/* 5. STAFF & MANAGEMENT BOARD */}
                    <div className="space-y-32">
                        {/* Staff */}
                        <section>
                            <div className="mb-12">
                                <h2 className="text-4xl font-black text-[#1a2355] dark:text-white mb-4">{p.staffTitle}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{p.staffDescription}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {p.staff.map((member: any, i: number) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <PersonCard
                                            fullName={member.name}
                                            title={member.pos}
                                            academicDegree={member.degree !== "None" && member.degree !== "Yoxdur" ? member.degree : ""}
                                            email={member.email}
                                        />
                                        <div className="mt-4 flex items-center gap-3 text-xs font-bold text-gray-400 pl-4">
                                            <PhoneIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                            {member.phone}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Management Board */}
                        <section className="bg-slate-50 dark:bg-white/5 rounded-[4rem] p-10 md:p-20 relative overflow-hidden border border-slate-100 dark:border-white/10">
                            <div className="absolute top-0 right-0 p-20 opacity-5">
                                <GroupsIcon sx={{ fontSize: 200 }} />
                            </div>
                            <div className="relative z-10 max-w-5xl">
                                <h2 className="text-4xl font-black text-[#1a2355] dark:text-white mb-4">{p.board.title}</h2>
                                <p className="text-[#ee7c7e] font-black uppercase tracking-widest text-xs mb-12">{p.board.note}</p>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                    <div className="space-y-12">
                                        <div>
                                            <h4 className="text-lg font-black text-[#1a2355] dark:text-white mb-6">{p.board.intro}</h4>
                                            <div className="space-y-4">
                                                {p.board.duties.map((duty: string, i: number) => (
                                                    <div key={i} className="flex gap-4 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-2.5 shrink-0" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{duty}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-[#1a2355] dark:text-white mb-6">{p.board.rightsTitle}</h4>
                                            <div className="space-y-4">
                                                {p.board.rights.map((right: string, i: number) => (
                                                    <div key={i} className="flex gap-4 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-2.5 shrink-0" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{right}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-12">
                                        <div>
                                            <h4 className="text-lg font-black text-[#1a2355] dark:text-white mb-6">{p.board.compositionTitle}</h4>
                                            <div className="space-y-4">
                                                {p.board.composition.map((item: string, i: number) => (
                                                    <div key={i} className="flex gap-4 items-start">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-2.5 shrink-0" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-20 pt-16 border-t border-slate-200 dark:border-white/10">
                                    <h4 className="text-xl font-black text-[#1a2355] dark:text-white mb-10 text-center">{p.board.requirementsTitle}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {p.board.requirements.map((req: string, i: number) => (
                                            <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400 leading-relaxed shadow-sm">
                                                {req}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-16 text-center">
                                        <div className="inline-block p-8 rounded-[2rem] bg-[#1a2355] text-white">
                                            <p className="text-sm font-bold opacity-60 uppercase tracking-widest mb-2">{p.board.title} {lang === "az" ? "Sədri" : "Chairman"}</p>
                                            <p className="text-xl font-black">{p.board.chairman}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Info */}
                        <section className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">{p.contactInfo.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><BusinessIcon /></div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.contactInfo.address}</p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><PhoneIcon /></div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.contactInfo.phone}</p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><EmailIcon /></div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.contactInfo.email}</p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><AccessTimeIcon /></div>
                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.contactInfo.hours}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Related Links */}
                    <div className="pt-20 mt-32 border-t border-gray-100 dark:border-white/10">
                        <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                            {t.common.moreInSection}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {p.related.map((link: any) => (
                                <Link key={link.href} href={link.href} className="group flex items-center justify-between bg-white dark:bg-white/5 p-6 rounded-[1.5rem] border border-gray-100 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                        <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
