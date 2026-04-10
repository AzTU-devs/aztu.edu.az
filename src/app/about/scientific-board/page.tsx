"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CHAIRMAN = {
    fullName: "Prof. Mustafa Babanli",
    academicDegree: "Doctor of Technical Sciences, Professor",
    title: "Chairman – Rector of AzTU",
    email: "rector@aztu.edu.az",
};

const MEMBERS = [
    { fullName: "Prof. Eldar Hasanov", title: "Vice-Rector for Academic Affairs" },
    { fullName: "Prof. Anar Mammadov", title: "Vice-Rector for Research" },
    { fullName: "Prof. Ramiz Guliyev", title: "Dean, Faculty of Computer Engineering" },
    { fullName: "Prof. Nigar Ahmadova", title: "Dean, Faculty of Electrical Engineering" },
    { fullName: "Prof. Farid Qasimov", title: "Dean, Faculty of Chemical Engineering" },
    { fullName: "Prof. Sabina Rustamova", title: "Dean, Faculty of Civil Engineering" },
    { fullName: "Prof. Namiq Mammadli", title: "Head, Dept. of Applied Mathematics" },
    { fullName: "Assoc. Prof. Leyla Aliyeva", title: "Vice-Rector for International Affairs" },
];

const MANDATE = [
    "Approve university-wide academic standards and degree programme structures",
    "Review and endorse research priorities and strategic research partnerships",
    "Evaluate nominations for professorial appointments and academic promotions",
    "Oversee academic quality assurance and institutional accreditation processes",
    "Deliberate on academic disciplinary matters involving faculty",
    "Advise the Rector on matters of academic policy and institutional governance",
];

const RELATED = [
    { title: "Rector", href: "/about/rector" },
    { title: "Vice-Rector", href: "/about/vice-rector" },
    { title: "Strategic Plan", href: "/about/strategic-plan" },
];

export default function ScientificBoardPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Leadership & Governance"
                    title="Scientific Board"
                    subtitle="The supreme academic governing body of Azerbaijan Technical University."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "Scientific Board" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Overview */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                        <SectionBlock accent title="About the Board">
                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                The Scientific Board (Elmi Şura) is the highest academic decision-making body of AzTU. Chaired by the Rector, it brings together deans, department heads, senior professors, and elected faculty representatives to deliberate on all matters of academic policy, quality, and strategy.
                            </p>
                        </SectionBlock>
                    </motion.div>

                    {/* Chairman */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-5">Chairman</h2>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xs mb-12">
                        <PersonCard {...CHAIRMAN} size="lg" />
                    </motion.div>

                    {/* Members */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-5">Board Members</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {MEMBERS.map((m, i) => (
                            <motion.div key={m.fullName} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                                <PersonCard {...m} size="sm" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mandate */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                        <SectionBlock accent title="Board Mandate">
                            <ol className="flex flex-col gap-3">
                                {MANDATE.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-[#1a2355] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
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
