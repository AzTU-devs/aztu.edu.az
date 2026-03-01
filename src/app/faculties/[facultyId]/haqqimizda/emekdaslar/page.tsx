"use client";

import { useState } from "react";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { Employee } from "@/types/faculty";
import SearchIcon from "@mui/icons-material/Search";

export default function EmekdaslarPage() {
  // When API is ready, fetch employees here
  const employees: Employee[] = [
    { id: 1, full_name: "Rzayeva Aynur Sabir qızı", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Aynur+Rzayeva&background=ee7c7e&color=fff&size=200&bold=true", email: "a.rzayeva@aztu.edu.az" },
    { id: 2, full_name: "Muradov Tərlan Zakir oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Tarlan+Muradov&background=1a2355&color=fff&size=200&bold=true", email: "t.muradov@aztu.edu.az" },
    { id: 3, full_name: "Hümbətova Fidan Elçin qızı", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Fidan+Humbatova&background=c62828&color=fff&size=200&bold=true", email: "f.humbatova@aztu.edu.az" },
    { id: 4, full_name: "Mustafayev Rauf Elnur oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Rauf+Mustafayev&background=283593&color=fff&size=200&bold=true", email: "r.mustafayev@aztu.edu.az" },
    { id: 5, full_name: "Əhmədova Günel Vasif qızı", position: "İnzibati işçi", photo_url: "https://ui-avatars.com/api/?name=Gunel+Ahmadova&background=6a1b9a&color=fff&size=200&bold=true", email: "g.ahmadova@aztu.edu.az" },
    { id: 6, full_name: "Babaxanov Cavid Rauf oğlu", position: "Texnik", photo_url: "https://ui-avatars.com/api/?name=Cavid+Babaxanov&background=1b5e20&color=fff&size=200&bold=true", email: "c.babaxanov@aztu.edu.az" },
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
          Fakültənin əməkdaşları. Hər birinin şəkli və ya adı üzərinə toxunduqda CV
          məlumatları xarici PDF formasında açıla bilər.
        </p>

        {employees.length === 0 ? (
          <ComingSoon label="Əməkdaşlar haqqında məlumat əlavə ediləcək" />
        ) : (
          <>
            {/* Search */}
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
                  photoUrl={emp.photo_url}
                  cvUrl={emp.cv_url}
                  email={emp.email}
                  size="sm"
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
