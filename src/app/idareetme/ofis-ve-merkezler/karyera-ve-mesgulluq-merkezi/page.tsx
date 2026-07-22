"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonCard from "@/components/shared/PersonCard";
import { useLanguage } from "@/context/LanguageContext";

import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface FunctionItem {
  title: string;
  desc: string;
}

interface EducationItem {
  period: string;
  degree: string;
}

interface StaffMember {
  name: string;
  degree: string;
  email: string;
  phone: string;
}

interface HeadContact {
  name: string;
  degree: string;
  email: string;
  phone: string;
  office: string;
  hours: string;
}

interface PageData {
  eyebrow: string;
  breadcrumbSection: string;
  title: string;
  subtitle: string;
  aboutTitle: string;
  aboutText: string[];
  objectivesTitle: string;
  objectives: string[];
  functionsTitle: string;
  functions: FunctionItem[];
  headTitle: string;
  headBioTitle: string;
  headBio: string;
  headEducationTitle: string;
  headEducation: EducationItem[];
  head: HeadContact;
  staffTitle: string;
  staff: StaffMember[];
  contactTitle: string;
  contact: {
    building: string;
    phone: string;
    email: string;
    hours: string;
  };
  esasname: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Karyera və Məşğulluq Mərkəzi",
    subtitle: "Tələbə və magistrantların karyera inkişafına dəstək, əmək bazarına inteqrasiya",
    aboutTitle: "Haqqında",
    aboutText: [
      "Azərbaycan Texniki Universiteti PHŞ Karyera və Məşğulluq Mərkəzi 7 aprel 2016-cı il tarixində yaradılmışdır. Mərkəz öz fəaliyyətində Azərbaycan Respublikası Elm və Təhsil Nazirliyinin müvafiq əmr və sərəncamlarını, Azərbaycan Texniki Universiteti PHŞ-nin Nizamnaməsini və Karyera və Məşğulluq Mərkəzinin Əsasnaməsini rəhbər tutur.",
      "Karyera və Məşğulluq Mərkəzi universitetin tələbə və magistrantlarının karyera inkişafının dəstəklənməsi, ixtisas üzrə istehsalat təcrübələrinin təşkili, praktiki bacarıqların və peşə səriştələrinin artırılması, məşğulluq imkanlarının genişləndirilməsi və əmək bazarına inteqrasiyasının asanlaşdırılması istiqamətində fəaliyyət göstərir.",
      "Mərkəzin əsas məqsədlərindən biri məzunlarla universitet arasında davamlı əməkdaşlığın təmin olunması və onların əmək bazarındakı mövqelərinin izlənməsidir. Bu istiqamətdə fəxri məzunlarla iş, tələbələrə fərdi karyera məsləhətləri verilməsi, universitet-sənaye əməkdaşlığının gücləndirilməsi və innovativ tərəfdaşlıqların təşviqi kimi fəaliyyətlər həyata keçirilir.",
      "Məzunlarla əlaqələrin sistemli şəkildə qurulması məqsədilə Elmi Şuranın 08 iyun 2025-ci il tarixli 10 saylı protokoluna əsasən Karyera və Məşğulluq Mərkəzinin nəzdində Məzunlar Assosiasiyası yaradılmışdır.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "Tələbə və magistrantların karyera inkişafını dəstəkləmək",
      "Praktiki bacarıq və peşə səriştələrinin artırılmasını təmin etmək",
      "İstehsalat təcrübələrinin təşkili",
      "Məşğulluq imkanlarını genişləndirmək",
      "Tələbələrin əmək bazarına inteqrasiyasını asanlaşdırmaq",
      "Məzunlarla universitet arasında davamlı əməkdaşlığı təmin etmək",
      "Məzunların əmək bazarındakı mövqelərini izləmək",
      "Tələbələrə fərdi karyera məsləhətləri vermək",
      "Universitet-sənaye əməkdaşlığını gücləndirmək",
      "İnnovativ tərəfdaşlıqları təşviq etmək",
      "Məzunlarla sistemli əlaqələri qurmaq və inkişaf etdirmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      { title: "Karyera planlaması və fərdi konsultasiya", desc: "Tələbə və məzunlara şəxsi və peşəkar inkişaf strategiyasının qurulmasında dəstək." },
      { title: "Karyera təlim proqramları və karyera sərgiləri", desc: "Tələbələrin ixtisas və maraqlarına uyğun praktik imkanların təmin edilməsi." },
      { title: "İş axtarışı və təcrübə proqramları", desc: "Tələbələrin ixtisas və maraqlarına uyğun təcrübə imkanlarının təmin olunması." },
      { title: "Rezüme və niyyət məktubu hazırlığı, müsahibəyə hazırlıq", desc: "Peşəkar sənədlərin hazırlanması və müsahibə bacarıqlarının təkmilləşdirilməsi." },
      { title: "Müəssisələrlə əlaqələrin qurulması və şəbəkələşmə tədbirləri", desc: "Tələbə və məzunların potensial işəgötürənlərlə əlaqəsinin gücləndirilməsi." },
      { title: "Məzunlarla əməkdaşlıq və ilhamlandırma", desc: "Məzun uğur hekayələri və mentorluq proqramları vasitəsilə tələbələrin motivasiyasının artırılması." },
      { title: "İstehsalat təcrübəsi", desc: "Tələbələrin real iş mühitində praktik bilik və bacarıqlarını inkişaf etdirməsi üçün müəssisələrlə əməkdaşlıq çərçivəsində təcrübə imkanlarının təşkil edilməsi." },
    ],
    headTitle: "Şöbə Müdiri",
    headBioTitle: "Bioqrafiya",
    headBio: "Ülviyyə Zakir qızı Rəsulovanın elmi tədqiqatlarının əsas istiqamətlərinə mexaniki sistemlərin idarə olunması alqoritmləri, sistemli analiz, dinamik sistemlərdə idarəetmə və informasiyanın işlənməsi daxildir. Bu sahələr üzrə apardığı tədqiqatların nəticələri elmi nəşrlərdə dərc olunmuş və müvafiq sahənin inkişafına töhfə vermişdir.\n\nÜ. Z. Rəsulova ali təhsilini Azərbaycan Memarlıq və İnşaat Universiteti-nin \"İnformasiya sistemləri\" ixtisası üzrə almış, 2010-cu ildə bakalavr, 2012-ci ildə isə magistr pilləsini fərqlənmə diplomu ilə bitirmişdir.\n\nO, 2012–2023-cü illərdə həmin universitetdə müxtəlif vəzifələrdə çalışmışdır. 2024-cü ildən etibarən Ülviyyə Rəsulova Azərbaycan Texniki Universiteti-nin Karyera və məşğulluq mərkəzinin müdiri vəzifəsində fəaliyyət göstərir.",
    headEducationTitle: "Təhsil",
    headEducation: [
      { period: "2006–2010", degree: "Bakalavr — Azərbaycan Memarlıq və İnşaat Universiteti" },
      { period: "2010–2012", degree: "Magistr (fərqlənmə ilə) — Azərbaycan Memarlıq və İnşaat Universiteti" },
      { period: "2014–2025", degree: "Doktorantura — Azərbaycan Memarlıq və İnşaat Universiteti" },
    ],
    head: {
      name: "Rəsulova Ülviyyə Zakir qızı",
      degree: "",
      email: "ulviyye.resulova@aztu.edu.az",
      phone: "+994 50 261 38 16",
      office: "I korpus, 309-cu otaq",
      hours: "Həftənin tək günləri 14:00–17:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      { name: "Şahmarova Günel Şahvələd", degree: "", email: "gunel.shahmarova@aztu.edu.az", phone: "+994 51 682 84 08" },
      { name: "Əliyev Malik Etibar", degree: "", email: "malik.eliyev@aztu.edu.az", phone: "+994 55 560 12 08" },
      { name: "Abdullayeva Tuti Tehran", degree: "", email: "tuti.abdullayeva@aztu.edu.az", phone: "+994 55 251 01 15" },
      { name: "Sadıxzadə Bayaz Səbuhi", degree: "", email: "bayaz.sadikhzade@aztu.edu.az", phone: "+994 50 670 55 99" },
      { name: "Hüseynzadə Qərib Zahid", degree: "", email: "garib.huseynzadeh@aztu.edu.az", phone: "+994 50 988 91 68" },
      { name: "Yusubova Aynur Eldar", degree: "", email: "aynur.yusubova@aztu.edu.az", phone: "+994 55 607 66 27" },
    ],
    contactTitle: "Əlaqə",
    contact: {
      building: "I korpus, 310-cu otaq",
      phone: "1130",
      email: "karyera.merkezi@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Əsasnamə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Career and Employment Center",
    subtitle: "Supporting career development of students and graduates, facilitating labor market integration",
    aboutTitle: "About",
    aboutText: [
      "The Career and Employment Center of Azerbaijan Technical University (PHSC) was established on April 7, 2016. The Center operates in accordance with the relevant orders and directives of the Ministry of Science and Education of the Republic of Azerbaijan, the Charter of Azerbaijan Technical University (PHSC), and the Regulations governing the Career and Employment Center.",
      "The Center carries out its activities with the aim of supporting the career development of undergraduate and graduate students, organizing field-specific industrial internships, enhancing practical skills and professional competencies, expanding employment opportunities, and facilitating their effective integration into the labor market.",
      "One of the principal objectives of the Center is to ensure sustainable cooperation between the University and its graduates, as well as to monitor their positions and outcomes in the labor market. In this context, the Center implements activities such as engagement with distinguished alumni, provision of individual career advisory services, strengthening university–industry collaboration, and promotion of innovative partnerships.",
      "An Alumni Association was established under the Career and Employment Center in accordance with Protocol No. 10 of the Scientific Council, dated June 8, 2025, to establish systematic alumni relations and ensure structured cooperation.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Supporting the career development of undergraduate and graduate students",
      "Enhancing practical skills and professional competencies",
      "Organizing industrial internships in relevant fields of study",
      "Expanding employment opportunities",
      "Facilitating students' integration into the labor market",
      "Ensuring sustainable cooperation between the University and its graduates",
      "Monitoring graduates' positions and outcomes in the labor market",
      "Providing individual career advisory services to students",
      "Strengthening university–industry collaboration",
      "Promoting innovative partnerships",
      "Establishing and developing systematic alumni relations",
    ],
    functionsTitle: "Core Functions",
    functions: [
      { title: "Career planning and individual consultation", desc: "Providing support to students and graduates in developing personal and professional growth strategies." },
      { title: "Career training programs and career fairs", desc: "Ensuring access to practical opportunities aligned with students' academic specializations and interests." },
      { title: "Job search and internship programs", desc: "Facilitating access to internship opportunities in accordance with students' fields of study and career interests." },
      { title: "CV and cover letter preparation; interview preparation", desc: "Supporting the development of professional application documents and enhancing interview skills." },
      { title: "Establishment of institutional partnerships and networking events", desc: "Strengthening connections between students, graduates, and potential employers." },
      { title: "Alumni engagement and motivation", desc: "Increasing student motivation through alumni success stories and mentorship programs." },
      { title: "Industrial internships", desc: "Organizing internship opportunities in collaboration with partner organizations to enable students to develop practical knowledge and skills in real working environments." },
    ],
    headTitle: "Head of Department",
    headBioTitle: "Biography",
    headBio: "Ulviyya Zakir gizi Rasulova's main research areas include control algorithms of mechanical systems, systems analysis, control in dynamic systems, and information processing. The results of her research in these fields have been published in scientific journals and have contributed to the advancement of the respective discipline.\n\nU. Z. Rasulova completed her higher education at the Azerbaijan University of Architecture and Construction in the field of Information Systems, graduating with a bachelor's degree in 2010 and a master's degree in 2012, both with honors.\n\nShe worked in various positions at the same university from 2012 to 2023. Since 2024, Ulviyya Rasulova has been serving as the Head of the Career and Employment Center at Azerbaijan Technical University.",
    headEducationTitle: "Education",
    headEducation: [
      { period: "2006–2010", degree: "Bachelor's Degree — Azerbaijan University of Architecture and Construction" },
      { period: "2010–2012", degree: "Master's Degree (with honors) — Azerbaijan University of Architecture and Construction" },
      { period: "2014–2025", degree: "Doctoral Studies — Azerbaijan University of Architecture and Construction" },
    ],
    head: {
      name: "Ulviyya Rasulova Zakir gizi",
      degree: "",
      email: "ulviyye.resulova@aztu.edu.az",
      phone: "+994 50 261 38 16",
      office: "Building I, Room 309",
      hours: "Odd days of the week, 14:00–17:00",
    },
    staffTitle: "Staff",
    staff: [
      { name: "Gunel Shahmarova Shahvalad", degree: "", email: "gunel.shahmarova@aztu.edu.az", phone: "+994 51 682 84 08" },
      { name: "Malik Aliyev Etibar", degree: "", email: "malik.eliyev@aztu.edu.az", phone: "+994 55 560 12 08" },
      { name: "Tuti Abdullayeva Tehran", degree: "", email: "tuti.abdullayeva@aztu.edu.az", phone: "+994 55 251 01 15" },
      { name: "Bayaz Sadikhzade Sabuhi", degree: "", email: "bayaz.sadikhzade@aztu.edu.az", phone: "+994 50 670 55 99" },
      { name: "Garib Huseynzade Zahid", degree: "", email: "garib.huseynzadeh@aztu.edu.az", phone: "+994 50 988 91 68" },
      { name: "Aynur Yusubova Eldar", degree: "", email: "aynur.yusubova@aztu.edu.az", phone: "+994 55 607 66 27" },
    ],
    contactTitle: "Contact",
    contact: {
      building: "Building I, Room 310",
      phone: "1130",
      email: "karyera.merkezi@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Statute",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KaryeraMerkeziPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/30">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AboutHeroVideoBg />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <HomeIcon sx={{ fontSize: 14 }} />
              {lang === "az" ? "Ana səhifə" : "Home"}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link
              href={lang === "az" ? "/idareetme" : "/management"}
              className="hover:text-white transition-colors"
            >
              {p.eyebrow}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link
              href={
                lang === "az"
                  ? "/idareetme/ofis-ve-merkezler"
                  : "/management/ofis-ve-merkezler"
              }
              className="hover:text-white transition-colors"
            >
              {p.breadcrumbSection}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.14em] mb-6">
                {p.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                {p.title}
              </h1>
              <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                &quot;{p.subtitle}&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#101733] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

          {/* ── Əsasnamə Button ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-start"
          >
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-[#ee7c7e] text-[#ee7c7e] font-black text-sm uppercase tracking-widest hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#ee7c7e]/30 hover:shadow-lg"
            >
              <ArticleIcon fontSize="small" />
              {p.esasname}
            </Link>
          </motion.div>

          {/* ── 1. About ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.aboutTitle}
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {p.aboutText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ── 2. Objectives ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.objectivesTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {p.objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-[22px] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] font-black text-lg mb-6 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {obj}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 3. Core Functions ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[18px] p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <BusinessCenterIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black">{p.functionsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {p.functions.map((fn, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#ee7c7e]/20 flex items-center justify-center text-[#ee7c7e] font-black text-xs shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm mb-1 leading-snug">{fn.title}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{fn.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 4. Head of Department Bio ────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-gray-100 dark:border-white/10 pt-16">
            {/* Left — Bio + Education timeline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                  <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                    {p.head.name}
                  </h2>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">
                  {p.headBioTitle}
                </h3>
                <div className="space-y-6">
                  {p.headBio.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Education timeline */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-8 flex items-center gap-3">
                  <div className="w-2 h-4 bg-[#ee7c7e] rounded-full" />
                  {p.headEducationTitle}
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10" />
                  <div className="space-y-8">
                    {p.headEducation.map((edu, i) => (
                      <div key={i} className="relative pl-14">
                        {/* Dot */}
                        <div className="absolute left-[11px] top-1 w-5 h-5 rounded-full bg-[#ee7c7e] border-4 border-white dark:border-[#0b1330]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#ee7c7e] block mb-1">
                          {edu.period}
                        </span>
                        <p className="text-sm font-bold text-[#1a2355] dark:text-white leading-relaxed">
                          {edu.degree}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — PersonCard + Contact */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">
                  {p.headTitle}
                </h3>
              </div>
              <PersonCard
                fullName={p.head.name}
                academicDegree={p.head.degree}
                title={p.headTitle}
                email={p.head.email}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <EmailIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold break-all">
                    {p.head.email}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.office}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <AccessTimeIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.hours}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 5. Staff Grid ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.staffTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {p.staff.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <PersonCard
                    fullName={member.name}
                    academicDegree={member.degree}
                    email={member.email}
                  />
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-400 pl-2">
                    <PhoneIcon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                    {member.phone}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 6. Contact ───────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">
              {p.contactTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <BusinessIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                  {p.contact.building}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <PhoneIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.contact.phone}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <EmailIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 break-all">
                  {p.contact.email}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <AccessTimeIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.contact.hours}
                </p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
