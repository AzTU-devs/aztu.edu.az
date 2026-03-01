"use client";

import { use } from "react";
import Link from "next/link";
import { getCafedraById } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraHaqqimizdaPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const cafedra = getCafedraById(Number(cafedraId));

  const subPages = [
    {
      label: "Kafedra müdiri",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/kafedra-mudiri`,
      icon: <PersonIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedra müdiri haqqında ətraflı məlumat",
    },
    {
      label: "Əməkdaşlar",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar`,
      icon: <GroupIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedranın bütün əməkdaşları",
    },
    {
      label: "Xəbərlər",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/xeberler`,
      icon: <ArticleIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedranın son xəbərləri və elanları",
    },
    {
      label: "Əlaqə",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/elaqe`,
      icon: <PhoneIcon sx={{ color: "#1a2355" }} />,
      desc: "Əlaqə məlumatları",
    },
  ];

  return (
    <div className="space-y-6">
      {cafedra && (
        <SectionBlock title="Kafedra haqqında" accent>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {cafedra.description}
          </p>
        </SectionBlock>
      )}

      <SectionBlock title="Bu bölmənin alt səhifələri" accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-start gap-4 bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600 rounded-2xl p-5 hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0">
                {page.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1a2355] dark:text-white text-sm mb-1">
                  {page.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {page.desc}
                </p>
              </div>
              <ChevronRightIcon
                sx={{ fontSize: 18, color: "#1a2355" }}
                className="opacity-30 group-hover:opacity-70 transition-opacity mt-1"
              />
            </Link>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
