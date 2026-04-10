"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouterIcon from "@mui/icons-material/Router";
import TrainIcon from "@mui/icons-material/Train";

const PROGRAMMES = [
    { icon: <WifiIcon sx={{ fontSize: 26 }} />, title: "Telecommunications Technology", duration: "3 years", credential: "Technician Diploma" },
    { icon: <RouterIcon sx={{ fontSize: 26 }} />, title: "Data Networks & Communications", duration: "3 years", credential: "Technician Diploma" },
    { icon: <DirectionsBusIcon sx={{ fontSize: 26 }} />, title: "Road Transport Operation", duration: "3 years", credential: "Technician Diploma" },
    { icon: <TrainIcon sx={{ fontSize: 26 }} />, title: "Railway Transport Management", duration: "3 years", credential: "Technician Diploma" },
];

const RELATED = [
    { title: "Baku Technical Colleges", href: "/about/baku-technical-colleges" },
    { title: "Turkish-Azerbaijan University (TAU)", href: "/about/tau" },
    { title: "Strategic Plan", href: "/about/strategic-plan" },
];

export default function BakuStateCollegesPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Affiliated College"
                    title="Baku State Colleges of Communication and Transport"
                    subtitle="Specialised vocational training for the telecommunications and transport sectors of Azerbaijan."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "Baku State Colleges" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Key stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {[
                            { value: "1958", label: "Founded" },
                            { value: "1,500+", label: "Students" },
                            { value: "4", label: "Specialisations" },
                            { value: "90%+", label: "Employment Rate" },
                        ].map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                <SectionBlock>
                                    <p className="text-2xl font-extrabold text-[#1a2355] dark:text-white">{s.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                                </SectionBlock>
                            </motion.div>
                        ))}
                    </div>

                    {/* Overview */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <SectionBlock accent title="About the College">
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                <p>
                                    Baku State Colleges of Communication and Transport (Bakı Rabitə və Nəqliyyat Dövlət Kollecləri) is an affiliated vocational institution of AzTU, offering specialised programmes in telecommunications, data communications, road transport, and railway management.
                                </p>
                                <p>
                                    The college maintains strong ties with sector employers including AzərGold, AzərEnerji, Azerbaijan Railways (ADY), and leading telecommunications operators, ensuring graduates enter a robust and engaged job market. Credit transfer agreements with AzTU allow motivated graduates to continue to a full Bachelor&apos;s degree.
                                </p>
                            </div>
                        </SectionBlock>
                    </motion.div>

                    {/* Programmes */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-6">Programmes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                        {PROGRAMMES.map((p, i) => (
                            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
                                <SectionBlock>
                                    <div className="text-[#1a2355] dark:text-[#5A9BD3] mb-3">{p.icon}</div>
                                    <h3 className="text-[#1a2355] dark:text-white font-bold text-sm mb-1">{p.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration: {p.duration} · {p.credential}</p>
                                </SectionBlock>
                            </motion.div>
                        ))}
                    </div>

                    {/* Admissions */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
                        <SectionBlock accent title="Admissions">
                            <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                                {[
                                    "Open to secondary school graduates (11 years of general education)",
                                    "Admission based on State Examination Centre (DİM) results",
                                    "Annual intake — academic year begins in September",
                                    "Full-time study; accommodation available on campus",
                                    "Contact: admissions@bsct.edu.az",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-2 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>
                    </motion.div>

                    {/* Related */}
                    <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-[#1a2355] dark:text-white mb-4">More in this section</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {RELATED.map((link) => (
                                <Link key={link.href} href={link.href}
                                    className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700 rounded-xl px-5 py-3 hover:border-[#1a2355]/30 hover:shadow-md transition-all duration-200 group">
                                    <span className="text-[#1a2355] dark:text-white font-medium text-sm">{link.title}</span>
                                    <ChevronRightIcon sx={{ fontSize: 18, color: "#1a2355", opacity: 0.4 }} className="transition-transform duration-200 group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            </>
    );
}
