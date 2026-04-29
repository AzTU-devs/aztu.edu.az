"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PollIcon from "@mui/icons-material/Poll";
import VerifiedIcon from "@mui/icons-material/Verified";

const QUICK_LINKS = [
  { labelAz: "Sənədlər", labelEn: "Documents", slug: "senedler" },
  { labelAz: "Akkreditasiya", labelEn: "Accreditation", slug: "akkreditasiya" },
  { labelAz: "Sorğular", labelEn: "Surveys", slug: "sorgular" },
  { labelAz: "Komitə", labelEn: "Committee", slug: "komite" },
];

const MECHANISMS = {
  az: [
    "Sorğular və geribildirim sistemləri",
    "Daxili audit və monitorinq prosesləri",
    "KPI göstəricilərinin izlənməsi",
    "Təlim və inkişaf proqramları",
    "Akkreditasiya və keyfiyyət standartlarına uyğunluq",
  ],
  en: [
    "Surveys and feedback systems",
    "Internal audit and monitoring processes",
    "Tracking KPI indicators",
    "Training and development programs",
    "Compliance with accreditation and quality standards",
  ],
};

export default function KtsPage() {
  const { lang } = useLanguage();
  const basePath = `/${lang}/${lang === "az" ? "kts" : "qa"}`;
  const mechanisms = lang === "az" ? MECHANISMS.az : MECHANISMS.en;

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "KT (Keyfiyyətin Təminatı)",
      description: "Keyfiyyət planlaması, monitorinqi, təhlili, nəzarəti və davamlı inkişafını həyata keçirən struktur bölmə.",
      breadcrumb: "KT",
      aboutTitle: "Keyfiyyətin Təminatı Haqqında",
      aboutBody: `Keyfiyyətin Təminatı Şöbəsi 2021-ci il dekabrın 17-də Elmi Şuranın qərarı ilə yaradılmışdır. 2022-ci il mayın 18-də "Keyfiyyətin İdarəedilməsi Şöbəsi" "Keyfiyyətin Təminatı və Tədris-Öyrənmə Mərkəzi" adına dəyişdirilmişdir. Daha sonra 2023-cü il iyulun 23-də şöbə sadəcə Keyfiyyətin Təminatı Şöbəsi adını almışdır.\n\nŞöbə "tələbə mərkəzli tədris mühitinin dəstək strukturu" kimi fəaliyyət göstərir — universitetin bütün fəaliyyətlərində keyfiyyət planlaması, monitorinq, təhlil, nəzarət və davamlı inkişafı həyata keçirir.\n\nKeyfiyyət Təminatı, universitetin davamlı monitorinq və qiymətləndirmə yolu ilə təhsil, tədqiqat və xidmətlərin keyfiyyətini qorumasını və təkmilləşdirməsini təmin edən bir sistemdir. KT tədris keyfiyyətini yaxşılaşdırmağa, şəffaflığı təmin etməyə, akkreditasiyanı dəstəkləməyə və maraqlı tərəflərin məmnuniyyətini artırmağa kömək edir.`,
      kpiTitle: "Əsas göstəricilər (KPI)",
      kpiBody: `Azərbaycan Texniki Universitetində (AzTU) əsas performans göstəriciləri (KPI) universitetin tədris, elmi-tədqiqat, idarəetmə və xidmət sahələrində fəaliyyətinin effektivliyini ölçmək məqsədilə tətbiq olunur. Bu göstəricilər strateji hədəflərin icra vəziyyətini qiymətləndirməyə, keyfiyyətin davamlı yaxşılaşdırılmasına və qərarvermə prosesinin daha səmərəli təşkilinə xidmət edir.\n\nKPI-lar vasitəsilə universitetin akademik nəticələri, tələbə və məzun göstəriciləri, elmi fəaliyyət, beynəlxalq əməkdaşlıq və infrastruktur səviyyəsi müntəzəm olaraq izlənilir və təhlil olunur.`,
      cultureTitle: "Keyfiyyət mədəniyyəti",
      cultureBody: `Keyfiyyət mədəniyyəti Azərbaycan Texniki Universitetində bütün fəaliyyət sahələrində keyfiyyətin təmin olunmasını və davamlı inkişafını dəstəkləyən əsas dəyərlər sistemidir. Bu yanaşma tədris, elmi-tədqiqat, idarəetmə və xidmət proseslərində məsuliyyət, şəffaflıq və əməkdaşlıq prinsiplərinə əsaslanır.\n\nUniversitetdə keyfiyyət mədəniyyətinin formalaşdırılması məqsədilə bütün maraqlı tərəflərin – tələbələrin, akademik və inzibati heyətin aktiv iştirakı təmin olunur. Müntəzəm monitorinq, qiymətləndirmə və geribildirim mexanizmləri vasitəsilə fəaliyyətlər təhlil edilir və təkmilləşdirilir.`,
      mechanismsTitle: "Tətbiq mexanizmləri",
      mechanismsNote: "Universitetdə keyfiyyətin yalnız nəzarət olunan proses deyil, bütün iştirakçıların gündəlik fəaliyyətinin ayrılmaz hissəsi kimi formalaşdırılması.",
      surveysTitle: "Sorğular",
      surveysBody: `Keyfiyyətin təminatı çərçivəsində müxtəlif maraqlı tərəflər (tələbələr, akademik heyət, məzunlar və işəgötürənlər) arasında mütəmadi sorğular keçirilir. Bu sorğuların əsas məqsədi təhsil, idarəetmə və xidmətlərin keyfiyyətinin qiymətləndirilməsi, problemlərin aşkar edilməsi və onların aradan qaldırılması üçün tədbirlərin müəyyən edilməsidir.\n\nSorğular əsasən onlayn platformalar (Google Forms) vasitəsilə həyata keçirilir və nəticələr analiz olunaraq qərarvermə prosesinə daxil edilir.`,
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "QA (Quality Assurance)",
      description: "The structural unit responsible for quality planning, monitoring, analysis, control and continuous improvement across all university activities.",
      breadcrumb: "QA",
      aboutTitle: "About Quality Assurance",
      aboutBody: `The Quality Assurance Department was established by a Scientific Council decision on December 17, 2021. On May 18, 2022, the "Quality Management Department" was renamed to the "Quality Assurance and Learning-Teaching Center." On July 23, 2023, the unit adopted its current name — Quality Assurance Department.\n\nThe department functions as a "student-centered teaching environment support structure," implementing quality planning, monitoring, analysis, control, and continuous improvement across all university activities.\n\nQuality Assurance is a system that ensures the university maintains and improves the quality of education, research, and services through continuous monitoring and evaluation. QA helps improve teaching quality, ensure transparency, support accreditation, and increase stakeholder satisfaction.`,
      kpiTitle: "Key Performance Indicators (KPIs)",
      kpiBody: `Key performance indicators (KPIs) are used at Azerbaijan Technical University (AzTU) to measure the effectiveness of the university's activities in the areas of teaching, research, management and service. These indicators serve to assess the implementation status of strategic goals, continuously improve quality and organize the decision-making process more efficiently.\n\nThrough KPIs, the university's academic results, student and graduate indicators, scientific activity, international cooperation and infrastructure level are regularly monitored and analyzed.`,
      cultureTitle: "Quality Culture",
      cultureBody: `Quality culture is a core value system that supports quality assurance and sustainable development in all areas of activity at Azerbaijan Technical University. This approach is based on the principles of responsibility, transparency and cooperation in teaching, research, management and service processes.\n\nIn order to form a quality culture at the university, the active participation of all stakeholders - students, academic and administrative staff - is ensured. Activities are analyzed and improved through regular monitoring, evaluation and feedback mechanisms.`,
      mechanismsTitle: "Implementation Mechanisms",
      mechanismsNote: "Forming quality at the university as an integral part of the daily activities of all participants, not just a controlled process.",
      surveysTitle: "Surveys",
      surveysBody: `As part of quality assurance, regular surveys are conducted among various stakeholders (students, academic staff, alumni and employers). The main purpose of these surveys is to assess the quality of education, management and services, identify problems and determine measures to eliminate them.\n\nSurveys are mainly carried out through online platforms (Google Forms) and the results are analyzed and included in the decision-making process.`,
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
              <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 border-2 border-[#1a2355]/5 dark:border-white/5">
                <Image
                  src="/kts/qa-1.png"
                  alt="Keyfiyyətin Təminatı"
                  width={900}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line">
                {copy.aboutBody}
              </p>
            </motion.div>

            {/* KPI Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
              className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <BarChartIcon sx={{ fontSize: 22 }} className="text-blue-500" />
                </span>
                {copy.kpiTitle}
              </h2>

              <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 border-2 border-[#1a2355]/5 dark:border-white/5">
                <Image
                  src="/kts/qa-2.png"
                  alt="AzTU KPI Dashboard Overview"
                  width={900}
                  height={480}
                  className="w-full object-cover"
                />
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line">
                {copy.kpiBody}
              </p>
            </motion.div>

            {/* Quality Culture Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <AutoAwesomeIcon sx={{ fontSize: 22 }} className="text-purple-500" />
                </span>
                {copy.cultureTitle}
              </h2>
              <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 border-2 border-[#1a2355]/5 dark:border-white/5">
                <Image
                  src="/kts/qa-3.png"
                  alt="Keyfiyyət mədəniyyəti"
                  width={900}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line">
                {copy.cultureBody}
              </p>
            </motion.div>

            {/* Implementation Mechanisms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
                {copy.mechanismsTitle}
              </h2>
              <div className="space-y-4">
                {mechanisms.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 px-8 py-5">
                      <div className="w-8 h-8 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        <CheckCircleOutlineIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                      </div>
                      <span className="font-bold text-[#1a2355] dark:text-white text-base leading-snug flex-1">
                        {item}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic px-2">
                {copy.mechanismsNote}
              </p>
            </motion.div>

            {/* Surveys Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <PollIcon sx={{ fontSize: 22 }} className="text-green-500" />
                </span>
                {copy.surveysTitle}
              </h2>
              <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 border-2 border-[#1a2355]/5 dark:border-white/5">
                <Image
                  src="/kts/qa-4.png"
                  alt="Sorğular"
                  width={900}
                  height={480}
                  className="w-full object-cover"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line">
                {copy.surveysBody}
              </p>
            </motion.div>

            {/* Quick navigation to sub-sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
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
