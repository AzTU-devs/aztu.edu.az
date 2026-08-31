"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import ComingSoon from "@/components/shared/ComingSoon";
import {
    getHonoraryDoctors,
    getHonoraryDoctorImageUrl,
    type HonoraryDoctor,
} from "@/services/honoraryDoctorService/honoraryDoctorService";

export default function HonoraryDoctorsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.community.honoraryDoctors;

    /* `undefined` is "still loading" and is deliberately distinct from an empty
       array. Collapsing the two is what makes a page announce itself as empty
       while its data is still in flight. */
    const [doctors, setDoctors] = useState<HonoraryDoctor[] | undefined>(undefined);

    useEffect(() => {
        let alive = true;
        setDoctors(undefined);
        getHonoraryDoctors(lang).then((list) => {
            if (alive) setDoctors(list ?? []);
        });
        return () => {
            alive = false;
        };
    }, [lang]);

    const communityLabel = lang === "az" ? "İcma" : "Community";
    const communityHref = lang === "az" ? "/az/icma" : "/en/community";
    const honorsLabel = lang === "az" ? "AzTU-nun Fəxriləri" : "AzTU's Honors";
    const honorsHref = lang === "az" ? "/az/icma/aztu-nun-fexrileri" : "/en/community/aztus-honors";

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/30">
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <header className="text-flow relative overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                    <AboutHeroVideoBg />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/90 via-[#0a0c1a]/55 to-transparent" />
                    <div className="absolute -right-[8%] -top-[30%] h-[720px] w-[720px] rounded-full bg-blue-800/20 blur-[170px]" />
                    <div className="absolute -bottom-[35%] left-[4%] h-[540px] w-[540px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-14 md:px-10 lg:px-20">
                    <Breadcrumbs
                        items={[
                            { label: communityLabel, href: communityHref },
                            { label: honorsLabel, href: honorsHref },
                            { label: p.breadcrumb },
                        ]}
                    />

                    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{ y: 18 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-7"
                        >
                            <span className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                    {p.eyebrow}
                                </span>
                            </span>

                            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                                {p.title}
                            </h1>

                            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/65 md:text-lg">
                                {p.subtitle}
                            </p>
                        </motion.div>

                        {doctors && doctors.length > 0 && (
                            <motion.div
                                initial={{ scale: 0.985 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
                                className="lg:col-span-5"
                            >
                                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ee7c7e]/15 blur-3xl" />
                                    <p className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                                        <WorkspacePremiumIcon sx={{ fontSize: 15 }} className="text-[#ee7c7e]" />
                                        {p.eyebrow}
                                    </p>
                                    <p className="relative z-10 mt-5 text-6xl font-black leading-none tracking-tighter text-white tabular-nums">
                                        {doctors.length}
                                    </p>
                                    <p className="relative z-10 mt-4 border-t border-white/10 pt-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                                        {p.title}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </header>

            {/* ── ROLL ─────────────────────────────────────────────────────── */}
            <div className="mx-auto w-full max-w-[1600px] px-4 py-14 md:px-10 md:py-20 lg:px-20">
                {doctors === undefined ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[4/5] animate-pulse rounded-2xl border border-slate-200 bg-slate-100/70 dark:border-white/10 dark:bg-white/5"
                            />
                        ))}
                    </div>
                ) : doctors.length === 0 ? (
                    <ComingSoon />
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {doctors.map((doctor, i) => {
                            const image = getHonoraryDoctorImageUrl(doctor.image);
                            return (
                                <motion.article
                                    key={doctor.id}
                                    initial={{ y: 16 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.45,
                                        delay: Math.min(i * 0.03, 0.3),
                                        ease: [0.23, 1, 0.32, 1],
                                    }}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-[#ee7c7e]/60 dark:border-white/10 dark:bg-slate-900"
                                >
                                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#1a2355] to-[#0f172a]">
                                        {image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={image}
                                                alt={doctor.full_name ?? ""}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <span className="flex h-full w-full items-center justify-center">
                                                <PersonIcon sx={{ fontSize: 72 }} className="text-white/20" />
                                            </span>
                                        )}

                                        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0a0c1a] via-[#0a0c1a]/60 to-transparent" />

                                        <span className="absolute left-4 top-4 flex h-8 items-center rounded-lg bg-black/35 px-2.5 text-[10px] font-black tabular-nums tracking-[0.18em] text-white/80 backdrop-blur-md">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>

                                        <h2 className="absolute inset-x-0 bottom-0 p-5 text-[17px] font-black leading-tight tracking-tight text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                                            {doctor.full_name}
                                        </h2>
                                    </div>

                                    {doctor.description && (
                                        <div className="flex flex-1 flex-col p-5">
                                            <span className="mb-3 block h-px w-10 bg-gradient-to-r from-[#ee7c7e] to-transparent" />
                                            <p className="text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                                                {doctor.description}
                                            </p>
                                        </div>
                                    )}
                                </motion.article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
