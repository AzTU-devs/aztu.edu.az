"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function ElmiSuraPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const searchParams = useSearchParams();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const currentLang = ((): Lang => {
    const queryLang = searchParams?.get("lang");
    if (queryLang === "az" || queryLang === "en") {
      return queryLang;
    }
    return typeof navigator !== "undefined" && navigator.language?.startsWith("az") ? "az" : "en";
  })();

  useEffect(() => {
    setLoading(true);
    getFacultyBySlug(facultySlug, currentLang)
      .then((result) => {
        setFaculty(result);
        setLoading(false);
      })
      .catch(() => {
        setFaculty(null);
        setLoading(false);
      });
  }, [facultySlug, currentLang]);

  const members: PersonnelItem[] = faculty?.scientific_council ?? [];

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Fakültə elmi şurası" : "Faculty Scientific Council"} accent>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-gray-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Elmi şura üzvləri haqqında məlumat əlavə ediləcək" : "Information about scientific council members will be added soon"} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700/50">
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1a2355] dark:text-blue-300">
                      №
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1a2355] dark:text-blue-300">
                      {currentLang === "az" ? "Soyadı, adı, ata adı" : "Full Name"}
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-[#1a2355] dark:text-blue-300">
                      {currentLang === "az" ? "Vəzifəsi" : "Duty / Position"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {members.map((m, idx) => {
                    const fullName = [m.last_name, m.first_name, m.father_name].filter(Boolean).join(" ");
                    return (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="py-4 px-6 text-gray-400 font-mono text-xs">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-[#1a2355] dark:text-white block">{fullName || "—"}</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{m.scientific_degree}</span>
                        </td>
                        <td className="py-4 px-6">
                           <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#1a2355] dark:text-blue-300 text-xs font-bold">
                             {m.duty || m.scientific_name || "—"}
                           </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </SectionBlock>
    </div>
  );
}
