"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PersonCard from "@/components/shared/PersonCard";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsIcon from "@mui/icons-material/Sports";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import FlagIcon from "@mui/icons-material/Flag";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ComputerIcon from "@mui/icons-material/Computer";
import PublicIcon from "@mui/icons-material/Public";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LanguageIcon from "@mui/icons-material/Language";
import WorkIcon from "@mui/icons-material/Work";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieIcon from "@mui/icons-material/Movie";
import BrushIcon from "@mui/icons-material/Brush";
import CelebrationIcon from "@mui/icons-material/Celebration";
import NatureIcon from "@mui/icons-material/Nature";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HubIcon from "@mui/icons-material/Hub";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

type TabKey = "about" | "chair" | "secretariat" | "board" | "departments" | "clubs" | "activities" | "sdg" | "contact";

const CHAIR_PHOTO = "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/tgt_sedr.jpg"; // Placeholder or real if found

const DATA = {
  az: {
    eyebrow: "İcma",
    breadcrumbSection: "İttifaq və Təşkilatlar",
    title: "Tələbə Gənclər Təşkilatı (TGT)",
    subtitle: "Tələbələrin maraqlarını təmsil edən və onların fərdi inkişafını dəstəkləyən əsas tələbə təşkilatı",
    homeLabel: "Ana səhifə",
    communityLabel: "İcma",
    tabs: [
      { key: "about" as TabKey, label: "Haqqında" },
      { key: "chair" as TabKey, label: "Sədr" },
      { key: "secretariat" as TabKey, label: "Katiblik" },
      { key: "board" as TabKey, label: "İdarə Heyəti" },
      { key: "departments" as TabKey, label: "Şöbələr" },
      { key: "clubs" as TabKey, label: "Klublar" },
      { key: "activities" as TabKey, label: "Fəaliyyətlər" },
      { key: "sdg" as TabKey, label: "SDG" },
      { key: "contact" as TabKey, label: "Əlaqə" },
    ],
    about: {
      title: "TGT haqqında",
      paragraphs: [
        "AzTU Tələbə Gənclər Təşkilatı (TGT) tələbələrin inkişafında mühüm rol oynayır, müxtəlif klublar və fəaliyyətlər vasitəsilə hərtərəfli universitet təcrübəsini təşviq edir.",
        "Təşkilat liderlik, yaradıcılıq, vətəndaşlıq məsuliyyəti və akademik mükəmməlliyi aşılayır. TGT tələbələrin hüquqlarının müdafiəsi, onların asudə vaxtının səmərəli təşkili və ictimai fəallığının artırılması istiqamətində çalışır.",
        "TGT BMT-nin Dayanıqlı İnkişaf Məqsədlərini (SDG) fəal şəkildə dəstəkləyir və Azərbaycan Tələbə Gənclər Təşkilatları İttifaqının (ATGTİ) çətiri altında fəaliyyət göstərir.",
      ],
      stats: [
        { value: "1000+", label: "Fəal Üzv" },
        { value: "16", label: "Klub" },
        { value: "5", label: "Departament" },
        { value: "17", label: "SDG Məqsədi" },
      ],
    },
    chair: {
      title: "Sədr",
      name: "Ruslan Taleh oğlu Qənbərov",
      degree: "SABAH qrupları tələbəsi",
      email: "tgt@aztu.edu.az",
      phone1: "(+994 99) 724 64 54",
      bioTitle: "Bioqrafiya",
      bio: "15 yanvar 2003-cü ildə anadan olub. Teknofest Azərbaycan 2022-nin \"Sosial Yönümlü Texnologiyalar\" kateqoriyası üzrə finalçısı və 2-ci yer qalibidir.\n\nRuslan Qənbərov həmçinin 2016-2017-ci illər üzrə respublika basketbol çempionudur. O, tələbə hərəkatında fəal iştirak edərək gənclərin inkişafı üçün müxtəlif layihelerə rəhbərlik edir.",
      educationTitle: "Təhsil",
      education: [
        { period: "Hazırda", degree: "Bakalavr — Radiotexnika və telekommunikasiya mühəndisliyi (SABAH), AzTU" },
      ],
      achievementsTitle: "Nailiyyətlər",
      achievements: [
        "Teknofest Azərbaycan 2022 - 2-ci yer",
        "Respublika Basketbol Çempionu (2016-2017)",
      ]
    },
    secretariat: {
      title: "Katiblik",
      members: [
        { name: "Aynur Zeynalova", title: "Baş katib" },
        { name: "Emin Əliyev", title: "Fakültələrlə iş üzrə menecer" },
        { name: "Elnur İsmayılov", title: "Klublarla iş üzrə menecer" },
        { name: "Əli Məmmədli", title: "Protokol üzrə menecer" },
        { name: "Əsgər Məmmədov", title: "Tədbirlərin təşkili üzrə menecer" },
        { name: "Rəşvin Şirəlizadə", title: "PR menecer" },
      ]
    },
    board: {
      title: "İdarə Heyəti",
      members: [
        { name: "Xəyal Balayev", title: "Xüsusi texnika və texnologiya fakültəsinin sədri" },
        { name: "Nihat Ramazanov", title: "Energetika və avtomatika fakültəsinin sədri" },
        { name: "Seymur Kərimov", title: "Tələbə Əyləncə Klubunun sədri" },
        { name: "Ayşən Tağızadə", title: "Karyeraya Giriş Klubunun sədri" },
        { name: "Qulu İbadov", title: "İdman Oyunları Departamentinin sədri" },
        { name: "Zakir Həmidli", title: "Beynəlxalq Könüllülər Departamentinin sədri" },
      ]
    },
    departments: {
      title: "Şöbələr və Departamentlər",
      items: [
        { icon: "sports", title: "İdman Oyunları Departamenti" },
        { icon: "press", title: "Mətbuat şöbəsi" },
        { icon: "volunteers", title: "Əsas Heyət Könüllüləri Departamenti" },
        { icon: "intl", title: "Beynəlxalq Könüllülər Departamenti" },
        { icon: "projects", title: "Layihələr və İnnovasiyalar Departamenti" },
      ]
    },
    clubs: {
      title: "Klublar",
      items: [
        { icon: "it", title: "IT Klubu" },
        { icon: "flag", title: "Vətənpərvərlik Klubu" },
        { icon: "intl", title: "Erasmus Klubu" },
        { icon: "business", title: "İqtisadçılar Klubu" },
        { icon: "lang", title: "Xarici Dillər Klubu" },
        { icon: "intellectual", title: "İntellektual Oyunlar Klubu" },
        { icon: "electronics", title: "Orbita Elektronika Klubu" },
        { icon: "career", title: "Karyeraya Giriş Klubu" },
        { icon: "game", title: "Game Station Klubu" },
        { icon: "film", title: "Film Klubu" },
        { icon: "design", title: "Dizayn Klubu" },
        { icon: "music", title: "Musiqi Klubu" },
        { icon: "psychology", title: "Psixologiya Klubu" },
        { icon: "fun", title: "Tələbə Əyləncə Klubu" },
        { icon: "eco", title: "Ekologiya və Qida Təhlükəsizliyi Klubu" },
        { icon: "sports", title: "İdman Klubu" },
      ]
    },
    activities: {
      title: "Fəaliyyətlər",
      sections: [
        {
          title: "Yarışlar və Turnirlər",
          items: ["Tech Battle", "eFootball™ turniri", "PUBG Mobile turniri", "Fakültələrarası futbol çempionatı"]
        },
        {
          title: "Təhsil və İnkişaf",
          items: ["\"Karyera İnkişafı\" təlimləri", "\"SkillHub\" təlimləri", "\"Xaricdə Təhsil\" məlumat sessiyaları", "\"Biznes Psixologiyası\" panelləri"]
        },
        {
          title: "Sosial və Mədəni",
          items: ["Boulinq turnirləri", "Müasir İncəsənət Muzeyinə ziyarət", "Film nümayişləri (məsələn, \"Bir Əsrin Qəhrəmanı\")", "\"Xocalıya Qayıdış\" anım tədbirləri"]
        },
        {
          title: "Ekoloji Layihələr",
          items: ["\"Xəzəri Qoruyaq!\" layihəsi", "Şüvəlan çimərliyinin təmizlənməsi kampaniyası"]
        }
      ]
    },
    sdg: {
      title: "Dayanıqlı İnkişaf Məqsədləri (SDG)",
      intro: "AzTU TGT BMT-nin Dayanıqlı İnkişaf Məqsədlərini fəal şəkildə dəstəkləyir.",
      items: [
        {
          title: "Ekologiya Klubu",
          desc: "Təbii resursların qorunması və iqlim dəyişikliyi (SDG 13, 14, 15).",
          icon: "eco"
        },
        {
          title: "Yaşıl Enerji Klubu",
          desc: "Bərpa olunan enerji və ekoloji təmiz layihələrin tədqiqi (SDG 7, 9).",
          icon: "hub"
        },
        {
          title: "Liderlik Klubu",
          desc: "Daha ədalətli və davamlı bir dünya üçün mentorluq və panel müzakirələri.",
          icon: "school"
        },
        {
          title: "Ümumi Təşəbbüslər",
          desc: "AzMUN (Model United Nations), ağacəkmə aksiyaları, təkrar emal proqramları.",
          icon: "public"
        }
      ]
    },
    contact: {
      title: "Əlaqə",
      phone: "(+994 12) 538 94 70",
      email: "tgt@aztu.edu.az",
      address: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073, AzTU Əsas korpus, Otaq 415",
    },
  },
  en: {
    eyebrow: "Community",
    breadcrumbSection: "Unions & Organizations",
    title: "Student Youth Organization (SYO)",
    subtitle: "The primary student organization representing student interests and supporting their personal development",
    homeLabel: "Home",
    communityLabel: "Community",
    tabs: [
      { key: "about" as TabKey, label: "About" },
      { key: "chair" as TabKey, label: "Chair" },
      { key: "secretariat" as TabKey, label: "Secretariat" },
      { key: "board" as TabKey, label: "Management Board" },
      { key: "departments" as TabKey, label: "Departments" },
      { key: "clubs" as TabKey, label: "Clubs" },
      { key: "activities" as TabKey, label: "Activities" },
      { key: "sdg" as TabKey, label: "SDG" },
      { key: "contact" as TabKey, label: "Contact" },
    ],
    about: {
      title: "About SYO",
      paragraphs: [
        "The AzTU Student Youth Organization (SYO) plays a vital role in student development, promoting a well-rounded university experience through diverse clubs and activities.",
        "The organization fosters leadership, creativity, civic engagement, and academic excellence. SYO works towards protecting student rights, organizing their leisure time effectively, and increasing their social activity.",
        "SYO actively supports the UN Sustainable Development Goals (SDGs) and works under the umbrella of the Azerbaijan Student Youth Organizations' Union (ATGTİ).",
      ],
      stats: [
        { value: "1000+", label: "Active Members" },
        { value: "16", label: "Clubs" },
        { value: "5", label: "Departments" },
        { value: "17", label: "SDG Goals" },
      ],
    },
    chair: {
      title: "Chair",
      name: "Ruslan Taleh Qanbarov",
      degree: "SABAH groups student",
      email: "tgt@aztu.edu.az",
      phone1: "(+994 99) 724 64 54",
      bioTitle: "Biography",
      bio: "Born on January 15, 2003. He was a finalist and 2nd place winner in the \"Socially Oriented Technologies\" category at Teknofest Azerbaijan 2022.\n\nRuslan Qanbarov is also a former national basketball champion (2016-2017). He actively participates in the student movement and leads various projects for youth development.",
      careerTitle: "Career",
      educationTitle: "Education",
      education: [
        { period: "Present", degree: "Bachelor's — Radiotechnics and telecommunications engineering (SABAH), AzTU" },
      ],
      achievementsTitle: "Achievements",
      achievements: [
        "Teknofest Azerbaijan 2022 - 2nd place",
        "National Basketball Champion (2016-2017)",
      ]
    },
    secretariat: {
      title: "Secretariat",
      members: [
        { name: "Aynur Zeynalova", title: "General Secretary" },
        { name: "Emin Aliyev", title: "Faculty Work Manager" },
        { name: "Elnur Ismayilov", title: "Club Work Manager" },
        { name: "Ali Mammadli", title: "Protocol Manager" },
        { name: "Asgar Mammadov", title: "Event Organization Manager" },
        { name: "Rashvin Shiralizade", title: "PR Manager" },
      ]
    },
    board: {
      title: "Management Board",
      members: [
        { name: "Khayal Balayev", title: "Chairman of Special Equipment and Technology Faculty" },
        { name: "Nihat Ramazanov", title: "Chairman of Energy and Automation Faculty" },
        { name: "Seymur Karimov", title: "Chairman of Student Entertainment Club" },
        { name: "Ayshen Tagizade", title: "Chairman of Introduction to Career Club" },
        { name: "Gulu Ibadov", title: "Chairman of Sports Games Department" },
        { name: "Zakir Hamidli", title: "Chairman of International Volunteers Department" },
      ]
    },
    departments: {
      title: "Sections and Departments",
      items: [
        { icon: "sports", title: "Sports Games Department" },
        { icon: "press", title: "Press Department" },
        { icon: "volunteers", title: "Main Staff Volunteers Department" },
        { icon: "intl", title: "International Volunteers Department" },
        { icon: "projects", title: "Projects and Innovations Department" },
      ]
    },
    clubs: {
      title: "Clubs",
      items: [
        { icon: "it", title: "IT Club" },
        { icon: "flag", title: "Patriotism Club" },
        { icon: "intl", title: "Erasmus Club" },
        { icon: "business", title: "Economists Club" },
        { icon: "lang", title: "Foreign Languages Club" },
        { icon: "intellectual", title: "Intellectual Games Club" },
        { icon: "electronics", title: "Orbita Electronics Club" },
        { icon: "career", title: "Career Entry Club" },
        { icon: "game", title: "Game Station Club" },
        { icon: "film", title: "Film Club" },
        { icon: "design", title: "Design Club" },
        { icon: "music", title: "Music Club" },
        { icon: "psychology", title: "Psychology Club" },
        { icon: "fun", title: "Student Entertainment Club" },
        { icon: "eco", title: "Ecology and Food Safety Club" },
        { icon: "sports", title: "Sports Club" },
      ]
    },
    activities: {
      title: "Activities",
      sections: [
        {
          title: "Competitions and Tournaments",
          items: ["Tech Battle", "eFootball™ tournament", "PUBG Mobile tournament", "Interfaculty football championship"]
        },
        {
          title: "Education and Development",
          items: ["\"Career Development\" training", "\"SkillHub\" training", "\"Education Abroad\" info sessions", "\"Business Psychology\" panels"]
        },
        {
          title: "Social and Cultural",
          items: ["Bowling tournaments", "Visit to Museum of Modern Art", "Film screenings (e.g., \"Hero of a Century\")", "\"Return to Khojaly\" commemorative events"]
        },
        {
          title: "Environmental Projects",
          items: ["\"Let's Protect the Caspian!\" project", "Shuvelan Beach clean-up campaign"]
        }
      ]
    },
    sdg: {
      title: "Sustainable Development Goals (SDG)",
      intro: "AzTU SYO actively supports the UN Sustainable Development Goals.",
      items: [
        {
          title: "Ecology Club",
          desc: "Protection of natural resources and climate change (SDG 13, 14, 15).",
          icon: "eco"
        },
        {
          title: "Green Energy Club",
          desc: "Research on renewable energy and eco-friendly projects (SDG 7, 9).",
          icon: "hub"
        },
        {
          title: "Leadership Club",
          desc: "Mentorship and panel discussions for a more just and sustainable world.",
          icon: "school"
        },
        {
          title: "General Initiatives",
          desc: "AzMUN (Model United Nations), tree planting events, recycling programs.",
          icon: "public"
        }
      ]
    },
    contact: {
      title: "Contact",
      phone: "(+994 12) 538 94 70",
      email: "tgt@aztu.edu.az",
      address: "25 H. Javid Ave, Baku, Azerbaijan AZ 1073, AzTU Main Building, Room 415",
    },
  },
};

const iconMap: Record<string, React.ReactNode> = {
  sports: <SportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  press: <NewspaperIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  volunteers: <VolunteerActivismIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  intl: <PublicIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  projects: <AccountTreeIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  it: <ComputerIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  flag: <FlagIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  business: <BusinessCenterIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  lang: <LanguageIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  intellectual: <PsychologyIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  electronics: <HubIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  career: <WorkIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  game: <SportsEsportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  film: <MovieIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  design: <BrushIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  music: <MusicNoteIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  psychology: <PsychologyIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  fun: <CelebrationIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  eco: <NatureIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  food: <RestaurantIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  hub: <HubIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  school: <SchoolIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  public: <PublicIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
};

export default function TelebeGenclerTeskilatiPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];
  const [activeTab, setActiveTab] = useState<TabKey>("about");

  const communityHref = lang === "az" ? "/az/icma" : "/en/community";
  const sectionHref = lang === "az" ? "/az/icma/ittifaq-ve-teskilatlar" : "/en/community/unions-and-organizations";

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">

      {/* HERO */}
      <div className="relative min-h-[55vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem]" />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {p.homeLabel}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={communityHref} className="hover:text-white transition-colors">{p.communityLabel}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={sectionHref} className="hover:text-white transition-colors">{p.breadcrumbSection}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                {p.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {p.title}
              </h1>
              <p className="text-lg text-white/70 font-medium max-w-2xl leading-relaxed">
                {p.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0b1330]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {p.tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-black transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#ee7c7e] text-white shadow-lg shadow-[#ee7c7e]/30"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#1a2355] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-10 lg:px-20 py-20 bg-white dark:bg-[#0b1330]">
        <div className="max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >

              {/* ── ABOUT ── */}
              {activeTab === "about" && (
                <div className="space-y-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                        <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.about.title}</h2>
                      </div>
                      {p.about.paragraphs.map((para, i) => (
                        <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">{para}</p>
                      ))}
                      
                      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {p.tabs.filter(t => t.key !== "about" && t.key !== "contact").map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => {
                              setActiveTab(tab.key);
                              window.scrollTo({ top: 400, behavior: "smooth" });
                            }}
                            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/50 hover:bg-[#ee7c7e]/5 transition-all group"
                          >
                            <span className="font-bold text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e]">{tab.label}</span>
                            <ChevronRightIcon className="text-[#ee7c7e] group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                      {p.about.stats.map((stat, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-[2rem] p-6 border border-gray-100 dark:border-white/10 flex flex-col items-center text-center gap-2 shadow-sm">
                          <p className="text-3xl font-black text-[#1a2355] dark:text-white">{stat.value}</p>
                          <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── CHAIR ── */}
              {activeTab === "chair" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                      <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.chair.title}</h2>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6">{p.chair.bioTitle}</h3>
                      <div className="space-y-5">
                        {p.chair.bio.split("\n\n").map((para, i) => (
                          <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{para}</p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#1a2355] dark:text-white mb-6">{p.chair.educationTitle}</h3>
                        <div className="space-y-4">
                          {p.chair.education.map((item, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-[#ee7c7e]/30 pb-4">
                              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#ee7c7e]" />
                              <span className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest block mb-1">{item.period}</span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.degree}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">{p.chair.achievementsTitle}</h3>
                        <div className="space-y-3">
                          {p.chair.achievements.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-4 border border-gray-100 dark:border-white/10">
                              <EmojiEventsIcon className="text-[#ee7c7e]" fontSize="small" />
                              <span className="text-sm font-bold text-[#1a2355] dark:text-white">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
                      <PersonIcon sx={{ fontSize: 120, color: "#1a2355", opacity: 0.1 }} />
                      {/* <Image
                        src={CHAIR_PHOTO}
                        alt={p.chair.name}
                        fill
                        className="object-cover"
                        unoptimized
                        sizes="400px"
                      /> */}
                    </div>
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                      <p className="font-black text-[#1a2355] dark:text-white text-sm">{p.chair.name}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.phone1}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <EmailIcon className="text-[#ee7c7e]" fontSize="small" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold break-all">{p.chair.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECRETARIAT ── */}
              {activeTab === "secretariat" && (
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.secretariat.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.secretariat.members.map((member, i) => (
                      <PersonCard key={i} fullName={member.name} title={member.title} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── BOARD ── */}
              {activeTab === "board" && (
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.board.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.board.members.map((member, i) => (
                      <PersonCard key={i} fullName={member.name} title={member.title} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── DEPARTMENTS ── */}
              {activeTab === "departments" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.departments.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.departments.items.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                          {iconMap[item.icon]}
                        </div>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-base leading-tight">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CLUBS ── */}
              {activeTab === "clubs" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.clubs.title}</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {p.clubs.items.map((club, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center">
                          {iconMap[club.icon]}
                        </div>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-sm leading-tight">{club.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ACTIVITIES ── */}
              {activeTab === "activities" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.activities.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {p.activities.sections.map((section, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 shadow-sm">
                        <h3 className="text-xl font-black text-[#ee7c7e] mb-8">{section.title}</h3>
                        <ul className="space-y-4">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircleIcon className="text-[#ee7c7e] shrink-0 mt-0.5" sx={{ fontSize: 18 }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SDG ── */}
              {activeTab === "sdg" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.sdg.title}</h2>
                  </div>
                  
                  <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-[#1a2355] to-[#3b6ea8] text-white overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 max-w-2xl">
                        <p className="text-xl font-medium leading-relaxed opacity-90">{p.sdg.intro}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {p.sdg.items.map((item, i) => {
                      const colors = [
                        "bg-[#4C9F38]", // Green for Life on Land/Climate
                        "bg-[#32833F]", // Darker Green
                        "bg-[#C5192D]", // Red
                        "bg-[#26BDE2]", // Blue
                      ];
                      return (
                        <div key={i} className="group bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col sm:flex-row">
                          <div className={`w-full sm:w-32 ${colors[i % colors.length]} flex items-center justify-center p-6 sm:p-0`}>
                            <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                                {iconMap[item.icon]}
                            </div>
                          </div>
                          <div className="p-8 flex-1">
                            <h3 className="font-black text-[#1a2355] dark:text-white text-lg mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Decorative SDG strip */}
                  <div className="flex h-2 rounded-full overflow-hidden opacity-50">
                    <div className="flex-1 bg-[#E5243B]" /> <div className="flex-1 bg-[#DDA63A]" /> <div className="flex-1 bg-[#4C9F38]" /> <div className="flex-1 bg-[#C5192D]" />
                    <div className="flex-1 bg-[#FF3A21]" /> <div className="flex-1 bg-[#26BDE2]" /> <div className="flex-1 bg-[#FCC30B]" /> <div className="flex-1 bg-[#A21942]" />
                    <div className="flex-1 bg-[#FD6925]" /> <div className="flex-1 bg-[#DD1367]" /> <div className="flex-1 bg-[#FD9D24]" /> <div className="flex-1 bg-[#BF8B2E]" />
                    <div className="flex-1 bg-[#3F7E44]" /> <div className="flex-1 bg-[#0A97D9]" /> <div className="flex-1 bg-[#56B001]" /> <div className="flex-1 bg-[#00689D]" />
                    <div className="flex-1 bg-[#19486A]" />
                  </div>
                </div>
              )}

              {/* ── CONTACT ── */}
              {activeTab === "contact" && (
                <div className="space-y-12 max-w-2xl mx-auto text-center">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.contact.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center gap-4 bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center">
                        <PhoneIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                      </div>
                      <p className="font-bold text-gray-700 dark:text-gray-200 text-sm">{p.contact.phone}</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center">
                        <EmailIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                      </div>
                      <p className="font-bold text-gray-700 dark:text-gray-200 text-sm break-all">{p.contact.email}</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center">
                        <LocationOnIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                      </div>
                      <p className="font-bold text-gray-700 dark:text-gray-200 text-sm leading-snug">{p.contact.address}</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
