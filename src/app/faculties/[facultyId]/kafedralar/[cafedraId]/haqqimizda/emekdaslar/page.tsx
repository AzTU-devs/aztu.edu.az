"use client";

import { use, useEffect, useState } from "react";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffCard from "@/components/faculty/StaffCard";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { SearchBox, ResultCount, EmptyState } from "@/components/faculty/ui";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import { getImageUrl } from "@/services/facultyService/facultyService";
import type { CafedraDetail, Personnel } from "@/types/cafedra";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraEmekdaslarPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, currentLang)
      .then((result) => {
        setCafedra(result);
        setLoading(false);
      })
      .catch(() => {
        setCafedra(null);
        setLoading(false);
      });
  }, [cafedraId, currentLang]);

  if (!cafedra && !loading) return null;

  // Flatten all workers into one list to match faculty style, but we can also keep sections if it's better.
  // The user said "exactly same layout", and faculty has one big list.
  // However, cafedras have specialized categories. Let's combine them into one filtered list.
  const allWorkers: Personnel[] = [
    ...(cafedra?.deputy_directors ?? []),
    ...(cafedra?.workers ?? []),
    ...(cafedra?.scientific_council ?? [])
  ];

  // Remove duplicates based on ID or Full Name if necessary
  const uniqueWorkers = Array.from(new Map(allWorkers.map(item => [item.id, item])).values());

  const filtered = uniqueWorkers.filter((w) => {
    const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ").toLowerCase();
    const duty = (w.duty || w.scientific_title || w.scientific_degree || "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || duty.includes(q);
  });

  return (
    <div className="space-y-8">
      <StaffPageHeader
        icon={GroupIcon}
        eyebrow={currentLang === "az" ? "Akademik və inzibati heyət" : "Academic & administrative"}
        title={currentLang === "az" ? "Kafedra əməkdaşları" : "Department Staff"}
        description={
          currentLang === "az"
            ? "Kafedranın fəaliyyətində, tədris və elmi proseslərdə yaxından iştirak edən akademik və inzibati heyət haqqında məlumat."
            : "Information about the academic and administrative staff closely involved in the department's activities, teaching, and research processes."
        }
        stats={
          uniqueWorkers.length > 0
            ? [{ label: currentLang === "az" ? "Əməkdaş" : "Staff", value: uniqueWorkers.length, icon: GroupsIcon }]
            : undefined
        }
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-60 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
          ))}
        </div>
      ) : uniqueWorkers.length === 0 ? (
        <ComingSoon
          label={
            currentLang === "az"
              ? "Əməkdaşlar haqqında məlumat əlavə ediləcək"
              : "Information about staff will be added soon"
          }
        />
      ) : (
        <>
          <SearchBox
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
            placeholder={currentLang === "az" ? "Əməkdaş axtar..." : "Search staff member..."}
          />
          <ResultCount
            filtered={filtered.length}
            total={uniqueWorkers.length}
            showLabel={currentLang === "az" ? "Göstərilir" : "Showing"}
            ofLabel={currentLang === "az" ? "/" : "of"}
            onClear={search ? () => setSearch("") : undefined}
            clearLabel={currentLang === "az" ? "Sıfırla" : "Clear"}
          />

          {filtered.length === 0 ? (
            <EmptyState
              title={currentLang === "az" ? "Nəticə tapılmadı" : "No results found"}
              hint={
                currentLang === "az"
                  ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın."
                  : "Try a different keyword or clear the search."
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, index) => {
                const fullName = [p.first_name, p.last_name, p.father_name].filter(Boolean).join(" ");
                return (
                  <StaffCard
                    key={p.id}
                    fullName={fullName || (currentLang === "az" ? "Naməlum əməkdaş" : "Unknown")}
                    role={p.duty || p.scientific_title || undefined}
                    degree={p.scientific_degree || undefined}
                    photoUrl={getImageUrl(p.profile_image)}
                    email={p.email || undefined}
                    phone={p.phone || undefined}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
