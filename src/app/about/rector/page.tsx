"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutPage } from "@/types/about";

import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

const PAGE_KEY = "rector";

/**
 * Horizontal auto-scrolling gallery strip. The images are remote CMS URLs, so a
 * plain <img> is used rather than next/image (which would need every upstream
 * host whitelisted in next.config). The list is tripled for a seamless loop.
 */
function ContinuousGallery({ items }: { items: string[] }) {
    if (items.length === 0) return null;
    const loop = [...items, ...items, ...items];

    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent dark:from-[#0f172a]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent dark:from-[#0f172a]" />

            <motion.div
                className="flex w-max gap-5"
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
                {loop.map((src, index) => (
                    <div
                        key={index}
                        className="group relative aspect-[4/3] w-72 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm dark:border-slate-700/60"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

interface StatView {
    icon: typeof SchoolIcon;
    label: string;
    value: string;
}

export default function RectorPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.rector;

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

    // The CMS is the source of truth once published; until then the built-in
    // copy keeps the page complete rather than blank.
    const name = page?.title || p.title;
    const portrait = page?.image_url ? getImageUrl(page.image_url) : "/vilayet_veliyev.jpg";
    const degree = page?.degree || (lang === "az" ? "Texniki elmlər" : "Technical Sciences");
    const position = page?.position || "Professor";
    const experience = page?.experience || "30+ Years";
    const email = page?.email || "rector@aztu.edu.az";

    const messageHtml = page?.message || `<p>${(p.message ?? []).join("</p><p>")}</p>`;
    const messageTitle = p.messageTitle;
    const aboutHtml = page?.about || `<p>${(p.aboutRector ?? []).join("</p><p>")}</p>`;
    const aboutTitle = p.aboutRectorTitle;

    const officesList = page?.lists?.find((entry) => entry.list_key === "offices");
    const offices: string[] = officesList?.items ?? (p.departments ?? []);
    const officesTitle = officesList?.title || p.departmentsTitle;

    const gallery: string[] = page?.images?.length
        ? page.images.map((image) => getImageUrl(image.image_url))
        : (p.galleryItems ?? []).map((item: { image: string }) => item.image);

    const linksTitle = page?.links_title || t.common.moreInSection;
    const links = page?.links?.length
        ? page.links.map((link) => ({ label: link.label ?? "", url: link.url ?? "#" }))
        : (p.related ?? []).map((link: { title: string; href: string }) => ({
              label: link.title,
              url: link.href,
          }));

    const stats: StatView[] = [
        { icon: SchoolIcon, label: lang === "az" ? "Elmi dərəcə" : "Degree", value: degree },
        { icon: WorkspacePremiumIcon, label: lang === "az" ? "Vəzifə" : "Title", value: position },
        { icon: HistoryEduIcon, label: lang === "az" ? "Təcrübə" : "Experience", value: experience },
    ];

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            <PageHero
                title={name}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: aboutHref },
                    { label: p.breadcrumb },
                ]}
            />

            <PageContainer className="space-y-16">
                {/* PROFILE — portrait, name, degree/title, contact and the three stats. */}
                <section className="-mt-24 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4"
                    >
                        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-slate-700/60 dark:bg-slate-800/50">
                            <div className="relative aspect-[4/5] w-full bg-slate-100 dark:bg-slate-800">
                                {portrait ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={portrait}
                                        alt={name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                                        <PersonIcon sx={{ fontSize: 88 }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="flex flex-col justify-center lg:col-span-8"
                    >
                        <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-3xl">
                            {name}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-[#ee7c7e]">
                            {degree}
                            {position ? ` · ${position}` : ""}
                        </p>

                        <a
                            href={`mailto:${email}`}
                            className="mt-3 inline-flex w-fit items-center gap-2 text-sm text-slate-600 transition-colors hover:text-[#ee7c7e] dark:text-slate-300"
                        >
                            <EmailIcon sx={{ fontSize: 16 }} />
                            {email}
                        </a>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ee7c7e]/10 text-[#ee7c7e]">
                                        <stat.icon sx={{ fontSize: 17 }} />
                                    </span>
                                    <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm font-bold text-[#1a2355] dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* MESSAGE */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50 md:p-8 lg:p-10">
                    <h2 className="mb-5 flex items-center gap-2.5 text-lg font-black tracking-tight text-[#1a2355] dark:text-white">
                        <span className="h-6 w-1.5 rounded-full bg-[#ee7c7e]" />
                        {messageTitle}
                    </h2>
                    <SanitizedHtml
                        html={messageHtml}
                        className="prose prose-slate max-w-none dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                    />
                </section>

                {/* ABOUT THE RECTOR */}
                <section className="rounded-2xl bg-[#1a2355] p-6 shadow-lg shadow-[#1a2355]/20 dark:bg-slate-900 md:p-8 lg:p-10">
                    <h2 className="mb-5 flex items-center gap-2.5 text-lg font-black tracking-tight text-white">
                        <span className="h-6 w-1.5 rounded-full bg-[#ee7c7e]" />
                        {aboutTitle}
                    </h2>
                    <SanitizedHtml
                        html={aboutHtml}
                        className="prose prose-invert max-w-none [&_p]:text-white/85"
                    />
                </section>

                {/* OFFICES REPORTING TO THE RECTOR */}
                {offices.length > 0 && (
                    <section>
                        <h2 className="mb-5 flex items-center gap-2.5 text-lg font-black tracking-tight text-[#1a2355] dark:text-white">
                            <span className="h-6 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {officesTitle}
                        </h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {offices.map((office, index) => (
                                <div
                                    key={`${office}-${index}`}
                                    className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#ee7c7e]/10 text-xs font-black text-[#ee7c7e]">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {office}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* GALLERY */}
                {gallery.length > 0 && (
                    <section>
                        <h2 className="mb-1 flex items-center gap-2.5 text-lg font-black tracking-tight text-[#1a2355] dark:text-white">
                            <span className="h-6 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {p.galleryTitle}
                        </h2>
                        <ContinuousGallery items={gallery} />
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
                                    className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/50 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    <span className="text-sm font-bold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {link.label}
                                    </span>
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#1a2355] transition-all duration-300 group-hover:bg-[#1a2355] group-hover:text-white dark:bg-slate-700 dark:text-white">
                                        <ChevronRightIcon
                                            sx={{ fontSize: 17 }}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
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
