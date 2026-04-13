"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getResearchInstituteBySlug } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteDetail } from "@/types/researchInstitute";
import { useLanguage } from "@/context/LanguageContext";
import Loading from "@/components/loading/Loading";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ResearchInstituteContactPage({ params }: Props) {
  const { slug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [institute, setInstitute] = useState<ResearchInstituteDetail | null | undefined>(undefined);

  useEffect(() => {
    getResearchInstituteBySlug(slug, currentLang).then(setInstitute);
  }, [slug, currentLang]);

  if (institute === undefined) return <Loading />;
  if (institute === null) return null;

  const director = institute.director;

  const contactFields = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 24 }} />,
      label: currentLang === "az" ? "Ünvan" : "Office Address",
      value: director?.office ? `${currentLang === "az" ? "Otaq" : "Room"} ${director.office}` : (currentLang === "az" ? "Bina 6, AzTU" : "Building 6, AzTU"),
      sub: currentLang === "az" ? "H.Cavid pr. 25, Bakı" : "25 H.Javid Ave, Baku",
      color: "from-blue-500 to-blue-600 shadow-blue-500/20"
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      label: currentLang === "az" ? "Telefon" : "Direct Phone",
      value: "+994 12 539 12 34", // Fallback as staff might have phone but director object in RI schema doesn't have direct phone field currently shown in example
      color: "from-green-500 to-green-600 shadow-green-500/20"
    },
    {
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      label: currentLang === "az" ? "E-poçt" : "Official Email",
      value: director?.email ?? "research@aztu.edu.az",
      href: director?.email ? `mailto:${director.email}` : undefined,
      color: "from-purple-500 to-purple-600 shadow-purple-500/20"
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 24 }} />,
      label: currentLang === "az" ? "Qəbul saatları" : "Office Hours",
      value: currentLang === "az" ? "Bazar ertəsi – Cümə" : "Mon – Fri",
      sub: "09:00 – 18:00",
      color: "from-orange-500 to-orange-600 shadow-orange-500/20"
    },
  ];

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "İnstitut ilə əlaqə" : "Contact the Institute"} accent>
        <p className="text-gray-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          {currentLang === "az" 
            ? "İnstitutun fəaliyyəti, tədqiqat layihələri və digər suallarınızla bağlı bizimlə əlaqə saxlayın." 
            : "You can contact us regarding institute activities, research projects, and other questions."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactFields.map((field, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${field.color} opacity-5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
              
              <div className="flex items-start gap-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${field.color} text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {field.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{field.label}</p>
                  {field.href ? (
                    <a
                      href={field.href}
                      className="text-lg font-black text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors break-words"
                    >
                      {field.value}
                    </a>
                  ) : (
                    <p className="text-lg font-black text-[#1a2355] dark:text-white">
                      {field.value}
                    </p>
                  )}
                  {field.sub && (
                    <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mt-1">
                      {field.sub}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <SectionBlock title={currentLang === "az" ? "Məkanımız" : "Our Location"}>
          <div className="relative w-full h-80 rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-xl group">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2355]/5 to-[#1a2355]/10">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <LocationOnIcon sx={{ fontSize: 40, color: "#ee7c7e" }} />
              </div>
              <p className="text-[#1a2355] dark:text-white font-black uppercase tracking-widest text-xs">
                {currentLang === "az" ? "Azərbaycan Texniki Universiteti" : "Azerbaijan Technical University"}
              </p>
              <p className="text-gray-400 text-[10px] font-bold mt-1">{currentLang === "az" ? "Tədqiqat Mərkəzi" : "Research Center"}</p>
              
              <div className="mt-8 flex gap-4">
                 <div className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping" />
                 <div className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping delay-75" />
                 <div className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping delay-150" />
              </div>
            </div>
          </div>
        </SectionBlock>
      </motion.div>
    </div>
  );
}
