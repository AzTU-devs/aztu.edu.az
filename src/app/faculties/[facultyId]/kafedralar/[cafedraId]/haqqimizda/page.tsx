"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { FacultyPanel, FACULTY_PALETTES } from "@/components/faculty/ui";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { useLanguage } from "@/context/LanguageContext";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraHaqqimizdaPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const { lang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, lang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, lang]);

  if (loading)
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
          ))}
        </div>
      </div>
    );

  const baseHref = `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda`;

  const subPages = [
    {
      label: lang === "az" ? "Kafedra müdiri" : "Head of Department",
      href: `${baseHref}/kafedra-mudiri`,
      icon: <PersonIcon />,
      desc: lang === "az" ? "Kafedra müdiri haqqında ətraflı məlumat" : "Details about the head of department",
    },
    {
      label: lang === "az" ? "Əməkdaşlar" : "Staff",
      href: `${baseHref}/emekdaslar`,
      icon: <GroupIcon />,
      desc: lang === "az" ? "Kafedranın bütün əməkdaşları" : "All employees of the department",
    },
    {
      label: lang === "az" ? "Xəbərlər" : "News",
      href: `${baseHref}/xeberler`,
      icon: <ArticleIcon />,
      desc: lang === "az" ? "Kafedranın son xəbərləri və elanları" : "Latest news and announcements",
    },
    {
      label: lang === "az" ? "Əlaqə" : "Contact",
      href: `${baseHref}/elaqe`,
      icon: <PhoneIcon />,
      desc: lang === "az" ? "Əlaqə məlumatları" : "Contact information",
    },
  ];

  return (
    <div className="space-y-6">
      {cafedra?.html_content && (
        <FacultyPanel
          icon={InfoOutlinedIcon}
          eyebrow={lang === "az" ? "Ümumi məlumat" : "Overview"}
          title={lang === "az" ? "Kafedra haqqında" : "About Department"}
        >
          <div className="prose prose-sm max-w-none text-slate-600 dark:prose-invert dark:text-slate-300">
            <SanitizedHtml html={cafedra.html_content} />
          </div>
        </FacultyPanel>
      )}

      <FacultyPanel
        icon={GridViewIcon}
        eyebrow={lang === "az" ? "Naviqasiya" : "Navigation"}
        title={lang === "az" ? "Bu bölmənin alt səhifələri" : "Sub-pages of this section"}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {subPages.map((page, i) => {
            const palette = FACULTY_PALETTES[i % FACULTY_PALETTES.length];
            return (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link
                  href={page.href}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${palette.tint}`}>
                    {page.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                      {page.label}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {page.desc}
                    </p>
                  </div>
                  <ArrowForwardIcon
                    sx={{ fontSize: 18 }}
                    className="mt-1 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-[#ee7c7e] dark:text-slate-600"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </FacultyPanel>
    </div>
  );
}
