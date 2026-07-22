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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.05 + index * 0.05 }}
            className="group relative w-full flex flex-col items-center text-center px-5 py-8"
        >
            {/* Icon */}
            <div className="mb-5 w-11 h-11 rounded-full border border-[var(--line-strong)] flex items-center justify-center transition-colors duration-500 group-hover:border-[#ee7c7e]/40 group-hover:bg-[#ee7c7e]/5">
                <Icon sx={{ fontSize: 20 }} className="text-[var(--ink-subtle)] group-hover:text-[#ee7c7e] transition-colors duration-500" />
            </div>

            {/* Counter */}
            <div className="flex items-baseline justify-center gap-0.5 mb-3 whitespace-nowrap">
                <span className="text-4xl lg:text-[2.75rem] font-semibold text-[var(--ink)] leading-none tabular-nums tracking-[-0.04em]">
                    {count.toLocaleString()}
                </span>
                <span className="text-xl font-semibold text-[#ee7c7e] leading-none">
                    {stat.suffix}
                </span>
            </div>

            {/* Labels */}
            <p className="text-[var(--ink)] text-[13px] font-semibold leading-snug mb-1.5">{stat.label}</p>
            <p className="text-[var(--ink-subtle)] text-[11px] font-medium leading-snug">{stat.sublabel}</p>
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
            className="relative section-padding"
        >
            <div className="shell !px-0">
                {/* Section Header */}
                <div className="mb-14 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-5"
                    >
                        <span className="w-6 h-px bg-[#ee7c7e]" />
                        <span className="eyebrow">{t.stats.sectionLabel}</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="section-title"
                    >
                        {t.stats.sectionTitle}
                    </motion.h2>
                </div>

                {/* Stats grid — hairline-divided cells on the white canvas */}
                <div className="surface-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 overflow-hidden !p-0">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="border-r border-b border-[var(--line)] flex -mr-px -mb-px"
                        >
                            <StatCard stat={stat} index={i} isInView={isInView} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
