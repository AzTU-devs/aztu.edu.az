"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import PersonCard from "@/components/shared/PersonCard";
import { getFacultyByCode, FacultyDetail, getImageUrl } from "@/services/facultyService/facultyService";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function DekanMuavinleriPage({ params }: Props) {
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

  const deputyDeans = faculty?.deputy_deans ?? [];

  return (
    <div className="space-y-6">
      <SectionBlock title="Dekan müavinləri" accent>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#1a2355] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : deputyDeans.length === 0 ? (
          <ComingSoon label="Dekan müavinləri haqqında məlumat əlavə ediləcək" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deputyDeans.map((vd, index) => {
              const fullName = [vd.first_name, vd.last_name, vd.father_name].filter(Boolean).join(" ");
              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-gray-100 dark:border-slate-600"
                >
                  <PersonCard
                    fullName={fullName || "Naməlum əməkdaş"}
                    title={vd.duty || vd.scientific_name || vd.scientific_title || vd.position}
                    academicDegree={vd.scientific_degree}
                    photoUrl={getImageUrl(vd.profile_image)}
                    email={vd.email}
                    phone={vd.phone}
                  />
                  {vd.duty && (
                    <p className="mt-3 text-xs text-center text-[#ee7c7e] font-semibold">
                      {vd.duty}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
