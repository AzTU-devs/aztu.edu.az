"use client";

import { use, useEffect, useState } from "react";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { useLanguage } from "@/context/LanguageContext";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { motion } from "framer-motion";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

const API_BASE = "https://api.aztu.edu.az/";

export default function KafedraMudiriPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, lang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, lang]);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
      <div className="h-32 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
    </div>;
  }

  const head = cafedra?.director;

  if (!head) {
    return (
      <SectionBlock accent>
        <div className="text-center py-10">
          <p className="text-gray-500">{lang === "az" ? "Məlumat tapılmadı" : "No information found"}</p>
        </div>
      </SectionBlock>
    );
  }

  const fullName = `${head.first_name} ${head.last_name} ${head.father_name}`;

  const contactItems = [
    { icon: <EmailIcon sx={{ fontSize: 16 }} />, label: lang === "az" ? "E-poçt" : "Email", value: head.email, href: head.email ? `mailto:${head.email}` : undefined },
    { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: lang === "az" ? "Telefon" : "Phone", value: head.phone, href: head.phone ? `tel:${head.phone}` : undefined },
    { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: lang === "az" ? "Otaq" : "Room", value: head.room_number },
  ].filter((item) => item.value);

  return (
    <div className="space-y-6">
      <SectionBlock title={lang === "az" ? "Kafedra müdiri" : "Head of Department"} accent>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="w-44 h-56 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700 bg-gray-100">
              {head.profile_image ? (
                <img 
                  src={head.profile_image.startsWith('http') ? head.profile_image : `${API_BASE}${head.profile_image}`} 
                  alt={fullName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-[#1a2355]/10 flex items-center justify-center">
                  <span className="text-[#1a2355] text-4xl font-bold">{head.first_name[0]}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">{fullName}</h2>
              {head.scientific_degree && (
                <p className="text-[#ee7c7e] font-semibold text-sm mt-1">{head.scientific_degree}</p>
              )}
              {head.scientific_title && (
                <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{head.scientific_title}</p>
              )}
              {head.duty && (
                 <p className="text-gray-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest mt-2">{head.duty}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                  <span className="text-[#1a2355] dark:text-blue-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-700 dark:text-gray-200 font-semibold hover:text-[#ee7c7e] transition-colors truncate block">{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {head.working_hours && head.working_hours.length > 0 && (
                <div className="bg-[#1a2355]/5 dark:bg-[#1a2355]/20 rounded-xl px-4 py-3">
                    <p className="text-xs text-[#1a2355] dark:text-blue-300 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        {lang === "az" ? "Qəbul saatları" : "Working Hours"}
                    </p>
                    <div className="space-y-1">
                        {head.working_hours.map((wh, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                                <span className="font-bold text-gray-600 dark:text-gray-400">{wh.day}</span>
                                <span className="text-gray-500 dark:text-gray-500">{wh.time_range}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      </SectionBlock>

      {head.bio && (
        <SectionBlock title={lang === "az" ? "Haqqında" : "About"} accent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
             <SanitizedHtml html={head.bio} />
          </div>
        </SectionBlock>
      )}

      {head.educations && head.educations.length > 0 && (
          <SectionBlock title={lang === "az" ? "Təhsil" : "Education"} accent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {head.educations.map((edu, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-2xl shadow-sm hover:border-[#ee7c7e] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-[#1a2355] dark:text-blue-400">
                    <SchoolIcon />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black bg-[#1a2355]/5 dark:bg-[#1a2355]/20 text-[#1a2355] dark:text-blue-300 px-2 py-0.5 rounded-full">
                            {edu.start_year} - {edu.end_year}
                        </span>
                        <span className="text-xs font-bold text-[#ee7c7e]">{edu.degree}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-snug">{edu.university}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionBlock>
      )}

      {head.scientific_events && head.scientific_events.length > 0 && (
          <SectionBlock title={lang === "az" ? "Elmi Tədbirlər" : "Scientific Events"} accent>
            <div className="space-y-4">
                {head.scientific_events.map((event, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-[#1a2355]/10 dark:border-slate-700 py-1">
                        <div className="absolute left-[-5px] top-3 w-2 h-2 rounded-full bg-[#ee7c7e]" />
                        <h4 className="font-bold text-[#1a2355] dark:text-white text-sm mb-1">{event.event_title}</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{event.event_description}</p>
                    </div>
                ))}
            </div>
          </SectionBlock>
      )}
    </div>
  );
}
