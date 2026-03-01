"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import { PartnerUniversity } from "@/types/faculty";

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
  return (
    <div className="space-y-6">
      <SectionBlock title="Beynəlxalq əlaqələr" accent>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          Fakültənin əməkdaşları bir çox xarici ölkə universitetləri ilə əlaqə saxlayır
          və elmi əməkdaşlıq edirlər.
        </p>

        <div className="space-y-6">
          {partnerUniversities.map((partner) => (
            <div key={partner.country}>
              {/* Country header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                  <PublicIcon sx={{ fontSize: 18, color: "#1a2355" }} />
                </div>
                <h3 className="font-bold text-[#1a2355] dark:text-white text-base">
                  {partner.country}
                </h3>
              </div>

              {/* Universities list */}
              <div className="ml-10 space-y-2">
                {partner.universities.map((uni) => (
                  <div
                    key={uni.name}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/40 rounded-xl px-4 py-3 border border-gray-100 dark:border-slate-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] flex-shrink-0" />
                    {uni.website ? (
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#1a2355] dark:text-blue-300 hover:underline font-medium flex items-center gap-1"
                      >
                        {uni.name}
                        <LanguageIcon sx={{ fontSize: 14 }} className="opacity-60" />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {uni.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
