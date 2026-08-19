"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import {
    getHeroCertificates,
    getCertificateFileUrl,
    type HeroCertificate,
} from "@/services/heroCertificateService/heroCertificateService";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * The ranking certificates issued to AzTU, as published through the CMS.
 *
 * The figures on the rankings page are authored in the locale files; this strip
 * is the evidence hung beside them. It is therefore strictly additive — when
 * the API is unreachable (which is the normal case in local development, where
 * `getHeroCertificates` resolves to `[]`) the component renders nothing at all
 * and the page reads as complete without it.
 *
 * Only ranking certificates belong here. AQAS rows are programme
 * accreditations, not rankings, and live on the accreditation page — the test
 * is `issuer !== "aqas"`, never `issuer === "qs"`, because the deployed backend
 * omits `issuer` entirely and everything without one is a ranking certificate.
 */
export default function RankingCertificates() {
    const { lang } = useLanguage();
    const t = useTranslation();
    const r = t.pages.about.rankings;

    const [certificates, setCertificates] = useState<HeroCertificate[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        let alive = true;
        getHeroCertificates(lang).then((list) => {
            if (alive) setCertificates(list);
        });
        return () => {
            alive = false;
        };
    }, [lang]);

    /** Ranking certificates that actually have something to show. */
    const items = useMemo(
        () =>
            certificates
                .filter((cert) => cert.issuer !== "aqas")
                .filter((cert) => getCertificateFileUrl(cert.image) || cert.document),
        [certificates]
    );

    const active = activeIndex === null ? null : items[activeIndex] ?? null;

    const step = useCallback(
        (delta: number) =>
            setActiveIndex((current) =>
                current === null ? current : (current + delta + items.length) % items.length
            ),
        [items.length]
    );

    // Escape closes, arrows page through — and the previous overflow value is
    // restored rather than blindly cleared, so a nested scroll lock survives.
    useEffect(() => {
        if (active === null) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveIndex(null);
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [active, step]);

    if (items.length === 0) return null;

    const captionOf = (cert: HeroCertificate) => cert.kicker || cert.title || "";
    const altOf = (cert: HeroCertificate) =>
        cert.title || cert.rank_label || captionOf(cert) || "AzTU";

    return (
        <section className="mt-24">
            <SectionHeading
                icon={WorkspacePremiumIcon}
                eyebrow={lang === "az" ? "Sənədlər" : "Documents"}
                title={r.certificatesTitle}
                lead={r.certificatesLead}
            />

            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
                {items.map((cert, index) => {
                    const imageUrl = getCertificateFileUrl(cert.image);
                    return (
                        <motion.button
                            key={cert.certificate_id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                            aria-label={`${r.certificateOpen} — ${altOf(cert)}`}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-[#1a2355]/15 bg-white text-left shadow-lg transition-colors hover:border-[#ee7c7e]/60 dark:border-white/10"
                        >
                            {/* ISO-A portrait sheet. Kept white in dark mode too — these
                                are scans of white paper; a dark card behind one reads as
                                a printing error. */}
                            <div className="relative w-full bg-white" style={{ aspectRatio: "1 / 1.414" }}>
                                {imageUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={imageUrl}
                                        alt={altOf(cert)}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
                                        <PictureAsPdfIcon sx={{ fontSize: 40 }} className="text-[#ee7c7e]" />
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1a2355]">
                                            {cert.rank_label || captionOf(cert)}
                                        </span>
                                    </span>
                                )}
                                <span className="pointer-events-none absolute inset-0 bg-[#1a2355]/0 transition-colors duration-300 group-hover:bg-[#1a2355]/[0.06]" />
                            </div>

                            <span className="flex min-h-[64px] flex-col justify-center gap-1 border-t border-slate-100 px-3.5 py-3 dark:border-white/10 dark:bg-slate-900">
                                {captionOf(cert) && (
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">
                                        {captionOf(cert)}
                                    </span>
                                )}
                                {cert.rank_label && (
                                    <span className="text-sm font-black tabular-nums tracking-tight text-[#1a2355] dark:text-white">
                                        {cert.rank_label}
                                    </span>
                                )}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Lightbox */}
            {active && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={altOf(active)}
                    onClick={() => setActiveIndex(null)}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm md:p-6"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-h-[92vh] w-[min(92vw,760px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <header className="flex items-center gap-3 border-b border-slate-200 px-5 py-3.5">
                            <div className="min-w-0 flex-1">
                                {captionOf(active) && (
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ee7c7e]">
                                        {captionOf(active)}
                                    </p>
                                )}
                                <p className="truncate text-sm font-black text-[#1a2355]">
                                    {active.rank_label || active.title || ""}
                                </p>
                            </div>

                            {active.document && (
                                <a
                                    href={getCertificateFileUrl(active.document)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-bold text-[#1a2355] transition-colors hover:border-[#ee7c7e] hover:text-[#ee7c7e]"
                                >
                                    <PictureAsPdfIcon sx={{ fontSize: 16 }} />
                                    {r.certificatePdf}
                                </a>
                            )}

                            <button
                                type="button"
                                onClick={() => setActiveIndex(null)}
                                aria-label={r.certificateClose}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#ee7c7e] hover:text-white"
                            >
                                <CloseIcon sx={{ fontSize: 19 }} />
                            </button>
                        </header>

                        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-white p-4">
                            {getCertificateFileUrl(active.image) ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={getCertificateFileUrl(active.image)}
                                    alt={altOf(active)}
                                    className="max-h-[74vh] w-auto max-w-full object-contain"
                                />
                            ) : (
                                <a
                                    href={getCertificateFileUrl(active.document)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-3 px-6 py-16 text-center"
                                >
                                    <PictureAsPdfIcon sx={{ fontSize: 56 }} className="text-[#ee7c7e]" />
                                    <span className="text-sm font-black text-[#1a2355]">{r.certificatePdf}</span>
                                </a>
                            )}

                            {items.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        aria-label={r.certificatePrev}
                                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#1a2355] shadow-lg transition-colors hover:bg-[#1a2355] hover:text-white"
                                    >
                                        <ChevronLeftIcon />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        aria-label={r.certificateNext}
                                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#1a2355] shadow-lg transition-colors hover:bg-[#1a2355] hover:text-white"
                                    >
                                        <ChevronRightIcon />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

/** Local copy of the page's section heading so the strip drops in anywhere. */
function SectionHeading({
    icon: Icon,
    eyebrow,
    title,
    lead,
}: {
    icon: React.ElementType;
    eyebrow: string;
    title: string;
    lead?: string;
}) {
    return (
        <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                <Icon sx={{ fontSize: 16 }} />
                {eyebrow}
            </p>
            {/* Matches the page: this heading sits on `.bg-page`, which stays
                white in both themes, so no `dark:` colour flip here. */}
            <h2 className="text-3xl font-black leading-[1.1] tracking-tighter text-[#1a2355] md:text-4xl">
                {title}
            </h2>
            {lead && (
                <p className="mt-4 text-[15px] leading-relaxed text-slate-500 md:text-base">
                    {lead}
                </p>
            )}
        </div>
    );
}
