"use client";

import { use } from "react";
import Link from "next/link";
import { getFacultyById, getCafedrasByFacultyId } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import TargetIcon from "@mui/icons-material/TrackChanges";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function FacultyHaqqimizdaPage({ params }: Props) {
  const { facultyId } = use(params);
  const faculty = getFacultyById(Number(facultyId));
  const cafedras = getCafedrasByFacultyId(Number(facultyId));

  const infoSections = [
    {
      icon: <ScienceIcon sx={{ color: "#1a2355" }} />,
      title: "Fakültə nəzdində fəaliyyət göstərən laboratoriyalar",
      content: "Fakültənin müasir laboratoriyaları tədris və elmi-tədqiqat fəaliyyəti üçün lazımi şəraiti təmin edir.",
    },
    {
      icon: <AssignmentIcon sx={{ color: "#1a2355" }} />,
      title: "Hansı elmi-tədqiqat işləri yerinə yetirilir",
      content: "Fakültə əməkdaşları müxtəlif fundamental və tətbiqi xarakterli elmi-tədqiqat işlərini həyata keçirirlər.",
    },
    {
      icon: <BusinessIcon sx={{ color: "#1a2355" }} />,
      title: "Hansı müəssisələrlə əməkdaşlıq edir",
      content: "Fakültə bir sıra aparıcı sənaye müəssisələri, dövlət qurumları və beynəlxalq universitetlərlə əməkdaşlıq edir.",
    },
    {
      icon: <TargetIcon sx={{ color: "#1a2355" }} />,
      title: "Fəaliyyət məqsəd və istiqamətləri",
      content: "Fakültənin əsas məqsədi müasir tələblərə cavab verən yüksək ixtisaslı mühəndis-texniki kadrların hazırlanmasıdır.",
    },
    {
      icon: <AssignmentIcon sx={{ color: "#1a2355" }} />,
      title: "Fakültənin vəzifələri",
      content: "Yüksəkkeyfiyyətli tədris prosesinin həyata keçirilməsi, elmi-tədqiqat işlərinin aparılması və tələbələrin peşəkar inkişafına şərait yaradılması.",
    },
    {
      icon: <RocketLaunchIcon sx={{ color: "#1a2355" }} />,
      title: "Layihələr",
      content: "Fakültə milli və beynəlxalq müxtəlif qrant layihələrinin icrasında fəal iştirak edir.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Fakültə haqqında - general info */}
      <SectionBlock title="Fakültə haqqında" accent>
        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          {faculty?.description ?? "Bu fakültə haqqında ümumi məlumat əlavə ediləcək."}
        </p>
      </SectionBlock>

      {/* Departments under faculty */}
      {cafedras.length > 0 && (
        <SectionBlock title="Fakültənin nəzdində fəaliyyət göstərən kafedralar" accent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cafedras.map((c) => (
              <Link
                key={c.cafedra_id}
                href={`/faculties/${facultyId}/kafedralar/${c.cafedra_id}/giris`}
                className="flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 rounded-xl px-4 py-3 hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/50 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0">
                    <MenuBookIcon sx={{ fontSize: 18, color: "#1a2355" }} />
                  </div>
                  <span className="text-sm font-medium text-[#1a2355] dark:text-white leading-snug">
                    {c.name}
                  </span>
                </div>
                <ChevronRightIcon
                  sx={{ fontSize: 18, color: "#1a2355" }}
                  className="opacity-30 group-hover:opacity-70 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Info sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoSections.map((section) => (
          <SectionBlock key={section.title}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                {section.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#1a2355] dark:text-white text-sm mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </SectionBlock>
        ))}
      </div>
    </div>
  );
}
