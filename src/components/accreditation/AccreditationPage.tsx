"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GavelIcon from "@mui/icons-material/Gavel";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArticleIcon from "@mui/icons-material/Article";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const AQAS_PROGRAMS = {
  az: [
    { title: "Process Automation Engineering (MA)", img: "/accreditation/acc-3.jpg" },
    { title: "Process Automation Engineering (BA)", img: "/accreditation/acc-4.jpg" },
    { title: "Electrical Power Engineering (MA)", img: "/accreditation/acc-5.jpg" },
    { title: "Electrical and Electronics Engineering (BA)", img: "/accreditation/acc-6.jpg" },
    { title: "Electrical Engineering (MA)", img: "/accreditation/acc-7.jpg" },
  ],
  en: [
    { title: "Process Automation Engineering (MA)", img: "/accreditation/acc-3.jpg" },
    { title: "Process Automation Engineering (BA)", img: "/accreditation/acc-4.jpg" },
    { title: "Electrical Power Engineering (MA)", img: "/accreditation/acc-5.jpg" },
    { title: "Electrical and Electronics Engineering (BA)", img: "/accreditation/acc-6.jpg" },
    { title: "Electrical Engineering (MA)", img: "/accreditation/acc-7.jpg" },
  ],
};

const CONTENT = {
  az: {
    eyebrow: "Haqqımızda",
    breadcrumb: "Akkreditasiya",
    title: "Akkreditasiya",
    heroDesc: "Azərbaycan Texniki Universitetinin akkreditasiya prosesləri, növləri və beynəlxalq tanınması haqqında.",
    whatTitle: "Akkreditasiya nədir?",
    whatBody:
      "Akkreditasiya təhsil müəssisəsinin fəaliyyətinin dövlət təhsil standartlarına və normativ hüquqi aktların tələblərinə uyğunluğunun yoxlanılması məqsədilə həyata keçirilən rəsmi qiymətləndirmə prosesidir. Bu proses müəssisənin statusunun müəyyən edilməsinə, təhsil proqramları üzrə tələbə say həddinin təsdiqlənməsinə və fəaliyyətinin növbəti dövr üçün davam etdirilməsinə hüquqi əsas yaradır.",
    importanceTitle: "Akkreditasiyanın əhəmiyyəti",
    importanceItems: [
      "Təhsilin keyfiyyətinin təmin olunması",
      "Diplomların milli və beynəlxalq səviyyədə tanınması",
      "Təhsil proqramlarının əmək bazarının tələblərinə uyğunlaşdırılması",
      "Universitetin beynəlxalq reytinq və imicinin yüksəlməsi",
      "Məzunların rəqabət qabiliyyətinin artırılması",
    ],
    legalTitle: "Hüquqi əsaslar",
    legalBody: "Akkreditasiya prosesi aşağıdakı normativ sənədlərə əsaslanır:",
    legalItems: [
      '"Təhsil haqqında" Azərbaycan Respublikasının Qanunu',
      "Nazirlər Kabinetinin müvafiq qərarları",
      "Təhsildə Keyfiyyət Təminatı Agentliyinin (TKTA) qaydaları",
    ],
    typesTitle: "Akkreditasiya növləri",
    inst: {
      title: "1. İnstitusional akkreditasiya",
      body: "İnstitusional akkreditasiya təhsil müəssisəsinin ümumi fəaliyyətinin qiymətləndirilməsini əhatə edir.",
      items: [
        "Təhsil standartlarına uyğunluğun yoxlanılması",
        "İdarəetmə və tədris sisteminin qiymətləndirilməsi",
        "Hər bir ixtisas üzrə tələbə say həddinin müəyyən edilməsi",
      ],
      note: "İnstitusional akkreditasiya Təhsildə Keyfiyyət Təminatı Agentliyi (TKTA) tərəfindən 5 ildən bir həyata keçirilir və müvafiq sertifikatın verilməsi ilə yekunlaşır.",
      links: [
        { label: "TKTA veb saytı", url: "https://tkta.edu.az/az/home" },
        {
          label: "AzTU İnstitusional akkreditasiyanın yekun hesabatı",
          url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
        },
        {
          label: "AzTU İnstitusional akkreditasiya sertifikatı",
          url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
        },
      ],
    },
    prog: {
      title: "2. Proqram akkreditasiyası",
      body: "Proqram akkreditasiyası konkret ixtisaslar üzrə təhsil proqramlarının keyfiyyətinin qiymətləndirilməsini əhatə edir. Bu zaman aşağıdakı meyarlar əsas götürülür:",
      items: [
        "Kurikulumun məzmunu",
        "Maddi-texniki baza",
        "Akademik heyətin peşəkarlığı",
        "Tələbə nailiyyətləri",
        "Əmək bazarına uyğunluq",
      ],
      note: "Bu akkreditasiya həm TKTA, həm də beynəlxalq qurumlar (ENQA üzvü olan) tərəfindən həyata keçirilə bilər.",
    },
    aqasTitle: "Beynəlxalq akkreditasiya – AQAS",
    aqasBody:
      "AQAS Almaniyada yerləşən müstəqil akkreditasiya agentliyidir və ali təhsil proqramlarının Avropa standartlarına uyğunluğunu qiymətləndirir.",
    aqasItems: [
      "Beynəlxalq tanınma yaradır",
      "Tələbə cəlbediciliyini artırır",
      "Təhsil keyfiyyətinin Avropa standartlarına uyğun olduğunu təsdiqləyir",
    ],
    processTitle: "Akkreditasiya prosesi",
    processSteps: [
      "Özünütəhlil hesabatının hazırlanması",
      "Sənədlərin təqdim olunması",
      "Ekspert qiymətləndirilməsi",
      "Yerində yoxlama (site visit)",
      "Yekun qərar və sertifikatın verilməsi",
    ],
    reportsTitle: "Proqram akkreditasiyası yekun hesabatları",
    reportsNote: "Hesabatlar tezliklə əlavə ediləcək.",
    certsTitle: "Proqram akkreditasiyası sertifikatları",
    enterLabel: "Daxil ol",
    isoTitle: "ISO nədir?",
    isoBody:
      "ISO (International Organization for Standardization) – beynəlxalq standartlar hazırlayan təşkilatdır. Bu standartlar təşkilatların fəaliyyətini daha keyfiyyətli, effektiv və sistemli qurmasına kömək edir.",
    isoStandards: [
      "ISO 9001 – Keyfiyyət idarəetmə sistemi",
      "ISO 27001 – İnformasiya təhlükəsizliyi",
      "ISO 14001 – Ətraf mühitin idarə olunması",
      "ISO 45001 – Əməyin mühafizəsi və təhlükəsizlik",
    ],
    isoNote:
      "Azərbaycan Texniki Universiteti ISO 9001:2015 Keyfiyyət İdarəetmə Sistemi üzrə sertifikatlaşdırılmışdır.",
  },
  en: {
    eyebrow: "About",
    breadcrumb: "Accreditation",
    title: "Accreditation",
    heroDesc:
      "About the accreditation processes, types, and international recognition of Azerbaijan Technical University.",
    whatTitle: "What is Accreditation?",
    whatBody:
      "Accreditation is an official evaluation process carried out to verify whether an educational institution complies with state educational standards and relevant legal and regulatory requirements. This process provides a legal basis for determining the institution's status, setting student admission limits for each academic program, and extending its operational authorization for the next period.",
    importanceTitle: "Importance of Accreditation",
    importanceItems: [
      "Ensures the quality of education",
      "Provides national and international recognition of diplomas",
      "Aligns academic programs with labor market requirements",
      "Enhances the university's international reputation and rankings",
      "Increases graduates' competitiveness",
    ],
    legalTitle: "Legal Framework",
    legalBody: "The accreditation process is based on the following legal documents:",
    legalItems: [
      'Law of the Republic of Azerbaijan "On Education"',
      "Relevant resolutions of the Cabinet of Ministers",
      "Regulations of the Education Quality Assurance Agency (TKTA)",
    ],
    typesTitle: "Types of Accreditation",
    inst: {
      title: "1. Institutional Accreditation",
      body: "Institutional accreditation evaluates the overall performance of an educational institution. It ensures:",
      items: [
        "Compliance with state educational standards",
        "Assessment of governance and academic systems",
        "Determination of student capacity limits for each program",
      ],
      note: "Institutional accreditation is conducted every 5 years by the Education Quality Assurance Agency (TKTA) and is finalized with the issuance of an official certificate.",
      links: [
        { label: "TKTA Website", url: "https://tkta.edu.az/az/home" },
        {
          label: "Final Report of AzTU Institutional Accreditation",
          url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
        },
        {
          label: "AzTU Institutional Accreditation Certificate",
          url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
        },
      ],
    },
    prog: {
      title: "2. Program Accreditation",
      body: "Program accreditation focuses on evaluating the quality of specific academic programs. The assessment is based on:",
      items: [
        "Curriculum content",
        "Material and technical resources",
        "Qualifications of academic staff",
        "Student performance",
        "Alignment with labor market needs",
      ],
      note: "This type of accreditation may be conducted by TKTA as well as international organizations that are members of ENQA.",
    },
    aqasTitle: "International Accreditation – AQAS",
    aqasBody:
      "AQAS is an independent accreditation agency based in Germany that evaluates higher education programs in accordance with European standards.",
    aqasItems: [
      "Ensures international recognition",
      "Increases student attractiveness",
      "Confirms compliance with European quality standards",
    ],
    processTitle: "Accreditation Process",
    processSteps: [
      "Preparation of the self-assessment report",
      "Submission of documents",
      "Expert evaluation",
      "Site visit",
      "Final decision and certification",
    ],
    reportsTitle: "Program Accreditation Final Reports",
    reportsNote: "Reports will be added soon.",
    certsTitle: "Program Accreditation Certificates",
    enterLabel: "Open",
    isoTitle: "What is ISO?",
    isoBody:
      "ISO (International Organization for Standardization) develops international standards that help organizations operate more effectively, efficiently, and systematically.",
    isoStandards: [
      "ISO 9001 – Quality Management System",
      "ISO 27001 – Information Security",
      "ISO 14001 – Environmental Management",
      "ISO 45001 – Occupational Health and Safety",
    ],
    isoNote:
      "Azerbaijan Technical University is certified under ISO 9001:2015 Quality Management System.",
  },
};

export default function AccreditationPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang as "az" | "en"];
  const programs = AQAS_PROGRAMS[lang as "az" | "en"];
  const aboutHref = lang === "az" ? "/haqqimizda" : "/about";

  const card =
    "bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-3xl rounded-[2.5rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-8 md:p-12 shadow-xl shadow-blue-900/5 relative overflow-hidden";

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* HERO */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-16">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={aboutHref} className="hover:text-white transition-colors">
              {c.eyebrow}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{c.breadcrumb}</span>
          </nav>

          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                {c.eyebrow}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {c.title}
              </h1>
              <p className="text-lg text-white/70 font-medium max-w-2xl leading-relaxed">
                {c.heroDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20 py-20 space-y-10">

        {/* What is Accreditation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-5 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
            {c.whatTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">
            {c.whatBody}
          </p>
        </motion.div>

        {/* Importance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <VerifiedIcon sx={{ fontSize: 22 }} className="text-blue-500" />
            </span>
            {c.importanceTitle}
          </h2>
          <ul className="space-y-3">
            {c.importanceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e] mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal Framework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
              <GavelIcon sx={{ fontSize: 22 }} className="text-purple-500" />
            </span>
            {c.legalTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">{c.legalBody}</p>
          <ul className="space-y-3">
            {c.legalItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-purple-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Types of Accreditation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
            {c.typesTitle}
          </h2>

          {/* Institutional */}
          <div className={`${card} mb-6`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-40" />
            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-3">{c.inst.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">{c.inst.body}</p>
            <ul className="space-y-3 mb-6">
              {c.inst.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* INQAAHE logo */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/accreditation/acc-1.png"
                alt="INQAAHE"
                width={120}
                height={60}
                className="object-contain"
              />
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium italic mb-6">{c.inst.note}</p>

            {/* Links */}
            <div className="flex flex-col gap-3">
              {c.inst.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e]/10 border-2 border-[#1a2355]/10 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-300 text-sm font-bold text-[#1a2355] dark:text-white group w-fit"
                >
                  <ArticleIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e] shrink-0" />
                  {link.label}
                  <OpenInNewIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e] group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Program Accreditation */}
          <div className={card}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />
            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-3">{c.prog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">{c.prog.body}</p>
            <ul className="space-y-3 mb-4">
              {c.prog.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium italic">{c.prog.note}</p>
          </div>
        </motion.div>

        {/* AQAS International */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-40" />
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                  <PublicIcon sx={{ fontSize: 22 }} className="text-[#ee7c7e]" />
                </span>
                {c.aqasTitle}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-5">{c.aqasBody}</p>
              <ul className="space-y-3">
                {c.aqasItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e] mt-0.5 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="/accreditation/acc-2.jpg"
              alt="AQAS Accreditation"
              width={160}
              height={100}
              className="object-contain rounded-2xl shrink-0"
            />
          </div>
        </motion.div>

        {/* Accreditation Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full" />
            {c.processTitle}
          </h2>
          <ol className="space-y-4">
            {c.processSteps.map((step, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 font-black text-sm">
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Program Accreditation Final Reports — placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-gray-400 rounded-full" />
            {c.reportsTitle}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 italic">{c.reportsNote}</p>
        </motion.div>

        {/* AQAS Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
            {c.certsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/30 transition-all duration-300 group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-[#050d20]">
                  <Image
                    src={prog.img}
                    alt={prog.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <span className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest">AQAS</span>
                  <p className="font-bold text-[#1a2355] dark:text-white text-sm leading-snug flex-1">
                    {prog.title}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-black text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors uppercase tracking-widest"
                  >
                    {c.enterLabel}
                    <OpenInNewIcon sx={{ fontSize: 13 }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ISO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={card}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-40" />
          <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight mb-4 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-500 rounded-full" />
            {c.isoTitle}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-6">{c.isoBody}</p>
          <ul className="space-y-3 mb-6">
            {c.isoStandards.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-bold text-[#1a2355] dark:text-white bg-green-500/10 rounded-2xl px-5 py-3 border border-green-500/20">
            {c.isoNote}
          </p>
        </motion.div>

      </div>
    </main>
  );
}
