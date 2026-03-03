"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

const VIDEOS = [
    "/heroVideos/video5.mp4",
    "/heroVideos/video1.mp4",
    "/heroVideos/video2.mp4",
    "/heroVideos/video9.mp4",
]

const AUTO_ADVANCE_INTERVAL = 8000

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const thumbRefs = useRef<(HTMLVideoElement | null)[]>([])
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const clearTimers = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
    }

    const startProgress = useCallback(() => {
        setProgress(0)
        if (progressRef.current) clearInterval(progressRef.current)
        const step = 100 / (AUTO_ADVANCE_INTERVAL / 50)
        progressRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100
                return prev + step
            })
        }, 50)
    }, [])

    const goTo = useCallback((index: number) => {
        setActiveIndex(index)
        startProgress()
        clearTimers()
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % VIDEOS.length)
            startProgress()
        }, AUTO_ADVANCE_INTERVAL)
    }, [startProgress])

    useEffect(() => {
        startProgress()
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % VIDEOS.length)
            startProgress()
        }, AUTO_ADVANCE_INTERVAL)
        return clearTimers
    }, [startProgress])

    // Play/reset active main video
    useEffect(() => {
        const video = videoRefs.current[activeIndex]
        if (video) {
            video.currentTime = 0
            video.playbackRate = 1.5
            video.play().catch(() => {})
        }
    }, [activeIndex])

    // Keep thumbnail videos playing silently
    useEffect(() => {
        thumbRefs.current.forEach(v => {
            if (v) {
                v.playbackRate = 1.0
                v.play().catch(() => {})
            }
        })
    }, [])

    const handleScroll = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
    }

    return (
        <section className="w-full h-screen relative overflow-hidden">
            {VIDEOS.map((src, i) => (
                <video
                    key={src}
                    ref={el => { videoRefs.current[i] = el }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 1 : 0 }}
                    muted
                    playsInline
                    loop
                    preload={i === 0 ? "auto" : "metadata"}
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
                    Discover Azerbaijan Technical University
                </h1>

                <button
                    onClick={handleScroll}
                    className="flex items-center justify-between gap-3 bg-white text-black font-semibold px-5 py-3 md:px-6 md:py-3.5 rounded-lg hover:bg-gray-200 transition-all duration-300 w-fit"
                >
                    <span>Explore More</span>
                    <ArrowDownwardIcon fontSize="small" />
                </button>
            </div>

            {/* Video thumbnail indicators — right side */}
            <div
                className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center"
                style={{ zIndex: 3 }}
            >
                {VIDEOS.map((src, i) => (
                    <div
                        key={i}
                        className="relative flex items-center justify-center"
                        style={{ width: "80px", height: "80px" }}
                    >
                        {/* Animated progress ring — outside the clipped button */}
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
                                    cx="40" cy="40" r="37"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 37}`}
                                    strokeDashoffset={`${2 * Math.PI * 37 * (1 - progress / 100)}`}
                                    style={{ transition: "stroke-dashoffset 0.05s linear" }}
                                />
                            )}
                        </svg>

                        {/* Circular thumbnail button */}
                        <button
                            onClick={() => goTo(i)}
                            aria-label={`Switch to video ${i + 1}`}
                            className="relative overflow-hidden focus:outline-none"
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
                            {/* Thumbnail video */}
                            <video
                                ref={el => { thumbRefs.current[i] = el }}
                                className="absolute inset-0 w-full h-full object-cover"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                            >
                                <source src={src} type="video/mp4" />
                            </video>

                            {/* Dim overlay for inactive */}
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
