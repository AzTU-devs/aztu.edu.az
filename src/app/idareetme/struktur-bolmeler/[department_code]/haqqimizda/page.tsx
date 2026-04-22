"use client";

import { use, useEffect, useState } from "react";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import SectionBlock from "@/components/shared/SectionBlock";
import { getDepartmentBySlug } from "@/services/departmentService/departmentService";
import type { SectionItem, DepartmentDetail } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";
import Loading from "@/components/loading/Loading";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
  params: Promise<{ department_code: string }>;
}

export default function DepartmentAboutPage({ params }: Props) {
  const { department_code: departmentSlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);

  useEffect(() => {
    getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
  }, [departmentSlug, currentLang]);

  if (department === undefined) return <Loading />;
  if (department === null) return null;

  const t = {
    about: currentLang === "az" ? "Şöbə haqqında" : "About Department",
    objectives: currentLang === "az" ? "Məqsədlər" : "Objectives",
    functions: currentLang === "az" ? "Əsas Funksiyalar" : "Core Functions",
  };

  const objectives = department.objectives || [];
  const functions = department.core_functions || [];

  return (
    <div className="space-y-12">
      {/* About Section */}
      <SectionBlock title={t.about} accent>
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <SanitizedHtml
            html={department.about_html}
            className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg text-justify w-full"
          />
        </div>
      </SectionBlock>

      {/* Objectives and Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {objectives.length > 0 && (
          <SectionBlock title={t.objectives} accent>
            <ul className="space-y-4">
              {objectives.map((obj: SectionItem, idx: number) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] flex-shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                    <FlagIcon sx={{ fontSize: 16 }} />
                  </div>
                  <div className="text-gray-600 dark:text-slate-300 text-sm pt-1.5 leading-relaxed font-medium flex-1">
                    {typeof obj === "string" ? (
                      obj
                    ) : obj.html_content ? (
                      <SanitizedHtml html={obj.html_content} className="prose-sm" />
                    ) : (
                      obj.title || obj.description
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}

        {functions.length > 0 && (
          <SectionBlock title={t.functions} accent>
            <ul className="space-y-4">
              {functions.map((func: SectionItem, idx: number) => (
                <li key={idx} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 flex-shrink-0 group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                    <SettingsIcon sx={{ fontSize: 16 }} />
                  </div>
                  <div className="text-gray-600 dark:text-slate-300 text-sm pt-1.5 leading-relaxed font-medium flex-1">
                    {typeof func === "string" ? (
                      func
                    ) : func.html_content ? (
                      <SanitizedHtml html={func.html_content} className="prose-sm" />
                    ) : (
                      func.title || func.description
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
