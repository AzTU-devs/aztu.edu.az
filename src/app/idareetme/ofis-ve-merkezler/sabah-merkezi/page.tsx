"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonCard from "@/components/shared/PersonCard";
import { useLanguage } from "@/context/LanguageContext";

import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  position?: string;
}

interface HeadContact {
  name: string;
  degree: string;
  position: string;
  email: string;
  phone: string;
  office: string;
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
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "SABAH proqramları qrupu",
    subtitle:
      "SABAH qrupları — müasir tələblərə cavab verən, yüksək ixtisaslı gənc kadrların hazırlanmasına yönəlmiş qabaqcıl təhsil modeli",
    aboutTitle: "Haqqında",
    aboutText: [
      "SABAH proqramı ali təhsildə tədrisin keyfiyyətinin yüksəldilməsi, ali təhsil sistemində yeni və fərqli mühitin formalaşdırılması, savadlı və bacarıqlı tələbələrin yetişdirilməsi, həmçinin əmək bazarının tələblərinə uyğun kadr hazırlığının təmin olunması məqsədilə yaradılmış mühüm təşəbbüsdür.",
      "Bu proqram çərçivəsində tələbələr yalnız nəzəri biliklərlə kifayətlənmir, eyni zamanda praktik bacarıqlara da yiyələnirlər. Tədris prosesi müasir və innovativ metodlar əsasında qurulur, interaktiv dərslər, layihə əsaslı öyrənmə və real iş mühitinə uyğun təcrübələr tətbiq edilir. Bu yanaşma tələbələrin analitik düşünmə, problem həll etmə və komandada işləmək bacarıqlarının inkişafına xidmət edir.",
      "SABAH qruplarında yerli və beynəlxalq təcrübəyə malik müəllimlər dərs deyir, tələbələr üçün seminarlar, təlimlər və ustad dərsləri təşkil olunur. Bu da onların dünya səviyyəli bilik və bacarıqlara yiyələnməsinə imkan yaradır.",
      "Proqram tələbələrin fərdi inkişafına da xüsusi önəm verir. Liderlik keyfiyyətlərinin formalaşdırılması, təşəbbüskarlığın artırılması və innovativ düşüncənin inkişaf etdirilməsi istiqamətində müxtəlif fəaliyyətlər həyata keçirilir.",
      "Bununla yanaşı, SABAH proqramı əmək bazarı ilə sıx əlaqələr qurur. Müxtəlif müəssisə və təşkilatlarla əməkdaşlıq nəticəsində tələbələr üçün təcrübə və karyera imkanları yaradılır ki, bu da onların gələcəkdə daha hazırlıqlı və rəqabətqabiliyyətli mütəxəssis kimi formalaşmasına şərait yaradır.",
      "Ümumilikdə, SABAH qrupları müasir tələblərə cavab verən, yüksək ixtisaslı və hərtərəfli inkişaf etmiş gənc kadrların hazırlanmasına yönəlmiş qabaqcıl təhsil modelidir.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "SABAH qruplarının tələbələri üçün əlavə təqaüd imkanları təmin olunması",
      "Xarici mübadilə proqramlarında iştirak imkanı yaradılması",
      "Müasir müəssisə və şirkətlərdə ixtisas üzrə təcrübə keçmək imkanı yaratmaq",
      "Tədrisin mütərəqqi forma və metodlar əsasında təşkil olunması",
      "Tələbələrin ixtisas üzrə kompetensiyalara tam yiyələnməsi təmin edilməsi",
      "Xarici dillərin dərinləşdirilmiş şəkildə tədris olunması",
      "Tələbələr üçün müxtəlif tədrisdənkənar fəaliyyətlər təşkil edilməsi",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      {
        title: "Fərdi inkişaf və karyera planlaşdırılması üzrə mentorluq",
        desc: "Tələbələrin peşəkar istiqamətlərini düzgün müəyyən etmələrinə kömək edir.",
      },
      {
        title: "Startap və innovasiya layihələrində iştirak",
        desc: "Tələbələrin yaradıcı və təşəbbüskar potensialının inkişafına şərait yaradır.",
      },
      {
        title: "Beynəlxalq sertifikat proqramları",
        desc: "Tələbələrin qlobal səviyyədə tanınan bilik və bacarıqlara yiyələnməsini dəstəkləyir.",
      },
      {
        title: "Rəqəmsal və texnoloji bacarıqlar",
        desc: "Müasir texnologiyalardan istifadə vərdişlərini formalaşdırır.",
      },
      {
        title: "Akademik mübadilə və ikili diplom proqramları",
        desc: "Tələbələrin beynəlxalq təhsil təcrübəsi qazanmasına şərait yaradır.",
      },
      {
        title: "Elmi-tədqiqat fəaliyyəti",
        desc: "Tələbələrin analitik düşünmə qabiliyyətlərinin inkişafını dəstəkləyir.",
      },
      {
        title: "Peşəkar şəbəkələşmə imkanları",
        desc: "Tələbələrin mütəxəssislərlə əlaqələrinin qurulmasına və genişləndirilməsinə kömək edir.",
      },
      {
        title: "Real layihələr üzərində iş",
        desc: "Praktiki biliklərin tətbiqini gücləndirir.",
      },
    ],
    headTitle: "Şöbə Müdiri",
    headBioTitle: "Bioqrafiya",
    headBio:
      "Aslanova Ayçillər Telman qızı ali təhsil sahəsində akademik idarəetmə, tədris proseslərinin təşkili və rəqəmsal sistemlərin idarə edilməsi üzrə təcrübəyə malikdir. Hazırda Azərbaycan Texniki Universitetində SABAH proqramlarının koordinatoru vəzifəsində çalışır.\n\nHal-hazırda həmin universitetin Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrasında assistent kimi pedaqoji fəaliyyət göstərir. O, poliqrafiya və avtomatlaşdırılmış komplekslər ixtisası üzrə ixtisaslaşmış və bu sahədə peşəkar təhsil almışdır.\n\nKaryerası ərzində ali təhsil müəssisələrində tələbə məlumatlarının idarə olunması, tədris proseslərinin planlaşdırılması, akademik sistemlərin koordinasiyası və inzibati proseslərin təşkili sahələrində geniş təcrübə qazanmışdır.\n\nEyni zamanda elmi fəaliyyətlə məşğul olur və 6 elmi məqalənin müəllifidir. Onun fəaliyyəti tədris keyfiyyətinin yüksəldilməsinə və təhsil proseslərinin daha effektiv şəkildə idarə olunmasına yönəlmişdir.",
    headEducationTitle: "Təhsil",
    headEducation: [
      { period: "2014–2018", degree: "Bakalavr — Azərbaycan Texniki Universiteti" },
      { period: "2018–2020", degree: "Magistr — Azərbaycan Texniki Universiteti" },
    ],
    head: {
      name: "Aslanova Ayçillər Telman qızı",
      degree: "",
      position: "SABAH proqramları koordinatoru",
      email: "ayciller.aslanova@aztu.edu.az",
      phone: "1502 (İP-Tel.)",
      office: "I korpus, Otaq 306-3",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Dostuyeva Rüfanə Araz qızı",
        degree: "",
        email: "rufane.dostuyeva@aztu.edu.az",
        phone: "(050) 762-97-12",
        position: "Tutor",
      },
    ],
    contactTitle: "Əlaqə",
    contact: {
      building: "I korpus, Otaq 306-3",
      phone: "1502",
      email: "ayciller.aslanova@aztu.edu.az",
    },
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "SABAH Program Groups",
    subtitle:
      "SABAH groups — an advanced educational model aimed at training highly qualified and comprehensively developed young professionals who meet modern requirements",
    aboutTitle: "About",
    aboutText: [
      "The SABAH Program is an important initiative established with the aim of improving the quality of higher education, creating a new and distinctive environment within the higher education system, fostering well-educated and skilled students, and ensuring the preparation of personnel in line with the demands of the labor market.",
      "Within the framework of this program, students do not only acquire theoretical knowledge but also gain practical skills. The teaching process is built on modern and innovative methods, including interactive lessons, project-based learning, and practical training in real working environments. This approach contributes to the development of students' analytical thinking, problem-solving, and teamwork skills.",
      "In SABAH groups, instructors with both local and international experience deliver classes, and students are provided with seminars, trainings, and master classes. This enables them to acquire world-class knowledge and competencies.",
      "The program also places special emphasis on students' personal development. Various activities are implemented to develop leadership qualities, increase initiative, and foster innovative thinking.",
      "In addition, the SABAH Program establishes strong connections with the labor market. Through cooperation with various institutions and organizations, internship and career opportunities are created for students, which helps them become better prepared and more competitive professionals in the future.",
      "Overall, SABAH groups represent an advanced educational model aimed at training highly qualified and comprehensively developed young professionals who meet modern requirements.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Provision of additional scholarship opportunities for SABAH group students",
      "Opportunity to participate in international exchange programs",
      "Opportunity to gain professional experience in modern enterprises and companies",
      "Organization of the teaching process based on advanced forms and methods",
      "Ensuring students fully acquire competencies in their field of study",
      "In-depth teaching of foreign languages",
      "Organization of various extracurricular activities for students",
    ],
    functionsTitle: "Core Functions",
    functions: [
      {
        title: "Mentoring support for personal development and career planning",
        desc: "Helping students correctly identify their professional directions.",
      },
      {
        title: "Startup and innovation project participation",
        desc: "Creating conditions for the development of students' creative and entrepreneurial potential.",
      },
      {
        title: "International certification programs",
        desc: "Supporting students in acquiring globally recognized knowledge and skills.",
      },
      {
        title: "Digital and technological competencies",
        desc: "Forming the ability to use modern technologies effectively.",
      },
      {
        title: "Academic exchange and double degree programs",
        desc: "Enabling students to gain international educational experience.",
      },
      {
        title: "Scientific research activities",
        desc: "Supporting the development of students' analytical thinking skills.",
      },
      {
        title: "Professional networking opportunities",
        desc: "Helping students establish and expand connections with specialists.",
      },
      {
        title: "Real project work during study",
        desc: "Strengthening the application of practical knowledge.",
      },
    ],
    headTitle: "Head of Department",
    headBioTitle: "Biography",
    headBio:
      "Aslanova Aychiller Telman gizi has experience in academic administration in higher education, organization of educational processes, and management of digital systems. She is currently serving as the SABAH Programs Coordinator at Azerbaijan Technical University.\n\nShe also works as an assistant at the Department of Machine Design, Mechatronics and Industrial Technologies of the same university. She specializes in the field of printing and automated complexes and has received professional education in this field.\n\nThroughout her career, she has gained extensive experience in managing student data at higher education institutions, planning educational processes, coordinating academic systems, and organizing administrative processes.\n\nShe is also engaged in scientific activities and is the author of 6 scientific articles. Her activities are aimed at improving the quality of education and managing educational processes more effectively.",
    headEducationTitle: "Education",
    headEducation: [
      { period: "2014–2018", degree: "Bachelor's Degree — Azerbaijan Technical University" },
      { period: "2018–2020", degree: "Master's Degree — Azerbaijan Technical University" },
    ],
    head: {
      name: "Aslanova Aychiller Telman gizi",
      degree: "",
      position: "SABAH Programs Coordinator",
      email: "ayciller.aslanova@aztu.edu.az",
      phone: "1502 (IP-Tel.)",
      office: "Building I, Room 306-3",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Dostuyeva Rufane Araz gizi",
        degree: "",
        email: "rufane.dostuyeva@aztu.edu.az",
        phone: "(050) 762-97-12",
        position: "Tutor",
      },
    ],
    contactTitle: "Contact",
    contact: {
      building: "Building I, Room 306-3",
      phone: "1502",
      email: "ayciller.aslanova@aztu.edu.az",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SabahMerkeziPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
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
      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

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
                  className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300 group"
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
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
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
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10" />
                  <div className="space-y-8">
                    {p.headEducation.map((edu, i) => (
                      <div key={i} className="relative pl-14">
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
                    title={member.position}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
