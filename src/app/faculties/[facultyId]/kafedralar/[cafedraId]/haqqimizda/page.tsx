"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-48 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
    <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
  </div>;

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
        <SectionBlock title={lang === "az" ? "Kafedra haqqında" : "About Department"} accent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <SanitizedHtml html={cafedra.html_content} />
          </div>
        </SectionBlock>
      )}

      <SectionBlock title={lang === "az" ? "Bu bölmənin alt səhifələri" : "Sub-pages of this section"} accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-start gap-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 hover:border-[#ee7c7e] hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0 text-[#1a2355] dark:text-blue-400 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-colors">
                {page.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1a2355] dark:text-white text-sm mb-1">
                  {page.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {page.desc}
                </p>
              </div>
              <ChevronRightIcon
                sx={{ fontSize: 18 }}
                className="opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all mt-1"
              />
            </Link>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
