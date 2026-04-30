"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

export default function ViceRectorPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.viceRector;

    const aboutHref = lang === "az" ? "/haqqimizda" : "/about";
    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";
    const detailBase = lang === "az"
        ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor"
        : "/about/leadership-and-management/vice-rector";

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={p.title}
                eyebrow={p.eyebrow}
                description={p.subtitle}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: aboutHref },
                    { label: leadershipLabel, href: leadershipHref },
                    { label: p.breadcrumb },
                ]}
            >
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                        <GroupsIcon className="text-[#ee7c7e] mb-3" sx={{ fontSize: 28 }} />
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                            {lang === "az" ? "Prorektor sayı" : "Vice-Rectors"}
                        </p>
                        <p className="text-sm font-bold text-white">{p.viceRectors.length}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                        <SchoolIcon className="text-[#ee7c7e] mb-3" sx={{ fontSize: 28 }} />
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                            {lang === "az" ? "Sahə" : "Domains"}
                        </p>
                        <p className="text-sm font-bold text-white">
                            {lang === "az" ? "Akademik · Elm · Beynəlxalq · Maliyyə" : "Academic · Science · International · Finance"}
                        </p>
                    </div>
                </div>
            </PageHero>

            <PageContainer className="space-y-24">
                {/* OVERVIEW */}
                <section>
                    <div className="max-w-4xl mx-auto text-center mb-14">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#1a2355] dark:text-white mb-6 tracking-tighter">
                            {lang === "az" ? "İcraçı Rəhbərlik" : "Executive Leadership"}
                        </h2>
                        <div className="h-1.5 w-24 bg-[#ee7c7e] mx-auto rounded-full mb-8" />
                        <p className="text-base lg:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                            {p.overviewText}
                        </p>
                    </div>
                </section>

                {/* CARDS */}
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {p.viceRectors.map((vr, i) => (
                            <motion.div
                                key={vr.slug}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <Link
                                    href={`${detailBase}/${vr.slug}`}
                                    className="group relative flex flex-col h-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/20 dark:border-white/10 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#ee7c7e] hover:shadow-2xl hover:shadow-[#1a2355]/20 overflow-hidden"
                                >
                                    {/* Decorative blur */}
                                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ee7c7e]/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#1a2355]/5 blur-3xl rounded-full group-hover:bg-[#ee7c7e]/10 transition-colors duration-700" />

                                    {/* Avatar */}
                                    <div className="relative z-10 flex items-center justify-center mb-5">
                                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#1a2355] to-[#0f172a] border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden group-hover:border-[#ee7c7e]/40 transition-colors duration-500">
                                            {vr.photoUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={vr.photoUrl}
                                                    alt={vr.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <PersonIcon sx={{ fontSize: 64, color: "white", opacity: 0.4 }} />
                                            )}
                                            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#ee7c7e] border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                                                <SchoolIcon sx={{ fontSize: 14, color: "white" }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name & degree */}
                                    <div className="relative z-10 text-center mb-4">
                                        <h3 className="text-base lg:text-lg font-black text-[#1a2355] dark:text-white leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {vr.name}
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-wider text-[#ee7c7e] font-black mt-2 bg-[#ee7c7e]/10 px-3 py-1 rounded-full inline-block">
                                            {vr.degree}
                                        </p>
                                    </div>

                                    {/* Title */}
                                    <div className="relative z-10 text-center mb-5 px-2">
                                        <p className="text-sm font-bold text-[#1a2355]/80 dark:text-slate-200 leading-snug">
                                            {vr.title}
                                        </p>
                                    </div>

                                    {/* Contact */}
                                    <div className="relative z-10 mt-auto pt-4 border-t border-[#1a2355]/10 dark:border-white/10 space-y-2">
                                        {vr.email && (
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-slate-300">
                                                <EmailIcon sx={{ fontSize: 14, color: "#ee7c7e" }} />
                                                <span className="truncate">{vr.email}</span>
                                            </div>
                                        )}
                                        {vr.phone && (
                                            <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-slate-300">
                                                <LocalPhoneIcon sx={{ fontSize: 14, color: "#ee7c7e" }} />
                                                <span>{vr.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <div className="relative z-10 mt-5 flex items-center justify-between rounded-xl bg-[#1a2355]/5 dark:bg-white/5 px-4 py-2.5 group-hover:bg-[#ee7c7e] transition-colors duration-300">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-[#1a2355] dark:text-white group-hover:text-white transition-colors">
                                            {p.cardCta}
                                        </span>
                                        <ChevronRightIcon sx={{ fontSize: 16 }} className="text-[#1a2355] dark:text-white group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* RELATED */}
                <section className="pt-16 border-t border-[#1a2355]/20 dark:border-white/10">
                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4">
                        <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group relative flex items-center justify-between bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-[#1a2355]/30 dark:border-[#1a2355]/30 hover:border-[#ee7c7e]/40 dark:hover:border-[#ee7c7e]/50 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/5 via-transparent to-[#1a2355]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative text-[#1a2355] dark:text-white font-black text-base group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="relative w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300 border border-[#1a2355]/30 dark:border-white/5">
                                    <ChevronRightIcon sx={{ fontSize: 24 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </PageContainer>
        </main>
    );
}
