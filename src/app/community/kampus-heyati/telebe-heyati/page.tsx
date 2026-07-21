"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const DATA = {
  az: {
    home: "Ana səhifə",
    community: "İcma",
    campusLife: "Kampus həyatı",
    title: "Tələbə həyatı",
    subtitle:
      "Azərbaycan Texniki Universitetində tələbə həyatı dinamik, çoxşaxəli və inkişaf yönümlü mühitlə xarakterizə olunur.",
    intro:
      "Universitet yalnız akademik biliklərin verilməsi ilə kifayətlənmir, eyni zamanda tələbələrin sosial, mədəni və peşəkar inkişafını dəstəkləyən geniş imkanlar təqdim edir. Müasir kredit sistemi, şəffaf qiymətləndirmə mexanizmi və praktik yönümlü təhsil yanaşması tələbələrin yüksək keyfiyyətli təhsil almasına şərait yaradır.",
    sections: [
      {
        icon: "groups",
        title: "Tələbə təşkilatları və könüllülük",
        body:
          "AZTU-da tələbələr müxtəlif tələbə təşkilatları, klublar və könüllülük proqramları vasitəsilə aktiv şəkildə universitet həyatına inteqrasiya olunur. Bu fəaliyyətlər onların liderlik, komanda işi və ünsiyyət bacarıqlarını inkişaf etdirir. Sosial aktivlik tələbələrin akademik uğurlarına müsbət təsir göstərir və onların universitet mühitinə daha tez uyğunlaşmasına kömək edir.",
      },
      {
        icon: "lightbulb",
        title: "Mədəni və texnoloji tədbirlər",
        body:
          "Universitetdə keçirilən mədəni tədbirlər, seminarlar, forumlar və layihələr tələbələrin yaradıcılıq və təşəbbüskarlıq potensialını gücləndirir. Eyni zamanda, texnoloji yönümlü layihələr, hackathonlar və akademik müsabiqələr tələbələrin analitik düşünmə və problem həll etmə bacarıqlarını inkişaf etdirir. Bu cür fəaliyyətlər müasir təhsil modelinə uyğun şəkildə təşkil edilir.",
      },
      {
        icon: "sports",
        title: "İdman və fiziki fəaliyyət",
        body:
          "İdman və fiziki fəaliyyətlər də tələbə həyatının mühüm hissəsidir. Universitetdə təşkil olunan idman yarışları və komandalar tələbələrin sağlam həyat tərzi sürməsinə və stressin azaldılmasına kömək edir. Araşdırmalar göstərir ki, fiziki aktivlik akademik performansa da müsbət təsir edir və bu yanaşma AZTU-da da təşviq olunur.",
      },
      {
        icon: "library",
        title: "Akademik mühit və resurslar",
        body:
          "Akademik mühit kitabxana, elektron resurslar və müasir təhsil platformaları ilə zənginləşdirilmişdir. Tələbələr layihə əsaslı öyrənmə, laboratoriya işləri və praktiki təcrübə vasitəsilə real bilik və bacarıqlar əldə edirlər. Bu yanaşma onları əmək bazarına daha hazırlıqlı şəkildə çıxarmağa imkan verir.",
      },
      {
        icon: "work",
        title: "Karyera inkişafı",
        body:
          "Karyera inkişafı baxımından AZTU tələbələrinə geniş imkanlar təqdim edir. Təcrübə proqramları, karyera yarmarkaları və sənaye ilə əməkdaşlıqlar tələbələrin iş dünyası ilə erkən mərhələdə tanış olmasına şərait yaradır. Statistik göstəricilər göstərir ki, praktiki təcrübəyə malik tələbələr əmək bazarında daha rəqabətqabiliyyətli olurlar.",
      },
      {
        icon: "public",
        title: "Beynəlxalq imkanlar",
        body:
          "Bununla yanaşı, beynəlxalq proqramlar və mübadilə imkanları tələbələrin qlobal təcrübə qazanmasına şərait yaradır. Erasmus və digər layihələr vasitəsilə tələbələr xarici universitetlərdə təhsil ala və yeni biliklər əldə edə bilirlər. Bu isə onların dünyagörüşünü genişləndirir və multikultural mühitdə inkişafına töhfə verir.",
      },
      {
        icon: "trending",
        title: "Davamlı inkişaf",
        body:
          "Bütün bu imkanlara baxmayaraq, tələbə aktivliyinin artırılması universitet üçün prioritet istiqamətlərdən biridir. Universitet bu sahədə davamlı olaraq yeni təşəbbüslər həyata keçirir və tələbələrin daha fəal iştirakını təşviq edir.",
      },
    ],
    closing:
      "Ümumilikdə, Azərbaycan Texniki Universitetində tələbə həyatı hərtərəfli inkişafı dəstəkləyən və tələbələrə geniş perspektivlər açan bir mühit kimi xarakterizə olunur.",
  },
  en: {
    home: "Home",
    community: "Community",
    campusLife: "Campus life",
    title: "Student Life",
    subtitle:
      "Student life at Azerbaijan Technical University (AZTU) is characterized by a dynamic, multifaceted, and development-oriented environment.",
    intro:
      "The university not only provides academic knowledge but also offers extensive opportunities that support students' social, cultural, and professional growth. A modern credit system, transparent assessment mechanisms, and a practice-oriented educational approach ensure high-quality learning outcomes.",
    sections: [
      {
        icon: "groups",
        title: "Student organizations and volunteering",
        body:
          "At AZTU, students actively engage in university life through various student organizations, clubs, and volunteer programs. These activities help develop leadership, teamwork, and communication skills. Social involvement positively impacts academic performance and enables students to adapt more quickly to the university environment.",
      },
      {
        icon: "lightbulb",
        title: "Cultural and technological events",
        body:
          "Cultural events, seminars, forums, and projects organized at the university enhance students' creativity and initiative. At the same time, technology-oriented projects, hackathons, and academic competitions strengthen analytical thinking and problem-solving skills. Such activities are structured in line with modern educational practices.",
      },
      {
        icon: "sports",
        title: "Sports and physical activity",
        body:
          "Sports and physical activities are also an important part of student life. University teams and competitions promote a healthy lifestyle and help reduce stress. Research shows that physical activity contributes positively to academic performance, and this approach is encouraged at AZTU.",
      },
      {
        icon: "library",
        title: "Academic environment and resources",
        body:
          "Libraries, electronic resources, and modern learning platforms support the academic environment. Students gain practical knowledge and skills through project-based learning, laboratory work, and hands-on experience. This approach prepares them more effectively for the labor market.",
      },
      {
        icon: "work",
        title: "Career development",
        body:
          "In terms of career development, AZTU provides a wide range of opportunities. Internship programs, career fairs, and collaborations with industry partners enable students to engage with the professional world early on. Statistics indicate that students with practical experience are more competitive in the job market.",
      },
      {
        icon: "public",
        title: "International opportunities",
        body:
          "Additionally, international programs and exchange opportunities enable students to gain global experience. Through Erasmus and other initiatives, students can study abroad and gain new knowledge, broaden their perspectives, and contribute to their development in a multicultural environment.",
      },
      {
        icon: "trending",
        title: "Continuous development",
        body:
          "Despite these opportunities, increasing student engagement remains a priority. The university continually implements new initiatives to encourage more active student participation.",
      },
    ],
    closing:
      "Overall, student life at Azerbaijan Technical University is characterized by a supportive environment that fosters comprehensive development and offers students broad prospects.",
  },
};

const ICONS: Record<string, React.ReactNode> = {
  groups: <GroupsIcon sx={{ fontSize: 28 }} />,
  lightbulb: <LightbulbIcon sx={{ fontSize: 28 }} />,
  sports: <SportsHandballIcon sx={{ fontSize: 28 }} />,
  library: <LocalLibraryIcon sx={{ fontSize: 28 }} />,
  work: <WorkOutlineIcon sx={{ fontSize: 28 }} />,
  public: <PublicIcon sx={{ fontSize: 28 }} />,
  trending: <TrendingUpIcon sx={{ fontSize: 28 }} />,
  school: <SchoolIcon sx={{ fontSize: 28 }} />,
};

export default function StudentLifePage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const communityHref = lang === "az" ? "/az/icma" : "/en/community";
  const campusLifeHref = lang === "az" ? "/az/icma/kampus-heyati" : "/en/community/campus-life";

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* HERO */}
      <div className="relative min-h-[45vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[2.5rem] lg:rounded-bl-[10rem]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {p.home}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={communityHref} className="hover:text-white transition-colors">
              {p.community}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={campusLifeHref} className="hover:text-white transition-colors">
              {p.campusLife}
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
                AzTU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {p.title}
              </h1>
              <p className="text-lg text-white/70 font-medium max-w-3xl leading-relaxed">
                {p.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div className="px-4 md:px-10 lg:px-20 py-20 bg-white dark:bg-[#0b1330]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                  {p.title}
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                {p.intro}
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-[14px] p-10 text-white shadow-xl h-full flex flex-col justify-center">
                <SchoolIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-4" />
                <p className="text-base font-medium leading-relaxed opacity-90">
                  {p.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* SECTIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {p.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white dark:bg-white/5 rounded-[14px] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center mb-6 group-hover:bg-[#ee7c7e] group-hover:text-white transition-colors duration-300">
                  {ICONS[section.icon] ?? ICONS.school}
                </div>
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-4 leading-tight group-hover:text-[#ee7c7e] transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CLOSING */}
          <div className="mt-20 p-12 rounded-[14px] bg-[#1a2355] text-white">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-center opacity-90 max-w-4xl mx-auto">
              {p.closing}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
