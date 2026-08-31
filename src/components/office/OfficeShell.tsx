"use client";

import { motion } from "framer-motion";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import OfficeSidebar, { type OfficeSection } from "@/components/office/OfficeSidebar";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    /** Sections offered in the sidebar; each id must match a section on the page. */
    sections: OfficeSection[];
    /** Optional figure shown under the accent rule, e.g. a staff count. */
    stat?: { value: string; label: string };
    children: React.ReactNode;
};

/**
 * Portal shell for an office or centre.
 *
 * Deliberately the same furniture as the structural-unit pages
 * (`components/department/DepartmentDetailLayout`): dark video hero, breadcrumbs,
 * eyebrow pill, oversized title, then a sticky sidebar beside the content. The
 * offices previously each invented their own hero and page rhythm, so no two of
 * them — nor any of them and a department — looked like the same site.
 *
 * Departments split their sections across routes; an office is a single page, so
 * the sidebar scrolls to sections rather than navigating. The chrome is
 * identical either way.
 */
export default function OfficeShell({
    eyebrow,
    title,
    subtitle,
    sections,
    stat,
    children,
}: Props) {
    const { lang } = useLanguage();

    const unitsLabel = lang === "az" ? "Ofis və Mərkəzlər" : "Offices and Centers";
    const unitsHref = lang === "az" ? "/az/idareetme/ofis-ve-merkezler" : "/en/management/offices-and-centers";

    return (
        <div className="min-h-screen bg-page text-[#1a2355] transition-colors dark:text-white">
            <header className="text-flow relative flex flex-col overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                    <AboutHeroVideoBg />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/85 via-[#0a0c1a]/40 to-transparent" />
                    <div className="absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-blue-800/20 blur-[170px]" />
                    <div className="absolute -bottom-[40%] left-[5%] h-[520px] w-[520px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-14 md:px-10 lg:px-20">
                    <Breadcrumbs
                        items={[{ label: unitsLabel, href: unitsHref }, { label: title }]}
                    />

                    <div className="max-w-4xl">
                        {/* Never starts at opacity 0 — the copy has to be on screen even
                            if the animation never runs. */}
                        <motion.div
                            initial={{ y: 18 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                        {eyebrow}
                                    </span>
                                </span>
                            </div>

                            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                                {title}
                            </h1>

                            {subtitle && (
                                <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-lg">
                                    {subtitle}
                                </p>
                            )}

                            <div className="mt-7 flex items-center gap-5">
                                <span className="h-px w-16 bg-gradient-to-r from-[#ee7c7e] to-transparent" />
                                {stat && (
                                    <span className="inline-flex items-baseline gap-2">
                                        <span className="text-2xl font-black tabular-nums tracking-tighter text-white">
                                            {stat.value}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
                                            {stat.label}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14 lg:flex-row lg:gap-10 lg:px-20">
                <aside className="lg:w-[292px] lg:shrink-0">
                    <div className="lg:sticky lg:top-28">
                        <OfficeSidebar sections={sections} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <div className="space-y-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
