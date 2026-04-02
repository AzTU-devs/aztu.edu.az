"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import { getFacultyByCode, FacultyDetail, getImageUrl } from "@/services/facultyService/facultyService";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function DekanPage({ params }: Props) {
  const { facultyId } = use(params);
  const searchParams = useSearchParams();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const currentLang = ((): Lang => {
    const queryLang = searchParams?.get("lang");
    if (queryLang === "az" || queryLang === "en") {
      return queryLang;
    }
    return typeof navigator !== "undefined" && navigator.language?.startsWith("az") ? "az" : "en";
  })();

  useEffect(() => {
    setLoading(true);
    getFacultyByCode(facultyId, currentLang)
      .then((result) => {
        setFaculty(result);
        setLoading(false);
      })
      .catch(() => {
        setFaculty(null);
        setLoading(false);
      });
  }, [facultyId, currentLang]);

  const director = faculty?.director;
  const directorFullName = director
    ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
    : "";

  return (
    <div className="space-y-6">
      <SectionBlock title="Dekan" accent>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-44 h-44 rounded-2xl bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-6 rounded bg-gray-200 dark:bg-slate-700 w-2/3" />
                <div className="h-4 rounded bg-gray-200 dark:bg-slate-700 w-1/3" />
                <div className="h-4 rounded bg-gray-200 dark:bg-slate-700 w-1/2" />
              </div>
            </div>
          </div>
        ) : !director ? (
          <ComingSoon label="Dekan haqqında məlumat tapılmadı" />
        ) : (
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700">
                {director.profile_image ? (
                  <img
                    src={getImageUrl(director.profile_image)}
                    alt={directorFullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1a2355]/10 text-[#1a2355] text-sm font-semibold">
                    Profil şəkli yoxdur
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">{directorFullName}</h2>
                {(director.scientific_title ?? director.duty ?? director.position) && (
                  <p className="text-[#ee7c7e] font-semibold text-sm mt-1">
                    {director.scientific_title ?? director.duty ?? director.position}
                  </p>
                )}
                {director.scientific_degree && (
                  <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{director.scientific_degree}</p>
                )}
              </div>

              {director.bio && (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: director.bio }}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {director.email && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <EmailIcon sx={{ fontSize: 16 }} /> E-poçt
                    </div>
                    <a href={`mailto:${director.email}`} className="block text-sm text-gray-700 dark:text-gray-200 mt-2 break-all">
                      {director.email}
                    </a>
                  </div>
                )}
                {director.phone && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <PhoneIcon sx={{ fontSize: 16 }} /> Telefon
                    </div>
                    <a href={`tel:${director.phone}`} className="block text-sm text-gray-700 dark:text-gray-200 mt-2">
                      {director.phone}
                    </a>
                  </div>
                )}
                {director.room_number && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <LocationOnIcon sx={{ fontSize: 16 }} /> Otaq
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">{director.room_number}</p>
                  </div>
                )}
                {director.working_hours && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <AccessTimeIcon sx={{ fontSize: 16 }} /> İş saatları
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200 space-y-2">
                      {typeof director.working_hours === "string" ? (
                        <p>{director.working_hours}</p>
                      ) : (
                        director.working_hours.map((slot, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3">
                            <span>{slot.day}</span>
                            <span className="font-semibold">{slot.time_range}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </SectionBlock>

      {director?.scientific_events && director.scientific_events.length > 0 && (
        <SectionBlock title="Elmi fəaliyyət sahələri" accent>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {director.scientific_events.map((event, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <div>
                  <span className="font-semibold">{event.event_title}</span>
                  {event.event_description && (
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{event.event_description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {director?.educations && director.educations.length > 0 && (
        <SectionBlock title="Təhsil" accent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {director.educations.map((edu, index) => {
              if (typeof edu === "string") {
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#1a2355] dark:text-blue-300">
                        <SchoolIcon sx={{ fontSize: 20 }} />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{edu}</p>
                    </div>
                  </div>
                );
              }

              const years = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-[#1a2355] dark:text-blue-300">
                      <SchoolIcon sx={{ fontSize: 20 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {edu.degree ?? "Təhsil"}
                      </p>
                      {edu.university && (
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{edu.university}</p>
                      )}
                    </div>
                  </div>
                  {years && (
                    <p className="mt-4 text-xs text-gray-500 dark:text-slate-400">{years}</p>
                  )}
                </div>
              );
            })}
          </div>
        </SectionBlock>
      )}
    </div>
  );
}
