"use client";

import PersonIcon from "@mui/icons-material/Person";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteDirector } from "@/types/researchInstitute";

interface DirectorCardProps {
  director: ResearchInstituteDirector;
  lang: string;
}

export default function ResearchInstituteDirectorCard({ director, lang }: DirectorCardProps) {
  const labels = {
    bio: lang === "az" ? "Haqqında" : "About",
    education: lang === "az" ? "Təhsil" : "Education",
    researchAreas: lang === "az" ? "Tədqiqat Sahələri" : "Research Areas",
    office: lang === "az" ? "Otaq" : "Office",
    email: lang === "az" ? "E-poçt" : "Email",
  };

  const imageUrl = getImageUrl(director.image_url);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-[0_10px_50_px_-12px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-slate-700/50 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Profile Photo & Key Info */}
        <div className="lg:w-1/3 p-8 lg:p-12 bg-gray-50/50 dark:bg-slate-900/20 border-r border-gray-100 dark:border-slate-700/50 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#ee7c7e] rounded-[2rem] rotate-6 scale-95 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
            <div className="relative w-56 h-56 rounded-[2rem] bg-white dark:bg-slate-700 overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
              {imageUrl ? (
                <img src={imageUrl} alt={director.full_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1a2355]/5 text-[#1a2355]">
                  <PersonIcon sx={{ fontSize: 120 }} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <h3 className="text-2xl font-black text-[#1a2355] dark:text-white leading-tight">
              {director.full_name}
            </h3>
            <p className="text-[#ee7c7e] font-black uppercase tracking-widest text-[10px] bg-[#ee7c7e]/10 px-4 py-1.5 rounded-full inline-block">
              {director.title}
            </p>
          </div>

          <div className="mt-8 w-full space-y-3">
             {director.office && (
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-slate-400 text-sm font-bold">
                  <RoomIcon sx={{ fontSize: 18, color: "#ee7c7e" }} />
                  {labels.office}: {director.office}
                </div>
             )}
             {director.email && (
                <a href={`mailto:${director.email}`} className="flex items-center justify-center gap-2 text-[#1a2355] dark:text-white/80 text-sm font-bold hover:text-[#ee7c7e] transition-colors">
                  <EmailIcon sx={{ fontSize: 18, color: "#ee7c7e" }} />
                  {director.email}
                </a>
             )}
          </div>
        </div>

        {/* Right: Bio and Details */}
        <div className="flex-1 p-8 lg:p-12 space-y-12">
          {director.biography && (
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-8 bg-[#ee7c7e] rounded-full" />
              <h4 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 uppercase tracking-wider">
                {labels.bio}
              </h4>
              <div className="relative z-10">
                <SanitizedHtml
                  html={director.biography}
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 leading-relaxed font-medium text-justify"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Research Areas Card */}
            {director.research_areas.length > 0 && (
              <div className="p-8 rounded-[2rem] bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10">
                <h4 className="text-sm font-black text-[#1a2355] dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ScienceIcon sx={{ fontSize: 20, color: "#ee7c7e" }} />
                  {labels.researchAreas}
                </h4>
                <ul className="space-y-3">
                  {director.research_areas.map((area) => (
                    <li key={area.id} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ee7c7e] rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-sm font-bold text-gray-600 dark:text-slate-300">{area.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education Card */}
            {director.educations.length > 0 && (
              <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-700/50">
                <h4 className="text-sm font-black text-[#1a2355] dark:text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                  <SchoolIcon sx={{ fontSize: 20, color: "#ee7c7e" }} />
                  {labels.education}
                </h4>
                <ul className="space-y-6">
                  {director.educations.map((edu) => (
                    <li key={edu.id} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#ee7c7e] before:rounded-full">
                      <p className="text-sm font-black text-gray-800 dark:text-white leading-tight">
                        {edu.degree}
                      </p>
                      <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase mt-1">
                        {edu.university} <span className="text-[#ee7c7e] ml-1">· {edu.start_year}{edu.end_year ? ` - ${edu.end_year}` : ""}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
