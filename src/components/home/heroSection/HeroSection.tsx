import { useEffect, useRef } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.5
        }
    }, [])

    const handleScroll = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
    }

    return (
        <section className="w-full h-screen relative overflow-hidden">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/aztu_intro.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute 
        bottom-10 left-6 
        sm:bottom-14 sm:left-10 
        md:bottom-16 md:left-16 
        text-white max-w-[90%] sm:max-w-[500px] md:max-w-[600px]"
            >
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 md:mb-6 leading-snug md:leading-tight">
                    Discover Azerbaijan Technical University
                </h1>

                <button
                    onClick={handleScroll}
                    className="flex items-center justify-between gap-3
          bg-white text-black font-semibold
          px-5 py-3 md:px-6 md:py-3.5
          rounded-lg hover:bg-gray-200
          transition-all duration-300
          w-fit"
                >
                    <span>Explore More</span>
                    <ArrowDownwardIcon fontSize="small" />
                </button>
            </div>
        </section>
    )
}
