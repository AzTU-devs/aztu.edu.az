"use client";

import { useState } from "react";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { CafedraEmployee } from "@/types/cafedra";
import SearchIcon from "@mui/icons-material/Search";

export default function CafedraEmekdaslarPage() {
  const employees: CafedraEmployee[] = [
    { id: 1, full_name: "Quliyev Rauf Əli oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Rauf+Quliyev&background=1a2355&color=fff&size=200&bold=true", email: "r.quliyev@aztu.edu.az" },
    { id: 2, full_name: "Nəsirov Vüsal Kamil oğlu", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Vusal+Nasirov&background=263238&color=fff&size=200&bold=true", email: "v.nasirov@aztu.edu.az" },
    { id: 3, full_name: "Həsənli Aytən Cavid qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Ayten+Hasanli&background=7b1fa2&color=fff&size=200&bold=true", email: "a.hasanli@aztu.edu.az" },
    { id: 4, full_name: "Cəfərov Mübariz Həsən oğlu", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Mubariz+Cafarov&background=1b5e20&color=fff&size=200&bold=true", email: "m.cafarov@aztu.edu.az" },
    { id: 5, full_name: "Qasımov Elnur Zakir oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Elnur+Qasimov&background=37474f&color=fff&size=200&bold=true", email: "e.qasimov@aztu.edu.az" },
    { id: 6, full_name: "Süleymanova Nigar Ramiz qızı", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Nigar+Suleymanova&background=880e4f&color=fff&size=200&bold=true", email: "n.suleymanova@aztu.edu.az" },
    { id: 7, full_name: "Hümbətova Fidan Elçin qızı", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Fidan+Humbatova&background=c62828&color=fff&size=200&bold=true", email: "f.humbatova@aztu.edu.az" },
    { id: 8, full_name: "Muradov Tərlan Zakir oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Tarlan+Muradov&background=1a3a5c&color=fff&size=200&bold=true", email: "t.muradov@aztu.edu.az" },
  ];
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
          Kafedranın əməkdaşları. Hər birinin adı üzərinə toxunduqda CV məlumatları
          xarici PDF formasında açıla bilər.
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
                />
              ))}
            </div>
          </>
        )}
      </SectionBlock>
    </div>
  );
}
