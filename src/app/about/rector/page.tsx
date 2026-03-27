"use client";

import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "@/hooks/useTranslation";

export default function RectorPage() {
    const t = useTranslation();
    const p = t.pages.about.rector;

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

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Person card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <PersonCard
                                fullName="Prof. Mustafa Babanli"
                                academicDegree="Doctor of Technical Sciences, Professor"
                                title={p.viceRectors?.[0]?.title ?? "Rector of Azerbaijan Technical University"}
                                size="lg"
                                email="rector@aztu.edu.az"
                            />
                        </motion.div>

                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-2"
                        >
                            <SectionBlock accent title={p.messageTitle}>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                    {p.message.map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                    <p className="font-semibold text-[#1a2355] dark:text-white">
                                        Prof. Mustafa Babanli<br />
                                        <span className="font-normal text-gray-500 dark:text-gray-400 text-sm">Rector, Azerbaijan Technical University</span>
                                    </p>
                                </div>
                            </SectionBlock>
                        </motion.div>
                    </div>

                    {/* Responsibilities */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12"
                    >
                        <SectionBlock accent title={p.responsibilitiesTitle}>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {p.responsibilities.map((r, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <span className="w-5 h-5 rounded-full bg-[#ee7c7e]/20 text-[#ee7c7e] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>
                    </motion.div>

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
