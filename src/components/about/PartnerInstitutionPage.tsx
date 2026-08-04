"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import LaunchIcon from "@mui/icons-material/Launch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutPage } from "@/types/about";

/**
 * One "Tərəfdaş Universitet və Əlaqəli İnstitutlar" page, driven entirely by the
 * About CMS (template "partner-institution"). Only the hero video is static;
 * the logo, About text, director, research areas and links come from the CMS.
 */
export default function PartnerInstitutionPage({ pageKey }: { pageKey: string }) {
    const { lang } = useLanguage();
    const az = lang === "az";

    const [page, setPage] = useState<AboutPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getAboutPage(pageKey, lang).then((result) => {
            if (!cancelled) {
                setPage(result);
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [pageKey, lang]);

    const aboutHref = az ? "/haqqimizda" : "/about";
    const partnerLabel = az
        ? "Tərəfdaş Universitet və Əlaqəli İnstitutlar"
        : "Partner Universities and Related Institutes";
    const partnerHref = az
        ? "/haqqimizda/terefdas-universitet-ve-elaqeli-institutlar"
        : "/about/partner-universities-and-related-institutes";
    const eyebrow = az ? "Bağlı Qurum" : "Related Institution";

    // ── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <main className="min-h-screen bg-page">
                <PageHero
                    title={partnerLabel}
                    eyebrow={eyebrow}
                    breadcrumbs={[{ label: az ? "Haqqımızda" : "About", href: aboutHref }, { label: partnerLabel }]}
                />
                <div className="mx-auto flex max-w-[1400px] justify-center px-4 py-32">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#ee7c7e] border-t-transparent" />
                </div>
            </main>
        );
    }

    // ── Not published yet ──────────────────────────────────────────────────────
    if (!page) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-page px-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1a2355] text-white shadow-2xl">
                    <AccountBalanceIcon sx={{ fontSize: 40 }} />
                </div>
                <h1 className="mt-8 text-center text-3xl font-black text-[#1a2355] dark:text-white">
                    {az ? "Səhifə hazırlanır" : "Page is being prepared"}
                </h1>
                <p className="mt-3 max-w-md text-center text-slate-500 dark:text-slate-400">
                    {az
                        ? "Bu qurumun məlumatları tezliklə əlavə olunacaq."
                        : "This institution's details will be added soon."}
                </p>
                <Link
                    href={partnerHref}
                    className="mt-8 inline-flex items-center gap-1.5 rounded-2xl bg-[#1a2355] px-7 py-3.5 font-bold text-white transition-colors hover:bg-[#1a2355]/90"
                >
                    {partnerLabel}
                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                </Link>
            </main>
        );
    }

    // ── Loaded ─────────────────────────────────────────────────────────────────
    const title = page.title || partnerLabel;
    const logo = page.image_url ? getImageUrl(page.image_url) : "";
    const aboutTitle = page.section_title || (az ? "Haqqında" : "About");
    const aboutBodyHtml = page.section_body;
    const websiteUrl = (page.document_url || "").trim();
    const websiteHref = websiteUrl
        ? websiteUrl.startsWith("http")
            ? websiteUrl
            : `https://${websiteUrl}`
        : "";
    const websiteLabel = page.document_label || (az ? "Vebsayta keç" : "Visit website");

    const director = page.persons?.[0];
    const directorName = director ? [director.name, director.surname].filter(Boolean).join(" ") : "";
    const directorImage = director?.image_url ? getImageUrl(director.image_url) : "";

    const researchAreas = (page.pillars ?? []).filter((p) => p.title || p.description);
    const links = (page.links ?? []).filter((l) => l.label || l.url);
    const researchTitle = page.pillars_title || (az ? "Tədqiqat sahələri" : "Research Areas");
    const linksTitle = page.links_title || (az ? "Bölmədə daha çox" : "More in this section");

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/25">
            <PageHero
                title={title}
                eyebrow={eyebrow}
                breadcrumbs={[
                    { label: az ? "Haqqımızda" : "About", href: aboutHref },
                    { label: partnerLabel, href: partnerHref },
                    { label: title },
                ]}
            >
                {page.description ? (
                    <SanitizedHtml
                        html={page.description}
                        className="prose prose-invert mt-4 max-w-2xl text-base leading-relaxed [&_p]:text-white/80"
                    />
                ) : null}
            </PageHero>

            <PageContainer className="space-y-16">
                {/* ── ABOUT ─────────────────────────────────────────────────── */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Logo + website button */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#0f1836]">
                            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ee7c7e]/10 blur-3xl" />
                            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/[0.03] dark:to-white/[0.06]">
                                {logo ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={logo} alt={title} className="h-full w-full object-contain p-6" />
                                ) : (
                                    <AccountBalanceIcon sx={{ fontSize: 88 }} className="text-[#1a2355]/20 dark:text-white/15" />
                                )}
                            </div>
                            {websiteHref ? (
                                <a
                                    href={websiteHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1a2355] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1a2355]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee7c7e] hover:shadow-[#ee7c7e]/30"
                                >
                                    {websiteLabel}
                                    <LaunchIcon sx={{ fontSize: 17 }} className="transition-transform group-hover:translate-x-0.5" />
                                </a>
                            ) : null}
                        </div>
                    </motion.div>

                    {/* About heading + text */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="lg:col-span-8"
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-9 w-1.5 rounded-full bg-[#ee7c7e]" />
                            <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-3xl">
                                {aboutTitle}
                            </h2>
                        </div>
                        {aboutBodyHtml ? (
                            <SanitizedHtml
                                html={aboutBodyHtml}
                                className="prose prose-slate max-w-none leading-relaxed dark:prose-invert md:prose-lg [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                            />
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400">
                                {az ? "Məlumat tezliklə əlavə olunacaq." : "Details will be added soon."}
                            </p>
                        )}
                    </motion.div>
                </section>

                {/* ── DIRECTOR ──────────────────────────────────────────────── */}
                {director && (directorName || directorImage) ? (
                    <section>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-8 w-1.5 rounded-full bg-[#ee7c7e]" />
                            <h2 className="text-xl font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                                {director.position || (az ? "Rektor / Direktor" : "Rector / Director")}
                            </h2>
                        </div>
                        <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0f1836] sm:flex-row sm:p-8">
                            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#0b1330]">
                                {directorImage ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={directorImage} alt={directorName} className="h-full w-full object-cover object-top" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <PersonIcon sx={{ fontSize: 48, color: "white", opacity: 0.3 }} />
                                    </div>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-2xl font-black text-[#1a2355] dark:text-white">{directorName}</h3>
                                {director.degree ? (
                                    <p className="mt-1.5 font-medium text-[#ee7c7e]">{director.degree}</p>
                                ) : null}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* ── RESEARCH AREAS ────────────────────────────────────────── */}
                {researchAreas.length > 0 && (
                    <section>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-8 w-1.5 rounded-full bg-[#ee7c7e]" />
                            <h2 className="text-xl font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                                {researchTitle}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {researchAreas.map((area, i) => (
                                <motion.div
                                    key={`${area.title}-${i}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
                                    className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/40 hover:shadow-md dark:border-white/10 dark:bg-[#0f1836]"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a2355]/5 text-[#1a2355] transition-colors group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] dark:bg-white/5 dark:text-white">
                                        <ScienceIcon sx={{ fontSize: 22 }} />
                                    </div>
                                    {area.title ? (
                                        <h3 className="text-lg font-black text-[#1a2355] dark:text-white">{area.title}</h3>
                                    ) : null}
                                    {area.description ? (
                                        <SanitizedHtml
                                            html={area.description}
                                            className="prose prose-slate mt-2 max-w-none text-sm leading-relaxed dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                                        />
                                    ) : null}
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── MORE IN THIS SECTION ──────────────────────────────────── */}
                {links.length > 0 && (
                    <section className="border-t border-slate-200 pt-10 dark:border-white/10">
                        <h2 className="mb-6 flex items-center gap-2.5 text-sm font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                            <span className="h-5 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {linksTitle}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {links.map((link, i) => (
                                <Link
                                    key={`${link.url}-${i}`}
                                    href={link.url || "#"}
                                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/50 hover:shadow-md dark:border-white/10 dark:bg-[#0f1836]"
                                >
                                    <span className="text-sm font-bold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {link.label}
                                    </span>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1a2355] transition-all duration-300 group-hover:bg-[#1a2355] group-hover:text-white dark:bg-white/10 dark:text-white">
                                        <ChevronRightIcon sx={{ fontSize: 18 }} className="transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </PageContainer>
        </main>
    );
}
