"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";
import GroupsIcon from "@mui/icons-material/Groups";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function ElmiSuraPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Fakültə elmi şurası" : "Faculty Scientific Council"} accent>
        <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-12 max-w-2xl leading-relaxed">
          {currentLang === "az" 
            ? "Fakültənin elmi və tədris fəaliyyətini tənzimləyən ali kollegial idarəetmə orqanının tərkibi." 
            : "Composition of the supreme collegial governing body regulating the scientific and academic activities of the faculty."}
        </p>

        {loading ? (
          <div className="animate-pulse space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 rounded-[1.5rem] bg-gray-100 dark:bg-white/5" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Elmi şura üzvləri haqqında məlumat əlavə ediləcək" : "Information about scientific council members will be added soon"} />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-[0_40px_80px_-20px_rgba(26,35,85,0.1)] backdrop-blur-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/10">
                    <th className="py-8 px-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355] dark:text-white/50 border-b border-gray-100 dark:border-white/10">
                      №
                    </th>
                    <th className="py-8 px-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355] dark:text-white/50 border-b border-gray-100 dark:border-white/10">
                      {currentLang === "az" ? "Soyadı, adı, ata adı" : "Full Name"}
                    </th>
                    <th className="py-8 px-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#1a2355] dark:text-white/50 border-b border-gray-100 dark:border-white/10">
                      {currentLang === "az" ? "Vəzifəsi" : "Duty / Position"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {members.map((m, idx) => {
                    const fullName = [m.first_name, m.last_name, m.father_name].filter(Boolean).join(" ");
                    return (
                      <motion.tr
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-300 group"
                      >
                        <td className="py-6 px-8">
                           <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-black text-gray-400 dark:text-white/30 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all">
                             {String(idx + 1).padStart(2, '0')}
                           </div>
                        </td>
                        <td className="py-6 px-8">
                          <span className="font-black text-base text-[#1a2355] dark:text-white block group-hover:text-[#ee7c7e] transition-colors">{fullName || "—"}</span>
                          {m.scientific_degree && (
                            <span className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest mt-1 block">{m.scientific_degree}</span>
                          )}
                        </td>
                        <td className="py-6 px-8">
                           <div className="inline-flex px-4 py-1.5 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10 text-[#1a2355] dark:text-white/70 text-[11px] font-black uppercase tracking-wider group-hover:border-[#ee7c7e]/30 group-hover:text-[#ee7c7e] transition-all">
                             {m.duty || "—"}
                           </div>
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

      {/* Decorative Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-20 h-20 rounded-[2rem] bg-[#ee7c7e] flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(238,124,126,0.3)]">
              <GroupsIcon sx={{ fontSize: 40 }} />
           </div>
           <div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">
                {currentLang === "az" ? "Kollektiv İdarəetmə" : "Collective Governance"}
              </h4>
              <p className="text-white/60 font-medium leading-relaxed max-w-2xl">
                {currentLang === "az" 
                  ? "Elmi Şura fakültənin strateji inkişafını, tədrisin keyfiyyətini və elmi fəaliyyətini tənzimləyən əsas qərar qəbul edici orqandır." 
                  : "The Scientific Council is the primary decision-making body regulating the strategic development, academic quality, and scientific activities of the faculty."}
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
