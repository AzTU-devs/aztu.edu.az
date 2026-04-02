"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyByCode, FacultyDetail, FacultyPerson, getImageUrl } from "@/services/facultyService/facultyService";
import type { Lang } from "@/util/apiClient";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function AkademikHeyatPage({ params }: Props) {
  const { facultyId } = use(params);
  const searchParams = useSearchParams();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const workers: FacultyPerson[] = faculty?.workers ?? [];

  const filtered = workers.filter((w) => {
    const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ").toLowerCase();
    const scientific = (w.scientific_name ?? w.scientific_degree ?? "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || scientific.includes(q);
  });

  return (
    <div className="space-y-6">
      <SectionBlock title="Akademik heyət" accent>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-gray-200 dark:bg-slate-700 h-40" />
            ))}
          </div>
        ) : workers.length === 0 ? (
          <ComingSoon label="Akademik heyət haqqında məlumat əlavə ediləcək" />
        ) : (
          <>
            <div className="relative mb-6">
              <SearchIcon
                sx={{ fontSize: 20, color: "#9ca3af" }}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Ad, soyad və ya elmi ad üzrə axtar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2355]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((w, index) => {
                const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ");
                return (
                  <PersonCard
                    key={index}
                    fullName={fullName || "Naməlum əməkdaş"}
                    title={w.scientific_name ?? w.duty ?? w.position}
                    academicDegree={w.scientific_degree}
                    photoUrl={getImageUrl(w.profile_image)}
                    email={w.email}
                  />
                );
              })}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-gray-400 dark:text-slate-500 py-10 text-sm">
                Axtarışa uyğun nəticə tapılmadı
              </p>
            )}
          </>
        )}
      </SectionBlock>
    </div>
  );
}
