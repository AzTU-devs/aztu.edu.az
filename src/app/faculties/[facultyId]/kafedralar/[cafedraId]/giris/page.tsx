"use client";

import { use } from "react";
import { getCafedraById } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
import InfoIcon from "@mui/icons-material/Info";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraGirisPage({ params }: Props) {
  const { cafedraId } = use(params);
  const cafedra = getCafedraById(Number(cafedraId));

  const sections = [
    {
      id: "haqqinda",
      icon: <InfoIcon sx={{ color: "#1a2355" }} />,
      title: "Kafedra haqqında ümumi məlumat",
      content:
        cafedra?.description ??
        "Kafedra haqqında ümumi məlumat tezliklə əlavə olunacaq.",
      directions: null as string[] | null,
    },
    {
      id: "meqsed",
      icon: <TrackChangesIcon sx={{ color: "#1a2355" }} />,
      title: "Kafedranın məqsədi",
      content:
        cafedra?.purpose ??
        "Kafedranın əsas məqsədi müasir tələblərə cavab verən yüksəkixtisaslı mütəxəssislərin hazırlanması, elmi-tədqiqat işlərinin aparılması və müvafiq sahə üzrə kadr potensialının artırılmasıdır.",
      directions: null as string[] | null,
    },
    {
      id: "istiqametler",
      icon: <AccountTreeIcon sx={{ color: "#1a2355" }} />,
      title: "Kafedranın əsas fəaliyyət istiqamətləri",
      content: cafedra?.main_directions
        ? null
        : "Kafedranın fəaliyyəti bir neçə əsas istiqaməti əhatə edir: tədris işinin təşkili, elmi-tədqiqat fəaliyyəti, beynəlxalq əlaqələrin genişləndirilməsi və tələbələrə metodik yardımın göstərilməsi.",
      directions: cafedra?.main_directions ?? null,
    },
    {
      id: "tedris",
      icon: <MenuBookIcon sx={{ color: "#1a2355" }} />,
      title: "Tədris işi",
      content:
        "Kafedra üzrə tədris olunan fənlər müasir standartlara uyğun tədris planları əsasında həyata keçirilir. Bakalavr, magistr və doktorantura səviyyəsində tədris aparılır.",
      directions: null as string[] | null,
    },
    {
      id: "beynelxalq",
      icon: <LanguageIcon sx={{ color: "#1a2355" }} />,
      title: "Beynəlxalq əlaqələr",
      content:
        "Kafedra əməkdaşları bir sıra xarici ölkə universitetləri ilə əlaqə saxlayır, birgə tədqiqat layihələri həyata keçirir və beynəlxalq konfranslarda iştirak edir.",
      directions: null as string[] | null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid — only shown when cafedra has stats data */}
      {cafedra?.stats && cafedra.stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {cafedra.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 flex flex-col items-center text-center gap-1"
            >
              <span className="text-2xl font-extrabold text-[#1a2355] dark:text-white leading-none">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-400 font-medium leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sticky in-page anchor nav */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-1 min-w-max">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-semibold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/5 dark:bg-[#1a2355]/20 hover:bg-[#1a2355]/10 dark:hover:bg-[#1a2355]/30 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {s.title.length > 30 ? s.title.slice(0, 30) + "…" : s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Content sections */}
      {sections.map((section) => (
        <div key={section.id} id={section.id} className="scroll-mt-6">
          <SectionBlock accent>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                {section.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-[#1a2355] dark:text-white text-base mb-3">
                  {section.title}
                </h2>
                {section.directions ? (
                  <ul className="space-y-2">
                    {section.directions.map((dir, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <FiberManualRecordIcon sx={{ fontSize: 8, color: "#ee7c7e", marginTop: "6px", flexShrink: 0 }} />
                        {dir}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </SectionBlock>
        </div>
      ))}
    </div>
  );
}
