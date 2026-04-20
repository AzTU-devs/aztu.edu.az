"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { getDepartmentBySlug, getImageUrl } from "@/services/departmentService/departmentService";
import type { DepartmentDetail, WorkingHour, Education } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";

interface Props {
  params: Promise<{ department_code: string }>;
}

export default function DepartmentLeadershipPage({ params }: Props) {
  const { department_code: departmentSlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);

  useEffect(() => {
    getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
  }, [departmentSlug, currentLang]);

  if (department === undefined) return <Loading />;
  if (department === null) return null;

  const director = department.director;
  const directorFullName = director ? `${director.first_name} ${director.last_name} ${director.father_name}` : "";
  const profileImage = getImageUrl(director?.profile_image);

  const workingHours = Array.isArray(director?.working_hours) ? director.working_hours : [];
  const educations = Array.isArray(director?.educations) ? director.educations : [];

  const t = {
    title: currentLang === "az" ? "Rəhbərlik haqqında" : "About Leadership",
    leadershipRole: currentLang === "az" ? "Şöbə Rəhbəri" : "Department Leadership",
    noData: currentLang === "az" ? "Rəhbərlik haqqında məlumat tapılmadı" : "Leadership information not found",
    bio: currentLang === "az" ? "Haqqında" : "About",
    office: currentLang === "az" ? "Otaq" : "Office",
    reception: currentLang === "az" ? "Qəbul günləri" : "Reception Days",
    education: currentLang === "az" ? "Təhsil keçmişi" : "Educational Background",
    degreeLabel: currentLang === "az" ? "Təhsil pilləsi" : "Degree",
    email: currentLang === "az" ? "E-poçt" : "Email",
    phone: currentLang === "az" ? "Telefon" : "Phone"
  };

  return (
    <div className="space-y-10">
      <SectionBlock title={t.title} accent>
        {!director ? (
          <ComingSoon label={t.noData} />
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
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={directorFullName}
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
                    { icon: EmailIcon, label: t.email, value: director.email, href: `mailto:${director.email}`, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
                    { icon: PhoneIcon, label: t.phone, value: director.phone, href: `tel:${director.phone}`, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
                    { icon: LocationOnIcon, label: t.office, value: director.room_number, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
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
                    <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em]">{t.leadershipRole}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter">{directorFullName}</h2>
                  <p className="text-xl font-black text-gray-400 dark:text-white/30 mt-4 uppercase tracking-widest">
                    {director.scientific_title || (currentLang === "az" ? "Şöbə Müdiri" : "Department Head")}
                  </p>
                  {director.scientific_degree && (
                    <p className="text-sm text-[#ee7c7e] font-black mt-2 uppercase tracking-[0.2em]">{director.scientific_degree}</p>
                  )}
                </motion.div>

                {director.bio && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-justify font-medium bg-gray-50/50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10"
                  >
                    <SanitizedHtml html={director.bio} />
                  </motion.div>
                )}

                {workingHours.length > 0 && (
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
                      <p className="text-sm font-black uppercase tracking-[0.3em]">{t.reception}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {workingHours.map((wh: WorkingHour, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0 md:last:border-b">
                          <span className="text-sm font-bold text-white/50 uppercase tracking-widest">{wh.day}</span>
                          <span className="text-sm font-black tracking-wider">{wh.time_range}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Sections: Education */}
            {educations.length > 0 && (
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                <SectionBlock title={t.education} accent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {educations.map((edu: Education, index: number) => (
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
                            <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">{edu.year || t.degreeLabel}</span>
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
                    ))}
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
