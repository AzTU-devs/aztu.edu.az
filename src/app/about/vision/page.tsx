"use client";

import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PublicIcon from "@mui/icons-material/Public";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useTranslation } from "@/hooks/useTranslation";

const POINT_ICONS = [
    <EngineeringIcon key="eng" sx={{ fontSize: 28 }} />,
    <PublicIcon key="pub" sx={{ fontSize: 28 }} />,
    <LightbulbIcon key="bulb" sx={{ fontSize: 28 }} />,
];

export default function VisionPage() {
    const t = useTranslation();
    const p = t.pages.about.vision;

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

                <div className="px-4 md:px-10 lg:px-20 py-14 max-w-5xl">
                    {/* Vision statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <SectionBlock accent title={p.statementTitle}>
                            <blockquote className="border-l-4 border-[#ee7c7e] pl-6 py-2">
                                <p className="text-2xl md:text-3xl font-light text-[#1a2355] dark:text-white leading-relaxed italic">
                                    {p.visionQuote}
                                </p>
                            </blockquote>
                        </SectionBlock>
                    </motion.div>

                    {/* Supporting pillars */}
                    <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-6">
                        {p.whatItMeans}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
                        {p.points.map((pt, i) => (
                            <motion.div
                                key={pt.title}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <SectionBlock>
                                    <div className="text-[#ee7c7e] mb-4">{POINT_ICONS[i]}</div>
                                    <h3 className="text-[#1a2355] dark:text-white font-bold text-base mb-2">{pt.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{pt.body}</p>
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
