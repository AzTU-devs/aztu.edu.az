"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/MeetingRoom";
import InfoIcon from "@mui/icons-material/Info";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ScienceIcon from "@mui/icons-material/Science";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, ContentSection } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

function StatCard({ label, value, icon: Icon, index }: { label: string; value: number; icon: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a2355]/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center mb-4 text-[#1a2355] dark:text-blue-300 group-hover:bg-[#ee7c7e] group-hover:text-white transition-colors duration-300">
          <Icon />
        </div>
        <span className="text-3xl font-extrabold text-[#1a2355] dark:text-white mb-1 tabular-nums">
          {value}
        </span>
        <span className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider leading-snug">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function FacultyHaqqimizdaPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
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

  const director = faculty?.director;
  const directorFullName = director
    ? [director.last_name, director.first_name, director.father_name].filter(Boolean).join(" ")
    : "";

  const stats = faculty ? [
    { label: currentLang === "az" ? "Bakalavr ixtisasları" : "Bachelor Programs", value: faculty.bachelor_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Magistratura ixtisasları" : "Master Programs", value: faculty.master_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Doktorantura ixtisasları" : "PhD Programs", value: faculty.phd_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", value: faculty.laboratories_count, icon: ScienceIcon },
    { label: currentLang === "az" ? "Beynəlxalq əlaqələr" : "Int. Collaborations", value: faculty.international_collaborations_count, icon: PublicIcon },
    { label: currentLang === "az" ? "Sənaye əməkdaşlığı" : "Industrial Partners", value: faculty.industrial_collaborations_count, icon: BusinessIcon },
    { label: currentLang === "az" ? "Layihə və patentlər" : "Projects & Patents", value: faculty.projects_patents_count, icon: AssignmentIcon },
  ].filter(s => s.value !== null && s.value !== undefined) : [];

  const renderContentSection = (id: string, icon: React.ReactNode, title: string, items?: ContentSection[], htmlContent?: string) => {
    if ((!items || items.length === 0) && !htmlContent) return null;
    return (
      <motion.div 
        id={id} 
        className="scroll-mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionBlock accent>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-900/10">
              {icon}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[#1a2355] dark:text-white text-lg mb-4">
                {title}
              </h2>
              {htmlContent ? (
                <div
                  className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items?.map((item) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4 border border-gray-100 dark:border-slate-700 transition-all hover:border-[#ee7c7e]/30">
                      <div className="flex items-start gap-3">
                        <FiberManualRecordIcon sx={{ fontSize: 10, color: "#ee7c7e", marginTop: "6px", flexShrink: 0 }} />
                        <div>
                          <p className="font-bold text-[#1a2355] dark:text-white text-sm">{item.title}</p>
                          {item.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{item.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SectionBlock>
      </motion.div>
    );
  };

  const navSections = [
    { id: "haqqinda", title: currentLang === "az" ? "Haqqında" : "About" },
    { id: "meqsed", title: currentLang === "az" ? "Məqsədlər" : "Objectives" },
    { id: "vezifeler", title: currentLang === "az" ? "Vəzifələr" : "Duties" },
    { id: "istiqametler", title: currentLang === "az" ? "İstiqamətlər" : "Directions" },
    { id: "laboratoriyalar", title: currentLang === "az" ? "Laboratoriyalar" : "Laboratories" },
    { id: "tedqiqat", title: currentLang === "az" ? "Tədqiqat" : "Research" },
    { id: "layiheler", title: currentLang === "az" ? "Layihələr" : "Projects" },
    { id: "partnyorlar", title: currentLang === "az" ? "Partnyorlar" : "Partners" },
  ];

  return (
    <div className="space-y-10">
      {/* Dynamic Stats Section */}
      {!loading && stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} index={i} />
          ))}
        </div>
      )}

      {/* Modern Anchor Nav */}
      {!loading && faculty && (
        <div className="sticky top-[84px] lg:top-2 z-20 -mx-4 px-4 py-2 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
            {navSections.map((s) => {
              const hasContent = 
                (s.id === "haqqinda" && faculty.html_content) ||
                (s.id === "meqsed" && faculty.objectives?.length > 0) ||
                (s.id === "vezifeler" && faculty.duties?.length > 0) ||
                (s.id === "istiqametler" && faculty.directions_of_action?.length > 0) ||
                (s.id === "laboratoriyalar" && faculty.laboratories?.length > 0) ||
                (s.id === "tedqiqat" && faculty.research_works?.length > 0) ||
                (s.id === "layiheler" && faculty.projects?.length > 0) ||
                (s.id === "partnyorlar" && faculty.partner_companies?.length > 0);
              
              if (!hasContent) return null;

              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[11px] font-bold text-[#1a2355] dark:text-blue-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-[#ee7c7e] hover:text-[#ee7c7e] px-4 py-2 rounded-full transition-all whitespace-nowrap shadow-sm"
                >
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse" />
        </div>
      ) : (
        <div className="space-y-8">
          {renderContentSection("haqqinda", <InfoIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fakültə haqqında" : "About Faculty", undefined, faculty?.html_content)}
          
          {/* Director Banner - More Visual */}
          {director && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 lg:w-1/4 h-80 md:h-auto relative overflow-hidden group">
                  {director.profile_image ? (
                    <img src={getImageUrl(director.profile_image)} alt={directorFullName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a2355]/5 text-[#1a2355] font-bold">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355]/80 via-transparent to-transparent opacity-60 md:hidden" />
                  <div className="absolute bottom-4 left-4 text-white md:hidden">
                    <p className="font-bold text-lg leading-tight">{directorFullName}</p>
                    <p className="text-xs text-white/80">{director.scientific_title}</p>
                  </div>
                </div>
                
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="hidden md:block mb-6">
                    <span className="text-[#ee7c7e] text-xs font-bold uppercase tracking-widest">{currentLang === "az" ? "Fakültə Dekanı" : "Faculty Dean"}</span>
                    <h2 className="text-3xl font-extrabold text-[#1a2355] dark:text-white mt-1 leading-tight">{directorFullName}</h2>
                    <p className="text-gray-500 dark:text-slate-400 font-medium mt-1">{director.scientific_title} • {director.scientific_degree}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {director.email && (
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#1a2355] dark:text-blue-300 group-hover/item:bg-[#1a2355] group-hover/item:text-white transition-colors">
                          <EmailIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{currentLang === "az" ? "E-poçt" : "Email"}</p>
                          <a href={`mailto:${director.email}`} className="text-sm font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors">{director.email}</a>
                        </div>
                      </div>
                    )}
                    {director.phone && (
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-[#1a2355] dark:text-green-300 group-hover/item:bg-[#1a2355] group-hover/item:text-white transition-colors">
                          <PhoneIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{currentLang === "az" ? "Telefon" : "Phone"}</p>
                          <a href={`tel:${director.phone}`} className="text-sm font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors">{director.phone}</a>
                        </div>
                      </div>
                    )}
                    {director.room_number && (
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-[#1a2355] dark:text-orange-300 group-hover/item:bg-[#1a2355] group-hover/item:text-white transition-colors">
                          <RoomIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{currentLang === "az" ? "Otaq" : "Room"}</p>
                          <p className="text-sm font-bold text-[#1a2355] dark:text-white">{director.room_number}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-2">
                     <Link 
                       href={`/faculties/${facultySlug}/haqqimizda/dekan`} 
                       className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1a2355] hover:bg-[#2a3a8a] text-white text-sm font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                     >
                        {currentLang === "az" ? "Haqqında ətraflı" : "Detailed Bio"}
                        <ChevronRightIcon sx={{ fontSize: 18 }} />
                     </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {renderContentSection("meqsed", <TrackChangesIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət məqsədləri" : "Strategic Objectives", faculty?.objectives)}
          {renderContentSection("vezifeler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Vəzifələr" : "Duties & Responsibilities", faculty?.duties)}
          {renderContentSection("istiqametler", <AccountTreeIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", undefined, faculty?.directions_of_action?.map(d => `<div class="mb-4"><h4 class="font-bold text-[#1a2355] dark:text-white mb-2">${d.title}</h4><div class="text-sm">${d.description}</div></div>`).join(""))}
          {renderContentSection("laboratoriyalar", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Laboratoriyalar" : "Laboratories", faculty?.laboratories)}
          {renderContentSection("tedqiqat", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Elmi tədqiqat işləri" : "Scientific Research", faculty?.research_works)}
          {renderContentSection("layiheler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Layihələr" : "Projects & Initiatives", faculty?.projects)}
          {renderContentSection("partnyorlar", <BusinessIcon sx={{ color: "white" }} />, currentLang === "az" ? "Partnyor şirkətlər" : "Industrial Partners", faculty?.partner_companies)}

          {/* SDG Section - More Colorful */}
          {faculty?.sdgs && faculty.sdgs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionBlock title={currentLang === "az" ? "Davamlı İnkişaf Məqsədləri (SDG)" : "Sustainable Development Goals (SDG)"} accent>
                 <div className="flex flex-wrap gap-4 mt-4">
                   {faculty.sdgs.map(sdgId => (
                     <motion.div 
                       key={sdgId} 
                       whileHover={{ y: -5, scale: 1.05 }}
                       className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] flex items-center justify-center text-white font-black text-2xl border-4 border-white dark:border-slate-700 shadow-xl"
                       title={`SDG Goal ${sdgId}`}
                     >
                       {sdgId}
                     </motion.div>
                   ))}
                 </div>
              </SectionBlock>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
