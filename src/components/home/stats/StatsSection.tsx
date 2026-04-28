"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";
import { useTranslation } from "@/hooks/useTranslation";

interface Stat {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
}

const STAT_META = [
    { icon: SchoolIcon,       value: 6,     suffix: "" },
    { icon: MenuBookIcon,     value: 36,    suffix: "+" },
    { icon: MenuBookIcon,     value: 126,    suffix: "+" },
    { icon: GroupsIcon,       value: 10000, suffix: "+" },
    { icon: EmojiEventsIcon,  value: 1000,   suffix: "+" },
    { icon: PublicIcon,       value: 150,    suffix: "+" },
    { icon: ScienceIcon,      value: 100,   suffix: "+" },
];

function useCountUp(target: number, isInView: boolean, duration = 2000) {
    const [count, setCount] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isInView) return;

        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * target);
            
            setCount(currentCount);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, target, duration]);

    return count;
}

function StatCard({ stat, index, isInView }: { stat: Stat; index: number; isInView: boolean }) {
    const count = useCountUp(stat.value, isInView, 2000);
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 + index * 0.05 }}
            className="group relative flex flex-col items-center p-8 rounded-[2rem] bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 hover:border-[#ee7c7e]/30 transition-all duration-500 shadow-xl overflow-hidden"
        >
            {/* Animated hover highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon */}
            <div className="relative z-10 mb-6 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Icon sx={{ fontSize: 32, color: "rgba(255,255,255,0.9)" }} className="group-hover:text-[#ee7c7e] transition-colors" />
            </div>

            {/* Counter */}
            <div className="relative z-10 flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-black text-white leading-none tabular-nums tracking-tighter">
                    {count.toLocaleString()}
                </span>
                <span className="text-xl md:text-2xl font-black text-[#ee7c7e] leading-none">
                    {stat.suffix}
                </span>
            </div>

            {/* Labels */}
            <div className="relative z-10 text-center">
                <p className="text-white text-sm font-black uppercase tracking-[0.1em] mb-1">{stat.label}</p>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{stat.sublabel}</p>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ee7c7e] group-hover:w-1/2 transition-all duration-500" />
        </motion.div>
    );
}

export default function StatsSection() {
    const t = useTranslation();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    const stats: Stat[] = STAT_META.map((meta, i) => ({
        ...meta,
        label: t.stats.items[i]?.label || "",
        sublabel: t.stats.items[i]?.sublabel || "",
    }));

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0b1330] overflow-hidden py-24"
        >
            {/* BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dotted Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }}
                />
                
                {/* Glow Orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-[#1a2355] blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[80%] bg-[#ee7c7e]/10 blur-[120px] rounded-full" />
                
                {/* Brand Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-black text-white/[0.01] select-none tracking-tighter">
                    AZTU
                </div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-[40px] md:px-[80px] xl:px-[120px]">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                        <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">
                            {t.stats.sectionLabel}
                        </span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
                    >
                        {t.stats.sectionTitle}
                    </motion.h2>
                </div>

                {/* Stats Grid — all items in one row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            {/* Subtle top/bottom glow borders */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ee7c7e]/20 to-transparent" />
        </section>
    );
}
