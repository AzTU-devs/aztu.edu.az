"use client";

import Link from "next/link";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, type Variants } from "framer-motion";
import type { DepartmentSummary } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";
import { slugify } from "@/util/slugify";

interface DepartmentCardProps {
  department: DepartmentSummary;
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: "easeOut" as const },
  }),
};

export default function DepartmentCard({ department, index }: DepartmentCardProps) {
  const { lang } = useLanguage();
  const slug = slugify(department.department_name);
  
  const path = lang === "az"
    ? `/az/idareetme/struktur-bolmeler/${slug}/haqqimizda`
    : `/en/management/structural-units/${slug}/about`;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <Link
        href={path}
        className="group relative h-full bg-white dark:bg-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-700/50 transition-all duration-500 overflow-hidden block"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a2355]/5 dark:bg-white/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-[3] group-hover:bg-[#1a2355]/10 pointer-events-none" />

        {/* Icon & Code Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:scale-110 shadow-sm">
            <BusinessIcon 
              sx={{ 
                fontSize: 28, 
                color: "#1a2355",
                transition: "color 0.5s ease" 
              }} 
              className="group-hover:!text-white"
            />
          </div>
          <span className="text-[10px] font-black tracking-widest text-[#1a2355]/40 dark:text-blue-300/40 uppercase bg-gray-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-600 group-hover:bg-white group-hover:text-[#1a2355] transition-all duration-500">
            {department.department_code}
          </span>
        </div>

        {/* Name and Content */}
        <div className="relative z-10 space-y-3">
          <h2 className="text-xl md:text-2xl font-black text-[#1a2355] dark:text-white leading-[1.2] transition-colors duration-300 group-hover:text-[#1a2355] dark:group-hover:text-white">
            {department.department_name}
          </h2>
          <div className="w-8 h-1 bg-[#ee7c7e]/30 group-hover:w-16 transition-all duration-500" />
        </div>

        {/* CTA Footer */}
        <div className="mt-auto pt-6 flex items-center justify-between relative z-10">
          <span className="text-sm font-bold text-[#1a2355]/60 dark:text-blue-400/60 uppercase tracking-wider group-hover:text-[#ee7c7e] transition-colors duration-300">
            {lang === "az" ? "Məlumat" : "Info"}
          </span>
          <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center transition-all duration-500 group-hover:bg-[#1a2355] group-hover:translate-x-1 shadow-sm">
            <ArrowForwardIcon 
              sx={{ fontSize: 18, color: "#1a2355" }} 
              className="group-hover:!text-white transition-all duration-300"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
