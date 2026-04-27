"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { useLanguage } from "@/context/LanguageContext";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
  eyebrow?: string;
  className?: string;
  children?: React.ReactNode;
  videoSrc?: string;
}

export default function PageHero({
  title,
  description,
  breadcrumbs,
  eyebrow,
  className = "",
  children,
  videoSrc,
}: PageHeroProps) {
  const { lang } = useLanguage();

  return (
    <div className={`relative overflow-hidden bg-[#0b1330] pt-44 pb-32 px-4 md:px-10 lg:px-20 w-full min-h-[500px] lg:min-h-[650px] flex flex-col justify-end ${className}`}>
      {/* STUNNING BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 z-0 bg-[#0b1330]">
        {/* Deep Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E]" />

        {videoSrc ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#0b1330]/40" />
          </>
        ) : (
          <>
            {/* Animated Light Beams */}
            <motion.div
                animate={{ x: [-500, 500], opacity: [0, 0.3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent skew-x-[-45deg] blur-sm"
            />
            <motion.div
                animate={{ x: [500, -500], opacity: [0, 0.2, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ee7c7e]/40 to-transparent skew-x-[45deg] blur-sm"
            />
          </>
        )}

        {/* Massive Glow Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#ee7c7e]/15 blur-[150px] rounded-full" />
        
        {/* Parallax Dust/Particles Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', 
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      {/* Main Content Wrap */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto">
        {/* Breadcrumbs with glass style */}
        <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-1.5">
                <HomeIcon sx={{ fontSize: 14 }} />
                Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                <ChevronRightIcon sx={{ fontSize: 12 }} />
                {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#ee7c7e] transition-colors">
                    {crumb.label}
                    </Link>
                ) : (
                    <span className="text-white/90">{crumb.label}</span>
                )}
                </div>
            ))}
          </div>
        </motion.nav>

        {eyebrow && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-0.5 bg-[#ee7c7e]" />
            <span className="text-[#ee7c7e] text-[11px] font-black uppercase tracking-[0.5em]">
                {eyebrow}
            </span>
          </motion.div>
        )}

        <div className="max-w-5xl">
            <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[0.9] tracking-tighter"
            >
                {title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-4 last:mr-0 last:text-transparent last:bg-clip-text last:bg-gradient-to-r last:from-white last:to-[#ee7c7e]">
                        {word}
                    </span>
                ))}
            </motion.h1>

            {description && (
            <motion.p 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white/60 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium border-l-2 border-[#ee7c7e] pl-10"
            >
                {description}
            </motion.p>
            )}
        </div>

        {children}
      </div>
      
      {/* Stunner: Glass light sweep divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent"
          />
      </div>
    </div>
  );
}
