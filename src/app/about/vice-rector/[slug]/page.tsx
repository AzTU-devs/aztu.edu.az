"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

export default function ViceRectorDetailPage() {
    const params = useParams();
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.viceRector;

    const aboutHref = lang === "az" ? "/haqqimizda" : "/about";
    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";
    const listHref = lang === "az"
        ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor"
        : "/about/leadership-and-management/vice-rector";

    const vr = p.viceRectors.find((v) => v.slug === slug);
    const others = p.viceRectors.filter((v) => v.slug !== slug);

    if (!vr) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold text-[#1a2355] dark:text-white mb-4">
                    {lang === "az" ? "Səhifə tapılmadı" : "Page not found"}
                </h1>
                <p className="text-gray-500 dark:text-slate-400 mb-8">
                    {lang === "az" ? "Axtardığınız prorektor mövcud deyil." : "The vice-rector you are looking for does not exist."}
                </p>
                <Link
                    href={listHref}
                    className="flex items-center gap-2 bg-[#1a2355] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#ee7c7e] transition-colors"
                >
                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                    {p.backToList}
                </Link>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">

            <PageHero
                title={vr.name}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: aboutHref },
                    { label: leadershipLabel, href: leadershipHref },
                    { label: p.breadcrumb, href: listHref },
                    { label: vr.name },
                ]}
            >
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <p className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#ee7c7e] font-black bg-[#ee7c7e]/10 border border-[#ee7c7e]/30 px-4 py-2 rounded-full mb-6">
                            {vr.degree}
                        </p>
                        <p className="text-lg lg:text-xl text-white/80 font-bold mb-10 max-w-2xl leading-relaxed">
                            {vr.title}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {vr.email && (
                                <a
                                    href={`mailto:${vr.email}`}
                                    className="flex items-center gap-3 px-6 py-3.5 bg-white text-[#1a2355] rounded-2xl font-black text-sm hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    <EmailIcon sx={{ fontSize: 18 }} />
                                    {vr.email}
                                </a>
                            )}
                            {vr.phone && (
                                <a
                                    href={`tel:${vr.phone.replace(/\s+/g, "")}`}
                                    className="flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all duration-300"
                                >
                                    <LocalPhoneIcon sx={{ fontSize: 18 }} />
                                    {vr.phone}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square max-w-md mx-auto"
                        >
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#ee7c7e] rounded-tl-3xl z-20" />
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#ee7c7e] rounded-br-3xl z-20" />
                            <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-2xl z-10 border border-white/10 bg-gradient-to-br from-[#1a2355] to-[#0f172a] flex items-center justify-center">
                                {vr.photoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={vr.photoUrl}
                                        alt={vr.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <PersonIcon sx={{ fontSize: 220, color: "white", opacity: 0.25 }} />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </PageHero>

            <PageContainer className="space-y-24">
                {/* BIOGRAPHY */}
                <section>
                    <div className="max-w-4xl mx-auto text-center mb-14">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#1a2355] dark:text-white mb-6 tracking-tighter">
                            {p.biographyTitle}
                        </h2>
                        <div className="h-1.5 w-24 bg-[#ee7c7e] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8 space-y-5">
                            {vr.biography.map((para, i) => (
                                <p
                                    key={i}
                                    className="text-base lg:text-lg text-gray-600 dark:text-slate-300 text-justify leading-relaxed"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[14px] border-2 border-[#1a2355]/30 dark:border-white/10 shadow-xl relative overflow-hidden">
                                <FormatQuoteIcon className="absolute -top-6 -left-6 text-[#ee7c7e]/20" sx={{ fontSize: 100 }} />
                                <h3 className="text-base font-black text-[#1a2355] dark:text-white mb-6 relative z-10 flex items-center gap-3">
                                    <WorkspacePremiumIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />
                                    {lang === "az" ? "Akademik dərəcə" : "Academic Degree"}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-slate-300 font-medium relative z-10 leading-relaxed">
                                    {vr.degree}
                                </p>
                            </div>

                            <div className="bg-[#1a2355] p-8 rounded-[14px] text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <h3 className="text-base font-black text-white mb-6 relative z-10 flex items-center gap-3">
                                    <SchoolIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />
                                    {p.contactTitle}
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    {vr.email && (
                                        <a
                                            href={`mailto:${vr.email}`}
                                            className="flex items-center gap-3 text-sm text-white/80 hover:text-[#ee7c7e] transition-colors group"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] transition-colors">
                                                <EmailIcon sx={{ fontSize: 16 }} />
                                            </div>
                                            <span className="break-all">{vr.email}</span>
                                        </a>
                                    )}
                                    {vr.phone && (
                                        <a
                                            href={`tel:${vr.phone.replace(/\s+/g, "")}`}
                                            className="flex items-center gap-3 text-sm text-white/80 hover:text-[#ee7c7e] transition-colors group"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] transition-colors">
                                                <LocalPhoneIcon sx={{ fontSize: 16 }} />
                                            </div>
                                            <span>{vr.phone}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OTHER VICE-RECTORS */}
                {others.length > 0 && (
                    <section className="pt-16 border-t border-[#1a2355]/20 dark:border-white/10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white flex items-center gap-4">
                                <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                                {lang === "az" ? "Digər prorektorlar" : "Other Vice-Rectors"}
                            </h2>
                            <Link
                                href={listHref}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10 text-[#1a2355] dark:text-white text-sm font-bold hover:bg-[#1a2355] hover:text-white transition-colors"
                            >
                                <ArrowBackIcon sx={{ fontSize: 16 }} />
                                {p.backToList}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {others.map((o) => (
                                <Link
                                    key={o.slug}
                                    href={`${listHref}/${o.slug}`}
                                    className="group relative flex items-center gap-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/20 dark:border-white/10 p-5 hover:border-[#ee7c7e] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a2355] to-[#0f172a] flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-800 shadow-md group-hover:border-[#ee7c7e]/40 transition-colors">
                                        {o.photoUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={o.photoUrl}
                                                alt={o.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <PersonIcon sx={{ fontSize: 30, color: "white", opacity: 0.5 }} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-[#1a2355] dark:text-white truncate group-hover:text-[#ee7c7e] transition-colors">
                                            {o.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5">
                                            {o.title}
                                        </p>
                                    </div>
                                    <ChevronRightIcon sx={{ fontSize: 18 }} className="text-[#1a2355]/40 dark:text-white/40 group-hover:text-[#ee7c7e] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </PageContainer>
        </main>
    );
}
