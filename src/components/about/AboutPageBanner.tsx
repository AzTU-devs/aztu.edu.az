"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Crumb {
    label: string;
    href?: string;
}

interface AboutPageBannerProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    breadcrumbs: Crumb[];
}

export default function AboutPageBanner({ eyebrow, title, subtitle, breadcrumbs }: AboutPageBannerProps) {
    return (
        <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-40 pb-16 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/3 pointer-events-none" />

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                    <HomeIcon sx={{ fontSize: 15 }} />
                    Home
                </Link>
                {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        {crumb.href ? (
                            <Link href={crumb.href} className="hover:text-white transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-white/80">{crumb.label}</span>
                        )}
                    </span>
                ))}
            </nav>

            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-3"
                >
                    {eyebrow}
                </motion.p>
            )}

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
                {title}
            </motion.h1>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.16 }}
                    className="text-white/70 text-base max-w-2xl leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
