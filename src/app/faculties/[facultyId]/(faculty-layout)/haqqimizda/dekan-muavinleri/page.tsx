"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import PersonCard from "@/components/shared/PersonCard";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";
import BadgeIcon from "@mui/icons-material/Badge";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function DekanMuavinleriPage({ params }: Props) {
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

  const deputyDeans: PersonnelItem[] = faculty?.deputy_deans ?? [];

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Dekan müavinləri" : "Deputy Deans"} accent>
        <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-12 max-w-2xl leading-relaxed">
          {currentLang === "az" 
            ? "Fakültənin rəhbər heyəti — tədris, elm, beynəlxalq əlaqələr və digər sahələr üzrə məsul dekan müavinləri." 
            : "The leadership team of the faculty — deputy deans responsible for education, research, international relations, and other areas."}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-80 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse" />)}
          </div>
        ) : deputyDeans.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Dekan müavinləri haqqında məlumat əlavə ediləcək" : "Information about deputy deans will be added soon"} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deputyDeans.map((vd, index) => {
              const fullName = [vd.first_name, vd.last_name, vd.father_name].filter(Boolean).join(" ");
              return (
                <motion.div
                  key={vd.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white dark:bg-white/5 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 dark:border-white/10 hover:-translate-y-2 hover:border-[#ee7c7e]/30 transition-all duration-700 group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110" />
                  
                  <div className="relative z-10">
                    <PersonCard
                      fullName={fullName || "Naməlum əməkdaş"}
                      title={vd.duty || vd.scientific_name}
                      academicDegree={vd.scientific_degree}
                      photoUrl={getImageUrl(vd.profile_image)}
                      email={vd.email}
                      phone={vd.phone}
                      size="md"
                    />
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col items-center">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e] text-center px-4 py-2 bg-[#ee7c7e]/10 rounded-xl">
                         {vd.duty || (currentLang === "az" ? "Dekan Müavini" : "Deputy Dean")}
                       </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </SectionBlock>

      {/* Stunning Management Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-10 rounded-[3rem] bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] text-white shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 transition-transform duration-700">
              <BadgeIcon sx={{ fontSize: 40, color: '#ee7c7e' }} />
           </div>
           <div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">
                {currentLang === "az" ? "Effektiv İdarəetmə" : "Effective Management"}
              </h4>
              <p className="text-white/60 font-medium leading-relaxed max-w-2xl text-lg">
                {currentLang === "az" 
                  ? "Dekan müavinləri fakültənin gündəlik fəaliyyətinin tənzimlənməsində və strateji hədəflərin reallaşdırılmasında mühüm rol oynayırlar." 
                  : "Deputy deans play a crucial role in regulating the daily activities of the faculty and realizing strategic goals."}
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
