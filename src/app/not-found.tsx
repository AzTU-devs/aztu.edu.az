"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AzTULogo from "@/../public/logo/aztu-logo-light.png";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] flex flex-col items-center justify-center relative overflow-hidden px-4">

            {/* Decorative ambient circles */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/4 blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ee7c7e]/8 blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/2 blur-3xl pointer-events-none"
            />

            {/* Ghost 404 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute select-none pointer-events-none"
                aria-hidden
            >
                <span className="text-[200px] md:text-[280px] font-black text-white/[0.06] leading-none">
                    404
                </span>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg gap-5">

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.25em]"
                >
                    Page Not Found
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold text-white leading-tight"
                >
                    Oops! This page doesn&apos;t exist.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.4 }}
                    className="text-white/55 text-base leading-relaxed"
                >
                    The page you&apos;re looking for may have been moved, renamed, or removed. Let&apos;s get you back on track.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3 mt-2"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-[#1a2355] font-bold px-7 py-3 rounded-xl hover:bg-white/90 transition-colors duration-200 shadow-lg"
                    >
                        <HomeIcon sx={{ fontSize: 20 }} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition-colors duration-200 border border-white/15"
                    >
                        <ArrowBackIcon sx={{ fontSize: 20 }} />
                        Go Back
                    </button>
                </motion.div>

                {/* Quick links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4"
                >
                    {[
                        { label: "About", href: "/about" },
                        { label: "News", href: "/news" },
                        { label: "Vision", href: "/about/vision" },
                        { label: "History", href: "/about/history" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200 underline underline-offset-4 decoration-white/20"
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Logo watermark */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute bottom-8 opacity-30"
            >
                <Image src={AzTULogo} alt="AzTU" width={72} priority />
            </motion.div>
        </div>
    );
}
