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

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

  const isStudentPage = pathname.startsWith("/az/telebeler") || pathname.startsWith("/en/students");
  const isAboutPage = pathname.startsWith("/az/haqqimizda") || pathname.startsWith("/en/about");
  const isAcademicPage = pathname.startsWith("/az/akademik") || pathname.startsWith("/en/academic");
  const isManagementPage = pathname.startsWith("/az/idareetme") || pathname.startsWith("/en/management");

  const studentVideoSrc = "http://api.aztu.edu.az/media/prod/hero/hero_videos/students.mp4";
  const aboutVideoSrc = `${API_BASE}/media/prod/hero/hero_videos/about.mp4`;
  const academicVideoSrc = `${API_BASE}/media/prod/hero/hero_videos/academic.mp4`;
  const managementVideoSrc = `${API_BASE}/media/prod/hero/hero_videos/management.mp4`;

  const finalVideoSrc = videoSrc
    || (isAboutPage ? aboutVideoSrc : undefined)
    || (isAcademicPage ? academicVideoSrc : undefined)
    || (isManagementPage ? managementVideoSrc : undefined)
    || (isStudentPage ? studentVideoSrc : undefined);

  return (
    <div className={`relative overflow-hidden bg-[#0a0c1a] pt-32 pb-16 w-full min-h-[340px] lg:min-h-[420px] flex flex-col justify-end ${className}`}>
      {/* Hero canvas — a single calm gradient, or the section video. */}
      <div className="absolute inset-0 z-0 bg-[#0a0c1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#131a35] to-[#0f172a]" />

        {finalVideoSrc && (
          <>
            <video
              key={finalVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={finalVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#0a0c1a]/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c1a]/20 via-transparent to-[#0a0c1a]/80" />
          </>
        )}
      </div>

      {/* Main Content Wrap */}
      <div className="relative z-20 shell">
        {/* Breadcrumbs */}
        <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-7 text-[12px] font-medium text-white/55"
        >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                <HomeIcon sx={{ fontSize: 14 }} />
                Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/25" />
                {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                    </Link>
                ) : (
                    <span className="text-white">{crumb.label}</span>
                )}
                </div>
            ))}
        </motion.nav>

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-6 h-px bg-[#ee7c7e]" />
            <span className="text-[#ee7c7e] text-[11px] font-semibold uppercase tracking-[0.18em]">
                {eyebrow}
            </span>
          </motion.div>
        )}

        {/* The hero title is the LCP element on every page — render it
            statically rather than fading it in from opacity 0. */}
        <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white mb-6 leading-[1.05] tracking-[-0.035em]">
                {title}
            </h1>

            {description && (
            <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed font-normal">
                {description}
            </p>
            )}
        </div>

        {children}
      </div>
    </div>
  );
}
