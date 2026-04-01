"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/MeetingRoom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFacultyByCode, FacultyDetail, SectionItem, getImageUrl } from "@/services/facultyService/facultyService";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function FacultyHaqqimizdaPage({ params }: Props) {
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

  const renderSectionItems = (title: string, items?: SectionItem[]) => {
    if (!items || items.length === 0) return null;
    return (
      <SectionBlock key={title} title={title} accent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id ?? item.title} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <span className="mt-0.5 text-[#ee7c7e]">•</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </SectionBlock>
    );
  };

  const renderPeopleSection = (title: string, people?: FacultyDetail["deputy_deans"] | FacultyDetail["scientific_council"] | FacultyDetail["workers"]) => {
    if (!people || people.length === 0) return null;
    return (
      <SectionBlock key={title} title={title} accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((person, index) => {
            const fullName = [person.first_name, person.last_name, person.father_name].filter(Boolean).join(" ");
            return (
              <PersonCard
                key={`${title}-${index}`}
                fullName={fullName || "Naməlum əməkdaş"}
                title={person.duty || person.scientific_name || person.scientific_title || person.position}
                academicDegree={person.scientific_degree}
                photoUrl={getImageUrl(person.profile_image)}
                email={person.email}
                phone={person.phone}
                size="sm"
              />
            );
          })}
        </div>
      </SectionBlock>
    );
  };

  return (
    <div className="space-y-6">
      <SectionBlock title="Fakültə haqqında" accent>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-5 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 rounded bg-gray-200 dark:bg-slate-700 w-5/6" />
            <div className="h-5 rounded bg-gray-200 dark:bg-slate-700 w-4/6" />
          </div>
        ) : faculty?.html_content ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: faculty.html_content }}
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            Bu fakültə haqqında məlumat hələ mövcud deyil.
          </p>
        )}
      </SectionBlock>

      {director && (
        <SectionBlock title="Dekan" accent>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
              {director.profile_image ? (
                <img src={getImageUrl(director.profile_image)} alt={directorFullName} className="w-full h-72 object-cover" />
              ) : (
                <div className="w-full h-72 flex items-center justify-center bg-[#1a2355]/10 text-[#1a2355] text-sm font-semibold">
                  Profil şəkli yoxdur
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white">{directorFullName}</h2>
                <p className="text-sm text-[#ee7c7e] mt-1">{director.scientific_title ?? director.duty ?? director.position}</p>
                {director.scientific_degree && (
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{director.scientific_degree}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {director.email && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <EmailIcon sx={{ fontSize: 18 }} /> E-poçt
                    </div>
                    <a href={`mailto:${director.email}`} className="block text-sm text-gray-700 dark:text-gray-200 mt-2 break-all">{director.email}</a>
                  </div>
                )}
                {director.phone && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <PhoneIcon sx={{ fontSize: 18 }} /> Telefon
                    </div>
                    <a href={`tel:${director.phone}`} className="block text-sm text-gray-700 dark:text-gray-200 mt-2">{director.phone}</a>
                  </div>
                )}
                {director.room_number && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <RoomIcon sx={{ fontSize: 18 }} /> Otaq
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">{director.room_number}</p>
                  </div>
                )}
                {director.working_hours && (
                  <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 p-4 border border-gray-100 dark:border-slate-600">
                    <div className="flex items-center gap-2 text-sm text-[#1a2355] font-semibold">
                      <AccessTimeIcon sx={{ fontSize: 18 }} /> İş saatları
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200 space-y-2">
                      {typeof director.working_hours === "string" ? (
                        <p>{director.working_hours}</p>
                      ) : (
                        director.working_hours.map((slot, index) => (
                          <div key={index} className="flex items-center justify-between gap-3">
                            <span>{slot.day}</span>
                            <span className="font-semibold">{slot.time_range}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {director.scientific_events && director.scientific_events.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#1a2355] dark:text-white mb-3">Elmi fəaliyyətlər</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {director.scientific_events.map((event, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-0.5">•</span>
                        <span>{event.event_title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {director.educations && director.educations.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#1a2355] dark:text-white mb-3">Təhsili</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {director.educations.map((edu, index) => {
                      if (typeof edu === "string") {
                        return (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-0.5">•</span>
                            <span>{edu}</span>
                          </li>
                        );
                      }
                      const years = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");
                      return (
                        <li key={index} className="space-y-1">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5">•</span>
                            <div>
                              <p className="font-semibold">{edu.degree ?? "Təhsil"}</p>
                              {edu.university && <p className="text-xs text-gray-500 dark:text-slate-400">{edu.university}</p>}
                            </div>
                          </div>
                          {years && <p className="text-xs text-gray-500 dark:text-slate-400 ml-6">{years}</p>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </SectionBlock>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {renderSectionItems("Laboratoriyalar", faculty?.laboratories)}
        {renderSectionItems("Elmi tədqiqat işləri", faculty?.research_works)}
        {renderSectionItems("Partnyor şirkətlər", faculty?.partner_companies)}
        {renderSectionItems("Fəaliyyət məqsəd və istiqamətləri", faculty?.objectives)}
        {renderSectionItems("Vəzifələr", faculty?.duties)}
        {renderSectionItems("Layihələr", faculty?.projects)}
      </div>

      {faculty?.directions_of_action && faculty.directions_of_action.length > 0 && (
        <SectionBlock title="Fəaliyyət istiqamətləri" accent>
          <div className="space-y-4">
            {faculty.directions_of_action.map((dir) => (
              <div key={dir.id ?? dir.title} className="rounded-2xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5">
                <h3 className="font-semibold text-[#1a2355] dark:text-white text-sm mb-2">{dir.title}</h3>
                {dir.description && (
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: dir.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {renderPeopleSection("Dekan müavinləri", faculty?.deputy_deans)}
      {renderPeopleSection("Elmi şura", faculty?.scientific_council)}
      {renderPeopleSection("Əməkdaşlar", faculty?.workers)}

      {!loading && !faculty && (
        <div className="text-center py-16 text-gray-500 dark:text-slate-400">
          Bu fakültə üçün məlumat tapılmadı.
        </div>
      )}
    </div>
  );
}
