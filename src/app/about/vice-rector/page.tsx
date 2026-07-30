"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutPage } from "@/types/about";

const PAGE_KEY = "vice-rector";

interface PersonView {
    index: number;
    name: string;
    degree: string;
    position: string;
    email: string;
    phone: string;
    image: string;
}

interface LinkView {
    label: string;
    url: string;
}

export default function ViceRectorPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.viceRector;

    const [page, setPage] = useState<AboutPage | null>(null);

    useEffect(() => {
        let cancelled = false;
        getAboutPage(PAGE_KEY, lang).then((result) => {
            if (!cancelled) setPage(result);
        });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const aboutHref = lang === "az" ? "/haqqimizda" : "/about";
    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";
    // Profiles are addressed by position (1-based) — persons carry no slug.
    const detailBase = lang === "az"
        ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor"
        : "/about/leadership-and-management/vice-rector";

    // The CMS is the source of truth once published; the page chrome (eyebrow,
    // breadcrumb, the "see profile" label) stays static because it is not edited
    // in the dashboard.
    const title = page?.title || p.title;
    const heroDescriptionHtml = page?.description ?? `<p>${p.subtitle}</p>`;
    const sectionTitle =
        page?.section_title || (lang === "az" ? "İcraçı Rəhbərlik" : "Executive Leadership");
    const sectionBodyHtml = page?.section_body ?? `<p>${p.overviewText}</p>`;
    const domains =
        page?.domains ||
        (lang === "az"
            ? "Akademik · Elm · Beynəlxalq · Maliyyə"
            : "Academic · Science · International · Finance");
    const linksTitle = page?.links_title || t.common.moreInSection;

    const persons: PersonView[] = (page?.persons ?? []).map((person, index) => ({
        index: index + 1,
        name: person.name ?? "",
        degree: person.degree ?? "",
        position: person.position ?? "",
        email: person.email ?? "",
        phone: person.phone ?? "",
        image: person.image_url ? getImageUrl(person.image_url) : "",
    }));

    const links: LinkView[] = (page?.links ?? []).map((link) => ({
        label: link.label ?? "",
        url: link.url ?? "#",
    }));

    return (
        <main className="min-h-screen bg-[#f7f8fb] dark:bg-[#0b1120] selection:bg-[#ee7c7e]/25">
            <PageHero
                title={title}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: aboutHref },
                    { label: leadershipLabel, href: leadershipHref },
                    { label: p.breadcrumb },
                ]}
            >
                <SanitizedHtml
                    html={heroDescriptionHtml}
                    className="prose prose-invert mt-4 max-w-2xl text-base leading-relaxed [&_p]:text-white/75"
                />

                <div className="mt-8 flex flex-wrap gap-3">
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                        <GroupsIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                                {lang === "az" ? "Prorektor sayı" : "Vice-Rectors"}
                            </p>
                            <p className="text-sm font-bold text-white">{persons.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                        <WorkspacesIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/45">
                                {lang === "az" ? "Sahələr" : "Domains"}
                            </p>
                            <p className="text-sm font-bold text-white">{domains}</p>
                        </div>
                    </div>
                </div>
            </PageHero>

            <PageContainer className="space-y-16">
                {/* EXECUTIVE LEADERSHIP */}
                <section className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-3xl">
                        {sectionTitle}
                    </h2>
                    <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#ee7c7e]" />
                    <SanitizedHtml
                        html={sectionBodyHtml}
                        className="prose prose-slate mx-auto mt-5 max-w-none dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                    />
                </section>

                {/* PERSON CARDS */}
                {persons.length > 0 && (
                    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {persons.map((person, i) => (
                            <motion.div
                                key={person.index}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                            >
                                <Link
                                    href={`${detailBase}/${person.index}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1a2355]/10 dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    {/* Portrait band — a soft navy field so a photo, or its
                                        absence, reads consistently. */}
                                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-[#1a2355] to-[#0f172a]">
                                        {person.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <PersonIcon sx={{ fontSize: 72, color: "white", opacity: 0.25 }} />
                                            </div>
                                        )}
                                        {person.degree ? (
                                            <span className="absolute bottom-3 left-3 rounded-md bg-black/35 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                                                {person.degree}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="text-base font-black leading-snug text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                            {person.name}
                                        </h3>
                                        <p className="mt-1.5 text-sm font-medium leading-snug text-slate-500 dark:text-slate-400">
                                            {person.position}
                                        </p>

                                        <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                                            {person.email ? (
                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <EmailIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                                    <span className="truncate">{person.email}</span>
                                                </div>
                                            ) : null}
                                            {person.phone ? (
                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <LocalPhoneIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                                    <span>{person.phone}</span>
                                                </div>
                                            ) : null}
                                        </div>

                                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                            {p.cardCta}
                                            <ArrowForwardIcon
                                                sx={{ fontSize: 15 }}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </section>
                )}

                {/* MORE IN THIS SECTION */}
                {links.length > 0 && (
                    <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
                        <h2 className="mb-6 flex items-center gap-2.5 text-sm font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                            <span className="h-5 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {linksTitle}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {links.map((link, index) => (
                                <Link
                                    key={`${link.url}-${index}`}
                                    href={link.url}
                                    className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60"
                                >
                                    <span className="text-sm font-bold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {link.label}
                                    </span>
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#1a2355] transition-all duration-300 group-hover:bg-[#1a2355] group-hover:text-white dark:bg-slate-800 dark:text-white">
                                        <ChevronRightIcon sx={{ fontSize: 17 }} className="transition-transform group-hover:translate-x-0.5" />
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
