"use client";

import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import DevicesIcon from "@mui/icons-material/Devices";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { useTranslation } from "@/hooks/useTranslation";

const PILLAR_ICONS = [
    <StarIcon key="star" sx={{ fontSize: 28 }} />,
    <ScienceIcon key="sci" sx={{ fontSize: 28 }} />,
    <PublicIcon key="pub" sx={{ fontSize: 28 }} />,
    <DevicesIcon key="dev" sx={{ fontSize: 28 }} />,
    <NaturePeopleIcon key="nat" sx={{ fontSize: 28 }} />,
];

export default function StrategicPlanPage() {
    const t = useTranslation();
    const p = t.pages.about.strategicPlan;

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow={p.eyebrow}
                    title={p.title}
                    subtitle={p.subtitle}
                    breadcrumbs={[{ label: t.nav.sections.about, href: "/about" }, { label: p.breadcrumb }]}
                />

                {/* Stats strip */}
                <div className="bg-white dark:bg-[#1e293b] border-b border-gray-100 dark:border-slate-700">
                    <div className="px-4 md:px-10 lg:px-20 py-7 grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
                        {p.stats.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                                <p className="text-3xl font-extrabold text-[#1a2355] dark:text-white">{s.value}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
                        {p.pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.num}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={i === 4 ? "lg:col-span-2 lg:max-w-xl lg:mx-auto w-full" : ""}
                            >
                                <SectionBlock>
                                    <div className="flex gap-5 items-start">
                                        <span className="text-6xl font-black text-[#1a2355]/8 dark:text-white/5 leading-none select-none flex-shrink-0 -mt-2">
                                            {pillar.num}
                                        </span>
                                        <div className="flex-1">
                                            <div className="text-[#ee7c7e] mb-2">{PILLAR_ICONS[i]}</div>
                                            <h3 className="text-[#1a2355] dark:text-white font-bold text-lg mb-2">{pillar.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{pillar.description}</p>
                                            <ul className="flex flex-col gap-1.5">
                                                {pillar.targets.map((target) => (
                                                    <li key={target} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-1.5 flex-shrink-0" />
                                                        {target}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </SectionBlock>
                            </motion.div>
                        ))}
                    </div>

                    {/* Related */}
                    <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-[#1a2355] dark:text-white mb-4">{t.common.moreInSection}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {p.related.map((link) => (
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
            <Footer />
        </>
    );
}
