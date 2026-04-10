"use client";

import { use, useEffect, useState } from "react";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail, Personnel } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import { useLanguage } from "@/context/LanguageContext";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

const API_BASE = "https://api.aztu.edu.az/";

export default function CafedraEmekdaslarPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, lang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, lang]);

  if (loading) {
    return <div className="animate-pulse space-y-8">
        {[1,2,3].map(i => (
            <div key={i} className="space-y-4">
                <div className="h-8 w-48 bg-gray-200 dark:bg-slate-800 rounded-lg" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1,2,3,4].map(j => <div key={j} className="h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl" />)}
                </div>
            </div>
        ))}
    </div>;
  }

  if (!cafedra) return null;

  const filterPersonnel = (list: Personnel[]) => {
    if (!search) return list;
    return list.filter(p => {
        const full = `${p.first_name} ${p.last_name} ${p.father_name}`.toLowerCase();
        return full.includes(search.toLowerCase()) || 
               (p.duty && p.duty.toLowerCase().includes(search.toLowerCase())) ||
               (p.scientific_degree && p.scientific_degree.toLowerCase().includes(search.toLowerCase()));
    });
  };

  const getImg = (path: string | null) => {
    if (!path) return undefined;
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  const sections = [
    { title: lang === "az" ? "Kafedra müdir müavinləri" : "Deputy Heads", data: cafedra.deputy_directors },
    { title: lang === "az" ? "Akademik heyət və əməkdaşlar" : "Academic Staff", data: cafedra.workers },
    { title: lang === "az" ? "Elmi şura üzvləri" : "Scientific Council Members", data: cafedra.scientific_council },
  ].filter(s => s.data.length > 0);

  return (
    <div className="space-y-10">
      <div className="relative">
        <SearchIcon
          sx={{ fontSize: 20, color: "#9ca3af" }}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder={lang === "az" ? "Ad, soyad və ya vəzifə üzrə axtar..." : "Search by name, position..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ee7c7e]/20 shadow-sm transition-all"
        />
      </div>

      {sections.map((sec, idx) => {
        const filtered = filterPersonnel(sec.data);
        if (filtered.length === 0 && search) return null;
        
        return (
          <SectionBlock key={idx} title={sec.title} accent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, pIdx) => (
                <PersonCard
                  key={pIdx}
                  fullName={`${p.first_name} ${p.last_name} ${p.father_name}`}
                  title={p.duty || p.scientific_title || ""}
                  academicDegree={p.scientific_degree || ""}
                  photoUrl={getImg(p.profile_image)}
                  email={p.email || ""}
                  phone={p.phone || ""}
                  size="md"
                />
              ))}
            </div>
          </SectionBlock>
        );
      })}

      {search && sections.every(s => filterPersonnel(s.data).length === 0) && (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-dashed border-gray-200 dark:border-slate-700">
           <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              {lang === "az" ? "Axtarışa uyğun nəticə tapılmadı" : "No results found"}
           </p>
        </div>
      )}
    </div>
  );
}
