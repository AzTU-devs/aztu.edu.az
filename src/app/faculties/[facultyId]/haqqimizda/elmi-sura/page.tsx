"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyByCode, FacultyDetail, FacultyPerson } from "@/services/facultyService/facultyService";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function ElmiSuraPage({ params }: Props) {
  const { facultyId } = use(params);
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
    getFacultyByCode(facultyId, currentLang)
      .then((result) => {
        setFaculty(result);
        setLoading(false);
      })
      .catch(() => {
        setFaculty(null);
        setLoading(false);
      });
  }, [facultyId, currentLang]);

  const members: FacultyPerson[] = faculty?.scientific_council ?? [];

  return (
    <div className="space-y-6">
      <SectionBlock title="Fakültə elmi şurası" accent>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded bg-gray-200 dark:bg-slate-700" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <ComingSoon label="Elmi şura üzvləri haqqında məlumat əlavə ediləcək" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-600">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    №
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Soyadı, adı, ata adı
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Vəzifəsi
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => {
                  const fullName = [m.last_name, m.first_name, m.father_name].filter(Boolean).join(" ");
                  return (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-500 dark:text-slate-400 font-medium">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 text-[#1a2355] dark:text-white font-semibold">
                        {fullName || "—"}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {m.duty || m.position || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
