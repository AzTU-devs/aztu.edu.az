"use client";

import { use, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import InfoIcon from "@mui/icons-material/Info";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ScienceIcon from "@mui/icons-material/Science";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";

import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail, ContentSection } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

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
  const { lang: currentLang } = useLanguage();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

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

  const stats = faculty ? [
    { label: currentLang === "az" ? "Kafedralar" : "Departments", value: faculty.cafedra_count, icon: AccountTreeIcon },
    { label: currentLang === "az" ? "Dekan müavinləri" : "Deputy Deans", value: faculty.deputy_dean_count, icon: PersonIcon },
    { label: currentLang === "az" ? "Bakalavr ixtisasları" : "Bachelor Programs", value: faculty.bachelor_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Magistratura ixtisasları" : "Master Programs", value: faculty.master_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Doktorantura ixtisasları" : "PhD Programs", value: faculty.phd_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", value: faculty.laboratories_count, icon: ScienceIcon },
    { label: currentLang === "az" ? "Beynəlxalq əlaqələr" : "Int. Collaborations", value: faculty.international_collaborations_count, icon: PublicIcon },
    { label: currentLang === "az" ? "Sənaye əməkdaşlığı" : "Industrial Partners", value: faculty.industrial_collaborations_count, icon: BusinessIcon },
    { label: currentLang === "az" ? "Layihə və patentlər" : "Projects & Patents", value: faculty.projects_patents_count, icon: AssignmentIcon },
  ].filter(s => s.value !== null && s.value !== undefined) : [];

  const renderContentSection = (id: string, icon: React.ReactNode, title: string, items?: ContentSection[], htmlContent?: string) => {
    const hasItems = items && items.length > 0;
    const hasHtml = htmlContent !== undefined && htmlContent !== null && htmlContent !== "";
    if (!hasItems && !hasHtml) return null;
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
    { id: "sustainability", title: currentLang === "az" ? "DİM (SDG)" : "SDG" },
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
      {loading ? (
        <div className="space-y-8">
          <div className="h-64 rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-2xl bg-gray-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* 1. Faculty About */}
          {renderContentSection("haqqinda", <InfoIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fakültə haqqında" : "About Faculty", undefined, faculty?.html_content)}

          {/* 2. Metrics / Dynamic Stats Section */}
          {!loading && stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} index={i} />
              ))}
            </div>
          )}

          {/* 3. SDG Section with Proper Logos */}
          {faculty?.sdgs && faculty.sdgs.length > 0 && (
            <motion.div 
              id="sustainability"
              className="scroll-mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionBlock title={currentLang === "az" ? "Davamlı İnkişaf Məqsədləri (SDG)" : "Sustainable Development Goals (SDG)"} accent>
                 <div className="flex flex-wrap gap-6 mt-6">
                   {faculty.sdgs.map(sdgId => (
                     <motion.div 
                       key={sdgId} 
                       whileHover={{ y: -5, scale: 1.05 }}
                       className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700"
                       title={`SDG Goal ${sdgId}`}
                     >
                       <img 
                         src={`https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${sdgId}.png`}
                         alt={`SDG ${sdgId}`}
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           // Fallback to colored box if image fails
                           (e.target as any).style.display = 'none';
                           (e.target as any).parentElement.style.backgroundColor = '#1a2355';
                           (e.target as any).parentElement.innerText = sdgId;
                           (e.target as any).parentElement.style.display = 'flex';
                           (e.target as any).parentElement.style.alignItems = 'center';
                           (e.target as any).parentElement.style.justifyContent = 'center';
                           (e.target as any).parentElement.style.color = 'white';
                           (e.target as any).parentElement.style.fontSize = '2rem';
                           (e.target as any).parentElement.style.fontWeight = '900';
                         }}
                       />
                     </motion.div>
                   ))}
                 </div>
              </SectionBlock>
            </motion.div>
          )}

          {/* Modern Anchor Nav */}
          {faculty && (
            <div className="sticky top-[84px] lg:top-2 z-20 -mx-4 px-4 py-2 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
                {navSections.map((s) => {
                  const hasContent = 
                    (s.id === "haqqinda" && (faculty.html_content !== undefined && faculty.html_content !== null && faculty.html_content !== "")) ||
                    (s.id === "sustainability" && faculty.sdgs && faculty.sdgs.length > 0) ||
                    (s.id === "meqsed" && faculty.objectives && faculty.objectives.length > 0) ||
                    (s.id === "vezifeler" && faculty.duties && faculty.duties.length > 0) ||
                    (s.id === "istiqametler" && faculty.directions_of_action && faculty.directions_of_action.length > 0) ||
                    (s.id === "laboratoriyalar" && faculty.laboratories && faculty.laboratories.length > 0) ||
                    (s.id === "tedqiqat" && faculty.research_works && faculty.research_works.length > 0) ||
                    (s.id === "layiheler" && faculty.projects && faculty.projects.length > 0) ||
                    (s.id === "partnyorlar" && faculty.partner_companies && faculty.partner_companies.length > 0);
                  
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

          {/* 4. Other Sections */}
          {renderContentSection("meqsed", <TrackChangesIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət məqsədləri" : "Strategic Objectives", faculty?.objectives)}
          {renderContentSection("vezifeler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Vəzifələr" : "Duties & Responsibilities", faculty?.duties)}
          {renderContentSection("istiqametler", <AccountTreeIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", faculty?.directions_of_action)}
          {renderContentSection("laboratoriyalar", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Laboratoriyalar" : "Laboratories", faculty?.laboratories)}
          {renderContentSection("tedqiqat", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Elmi tədqiqat işləri" : "Scientific Research", faculty?.research_works)}
          {renderContentSection("layiheler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Layihələr" : "Projects & Initiatives", faculty?.projects)}
          {renderContentSection("partnyorlar", <BusinessIcon sx={{ color: "white" }} />, currentLang === "az" ? "Partnyor şirkətlər" : "Industrial Partners", faculty?.partner_companies)}
        </div>
      )}
    </div>
  );
}
