"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicIcon from '@mui/icons-material/Public';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function VisaMigrationPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.visaMigration;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                    {p.eyebrow}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                    {p.title}
                                </h1>
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed whitespace-pre-wrap">
                                    {p.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-20">
                        {/* Visa Sections */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {p.visaSections.map((section: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#1a2355]/5 dark:bg-[#ee7c7e]/10 flex items-center justify-center mb-6">
                                        <PublicIcon className="text-[#ee7c7e]" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1a2355] dark:text-white mb-4">{section.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                        {section.description}
                                    </p>
                                </motion.div>
                            ))}
                        </section>

                        <section className="bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] p-8 lg:p-12 border border-blue-100 dark:border-blue-900/20">
                            <p className="text-[#1a2355] dark:text-blue-300 font-bold leading-relaxed flex gap-4">
                                <InfoIcon className="text-[#ee7c7e] shrink-0" />
                                {p.supportNote}
                            </p>
                        </section>

                        {/* Registration Section */}
                        <section>
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.registrationTitle}
                            </h2>
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-12 shadow-xl shadow-blue-900/5">
                                <p className="text-gray-600 dark:text-gray-300 font-medium mb-8 leading-relaxed">
                                    {p.registrationDescription}
                                </p>
                                <h4 className="text-[#1a2355] dark:text-white font-black mb-6 uppercase tracking-wider text-sm">
                                    {p.registrationMethodsTitle}
                                </h4>
                                <ul className="space-y-4 mb-8">
                                    {p.registrationMethods.map((method: string, idx: number) => (
                                        <li key={idx} className="flex gap-4 text-gray-600 dark:text-gray-300">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e]" />
                                            </div>
                                            <span className="font-medium leading-relaxed">{method}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                                        {p.addressChangeNote}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Permit Section */}
                        <section>
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.permitTitle}
                            </h2>
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-12 shadow-xl shadow-blue-900/5">
                                <p className="text-gray-600 dark:text-gray-300 font-medium mb-10 leading-relaxed">
                                    {p.permitDescription}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[#1a2355] dark:text-white font-black uppercase tracking-wider text-sm mb-6">
                                            {p.permitDocumentsTitle}
                                        </h4>
                                        <div className="space-y-4">
                                            {p.permitDocuments.map((doc: string, idx: number) => (
                                                <div key={idx} className="flex gap-4 text-gray-600 dark:text-gray-300">
                                                    <DescriptionIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e] mt-1" />
                                                    <span className="font-medium">{doc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-[#1a2355] rounded-3xl p-8 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                        <div className="relative z-10">
                                            <AssignmentIndIcon className="text-[#ee7c7e] mb-6" />
                                            <p className="text-white/80 text-sm leading-relaxed italic">
                                                {p.permitNote}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            {/* CTA Card */}
                            <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="relative z-10">
                                    <LocalHospitalIcon className="text-[#ee7c7e] mb-8" />
                                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Support Services</h3>
                                    <p className="text-white/60 font-medium mb-8 text-sm">
                                        Our International Admissions Office is here to help with all your migration needs.
                                    </p>
                                    <Link href="https://portal.edu.az" target="_blank" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-[#1a2355] px-8 py-4 rounded-2xl hover:bg-[#ee7c7e] hover:text-white transition-all w-full justify-center">
                                        Application Portal <ChevronRightIcon sx={{ fontSize: 16 }} />
                                    </Link>
                                </div>
                            </div>

                            {/* Related Links */}
                            <div className="space-y-4">
                                {p.related.map((link: any) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                                    >
                                        <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                            <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
