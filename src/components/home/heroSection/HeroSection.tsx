"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import GroupsIcon from '@mui/icons-material/Groups'
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/context/LanguageContext"
import QsLogo from "@/../public/logos/qs-logo.svg"
import TheLogo from "@/../public/logos/the-logo.svg"
import GreenMetricLogo from "@/../public/logos/greenmetric-logo.png"
import ScopusLogo from "@/../public/logos/scopus-logo.svg"
import WosLogo from "@/../public/logos/wos-logo.svg"
import { getArticleCounters } from "@/services/article/articleService"

const LOCAL_VIDEOS = [
    "/heroVideos/video5.mp4",
    "/heroVideos/video1.mp4",
    "/heroVideos/video2.mp4",
    "/heroVideos/video9.mp4",
]

const AUTO_ADVANCE_INTERVAL = 8000
const RING_CIRCUMFERENCE = 2 * Math.PI * 37
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site"

export default function HeroSection() {
    const t = useTranslation()
    const { lang } = useLanguage()
    const [videos, setVideos] = useState<string[]>(LOCAL_VIDEOS)
    const [activeIndex, setActiveIndex] = useState(0)
    const [progressKey, setProgressKey] = useState(0)
    const [scopus, setScopus] = useState<string | null>(null)
    const [wos, setWos] = useState<string | null>(null)
    const [countersLoading, setCountersLoading] = useState(true)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const thumbRefs = useRef<(HTMLVideoElement | null)[]>([])
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const videosLengthRef = useRef(LOCAL_VIDEOS.length)

    useEffect(() => {
        videosLengthRef.current = videos.length
    }, [videos.length])

    useEffect(() => {
        getArticleCounters().then((data) => {
            setScopus(data.scopus)
            setWos(data.wos)
            setCountersLoading(false)
        })
    }, [])

    useEffect(() => {
        fetch(`${API_BASE}/api/hero/public`)
            .then((r) => r.json())
            .then((data) => {
                if (data.status_code === 200 && data.hero?.video) {
                    const apiVideoUrl = `${API_BASE}/${data.hero.video}`
                    setVideos([apiVideoUrl, ...LOCAL_VIDEOS])
                }
            })
            .catch(() => {})
    }, [])

    const advance = useCallback(() => {
        setActiveIndex(prev => (prev + 1) % videosLengthRef.current)
        setProgressKey(k => k + 1)
    }, [])

    const startAutoAdvance = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(advance, AUTO_ADVANCE_INTERVAL)
    }, [advance])

    useEffect(() => {
        startAutoAdvance()
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [startAutoAdvance])

    useEffect(() => {
        videoRefs.current.forEach((video, i) => {
            if (!video) return
            if (i === activeIndex) {
                video.currentTime = 0
                video.play().catch(() => {})
            } else {
                video.pause()
            }
        })
    }, [activeIndex])

    useEffect(() => {
        thumbRefs.current.forEach(v => { if (v) v.play().catch(() => {}) })
    }, [videos])

    const goTo = useCallback((index: number) => {
        setActiveIndex(index)
        setProgressKey(k => k + 1)
        startAutoAdvance()
    }, [startAutoAdvance])

    const handleScroll = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }

    const currentTitle = t.hero.title;

    const RANKING_LOGOS = [QsLogo, TheLogo, GreenMetricLogo];

    const quickStats = t.hero.stats.map((stat: any, i: number) => ({
        icon: i === 3 ? GroupsIcon : WorkspacePremiumIcon,
        logo: i < 3 ? RANKING_LOGOS[i] : null,
        label: stat.label,
        value: stat.value,
    }));

    return (
        <section className="w-full h-screen relative overflow-hidden bg-black">
            <style>{`
                @keyframes hero-ring {
                    from { stroke-dashoffset: ${2 * Math.PI * 24}; }
                    to   { stroke-dashoffset: 0; }
                }
                .hero-ring-progress {
                    animation: hero-ring ${AUTO_ADVANCE_INTERVAL}ms linear forwards;
                }
            `}</style>

            {/* Video Layer */}
            {videos.map((src, i) => (
                <video
                    key={src}
                    ref={el => { videoRefs.current[i] = el }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{
                        opacity: i === activeIndex ? 1 : 0,
                        zIndex: i === activeIndex ? 1 : 0,
                        willChange: "opacity",
                        filter: "brightness(0.6) contrast(1.1)"
                    }}
                    muted
                    playsInline
                    loop
                    preload={i === 0 ? "auto" : "none"}
                >
                    <source src={src} type="video/mp4" />
                </video>
            ))}

            {/* Premium Overlays */}
            <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1330] via-transparent to-black/20 opacity-95" />
                <div className="absolute inset-y-0 left-0 w-full lg:w-[70%] bg-gradient-to-r from-[#0b1330] via-[#0b1330]/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#0b1330] to-transparent" />
                
                {/* Moving Light Streak */}
                <motion.div 
                    animate={{ 
                        x: ['-100%', '200%'],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex items-center px-5 md:px-12 xl:px-20 pt-16 lg:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">

                    {/* LEFT: Main Text */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 mb-4 md:mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e] animate-pulse" />
                                    <span className="text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
                                        {lang === 'az' ? 'Azərbaycan Texniki Universiteti' : 'Azerbaijan Technical University'}
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-4xl xl:text-5xl font-black text-white mb-4 md:mb-5 leading-[1] tracking-tighter">
                                    {currentTitle.split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block mr-2 md:mr-3 last:mr-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] last:text-transparent last:bg-clip-text last:bg-gradient-to-br last:from-white last:to-[#ee7c7e]"
                                            initial={{ opacity: 0, y: 30, rotateX: -30 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.7 }}
                                    className="text-white/60 text-xs md:text-sm xl:text-base font-medium mb-5 md:mb-7 max-w-xl leading-relaxed border-l-2 border-[#ee7c7e] pl-4 md:pl-5"
                                >
                                    {lang === 'az'
                                        ? "Gələcəyin texnologiyalarını bu gün bizimlə öyrənin. İnnovativ təhsil, real təcrübə."
                                        : "Learn the technologies of the future with us today. Innovative education, real experience."}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.0, duration: 0.5 }}
                                    className="flex flex-wrap gap-3 md:gap-4 items-center"
                                >
                                    <button
                                        onClick={handleScroll}
                                        className="group flex items-center gap-2 md:gap-3 bg-white text-[#1a2355] font-black px-4 py-2 md:px-6 md:py-3 rounded-full md:rounded-2xl hover:bg-[#ee7c7e] hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[#ee7c7e]/40 cursor-pointer active:scale-95"
                                    >
                                        <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] md:text-[11px]">{t.hero.button}</span>
                                        <div className="relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-[#1a2355]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                            <ArrowDownwardIcon className="group-hover:translate-y-0.5 transition-transform" sx={{ fontSize: { xs: 14, md: 18 } }} />
                                        </div>
                                    </button>

                                    <Link href="/virtual-tour">
                                        <button className="group flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-2xl border border-white/20 text-white font-black px-4 py-2 md:px-6 md:py-3 rounded-full md:rounded-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer active:scale-95">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#ee7c7e] group-hover:shadow-[0_0_14px_#ee7c7e]">
                                                <PlayArrowIcon sx={{ fontSize: { xs: 14, md: 18 } }} />
                                            </div>
                                            <span className="uppercase tracking-[0.2em] text-[10px] md:text-[11px]">{lang === 'az' ? 'Virtual Tur' : 'Virtual Tour'}</span>
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: Stats */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-2 md:gap-2.5 lg:gap-3 mt-6 lg:mt-0">
                        {quickStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.3 + (i * 0.15), duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                                whileHover={{ x: -6, scale: 1.01, transition: { duration: 0.3 } }}
                                className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 flex items-center gap-3 group hover:bg-white/10 transition-all duration-400 shadow-[0_15px_30px_rgba(0,0,0,0.25)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-xl group-hover:bg-[#ee7c7e]/10 transition-colors" />
                                <div className={`rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-400 shadow-md shrink-0 overflow-hidden ${stat.logo ? 'w-16 h-8 md:w-20 md:h-9 bg-white px-1.5 py-1' : 'w-8 h-8 md:w-10 md:h-10 bg-white/10 group-hover:bg-[#ee7c7e]'}`}>
                                    {stat.logo ? (
                                        <Image src={stat.logo} alt={stat.label} width={80} height={36} className="object-contain w-full h-full" />
                                    ) : (
                                        <stat.icon className="text-white group-hover:scale-110 transition-transform duration-400" sx={{ fontSize: { xs: 16, md: 20 } }} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5 group-hover:text-[#ee7c7e] transition-colors truncate">{stat.label}</p>
                                    <p className="text-sm md:text-lg lg:text-xl font-black text-white tracking-tighter truncate">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Scopus & WoS */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.0, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                            className="grid grid-cols-2 gap-2"
                        >
                            {/* Scopus */}
                            <a
                                href="https://www.scopus.com/pages/organization/60071968"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 hover:border-[#F08300]/40 hover:scale-105 active:scale-95 transition-all duration-400 cursor-pointer h-[48px] md:h-[56px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F08300]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                                <img src="/logos/scopus-logo.svg" alt="Scopus" className="w-full h-full object-fill" />
                            </a>

                            {/* Web of Science */}
                            <a
                                href="https://www.webofscience.com/wos/woscc/summary/5667f913-5f6b-4e0b-8fe9-e12d8f6be1f1-01af1662f4/relevance/1?state=%7B%22searchType%22:%22generalSearch%22%7D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 hover:border-[#005A9C]/40 hover:scale-105 active:scale-95 transition-all duration-400 cursor-pointer h-[48px] md:h-[56px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#005A9C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                                <img src="/logos/wos-logo.svg" alt="Web of Science" className="w-full h-full object-fill" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Video thumbnail indicators */}
            <div
                className="absolute right-4 md:right-6 bottom-8 flex flex-col gap-3 items-center z-30"
            >
                {videos.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + (i * 0.1), type: 'spring' }}
                        className="relative flex items-center justify-center group/thumb"
                        style={{ width: "52px", height: "52px" }}
                    >
                        <svg
                            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover/thumb:scale-110"
                            viewBox="0 0 52 52"
                            style={{ transform: "rotate(-90deg)" }}
                        >
                            <circle
                                cx="26" cy="26" r="24"
                                fill="none"
                                stroke={i === activeIndex ? "rgba(238,124,126,0.3)" : "rgba(255,255,255,0.1)"}
                                strokeWidth="2"
                            />
                            {i === activeIndex && (
                                <circle
                                    key={progressKey}
                                    cx="26" cy="26" r="24"
                                    fill="none"
                                    stroke="#ee7c7e"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 24}
                                    strokeDashoffset={2 * Math.PI * 24}
                                    className="hero-ring-progress"
                                />
                            )}
                        </svg>

                        <button
                            onClick={() => goTo(i)}
                            className="relative overflow-hidden focus:outline-none cursor-pointer group-hover/thumb:scale-105 transition-transform duration-500 shadow-xl"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "black",
                                border: i === activeIndex
                                    ? "2px solid #ee7c7e"
                                    : "1.5px solid rgba(255,255,255,0.2)",
                                flexShrink: 0,
                            }}
                        >
                            <video
                                ref={el => { thumbRefs.current[i] = el }}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-125"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                            >
                                <source src={LOCAL_VIDEOS[i % LOCAL_VIDEOS.length]} type="video/mp4" />
                            </video>
                            <div className={`absolute inset-0 transition-opacity duration-300 ${i === activeIndex ? 'bg-transparent' : 'bg-black/60'}`} />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:block"
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 rotate-90 mb-6 origin-left">Scroll</p>
                    <div className="w-px h-8 rounded-full bg-gradient-to-b from-[#ee7c7e] to-transparent" />
                </div>
            </motion.div>
        </section>
    )
}
