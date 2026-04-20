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
}

export default function PageHero({
  title,
  description,
  breadcrumbs,
  eyebrow,
  className = "",
  children,
}: PageHeroProps) {
  const { lang } = useLanguage();

  return (
    <div className={`relative overflow-hidden bg-[#0b1330] pt-44 pb-24 px-4 md:px-10 lg:px-20 w-full min-h-[450px] lg:min-h-[550px] flex flex-col justify-end ${className}`}>
      {/* Background Graphics */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ee7c7e]/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        {/* Animated accent circle */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-20 w-full max-w-[1600px] mx-auto">
        {/* Breadcrumbs */}
        <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
        >
          <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-1">
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
        </motion.nav>

        {eyebrow && (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter"
        >
            {title}
        </motion.h1>

        {description && (
          <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed font-medium border-l-4 border-[#ee7c7e]/40 pl-8"
          >
              {description}
          </motion.p>
        )}

        {children}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ee7c7e]/30 to-transparent z-20" />
    </div>
  );
}
