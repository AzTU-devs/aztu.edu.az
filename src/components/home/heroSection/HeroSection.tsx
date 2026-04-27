"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import GroupsIcon from '@mui/icons-material/Groups'
import PublicIcon from '@mui/icons-material/Public'
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/context/LanguageContext"

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
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const thumbRefs = useRef<(HTMLVideoElement | null)[]>([])
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const videosLengthRef = useRef(LOCAL_VIDEOS.length)

    useEffect(() => {
        videosLengthRef.current = videos.length
    }, [videos.length])

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

    const quickStats = t.hero.stats.map((stat: any, i: number) => ({
        icon: i === 3 ? GroupsIcon : WorkspacePremiumIcon,
        label: stat.label,
        value: stat.value,
    }));

    return (
        <section className="w-full h-screen relative overflow-hidden bg-black">
            <style>{`
                @keyframes hero-ring {
                    from { stroke-dashoffset: ${RING_CIRCUMFERENCE}; }
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
            <div className="absolute inset-0 z-20 flex items-center px-6 md:px-[80px] xl:px-[120px] pt-20 lg:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
                    
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
                                <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 mb-6 md:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ee7c7e] shadow-[0_0_15px_#ee7c7e] animate-pulse" />
                                    <span className="text-white text-[10px] md:text-[13px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">
                                        {lang === 'az' ? 'Azərbaycan Texniki Universiteti' : 'Azerbaijan Technical University'}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-7xl xl:text-8xl font-black text-white mb-6 md:mb-10 leading-[0.9] tracking-tighter">
                                    {currentTitle.split(' ').map((word, i) => (
                                        <motion.span 
                                            key={i} 
                                            className="inline-block mr-3 md:mr-6 last:mr-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] last:text-transparent last:bg-clip-text last:bg-gradient-to-br last:from-white last:to-[#ee7c7e]"
                                            initial={{ opacity: 0, y: 40, rotateX: -45 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.15), duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </h1>

                                <motion.p 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="text-white/60 text-base md:text-xl xl:text-2xl font-medium mb-8 md:mb-12 max-w-2xl leading-relaxed border-l-2 border-[#ee7c7e] pl-6 md:pl-10"
                                >
                                    {lang === 'az' 
                                        ? "Gələcəyin texnologiyalarını bu gün bizimlə öyrənin. İnnovativ təhsil, real təcrübə." 
                                        : "Learn the technologies of the future with us today. Innovative education, real experience."}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, duration: 0.6 }}
                                    className="flex flex-wrap gap-4 md:gap-8 items-center"
                                >
                                    <button
                                        onClick={handleScroll}
                                        className="group flex items-center gap-3 md:gap-5 bg-white text-[#1a2355] font-black px-6 py-3 md:px-10 md:py-5 rounded-full md:rounded-[2rem] hover:bg-[#ee7c7e] hover:text-white transition-all duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.5)] hover:shadow-[#ee7c7e]/50 cursor-pointer overflow-hidden relative active:scale-95"
                                    >
                                        <span className="relative z-10 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-[13px]">{t.hero.button}</span>
                                        <div className="relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#1a2355]/5 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                                            <ArrowDownwardIcon className="group-hover:translate-y-1 transition-transform" sx={{ fontSize: { xs: 18, md: 24 } }} />
                                        </div>
                                    </button>

                                    <Link href="/virtual-tour">
                                        <button className="group flex items-center gap-3 md:gap-5 bg-white/5 backdrop-blur-2xl border border-white/20 text-white font-black px-6 py-3 md:px-10 md:py-5 rounded-full md:rounded-[2rem] hover:bg-white/10 transition-all duration-700 cursor-pointer active:scale-95">
                                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#ee7c7e] group-hover:shadow-[0_0_20px_#ee7c7e]">
                                                <PlayArrowIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
                                            </div>
                                            <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-[13px]">{lang === 'az' ? 'Virtual Tur' : 'Virtual Tour'}</span>
                                        </button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: Stunning Stats */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 md:gap-4 lg:gap-6 mt-10 lg:mt-0">
                        {quickStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4 + (i * 0.2), duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                whileHover={{ x: -10, scale: 1.02, transition: { duration: 0.4 } }}
                                className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-4 md:p-6 lg:p-7 flex items-center gap-4 md:gap-6 group hover:bg-white/10 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:bg-[#ee7c7e]/10 transition-colors" />
                                <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] transition-all duration-500 shadow-xl group-hover:shadow-[#ee7c7e]/40 shrink-0">
                                    <stat.icon className="text-white group-hover:scale-110 transition-transform duration-500" sx={{ fontSize: { xs: 20, md: 28, lg: 32 } }} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/40 mb-1 group-hover:text-[#ee7c7e] transition-colors truncate">{stat.label}</p>
                                    <p className="text-lg md:text-2xl lg:text-3xl font-black text-white tracking-tighter truncate">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video thumbnail indicators — refined */}
            <div
                className="absolute right-8 md:right-12 bottom-12 flex flex-col gap-6 items-center z-30"
            >
                {videos.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + (i * 0.1), type: 'spring' }}
                        className="relative flex items-center justify-center group/thumb"
                        style={{ width: "80px", height: "80px" }}
                    >
                        <svg
                            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover/thumb:scale-110"
                            viewBox="0 0 80 80"
                            style={{ transform: "rotate(-90deg)" }}
                        >
                            <circle
                                cx="40" cy="40" r="37"
                                fill="none"
                                stroke={i === activeIndex ? "rgba(238,124,126,0.3)" : "rgba(255,255,255,0.1)"}
                                strokeWidth="3"
                            />
                            {i === activeIndex && (
                                <circle
                                    key={progressKey}
                                    cx="40" cy="40" r="37"
                                    fill="none"
                                    stroke="#ee7c7e"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray={RING_CIRCUMFERENCE}
                                    strokeDashoffset={RING_CIRCUMFERENCE}
                                    className="hero-ring-progress"
                                />
                            )}
                        </svg>

                        <button
                            onClick={() => goTo(i)}
                            className="relative overflow-hidden focus:outline-none cursor-pointer group-hover/thumb:scale-105 transition-transform duration-500 shadow-2xl"
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                background: "black",
                                border: i === activeIndex
                                    ? "3px solid #ee7c7e"
                                    : "2px solid rgba(255,255,255,0.2)",
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:block"
            >
                <div className="flex flex-col items-center gap-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 rotate-90 mb-8 origin-left">Scroll</p>
                    <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#ee7c7e] to-transparent" />
                </div>
            </motion.div>
        </section>
    )
}
