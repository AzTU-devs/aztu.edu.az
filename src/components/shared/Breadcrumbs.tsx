"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export type Crumb = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    /**
     * Crumbs after "Home" — Home is always prepended by this component.
     * The last entry is rendered as the current page and is never a link,
     * even if an `href` is supplied.
     */
    items: Crumb[];
    /** Extra classes for the <nav> wrapper. Use sparingly — the point is one look everywhere. */
    className?: string;
};

/**
 * The single breadcrumb standard for the whole site.
 *
 * Every page hero renders breadcrumbs through this component so the spacing,
 * type scale, separators, hover colours and the "Home" entry are identical
 * everywhere. Do not hand-roll a breadcrumb trail in a page again.
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    const { lang } = useLanguage();
    const t = useTranslation();

    const crumbs = items.filter(Boolean);

    return (
        <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`mb-10 flex ${className}`}
        >
            <ol className="flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/60 shadow-lg shadow-black/10 backdrop-blur-xl">
                <li className="flex items-center">
                    <Link
                        href={`/${lang}`}
                        className="flex items-center gap-1.5 transition-colors hover:text-[#ee7c7e]"
                    >
                        <HomeIcon sx={{ fontSize: 14 }} />
                        <span>{t.common.home}</span>
                    </Link>
                </li>

                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;

                    return (
                        <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-2.5">
                            <ChevronRightIcon
                                sx={{ fontSize: 12 }}
                                className="shrink-0 text-white/30"
                                aria-hidden
                            />
                            {isLast ? (
                                <span
                                    aria-current="page"
                                    className="max-w-[240px] truncate text-white md:max-w-[420px]"
                                >
                                    {crumb.label}
                                </span>
                            ) : crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="max-w-[200px] truncate transition-colors hover:text-[#ee7c7e] md:max-w-none"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="max-w-[200px] truncate md:max-w-none">{crumb.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </motion.nav>
    );
}
