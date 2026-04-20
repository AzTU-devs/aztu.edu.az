"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const VICE_RECTORS = [
    {
        fullName: "Prof. Eldar Hasanov",
        academicDegree: "Doctor of Sciences, Professor",
        title: "Vice-Rector for Academic Affairs",
        email: "vr.academic@aztu.edu.az",
    },
    {
        fullName: "Prof. Anar Mammadov",
        academicDegree: "Doctor of Sciences, Professor",
        title: "Vice-Rector for Research & Innovation",
        email: "vr.research@aztu.edu.az",
    },
    {
        fullName: "Assoc. Prof. Leyla Aliyeva",
        academicDegree: "PhD, Associate Professor",
        title: "Vice-Rector for International Affairs",
        email: "vr.international@aztu.edu.az",
    },
    {
        fullName: "Dr. Samir Rzayev",
        academicDegree: "PhD",
        title: "Vice-Rector for Administrative & Financial Affairs",
        email: "vr.admin@aztu.edu.az",
    },
];

const RELATED = [
    { title: "Rector", href: "/about/rector" },
    { title: "Scientific Board", href: "/about/scientific-board" },
    { title: "Strategic Plan", href: "/about/strategic-plan" },
];

export default function ViceRectorPage() {
    return (
        <>
            <main className="min-h-screen transition-colors duration-500">
                <AboutPageBanner
                    eyebrow="Leadership & Governance"
                    title="Vice-Rectors"
                    subtitle="The vice-rectors oversee the four core operational domains of the university."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "Vice-Rector" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <SectionBlock>
                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                Each Vice-Rector has delegated authority and responsibility for a specific operational portfolio, reporting directly to the Rector. Together they form the core executive leadership team that manages the day-to-day running of Azerbaijan Technical University.
                            </p>
                        </SectionBlock>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                        {VICE_RECTORS.map((vr, i) => (
                            <motion.div
                                key={vr.fullName}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <PersonCard {...vr} size="md" />
                            </motion.div>
                        ))}
                    </div>

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
