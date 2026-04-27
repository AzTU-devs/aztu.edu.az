"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
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
    videoSrc?: string;
}

export default function AboutPageBanner({ eyebrow, title, subtitle, breadcrumbs, videoSrc }: AboutPageBannerProps) {
    const pathname = usePathname();
    
    const isResearchPage = pathname.startsWith('/az/tedqiqat') || pathname.startsWith('/en/research');
    const finalVideoSrc = videoSrc || (isResearchPage ? "/heroBgVideos/research.mp4" : null);

    return (
        <div className="bg-[#0b1330] px-4 md:px-10 lg:px-20 pt-44 pb-20 relative overflow-hidden min-h-[450px] flex flex-col justify-end">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" 
                 style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Video Background */}
            {finalVideoSrc && (
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-50"
                    >
                        <source src={finalVideoSrc} type="video/mp4" />
                    </video>
                    {/* Multi-layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330]/80 via-transparent to-transparent" />
                </div>
            )}

            {!finalVideoSrc && (
                 <div className="absolute inset-0 bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ee7c7e]/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
                 </div>
            )}

            {/* Decorative Glass Elements */}
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none z-10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/3 pointer-events-none z-10 blur-2xl" />

            <div className="relative z-20">
                {/* Breadcrumb */}
                <motion.nav 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex-wrap"
                >
                    <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-2 group">
                        <HomeIcon sx={{ fontSize: 14 }} className="group-hover:scale-110 transition-transform" />
                        Home
                    </Link>
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} className="flex items-center gap-2">
                            <ChevronRightIcon sx={{ fontSize: 12 }} />
                            {crumb.href ? (
                                <Link href={crumb.href} className="hover:text-white transition-colors">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-white/90">{crumb.label}</span>
                            )}
                        </span>
                    ))}
                </motion.nav>

                {eyebrow && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                        <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">
                            {eyebrow}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed font-medium border-l-4 border-[#ee7c7e]/40 pl-8"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ee7c7e]/30 to-transparent" />
        </div>
    );
}
