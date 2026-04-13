"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BiotechIcon from "@mui/icons-material/Biotech";
import MemoryIcon from "@mui/icons-material/Memory";
import TrafficIcon from "@mui/icons-material/Traffic";

const RESEARCH_AREAS = [
    { icon: <SettingsSuggestIcon sx={{ fontSize: 28 }} />, title: "Automatic Control Theory", desc: "Stability analysis, optimal and adaptive control, and robust systems design." },
    { icon: <PrecisionManufacturingIcon sx={{ fontSize: 28 }} />, title: "Industrial Automation", desc: "PLC programming, SCADA systems, and smart manufacturing technologies." },
    { icon: <ElectricBoltIcon sx={{ fontSize: 28 }} />, title: "Power Systems Control", desc: "Smart grids, renewable energy integration, and power electronics." },
    { icon: <MemoryIcon sx={{ fontSize: 28 }} />, title: "Embedded Systems", desc: "Real-time operating systems, microcontroller design, and embedded AI." },
    { icon: <BiotechIcon sx={{ fontSize: 28 }} />, title: "Biomedical Engineering", desc: "Biosignal processing, medical device control, and telemedicine systems." },
    { icon: <TrafficIcon sx={{ fontSize: 28 }} />, title: "Intelligent Transport Systems", desc: "Traffic optimisation, autonomous vehicle control, and V2X communications." },
];

const RELATED = [
    { title: "Institute of Information Technology", href: "/about/iit" },
    { title: "Turkish-Azerbaijan University (TAU)", href: "/about/tau" },
    { title: "Research Activities", href: "/research/research-activity" },
];

export default function ICSPage() {
    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Research Institute"
                    title="Institute of Control Systems"
                    subtitle="Pioneering research in automation, intelligent control, and embedded systems in partnership with AzTU."
                    breadcrumbs={[{ label: "About", href: "/about" }, { label: "Institute of Control Systems" }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Overview */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                        <SectionBlock accent title="About the Institute">
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                <p>
                                    The Institute of Control Systems (ICS) is a prominent research institution under the Azerbaijan National Academy of Sciences (ANAS), with deep collaborative ties to Azerbaijan Technical University. ICS focuses on automatic control, industrial automation, and intelligent systems — fields that underpin Azerbaijan&apos;s industrial modernisation.
                                </p>
                                <p>
                                    Joint doctoral programmes, shared experimental facilities, and collaborative industrial projects position ICS and AzTU as a combined force in applied engineering research across the South Caucasus.
                                </p>
                            </div>
                        </SectionBlock>
                    </motion.div>

                    {/* Director */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-5">Director</h2>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xs mb-12">
                        <PersonCard
                            fullName="Academician Ali Abbasov"
                            academicDegree="Doctor of Sciences, Academician"
                            title="Director, Institute of Control Systems"
                            email="director@ics.ab.az"
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
