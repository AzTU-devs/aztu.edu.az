"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { getDepartment } from "@/data/administrationDepts";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function AdminDepartmentPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";
  const dept = getDepartment(slug);

  if (!dept) {
    return (
      <>
        <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a] flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-[#1a2355] dark:text-white">Bölmə tapılmadı</h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Axtardığınız idarə mövcud deyil və ya köçürülmüşdür.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#1a2355] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2355]/90 transition-colors"
            >
              <HomeIcon sx={{ fontSize: 16 }} />
              Ana səhifəyə qayıt
            </Link>
          </div>
        </main>
        </>
    );
  }

  const dir = dept.director;

  type ContactItem = { icon: React.ReactNode; label: string; value: string; href: string | undefined };
  const directorContacts: ContactItem[] = [
    { icon: <EmailIcon sx={{ fontSize: 16 }} />, label: "E-poçt", value: dir.email, href: `mailto:${dir.email}` },
    { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: "Telefon", value: dir.phone, href: `tel:${dir.phone}` },
    ...(dir.office ? [{ icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: "Otaq", value: dir.office, href: undefined }] : []),
  ];

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
        {/* Banner */}
        <div className="bg-[#1a2355] text-white px-4 md:px-10 lg:px-20 py-12 md:py-16">
          <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-widest mb-2">
            AzTU İdarəetmə
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight max-w-3xl">
            {dept.name}
          </h1>
          <p className="text-blue-200 text-sm mt-1">{dept.name_en}</p>
        </div>

        <div className="px-4 md:px-10 lg:px-20 py-10 space-y-8">
          {/* Section 1: Director */}
          <SectionBlock title="Rəhbərlik" accent>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700">
                  <img
                    src={dir.photo_url}
                    alt={`${dir.full_name} ${dir.father_name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">
                    {dir.full_name}
                  </h2>
                  <p className="text-gray-500 dark:text-slate-400 text-sm">{dir.father_name}</p>
                  {dir.academic_degree && (
                    <p className="text-[#ee7c7e] font-semibold text-sm mt-1">{dir.academic_degree}</p>
                  )}
                  <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{dir.title}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {directorContacts.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl px-4 py-3"
                    >
                      <span className="text-[#1a2355] dark:text-blue-400 mt-0.5 flex-shrink-0">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-gray-700 dark:text-gray-200 font-semibold hover:text-[#ee7c7e] transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {dir.reception_hours && (
                  <div className="bg-[#1a2355] text-white rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <AccessTimeIcon sx={{ fontSize: 20, color: "#ee7c7e" }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-0.5">Qəbul Saatları</p>
                      <p className="text-sm font-bold">{dir.reception_hours}</p>
                    </div>
                  </div>
                )}

                {/* Bio */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-7">{dir.bio}</p>
              </div>
            </div>

            {/* Education */}
            {dir.education && dir.education.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <SchoolIcon sx={{ fontSize: 18, color: "#ee7c7e" }} />
                  <h3 className="font-bold text-[#1a2355] dark:text-white text-sm">Təhsil</h3>
                </div>
                <ul className="space-y-3">
                  {dir.education.map((edu) => (
                    <li key={edu.year} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-[#1a2355] dark:text-blue-400 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-2 py-1 rounded-lg flex-shrink-0 mt-0.5 min-w-[42px] text-center">
                        {edu.year}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{edu.institution}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </SectionBlock>

          {/* Section 2: Workers */}
          {dept.workers.length > 0 && (
            <SectionBlock title="Əməkdaşlar" accent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dept.workers.map((worker) => (
                  <PersonCard
                    key={worker.id}
                    fullName={`${worker.full_name} ${worker.father_name}`}
                    title={worker.title}
                    academicDegree={worker.academic_degree}
                    photoUrl={worker.photo_url}
                    email={worker.email}
                    phone={worker.phone}
                    size="md"
                  />
                ))}
              </div>
            </SectionBlock>
          )}

          {/* Section 3: Normativ Senedler */}
          {dept.normativ_senedler.length > 0 && (
            <SectionBlock title="Normativ Sənədlər" accent>
              <ul className="space-y-3">
                {dept.normativ_senedler.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between gap-4 bg-gray-50 dark:bg-slate-700/40 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <DescriptionIcon sx={{ fontSize: 20, color: "#ee7c7e", flexShrink: 0, marginTop: "2px" }} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug truncate">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{doc.date}</p>
                      </div>
                    </div>
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1a2355] text-white hover:bg-[#1a2355]/90 transition-colors flex-shrink-0"
                    >
                      <OpenInNewIcon sx={{ fontSize: 12 }} />
                      Baxmaq
                    </a>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}

          {/* Section 4: Objectives */}
          {dept.objectives.length > 0 && (
            <SectionBlock title="Məqsədlər" accent>
              <ol className="space-y-3">
                {dept.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-6 h-6 rounded-full bg-[#ee7c7e]/20 text-[#ee7c7e] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ol>
            </SectionBlock>
          )}

          {/* Section 5: Core Functions */}
          {dept.core_functions.length > 0 && (
            <SectionBlock title="Əsas Funksiyalar" accent>
              <ul className="space-y-3">
                {dept.core_functions.map((fn, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircleOutlineIcon sx={{ fontSize: 17, color: "#1a2355", flexShrink: 0, marginTop: "2px" }} />
                    {fn}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}
        </div>
      </main>
      </>
  );
}
