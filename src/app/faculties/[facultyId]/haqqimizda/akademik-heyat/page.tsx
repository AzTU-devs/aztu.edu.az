"use client";

import { useState } from "react";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { AcademicStaff } from "@/types/faculty";
import SearchIcon from "@mui/icons-material/Search";

const ACADEMIC_STAFF: AcademicStaff[] = [
  { id: 1, full_name: "Əliyev Kamran Rauf oğlu", title: "Professor", academic_degree: "Texnika elmləri doktoru", department: "Kompüter Elmləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Kamran+Eliyev&background=1a2355&color=fff&size=200&bold=true", email: "k.aliyev@aztu.edu.az" },
  { id: 2, full_name: "Quliyev Rauf Əli oğlu", title: "Professor", academic_degree: "Texnika elmləri doktoru", department: "İnformasiya Sistemləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Rauf+Quliyev&background=1e3a5f&color=fff&size=200&bold=true", email: "r.quliyev@aztu.edu.az" },
  { id: 3, full_name: "Babayev Elnur Faiq oğlu", title: "Professor", academic_degree: "Texnika elmləri doktoru", department: "Kibertəhlükəsizlik kafedras", photo_url: "https://ui-avatars.com/api/?name=Elnur+Babayev&background=1a3a5c&color=fff&size=200&bold=true", email: "e.babayev@aztu.edu.az" },
  { id: 4, full_name: "Məmmədova Günel Rafiq qızı", title: "Dosent", academic_degree: "Elmlər namizədi", department: "Kompüter Elmləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Gunel+Mammadova&background=ee7c7e&color=fff&size=200&bold=true", email: "g.mammadova@aztu.edu.az" },
  { id: 5, full_name: "İsmayılova Sevinc Nadir qızı", title: "Dosent", academic_degree: "Elmlər namizədi", department: "İnformasiya Sistemləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Sevinc+Ismayilova&background=c2185b&color=fff&size=200&bold=true", email: "s.ismayilova@aztu.edu.az" },
  { id: 6, full_name: "Nəsirov Vüsal Kamil oğlu", title: "Dosent", academic_degree: "Elmlər namizədi", department: "Kibertəhlükəsizlik kafedras", photo_url: "https://ui-avatars.com/api/?name=Vusal+Nasirov&background=263238&color=fff&size=200&bold=true", email: "v.nasirov@aztu.edu.az" },
  { id: 7, full_name: "Həsənli Aytən Cavid qızı", title: "Dosent", academic_degree: "Fəlsəfə doktoru", department: "Kompüter Elmləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Ayten+Hasanli&background=7b1fa2&color=fff&size=200&bold=true", email: "a.hasanli@aztu.edu.az" },
  { id: 8, full_name: "Cəfərov Mübariz Həsən oğlu", title: "Dosent", academic_degree: "Elmlər namizədi", department: "İnformasiya Sistemləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Mubariz+Cafarov&background=1b5e20&color=fff&size=200&bold=true", email: "m.cafarov@aztu.edu.az" },
  { id: 9, full_name: "Orucova Lalə Tofiq qızı", title: "Baş müəllim", academic_degree: "Fəlsəfə doktoru", department: "Kompüter Elmləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Lale+Orucova&background=bf360c&color=fff&size=200&bold=true", email: "l.orucova@aztu.edu.az" },
  { id: 10, full_name: "Hüseynov Tural Elnur oğlu", title: "Dosent", academic_degree: "Elmlər namizədi", department: "Kibertəhlükəsizlik kafedras", photo_url: "https://ui-avatars.com/api/?name=Tural+Huseynov&background=1a2355&color=fff&size=200&bold=true", email: "t.huseynov@aztu.edu.az" },
  { id: 11, full_name: "Qasımov Elnur Zakir oğlu", title: "Müəllim", academic_degree: undefined, department: "İnformasiya Sistemləri kafedras", photo_url: "https://ui-avatars.com/api/?name=Elnur+Qasimov&background=37474f&color=fff&size=200&bold=true", email: "e.qasimov@aztu.edu.az" },
  { id: 12, full_name: "Süleymanova Nigar Ramiz qızı", title: "Müəllim", academic_degree: undefined, department: "Kibertəhlükəsizlik kafedras", photo_url: "https://ui-avatars.com/api/?name=Nigar+Suleymanova&background=880e4f&color=fff&size=200&bold=true", email: "n.suleymanova@aztu.edu.az" },
];

export default function AkademikHeyatPage() {
  const academicStaff: AcademicStaff[] = ACADEMIC_STAFF;
  const [search, setSearch] = useState("");

  const filtered = academicStaff.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (s.department ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SectionBlock title="Akademik heyət" accent>
        {academicStaff.length === 0 ? (
          <ComingSoon label="Akademik heyət haqqında məlumat əlavə ediləcək" />
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
                placeholder="Ad, soyad və ya kafedra üzrə axtar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2355]/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((staff) => (
                <PersonCard
                  key={staff.id}
                  fullName={staff.full_name}
                  title={staff.title}
                  academicDegree={staff.academic_degree}
                  department={staff.department}
                  photoUrl={staff.photo_url}
                  email={staff.email}
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
