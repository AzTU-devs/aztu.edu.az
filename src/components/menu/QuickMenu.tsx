"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { getQuickMenu, type QuickMenuData, type QuickMenuItem } from "@/services/menu/menuService";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

/* Icons are the one thing that cannot come from the CMS — they are components.
   An unmapped platform falls back to a neutral globe rather than to Facebook,
   which would mislabel every unknown channel as one specific network. */
const SOCIAL_ICONS: Record<string, React.ElementType> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    youtube: YouTubeIcon,
    telegram: TelegramIcon,
    x: XIcon,
    twitter: XIcon,
};

type Status = "idle" | "loading" | "ready" | "error";

/** CMS strings are untrusted: the service casts raw JSON straight to the type. */
const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

/**
 * The CMS is a trust boundary: `next/link` renders whatever href it is handed,
 * so an editor (or a compromised row) could otherwise ship `javascript:` into
 * every visitor's menu. Allow only the schemes a menu link legitimately needs.
 */
const safeHref = (value: unknown): string | null => {
    const url = text(value);
    if (!url) return null;
    // A single leading slash is an in-site path; two is protocol-relative and
    // navigates off-site, so it has to clear the scheme check instead.
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    return /^(https?:|mailto:|tel:)/i.test(url) ? url : null;
};

/** A link is only renderable if it actually has somewhere safe to go. */
const isRenderable = (item: QuickMenuItem | null | undefined) =>
    !!item && !!text(item.label) && !!safeHref(item.url);

const panelVariants: Variants = {
    closed: { x: "100%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
    open: { x: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function QuickMenu({ isOpen, onClose }: Props) {
    const [menuData, setMenuData] = useState<QuickMenuData | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [attempt, setAttempt] = useState(0);
    const { lang } = useLanguage();
    const t = useTranslation();
    const qm = t.common.quickMenu;
    const reduce = useReducedMotion();

    const titleId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);

    /* ---------------------------------------------------------------- data */
    useEffect(() => {
        if (!isOpen) return;

        let current = true;
        setStatus("loading");
        getQuickMenu(lang)
            .then((data) => {
                // Late resolves from a superseded language must not win.
                if (!current) return;
                if (data) {
                    setMenuData(data);
                    setStatus("ready");
                } else {
                    setStatus("error");
                }
            })
            .catch(() => {
                if (current) setStatus("error");
            });

        return () => {
            current = false;
        };
    }, [isOpen, lang, attempt]);

    // A language switch invalidates the payload — clear it so the panel never
    // renders AZ links under EN chrome while the refetch is in flight.
    useEffect(() => {
        setMenuData(null);
    }, [lang]);

    /* --------------------------------------------------- escape + scroll lock */
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);

        // Restore the previous value rather than blind-clearing it, matching
        // RankingCertificates — another overlay may still want the lock.
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    /* ------------------------------------------------------------- focus */
    useEffect(() => {
        if (!isOpen) return;

        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        const timeoutId = setTimeout(() => closeRef.current?.focus(), 120);

        return () => {
            clearTimeout(timeoutId);
            // The header swaps Header→SubHeader on scroll, so the element that
            // opened the menu may no longer be in the document by the time it
            // closes; fall back to whichever trigger is mounted now.
            const previous = restoreFocusRef.current;
            const target =
                previous && document.contains(previous)
                    ? previous
                    : document.querySelector<HTMLElement>("[data-quick-menu-trigger]");
            target?.focus();
        };
    }, [isOpen]);

    /* Tab must not escape into the page behind the overlay. */
    const onPanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Tab") return;
        const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, []);

    /* ---------------------------------------------------------------- view */
    /* Every link, title, contact detail and social URL is published through the
       CMS (/api/menu/quick) in both languages. Nothing is duplicated here — a
       static fallback would silently serve stale links the editors think they
       have already changed. Only the social ICONS stay in code, keyed by
       platform. */
    const leftItems = (menuData?.left_items ?? []).filter(isRenderable);
    const sections = (menuData?.right_sections ?? []).filter((s) => !!text(s?.title));
    const socialLinks = (menuData?.social_links ?? []).filter((s) => !!safeHref(s?.url));
    const email = text(menuData?.contact?.email);
    const phones = (menuData?.contact?.phones ?? []).map(text).filter(Boolean);
    const heading = text(menuData?.title);

    const busy = status === "loading" && !menuData;
    const failed = status === "error" && !menuData;

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                /* Rendered into <body>, not into the header's z-[999] wrapper —
                   that wrapper is its own stacking context, which capped this
                   overlay below SearchOverlay no matter how high its z-index. */
                <div key="quick-menu" className="fixed inset-0 z-[9998]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[#060f24]/85 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* PANEL — rows: fixed masthead, then everything that scrolls.
                        A grid rather than nested flex: two flex siblings, one
                        content-sized and one `flex-1`, distribute shrinkage by
                        scaled factor, which collapsed the content pane to 0px
                        whenever the other outgrew the viewport. */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        onKeyDown={onPanelKeyDown}
                        variants={panelVariants}
                        initial={reduce ? false : "closed"}
                        animate="open"
                        exit="closed"
                        className="absolute inset-y-0 right-0 grid w-full grid-rows-[auto_minmax(0,1fr)] border-l border-white/10 bg-[#0b1330] shadow-[-20px_0_80px_rgba(0,0,0,0.5)] sm:w-[93vw] sm:max-w-[38rem] lg:max-w-[64rem]"
                    >
                        {/* Decoration is clipped by its own box so the panel itself
                            never needs overflow-hidden — that clip is what sliced
                            the close button in half. */}
                        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
                            <div className="absolute right-0 top-0 h-[60%] w-[60%] rounded-full bg-[#ee7c7e]/[0.05] blur-[120px]" />
                            <div className="absolute bottom-0 left-0 h-[40%] w-[40%] rounded-full bg-blue-500/[0.05] blur-[100px]" />
                        </div>

                        {/* MASTHEAD — the close control is an ordinary flex child
                            here, at every breakpoint. No absolute positioning and
                            no negative offset, so no ancestor can clip it. */}
                        <header className="relative z-10 flex shrink-0 items-start gap-4 border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10 lg:py-7">
                            <div className="min-w-0 flex-1">
                                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-[#ee7c7e]">
                                    {qm.navigation}
                                </span>
                                <h2
                                    id={titleId}
                                    className="text-2xl font-black leading-[1.05] tracking-tight text-white lg:text-3xl"
                                >
                                    {heading || qm.title.replace(/<br\s*\/?>/gi, " ")}
                                </h2>
                            </div>
                            <motion.button
                                ref={closeRef}
                                type="button"
                                onClick={onClose}
                                aria-label={qm.close}
                                whileHover={reduce ? undefined : { rotate: 90, scale: 1.06 }}
                                whileTap={reduce ? undefined : { scale: 0.92 }}
                                /* Dark glyph on coral: white-on-#ee7c7e is 2.69:1,
                                   below the 3:1 floor for a meaningful graphic. */
                                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-2xl border border-white/20 bg-[#ee7c7e] text-[#0b1330] shadow-lg shadow-[#ee7c7e]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1330] lg:h-12 lg:w-12"
                            >
                                <CloseIcon aria-hidden sx={{ fontSize: 24 }} />
                            </motion.button>
                        </header>

                        {/* BODY — one scroll region on small screens; two columns,
                            each scrolling independently, from lg up. */}
                        <div className="quick-scroll relative z-10 min-h-0 overflow-y-auto lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:overflow-hidden">
                            {/* RAIL */}
                            <aside className="quick-scroll border-b border-white/10 px-5 py-7 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-8">
                                {busy ? (
                                    <div className="space-y-3" aria-live="polite" aria-busy>
                                        <span className="sr-only">{t.common.loading}</span>
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i} className="h-14 animate-pulse rounded-2xl bg-white/5" />
                                        ))}
                                    </div>
                                ) : (
                                    <nav aria-label={qm.navigation} className="space-y-2.5">
                                        {leftItems.map((item, i) => (
                                            <Link
                                                key={`${item.url}-${i}`}
                                                href={safeHref(item.url) as string}
                                                onClick={onClose}
                                                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/5 p-4 transition-colors duration-300 hover:border-white/15 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e]"
                                            >
                                                {/* CMS text is never uppercased or tracked: Azerbaijani
                                                    labels run 30–50% longer than the English ones and
                                                    letter-spacing pushes them past the rail's width. */}
                                                <span className="min-w-0 wrap-anywhere text-sm font-bold leading-snug text-white/80 transition-colors group-hover:text-white">
                                                    {item.label}
                                                </span>
                                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-white/70 transition-colors duration-300 group-hover:bg-[#ee7c7e] group-hover:text-[#0b1330]">
                                                    <ArrowOutwardIcon aria-hidden sx={{ fontSize: 16 }} />
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>
                                )}

                                {(email || phones.length > 0 || socialLinks.length > 0) && (
                                    <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
                                        {(email || phones.length > 0) && (
                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                                                    {qm.contact}
                                                </h3>
                                                {email && (
                                                    <a href={`mailto:${email}`} className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e]">
                                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-[#ee7c7e] transition-colors duration-300 group-hover:bg-[#ee7c7e] group-hover:text-[#0b1330]">
                                                            <EmailIcon aria-hidden sx={{ fontSize: 17 }} />
                                                        </span>
                                                        <span className="min-w-0 wrap-anywhere text-[13px] font-bold text-white/70 transition-colors group-hover:text-white">
                                                            {email}
                                                        </span>
                                                    </a>
                                                )}
                                                {phones.map((phone, i) => {
                                                    // Only offer a tel: link when what is left after
                                                    // stripping formatting is actually dialable — CMS
                                                    // fields often hold "…-05 / 06" or an extension note.
                                                    const dial = phone.replace(/[^\d+]/g, "");
                                                    const body = (
                                                        <>
                                                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-[#ee7c7e] transition-colors duration-300 group-hover:bg-[#ee7c7e] group-hover:text-[#0b1330]">
                                                                <LocalPhoneIcon aria-hidden sx={{ fontSize: 17 }} />
                                                            </span>
                                                            <span className="min-w-0 wrap-anywhere text-[13px] font-bold text-white/70 transition-colors group-hover:text-white">
                                                                {phone}
                                                            </span>
                                                        </>
                                                    );
                                                    return dial.length >= 7 ? (
                                                        <a key={`${phone}-${i}`} href={`tel:${dial}`} className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e]">
                                                            {body}
                                                        </a>
                                                    ) : (
                                                        <div key={`${phone}-${i}`} className="group flex items-center gap-3">
                                                            {body}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {socialLinks.length > 0 && (
                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                                                    {qm.follow}
                                                </h3>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {socialLinks.map(({ platform, url }, i) => {
                                                        const key = text(platform).toLowerCase();
                                                        const Icon = SOCIAL_ICONS[key] ?? PublicIcon;
                                                        return (
                                                            <a
                                                                key={`${key}-${i}`}
                                                                href={safeHref(url) as string}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                aria-label={`${platform || "link"} — ${qm.newTab}`}
                                                                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/5 text-white/70 transition-all duration-300 hover:border-[#ee7c7e] hover:bg-[#ee7c7e] hover:text-[#0b1330] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e]"
                                                            >
                                                                <Icon aria-hidden sx={{ fontSize: 19 }} />
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </aside>

                            {/* SECTIONS — every section is always on the page. The
                                tab strip it replaces could hold an unbounded number
                                of CMS sections in a single non-wrapping row, hid
                                everything but one behind a click, and reset itself
                                on each refetch. */}
                            {/* Solid rather than `bg-black/20`, so the sticky group
                                headers below can match it exactly — a translucent
                                ground would show them as a lighter band. */}
                            <div className="quick-scroll bg-[#090f26] px-5 py-7 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:px-10">
                                {busy && (
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))] gap-3">
                                        {[0, 1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5" />
                                        ))}
                                    </div>
                                )}

                                {failed && (
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center" role="alert">
                                        <p className="text-sm font-bold text-white/80">{qm.error}</p>
                                        <button
                                            type="button"
                                            onClick={() => setAttempt((n) => n + 1)}
                                            className="mt-4 cursor-pointer rounded-full bg-[#ee7c7e] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0b1330] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                        >
                                            {qm.retry}
                                        </button>
                                    </div>
                                )}

                                {!busy && !failed && (
                                    <div className="space-y-9">
                                        {sections.map((section, si) => {
                                            const items = (Array.isArray(section.items) ? section.items : []).filter(isRenderable);
                                            return (
                                                <section key={section.key || `s-${si}`} aria-label={section.title}>
                                                    {/* Sticky so the group a link belongs to stays
                                                        legible however far the list is scrolled. */}
                                                    <div className="sticky top-0 z-10 -mx-5 mb-4 bg-[#090f26]/95 px-5 py-2 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
                                                        <div className="flex items-baseline gap-3 border-b border-white/10 pb-2.5">
                                                            <h3 className="min-w-0 flex-1 wrap-anywhere text-base font-black leading-tight tracking-tight text-white">
                                                                {section.title}
                                                            </h3>
                                                            <span className="shrink-0 text-[11px] font-black tabular-nums text-white/50">
                                                                {items.length}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {items.length > 0 ? (
                                                        /* Column count follows the panel's own width, not
                                                           the viewport's — the grid sits inside a fixed
                                                           track, so a viewport media query would disagree
                                                           with the box it is laying out. */
                                                        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))] gap-3">
                                                            {items.map((item, i) => (
                                                                <li key={`${item.url}-${i}`}>
                                                                    <Link
                                                                        href={safeHref(item.url) as string}
                                                                        onClick={onClose}
                                                                        className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/5 p-4 transition-colors duration-300 hover:border-[#ee7c7e]/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e]"
                                                                    >
                                                                        <span className="min-w-0 wrap-anywhere text-sm font-bold leading-snug text-white/85 transition-colors group-hover:text-white">
                                                                            {item.label}
                                                                        </span>
                                                                        <ArrowOutwardIcon
                                                                            aria-hidden
                                                                            sx={{ fontSize: 16 }}
                                                                            className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-[#ee7c7e]"
                                                                        />
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-sm font-medium text-white/50">{t.common.menu.empty}</p>
                                                    )}
                                                </section>
                                            );
                                        })}

                                        {sections.length === 0 && (
                                            <p className="text-sm font-medium text-white/50">{t.common.menu.empty}</p>
                                        )}
                                    </div>
                                )}

                                <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/25">
                                    {qm.slogan}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
