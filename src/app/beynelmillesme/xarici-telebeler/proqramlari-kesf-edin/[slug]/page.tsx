"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { getStudyPlan, getStudyPlansForSlug } from "@/data/studyPlans";
import type { StudyPlanSemester } from "@/types/studyPlan";

const BASE = "/beynelmillesme/xarici-telebeler/proqramlari-kesf-edin";

export default function StudyPlanPage() {
    const params = useParams();
    const id = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const t = useTranslation();
    const p = t.pages.internationalization.exploreProgram;
    const sp = p.studyPlanPage;

    const plan = getStudyPlan(id);

    // ---- Not found ----
    if (!plan) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] px-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center mb-6">
                    <ErrorOutlineIcon sx={{ fontSize: 32 }} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white mb-3">{sp.notFoundTitle}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md font-medium">{sp.notFoundText}</p>
                <Link
                    href={BASE}
                    className="inline-flex items-center gap-2 bg-[#1a2355] text-white font-black px-6 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors"
                >
                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                    {sp.backToList}
                </Link>
            </main>
        );
    }

    const siblings = getStudyPlansForSlug(plan.slug);
    const langLabel = sp.languages[plan.language];

    // Group semesters by academic year (1–4)
    const years = [1, 2, 3, 4].map((year) => ({
        year,
        semesters: plan.semesters.filter((s) => s.year === year),
    }));

    const SemesterCard = ({ semester }: { semester: StudyPlanSemester }) => (
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#1a2355] to-[#13365E] px-6 py-5 flex items-center justify-between gap-3">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <h3 className="relative z-10 text-white font-black text-base tracking-tight">
                    {sp.terms[semester.term]}
                </h3>
                <span className="relative z-10 shrink-0 inline-flex items-center px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-[#ee7c7e] text-[11px] font-black uppercase tracking-[0.15em]">
                    {sp.semesterWord} {semester.semester}
                </span>
            </div>

            {/* Column labels */}
            <div className="hidden sm:grid grid-cols-12 gap-3 px-6 pt-4 pb-2 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-slate-500 border-b border-gray-100 dark:border-slate-800">
                <div className="col-span-3">{sp.codeLabel}</div>
                <div className="col-span-7">{sp.courseLabel}</div>
                <div className="col-span-2 text-right">{sp.creditsLabel}</div>
            </div>

            {/* Courses */}
            <div className="divide-y divide-gray-100 dark:divide-slate-800 flex-1">
                {semester.courses.map((course, idx) => (
                    <div
                        key={`${course.code}-${idx}`}
                        className="grid grid-cols-12 gap-3 px-6 py-3 items-center hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                        <div className="col-span-12 sm:col-span-3 order-2 sm:order-1">
                            {course.code ? (
                                <span className="inline-block font-mono text-[11px] font-bold text-[#1a2355]/70 dark:text-white/50 bg-[#1a2355]/5 dark:bg-white/5 px-2 py-1 rounded-md">
                                    {course.code}
                                </span>
                            ) : null}
                        </div>
                        <div className="col-span-9 sm:col-span-7 order-1 sm:order-2">
                            <span className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug">
                                {course.name}
                            </span>
                            {course.selective ? (
                                <span className="ml-2 inline-block align-middle px-2 py-0.5 rounded-md bg-[#ee7c7e]/10 text-[#ee7c7e] text-[10px] font-black uppercase tracking-wider">
                                    {sp.selectiveLabel}
                                </span>
                            ) : null}
                        </div>
                        <div className="col-span-3 sm:col-span-2 order-3 text-right">
                            <span className="font-black text-[#1a2355] dark:text-white text-sm">
                                {course.credits ?? "—"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer total */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800">
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 dark:text-slate-400">
                    {sp.semesterTotalLabel}
                </span>
                <span className="text-lg font-black text-[#ee7c7e]">{semester.totalCredits}</span>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[4rem] lg:rounded-bl-[16rem]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-16">
                    {/* Breadcrumb */}
                    <nav className="flex items-center flex-wrap gap-2 text-white/60 text-xs mb-10 lg:mb-14">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={BASE} className="hover:text-white transition-colors">
                            {p.breadcrumb}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{plan.program}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.2em]">
                                <MenuBookIcon sx={{ fontSize: 15 }} />
                                {plan.code}
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs font-black uppercase tracking-[0.2em]">
                                <TranslateIcon sx={{ fontSize: 15 }} />
                                {langLabel}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight max-w-5xl">
                            {plan.program}
                        </h1>
                        <p className="text-base lg:text-lg text-white/70 font-semibold max-w-3xl">{plan.faculty}</p>

                        {/* Meta / language switch */}
                        <div className="flex flex-wrap items-center gap-3 mt-8">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ee7c7e] text-white text-sm font-black shadow-lg shadow-[#ee7c7e]/30">
                                {plan.totalCredits} {sp.totalLabel}
                            </span>

                            {siblings.length > 1 && (
                                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <span className="px-2 text-white/50 text-[11px] font-black uppercase tracking-wider hidden sm:inline">
                                        {sp.instructionLanguageLabel}
                                    </span>
                                    {siblings.map((sib) => {
                                        const active = sib.id === plan.id;
                                        return (
                                            <Link
                                                key={sib.id}
                                                href={`${BASE}/${sib.id}`}
                                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-colors ${
                                                    active
                                                        ? "bg-white text-[#1a2355]"
                                                        : "text-white/80 hover:bg-white/10"
                                                }`}
                                            >
                                                {sp.languages[sib.language]}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CONTENT — semesters grouped by academic year */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-16 lg:py-24 space-y-16">
                {years.map(({ year, semesters }, yIdx) => (
                    <motion.section
                        key={year}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: yIdx * 0.05, duration: 0.5 }}
                    >
                        <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white tracking-tight flex items-center gap-4 mb-8">
                            <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                            {sp.academicYears[year - 1]}
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                            {semesters.map((semester) => (
                                <SemesterCard key={semester.semester} semester={semester} />
                            ))}
                        </div>
                    </motion.section>
                ))}

                {/* Back link */}
                <div className="pt-4">
                    <Link
                        href={BASE}
                        className="inline-flex items-center gap-2 text-[#1a2355] dark:text-white font-black text-sm hover:text-[#ee7c7e] dark:hover:text-[#ee7c7e] transition-colors"
                    >
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                        {sp.backToList}
                    </Link>
                </div>
            </div>
        </main>
    );
}
