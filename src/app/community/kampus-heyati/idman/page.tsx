"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsIcon from "@mui/icons-material/Sports";
import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonCard from "@/components/shared/PersonCard";

type TabKey = "about" | "sections" | "coaches" | "competitions" | "contact";

const DATA = {
  az: {
    title: "AzTU İdman Klubu",
    subtitle: "Tələbələrin sağlam həyat tərzi və idman nailiyyətləri üçün yaradılmış mərkəz",
    home: "Ana səhifə",
    community: "İcma",
    campusLife: "Kampus həyatı",
    tabs: [
      { key: "about", label: "Haqqında", icon: <HistoryIcon sx={{ fontSize: 18 }} /> },
      { key: "sections", label: "İdman Bölmələri", icon: <SportsIcon sx={{ fontSize: 18 }} /> },
      { key: "coaches", label: "Məşqçi Heyəti", icon: <GroupsIcon sx={{ fontSize: 18 }} /> },
      { key: "competitions", label: "Yarışlar", icon: <EmojiEventsIcon sx={{ fontSize: 18 }} /> },
      { key: "contact", label: "Əlaqə", icon: <PhoneIcon sx={{ fontSize: 18 }} /> },
    ],
    about: {
      title: "Klubun Tarixi və Fəaliyyəti",
      paragraphs: [
        "Azərbaycan Texniki Universitetinin (AzTU) \"Bədən tərbiyəsi və idman\" kafedrası 1950-ci ildə yaradılmışdır. Kafedranın ilk müdiri dövrünün tanınmış idman mütəxəssisi O.M.Sarkisov olmuşdur.",
        "2015-ci ildə Təhsil Nazirliyinin əmri ilə kafedra ləğv edilmiş və onun bazasında \"AzTU İdman Klubu\" yaradılmışdır. Klubun əsas məqsədi tələbələr arasında bədən tərbiyəsi və idmanın kütləviliyini təmin etmək, onları sağlam həyat tərzinə cəlb etməkdir.",
        "Klub universitetin daxili yarışlarını təşkil etməklə yanaşı, həm də AzTU-nu respublika səviyyəli çempionatlarda, universiadalarda və beynəlxalq turnirlərdə təmsil edir.",
      ],
      chair: {
        label: "Klubun Sədri",
        name: "Aydın Ağalıyev",
        title: "Azərbaycanın fəxri bədən tərbiyəsi işçisi, SSRİ idman ustası"
      }
    },
    sections: {
      title: "İdman Bölmələri",
      intro: "Klubda 10-dan çox idman növü üzrə məşqlər və bölmələr fəaliyyət göstərir:",
      items: [
        "Basketbol", "Sərbəst güləş", "Yunan-Roma güləşi", "Cüdo", "Boks",
        "Voleybol", "Futbol / Futzal", "Stolüstü tennis", "Kikboksing", "Şahmat",
        "Dama", "Badminton", "Atletika"
      ]
    },
    coaches: {
      title: "Məşqçi-Müəllim Heyəti",
      list: [
        { name: "Aydın Ağalıyev", title: "Basketbol üzrə məşqçi" },
        { name: "Gülağa Sadıqov", title: "Sərbəst güləş və cüdo üzrə məşqçi" },
        { name: "Şahmar Rzayev", title: "Yunan-Roma güləşi üzrə məşqçi" },
        { name: "İsgəndər Rizayev", title: "Boks üzrə məşqçi (Azərbaycanın əməkdar məşqçisi)" },
        { name: "İlham Əzizzadə", title: "Futbol üzrə məşqçi (UEFA-nın \"A\" kateqoriyalı məşqçisi)" },
        { name: "Çingiz Əliyev", title: "Stolüstü tennis üzrə məşqçi" },
        { name: "Samir Rzayev", title: "Kikboksing üzrə məşqçi (Azərbaycanın əməkdar məşqçisi)" }
      ]
    },
    competitions: {
      title: "Əsas Yarışlar və Tədbirlər",
      calendar: [
        { month: "Noyabr", event: "Birinci kurs tələbələri arasında voleybol, şahmat, dama, stolüstü tennis, futsal, basketbol və güləş üzrə yarışlar." },
        { month: "Aprel-May", event: "Ümummilli lider Heydər Əliyevin doğum gününə həsr olunmuş fakültələrarası yarışlar." },
        { month: "May", event: "Boks və kikboksing üzrə universitet birinciliyi." }
      ],
      societies: "Klub həmçinin \"Gənclik\" Tələbə İdman Cəmiyyəti və Bakı Şəhər Gənclər və İdman Baş İdarəsinin təşkil etdiyi yarışlarda fəal iştirak edir."
    },
    contact: {
      title: "Əlaqə",
      address: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073",
      phone: "(+994 12) 538 33 83",
      hotline: "(+994 12) 539 13 05",
      email: "aztu@aztu.edu.az"
    }
  },
  en: {
    title: "AzTU Sport Club",
    subtitle: "A center created for students' healthy lifestyle and athletic achievements",
    home: "Home",
    community: "Community",
    campusLife: "Campus life",
    tabs: [
      { key: "about", label: "About", icon: <HistoryIcon sx={{ fontSize: 18 }} /> },
      { key: "sections", label: "Sports Sections", icon: <SportsIcon sx={{ fontSize: 18 }} /> },
      { key: "coaches", label: "Coaches", icon: <GroupsIcon sx={{ fontSize: 18 }} /> },
      { key: "competitions", label: "Competitions", icon: <EmojiEventsIcon sx={{ fontSize: 18 }} /> },
      { key: "contact", label: "Contact", icon: <PhoneIcon sx={{ fontSize: 18 }} /> },
    ],
    about: {
      title: "Club History and Activities",
      paragraphs: [
        "The Department of Physical Education and Sports at Azerbaijan Technical University (AzTU) was established in 1950. The first head of the department was O.M. Sarkisov, a well-known sports specialist of his time.",
        "In 2015, by order of the Ministry of Education, the department was abolished, and the 'AzTU Sport Club' was established on its basis. The main goal of the club is to ensure the popularity of physical education and sports among students and involve them in a healthy lifestyle.",
        "In addition to organizing the university's internal competitions, the club also represents AzTU in republic-level championships, universiades, and international tournaments.",
      ],
      chair: {
        label: "Chairman of the Club",
        name: "Aydin Agaliyev",
        title: "Honorary Physical Education Worker of Azerbaijan, USSR Master of Sports"
      }
    },
    sections: {
      title: "Sports Sections",
      intro: "The club operates training and sections for more than 10 types of sports:",
      items: [
        "Basketball", "Freestyle Wrestling", "Greco-Roman Wrestling", "Judo", "Boxing",
        "Volleyball", "Football / Futsal", "Table Tennis", "Kickboxing", "Chess",
        "Checkers", "Badminton", "Athletics"
      ]
    },
    coaches: {
      title: "Coaching Staff",
      list: [
        { name: "Aydin Agaliyev", title: "Basketball coach" },
        { name: "Gulagha Sadigov", title: "Freestyle wrestling and judo coach" },
        { name: "Shahmar Rzayev", title: "Greco-Roman wrestling coach" },
        { name: "Iskender Rizayev", title: "Boxing coach (Honored coach of Azerbaijan)" },
        { name: "Ilham Azizzade", title: "Football coach (UEFA 'A' category coach)" },
        { name: "Chingiz Aliyev", title: "Table tennis coach" },
        { name: "Samir Rzayev", title: "Kickboxing coach (Honored coach of Azerbaijan)" }
      ]
    },
    competitions: {
      title: "Major Competitions and Events",
      calendar: [
        { month: "November", event: "Competitions in volleyball, chess, checkers, table tennis, futsal, basketball, and wrestling among first-year students." },
        { month: "April-May", event: "Inter-faculty competitions dedicated to the birthday of national leader Heydar Aliyev." },
        { month: "May", event: "University championship in boxing and kickboxing." }
      ],
      societies: "The club also actively participates in competitions organized by the 'Genclik' Student Sports Society and the Baku City Head Office of Youth and Sports."
    },
    contact: {
      title: "Contact",
      address: "25 H. Javid Avenue, Baku, Azerbaijan AZ 1073",
      phone: "(+994 12) 538 33 83",
      hotline: "(+994 12) 539 13 05",
      email: "aztu@aztu.edu.az"
    }
  }
};

export default function SportPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];
  const [activeTab, setActiveTab] = useState<TabKey>("about");

  const communityHref = lang === "az" ? "/az/icma" : "/en/community";
  const campusLifeHref = lang === "az" ? "/az/icma/kampus-heyati" : "/en/community/campus-life";

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* HERO */}
      <div className="relative min-h-[45vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem]" />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {p.home}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={communityHref} className="hover:text-white transition-colors">{p.community}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={campusLifeHref} className="hover:text-white transition-colors">{p.campusLife}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                AzTU
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

      {/* TABS */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-[#0b1330]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {p.tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#ee7c7e] text-white shadow-lg shadow-[#ee7c7e]/30"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#1a2355] dark:hover:text-white"
                }`}
              >
                {tab.icon}
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
              {activeTab === "about" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                      <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.about.title}</h2>
                    </div>
                    {p.about.paragraphs.map((para, i) => (
                      <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="lg:col-span-4">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm">
                      <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest mb-4">{p.about.chair.label}</p>
                      <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-2">{p.about.chair.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        {p.about.chair.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sections" && (
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.sections.title}</h2>
                  </div>
                  <p className="text-lg text-gray-500 dark:text-gray-400">{p.sections.intro}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {p.sections.items.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4 hover:border-[#ee7c7e]/30 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                          <SportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                        </div>
                        <span className="font-bold text-[#1a2355] dark:text-white text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "coaches" && (
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.coaches.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.coaches.list.map((coach, i) => (
                      <PersonCard key={i} fullName={coach.name} title={coach.title} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "competitions" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.competitions.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {p.competitions.calendar.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 shadow-sm">
                        <span className="inline-block px-4 py-1 rounded-full bg-[#ee7c7e]/10 text-[#ee7c7e] text-xs font-black uppercase tracking-widest mb-6">
                          {item.month}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                          {item.event}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-10 rounded-[2.5rem] bg-[#1a2355] text-white">
                    <p className="text-lg font-medium leading-relaxed opacity-90">
                      {p.competitions.societies}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-12 max-w-4xl mx-auto">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.contact.title || "Əlaqə"}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        <LocationOnIcon className="text-[#ee7c7e]" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest mb-1">Ünvan</p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-relaxed">{p.contact.address}</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        <PhoneIcon className="text-[#ee7c7e]" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest mb-1">Telefon / Qaynar Xətt</p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{p.contact.phone}</p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{p.contact.hotline}</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm flex items-start gap-6 md:col-span-2">
                      <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                        <EmailIcon className="text-[#ee7c7e]" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest mb-1">Email</p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{p.contact.email}</p>
                      </div>
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
