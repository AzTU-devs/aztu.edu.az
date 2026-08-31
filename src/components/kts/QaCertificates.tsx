"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
    getHeroCertificates,
    getCertificateFileUrl,
    type HeroCertificate,
    type HeroCertificateIssuer,
} from "@/services/heroCertificateService/heroCertificateService";
import { ISSUERS, groupByIssuer, issuerRanks } from "@/util/certificateIssuers";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * The certificates the university actually holds, on the quality-assurance page.
 *
 * Same source as the home-page hero (`/api/hero-certificate/public`), so nothing
 * is duplicated in code and adding a certificate in the dashboard shows up in
 * both places. Divided by attesting body, because that is the division that
 * carries meaning: a ranking body states a position, an accreditor attests a
 * programme, and the two are not comparable.
 */

type Props = { id?: string };

const A4 = "aspect-[1/1.414]";

export default function QaCertificates({ id }: Props) {
    const { lang } = useLanguage();
    const t = useTranslation();
    // null = still loading, [] = loaded and there are none. The distinction is
    // load-bearing: it is the only way to avoid flashing an empty state.
    const [certs, setCerts] = useState<HeroCertificate[] | null>(null);
    const [active, setActive] = useState<HeroCertificate | null>(null);

    useEffect(() => {
        let alive = true;
        setCerts(null);
        getHeroCertificates(lang).then((list) => {
            if (alive) setCerts(list);
        });
        return () => {
            alive = false;
        };
    }, [lang]);

    // Escape closes the viewer and the page behind it does not scroll while it
    // is open — the previous overflow is restored rather than blind-cleared.
    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = previous;
        };
    }, [active]);

    const copy =
        lang === "az"
            ? {
                  title: "Sertifikatlar",
                  eyebrow: "Xarici təsdiq",
                  lede: "Universitetin keyfiyyəti müstəqil beynəlxalq qurumlar tərəfindən qiymətləndirilir. Aşağıdakı sertifikatlar həmin qiymətləndirmələrin nəticəsidir.",
                  ranking: "Reytinq nəticələri",
                  accreditation: "Proqram akkreditasiyaları",
                  empty: "Sertifikatlar hələ əlavə olunmayıb.",
                  view: "Sertifikata bax",
                  pdf: "PDF",
                  site: "Mənbə",
                  close: "Bağla",
                  countLabel: "sertifikat",
              }
            : {
                  title: "Certificates",
                  eyebrow: "External validation",
                  lede: "The university's quality is assessed by independent international bodies. The certificates below are the outcome of those assessments.",
                  ranking: "Ranking results",
                  accreditation: "Programme accreditations",
                  empty: "No certificates have been added yet.",
                  view: "View certificate",
                  pdf: "PDF",
                  site: "Source",
                  close: "Close",
                  countLabel: "certificates",
              };

    const famLabels = t.hero.certificates.families;

    // A row with neither a sheet nor a document has nothing to show.
    const usable = (certs ?? []).filter(
        (cert) => getCertificateFileUrl(cert.image) || cert.document || cert.external_url
    );
    const groups = groupByIssuer(usable);

    const openable = useCallback(
        (cert: HeroCertificate) =>
            !!getCertificateFileUrl(cert.image) || !!cert.document || !!cert.external_url,
        []
    );

    if (certs === null) {
        return (
            <section id={id} className="scroll-mt-28">
                <Heading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`${A4} animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5`} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id={id} className="scroll-mt-28">
            <Heading eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

            {groups.length === 0 ? (
                <p className="rounded-2xl border border-slate-200 bg-slate-50/60 px-6 py-8 text-center text-sm font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                    {copy.empty}
                </p>
            ) : (
                <div className="space-y-12">
                    {groups.map(({ issuer, items }) => {
                        const meta = ISSUERS[issuer];
                        const ranks = issuerRanks(issuer);
                        return (
                            <div key={issuer}>
                                {/* Issuer header — the mark does the identifying,
                                    so the heading beside it says what KIND of
                                    attestation this is rather than repeating the
                                    brand name. */}
                                <div className="mb-5 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-4 dark:border-white/10">
                                    {meta?.logo && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={meta.logo}
                                            alt={meta.name}
                                            className="h-9 w-auto max-w-[110px] shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-slate-200 dark:ring-white/10"
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-black tracking-tight text-[#1a2355] dark:text-white md:text-lg">
                                            {ranks ? copy.ranking : copy.accreditation}
                                        </h3>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                            {meta?.name ?? issuer}
                                        </p>
                                    </div>
                                    <span className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-black tabular-nums text-slate-500 dark:border-white/10 dark:text-slate-400">
                                        {items.length} {copy.countLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {items.map((cert, i) => {
                                        const sheet = getCertificateFileUrl(cert.image);
                                        const family =
                                            ranks && cert.family ? famLabels[cert.family] : null;
                                        return (
                                            <motion.button
                                                key={cert.certificate_id}
                                                type="button"
                                                onClick={() => openable(cert) && setActive(cert)}
                                                /* Never starts at opacity 0 — the
                                                   sheets must be visible even if
                                                   the animation never runs. */
                                                initial={{ y: 12 }}
                                                whileInView={{ y: 0 }}
                                                viewport={{ once: true, margin: "-40px" }}
                                                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                                                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ee7c7e]/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7c7e] dark:border-white/10 dark:bg-slate-900"
                                            >
                                                <span className={`relative block ${A4} w-full overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                                                    {sheet ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img
                                                            src={sheet}
                                                            alt={cert.title ?? ""}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                        />
                                                    ) : (
                                                        <span className="grid h-full w-full place-items-center text-slate-300 dark:text-slate-600">
                                                            <WorkspacePremiumIcon sx={{ fontSize: 34 }} />
                                                        </span>
                                                    )}
                                                    {/* The rank is the headline fact
                                                        on a ranking certificate, so it
                                                        is legible without opening the
                                                        sheet. */}
                                                    {ranks && cert.rank_label && (
                                                        <span className="absolute left-2 top-2 rounded-lg bg-[#1a2355]/90 px-2 py-1 text-[11px] font-black tabular-nums text-white backdrop-blur">
                                                            {cert.rank_label}
                                                        </span>
                                                    )}
                                                </span>

                                                <span className="flex min-w-0 flex-1 flex-col gap-1 p-3.5">
                                                    {family && (
                                                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ee7c7e]">
                                                            {family}
                                                        </span>
                                                    )}
                                                    <span className="wrap-anywhere text-[13px] font-bold leading-snug text-[#1a2355] dark:text-white">
                                                        {cert.title}
                                                    </span>
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {active && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.title ?? copy.view}
                    className="fixed inset-0 z-[9997] flex flex-col bg-[#060f24]/95 p-4 backdrop-blur-xl md:p-8"
                    onClick={() => setActive(null)}
                >
                    <div className="mb-4 flex shrink-0 items-start gap-4">
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">
                                {ISSUERS[active.issuer]?.name ?? active.issuer}
                            </p>
                            <h4 className="wrap-anywhere text-base font-black text-white md:text-lg">
                                {active.title}
                            </h4>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            {active.document && (
                                <a
                                    href={getCertificateFileUrl(active.document)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    <PictureAsPdfIcon sx={{ fontSize: 15 }} />
                                    {copy.pdf}
                                </a>
                            )}
                            {active.external_url && (
                                <a
                                    href={active.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    <OpenInNewIcon sx={{ fontSize: 15 }} />
                                    {copy.site}
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                aria-label={copy.close}
                                className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-[#ee7c7e] text-[#0b1330] transition-transform hover:scale-105"
                            >
                                <CloseIcon sx={{ fontSize: 20 }} />
                            </button>
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 items-center justify-center">
                        {getCertificateFileUrl(active.image) ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={getCertificateFileUrl(active.image)}
                                alt={active.title ?? ""}
                                onClick={(e) => e.stopPropagation()}
                                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                            />
                        ) : (
                            <p className="text-sm font-medium text-white/60">{active.title}</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

function Heading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
    return (
        <div className="mb-8">
            <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.32em] text-[#ee7c7e]">
                {eyebrow}
            </span>
            <h2 className="mb-3 text-2xl font-black tracking-tight text-[#1a2355] dark:text-white md:text-3xl">
                {title}
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                {lede}
            </p>
        </div>
    );
}
