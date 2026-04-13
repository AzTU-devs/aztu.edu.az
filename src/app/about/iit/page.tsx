"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CloudIcon from "@mui/icons-material/Cloud";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import DataObjectIcon from "@mui/icons-material/DataObject";

const RESEARCH_AREAS = [
    { icon: <PsychologyIcon sx={{ fontSize: 28 }} />, title: "Artificial Intelligence", desc: "Machine learning, deep learning, and AI applications in industry and healthcare." },
    { icon: <SecurityIcon sx={{ fontSize: 28 }} />, title: "Cybersecurity", desc: "Network security, cryptography, and secure software engineering." },
    { icon: <CloudIcon sx={{ fontSize: 28 }} />, title: "Cloud & Distributed Computing", desc: "Scalable cloud architectures, edge computing, and distributed systems." },
    { icon: <StorageIcon sx={{ fontSize: 28 }} />, title: "Big Data & Analytics", desc: "Large-scale data processing, business intelligence, and data-driven decision-making." },
    { icon: <NetworkCheckIcon sx={{ fontSize: 28 }} />, title: "Computer Networks", desc: "Next-generation networking, 5G/6G integration, and IoT infrastructure." },
    { icon: <DataObjectIcon sx={{ fontSize: 28 }} />, title: "Software Engineering", desc: "Formal methods, software quality, and intelligent development tools." },
];

const RELATED = [
    { title: "Institute of Control Systems", href: "/about/ics" },
    { title: "Turkish-Azerbaijan University (TAU)", href: "/about/tau" },
    { title: "Research Activities", href: "/research/research-activity" },
];

export default function IITPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Research Institute"
                    title="Institute of Information Technology"
                    subtitle="Advancing computing, AI, and digital systems research in partnership with AzTU and ANAS."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "Institute of Information Technology" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Overview */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                        <SectionBlock accent title="About the Institute">
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                <p>
                                    The Institute of Information Technology (IIT) is a leading research institution operating under the Azerbaijan National Academy of Sciences (ANAS) in close partnership with Azerbaijan Technical University. IIT conducts fundamental and applied research across the full spectrum of computer science and information technology.
                                </p>
                                <p>
                                    Through joint projects, shared laboratory facilities, and co-supervised graduate students, IIT and AzTU together create a research ecosystem that bridges theoretical innovation with practical engineering application.
                                </p>
                            </div>
                        </SectionBlock>
                    </motion.div>

                    {/* Director */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-5">Director</h2>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xs mb-12">
                        <PersonCard
                            fullName="Academician Rasim Alguliyev"
                            academicDegree="Doctor of Sciences, Academician"
                            title="Director, Institute of Information Technology"
                            email="director@iit.ab.az"
                            size="lg"
                        />
                    </motion.div>

                    {/* Research areas */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-6">Research Areas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                        {RESEARCH_AREAS.map((area, i) => (
                            <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
                                <SectionBlock>
                                    <div className="text-[#ee7c7e] mb-3">{area.icon}</div>
                                    <h3 className="text-[#1a2355] dark:text-white font-bold text-sm mb-1">{area.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{area.desc}</p>
                                </SectionBlock>
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
