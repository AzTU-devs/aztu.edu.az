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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SchoolIcon from "@mui/icons-material/School";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface StaffMember {
  name: string;
  role: string;
  email: string;
  phone: string;
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
  functions: string[];
  staffTitle: string;
  staff: StaffMember[];
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  regsBtn: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Ömürboyu Öyrənmə Məktəbi",
    subtitle:
      "Rəqəmsal texnologiyaların təsiri ilə dəyişən əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanması",
    aboutTitle: "Haqqımızda",
    aboutText: [
      "Ömürboyu Öyrənmə Məktəbi Azərbaycan Texniki Universitetinin struktur bölməsi olub, Universitetin Elmi Şurasının 27 dekabr 2023-cü il tarixli iclasının 4 saylı qərarı ilə Universitet–Sənaye Əməkdaşlığı və Ömürboyu Öyrənmə Mərkəzinin bazasında yaradılmışdır.",
      "Məktəbin yaradılmasında əsas məqsəd rəqəmsal texnologiyaların təsiri ilə dəyişən əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanmasını təmin etməkdir.",
      "Ömürboyu Öyrənmə Məktəbi mühəndislik və texniki sahələr üzrə davamlı təhsil proqramlarının təşkili, ikinci ali təhsil, sertifikasiya və qısamüddətli təlimlərin həyata keçirilməsi istiqamətində fəaliyyət göstərir. Eyni zamanda, professor-müəllim heyətinin peşəkar inkişafını və tələbələrin praktik bilik və bacarıqlarının artırılmasını dəstəkləyir.",
      "Məktəb universitetin elmi potensialının sənayeyə transferinə, innovasiya fəaliyyətlərinin inkişafına və universitet–sənaye əməkdaşlığının gücləndirilməsinə töhfə verir.",
    ],
    objectivesTitle: "Məqsədlərimiz",
    objectives: [
      "Əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanmasını təmin etmək",
      "Mühəndislik və texniki sahələr üzrə bilik və bacarıqların davamlı inkişafı üçün təhsil və sertifikasiya proqramları həyata keçirmək",
      "Universitet–sənaye əməkdaşlığını gücləndirərək praktik biliklərin ötürülməsini və innovasiyaların inkişafını dəstəkləmək",
      "Elmi potensialın sənayeyə transferini təmin edərək iqtisadi dəyər yaratmaq",
      "Tələbələr və mütəxəssislər üçün ömürboyu öyrənmə imkanlarını genişləndirmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      "Davamlı təhsil, ikinci ali təhsil və sertifikasiya proqramlarının təşkili və icrası",
      "Qısamüddətli və ixtisaslaşmış təlimlərin hazırlanması və keçirilməsi",
      "Yerli və beynəlxalq tərəfdaşlarla birgə layihə və təlimlərin təşkili",
      "Professor-müəllim heyətinin peşəkar inkişafının dəstəklənməsi",
      "Tələbələrin praktik bilik və bacarıqlarının inkişafına yönəlmiş fəaliyyətlərin həyata keçirilməsi",
      "Universitetin elmi nəticələrinin sənayeyə tətbiqinin təşviqi",
      "Universitet–sənaye əməkdaşlığının inkişafına dəstək",
      "Ömürboyu öyrənmə mühitinin formalaşdırılması və təşviqi",
    ],
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Əliyeva Şərəfxanım Vaqif qızı",
        role: "f.ü.f.d., müəllim · Şöbə müdiri vəzifəsini müvəqqəti icra edən · Təkrar Ali təhsil üzrə Proqram meneceri",
        email: "sharafxanim@aztu.edu.az",
        phone: "+994 70 478 09 93",
      },
      {
        name: "Rüstəmzadə Fərhad Aqil oğlu",
        role: "Sertifikasiya üzrə menecer",
        email: "ferhad.rustamzadeh@aztu.edu.az",
        phone: "+994 55 377 49 96",
      },
    ],
    contactTitle: "Əlaqə",
    contactEmail: "sharafxanim@aztu.edu.az",
    contactPhone: "+994 70 478 09 93",
    contactAddress: "Azərbaycan Texniki Universiteti, Bakı, Azərbaycan",
    regsBtn: "Əsasnamə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Lifelong Learning School",
    subtitle:
      "Ensuring the preparation of highly qualified professionals in line with the evolving demands of the labor market shaped by digital technologies",
    aboutTitle: "About Us",
    aboutText: [
      "The Lifelong Learning School is a structural unit of Azerbaijan Technical University (AZTU), established on the basis of the University–Industry Cooperation and Lifelong Learning Center by Decision No. 4 of the University Academic Council dated December 27, 2023.",
      "The main purpose of the School is to ensure the preparation of highly qualified professionals in line with the evolving demands of the labor market shaped by digital technologies.",
      "The Lifelong Learning School operates in the fields of continuing education in engineering and technical disciplines, second higher education programs, certification, and short-term training courses. It also supports the professional development of academic staff and enhances students' practical knowledge and skills.",
      "The School contributes to the transfer of the University's scientific potential to industry, supports the development of innovation activities, and strengthens university–industry cooperation.",
    ],
    objectivesTitle: "Our Objectives",
    objectives: [
      "To ensure the preparation of highly qualified professionals in accordance with labor market demands",
      "To provide continuous development of knowledge and skills in engineering and technical fields through education and certification programs",
      "To strengthen university–industry cooperation and support the transfer of practical knowledge and innovation",
      "To facilitate the transfer of scientific potential to industry and create economic value",
      "To expand lifelong learning opportunities for students and professionals",
    ],
    functionsTitle: "Main Functions",
    functions: [
      "Organization and implementation of continuing education, second higher education, and certification programs",
      "Development and delivery of short-term and specialized training courses",
      "Organization of joint projects and training programs with local and international partners",
      "Support for the professional development of academic staff",
      "Implementation of activities aimed at developing students' practical skills",
      "Promotion of the application of the University's research outcomes in industry",
      "Support for the development of university–industry collaboration",
      "Promotion and development of a lifelong learning environment",
    ],
    staffTitle: "Staff",
    staff: [
      {
        name: "Sharafkhanim Vagif Aliyeva",
        role: "PhD in Philology, Lecturer · Acting Head of Department · Program Manager for Second Higher Education",
        email: "sharafxanim@aztu.edu.az",
        phone: "+994 70 478 09 93",
      },
      {
        name: "Farhad Agil Rustamzadeh",
        role: "Certification Manager",
        email: "ferhad.rustamzadeh@aztu.edu.az",
        phone: "+994 55 377 49 96",
      },
    ],
    contactTitle: "Contact",
    contactEmail: "sharafxanim@aztu.edu.az",
    contactPhone: "+994 70 478 09 93",
    contactAddress: "Azerbaijan Technical University, Baku, Azerbaijan",
    regsBtn: "Statute",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OmurboyuTehsilPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
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
              href={lang === "az" ? "/idareetme/ofis-ve-merkezler" : "/management/ofis-ve-merkezler"}
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

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

          {/* ── Əsasnamə Button ───────────────────────────────────────────── */}
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
              {p.regsBtn}
            </Link>
          </motion.div>

          {/* ── 1. About ──────────────────────────────────────────────────── */}
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

          {/* ── 2. Objectives ─────────────────────────────────────────────── */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* ── 3. Functions (dark card) ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <SchoolIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black">{p.functionsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.functions.map((fn, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#ee7c7e]/20 flex items-center justify-center text-[#ee7c7e] font-black text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{fn}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 4. Staff ──────────────────────────────────────────────────── */}
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
                    title={member.role}
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

          {/* ── 5. Contact ────────────────────────────────────────────────── */}
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
                  <EmailIcon />
                </div>
                <a
                  href={`mailto:${p.contactEmail}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ee7c7e] transition-colors break-all"
                >
                  {p.contactEmail}
                </a>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <PhoneIcon />
                </div>
                <a
                  href={`tel:${p.contactPhone}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ee7c7e] transition-colors"
                >
                  {p.contactPhone}
                </a>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <BusinessIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                  {p.contactAddress}
                </p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
