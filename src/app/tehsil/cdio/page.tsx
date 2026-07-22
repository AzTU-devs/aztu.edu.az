"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

function Section({
    badge,
    title,
    accentTitle,
    children,
    dark = false,
    watermark = "",
}: {
    badge: string;
    title: string;
    accentTitle?: string;
    children: React.ReactNode;
    dark?: boolean;
    watermark?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className={`relative px-4 md:px-10 lg:px-20 py-24 ${dark ? "bg-[#0a0c1a]" : "bg-white dark:bg-[#070b1a]"} overflow-hidden transition-colors duration-500`}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className={`absolute inset-0 ${dark ? "opacity-[0.03]" : "opacity-[0.1] dark:opacity-[0.03]"}`}
                    style={{
                        backgroundImage: `radial-gradient(${dark ? "white" : "#ee7c7e"} 0.5px, transparent 0.5px)`,
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.02] dark:bg-[#1a2355]/[0.05] blur-[120px] rounded-full" />
                <div
                    className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${dark ? "bg-blue-900/[0.03]" : "bg-[#ee7c7e]/[0.02] dark:bg-[#ee7c7e]/[0.05]"} blur-[100px] rounded-full animate-pulse`}
                />
                {watermark && (
                    <div className="absolute left-10 bottom-10 select-none opacity-[0.01] dark:opacity-[0.03]">
                        <h1
                            className={`text-[150px] font-black tracking-tighter leading-none ${dark ? "text-white" : "text-[#1a2355] dark:text-white"} uppercase`}
                        >
                            {watermark}
                        </h1>
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div
                            className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl ${dark ? "bg-white/5 border-white/10" : "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10"} border mb-6 shadow-sm`}
                        >
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span
                                className={`${dark ? "text-white" : "text-[#1a2355] dark:text-white"} text-[11px] font-black uppercase tracking-[0.15em]`}
                            >
                                {badge}
                            </span>
                        </div>
                        <h2
                            className={`text-4xl md:text-6xl font-black ${dark ? "text-white" : "text-[#1a2355] dark:text-white"} leading-tight tracking-tighter`}
                        >
                            {title}{" "}
                            {accentTitle && (
                                <span className="text-[#ee7c7e]">{accentTitle}</span>
                            )}
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

export default function CDIOPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.cdio;

    if (!data) return null;

    return (
        <main className="min-h-screen bg-page transition-colors duration-500">
            <AboutPageBanner
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    {
                        label: lang === "az" ? "Tələbələr" : "Students",
                        href: "#",
                    },
                    { label: data.breadcrumb },
                ]}
            />

            {/* INTRO */}
            <Section
                badge={lang === "az" ? "Haqqında" : "About"}
                title="CDIO"
                accentTitle={lang === "az" ? "Təşəbbüsü" : "Initiative"}
                watermark="CDIO"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="p-10 md:p-16 rounded-[18px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl">
                        <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">
                            {data.intro}
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#ee7c7e]/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
                        <div className="relative aspect-video rounded-[18px] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355] to-[#0b1330] flex items-center justify-center">
                                <SchoolIcon sx={{ fontSize: 120 }} className="text-white/10" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-24 h-24 rounded-full bg-[#ee7c7e] flex items-center justify-center mb-6 shadow-[0_0_30px_#ee7c7e]">
                                        <ScienceIcon sx={{ fontSize: 40, color: "white" }} />
                                    </div>
                                    <h3 className="text-white text-3xl font-black tracking-tighter">
                                        CDIO
                                    </h3>
                                    <p className="text-white/60 mt-4 font-medium uppercase text-xs tracking-widest">
                                        Conceive · Design · Implement · Operate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* WHAT IS CDIO */}
            <Section
                badge={lang === "az" ? "Məlumat" : "Overview"}
                title={data.whatIsCdio.title}
                dark={true}
                watermark="MIT"
            >
                <div className="space-y-6">
                    {data.whatIsCdio.paragraphs.map((para, i) => (
                        <div
                            key={i}
                            className="p-8 md:p-10 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl"
                        >
                            <p className="text-white/80 text-lg leading-relaxed">{para}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* INSTITUTES */}
            <Section
                badge={lang === "az" ? "İnstitutlar" : "Institutes"}
                title={data.institutes.title}
                watermark="Labs"
            >
                <p className="text-gray-500 dark:text-white/50 text-lg mb-12 font-medium">
                    {data.institutes.subtitle}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.institutes.items.map((item, i) => (
                        <div
                            key={i}
                            className="group p-8 rounded-[18px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:-translate-y-2 hover:border-[#ee7c7e] hover:shadow-[#ee7c7e]/20 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />
                            <div className="w-12 h-12 rounded-2xl bg-[#1a2355] dark:bg-[#ee7c7e]/20 flex items-center justify-center mb-6 text-white">
                                <BusinessCenterIcon sx={{ fontSize: 24 }} />
                            </div>
                            <p className="text-[#1a2355] dark:text-white font-bold text-sm leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* STUDENT SCIENTIFIC SOCIETY */}
            <Section
                badge={lang === "az" ? "Cəmiyyət" : "Society"}
                title={data.studentSociety.title}
                dark={true}
                watermark="Research"
            >
                <p className="text-white/60 text-lg mb-12 font-medium">
                    {data.studentSociety.subtitle}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.studentSociety.objectives.map((obj, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-5 p-8 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl group hover:border-[#ee7c7e]/50 transition-all duration-500"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#ee7c7e] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-[0_0_20px_rgba(238,124,126,0.3)]">
                                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                            </div>
                            <p className="text-white/80 font-medium leading-relaxed">{obj}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* BOTTOM HIGHLIGHT */}
            <section className="px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#070b1a]">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <SchoolIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />,
                            title: lang === "az" ? "Nəzəri Bilik" : "Theoretical Knowledge",
                            desc: lang === "az"
                                ? "MIT tərəfindən hazırlanmış 12 standart əsasında qurulmuş akademik proqram."
                                : "Academic program built on 12 standards developed by MIT.",
                        },
                        {
                            icon: <ScienceIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />,
                            title: lang === "az" ? "Praktiki Təcrübə" : "Practical Experience",
                            desc: lang === "az"
                                ? "Real layihələr və mühəndislik həlləri vasitəsilə peşəkar bacarıqların inkişafı."
                                : "Professional skill development through real projects and engineering solutions.",
                        },
                        {
                            icon: <GroupsIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8" />,
                            title: lang === "az" ? "Qlobal Şəbəkə" : "Global Network",
                            desc: lang === "az"
                                ? "100-dən çox dünya universitetini birləşdirən beynəlxalq akademik şəbəkənin üzvü."
                                : "Member of an international academic network uniting over 100 world universities.",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="p-10 rounded-[18px] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                            {card.icon}
                            <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">
                                {card.title}
                            </h4>
                            <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
