"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GavelIcon from "@mui/icons-material/Gavel";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const COMMITTEE_DATA = {
  az: {
    eyebrow: "Keyfiyyətin Təminatı",
    title: "Keyfiyyət və Reytinqlərin İdarəedilməsi Komitəsi",
    description: "Keyfiyyət və Reytinqlərin İdarəedilməsi Komitəsi — universitetdə təhsil və elmi fəaliyyətin keyfiyyətinin yüksəldilməsinə yönəldilmiş qurum.",
    breadcrumb: "Komitə",
    committeeTitle: "Keyfiyyət və Reytinqlərin İdarəedilməsi Komitəsi",
    establishedLabel: "Yaradılma tarixi",
    established: "14 may 2025-ci il, F-67 nömrəli əmrlə",
    goalLabel: "Əsas məqsəd",
    goal: "Universitetdə təhsil və elmi fəaliyyətin keyfiyyətinin yüksəldilməsi",
    leadershipTitle: "Rəhbərlik",
    membersTitle: "Komitə üzvləri",
    externalTitle: "Xarici ekspertlər",
    docsTitle: "Sənədlər",
    viewDoc: "Sənədə bax",
    leadership: [
      { role: "Sədr", name: "Sübhan Nadir oğlu Namazov", position: "Elm və İnnovasiya üzrə Prorektor" },
      { role: "Katib", name: "Pərvanə Firdovsi qızı Mövsümova", position: "Keyfiyyətin Təminatı Şöbəsinin direktoru" },
    ],
    members: [
      { name: "İsa Əli oğlu Xəlilov", position: "Şöbə müdiri, Maşın Konstruksiyası və Sənaye Texnologiyaları" },
      { name: "Fərqanə Qəzənfər qızı Musayeva", position: "Dekan, İqtisadiyyat və İdarəetmə Fakültəsi" },
      { name: "Ramiz Məhəmməd oğlu Alıquliyev", position: "Direktor, Məlumat Elmi və Süni İntellekt İnstitutu" },
      { name: "Mustafa Güden", position: "Dəvətli Professor, İzmir Texnologiya Universiteti" },
      { name: "Nadir Arzu oğlu Atayev", position: "Doktorant / Mühəndis, Azerkosmos" },
    ],
    externalExperts: [
      { name: "Elçin Bəhman oğlu Süleymanov", position: "Sədr müavini, Milli Müşahidə Şurası" },
      { name: "Hilal Fizuli oğlu Əfrasiyabov", position: "Nokia Azərbaycan, İstehsal Əlaqələri Şöbəsi" },
    ],
    docs: [
      {
        title: "Komitənin birinci iclasının protokolu",
        url: "https://drive.google.com/file/d/1c3fVRJK3ucuC_E6g4PXr1oj6TRh_NVe4/view",
        embedUrl: "https://drive.google.com/file/d/1c3fVRJK3ucuC_E6g4PXr1oj6TRh_NVe4/preview",
        icon: "pdf",
      },
      {
        title: "Birinci iclasın fotoları",
        url: "https://drive.google.com/drive/folders/17wiI_gYAeVEum-C-pDDOFTVZ_HTpn1gD",
        embedUrl: null,
        icon: "photos",
      },
    ],
  },
  en: {
    eyebrow: "Quality Assurance",
    title: "Quality and Rankings Management Committee",
    description: "The Quality and Rankings Management Committee — a body aimed at enhancing the quality of educational and scientific activities at the university.",
    breadcrumb: "Committee",
    committeeTitle: "Quality and Rankings Management Committee",
    establishedLabel: "Established",
    established: "May 14, 2025, Order No. F-67",
    goalLabel: "Primary Objective",
    goal: "Enhance the quality of educational and scientific activities at the university",
    leadershipTitle: "Leadership",
    membersTitle: "Committee Members",
    externalTitle: "External Experts",
    docsTitle: "Documents",
    viewDoc: "View Document",
    leadership: [
      { role: "Chair", name: "Sübhan Nadir Namazov", position: "Vice-Rector for Science & Innovation" },
      { role: "Secretary", name: "Pərvanə Firdovsi Mövsümova", position: "Director, Quality Assurance Department" },
    ],
    members: [
      { name: "İsa Əli Xəlilov", position: "Department Head, Machine Design & Industrial Technologies" },
      { name: "Fərqanə Qəzənfər Musayeva", position: "Dean, Economics & Management Faculty" },
      { name: "Ramiz Məhəmməd Alıquliyev", position: "Director, Data Science & AI Institute" },
      { name: "Mustafa Güden", position: "Invited Professor, Izmir University of Technology" },
      { name: "Nadir Arzu Atayev", position: "Doctoral Student / Engineer, Azercosmos" },
    ],
    externalExperts: [
      { name: "Elçin Bəhman Süleymanov", position: "Vice-Chair, National Observatory Board" },
      { name: "Hilal Fizuli Əfrasiyabov", position: "Nokia Azerbaijan, Production Relations Department" },
    ],
    docs: [
      {
        title: "First Meeting Protocol",
        url: "https://drive.google.com/file/d/1c3fVRJK3ucuC_E6g4PXr1oj6TRh_NVe4/view",
        embedUrl: "https://drive.google.com/file/d/1c3fVRJK3ucuC_E6g4PXr1oj6TRh_NVe4/preview",
        icon: "pdf",
      },
      {
        title: "First Meeting Photos",
        url: "https://drive.google.com/drive/folders/17wiI_gYAeVEum-C-pDDOFTVZ_HTpn1gD",
        embedUrl: null,
        icon: "photos",
      },
    ],
  },
};

export default function KomitePage() {
  const { lang } = useLanguage();
  const copy = COMMITTEE_DATA[lang];

  return (
    <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-white dark:bg-[#080f25]">
      <div className="bg-mesh opacity-100" />
      <div className="bg-grid-premium opacity-10" />
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full pointer-events-none" style={{ animationDelay: "2s" }} />

      <PageHero
        title={copy.title}
        description={copy.description}
        breadcrumbs={[
          { label: lang === "az" ? "QA" : "QA", href: `/${lang}/${lang === "az" ? "kts" : "qa"}` },
          { label: copy.breadcrumb },
        ]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          <div className="lg:col-span-8 space-y-10">
            {/* Committee info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[3rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-10 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e] flex items-center justify-center shrink-0 shadow-lg shadow-[#ee7c7e]/20">
                  <GroupsIcon sx={{ color: "white", fontSize: 22 }} />
                </div>
                <h2 className="text-xl font-black text-[#1a2355] dark:text-white leading-tight">
                  {copy.committeeTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#1a2355]/3 dark:bg-white/3 rounded-2xl p-5">
                  <span className="text-[10px] font-black text-[#ee7c7e] uppercase tracking-[0.3em] block mb-2">
                    {copy.establishedLabel}
                  </span>
                  <span className="font-bold text-[#1a2355] dark:text-white text-sm">{copy.established}</span>
                </div>
                <div className="bg-[#1a2355]/3 dark:bg-white/3 rounded-2xl p-5">
                  <span className="text-[10px] font-black text-[#ee7c7e] uppercase tracking-[0.3em] block mb-2">
                    {copy.goalLabel}
                  </span>
                  <span className="font-bold text-[#1a2355] dark:text-white text-sm">{copy.goal}</span>
                </div>
              </div>
            </motion.div>

            {/* Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-5 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                {copy.leadershipTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {copy.leadership.map((person, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-6 shadow-lg relative overflow-hidden group hover:border-[#ee7c7e]/30 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl group-hover:scale-150 transition-transform pointer-events-none" />
                    <span className="text-[10px] font-black text-[#ee7c7e] uppercase tracking-[0.3em] block mb-3">
                      {person.role}
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                        <PersonIcon sx={{ fontSize: 20 }} className="text-[#1a2355]/40 dark:text-white/40" />
                      </div>
                      <div>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-sm leading-snug mb-1">
                          {person.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                          {person.position}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-5 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
                {copy.membersTitle}
              </h2>
              <div className="space-y-3">
                {copy.members.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="flex items-center gap-4 bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/5 dark:border-white/5 px-6 py-4 shadow-md hover:border-[#ee7c7e]/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <PersonIcon sx={{ fontSize: 18 }} className="text-[#1a2355]/40 dark:text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-black text-[#1a2355] dark:text-white text-sm block leading-snug">
                        {member.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">{member.position}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* External experts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-5 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#1a2355] dark:bg-white/40 rounded-full" />
                {copy.externalTitle}
              </h2>
              <div className="space-y-3">
                {copy.externalExperts.map((expert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                    className="flex items-center gap-4 bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/5 dark:border-white/5 px-6 py-4 shadow-md hover:border-[#ee7c7e]/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                      <PersonIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-black text-[#1a2355] dark:text-white text-sm block leading-snug">
                        {expert.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">{expert.position}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-5 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                {copy.docsTitle}
              </h2>
              <div className="space-y-6">
                {copy.docs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 px-8 py-5 border-b border-[#1a2355]/5 dark:border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        {doc.icon === "photos" ? (
                          <PhotoLibraryIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e]" />
                        ) : (
                          <GavelIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e]" />
                        )}
                      </div>
                      <span className="flex-1 font-bold text-[#1a2355] dark:text-white text-sm">
                        {doc.title}
                      </span>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 text-xs font-black text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors uppercase tracking-widest"
                      >
                        {copy.viewDoc}
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                      </a>
                    </div>
                    {doc.embedUrl && (
                      <div className="w-full h-[560px] bg-gray-50 dark:bg-[#050d20]">
                        <iframe
                          src={doc.embedUrl}
                          className="w-full h-full border-0"
                          loading="lazy"
                          title={doc.title}
                          allow="autoplay"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <KtsSidebar />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
