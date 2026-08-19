"use client";

import { motion } from "framer-motion";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Hero for the Higher Education Institute portal.
 *
 * Deliberately identical in structure to the structural-unit hero
 * (`components/department/DepartmentHero`): dark video bed, breadcrumbs,
 * eyebrow pill, oversized title, then an accent rule with one headline figure.
 * Both are unit portals, so they read the same way above the fold.
 */
export default function HeiHero() {
    const { lang } = useLanguage();
    const t = useTranslation();
    const p = t.pages.about.hei;

    const specialisations = p.academicOpportunities.stats;

    return (
        <header className="text-flow relative flex flex-col overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
            {/* Video background — same treatment as the structural-unit pages */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                <AboutHeroVideoBg />
                {/* Scrim so the title stays legible over any frame of the video */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/85 via-[#0a0c1a]/40 to-transparent" />
                <div className="absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-blue-800/20 blur-[170px]" />
                <div className="absolute -bottom-[40%] left-[5%] h-[520px] w-[520px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-14 md:px-10 lg:px-20">
                <Breadcrumbs
                    items={[
                        { label: lang === "az" ? "Təhsil və Proqramlar" : "Education & Programs" },
                        { label: p.breadcrumb },
                    ]}
                />

                {/* Identity */}
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                    {p.eyebrow}
                                </span>
                            </span>
                        </div>

                        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                            {p.title}
                        </h1>

                        <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-lg">
                            {p.subtitle}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-5">
                            <span className="h-px w-16 bg-gradient-to-r from-[#ee7c7e] to-transparent" />
                            {specialisations.map((stat: string) => {
                                const [value, ...rest] = stat.split(" ");
                                return (
                                    <span key={stat} className="inline-flex items-baseline gap-2">
                                        <span className="text-2xl font-black tabular-nums tracking-tighter text-white">
                                            {value}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
                                            {rest.join(" ")}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
