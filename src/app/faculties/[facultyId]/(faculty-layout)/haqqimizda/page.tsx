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

  const colors = [
    "text-blue-600 bg-blue-500/10 shadow-blue-500/20",
    "text-emerald-600 bg-emerald-500/10 shadow-emerald-500/20",
    "text-[#ee7c7e] bg-[#ee7c7e]/10 shadow-red-500/20",
    "text-purple-600 bg-purple-500/10 shadow-purple-500/20",
    "text-orange-600 bg-orange-500/10 shadow-orange-500/20"
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative group bg-white/70 dark:bg-white/5 rounded-3xl p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 dark:border-white/10 hover:-translate-y-1 transition-all overflow-hidden backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#1a2355]/[0.02] dark:bg-white/5 rounded-bl-3xl -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      <div className="relative z-10 flex flex-col items-start">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12 shadow-sm`}>
          <Icon sx={{ fontSize: 28 }} />
        </div>
        <span className="text-4xl font-black text-[#1a2355] dark:text-white mb-2 tabular-nums tracking-tighter">
          {value}
        </span>
        <span className="text-[10px] text-gray-500 dark:text-white/40 font-black uppercase tracking-[0.2em] leading-snug">
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
  const [isExpanded, setIsExpanded] = useState(false);

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

    const isAboutSection = id === "haqqinda";

    return (
      <motion.div 
        id={id} 
        className="scroll-mt-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <SectionBlock accent title={title}>
          <div className="relative">
            {htmlContent ? (
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={{ height: isAboutSection && !isExpanded ? 240 : "auto" }}
                  className={`overflow-hidden transition-all duration-500 ease-in-out`}
                >
                  <div
                    className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed text-justify font-medium"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </motion.div>
                
                {isAboutSection && (
                  <div className={`
                    ${!isExpanded ? "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-2" : "mt-6 flex justify-center"}
                    z-10
                  `}>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group flex items-center gap-3 px-8 py-3 rounded-2xl bg-[#ee7c7e] text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-[#ee7c7e]/30 hover:scale-[1.05] active:scale-95 transition-all"
                    >
                      {isExpanded 
                        ? (currentLang === "az" ? "Daha az oxu" : "Read Less") 
                        : (currentLang === "az" ? "Daha çox oxu" : "Read More")}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AccountTreeIcon sx={{ fontSize: 16 }} />
                      </motion.div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {items?.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-gray-50 rounded-2xl p-5 border border-gray-100 transition-all hover:border-[#ee7c7e]/30 hover:shadow-xl hover:shadow-blue-900/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] group-hover:scale-150 transition-transform flex-shrink-0 shadow-[0_0_8px_#ee7c7e]" />
                      <div>
                        <p className="font-black text-[#1a2355] text-sm mb-1.5 group-hover:text-[#ee7c7e] transition-colors">{item.title}</p>
                        {item.description && <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.description}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
    <div className="space-y-16">
      {loading ? (
        <div className="space-y-12">
          <div className="h-80 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
             {[1,2,3,4].map(i => <div key={i} className="h-40 rounded-[2rem] bg-gray-100 dark:bg-white/5 animate-pulse" />)}
          </div>
        </div>
      ) : (
        <div className="space-y-20">
          {/* 1. Faculty About */}
          {renderContentSection("haqqinda", <InfoIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fakültə haqqında" : "About Faculty", undefined, faculty?.html_content)}

          {/* 1.5 Directions of Action - Moved here */}
          {renderContentSection("istiqametler", <AccountTreeIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", faculty?.directions_of_action)}

          {/* 2. Metrics / Dynamic Stats Section */}
          {!loading && stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} index={i} />
              ))}
            </div>
          )}

          {/* 3. SDG Section with Proper Logos */}
          {faculty?.sdgs && faculty.sdgs.length > 0 && (
            <motion.div 
              id="sustainability"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionBlock title={currentLang === "az" ? "Davamlı İnkişaf Məqsədləri" : "Sustainable Development Goals"} accent>
                 <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-10">United Nations Strategic Alignment</p>
                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                   {faculty.sdgs.map((sdgId, idx) => (
                     <motion.div 
                       key={sdgId} 
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: idx * 0.05 }}
                       whileHover={{ y: -8, scale: 1.1, rotate: 2 }}
                       className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white group cursor-pointer"
                       title={`SDG Goal ${sdgId}`}
                     >
                       <img 
                         src={`https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${sdgId}.png`}
                         alt={`SDG ${sdgId}`}
                         className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                         onError={(e) => {
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
                       <div className="absolute inset-0 bg-[#ee7c7e]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </motion.div>
                   ))}
                 </div>
              </SectionBlock>
            </motion.div>
          )}

          {/* Modern Anchor Nav */}
          {faculty && (
            <div className="sticky top-[84px] lg:top-4 z-20 -mx-4 px-4 py-4 bg-white/60 backdrop-blur-xl border-y border-gray-100 shadow-xl shadow-blue-900/5">
              <div className="max-w-[1600px] mx-auto flex gap-4 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
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
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] bg-white border-2 border-gray-100 hover:border-[#ee7c7e] hover:text-white hover:bg-[#ee7c7e] px-8 py-3 rounded-2xl transition-all whitespace-nowrap shadow-sm active:scale-95"
                    >
                      {s.title}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Other Sections */}
          <div className="space-y-16 pb-20">
            {renderContentSection("meqsed", <TrackChangesIcon sx={{ color: "white" }} />, currentLang === "az" ? "Fəaliyyət məqsədləri" : "Strategic Objectives", faculty?.objectives)}
            {renderContentSection("vezifeler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Vəzifələr" : "Duties & Responsibilities", faculty?.duties)}
            {renderContentSection("laboratoriyalar", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Laboratoriyalar" : "Laboratories", faculty?.laboratories)}
            {renderContentSection("tedqiqat", <ScienceIcon sx={{ color: "white" }} />, currentLang === "az" ? "Elmi tədqiqat işləri" : "Scientific Research", faculty?.research_works)}
            {renderContentSection("layiheler", <AssignmentIcon sx={{ color: "white" }} />, currentLang === "az" ? "Layihələr" : "Projects & Initiatives", faculty?.projects)}
            {renderContentSection("partnyorlar", <BusinessIcon sx={{ color: "white" }} />, currentLang === "az" ? "Partnyor şirkətlər" : "Industrial Partners", faculty?.partner_companies)}
          </div>
        </div>
      )}
    </div>
  );
}
