"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DIVISIONS = {
  az: [
    {
      title: "Akkreditasiya proseslərinin koordinasiyası və monitorinqi",
      pdfUrl: "https://drive.google.com/file/d/1Dd8cgjlXRwN4Mmx9GsglFj_KBYBShqo_/preview",
      viewUrl: "https://drive.google.com/file/d/1Dd8cgjlXRwN4Mmx9GsglFj_KBYBShqo_/view",
    },
    {
      title: "Təlim və təşkilati inkişaf",
      pdfUrl: "https://drive.google.com/file/d/1tLeus539A0T7ZgpC9FghriT38fErM1DL/preview",
      viewUrl: "https://drive.google.com/file/d/1tLeus539A0T7ZgpC9FghriT38fErM1DL/view",
    },
    {
      title: "Akademik fəaliyyətin qiymətləndirilməsi",
      pdfUrl: "https://drive.google.com/file/d/1LjUpxgjBiC6xzanwdc6FlqwtevVfbz46/preview",
      viewUrl: "https://drive.google.com/file/d/1LjUpxgjBiC6xzanwdc6FlqwtevVfbz46/view",
    },
    {
      title: "Audit",
      pdfUrl: "https://drive.google.com/file/d/1agKzNE1FDqadpL2jq260gkzBCRL9X5Qj/preview",
      viewUrl: "https://drive.google.com/file/d/1agKzNE1FDqadpL2jq260gkzBCRL9X5Qj/view",
    },
    {
      title: "Məmnunluq və qiymətləndirmə",
      pdfUrl: "https://drive.google.com/file/d/13asTD8Swgyukk3rhD5Iwru9JFFk76_oe/preview",
      viewUrl: "https://drive.google.com/file/d/13asTD8Swgyukk3rhD5Iwru9JFFk76_oe/view",
    },
  ],
  en: [
    {
      title: "Accreditation Process Coordination and Monitoring",
      pdfUrl: "https://drive.google.com/file/d/1Dd8cgjlXRwN4Mmx9GsglFj_KBYBShqo_/preview",
      viewUrl: "https://drive.google.com/file/d/1Dd8cgjlXRwN4Mmx9GsglFj_KBYBShqo_/view",
    },
    {
      title: "Training and Organizational Development",
      pdfUrl: "https://drive.google.com/file/d/1tLeus539A0T7ZgpC9FghriT38fErM1DL/preview",
      viewUrl: "https://drive.google.com/file/d/1tLeus539A0T7ZgpC9FghriT38fErM1DL/view",
    },
    {
      title: "Academic Activity Assessment",
      pdfUrl: "https://drive.google.com/file/d/1LjUpxgjBiC6xzanwdc6FlqwtevVfbz46/preview",
      viewUrl: "https://drive.google.com/file/d/1LjUpxgjBiC6xzanwdc6FlqwtevVfbz46/view",
    },
    {
      title: "Audit",
      pdfUrl: "https://drive.google.com/file/d/1agKzNE1FDqadpL2jq260gkzBCRL9X5Qj/preview",
      viewUrl: "https://drive.google.com/file/d/1agKzNE1FDqadpL2jq260gkzBCRL9X5Qj/view",
    },
    {
      title: "Satisfaction and Assessment",
      pdfUrl: "https://drive.google.com/file/d/13asTD8Swgyukk3rhD5Iwru9JFFk76_oe/preview",
      viewUrl: "https://drive.google.com/file/d/13asTD8Swgyukk3rhD5Iwru9JFFk76_oe/view",
    },
  ],
};

const QUICK_LINKS = [
  { labelAz: "Sənədlər", labelEn: "Documents", slug: "senedler" },
  { labelAz: "Akkreditasiya", labelEn: "Accreditation", slug: "akkreditasiya" },
  { labelAz: "Sorğular", labelEn: "Surveys", slug: "sorgular" },
  { labelAz: "Komitə", labelEn: "Committee", slug: "komite" },
];

export default function KtsPage() {
  const { lang } = useLanguage();
  const basePath = `/${lang}/${lang === "az" ? "kts" : "qa"}`;
  const divisions = lang === "az" ? DIVISIONS.az : DIVISIONS.en;

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "KT (Keyfiyyətin Təminatı)",
      description: "Keyfiyyət planlaması, monitorinqi, təhlili, nəzarəti və davamlı inkişafını həyata keçirən struktur bölmə.",
      breadcrumb: "KT",
      aboutTitle: "Şöbə haqqında",
      aboutBody: `Keyfiyyətin Təminatı Şöbəsi 2021-ci il dekabrın 17-də Elmi Şuranın qərarı ilə yaradılmışdır. 2022-ci il mayın 18-də "Keyfiyyətin İdarəedilməsi Şöbəsi" "Keyfiyyətin Təminatı və Tədris-Öyrənmə Mərkəzi" adına dəyişdirilmişdir. Daha sonra 2023-cü il iyulun 23-də şöbə sadəcə Keyfiyyətin Təminatı Şöbəsi adını almışdır.\n\nŞöbə "tələbə mərkəzli tədris mühitinin dəstək strukturu" kimi fəaliyyət göstərir — universitetin bütün fəaliyyətlərində keyfiyyət planlaması, monitorinq, təhlil, nəzarət və davamlı inkişafı həyata keçirir.`,
      divisionsTitle: "Fəaliyyət istiqamətləri",
      viewDoc: "Əsasnaməyə bax",
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "QA (Quality Assurance)",
      description: "The structural unit responsible for quality planning, monitoring, analysis, control and continuous improvement across all university activities.",
      breadcrumb: "QA",
      aboutTitle: "About the Department",
      aboutBody: `The Quality Assurance Department was established by a Scientific Council decision on December 17, 2021. On May 18, 2022, the "Quality Management Department" was renamed to the "Quality Assurance and Learning-Teaching Center." On July 23, 2023, the unit adopted its current name — Quality Assurance Department.\n\nThe department functions as a "student-centered teaching environment support structure," implementing quality planning, monitoring, analysis, control, and continuous improvement across all university activities.`,
      divisionsTitle: "Action Directions",
      viewDoc: "View Regulation",
    },
  }[lang];

  return (
    <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-white dark:bg-[#080f25]">
      <div className="bg-mesh opacity-100" />
      <div className="bg-grid-premium opacity-10" />
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full pointer-events-none" style={{ animationDelay: "2s" }} />

      <PageHero
        title={copy.title}
        description={copy.description}
        breadcrumbs={[{ label: copy.breadcrumb }]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-10">
            {/* About card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                {copy.aboutTitle}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line">
                {copy.aboutBody}
              </p>
            </motion.div>

            {/* Structural divisions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
                {copy.divisionsTitle}
              </h2>
              <div className="space-y-4">
                {divisions.map((div, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 px-8 py-5 border-b border-[#1a2355]/5 dark:border-white/5">
                      <div className="w-8 h-8 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        <CheckCircleOutlineIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                      </div>
                      <span className="font-bold text-[#1a2355] dark:text-white text-base leading-snug flex-1">
                        {div.title}
                      </span>
                      <a
                        href={div.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1.5 text-xs font-black text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors uppercase tracking-widest"
                      >
                        {copy.viewDoc}
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                      </a>
                    </div>
                    <div className="w-full h-[480px] bg-gray-50 dark:bg-[#050d20]">
                      <iframe
                        src={div.pdfUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                        title={div.title}
                        allow="autoplay"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick navigation to sub-sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.slug}
                    href={`${basePath}/${link.slug}`}
                    className="group flex flex-col items-center justify-center gap-2 p-6 bg-white/60 dark:bg-[#0d1b3e]/60 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 hover:border-[#ee7c7e]/40 hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <span className="font-black text-sm text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                      {lang === "az" ? link.labelAz : link.labelEn}
                    </span>
                    <ChevronRightIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <KtsSidebar />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
