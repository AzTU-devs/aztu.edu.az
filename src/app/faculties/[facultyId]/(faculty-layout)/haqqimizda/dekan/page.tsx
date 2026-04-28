"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail } from "@/types/faculty";
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
    ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
    : "";

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Dekan haqqında" : "About the Dean"} accent>
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
        ) : !director ? (
          <ComingSoon label={currentLang === "az" ? "Dekan haqqında məlumat tapılmadı" : "Dean information not found"} />
        ) : (
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left Column: Image & Contact Info */}
              <div className="w-full lg:w-72 space-y-4 flex-shrink-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-100 shadow-xl relative z-10 bg-gray-50">
                    {director.profile_image ? (
                      <img
                        src={getImageUrl(director.profile_image)}
                        alt={directorFullName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#1a2355]/20">
                        <PersonIcon sx={{ fontSize: 64 }} />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { icon: EmailIcon, label: currentLang === "az" ? "E-poçt" : "Email", value: director.email, href: `mailto:${director.email}`, color: "text-blue-600 bg-blue-50" },
                    { icon: PhoneIcon, label: currentLang === "az" ? "Telefon" : "Phone", value: director.phone, href: `tel:${director.phone}`, color: "text-emerald-600 bg-emerald-50" },
                    { icon: LocationOnIcon, label: currentLang === "az" ? "Otaq" : "Room", value: director.room_number, color: "text-orange-600 bg-orange-50" },
                  ].filter(f => f.value).map((field, idx) => (
                    <div key={idx} className="bg-gray-50/50 rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${field.color} flex items-center justify-center flex-shrink-0`}>
                          <field.icon sx={{ fontSize: 16 }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">{field.label}</p>
                          {field.href ? (
                            <a href={field.href} className="text-[10px] font-black text-[#1a2355] hover:text-[#ee7c7e] transition-colors truncate block">
                              {field.value}
                            </a>
                          ) : (
                            <p className="text-[10px] font-black text-[#1a2355] truncate">{field.value}</p>
                          )}
                        </div>
                    </div>
                  ))}
                </div>

                {/* Working Hours - MOVED HERE */}
                {director.working_hours && director.working_hours.length > 0 && (
                    <div className="bg-[#1a2355] rounded-xl p-4 text-white shadow-lg overflow-hidden relative">
                      <div className="flex items-center gap-2 mb-3">
                        <AccessTimeIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                        <p className="text-[9px] font-black uppercase tracking-widest">{currentLang === "az" ? "Qəbul" : "Hours"}</p>
                      </div>
                      <div className="space-y-1.5">
                        {director.working_hours.map((slot, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                            <span className="text-[8px] font-bold text-white/40 uppercase">{slot.day}</span>
                            <span className="text-[9px] font-black">{slot.time_range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                )}
              </div>

              {/* Right Column: Bio */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-[#ee7c7e]/5 border border-[#ee7c7e]/10 mb-2">
                    <span className="text-[#ee7c7e] text-[8px] font-black uppercase tracking-widest">{currentLang === "az" ? "Dekan" : "Dean"}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] leading-none tracking-tighter">{directorFullName}</h2>
                  <p className="text-base font-black text-gray-400 mt-1 uppercase tracking-widest">
                    {director.scientific_title}
                  </p>
                </div>

                {director.bio && (
                  <div 
                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed text-justify font-medium"
                    dangerouslySetInnerHTML={{ __html: director.bio }}
                  />
                )}
              </div>
            </div>

            {/* Bottom Sections */}
            <div className="space-y-6 pt-4">
                {director.scientific_research_fields && director.scientific_research_fields.length > 0 && (
                    <SectionBlock title={currentLang === "az" ? "Tədqiqat Sahələri" : "Research Fields"} dark>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {director.scientific_research_fields.map((field, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                            <ScienceIcon sx={{ fontSize: 14, color: '#ee7c7e' }} />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{field}</span>
                        </div>
                        ))}
                    </div>
                    </SectionBlock>
                )}

                {/* Fix education check - being very robust */}
                {(director.educations?.length > 0 || (director as any).education?.length > 0) && (
                    <SectionBlock title={currentLang === "az" ? "Təhsil" : "Education"} accent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {(director.educations || (director as any).education).map((edu: any, index: number) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#1a2355]">
                                    <SchoolIcon sx={{ fontSize: 20 }} />
                                </div>
                                <div>
                                    <span className="text-[#ee7c7e] text-[8px] font-black uppercase tracking-widest block mb-1">
                                        {[edu.start_year, edu.end_year].filter(Boolean).join(" – ")}
                                    </span>
                                    <p className="text-sm font-black text-[#1a2355] leading-tight mb-1">{edu.degree}</p>
                                    <p className="text-xs text-gray-500 font-medium">{edu.university}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </SectionBlock>
                )}
            </div>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
