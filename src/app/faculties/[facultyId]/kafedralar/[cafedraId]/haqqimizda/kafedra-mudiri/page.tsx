"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

const API_BASE = "https://api.aztu.edu.az/";

export default function KafedraMudiriPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

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

  const head = cafedra?.director;
  const headFullName = head
    ? [head.first_name, head.last_name, head.father_name].filter(Boolean).join(" ")
    : "";

  const getImg = (path: string | null) => {
    if (!path) return undefined;
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Kafedra müdiri haqqında" : "About the Head of Department"} accent>
        {loading ? (
          <div className="animate-pulse space-y-8">
             <div className="flex flex-col lg:flex-row gap-12">
               <div className="w-full lg:w-80 space-y-6">
                  <div className="aspect-[3/4] rounded-[3rem] bg-gray-100 dark:bg-white/5" />
                  <div className="h-40 rounded-[2rem] bg-gray-100 dark:bg-white/5" />
               </div>
               <div className="flex-1 space-y-6">
                 <div className="h-12 w-2/3 bg-gray-100 dark:bg-white/5 rounded-xl" />
                 <div className="h-6 w-1/3 bg-gray-100 dark:bg-white/5 rounded-lg" />
                 <div className="h-64 w-full bg-gray-100 dark:bg-white/5 rounded-[2rem]" />
               </div>
             </div>
          </div>
        ) : !head ? (
          <ComingSoon label={currentLang === "az" ? "Kafedra müdiri haqqında məlumat tapılmadı" : "Head of department information not found"} />
        ) : (
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left Column: Image & Contact Info */}
              <div className="w-full lg:w-80 space-y-8 flex-shrink-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="relative group"
                >
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border-8 border-white dark:border-white/5 shadow-[0_40px_80px_-20px_rgba(26,35,85,0.3)] relative z-10">
                    {head.profile_image ? (
                      <img
                        src={`${API_BASE_URL}${head.profile_image}`}
                        alt={headFullName}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1a2355]/10 text-[#1a2355] text-sm font-black uppercase tracking-widest">
                        No Photo
                      </div>
                    )}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#ee7c7e]/20 to-transparent blur-2xl rounded-[4rem] group-hover:from-[#ee7c7e]/40 transition-all duration-700 opacity-50" />
                </motion.div>

                {/* Contact Cards Under Image */}
                <div className="space-y-4">
                  {[
                    { icon: EmailIcon, label: currentLang === "az" ? "E-poçt" : "Email", value: head.email, href: `mailto:${head.email}`, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    { icon: PhoneIcon, label: currentLang === "az" ? "Telefon" : "Phone", value: head.phone, href: `tel:${head.phone}`, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    { icon: LocationOnIcon, label: currentLang === "az" ? "Otaq" : "Room", value: head.room_number, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
                  ].filter(f => f.value).map((field, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="group bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${field.color} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <field.icon sx={{ fontSize: 18 }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] text-gray-400 dark:text-white/30 font-black uppercase tracking-[0.2em] mb-0.5">{field.label}</p>
                          {field.href ? (
                            <a href={field.href} className="text-xs font-black text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors truncate block">
                              {field.value}
                            </a>
                          ) : (
                            <p className="text-xs font-black text-[#1a2355] dark:text-white truncate">
                              {field.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Bio & Other Info */}
              <div className="flex-1 space-y-10">
                <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/20 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] animate-pulse" />
                    <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em]">{currentLang === "az" ? "Kafedra Rəhbəri" : "Department Leadership"}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter">{headFullName}</h2>
                  <p className="text-xl font-black text-gray-400 dark:text-white/30 mt-4 uppercase tracking-widest">
                    {head.scientific_title}
                  </p>
                  {head.scientific_degree && (
                    <p className="text-sm text-[#ee7c7e] font-black mt-2 uppercase tracking-[0.2em]">{head.scientific_degree}</p>
                  )}
                </motion.div>

                {(head.bio !== undefined && head.bio !== null && head.bio !== "") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-justify font-medium bg-gray-50/50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10"
                    dangerouslySetInnerHTML={{ __html: head.bio }}
                  />
                )}

                {head.working_hours && head.working_hours.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-[#1a2355] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-all duration-700" />
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                          <AccessTimeIcon sx={{ fontSize: 24 }} />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.3em]">{currentLang === "az" ? "Qəbul Saatları" : "Reception Hours"}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {head.working_hours.map((slot: { day: string; time_range: string }, idx: number) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0 md:last:border-b">
                            <span className="text-sm font-bold text-white/50 uppercase tracking-widest">{slot.day}</span>
                            <span className="text-sm font-black tracking-wider">{slot.time_range}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Sections: Research & Education */}
            <div className="space-y-16 pt-10">
                {head.scientific_research_fields && head.scientific_research_fields.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionBlock title={currentLang === "az" ? "Elmi tədqiqat sahələri" : "Scientific Research Fields"} dark>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {head.scientific_research_fields.map((field: string, index: number) => (
                        <div key={index} className="flex items-center gap-4 bg-white/5 rounded-2xl p-6 border border-white/10 transition-all hover:bg-white/10 hover:border-[#ee7c7e]/30 group">
                            <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] flex-shrink-0 group-hover:scale-110 transition-transform">
                            <ScienceIcon sx={{ fontSize: 20 }} />
                            </div>
                            <span className="text-sm font-black text-white leading-tight uppercase tracking-widest">{field}</span>
                        </div>
                        ))}
                    </div>
                    </SectionBlock>
                </motion.div>
                )}

                {head.educations && head.educations.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SectionBlock title={currentLang === "az" ? "Təhsil keçmişi" : "Educational Background"} accent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {head.educations.map((edu: { degree: string; university: string; start_year: number; end_year: number }, index: number) => {
                        const years = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");
                        return (
                            <div
                            key={index}
                            className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 p-10 shadow-2xl shadow-blue-900/5 group hover:border-[#ee7c7e]/30 transition-all duration-500"
                            >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                            <div className="relative z-10 flex items-start gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] text-white flex items-center justify-center flex-shrink-0 shadow-xl group-hover:rotate-6 transition-transform">
                                <SchoolIcon sx={{ fontSize: 28 }} />
                                </div>
                                <div className="min-w-0">
                                <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">{years || (currentLang === "az" ? "Təhsil pilləsi" : "Degree")}</span>
                                <p className="text-xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter group-hover:text-[#ee7c7e] transition-colors">
                                    {edu.degree}
                                </p>
                                {edu.university && (
                                    <p className="text-base text-gray-500 dark:text-white/40 mt-4 font-medium leading-relaxed italic">
                                    {edu.university}
                                    </p>
                                )}
                                </div>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    </SectionBlock>
                </motion.div>
                )}
            </div>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
