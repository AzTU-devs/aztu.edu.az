"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function DekanPage({ params }: Props) {
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

  const director = faculty?.director;
  const directorFullName = director
    ? [director.last_name, director.first_name, director.father_name].filter(Boolean).join(" ")
    : "";

  return (
    <div className="space-y-8">
      <SectionBlock title={currentLang === "az" ? "Dekan haqqında" : "About the Dean"} accent>
        {loading ? (
          <div className="animate-pulse space-y-6">
             <div className="flex flex-col md:flex-row gap-10">
               <div className="w-64 h-80 rounded-3xl bg-gray-100 dark:bg-slate-800" />
               <div className="flex-1 space-y-4">
                 <div className="h-10 w-2/3 bg-gray-100 dark:bg-slate-800 rounded-xl" />
                 <div className="h-6 w-1/3 bg-gray-100 dark:bg-slate-800 rounded-lg" />
                 <div className="h-32 w-full bg-gray-100 dark:bg-slate-800 rounded-2xl" />
               </div>
             </div>
          </div>
        ) : !director ? (
          <ComingSoon label={currentLang === "az" ? "Dekan haqqında məlumat tapılmadı" : "Dean information not found"} />
        ) : (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:w-64 lg:w-72 flex-shrink-0"
              >
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl relative group">
                  {director.profile_image ? (
                    <img
                      src={getImageUrl(director.profile_image)}
                      alt={directorFullName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a2355]/10 text-[#1a2355] text-sm font-semibold uppercase tracking-widest">
                      No Photo
                    </div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2.5rem]" />
                </div>
              </motion.div>

              <div className="flex-1 space-y-6">
                <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-[#ee7c7e] text-xs font-black uppercase tracking-[0.2em] mb-2 block">{currentLang === "az" ? "Fakültə Rəhbəri" : "Faculty Leadership"}</span>
                  <h2 className="text-4xl font-black text-[#1a2355] dark:text-white leading-tight">{directorFullName}</h2>
                  <p className="text-xl font-bold text-gray-500 dark:text-slate-400 mt-2">
                    {director.scientific_title}
                  </p>
                  {director.scientific_degree && (
                    <p className="text-sm text-gray-400 dark:text-slate-500 font-medium mt-1">{director.scientific_degree}</p>
                  )}
                </motion.div>

                {director.bio && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-sm lg:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-[#ee7c7e]/20 pl-6 py-2 italic bg-gray-50/50 dark:bg-slate-800/30 rounded-r-2xl"
                    dangerouslySetInnerHTML={{ __html: director.bio }}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: EmailIcon, label: currentLang === "az" ? "E-poçt" : "Email", value: director.email, href: `mailto:${director.email}`, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600" },
                    { icon: PhoneIcon, label: currentLang === "az" ? "Telefon" : "Phone", value: director.phone, href: `tel:${director.phone}`, color: "bg-green-50 dark:bg-green-900/20 text-green-600" },
                    { icon: LocationOnIcon, label: currentLang === "az" ? "Otaq" : "Room", value: director.room_number, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600" },
                  ].filter(f => f.value).map((field, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="group bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${field.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <field.icon sx={{ fontSize: 20 }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">{field.label}</p>
                          {field.href ? (
                            <a href={field.href} className="text-sm font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors truncate block">
                              {field.value}
                            </a>
                          ) : (
                            <p className="text-sm font-bold text-[#1a2355] dark:text-white truncate">
                              {field.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {director.working_hours && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="sm:col-span-2 bg-[#1a2355] dark:bg-slate-800 rounded-2xl p-5 text-white shadow-lg"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <AccessTimeIcon sx={{ fontSize: 20 }} />
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.2em]">{currentLang === "az" ? "Qəbul Saatları" : "Reception Hours"}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        {director.working_hours.map((slot, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 border-b border-white/10 last:border-0">
                            <span className="text-sm font-medium text-white/60">{slot.day}</span>
                            <span className="text-sm font-black">{slot.time_range}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {director.scientific_research_fields && director.scientific_research_fields.length > 0 && (
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                <SectionBlock title={currentLang === "az" ? "Elmi tədqiqat sahələri" : "Scientific Research Fields"} accent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {director.scientific_research_fields.map((field, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] flex-shrink-0">
                          <ScienceIcon sx={{ fontSize: 16 }} />
                        </div>
                        <span className="text-sm font-bold text-[#1a2355] dark:text-white leading-tight">{field}</span>
                      </div>
                    ))}
                  </div>
                </SectionBlock>
              </motion.div>
            )}

            {director.educations && director.educations.length > 0 && (
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                <SectionBlock title={currentLang === "az" ? "Təhsil keçmişi" : "Educational Background"} accent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {director.educations.map((edu, index) => {
                      const years = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");
                      return (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-[2rem] border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-slate-700/30 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                          <div className="relative z-10 flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20">
                              <SchoolIcon sx={{ fontSize: 24 }} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-widest block mb-1">{years || (currentLang === "az" ? "Təhsil pilləsi" : "Degree")}</span>
                              <p className="text-lg font-black text-[#1a2355] dark:text-white leading-tight group-hover:text-[#ee7c7e] transition-colors">
                                {edu.degree}
                              </p>
                              {edu.university && (
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
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
        )}
      </SectionBlock>
    </div>
  );
}
