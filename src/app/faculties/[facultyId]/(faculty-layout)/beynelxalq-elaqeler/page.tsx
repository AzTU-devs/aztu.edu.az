"use client";

import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LaunchIcon from "@mui/icons-material/Launch";
import { PartnerUniversity } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

const partnerUniversities: PartnerUniversity[] = [
  {
    country: "Türkiyə",
    universities: [
      { name: "İstanbul Texniki Universiteti", website: "https://www.itu.edu.tr" },
      { name: "Orta Doğu Texniki Universiteti (ODTÜ)", website: "https://www.metu.edu.tr" },
      { name: "Ankara Universiteti" },
    ],
  },
  {
    country: "Rusiya",
    universities: [
      { name: "Moskva Dövlət Texniki Universiteti (MGTU)" },
      { name: "Sankt-Peterburq Politexnik Universiteti" },
    ],
  },
  {
    country: "Gürcüstan",
    universities: [
      { name: "Tbilisi Dövlət Texniki Universiteti", website: "https://gtu.ge" },
    ],
  },
  {
    country: "Almaniya",
    universities: [
      { name: "Drezden Texniki Universiteti", website: "https://tu-dresden.de" },
    ],
  },
];

export default function BeynelxalqElaqelerPage() {
  const { lang: currentLang } = useLanguage();

  const t = {
    title: currentLang === "az" ? "Beynəlxalq əlaqələr" : "International Relations",
    description: currentLang === "az" 
        ? "Fakültənin əməkdaşları bir çox xarici ölkə universitetləri ilə əlaqə saxlayır və elmi əməkdaşlıq edirlər." 
        : "Faculty members maintain connections and scientific cooperation with many foreign universities.",
    partnersTitle: currentLang === "az" ? "Tərəfdaş Universitetlər" : "Partner Universities",
    globalBannerTitle: currentLang === "az" ? "Qlobal Elmi Şəbəkə" : "Global Scientific Network",
    globalBannerDesc: currentLang === "az" 
        ? "Biz dünya səviyyəsində tanınmış elm mərkəzləri ilə bilik və təcrübə mübadiləsi aparırıq." 
        : "We exchange knowledge and experience with world-renowned scientific centers."
  };

  return (
    <div className="space-y-12">
      <SectionBlock title={t.title} accent>
        <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-12 max-w-2xl leading-relaxed">
          {t.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {partnerUniversities.map((partner, pIdx) => (
            <motion.div 
              key={partner.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pIdx * 0.1 }}
              className="space-y-6"
            >
              {/* Country header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] shadow-inner">
                  <PublicIcon sx={{ fontSize: 24 }} />
                </div>
                <h3 className="font-black text-[#1a2355] dark:text-white text-xl uppercase tracking-tighter">
                  {partner.country}
                </h3>
              </div>

              {/* Universities list */}
              <div className="space-y-3">
                {partner.universities.map((uni, uIdx) => (
                  <motion.div
                    key={uni.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (pIdx * 0.1) + (uIdx * 0.05) }}
                    className="group relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-[#ee7c7e]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] group-hover:scale-150 transition-transform" />
                            <span className="text-sm font-bold text-[#1a2355] dark:text-white/90 group-hover:text-[#ee7c7e] transition-colors">{uni.name}</span>
                        </div>
                        {uni.website && (
                            <a
                                href={uni.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#ee7c7e] hover:text-white transition-all"
                                title="Website"
                            >
                                <LanguageIcon sx={{ fontSize: 16 }} />
                            </a>
                        )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* Stunning Global Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3.5rem] bg-[#1a2355] p-12 md:p-16 text-white shadow-2xl group"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee7c7e]/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
           <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:rotate-12 transition-all duration-700">
              <TravelExploreIcon sx={{ fontSize: 48, color: '#ee7c7e' }} />
           </div>
           <div className="flex-1">
              <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">{t.globalBannerTitle}</h4>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-2xl">
                {t.globalBannerDesc}
              </p>
           </div>
           <div className="flex-shrink-0">
                <button className="px-8 py-4 rounded-2xl bg-[#ee7c7e] hover:bg-[#f09395] text-white font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-red-900/40 active:scale-95 flex items-center gap-2 group/btn">
                    Global Portal
                    <LaunchIcon sx={{ fontSize: 14 }} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
