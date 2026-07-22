"use client";

import { motion } from "framer-motion";
import { FacultyPanel } from "@/components/faculty/ui";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
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
    universities: [{ name: "Tbilisi Dövlət Texniki Universiteti", website: "https://gtu.ge" }],
  },
  {
    country: "Almaniya",
    universities: [{ name: "Drezden Texniki Universiteti", website: "https://tu-dresden.de" }],
  },
];

export default function BeynelxalqElaqelerPage() {
  const { lang: currentLang } = useLanguage();

  const t = {
    title: currentLang === "az" ? "Beynəlxalq əlaqələr" : "International Relations",
    description: currentLang === "az"
      ? "Fakültənin əməkdaşları bir çox xarici ölkə universiteti ilə əlaqə saxlayır və elmi əməkdaşlıq edir."
      : "Faculty members maintain connections and scientific cooperation with many foreign universities.",
    globalBannerTitle: currentLang === "az" ? "Qlobal Elmi Şəbəkə" : "Global Scientific Network",
    globalBannerDesc: currentLang === "az"
      ? "Dünya səviyyəsində tanınmış elm mərkəzləri ilə bilik və təcrübə mübadiləsi aparırıq."
      : "We exchange knowledge and experience with world-renowned scientific centers.",
  };

  return (
    <div className="space-y-8">
      <FacultyPanel title={t.title} eyebrow={currentLang === "az" ? "Əməkdaşlıq" : "Cooperation"} icon={PublicIcon}>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.description}</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {partnerUniversities.map((partner, pIdx) => (
            <motion.div
              key={partner.country}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pIdx * 0.08 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ee7c7e]/10 text-[#e05b5d] dark:text-[#fb7185]">
                  <PublicIcon sx={{ fontSize: 20 }} />
                </span>
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">{partner.country}</h3>
              </div>

              <div className="space-y-2">
                {partner.universities.map((uni) => (
                  <div
                    key={uni.name}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#ee7c7e]/40 hover:shadow-sm dark:border-white/10 dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                      <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-[#ee7c7e] dark:text-slate-200">
                        {uni.name}
                      </span>
                    </div>
                    {uni.website && (
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition hover:bg-[#ee7c7e] hover:text-white dark:bg-white/5"
                        title="Website"
                      >
                        <LanguageIcon sx={{ fontSize: 16 }} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FacultyPanel>

      {/* Global banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1a2355] p-8 text-white md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ee7c7e]/15 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <TravelExploreIcon sx={{ fontSize: 34, color: "#ee7c7e" }} />
          </span>
          <div>
            <h4 className="mb-2 text-2xl font-bold tracking-tight">{t.globalBannerTitle}</h4>
            <p className="max-w-2xl leading-relaxed text-white/60">{t.globalBannerDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
