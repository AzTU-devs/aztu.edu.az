"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useTranslation } from "@/hooks/useTranslation"

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

    // Try to fetch the active hero video from API
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

    // Only play the active video; pause all others
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

    // Play thumbnail videos once on mount (they are small 64px circles)
    useEffect(() => {
        thumbRefs.current.forEach(v => { if (v) v.play().catch(() => {}) })
    }, [videos])

    const goTo = useCallback((index: number) => {
        setActiveIndex(index)
        setProgressKey(k => k + 1)
        startAutoAdvance()
    }, [startAutoAdvance])

    const handleScroll = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
    }

    return (
        <section className="w-full h-screen relative overflow-hidden">
            {/* CSS-driven progress ring — no JS timers touching React state */}
            <style>{`
                @keyframes hero-ring {
                    from { stroke-dashoffset: ${RING_CIRCUMFERENCE}; }
                    to   { stroke-dashoffset: 0; }
                }
                .hero-ring-progress {
                    animation: hero-ring ${AUTO_ADVANCE_INTERVAL}ms linear forwards;
                }
            `}</style>

            {videos.map((src, i) => (
                <video
                    key={src}
                    ref={el => { videoRefs.current[i] = el }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{
                        opacity: i === activeIndex ? 1 : 0,
                        zIndex: i === activeIndex ? 1 : 0,
                        willChange: "opacity",
                    }}
                    muted
                    playsInline
                    loop
                    preload={i === 0 ? "auto" : "none"}
                >
                    <source src={src} type="video/mp4" />
                </video>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />

            {/* Content */}
            <div
                className="absolute bottom-10 left-6 sm:bottom-14 sm:left-10 md:bottom-16 md:left-16 text-white max-w-[90%] sm:max-w-[500px] md:max-w-[600px]"
                style={{ zIndex: 3 }}
            >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 md:mb-6 leading-snug md:leading-tight">
                    {t.hero.title}
                </h1>

                <button
                    onClick={handleScroll}
                    className="flex items-center justify-between gap-3 bg-white text-black font-semibold px-5 py-3 md:px-6 md:py-3.5 rounded-lg hover:bg-gray-200 transition-all duration-300 w-fit cursor-pointer"
                >
                    <span>{t.hero.button}</span>
                    <ArrowDownwardIcon fontSize="small" />
                </button>
            </div>

            {/* Video thumbnail indicators — right side */}
            <div
                className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center"
                style={{ zIndex: 3 }}
            >
                {videos.map((src, i) => (
                    <div
                        key={i}
                        className="relative flex items-center justify-center"
                        style={{ width: "80px", height: "80px" }}
                    >
                        {/* Progress ring — animated purely via CSS, no setInterval */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 80 80"
                            style={{ transform: "rotate(-90deg)" }}
                        >
                            <circle
                                cx="40" cy="40" r="37"
                                fill="none"
                                stroke={i === activeIndex ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}
                                strokeWidth="2"
                            />
                            {i === activeIndex && (
                                <circle
                                    key={progressKey}
                                    cx="40" cy="40" r="37"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={RING_CIRCUMFERENCE}
                                    strokeDashoffset={RING_CIRCUMFERENCE}
                                    className="hero-ring-progress"
                                />
                            )}
                        </svg>

                        {/* Circular thumbnail button */}
                        <button
                            onClick={() => goTo(i)}
                            aria-label={t.hero.videoAriaLabel(i + 1)}
                            className="relative overflow-hidden focus:outline-none cursor-pointer"
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "black",
                                border: i === activeIndex
                                    ? "2px solid rgba(255,255,255,0.85)"
                                    : "2px solid rgba(255,255,255,0.2)",
                                transform: i === activeIndex ? "scale(1.06)" : "scale(1)",
                                transition: "border-color 0.3s ease, transform 0.3s ease",
                                flexShrink: 0,
                            }}
                        >
                            <video
                                ref={el => { thumbRefs.current[i] = el }}
                                className="absolute inset-0 w-full h-full object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                            >
                                <source src={LOCAL_VIDEOS[i % LOCAL_VIDEOS.length]} type="video/mp4" />
                            </video>

                            <div
                                className="absolute inset-0 transition-opacity duration-300"
                                style={{
                                    backgroundColor: i === activeIndex ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.55)",
                                }}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}
