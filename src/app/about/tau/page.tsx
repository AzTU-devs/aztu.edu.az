"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const KEY_FACTS = [
    { icon: <SchoolIcon sx={{ fontSize: 26 }} />, label: "Founded", value: "2009" },
    { icon: <LocationCityIcon sx={{ fontSize: 26 }} />, label: "Location", value: "Baku, Azerbaijan" },
    { icon: <GroupsIcon sx={{ fontSize: 26 }} />, label: "Students", value: "3,000+" },
    { icon: <MenuBookIcon sx={{ fontSize: 26 }} />, label: "Degree Programmes", value: "30+" },
];

const PROGRAMMES = [
    "Computer Engineering", "Information Security", "Software Engineering",
    "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
    "Economics & Management", "International Relations",
];

const RELATED = [
    { title: "Institute of Information Technology", href: "/about/iit" },
    { title: "Institute of Control Systems", href: "/about/ics" },
    { title: "Baku Technical Colleges", href: "/about/baku-technical-colleges" },
];

export default function TAUPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Affiliated Entity"
                    title="Turkish-Azerbaijan University (TAU)"
                    subtitle="A joint Turkish-Azerbaijani higher education institution fostering bilateral academic cooperation."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "TAU" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Key facts strip */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {KEY_FACTS.map((f, i) => (
                            <motion.div key={f.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                <SectionBlock>
                                    <div className="text-[#1a2355] dark:text-[#5A9BD3] mb-2">{f.icon}</div>
                                    <p className="text-2xl font-extrabold text-[#1a2355] dark:text-white">{f.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{f.label}</p>
                                </SectionBlock>
                            </motion.div>
                        ))}
                    </div>

                    {/* Overview */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                        <SectionBlock accent title="About TAU">
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                <p>
                                    Turkish-Azerbaijan University (Türk-Azərbaycan Universiteti) is a joint institution established under a bilateral agreement between the Republic of Azerbaijan and the Republic of Turkey. Founded in 2009, TAU is designed to strengthen educational and cultural ties between the two countries.
                                </p>
                                <p>
                                    TAU offers degree programmes across engineering, economics, and social sciences. Instruction is delivered in Azerbaijani, Turkish, and English, preparing graduates for careers in both countries and beyond. The university benefits from shared academic resources and faculty exchange with AzTU.
                                </p>
                            </div>
                        </SectionBlock>
                    </motion.div>

                    {/* Programmes */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                        <SectionBlock accent title="Programmes Offered">
                            <div className="flex flex-wrap gap-2">
                                {PROGRAMMES.map((p) => (
                                    <span key={p} className="bg-[#1a2355]/8 dark:bg-[#1a2355]/30 text-[#1a2355] dark:text-white text-sm font-medium px-4 py-1.5 rounded-full">
                                        {p}
                                    </span>
                                ))}
                            </div>
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
