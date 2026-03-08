"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";

interface Stat {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
}

const stats: Stat[] = [
    {
        icon: SchoolIcon,
        value: 6,
        suffix: "",
        label: "Fakültə",
        sublabel: "Tədris fakültəsi",
    },
    {
        icon: MenuBookIcon,
        value: 50,
        suffix: "+",
        label: "İxtisas",
        sublabel: "Bakalavr & magistr",
    },
    {
        icon: GroupsIcon,
        value: 15000,
        suffix: "+",
        label: "Tələbə",
        sublabel: "Aktiv tələbə",
    },
    {
        icon: EmojiEventsIcon,
        value: 700,
        suffix: "+",
        label: "Müəllim",
        sublabel: "Akademik heyət",
    },
    {
        icon: PublicIcon,
        value: 40,
        suffix: "+",
        label: "Tərəfdaş",
        sublabel: "Beynəlxalq əməkdaşlıq",
    },
    {
        icon: ScienceIcon,
        value: 100,
        suffix: "+",
        label: "İllik Tarix",
        sublabel: "1920-ci ildən bəri",
    },
];

function useCountUp(target: number, isInView: boolean, duration = 1800) {
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!isInView || started.current) return;
        started.current = true;

        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            // ease-out curve
            const progress = 1 - Math.pow(1 - current / steps, 3);
            setCount(Math.round(progress * target));
            if (current >= steps) clearInterval(timer);
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return count;
}

function StatCard({ stat, index, isInView }: { stat: Stat; index: number; isInView: boolean }) {
    const count = useCountUp(stat.value, isInView, 1600 + index * 100);
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 + index * 0.08 }}
            className="group relative flex flex-col items-center text-center px-4 py-8"
        >
            {/* Vertical divider — hidden on mobile, first item has no left border */}
            {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/15" />
            )}

            {/* Icon */}
            <div className="mb-4 w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#ee7c7e]/20 group-hover:border-[#ee7c7e]/40 transition-all duration-300">
                <Icon sx={{ fontSize: 26, color: "rgba(255,255,255,0.85)" }} />
            </div>

            {/* Counter */}
            <div className="flex items-end justify-center gap-0.5 mb-1">
                <span className="text-4xl md:text-5xl font-extrabold text-white leading-none tabular-nums">
                    {count.toLocaleString()}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-[#ee7c7e] leading-none mb-0.5">
                    {stat.suffix}
                </span>
            </div>

            {/* Label */}
            <p className="text-white font-bold text-base mb-0.5">{stat.label}</p>
            <p className="text-white/50 text-xs font-medium">{stat.sublabel}</p>
        </motion.div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#1a2355] overflow-hidden py-4"
        >
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Glow blobs — kept inside bounds to avoid scroll bleed from blur filters */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#ee7c7e]/8 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            {/* Top label */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-center pt-10 pb-2 px-4"
            >
                <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.22em]">
                    AzTU Rəqəmlərlə
                </p>
                <h2 className="text-white text-2xl md:text-3xl font-bold mt-1">
                    Universitetimiz haqqında
                </h2>
            </motion.div>

            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-w-7xl mx-auto px-4 md:px-10 pb-8">
                {stats.map((stat, i) => (
                    <StatCard key={i} stat={stat} index={i} isInView={isInView} />
                ))}
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>
    );
}
