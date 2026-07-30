"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutPage } from "@/types/about";

const PAGE_KEY = "vice-rector";

export default function ViceRectorDetailPage() {
    const params = useParams();
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.viceRector;

    const [page, setPage] = useState<AboutPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getAboutPage(PAGE_KEY, lang).then((result) => {
            if (!cancelled) {
                setPage(result);
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const aboutHref = lang === "az" ? "/haqqimizda" : "/about";
    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";
    const listHref = lang === "az"
        ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor"
        : "/about/leadership-and-management/vice-rector";

    // Profiles are addressed by 1-based position.
    const persons = page?.persons ?? [];
    const position = Number(slug);
    const vr =
        Number.isInteger(position) && position >= 1 && position <= persons.length
            ? persons[position - 1]
            : undefined;
    const others = persons
        .map((person, index) => ({ person, index: index + 1 }))
        .filter((entry) => entry.index !== position);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] dark:bg-[#0b1120]">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#ee7c7e] border-t-transparent" />
            </main>
        );
    }

    if (!vr) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-4 dark:bg-[#0b1120]">
                <h1 className="mb-3 text-2xl font-black text-[#1a2355] dark:text-white">
                    {lang === "az" ? "Səhifə tapılmadı" : "Page not found"}
                </h1>
                <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
                    {lang === "az" ? "Axtardığınız prorektor mövcud deyil." : "The vice-rector you are looking for does not exist."}
                </p>
                <Link
                    href={listHref}
                    className="flex items-center gap-2 rounded-xl bg-[#1a2355] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ee7c7e]"
                >
                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                    {p.backToList}
                </Link>
            </main>
        );
    }

    const name = vr.name ?? "";
    const degree = vr.degree ?? "";
    const councilPosition = vr.position ?? "";
    const email = vr.email ?? "";
    const phone = vr.phone ?? "";
    const portrait = vr.image_url ? getImageUrl(vr.image_url) : "";
    const bioHtml = vr.bio ?? "";

    return (
        <main className="min-h-screen bg-[#f7f8fb] dark:bg-[#0b1120] selection:bg-[#ee7c7e]/25">
            <PageHero
                title={name}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: aboutHref },
                    { label: leadershipLabel, href: leadershipHref },
                    { label: p.breadcrumb, href: listHref },
                    { label: name },
                ]}
            >
                <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                    <div className="order-2 lg:order-1 lg:col-span-7">
                        {degree ? (
                            <p className="mb-5 inline-block rounded-full border border-[#ee7c7e]/30 bg-[#ee7c7e]/10 px-3.5 py-1.5 text-[11px] font-semibold text-[#ee7c7e]">
                                {degree}
                            </p>
                        ) : null}
                        <p className="mb-8 max-w-2xl text-lg font-bold leading-relaxed text-white/80 lg:text-xl">
                            {councilPosition}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {email ? (
                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1a2355] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee7c7e] hover:text-white"
                                >
                                    <EmailIcon sx={{ fontSize: 17 }} />
                                    {email}
                                </a>
                            ) : null}
                            {phone ? (
                                <a
                                    href={`tel:${phone.replace(/\s+/g, "")}`}
                                    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/[0.12]"
                                >
                                    <LocalPhoneIcon sx={{ fontSize: 17 }} />
                                    {phone}
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative mx-auto aspect-[4/5] max-w-sm"
                        >
                            <span className="absolute -left-3 -top-3 z-20 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-[#ee7c7e]" />
                            <span className="absolute -bottom-3 -right-3 z-20 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-[#ee7c7e]" />
                            <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a2355] to-[#0f172a] shadow-2xl">
                                {portrait ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={portrait}
                                        alt={name}
                                        className="h-full w-full object-cover object-top"
                                    />
                                ) : (
                                    <PersonIcon sx={{ fontSize: 180, color: "white", opacity: 0.2 }} />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </PageHero>

            <PageContainer className="space-y-16">
                {/* BIOGRAPHY */}
                <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <h2 className="mb-6 flex items-center gap-2.5 text-xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-2xl">
                            <span className="h-6 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {p.biographyTitle}
                        </h2>
                        <SanitizedHtml
                            html={bioHtml}
                            className="prose prose-slate max-w-none dark:prose-invert [&_p]:text-justify [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                        />
                    </div>

                    <div className="space-y-5 lg:col-span-4 lg:sticky lg:top-28">
                        {degree ? (
                            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                                <h3 className="mb-3 flex items-center gap-2.5 text-sm font-black text-[#1a2355] dark:text-white">
                                    <WorkspacePremiumIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                                    {lang === "az" ? "Akademik dərəcə" : "Academic Degree"}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    {degree}
                                </p>
                            </div>
                        ) : null}

                        {(email || phone) ? (
                            <div className="relative overflow-hidden rounded-2xl bg-[#1a2355] p-6 text-white shadow-lg shadow-[#1a2355]/20 dark:bg-slate-900">
                                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ee7c7e]/15 blur-2xl" />
                                <h3 className="relative z-10 mb-4 text-sm font-black">{p.contactTitle}</h3>
                                <div className="relative z-10 space-y-3">
                                    {email ? (
                                        <a
                                            href={`mailto:${email}`}
                                            className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-[#ee7c7e]"
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-[#ee7c7e]">
                                                <EmailIcon sx={{ fontSize: 15 }} />
                                            </span>
                                            <span className="break-all">{email}</span>
                                        </a>
                                    ) : null}
                                    {phone ? (
                                        <a
                                            href={`tel:${phone.replace(/\s+/g, "")}`}
                                            className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-[#ee7c7e]"
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-[#ee7c7e]">
                                                <LocalPhoneIcon sx={{ fontSize: 15 }} />
                                            </span>
                                            <span>{phone}</span>
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </section>

                {/* OTHER VICE-RECTORS */}
                {others.length > 0 && (
                    <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
                        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <h2 className="flex items-center gap-2.5 text-sm font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                                <span className="h-5 w-1.5 rounded-full bg-[#ee7c7e]" />
                                {lang === "az" ? "Digər prorektorlar" : "Other Vice-Rectors"}
                            </h2>
                            <Link
                                href={listHref}
                                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#1a2355] transition-colors hover:bg-[#1a2355] hover:text-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-white"
                            >
                                <ArrowBackIcon sx={{ fontSize: 15 }} />
                                {p.backToList}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {others.map(({ person, index }) => {
                                const img = person.image_url ? getImageUrl(person.image_url) : "";
                                return (
                                    <Link
                                        key={index}
                                        href={`${listHref}/${index}`}
                                        className="group flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60"
                                    >
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#1a2355] to-[#0f172a]">
                                            {img ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={img} alt={person.name ?? ""} className="h-full w-full object-cover" />
                                            ) : (
                                                <PersonIcon sx={{ fontSize: 24, color: "white", opacity: 0.5 }} />
                                            )}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-black text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                                {person.name}
                                            </p>
                                            <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                                {person.position}
                                            </p>
                                        </div>
                                        <ChevronRightIcon
                                            sx={{ fontSize: 17 }}
                                            className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#ee7c7e] dark:text-slate-600"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </PageContainer>
        </main>
    );
}
