"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import ComingSoon from "@/components/shared/ComingSoon";
import { getHeaderMenu, type MenuItem, type SubItem } from "@/services/menu/menuService";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
    /** Slug of the top-level menu section this hub belongs to, e.g. "internationalization". */
    sectionSlug: string;
    /** Slugs that identify this hub inside that section — AZ and EN both accepted. */
    hubSlugs: string[];
    /** Shown while the menu is still being fetched and if it never resolves. */
    fallbackTitle: { az: string; en: string };
    /** Crumb for the parent section. */
    parent: { label: { az: string; en: string }; href: { az: string; en: string } };
};

/**
 * Landing page for a navigation hub — a menu entry that has children but no page
 * of its own.
 *
 * Several of these hubs are linked directly from the main menu (the whole
 * Internationalization section, four Research sub-sections) but were never given
 * a route, so clicking them from the menu produced a 404. Rather than inventing
 * content for them, this lists the hub's own children, taken from the same
 * published menu the header is built from — so it can never drift out of step
 * with the navigation, and it introduces no new content of its own.
 */
export default function SectionHub({ sectionSlug, hubSlugs, fallbackTitle, parent }: Props) {
    const { lang } = useLanguage();

    // `undefined` means "still fetching" and is deliberately distinct from an
    // empty array. Conflating the two is what made loading pages announce
    // themselves as unfinished.
    const [hub, setHub] = useState<MenuItem | null | undefined>(undefined);

    useEffect(() => {
        let alive = true;
        setHub(undefined);
        getHeaderMenu(lang)
            .then((sections) => {
                if (!alive) return;
                const wanted = new Set(hubSlugs.map((s) => s.toLowerCase()));
                const matches = (slug?: string | null, url?: string | null) => {
                    const tail = (url ?? "").split("/").filter(Boolean).pop() ?? "";
                    return wanted.has((slug ?? "").toLowerCase()) || wanted.has(tail.toLowerCase());
                };

                // A hub is usually a menu item, but a section root (Research) is a
                // top-level menu section whose children are its items.
                const section = sections.find((s) => matches(s.slug, s.direct_url));
                if (section) {
                    setHub({
                        id: section.id,
                        title: section.title,
                        slug: section.slug,
                        direct_url: section.direct_url,
                        sub_items: (section.items ?? []).map((item) => ({
                            id: item.id,
                            title: item.title,
                            slug: item.slug,
                            direct_url: item.direct_url ?? `/${item.slug}`,
                        })),
                    });
                    return;
                }

                const match = sections
                    .flatMap((s) => s.items ?? [])
                    .find((item) => matches(item.slug, item.direct_url));
                setHub(match ?? null);
            })
            .catch(() => {
                if (alive) setHub(null);
            });
        return () => {
            alive = false;
        };
        // hubSlugs is a literal defined at the call site and never changes identity
        // in a way that matters here.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, sectionSlug]);

    const title = hub?.title || fallbackTitle[lang];
    const children: SubItem[] = hub?.sub_items ?? [];

    const hrefFor = (item: SubItem) => {
        const raw = item.direct_url || `/${item.slug}`;
        if (/^https?:\/\//i.test(raw)) return raw;
        const path = raw.startsWith("/") ? raw : `/${raw}`;
        // The published menu stores prefix-less paths; without the locale prefix
        // the middleware bounces them through an extra redirect.
        return path.startsWith(`/${lang}/`) ? path : `/${lang}${path}`;
    };

    return (
        <main className="min-h-screen bg-page">
            <header className="text-flow relative overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                    <AboutHeroVideoBg />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/85 via-[#0a0c1a]/45 to-transparent" />
                    <div className="absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-blue-800/20 blur-[170px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 md:px-10 lg:px-20">
                    <Breadcrumbs
                        items={[
                            { label: parent.label[lang], href: parent.href[lang] },
                            { label: title },
                        ]}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <span className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                {parent.label[lang]}
                            </span>
                        </span>
                        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                            {title}
                        </h1>
                        <span className="mt-7 block h-px w-16 bg-gradient-to-r from-[#ee7c7e] to-transparent" />
                    </motion.div>
                </div>
            </header>

            <div className="mx-auto w-full max-w-[1600px] px-4 py-14 md:px-10 md:py-20 lg:px-20">
                {hub === undefined ? (
                    /* Loading — a skeleton, never the "page is being prepared" screen. */
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[104px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100/70 dark:border-white/10 dark:bg-white/5"
                            />
                        ))}
                    </div>
                ) : children.length === 0 ? (
                    <ComingSoon />
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {children.map((item, index) => (
                            <motion.div
                                key={item.id ?? `${item.slug}-${index}`}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
                            >
                                <Link
                                    href={hrefFor(item)}
                                    className="group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[#ee7c7e]/60 dark:border-white/10 dark:bg-slate-900"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1a2355] text-white">
                                        <AccountTreeOutlinedIcon sx={{ fontSize: 20 }} />
                                    </span>
                                    <span className="min-w-0 flex-1 text-[15px] font-black leading-snug text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {item.title}
                                    </span>
                                    <ChevronRightIcon
                                        sx={{ fontSize: 20 }}
                                        className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#ee7c7e] dark:text-slate-600"
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
