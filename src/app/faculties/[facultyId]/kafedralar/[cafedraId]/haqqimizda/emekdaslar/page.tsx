"use client";

import { use, useState } from "react";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { getCafedraEmployees } from "@/data/staticFaculties";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraEmekdaslarPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const employees = getCafedraEmployees(Number(cafedraId));
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (e) =>
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SectionBlock title="Əməkdaşlar" accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Kafedranın əməkdaşları. Ətraflı məlumat üçün əməkdaşın kartına klikləyin.
        </p>

        {employees.length === 0 ? (
          <ComingSoon label="Əməkdaşlar haqqında məlumat əlavə ediləcək" />
        ) : (
          <>
            <div className="relative mb-6">
              <SearchIcon
                sx={{ fontSize: 20, color: "#9ca3af" }}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Ad, soyad və ya vəzifə üzrə axtar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2355]/20"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((emp) => (
                <PersonCard
                  key={emp.id}
                  fullName={emp.full_name}
                  title={emp.position}
                  academicDegree={emp.academic_degree}
                  photoUrl={emp.photo_url}
                  cvUrl={emp.cv_url}
                  email={emp.email}
                  size="sm"
                  href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar/${emp.id}`}
                />
              ))}
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
