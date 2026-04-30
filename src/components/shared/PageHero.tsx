"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const isStudentPage = pathname.startsWith("/az/telebeler") || pathname.startsWith("/en/students");
  const studentVideoSrc = "http://api.aztu.edu.az/media/prod/hero/hero_videos/students.mp4";

  const finalVideoSrc = videoSrc || (isStudentPage ? studentVideoSrc : undefined);

  return (
    <div className={`relative overflow-hidden bg-[#0a0c1a] pt-32 pb-20 px-4 md:px-10 lg:px-20 w-full min-h-[400px] lg:min-h-[500px] flex flex-col justify-end ${className}`}>
      {/* STUNNING BACKGROUND GRAPHICS - REFINED TINT */}
      <div className="absolute inset-0 z-0 bg-[#0a0c1a]">
        {/* Neutral-leaning Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />

        {finalVideoSrc ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            >
              <source src={finalVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#0a0c1a]/50" />
          </>
        ) : (
          <>
            {/* Animated Light Beams */}
            <motion.div
                animate={{ x: [-500, 500], opacity: [0, 0.3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#ee7c7e]/30 to-transparent skew-x-[-45deg] blur-md"
            />
            <motion.div
                animate={{ x: [500, -500], opacity: [0, 0.2, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent skew-x-[45deg] blur-md"
            />
          </>
        )}

        {/* Subtle Glow Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-900/20 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#ee7c7e]/10 blur-[180px] rounded-full" style={{ animationDelay: '2s' }} />
        
        {/* Parallax Dust/Particles Overlay */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', 
               backgroundSize: '50px 50px' 
             }} 
        />
      </div>

      {/* Main Content Wrap */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto">
        {/* Breadcrumbs with glass style */}
        <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-2xl border-2 border-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
            <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-2">
                <HomeIcon sx={{ fontSize: 14 }} />
                Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                <ChevronRightIcon sx={{ fontSize: 12 }} className="text-[#ee7c7e]" />
                {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#ee7c7e] transition-colors">
                    {crumb.label}
                    </Link>
                ) : (
                    <span className="text-white font-black">{crumb.label}</span>
                )}
                </div>
            ))}
          </div>
        </motion.nav>

        {eyebrow && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-[#ee7c7e] to-transparent rounded-full shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
            <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.6em] drop-shadow-sm">
                {eyebrow}
            </span>
          </motion.div>
        )}

        <div className="max-w-4xl">
            <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                {title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-4 md:mr-6 last:mr-0 last:text-transparent last:bg-clip-text last:bg-gradient-to-br last:from-white last:to-[#ee7c7e]">
                        {word}
                    </span>
                ))}
            </motion.h1>

            {description && (
            <motion.p 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed font-bold border-l-4 border-[#ee7c7e] pl-8 drop-shadow-md"
            >
                {description}
            </motion.p>
            )}
        </div>

        {children}
      </div>
      
      {/* Stunner: Glass light sweep divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-80 shadow-[0_0_20px_#ee7c7e]"
          />
      </div>
    </div>
  );
}
