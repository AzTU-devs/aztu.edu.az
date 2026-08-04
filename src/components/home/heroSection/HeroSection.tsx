"use client"

import { Fragment, useEffect, useMemo, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import GroupsIcon from "@mui/icons-material/Groups"
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/context/LanguageContext"
import QsLogo from "@/../public/logos/qs-logo.svg"
import TheLogo from "@/../public/logos/the-logo.svg"
import GreenMetricLogo from "@/../public/logos/greenmetric-logo.png"
import { getArticleCounters } from "@/services/article/articleService"
import { getHomePage } from "@/services/homeService/homeService"
import type { HomePage } from "@/types/home"
import apiClient from "@/util/apiClient"
import {
    getHeroCertificates,
    getCertificateFileUrl,
    type HeroCertificate,
    type HeroCertificateFamily,
    type HeroCertificateIssuer,
} from "@/services/heroCertificateService/heroCertificateService"

/* ------------------------------------------------------------------ *
 * The ONE local video that actually exists in public/heroVideos/.
 * video1 / video2 / video9 were 404s on every page load and are gone.
 * ------------------------------------------------------------------ */
const LOCAL_VIDEO = "/heroVideos/video5.mp4"

/** Single source of truth for the rotation. Drives BOTH the timer and the
 *  progress trace on the active filmstrip slot, so they can never drift. */
const AUTO_ADVANCE_INTERVAL = 5000

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site"

/* Progress-trace geometry. Fixed viewBox + preserveAspectRatio="none" means the
 * rect stretches to whatever box the slot has, with no layout read — immune to
 * the scale(1.28) transition running underneath it. */
const RING_W = 44
const RING_H = 62
const RING_LEN = 2 * (RING_W + RING_H) // 212

/* Certificate sheet is ISO-A portrait. Explicit px keeps the intrinsic ratio
 * stable while the bitmap decodes. */
const SHEET_W = 330
const SHEET_H = 467
const SLOT_W = 34
const SLOT_H = 48

type Slide =
    | { kind: "video" }
    | { kind: "cert"; cert: HeroCertificate }

/** Filmstrip group identity. QS certificates group by family exactly as before;
 *  AQAS is a single group of its own, because programme accreditations have no
 *  family. "video" is the fixed first group. */
type GroupKey = HeroCertificateFamily | "video" | "aqas"

/** Anything that is not literally "aqas" is QS — the same test the service
 *  applies, restated here so a hand-built HeroCertificate can't slip past. */
const issuerOf = (cert?: HeroCertificate | null): HeroCertificateIssuer =>
    cert?.issuer === "aqas" ? "aqas" : "qs"

const pad = (n: number) => String(n).padStart(2, "0")

const resolveVideoUrl = (path: string) =>
    /^https?:\/\//.test(path) ? path : `${API_BASE}/${path.replace(/^\//, "")}`

/* Chrome / Node ICU has no long month names for az-AZ — Intl silently degrades
 * to "2024 M11". Azerbaijani months are therefore spelled out here; en-GB goes
 * through Intl as normal. */
const AZ_MONTHS = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avqust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
]

/** Month + year in the active language. Never throws, never renders "Invalid Date". */
function formatIssuedDate(iso: string | null, lang: "az" | "en"): string | null {
    if (!iso) return null
    const parsed = new Date(iso)
    if (Number.isNaN(parsed.getTime())) return null
    if (lang === "az") {
        const month = AZ_MONTHS[parsed.getUTCMonth()]
        return month ? `${month} ${parsed.getUTCFullYear()}` : String(parsed.getUTCFullYear())
    }
    try {
        return new Intl.DateTimeFormat("en-GB", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        }).format(parsed)
    } catch {
        return iso
    }
}

/** React 19 renders the `inert` attribute natively; the cast keeps older
 *  @types/react from choking on it. */
const inertWhen = (on: boolean) => (on ? ({ inert: true } as Record<string, unknown>) : {})

export default function HeroSection() {
    const t = useTranslation()
    const { lang } = useLanguage()

    const [videoSrc, setVideoSrc] = useState<string>(LOCAL_VIDEO)
    const [homePage, setHomePage] = useState<HomePage | null>(null)
    const [certificates, setCertificates] = useState<HeroCertificate[]>([])
    const [rawIndex, setIndex] = useState(0)
    const [cycleKey, setCycleKey] = useState(0)
    // Bumped every time the rotation timer (re)starts, so the progress trace can
    // be remounted in lockstep with it. See the rotation effect.
    const [runId, setRunId] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [userPaused, setUserPaused] = useState(false)
    const [reduced, setReduced] = useState(false)

    // Kept for parity with the previous implementation; the Scopus / WoS tiles
    // are static logo links, the counters endpoint is currently 503.
    const [, setScopus] = useState<string | null>(null)
    const [, setWos] = useState<string | null>(null)

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const railRef = useRef<HTMLDivElement | null>(null)
    const stageRef = useRef<HTMLDivElement | null>(null)
    const sheet0Ref = useRef<HTMLDivElement | null>(null)
    const slotRefs = useRef<(HTMLButtonElement | null)[]>([])
    const hasAdvanced = useRef(false)

    const total = 1 + certificates.length
    /* The list can shrink under a stale index (language switch, refetch). Clamp
     * DURING RENDER rather than in an effect — an effect-only reset paints one
     * frame where `isCert` is true but `certificates[index - 1]` is undefined,
     * which renders the hero copy on the left while `.is-cert` has already
     * hidden the stats rail and revealed the certificate stack. */
    const index = rawIndex < total ? rawIndex : 0
    const isCert = index > 0 && certificates.length > 0
    const activeCert = isCert ? certificates[index - 1] : undefined
    const paused = hovered || userPaused

    /* ------------------------------------------------------------------ *
     * prefers-reduced-motion
     * ------------------------------------------------------------------ */
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const sync = () => setReduced(mq.matches)
        sync()
        mq.addEventListener("change", sync)
        return () => mq.removeEventListener("change", sync)
    }, [])

    /* ------------------------------------------------------------------ *
     * Data
     * ------------------------------------------------------------------ */
    useEffect(() => {
        let alive = true
        getArticleCounters().then((data) => {
            if (!alive) return
            setScopus(data.scopus)
            setWos(data.wos)
        })
        return () => {
            alive = false
        }
    }, [])

    // Hero video. 204 carries no body, so the status is checked before the body.
    useEffect(() => {
        let alive = true
        apiClient
            .get("/api/hero/public")
            .then((res) => {
                if (!alive || res.status !== 200) return
                const path = res.data?.hero?.video
                if (res.data?.status_code === 200 && typeof path === "string" && path) {
                    setVideoSrc(resolveVideoUrl(path))
                }
            })
            .catch(() => {})
        return () => {
            alive = false
        }
    }, [])

    // Certificates. Keyed on `lang` so a language switch refetches, and the lang
    // is passed explicitly to sidestep the setDefaultLang mount race.
    useEffect(() => {
        let alive = true
        getHeroCertificates(lang).then((list) => {
            if (alive) setCertificates(list)
        })
        return () => {
            alive = false
        }
    }, [lang])

    // Home CMS metrics. Keyed on `lang` so a language switch refetches; a
    // cancelled guard prevents a stale response from overwriting a newer one.
    useEffect(() => {
        let cancelled = false
        getHomePage("home", lang).then((result) => {
            if (!cancelled) setHomePage(result)
        })
        return () => {
            cancelled = true
        }
    }, [lang])

    // Write the clamp back to state so `rawIndex` cannot drift from what is
    // rendered. The render-time clamp above is what actually protects the UI.
    useEffect(() => {
        if (rawIndex !== index) setIndex(index)
    }, [rawIndex, index])

    /* ------------------------------------------------------------------ *
     * Video element: mounted exactly once, never unmounted.
     * ------------------------------------------------------------------ */
    useEffect(() => {
        const el = videoRef.current
        if (!el) return
        el.load()
        el.play().catch(() => {})
    }, [videoSrc])

    // On certificate slides the video is blurred to near-invisibility, so
    // decoding its frames is pure waste — pause it, resume on slot 00.
    useEffect(() => {
        const el = videoRef.current
        if (!el) return
        if (isCert) el.pause()
        else el.play().catch(() => {})
    }, [isCert])

    /* ------------------------------------------------------------------ *
     * Rotation. ONE interval, cleared on every dep change and on unmount.
     * ------------------------------------------------------------------ */
    useEffect(() => {
        if (total <= 1 || paused) return
        /* The trace is a CSS animation and the advance is a JS interval; they
         * only stay in sync if they start together. Un-pausing restarts the
         * interval from zero, so the trace has to be remounted from zero too —
         * otherwise `animation-play-state:paused` resumes it mid-flight and it
         * completes seconds before the slide actually advances. */
        setRunId((r) => r + 1)
        const id = setInterval(() => {
            hasAdvanced.current = true
            setIndex((prev) => (prev + 1) % total)
        }, AUTO_ADVANCE_INTERVAL)
        return () => clearInterval(id)
    }, [total, paused, cycleKey])

    const goTo = useCallback(
        (next: number) => {
            hasAdvanced.current = true
            setIndex(((next % total) + total) % total)
            setCycleKey((k) => k + 1) // restarts both the timer and the trace
        },
        [total]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (total <= 1) return
            if (e.key === "ArrowRight") {
                e.preventDefault()
                goTo(index + 1)
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                goTo(index - 1)
            }
        },
        [goTo, index, total]
    )

    /* ------------------------------------------------------------------ *
     * Pointer tilt on the front sheet. Writes custom properties on a ref —
     * zero re-renders per pointer event. Never attached under reduced motion.
     * ------------------------------------------------------------------ */
    useEffect(() => {
        if (reduced || certificates.length === 0) return
        const stage = stageRef.current
        if (!stage) return

        let frame = 0
        let pending: { x: number; y: number } | null = null

        const apply = () => {
            frame = 0
            const sheet = sheet0Ref.current
            if (!sheet || !pending) return
            sheet.style.setProperty("--ry", (pending.x * 13).toFixed(2))
            sheet.style.setProperty("--rx", (-pending.y * 9).toFixed(2))
        }

        const onMove = (e: PointerEvent) => {
            const box = stage.getBoundingClientRect()
            if (!box.width || !box.height) return
            pending = {
                x: (e.clientX - box.left) / box.width - 0.5,
                y: (e.clientY - box.top) / box.height - 0.5,
            }
            if (!frame) frame = requestAnimationFrame(apply)
        }

        const onLeave = () => {
            if (frame) cancelAnimationFrame(frame)
            frame = 0
            pending = null
            const sheet = sheet0Ref.current
            if (!sheet) return
            sheet.style.setProperty("--ry", "0")
            sheet.style.setProperty("--rx", "0")
        }

        stage.addEventListener("pointermove", onMove)
        stage.addEventListener("pointerleave", onLeave)
        return () => {
            if (frame) cancelAnimationFrame(frame)
            stage.removeEventListener("pointermove", onMove)
            stage.removeEventListener("pointerleave", onLeave)
        }
    }, [reduced, certificates.length])

    /* ------------------------------------------------------------------ *
     * "Pop" entry on the front sheet. Web Animations API instead of a keyed
     * remount, so the <img> underneath is never torn down and re-decoded.
     * ------------------------------------------------------------------ */
    useEffect(() => {
        if (!isCert || reduced) return
        const el = sheet0Ref.current
        if (!el || typeof el.animate !== "function") return
        const anim = el.animate(
            [
                { opacity: 0, transform: "translate3d(7%,-4%,0) rotate(3.4deg) scale(.94)" },
                { opacity: 1, transform: "none" },
            ],
            { duration: 680, easing: "cubic-bezier(.22,1,.36,1)" }
        )
        return () => anim.cancel()
    }, [index, isCert, reduced])

    /* ------------------------------------------------------------------ *
     * Auto-scroll the active slot into view. scrollLeft arithmetic rather
     * than scrollIntoView, which can nudge the document.
     * ------------------------------------------------------------------ */
    useEffect(() => {
        const rail = railRef.current
        const slot = slotRefs.current[index]
        if (!rail || !slot) return
        const left = slot.offsetLeft - (rail.clientWidth - slot.offsetWidth) / 2
        rail.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" })
    }, [index, total, reduced])

    const handleScroll = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }

    /* ------------------------------------------------------------------ *
     * Derived view models
     * ------------------------------------------------------------------ */
    const slides = useMemo<Slide[]>(
        () => [{ kind: "video" }, ...certificates.map((cert) => ({ kind: "cert" as const, cert }))],
        [certificates]
    )

    const famLabels = t.hero.certificates.families
    /* `family` is nullable now (AQAS rows carry none, and so does an unknown
     * value from the API), so the null case is handled here rather than by an
     * accidental `undefined` lookup. */
    const famLabel = (family: GroupKey | null | undefined) =>
        (family ? famLabels[family] : undefined) ?? famLabels.other

    /** The label a certificate answers to outside the readout (sheet alt text,
     *  filmstrip tooltip, placeholder slug). QS keeps the family label it has
     *  today; AQAS must never fall through to "Other". */
    const certLabel = (cert: HeroCertificate) =>
        issuerOf(cert) === "aqas" ? famLabel("aqas") : famLabel(cert.family)

    /* Filmstrip groups, issuer-first: the video slot, then the QS families in
     * display_order (run-length, exactly as before), then ONE AQAS group at the
     * end. Reordering the strip does not touch slide indices — the buttons still
     * call goTo(i) with the rotation's own index. */
    const groups = useMemo(() => {
        const video: number[] = []
        const qs: { key: string; family: GroupKey; items: number[] }[] = []
        const aqas: number[] = []

        slides.forEach((slide, i) => {
            if (slide.kind === "video") {
                video.push(i)
                return
            }
            if (issuerOf(slide.cert) === "aqas") {
                aqas.push(i)
                return
            }
            const family: GroupKey = slide.cert.family ?? "other"
            const last = qs[qs.length - 1]
            if (last && last.family === family) last.items.push(i)
            else qs.push({ key: `qs-${family}-${i}`, family, items: [i] })
        })

        const out: { key: string; family: GroupKey; items: number[] }[] = []
        if (video.length) out.push({ key: "video", family: "video", items: video })
        out.push(...qs)
        if (aqas.length) out.push({ key: "aqas", family: "aqas", items: aqas })
        return out
    }, [slides])

    // At most THREE certificate <img> nodes: active, +1, +2. Advancing swaps
    // src on stable DOM nodes rather than mounting N of them.
    const sheets = useMemo(() => {
        if (certificates.length === 0) return []
        const base = index > 0 ? index - 1 : 0
        const depth = Math.min(3, certificates.length)
        return Array.from({ length: depth }, (_, k) => ({
            depth: k,
            cert: certificates[(base + k) % certificates.length],
        }))
    }, [certificates, index])

    const currentTitle = t.hero.title
    const RANKING_LOGOS = [QsLogo, TheLogo, GreenMetricLogo]
    /* The ranking logos/icons are decoration mapped BY INDEX and stay in code;
       only label/value come from the CMS. When hero_metrics is published it is
       the source of truth, otherwise the built-in locale copy keeps the rail
       populated so the hero never regresses to empty tiles. */
    const heroMetrics = homePage?.hero_metrics
    const quickStats = (
        heroMetrics && heroMetrics.length > 0
            ? heroMetrics.map((metric) => ({
                  label: metric.label,
                  value: `${metric.value}${metric.suffix}`,
              }))
            : t.hero.stats.map((stat: { label: string; value: string }) => ({
                  label: stat.label,
                  value: stat.value,
              }))
    ).map((stat, i) => ({
        icon: i === 3 ? GroupsIcon : WorkspacePremiumIcon,
        logo: i < 3 ? RANKING_LOGOS[i] : null,
        label: stat.label,
        value: stat.value,
    }))

    const rankingsHref = lang === "az" ? "/az/haqqimizda/reytinqler" : "/en/about/rankings"
    /* The accreditation page. `accreditation` has no entry in the middleware's
     * SLUG_MAP, so the last segment is deliberately identical in both languages;
     * only the About segment translates (`about` <-> `haqqimizda`), and the
     * middleware normalises both onto src/app/haqqimizda/accreditation.
     * Lang-prefixed like rankingsHref, so an EN visitor is never bounced through
     * an AZ path by the cookie fallback. */
    const accreditationHref =
        lang === "az" ? "/az/haqqimizda/accreditation" : "/en/about/accreditation"
    const hasRail = certificates.length > 0

    const issuedDate = formatIssuedDate(activeCert?.issued_date ?? null, lang)
    const metaParts: string[] = []
    if (issuedDate) metaParts.push(issuedDate)
    if (activeCert?.signer) metaParts.push(activeCert.signer)

    /* Every issuer test in this file asks "is it 'aqas'?" and never "is it
     * 'qs'?", so a payload from the pre-migration backend — which has no
     * `issuer` key at all — takes the identical code path it takes today. */
    const issuer = issuerOf(activeCert)
    const isAqas = issuer === "aqas"

    const rankLabel = activeCert?.rank_label ?? ""
    const hasEq = rankLabel.startsWith("=")
    const rankRest = hasEq ? rankLabel.slice(1) : rankLabel
    /* A QS row with an empty rank must not paint an empty focal slot. */
    const showRank = !isAqas && rankLabel !== ""
    /* AQAS promotes the programme name into the focal slot, so it must not also
     * render again below as the small title. */
    const progName = activeCert?.title || famLabel("aqas")

    const certCta = isAqas
        ? { href: accreditationHref, label: t.hero.certificates.aqasCta }
        : { href: rankingsHref, label: t.hero.certificates.cta }

    return (
        <section
            className={`hx-hero w-full h-screen relative overflow-hidden bg-[#070d24]${isCert ? " is-cert" : ""}`}
            /* Pointer events, filtered to a real mouse. A touch tap fires
             * mouseenter and then never fires mouseleave, which used to leave
             * the rotation permanently paused on phones and tablets. */
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovered(true)
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHovered(false)
            }}
            onKeyDown={handleKeyDown}
        >
            {/* React 19 hoists this into <head> once and dedupes it by href, so
                remounting the hero cannot stack duplicate style blocks. */}
            <style href="hx-hero-v2" precedence="default">
                {HERO_CSS}
            </style>

            {/* ---------------------------------------------------------- *
             * 1. MEDIA — exactly one <video>, mounted for the lifetime of
             *    the hero. On certificate slides it is dimmed and blurred
             *    back, never removed.
             * ---------------------------------------------------------- */}
            <div className="hx-media">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="auto"
                    aria-hidden="true"
                    tabIndex={-1}
                />
            </div>

            {/* 2. VEIL — diagonal (legibility behind the readout) + vertical
                   (seats the filmstrip). Two layers on purpose. */}
            <div className="hx-veil hx-veil-a" />
            <div className="hx-veil hx-veil-b" />

            {/* 3. STREAK — pure CSS, 11s linear. Was a framer-motion loop. */}
            <div className="hx-streak" />

            {/* ---------------------------------------------------------- *
             * 4. GRID
             * ---------------------------------------------------------- */}
            <div className={`hx-grid${hasRail ? "" : " hx-bare"}`}>
                {/* LEFT — hero copy on slot 00, certificate readout otherwise */}
                <div className="hx-left">
                    {isCert && activeCert ? (
                        /* `hx-iss-*` carries the accent tokens for the whole
                           readout: amber for QS-attested facts, teal for
                           AQAS-attested ones, never both. The fork below adds no
                           wrapper element, so the nth-child entry stagger still
                           lands on the individual rows (QS 6, AQAS 5). */
                        <div
                            key={`readout-${index}`}
                            className={`hx-readout hx-in hx-iss-${issuer}`}
                        >
                            <div className="hx-chip hx-chip-iss">
                                <span className="hx-issmark">{isAqas ? "AQAS" : "QS"}</span>
                                <span>
                                    {isAqas
                                        ? t.hero.certificates.aqasAttested
                                        : t.hero.certificates.attested}
                                </span>
                            </div>

                            <div className="hx-kicker">
                                {activeCert.kicker ||
                                    (isAqas
                                        ? t.hero.certificates.aqasKicker
                                        : famLabel(activeCert.family))}
                            </div>

                            {/* THE focal slot. QS puts the rank numeral here;
                                AQAS has no rank, so the programme name takes it
                                and nothing is invented to fill the gap. */}
                            {isAqas ? (
                                <h2 className="hx-prog">{progName}</h2>
                            ) : (
                                showRank && (
                                    <div className="hx-rank">
                                        {hasEq && <span className="hx-eq">=</span>}
                                        {rankRest}
                                    </div>
                                )
                            )}

                            {/* Small title — QS only. On an AQAS slide the title
                                is already the focal element above; rendering it
                                here too would duplicate it. */}
                            {!isAqas && (
                                <h2 className="hx-cert-title">
                                    {activeCert.title || famLabel(activeCert.family)}
                                </h2>
                            )}

                            <div className="hx-meta">
                                {metaParts.length > 0 ? (
                                    metaParts.map((part, i) => (
                                        <Fragment key={part}>
                                            {i > 0 && <span className="hx-sep" />}
                                            <strong>{part}</strong>
                                        </Fragment>
                                    ))
                                ) : (
                                    <strong>{t.hero.certificates.documentHint}</strong>
                                )}
                            </div>

                            <div className="hx-acts">
                                {/* Points at whichever page actually backs the
                                    slide: rankings for QS, accreditation for
                                    AQAS. Accent comes from hx-iss-*. */}
                                <Link href={certCta.href} className="hx-btn hx-btn-acc">
                                    <span>{certCta.label}</span>
                                    <span className="hx-arw" aria-hidden="true">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            key="hero-copy"
                            initial={
                                hasAdvanced.current && !reduced ? { opacity: 0, x: -60 } : false
                            }
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: reduced ? 0 : 0.6, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="hx-chip mb-4 md:mb-6">
                                <span className="hx-dot animate-pulse" />
                                <span>
                                    {lang === "az"
                                        ? "Azərbaycan Texniki Universiteti"
                                        : "Azerbaijan Technical University"}
                                </span>
                            </div>

                            <h1 className="hx-hero-h1 mb-4 md:mb-5">
                                {currentTitle.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-2 md:mr-3 last:mr-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] last:text-transparent last:bg-clip-text last:bg-[linear-gradient(120deg,#fff,#ee7c7e)]"
                                        initial={
                                            hasAdvanced.current && !reduced
                                                ? { opacity: 0, y: 30, rotateX: -30 }
                                                : false
                                        }
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        transition={{
                                            delay: reduced ? 0 : 0.05 + i * 0.05,
                                            duration: reduced ? 0 : 0.4,
                                            ease: [0.23, 1, 0.32, 1],
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>

                            <motion.p
                                initial={reduced ? false : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: reduced ? 0 : 0.7, duration: reduced ? 0 : 0.7 }}
                                className="hx-lede mb-5 md:mb-7"
                            >
                                {lang === "az"
                                    ? "Gələcəyin texnologiyalarını bu gün bizimlə öyrənin. İnnovativ təhsil, real təcrübə."
                                    : "Learn the technologies of the future with us today. Innovative education, real experience."}
                            </motion.p>

                            <motion.div
                                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: reduced ? 0 : 1.0, duration: reduced ? 0 : 0.5 }}
                                className="hx-acts"
                            >
                                <button
                                    type="button"
                                    onClick={handleScroll}
                                    className="hx-btn hx-btn-solid group"
                                >
                                    <span>{t.hero.button}</span>
                                    <ArrowDownwardIcon
                                        className="group-hover:translate-y-0.5 transition-transform"
                                        sx={{ fontSize: 15 }}
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* One anchor, not an <a> wrapping a <button> — the old
                                    nesting was invalid HTML and swallowed the pill's focus
                                    ring. */}
                                <Link href="/virtual-tour" className="hx-btn hx-btn-ghost group">
                                    <span>{lang === "az" ? "Virtual Tur" : "Virtual Tour"}</span>
                                    <PlayArrowIcon
                                        className="group-hover:translate-x-0.5 transition-transform"
                                        sx={{ fontSize: 15 }}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* RIGHT — stats rail on slot 00, certificate stack otherwise.
                    Both stay mounted; they swap into the same column. */}
                <div className="hx-right">
                    <div
                        className="hx-stats"
                        aria-hidden={isCert || undefined}
                        {...inertWhen(isCert)}
                    >
                        {quickStats.map((stat, i) => {
                            /* Split "801+" into the number and the trailing symbol so
                               the suffix can carry the coral accent on its own. Works
                               for CMS values and the locale fallback alike. */
                            const vm = String(stat.value).match(/^([\d.,\s]+)(.*)$/)
                            const vNum = vm ? vm[1].trim() : stat.value
                            const vSuf = vm ? vm[2].trim() : ""
                            return (
                            <motion.div
                                key={i}
                                initial={reduced ? false : { opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: reduced ? 0 : 1.3 + i * 0.12,
                                    duration: reduced ? 0 : 0.6,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                                className="group relative flex flex-col justify-between gap-3 min-h-[104px] md:min-h-[118px] p-3 md:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/10 hover:bg-white/[0.1] hover:border-[#ee7c7e]/40 transition-colors duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.25)] overflow-hidden"
                            >
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-[#ee7c7e]/15 transition-colors duration-500" />
                                <div
                                    className={`relative z-10 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-md shrink-0 overflow-hidden ${stat.logo ? "w-[70px] h-8 md:w-20 md:h-9 bg-white px-1.5 py-1" : "w-8 h-8 md:w-10 md:h-10 bg-white/10 group-hover:bg-[#ee7c7e]"}`}
                                >
                                    {stat.logo ? (
                                        <Image
                                            src={stat.logo}
                                            alt={stat.label}
                                            width={80}
                                            height={36}
                                            className="object-contain w-full h-full"
                                        />
                                    ) : (
                                        <stat.icon
                                            className="text-white group-hover:scale-110 transition-transform duration-300"
                                            sx={{ fontSize: { xs: 16, md: 20 } }}
                                        />
                                    )}
                                </div>
                                <div className="relative z-10 min-w-0">
                                    <p className="flex items-baseline gap-0.5 leading-none">
                                        <span className="text-2xl md:text-3xl font-black text-white tracking-tighter truncate">
                                            {vNum}
                                        </span>
                                        {vSuf && (
                                            <span className="text-lg md:text-xl font-black text-[#ee7c7e]">
                                                {vSuf}
                                            </span>
                                        )}
                                    </p>
                                    <p className="mt-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.18em] text-white/45 group-hover:text-[#ee7c7e] transition-colors duration-300 truncate">
                                        {stat.label}
                                    </p>
                                </div>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#ee7c7e] group-hover:w-full transition-all duration-500" />
                            </motion.div>
                            )
                        })}

                        {/* Scopus & WoS */}
                        <motion.div
                            initial={reduced ? false : { opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: reduced ? 0 : 2.0,
                                duration: reduced ? 0 : 0.7,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                            className="col-span-2 grid grid-cols-2 gap-2"
                        >
                            <a
                                href="https://www.scopus.com/pages/organization/60071968"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 hover:border-[#F08300]/40 hover:scale-105 active:scale-95 transition-[transform,border-color] duration-400 cursor-pointer h-[48px] md:h-[56px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F08300]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                                <img
                                    src="/logos/scopus-logo.svg"
                                    alt="Scopus"
                                    width={160}
                                    height={56}
                                    decoding="async"
                                    className="w-full h-full object-fill"
                                />
                            </a>

                            <a
                                href="https://www.webofscience.com/wos/woscc/summary/5667f913-5f6b-4e0b-8fe9-e12d8f6be1f1-01af1662f4/relevance/1?state=%7B%22searchType%22:%22generalSearch%22%7D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 hover:border-[#005A9C]/40 hover:scale-105 active:scale-95 transition-[transform,border-color] duration-400 cursor-pointer h-[48px] md:h-[56px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                                <img
                                    src="/logos/wos-logo.svg"
                                    alt="Web of Science"
                                    width={160}
                                    height={56}
                                    decoding="async"
                                    className="w-full h-full object-fill"
                                />
                            </a>
                        </motion.div>
                    </div>

                    {/* Certificate stack — at most three sheets, stable DOM nodes,
                        src swapped on advance. */}
                    {hasRail && (
                        <div
                            className="hx-stage"
                            ref={stageRef}
                            aria-hidden={!isCert || undefined}
                            {...inertWhen(!isCert)}
                        >
                            <div className="hx-stack">
                                {[...sheets].reverse().map(({ depth, cert }) => {
                                    const imageUrl = getCertificateFileUrl(cert.image)
                                    const front = depth === 0
                                    return (
                                        <div
                                            key={`sheet-${depth}`}
                                            ref={front ? sheet0Ref : undefined}
                                            className={`hx-sheet hx-sheet-${depth}`}
                                        >
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={
                                                        front
                                                            ? cert.title ||
                                                              cert.rank_label ||
                                                              certLabel(cert)
                                                            : ""
                                                    }
                                                    width={SHEET_W}
                                                    height={SHEET_H}
                                                    decoding="async"
                                                    loading={front ? "eager" : "lazy"}
                                                />
                                            ) : (
                                                <CertificatePlaceholder
                                                    cert={cert}
                                                    familyLabel={certLabel(cert)}
                                                    hint={t.hero.certificates.documentHint}
                                                />
                                            )}
                                            {front && isCert && !reduced && (
                                                <div key={`sheen-${index}`} className="hx-sheen hx-go" />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ---------------------------------------------------------- *
             * 5. FILMSTRIP — only when the admin has entered certificates.
             *    One certificate means no filmstrip.
             * ---------------------------------------------------------- */}
            {hasRail && (
                <div className="hx-rail-wrap">
                    <div className="hx-rail-head">
                        <span className="hx-rail-count">
                            <b>{pad(index)}</b> / {total}
                        </span>
                        <div className="hx-rail-ctl">
                            <button
                                type="button"
                                className="hx-icon-btn"
                                onClick={() => goTo(index - 1)}
                                aria-label={t.hero.certificates.prev}
                            >
                                <ChevronLeftIcon sx={{ fontSize: 16 }} />
                            </button>
                            <button
                                type="button"
                                className="hx-icon-btn"
                                onClick={() => setUserPaused((p) => !p)}
                                aria-label={
                                    userPaused
                                        ? t.hero.certificates.play
                                        : t.hero.certificates.pause
                                }
                                aria-pressed={userPaused}
                            >
                                {userPaused ? (
                                    <PlayArrowIcon sx={{ fontSize: 16 }} />
                                ) : (
                                    <PauseIcon sx={{ fontSize: 16 }} />
                                )}
                            </button>
                            <button
                                type="button"
                                className="hx-icon-btn"
                                onClick={() => goTo(index + 1)}
                                aria-label={t.hero.certificates.next}
                            >
                                <ChevronRightIcon sx={{ fontSize: 16 }} />
                            </button>
                        </div>
                    </div>

                    <div
                        className="hx-rail"
                        ref={railRef}
                        role="tablist"
                        aria-label={t.hero.certificates.railLabel}
                    >
                        {groups.map((group) => (
                            <div className="hx-group" key={group.key}>
                                <span className="hx-group-label">{famLabel(group.family)}</span>
                                <div className="hx-group-items">
                                    {group.items.map((i) => {
                                        const slide = slides[i]
                                        const active = i === index
                                        const thumb =
                                            slide.kind === "cert"
                                                ? getCertificateFileUrl(slide.cert.image)
                                                : undefined
                                        /* rank_label is interpolated, so a null
                                         * from a missing translation row would
                                         * read as the literal "… null" in the
                                         * tooltip and to a screen reader. */
                                        const label =
                                            slide.kind === "video"
                                                ? t.hero.certificates.videoSlide
                                                : slide.cert.title ||
                                                  (slide.cert.rank_label
                                                      ? `${t.hero.certificates.slide} ${slide.cert.rank_label}`
                                                      : `${t.hero.certificates.slide} ${certLabel(slide.cert)}`)
                                        /* The image-less thumb paints an issuer
                                         * band, so it has to know the issuer or
                                         * an AQAS slot would show QS amber. */
                                        const phAqas =
                                            slide.kind === "cert" &&
                                            !thumb &&
                                            issuerOf(slide.cert) === "aqas"
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                role="tab"
                                                ref={(el) => {
                                                    slotRefs.current[i] = el
                                                }}
                                                onClick={() => goTo(i)}
                                                aria-current={active}
                                                aria-selected={active}
                                                aria-label={`${pad(i)} — ${label}`}
                                                title={label}
                                                className={`hx-slot${slide.kind === "video" ? " hx-slot-video" : ""}${slide.kind === "cert" && !thumb ? " hx-slot-ph" : ""}${phAqas ? " hx-slot-ph-aqas" : ""}`}
                                            >
                                                {thumb && (
                                                    <img
                                                        src={thumb}
                                                        alt=""
                                                        width={SLOT_W}
                                                        height={SLOT_H}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                )}
                                                {active && (
                                                    <svg
                                                        /* runId already changes on
                                                         * every timer restart
                                                         * (including cycleKey
                                                         * bumps), so keying on it
                                                         * keeps trace and timer
                                                         * mounted together. */
                                                        key={`ring-${index}-${runId}`}
                                                        className={`hx-ring hx-run${paused ? " is-paused" : ""}`}
                                                        viewBox={`0 0 ${RING_W} ${RING_H}`}
                                                        preserveAspectRatio="none"
                                                        aria-hidden="true"
                                                        style={
                                                            {
                                                                "--len": RING_LEN,
                                                                "--dur": `${AUTO_ADVANCE_INTERVAL}ms`,
                                                            } as React.CSSProperties
                                                        }
                                                    >
                                                        <rect
                                                            x="0"
                                                            y="0"
                                                            width={RING_W}
                                                            height={RING_H}
                                                            vectorEffect="non-scaling-stroke"
                                                            strokeDasharray={RING_LEN}
                                                            strokeDashoffset={RING_LEN}
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 6. SCROLL INDICATOR — moves out of the filmstrip's way into the
                   corner the old vertical thumbs used to occupy. */}
            <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduced ? 0 : 2, duration: reduced ? 0 : 1 }}
                className={
                    hasRail
                        ? "absolute right-4 md:right-8 bottom-[168px] md:bottom-[176px] z-30 block"
                        : "absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 z-30 block"
                }
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 rotate-90 mb-6 origin-left">
                        Scroll
                    </p>
                    <div className="w-px h-8 rounded-full bg-gradient-to-b from-[#ee7c7e] to-transparent" />
                </div>
            </motion.div>
        </section>
    )
}

/* ------------------------------------------------------------------ *
 * CSS fallback sheet: rendered whenever an admin has entered a
 * certificate without an image (document / external_url only, or even
 * neither). A certificate is NEVER silently dropped.
 * ------------------------------------------------------------------ */
function CertificatePlaceholder({
    cert,
    familyLabel,
    hint,
}: {
    cert: HeroCertificate
    familyLabel: string
    hint: string
}) {
    const aqas = issuerOf(cert) === "aqas"
    return (
        /* The fallback sheet is part of the slide, so it obeys the same colour
           discipline: an AQAS certificate shows no amber anywhere. */
        <div className={`hx-ph${aqas ? " hx-ph-aqas" : ""}`}>
            <div className="hx-ph-band" />
            <div className="hx-ph-body">
                <span className="hx-ph-slug">{cert.kicker || familyLabel}</span>
                {/* AQAS has no rank position — the slot is left out entirely
                    rather than filled with something invented. */}
                {cert.rank_label && <span className="hx-ph-num">{cert.rank_label}</span>}
                <span className="hx-ph-drop">{cert.title || hint}</span>
                <span className="hx-ph-rule" />
                <span className="hx-ph-sign">{cert.signer || (aqas ? "AQAS" : "QS")}</span>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ *
 * Everything Tailwind cannot express: keyframes, the nth-child stagger,
 * scrollbar pseudo-elements, SVG presentation attributes, the elliptical
 * QS shield radius, and the reduced-motion override.
 * Class names are `hx-` prefixed because this <style> is global.
 * ------------------------------------------------------------------ */
const HERO_CSS = `
/* ---------- 0. TOKENS ----------
   Three voices, strictly separated:
     --hx-coral  AzTU's own voice — interaction and active state. Never a fact.
     --hx-qs     QS-attested facts ONLY.
     --hx-aqas   AQAS-attested facts ONLY.
   A QS slide must show no teal and an AQAS slide no amber; the readout picks
   one of the two accent sets below and everything inside it inherits. */
.hx-hero{
  isolation:isolate;
  --hx-coral:#ee7c7e;
  --hx-qs:#f5821f;
  --hx-aqas:#3fb9c6;
}
.hx-hero p{ text-align:left; text-justify:auto; }
.hx-hero :focus-visible{ outline:2px solid #ee7c7e; outline-offset:2px; }

/* ---------- 1. MEDIA ---------- */
.hx-media{ position:absolute; inset:0; z-index:0; }
.hx-media video{
  width:100%; height:100%; object-fit:cover; display:block;
  filter:brightness(.52) contrast(1.12) saturate(.9);
  transform:scale(1.06);
  transition:transform 1.4s cubic-bezier(.22,1,.36,1), filter 1.4s ease;
}
.hx-hero.is-cert .hx-media video{
  transform:scale(1.15);
  filter:brightness(.28) contrast(1.05) saturate(.6) blur(3px);
}

/* ---------- 2. VEIL ---------- */
.hx-veil{ position:absolute; inset:0; z-index:1; pointer-events:none; }
.hx-veil-a{ background:linear-gradient(105deg,#0b1330 0%,rgba(11,19,48,.72) 42%,rgba(7,13,36,.15) 100%); }
.hx-veil-b{ background:linear-gradient(to top,#070d24 0%,rgba(7,13,36,.55) 26%,transparent 62%); }

/* ---------- 3. STREAK ---------- */
.hx-streak{
  position:absolute; top:0; left:0; z-index:2; width:34%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);
  transform:skewX(-24deg); pointer-events:none;
  animation:hx-streak 11s linear infinite;
}
@keyframes hx-streak{
  0%{ transform:translateX(-120%) skewX(-24deg); opacity:0 }
  45%{ opacity:.9 }
  100%{ transform:translateX(360%) skewX(-24deg); opacity:0 }
}

/* ---------- 4. GRID ---------- */
.hx-grid{
  position:absolute; inset:0; z-index:5;
  display:grid;
  grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);
  align-items:center;
  gap:clamp(20px,4vw,60px);
  padding:clamp(24px,4vw,54px) clamp(20px,4vw,58px) 148px;
}
.hx-grid.hx-bare{ padding-bottom:clamp(24px,4vw,54px); }
.hx-left{ min-width:0; }
.hx-right{ min-width:0; display:grid; align-items:center; height:100%; }
.hx-right > *{ grid-area:1/1; min-width:0; }

.hx-stats{ display:grid; grid-template-columns:1fr 1fr; gap:12px; min-width:0; align-content:center;
  transition:opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1); }
.hx-hero.is-cert .hx-stats{ opacity:0; transform:translateY(-18px) scale(.96); pointer-events:none; }

/* ---------- READOUT ---------- */
/* Per-issuer accent set. The QS values are the literal originals, so a QS slide
   renders pixel-for-pixel as it did before the accent was made a variable;
   .hx-readout also carries them as its default, so a readout that somehow
   arrives without an hx-iss-* class still looks exactly like today. */
.hx-readout,
.hx-readout.hx-iss-qs{
  --acc:var(--hx-qs);
  --acc-ink:#ffce9a;
  --acc-on:#150c02;
  --acc-chip-bg:rgba(245,130,31,.13);
  --acc-chip-bd:rgba(245,130,31,.42);
  --acc-btn-bg:rgba(245,130,31,.14);
  --acc-btn-bd:rgba(245,130,31,.4);
  --acc-glow:rgba(245,130,31,.28);
  --acc-eq:rgba(245,130,31,.5);
}
.hx-readout.hx-iss-aqas{
  --acc:var(--hx-aqas);
  --acc-ink:#a9e7ee;
  --acc-on:#04222a;
  --acc-chip-bg:rgba(63,185,198,.13);
  --acc-chip-bd:rgba(63,185,198,.42);
  --acc-btn-bg:rgba(63,185,198,.14);
  --acc-btn-bd:rgba(63,185,198,.4);
  --acc-glow:rgba(63,185,198,.26);
  --acc-eq:rgba(63,185,198,.5);
}
.hx-readout{ min-width:0; display:flex; flex-direction:column; align-items:flex-start;
  gap:clamp(14px,1.7vw,20px); }
.hx-readout h2,.hx-readout p{ margin:0; }
@keyframes hx-rise{ from{ opacity:0; transform:translateY(16px) } to{ opacity:1; transform:none } }
.hx-in > *{ animation:hx-rise .6s cubic-bezier(.22,1,.36,1) backwards; }
.hx-in > *:nth-child(1){ animation-delay:.02s }
.hx-in > *:nth-child(2){ animation-delay:.08s }
.hx-in > *:nth-child(3){ animation-delay:.14s }
.hx-in > *:nth-child(4){ animation-delay:.2s }
.hx-in > *:nth-child(5){ animation-delay:.26s }
.hx-in > *:nth-child(6){ animation-delay:.32s }

.hx-chip{ display:inline-flex; align-items:center; gap:9px; padding:7px 14px;
  border-radius:999px; background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.16); backdrop-filter:blur(14px); color:#fff;
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:.6rem; letter-spacing:.22em; text-transform:uppercase; }
/* Attribution chip — amber on a QS slide, teal on an AQAS one. */
.hx-chip-iss{ background:var(--acc-chip-bg); border-color:var(--acc-chip-bd); color:var(--acc-ink); }
/* Coral: AzTU's own voice. The badge dot is the only coral mark on slot 00. */
.hx-dot{ width:6px; height:6px; border-radius:50%; flex-shrink:0;
  background:var(--hx-coral); box-shadow:0 0 10px var(--hx-coral); }
.hx-issmark{ background:var(--acc); color:var(--acc-on); padding:2px 6px; border-radius:4px;
  font-family:var(--font-geist-sans),Inter,sans-serif; font-weight:900; font-size:.72rem;
  letter-spacing:-.03em; }

.hx-kicker{ font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.68rem;
  letter-spacing:.3em; text-transform:uppercase; color:#a3abcd; margin-bottom:-6px; }

/* THE focal slot, QS variant: a rank position. Digits, so tabular-nums and
   tight negative tracking. */
.hx-rank{ font-size:clamp(3.6rem,8.4vw,7rem); font-weight:900; line-height:.84;
  letter-spacing:-.055em; font-variant-numeric:tabular-nums; color:var(--acc);
  text-shadow:0 22px 60px var(--acc-glow); }
.hx-eq{ font-size:.52em; vertical-align:.34em; margin-right:.04em; color:var(--acc-eq); }

/* THE focal slot, AQAS variant: the programme name. Same weight and the same
   accent-driven glow as .hx-rank so the two read as one slot, but this is prose
   — no tabular figures, gentler tracking, a line-height that survives wrapping,
   and a measure that keeps "Electrical and Electronics Engineering (BA)" inside
   the column instead of overflowing it. */
.hx-prog{ font-size:clamp(1.7rem,3.4vw,3rem); font-weight:900; line-height:1.03;
  letter-spacing:-.035em; color:var(--acc); text-shadow:0 22px 60px var(--acc-glow);
  max-width:15ch; text-wrap:balance; overflow-wrap:anywhere; }

.hx-cert-title{ font-size:clamp(1.05rem,2.1vw,1.72rem); font-weight:800; letter-spacing:-.035em;
  line-height:1.14; max-width:20ch; color:#fff; text-wrap:balance; }

/* Slot 00 copy. Same type system as the certificate readout it alternates with —
   the two swap in the same column every AUTO_ADVANCE_INTERVAL, so they cannot be
   built on two different scales. */
.hx-hero-h1{ font-size:clamp(1.7rem,4vw,3.15rem); font-weight:900; letter-spacing:-.05em;
  line-height:1; color:#fff; max-width:15ch; text-wrap:balance; }
.hx-lede{ font-size:.95rem; line-height:1.6; color:rgba(255,255,255,.6); max-width:44ch;
  border-left:2px solid #ee7c7e; padding-left:16px; }

.hx-meta{ display:flex; flex-wrap:wrap; align-items:center; gap:8px 14px;
  font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.68rem;
  letter-spacing:.06em; color:rgba(255,255,255,.45); }
.hx-meta strong{ color:rgba(255,255,255,.72); font-weight:500; }
.hx-sep{ width:3px; height:3px; border-radius:50%; background:rgba(255,255,255,.28);
  display:inline-block; flex-shrink:0; }

.hx-acts{ display:flex; flex-wrap:wrap; gap:11px; }
.hx-btn{ display:inline-flex; align-items:center; gap:10px; padding:13px 22px;
  border-radius:999px; border:1px solid transparent; cursor:pointer;
  font-family:var(--font-geist-sans),Inter,sans-serif; font-weight:900; font-size:.68rem;
  letter-spacing:.2em; text-transform:uppercase;
  transition:background-color .35s, color .35s, border-color .35s, transform .2s; }
.hx-btn:active{ transform:scale(.97); }
.hx-btn:hover{ text-decoration:none; }
/* AzTU controls — coral. */
.hx-btn-solid{ background:#fff; color:#1a2355; border-color:#fff;
  box-shadow:0 20px 40px rgba(0,0,0,.4); }
.hx-btn-solid:hover{ background:var(--hx-coral); color:#fff; border-color:var(--hx-coral); }
.hx-btn-ghost{ background:rgba(255,255,255,.06); color:#fff;
  border-color:rgba(255,255,255,.2); backdrop-filter:blur(14px); }
.hx-btn-ghost:hover{ background:rgba(255,255,255,.13); }
/* The ONE accent-coloured control in the hero, and only because it points at
   the attesting body's own page: amber -> QS rankings, teal -> AQAS
   accreditation. It lives inside .hx-readout, so it can never pick up an accent
   the rest of the slide is not already using. */
.hx-btn-acc{ background:var(--acc-btn-bg); color:var(--acc-ink); border-color:var(--acc-btn-bd); }
.hx-btn-acc:hover{ background:var(--acc); color:var(--acc-on); border-color:var(--acc); }
.hx-arw{ font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.9rem; line-height:1; }

/* ---------- CERTIFICATE STACK ---------- */
.hx-stage{ position:relative; height:100%; min-height:0; display:flex;
  align-items:center; justify-content:center; perspective:1500px; }
.hx-stack{ position:relative; width:min(330px,72%); aspect-ratio:1/1.414;
  transform-style:preserve-3d;
  transition:opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
.hx-hero:not(.is-cert) .hx-stack{ opacity:0; transform:translateY(26px) scale(.9); pointer-events:none; }

.hx-sheet{ position:absolute; inset:0; border-radius:6px; overflow:hidden; background:#fff;
  transform-origin:50% 100%;
  transition:transform .6s cubic-bezier(.22,1,.36,1), opacity .5s ease, box-shadow .6s ease; }
.hx-sheet img{ width:100%; height:100%; object-fit:cover; display:block; }
.hx-sheet-2{ transform:translate3d(15%,-8%,-120px) rotate(7.4deg) scale(.93);
  opacity:.42; filter:brightness(.58) saturate(.7);
  box-shadow:0 30px 60px -30px rgba(0,0,0,.95); }
.hx-sheet-1{ transform:translate3d(8%,-4.2%,-60px) rotate(3.7deg) scale(.97);
  opacity:.7; filter:brightness(.78) saturate(.86);
  box-shadow:0 30px 60px -30px rgba(0,0,0,.95); }
.hx-sheet-0{ transform:rotateY(calc(var(--ry,0) * 1deg)) rotateX(calc(var(--rx,0) * 1deg));
  box-shadow:0 2px 0 rgba(255,255,255,.55) inset,
             0 50px 90px -34px rgba(0,0,0,.92),
             0 0 0 1px rgba(255,255,255,.14);
  transition:transform .18s ease-out, box-shadow .6s ease; }

.hx-sheen{ position:absolute; inset:0; pointer-events:none; z-index:3; opacity:0;
  background:linear-gradient(72deg,transparent 32%,rgba(255,255,255,.62) 48%,transparent 64%); }
.hx-sheen.hx-go{ animation:hx-sweep .95s cubic-bezier(.3,0,.2,1); }
@keyframes hx-sweep{
  0%{ opacity:0; transform:translateX(-105%) }
  22%{ opacity:1 }
  100%{ opacity:0; transform:translateX(105%) }
}

/* ---------- CSS FALLBACK SHEET ---------- */
.hx-ph{ position:absolute; inset:0; background:#fdfdfd; display:flex; flex-direction:column; }
.hx-ph-band{ height:19%; flex-shrink:0; position:relative;
  background:linear-gradient(101deg,#f7a233,#ef7318 62%,#e05f12); }
.hx-ph-band::after{ content:""; position:absolute; left:50%; top:34%; transform:translateX(-50%);
  width:23%; aspect-ratio:1/1.22; background:#141414;
  border-radius:12% 12% 46% 46%/8% 8% 42% 42%; box-shadow:0 0 0 4px #fdfdfd; }
.hx-ph-body{ flex:1; display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:9px; padding:15% 13% 12%; text-align:center; }
.hx-ph-slug{ font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.56rem;
  letter-spacing:.2em; text-transform:uppercase; color:#b4b9cc; }
.hx-ph-num{ font-family:var(--font-geist-sans),Inter,sans-serif; font-weight:900;
  font-size:2.5rem; letter-spacing:-.05em; color:#dfe3ee; line-height:1;
  font-variant-numeric:tabular-nums; }
.hx-ph-drop{ width:100%; border:1.5px dashed #dcc4a6; border-radius:8px; padding:12px 8px;
  background:rgba(245,130,31,.045); font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:.52rem; letter-spacing:.13em; text-transform:uppercase; color:#c98a48; line-height:1.5; }
.hx-ph-rule{ width:44%; height:1px; background:#e6e9f2; margin-top:auto; }
.hx-ph-sign{ font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.46rem;
  letter-spacing:.16em; text-transform:uppercase; color:#c9cedd; }
/* AQAS fallback sheet: the band and the dashed drop are the only two coloured
   surfaces on it, and both are amber by default — they must be teal here. */
.hx-ph-aqas .hx-ph-band{ background:linear-gradient(101deg,#6fd2dd,#3fb9c6 62%,#2f97a4); }
.hx-ph-aqas .hx-ph-drop{ border-color:#b3dde2; background:rgba(63,185,198,.05); color:#3d8d97; }

/* ---------- 5. FILMSTRIP ---------- */
.hx-rail-wrap{ position:absolute; left:0; right:0; bottom:0; z-index:8;
  padding:0 clamp(14px,4vw,58px) clamp(16px,2.2vw,26px);
  background:linear-gradient(to top,#070d24 34%,rgba(7,13,36,.72) 68%,transparent); }
.hx-rail-head{ display:flex; align-items:center; justify-content:space-between; gap:16px;
  padding:0 2px 11px; }
.hx-rail-count{ font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.66rem;
  letter-spacing:.2em; color:rgba(255,255,255,.42); font-variant-numeric:tabular-nums; }
.hx-rail-count b{ color:#fff; font-weight:500; }
.hx-rail-ctl{ display:flex; align-items:center; gap:9px; }
.hx-icon-btn{ width:30px; height:30px; border-radius:50%; display:grid; place-items:center;
  background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.17); color:#fff;
  font-size:.62rem; line-height:1; cursor:pointer; flex-shrink:0;
  transition:background-color .25s, border-color .25s; }
.hx-icon-btn:hover{ background:rgba(255,255,255,.15); border-color:rgba(255,255,255,.3); }

.hx-rail{ position:relative; display:flex; align-items:flex-end; gap:18px;
  overflow-x:auto; overflow-y:hidden; padding:4px 2px 6px;
  scrollbar-width:thin; scrollbar-color:rgba(255,255,255,.2) transparent;
  scroll-behavior:smooth; }
.hx-rail::-webkit-scrollbar{ height:3px; }
.hx-rail::-webkit-scrollbar-thumb{ background:rgba(255,255,255,.2); border-radius:3px; }

.hx-group{ display:flex; flex-direction:column; gap:7px; flex-shrink:0; }
.hx-group-label{ padding-left:2px; white-space:nowrap;
  font-family:var(--font-geist-mono),ui-monospace,monospace; font-size:.53rem;
  letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.3); }
/* Fixed height keeps every group label on one baseline while the active slot
   scales up. Do not let this become content-derived. */
.hx-group-items{ display:flex; gap:9px; height:66px; align-items:flex-end; }

.hx-slot{ position:relative; flex-shrink:0; cursor:pointer; padding:0;
  width:34px; aspect-ratio:1/1.414; border-radius:4px; overflow:hidden;
  background:#12193a; border:1px solid rgba(255,255,255,.14);
  transform-origin:50% 100%;
  transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s; }
.hx-slot img{ width:100%; height:100%; object-fit:cover; display:block; opacity:.5;
  transition:opacity .3s; }
.hx-slot:hover{ transform:translateY(-4px); border-color:rgba(255,255,255,.42); }
.hx-slot:hover img{ opacity:.82; }
.hx-slot[aria-current="true"]{ transform:scale(1.28); border-color:#ee7c7e;
  box-shadow:0 0 0 1px #ee7c7e, 0 10px 22px -8px rgba(238,124,126,.8); }
.hx-slot[aria-current="true"]:hover{ transform:scale(1.28) translateY(-3px); }
.hx-slot[aria-current="true"] img{ opacity:1; }

.hx-slot-video::after{ content:"\\25B6"; position:absolute; inset:0; display:grid;
  place-items:center; font-size:.6rem; color:#fff; text-shadow:0 2px 8px rgba(0,0,0,.9); }
.hx-slot-ph{ background:#f2f3f8; }
.hx-slot-ph::before{ content:""; position:absolute; top:0; left:0; right:0; height:26%;
  background:linear-gradient(101deg,#f7a233,#e05f12); opacity:.65; }
.hx-slot-ph::after{ content:""; position:absolute; left:18%; right:18%; top:44%; height:1px;
  background:#d2d6e4; box-shadow:0 6px 0 #d2d6e4, 0 12px 0 #dfe2ec; }
.hx-slot-ph-aqas::before{ background:linear-gradient(101deg,#6fd2dd,#2f97a4); }
.hx-slot-ph[aria-current="true"]::before{ opacity:1; }

.hx-ring{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:2; }
.hx-ring rect{ fill:none; stroke:#fff; stroke-width:3; opacity:.95; }
.hx-run rect{ animation:hx-trace var(--dur) linear forwards; }
.hx-ring.is-paused rect{ animation-play-state:paused; }
@keyframes hx-trace{ from{ stroke-dashoffset:var(--len) } to{ stroke-dashoffset:0 } }

/* ---------- 6. RESPONSIVE ---------- */
@media (max-width:1000px){
  .hx-grid{
    grid-template-columns:1fr; gap:26px; align-content:start;
    padding:112px clamp(18px,5vw,30px) 170px;
    overflow-y:auto; -webkit-overflow-scrolling:touch;
  }
  .hx-grid.hx-bare{ padding-bottom:96px; }
  .hx-right{ display:block; height:auto; }
  .hx-stats{ margin-top:8px; gap:10px; opacity:1; transform:none; }
  .hx-hero.is-cert .hx-stats{ display:none; }
  .hx-hero:not(.is-cert) .hx-stack{ display:none; }
  .hx-hero.is-cert .hx-right{ order:-1; }
  .hx-stage{ height:auto; padding-top:6px; }
  .hx-stack{ width:min(216px,58%); }
  .hx-rank{ font-size:clamp(3rem,13vw,4.6rem); }
  .hx-prog{ font-size:clamp(1.45rem,6vw,2.3rem); }
  .hx-cert-title,.hx-hero-h1,.hx-lede,.hx-prog{ max-width:100%; }
}
@media (min-width:641px) and (max-width:1000px){
  .hx-stats{ display:grid; grid-template-columns:1fr 1fr; }
}
@media (max-width:620px){
  .hx-rail{ gap:13px; }
  .hx-group-label{ font-size:.48rem; }
  .hx-btn{ padding:11px 17px; letter-spacing:.16em; }
  .hx-lede{ font-size:.875rem; padding-left:13px; }
}

/* ---------- 7. REDUCED MOTION ---------- */
@media (prefers-reduced-motion:reduce){
  .hx-hero *, .hx-hero *::before, .hx-hero *::after{
    animation-duration:.001ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.001ms !important;
    scroll-behavior:auto !important;
  }
}
`
