"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

const CLUBS_DATA = [
  {
    az: { name: "Elmi Tədqiqat Klubu (İTT fakültəsi)", purpose: "Tələbələrin tədqiqat bacarıqlarının inkişaf etdirilməsi, akademik fəaliyyətə marağın artırılması", leader: "Emirhan Belli" },
    en: { name: "Scientific Research Club (ITT faculty)", purpose: "Develop students' research skills and increase interest in academic activity", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "IT Klubu (İTT fakültəsi)", purpose: "Tələbələrin müasir informasiya texnologiyaları ilə işləmə bacarıqlarının artırılması", leader: "Emirhan Belli" },
    en: { name: "IT Club (ITT faculty)", purpose: "Enhance students' skills in modern information technologies", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Kibertəhlükəsizlik Klubu (İTT fakültəsi)", purpose: "Tələbələrə informasiya təhlükəsizliyi sahəsində nəzəri və praktiki bacarıqların aşılanması", leader: "Emirhan Belli" },
    en: { name: "Cybersecurity Club (ITT faculty)", purpose: "Provide theoretical and practical knowledge in information security", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Game Development Klubu (İTT fakültəsi)", purpose: "Tələbələrə oyun inkişaf etdirmə sahəsində bilik və bacarıqların aşılanması", leader: "Emirhan Belli" },
    en: { name: "Game Development Club (ITT faculty)", purpose: "Teach knowledge and skills in game development", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Robototexnika Klubu (İTT fakültəsi)", purpose: "Tələbələrə robot sistemlərinin qurulması, proqramlaşdırılması və avtomatlaşdırılması sahəsində biliklərin verilməsi", leader: "Emirhan Belli" },
    en: { name: "Robotics Club (ITT faculty)", purpose: "Provide knowledge in building, programming, and automating robotic systems", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Debat Klubu (İTT fakültəsi)", purpose: "Tələbələrin tənqidi düşünmə və effektiv ünsiyyət bacarıqlarının inkişaf etdirilməsi", leader: "Emirhan Belli" },
    en: { name: "Debate Club (ITT faculty)", purpose: "Develop critical thinking and effective communication skills", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Project Management Klubu (İTT fakültəsi)", purpose: "Tələbələrə layihələrin idarə olunması sahəsində nəzəri və praktiki biliklərin aşılanması", leader: "Emirhan Belli" },
    en: { name: "Project Management Club (ITT faculty)", purpose: "Provide theoretical and practical knowledge in project management", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Digital Marketing Klubu (İTT fakültəsi)", purpose: "Tələbələrə rəqəmsal marketinq sahəsində müasir bilik və bacarıqların aşılanması", leader: "Emirhan Belli" },
    en: { name: "Digital Marketing Club (ITT faculty)", purpose: "Teach modern knowledge and skills in digital marketing", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Media Klubu (İTT fakültəsi)", purpose: "Fakültənin fəaliyyəti barəsində daha geniş auditoriyanın məlumatlandırılması", leader: "Emirhan Belli" },
    en: { name: "Media Club (ITT faculty)", purpose: "Inform a wider audience about faculty activities", leader: "Emirhan Belli" },
    phone: "010 712 24 72"
  },
  {
    az: { name: "Ecochemix Klubu (MM fakültəsi)", purpose: "Ekoloji kimya sahəsində kiçik tədqiqat layihələrinin hazırlanması, Dayanıqlı İnkişaf Məqsədləri (SDG) ilə əlaqədar tədbirlərin təşkili", leader: "Anar Məmmədov" },
    en: { name: "Ecochemix Club (MM faculty)", purpose: "Prepare small research projects in environmental chemistry and organize SDG-related events", leader: "Anar Mammadov" },
    phone: "050 658 34 60"
  },
  {
    az: { name: "Mechatronics Klubu (MM fakültəsi)", purpose: "Robot texnikası və avtomotlaşdırma üzrə müsabiqələrə hazırlıq", leader: "Anar Məmmədov" },
    en: { name: "Mechatronics Club (MM faculty)", purpose: "Preparation for robotics and automation competitions", leader: "Anar Mammadov" },
    phone: "050 658 34 60"
  },
  {
    az: { name: "Eco Technologiya Klubu (MM fakültəsi)", purpose: "Ekoloji texnologiyalar sahəsində layihələrin hazırlanması", leader: "Fəxrəddin Yusubov" },
    en: { name: "Eco Technology Club (MM faculty)", purpose: "Develop projects in environmental technologies", leader: "Fakhraddin Yusubov" },
    phone: "050 397 01 90"
  },
  {
    az: { name: "Gənc İqtisadçılar Klubu (SİM fakültəsi)", purpose: "Tələbələr üçün iqtisadi mövzularda seminarların, debat və diskussiyaların təşkili, onların real biznes problemləri üzərində komanda şəklində işləmə bacarıqlarının yaradılması", leader: "Aytac Abdullayeva" },
    en: { name: "Young Economists Club (SIM faculty)", purpose: "Organize seminars, debates, and discussions on economics; build teamwork on real business problems", leader: "Aytaj Abdullayeva" },
    phone: "051 874 37 69"
  },
  {
    az: { name: "NL Club (NL fakültəsi)", purpose: "Tələbələrə nəqliyyat və logistika sahəsində layihə idarəetməsi üzrə bilik və bacarıqların aşılanması", leader: "Allahverdi Şərifov" },
    en: { name: "NL Club (NL faculty)", purpose: "Teach project management skills in transport and logistics", leader: "Allahverdi Sharifov" },
    phone: "050 346 57 66"
  },
  {
    az: { name: "Traffic Tech Club (NL fakültəsi)", purpose: "Yol hərəkətinin təşkili və müasir nəqliyyat texnologiyaları sahəsində tədqiqat və layihələrin həyata keçirilməsi", leader: "Mahir Mustafayev" },
    en: { name: "Traffic Tech Club (NL faculty)", purpose: "Conduct research and projects in traffic management and modern transport technologies", leader: "Mahir Mustafayev" },
    phone: "051 615 62 55"
  },
  {
    az: { name: "SmartMove Club (NL fakültəsi)", purpose: "Nəqliyyat və logistika sahəsində innovativ həllərin hazırlanması", leader: "Azad Babayev" },
    en: { name: "SmartMove Club (NL faculty)", purpose: "Develop innovative solutions in transport and logistics", leader: "Azad Babayev" },
    phone: "050 363 43 18"
  },
  {
    az: { name: "Conversation Club (NL fakültəsi)", purpose: "Tələbələrin xarici dil bacarıqlarının inkişaf etdirilməsi", leader: "Rəsul Şahverənli" },
    en: { name: "Conversation Club (NL faculty)", purpose: "Improve foreign language skills", leader: "Rasul Shahverenli" },
    phone: "055 341 02 82"
  },
  {
    az: { name: "Startup Klubu (Energetika fakültəsi)", purpose: "Tələbələrdə startup mədəniyyətinin formalaşdırılması, innovativ düşüncənin təşviq edilməsi", leader: "Yahya Qədirli" },
    en: { name: "Startup Club (Energy faculty)", purpose: "Promote startup culture and innovative thinking", leader: "Yahya Gadirli" },
    phone: "077 607 10 08"
  },
  {
    az: { name: "Elmi Tədqiqat Klubu (Energetika fakültəsi)", purpose: "Tələbələrdə elmi araşdırma aparmaq vərdişinin formalaşdırılması", leader: "Rauf Pənahzadə" },
    en: { name: "Scientific Research Club (Energy faculty)", purpose: "Develop scientific research habits", leader: "Rauf Panahzadeh" },
    phone: "050 742 88 88"
  },
  {
    az: { name: "Robotexnika və Energetika Klubu (Energetika fakültəsi)", purpose: "Tələbələrin robotexnika və energetika sahələrində innovasiya təşəbbüslərinə cəlb edilməsi", leader: "İbrahim Cəfərov" },
    en: { name: "Robotics and Energy Club (Energy faculty)", purpose: "Engage students in innovation initiatives in robotics and energy", leader: "Ibrahim Jafarov" },
    phone: "055 907 20 90"
  },
  {
    az: { name: "Həmkar Qadınlar Klubu (THİK)", purpose: "Xanım tələbələrin sosial aktivliyinin artırılması", leader: "Fərqanə Novruzlu" },
    en: { name: "Women's Union Club (THIK)", purpose: "Increase social activity of female students", leader: "Fargana Novruzlu" },
    phone: "077 509 15 69"
  },
  {
    az: { name: "İntellektual Oyunlar Klubu (THİK)", purpose: "Tələbələrin məntiqi düşüncə və bilik səviyyəsinin artırılması", leader: "Nəzrin Kamallı" },
    en: { name: "Intellectual Games Club (THIK)", purpose: "Enhance logical thinking and knowledge level", leader: "Nazrin Kamalli" },
    phone: "050 782 11 34"
  },
  {
    az: { name: "Debat Klubu (THİK)", purpose: "Tələbələrin nitq və müzakirə bacarıqlarının inkişafı", leader: "Mirhüseyn Məmmədov" },
    en: { name: "Debate Club (THIK)", purpose: "Develop speaking and discussion skills", leader: "Mirhuseyn Mammadov" },
    phone: "077 295 95 20"
  },
  {
    az: { name: "Həmkar Könüllülər Departamenti (THİK)", purpose: "Sosial yönümlü layihələrin və könüllülük fəaliyyətinin təşkili və həyata keçirilməsi", leader: "Rüstəm Qarayev" },
    en: { name: "Volunteer Department (THIK)", purpose: "Organize and implement social and volunteer projects", leader: "Rustam Garayev" },
    phone: "055 699 13 21"
  },
  {
    az: { name: "GameStation Klubu (TGT)", purpose: "Tələbələr üçün müxtəlif əyləncə və inkişafyönümlü oyun turnirlərinin təşkil edilməsi", leader: "Sənan Mirzəyev" },
    en: { name: "GameStation Club (TGT)", purpose: "Organize entertainment and developmental game tournaments", leader: "Sanan Mirzayev" },
    phone: "070 605 51 55"
  },
  {
    az: { name: "CreArt Mədəniyyət Klubları Şəbəkəsi (TGT)", purpose: "Tələbələrin mədəniyyət və incəsənət sahəsində bacarıqlarının inkişaf etdirilməsi", leader: "Emin Cəfərov" },
    en: { name: "CreArt Cultural Clubs Network (TGT)", purpose: "Develop students' cultural and artistic skills", leader: "Emin Jafarov" },
    phone: "050 664 24 20"
  },
  {
    az: { name: "İT Klubu (TGT)", purpose: "Tələbələrin texnoloji biliklərinin artırılması", leader: "Rəhman Çələbi" },
    en: { name: "IT Club (TGT)", purpose: "Increase technological knowledge", leader: "Rahman Chalabi" },
    phone: "099 331 31 72"
  },
  {
    az: { name: "İqtisadiyyatçılar Klubu (TGT)", purpose: "Tələbələrin iqtisadi biliklərinin artırılması", leader: "Səbinə Cəfərova" },
    en: { name: "Economists Club (TGT)", purpose: "Increase economic knowledge", leader: "Sabina Jafarova" },
    phone: "055 524 24 22"
  },
  {
    az: { name: "Musiqi Klubu (TGT)", purpose: "Musiqi sahəsində istedadlı tələbələrin üzə çıxarılması", leader: "Almaz Məcidova" },
    en: { name: "Music Club (TGT)", purpose: "Reveal talented students in music", leader: "Almaz Majidova" },
    phone: "077 101 87 99"
  },
  {
    az: { name: "Texniki Fənlər Klubu (TGT)", purpose: "Texniki fənlərə marağın artırılmasının təşviqi", leader: "Osman Sadıqov" },
    en: { name: "Technical Subjects Club (TGT)", purpose: "Promote interest in technical subjects", leader: "Osman Sadigov" },
    phone: "050 245 99 77"
  },
  {
    az: { name: "Film Klubu (TGT)", purpose: "Tələbələrin film zövqünün inkişaf etdirilməsi", leader: "Nəzrin Bağırova" },
    en: { name: "Film Club (TGT)", purpose: "Develop students' taste in films", leader: "Nazrin Baghirova" },
    phone: "050 731 87 90"
  },
  {
    az: { name: "İntellektual Oyunlar Klubu (TGT)", purpose: "Tələbələrin dünyagörüşünün genişləndirilməsi", leader: "Yusif İsmayılov" },
    en: { name: "Intellectual Games Club (TGT)", purpose: "Expand students' worldview", leader: "Yusif Ismayilov" },
    phone: "050 367 72 02"
  },
  {
    az: { name: "Research Group (XTT fakültəsi)", purpose: "Müxtəlif sahələr üzrə aktual mövzuların araşdırılması", leader: "İsmayıl Baba" },
    en: { name: "Research Group (XTT faculty)", purpose: "Research current topics in various fields", leader: "Ismail Baba" },
    phone: "070 399 59 06"
  },
  {
    az: { name: "Language Club (XTT fakültəsi)", purpose: "Xarici dil bacarıqlarının inkişafı", leader: "Oruc Nəsrullayev" },
    en: { name: "Language Club (XTT faculty)", purpose: "Develop foreign language skills", leader: "Oruc Nasrullayev" },
    phone: "055 896 79 19"
  },
  {
    az: { name: "Mədəniyyət və Maarif Klubu (XTT fakültəsi)", purpose: "İctimai maarifləndirmə", leader: "Məhəmməd Fətəliyev" },
    en: { name: "Culture and Education Club (XTT faculty)", purpose: "Public awareness and education", leader: "Mahammad Fataliyev" },
    phone: "050 657 20 07"
  }
];

const TRANSLATIONS = {
  az: {
    home: "Ana səhifə",
    community: "İcma",
    campusLife: "Kampus həyatı",
    title: "Tələbə Klubları",
    subtitle: "AzTU-da fəaliyyət göstərən müxtəlif istiqamətli tələbə klubları",
    searchPlaceholder: "Klub axtar...",
    name: "Klubun adı",
    purpose: "Məqsədi",
    leader: "Rəhbəri",
    phone: "Əlaqə nömrəsi",
    noResults: "Axtarışa uyğun klub tapılmadı."
  },
  en: {
    home: "Home",
    community: "Community",
    campusLife: "Campus life",
    title: "Student Clubs",
    subtitle: "Various student clubs operating at AzTU",
    searchPlaceholder: "Search clubs...",
    name: "Club name",
    purpose: "Purpose",
    leader: "Leader",
    phone: "Contact number",
    noResults: "No clubs found matching your search."
  }
};

export default function KlublarPage() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClubs = CLUBS_DATA.filter(club => {
    const data = club[lang];
    const query = searchQuery.toLowerCase();
    return data.name.toLowerCase().includes(query) || 
           data.purpose.toLowerCase().includes(query) || 
           data.leader.toLowerCase().includes(query);
  });

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
              {t.home}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={communityHref} className="hover:text-white transition-colors">{t.community}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={campusLifeHref} className="hover:text-white transition-colors">{t.campusLife}</Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{t.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                AzTU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {t.title}
              </h1>
              <p className="text-lg text-white/70 font-medium max-w-2xl leading-relaxed">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEARCH AND GRID */}
      <div className="px-4 md:px-10 lg:px-20 py-20 bg-white dark:bg-[#0b1330]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* SEARCH BAR */}
          <div className="max-w-xl mx-auto mb-16 relative">
             <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
             </div>
             <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-[#ee7c7e]/50 focus:bg-white dark:focus:bg-[#0f172a] transition-all outline-none text-gray-700 dark:text-white font-medium shadow-sm"
             />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, i) => (
                  <motion.div
                    key={club.az.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-white dark:bg-white/5 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all group flex flex-col"
                  >
                    <div className="mb-6 flex items-start justify-between">
                       <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-colors duration-300">
                          <GroupsIcon sx={{ fontSize: 28 }} />
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-4 leading-tight group-hover:text-[#ee7c7e] transition-colors">
                      {club[lang].name}
                    </h3>
                    
                    <div className="flex-1 space-y-6">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#ee7c7e] mb-2">{t.purpose}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                            {club[lang].purpose}
                          </p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
                          <div className="space-y-1">
                             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <PersonIcon sx={{ fontSize: 12 }} />
                                {t.leader}
                             </div>
                             <p className="text-xs font-bold text-[#1a2355] dark:text-white">{club[lang].leader}</p>
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <PhoneIcon sx={{ fontSize: 12 }} />
                                {t.phone}
                             </div>
                             <a href={`tel:${club.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors">
                                {club.phone}
                             </a>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-xl font-bold text-gray-400">{t.noResults}</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
