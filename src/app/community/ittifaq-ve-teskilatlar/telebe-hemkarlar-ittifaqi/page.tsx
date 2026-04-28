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

type TabKey = "about" | "chair" | "activities" | "clubs" | "membership" | "contact";

const CHAIR_PHOTO = "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/thik.jpg";

const DATA = {
  az: {
    eyebrow: "İcma",
    breadcrumbSection: "İttifaq və Təşkilatlar",
    title: "Tələbə Həmkarlar İttifaqı Komitəsi",
    subtitle: "9000-dən artıq tələbəni özündə birləşdirən, dövlət qeydiyyatından keçən yeganə ictimai tələbə təşkilatı",
    homeLabel: "Ana səhifə",
    communityLabel: "İcma",
    tabs: [
      { key: "about" as TabKey, label: "Haqqında" },
      { key: "chair" as TabKey, label: "Sədr" },
      { key: "activities" as TabKey, label: "Əsas Fəaliyyəti" },
      { key: "clubs" as TabKey, label: "Klublar" },
      { key: "membership" as TabKey, label: "Üzvülük Tələbləri" },
      { key: "contact" as TabKey, label: "Əlaqə" },
    ],
    about: {
      title: "THİK haqqında",
      paragraphs: [
        "Tələbələr həmişə gənclərin ən aktiv hissəsi olaraq tanınıblar. Təbii ki, bu enerjini tənzimləyən, onu doğru istiqamətə aparan və ona kömək edən strukturlara böyük ehtiyac duyulmaqdadır.",
        "Tələbə həmkarlar komitələri yuxarı təşkilatların dəstəyi ilə tələbələrin təhsilalma şəraitlərinin yaxşılaşdırılması, çətin həyat durumlarına maddi dəstək verilməsi və işlə təmin olunmasına yardım göstərirlər.",
        "Sovet dönəmində ali məktəblərində tələbələrin problemləri ilə bir neçə təşkilat məşğul olurdu: partiya, komsomol və həmkarlar təşkilatları. Yeni formalaşmış müasir sistemdə isə həmkarlar təşkilatlarının rolu daha da artıb.",
        "Bu nöqteyi-nəzərdən AzTU-nun Tələbə Həmkarlar İttifaqı Komitəsinin (THİK) fəaliyyəti böyük önəm daşıyır. 9000-dən artıq bakalavr, magistr və doktorant kollektivini özündə birləşdirən və dövlət qeydiyyatından keçən yeganə ictimai tələbə təşkilatı olan THİK universitetin idarə olunmasında da yaxından iştirak edir.",
      ],
      stats: [
        { value: "9000+", label: "Üzv" },
        { value: "2021", label: "Cari Sədr seçildi" },
        { value: "3", label: "Klub" },
        { value: "300+", label: "Yataqxana tələbəsi" },
      ],
    },
    chair: {
      title: "Sədr",
      name: "Ələkbərli Mirməhəmməd Elşən oğlu",
      degree: "",
      email: "elekberlim@aztu.edu.az",
      phone1: "(+994 12) 539 14 41",
      phone2: "(077) 415 08 02",
      bioTitle: "Bioqrafiya",
      bio: "31 yanvar 1999-cu il Şəki rayonunun Aydınbulaq kəndində anadan olub. Orta təhsilini 2005–2016-cı illərdə Ə.Kazımov adına 228 saylı tam orta məktəbdə almışdır.\n\nUniversitetdə 2016–2020-ci illərdə İnformasiya texnologiyaları ixtisasında oxumuş, sonradan magistratura səviyyəsində Kompüter elmləri üzrə təhsilini davam etdirmişdir.",
      careerTitle: "Fəaliyyət tarixi",
      career: [
        { period: "2017–2019", role: "Fakültə sədr müavini" },
        { period: "2019–2020", role: "Sədr müşaviri" },
        { period: "2020–2021", role: "Sədr müavini" },
        { period: "2021 – indiyə qədər", role: "Sədr" },
      ],
      educationTitle: "Təhsil",
      education: [
        { period: "2005–2016", degree: "Ə.Kazımov adına 228 saylı tam orta məktəb" },
        { period: "2016–2020", degree: "Bakalavr — İnformasiya texnologiyaları, AzTU" },
        { period: "Magistratura", degree: "Kompüter elmləri, AzTU" },
      ],
    },
    activities: {
      title: "Əsas Fəaliyyəti",
      intro: "Komitənin fəaliyyəti dörd əsas prinsip üzərində qurulmuşdur.",
      items: [
        {
          icon: "sports",
          title: "Cismən və ruhən sağlam gəncin formalaşması",
          desc: "\"Sağlam bədəndə sağlam ruh olar\" prinsipi əsasında müntəzəm olaraq futbol, basketbol, voleybol, şahmat və digər idman növlərindən müsabiqələr keçirilir. Bu tədbirlər gəncliyin inkişafını dəstəkləyir, zərərli vərdişlərdən uzaq tutur. Ümummilli Lider Heydər Əliyevin ad günü münasibətilə hər il fakültələr arasında müsabiqələr keçirilir, qalib komandalar mükafatlandırılır.",
        },
        {
          icon: "social",
          title: "Tələbələrə sosial dəstək",
          desc: "Komitə ehtiyacı olan tələbələrə, qaçqın ailələrinə və şəhid ailələrinə maddi yardım göstərir. Hər il 300-dək tələbə universitetin yataqxanalarında yerləşdirilir. Hər ay 35-ə qədər aztəminatlı tələbə universitetin yeməkxanasından pulsuz yemək voucheri alır. Mali çətinliklə üzləşən tələbələrə fərdi yardım göstərilir.",
        },
        {
          icon: "flag",
          title: "Vətənpərvərlik ruhunun formalaşdırılması",
          desc: "20 Yanvar şəhidlərinin və Ümummilli Lider Heydər Əliyevin məzarını ziyarət etmək, Novruz bayramı ənənələrini yaşatmaq, milli adət-ənənələri tələbələr arasında təbliğ etmək kimi tədbirlər həyata keçirilir.",
        },
        {
          icon: "communication",
          title: "Ünsiyyətcil gəncin yetişdirilməsi",
          desc: "Tələbələrin azad fikirlərini bildirməsi və rahat ünsiyyət qurması üçün müxtəlif mövzularda debatlar və müzakirələr təşkil edilir.",
        },
      ],
    },
    clubs: {
      title: "Klublar",
      intro: "Tələbə Həmkarlar İttifaqı Komitəsinin nəzdində bir sıra dərnək və klub fəaliyyət göstərir.",
      items: [
        {
          icon: "music",
          title: "Mədəniyyət dərnəyi",
          subItems: ["Musiqi", "Çalğı alətləri", "Rəqs", "Bədii yaradıcılıq"],
        },
        {
          icon: "intellectual",
          title: "İntellektual klub",
          subItems: [],
        },
        {
          icon: "sports",
          title: "İdman klubu",
          subItems: [],
        },
      ],
    },
    membership: {
      title: "Üzvülük Tələbləri",
      intro: "Quruma üzv qəbul olmaq çox sadədir. Təşkilatın Əsasnaməsini qəbul edən Azərbaycan Texniki Universitetinin hər bir tələbəsi bu quruma üzv ola bilər.",
      rightsTitle: "Üzv hüquqları",
      rights: [
        "Təşkilatın rəhbər orqanlarını seçmək və seçilmək",
        "Təşkilatın fəaliyyətinə aid olan məsələlərin müzakirəsində sərbəst iştirak etmək",
        "Təşkilatın müdafiəsindən istifadə etmək",
        "Təşkilat tərəfindən həyata keçirilən tədbirlərdə iştirak etmək",
      ],
      obligationsTitle: "Üzv öhdəlikləri",
      obligations: [
        "Əsasnamənin müddəalarına əməl etmək",
        "Rəhbər orqanların qərarlarını yerinə yetirmək",
        "Sessiya nəticələri ilə bağlı məsələlərdə komitə vasitəsilə müraciət etmək",
      ],
    },
    contact: {
      title: "Əlaqə",
      phone: "(+994 12) 539 14 41",
      email: "thik@aztu.edu.az",
      address: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073",
    },
  },
  en: {
    eyebrow: "Community",
    breadcrumbSection: "Unions & Organizations",
    title: "Student Trade Union Committee",
    subtitle: "The only registered public student organization uniting more than 9,000 students, master's and doctoral students",
    homeLabel: "Home",
    communityLabel: "Community",
    tabs: [
      { key: "about" as TabKey, label: "About" },
      { key: "chair" as TabKey, label: "Chair" },
      { key: "activities" as TabKey, label: "Main Activities" },
      { key: "clubs" as TabKey, label: "Clubs" },
      { key: "membership" as TabKey, label: "Membership" },
      { key: "contact" as TabKey, label: "Contact" },
    ],
    about: {
      title: "About STUC",
      paragraphs: [
        "Students have always been recognized as the most active segment of youth. Naturally, there is a great need for structures that regulate this energy, guide it in the right direction, and provide support.",
        "Student trade union committees, with the support of higher organizations, assist in improving students' learning conditions, providing material support in difficult life situations, and helping with employment.",
        "During the Soviet era, several organizations dealt with student problems in higher education institutions: party, Komsomol, and trade union organizations. In the newly formed modern system, the role of trade union organizations has increased even more.",
        "From this perspective, the activities of AzTU's Student Trade Union Committee (STUC) are of great importance. STUC, which unites a collective of more than 9,000 bachelor's, master's, and doctoral students and is the only registered public student organization, is also closely involved in the management of the university.",
      ],
      stats: [
        { value: "9000+", label: "Members" },
        { value: "2021", label: "Current Chair elected" },
        { value: "3", label: "Clubs" },
        { value: "300+", label: "Dormitory students" },
      ],
    },
    chair: {
      title: "Chair",
      name: "Alakbarli Mirmahammad Elshan",
      degree: "",
      email: "elekberlim@aztu.edu.az",
      phone1: "(+994 12) 539 14 41",
      phone2: "(077) 415 08 02",
      bioTitle: "Biography",
      bio: "Born on January 31, 1999, in the Aydınbulaq village of Shaki district. He completed his secondary education from 2005 to 2016 at Secondary School No. 228 named after A. Kazimov.\n\nHe studied Information Technologies at the university from 2016 to 2020, and subsequently continued his education at the master's level in Computer Science.",
      careerTitle: "Career History",
      career: [
        { period: "2017–2019", role: "Faculty Vice-Chair" },
        { period: "2019–2020", role: "Chair Advisor" },
        { period: "2020–2021", role: "Vice-Chair" },
        { period: "2021 – present", role: "Chair" },
      ],
      educationTitle: "Education",
      education: [
        { period: "2005–2016", degree: "Secondary School No. 228 named after A. Kazimov" },
        { period: "2016–2020", degree: "Bachelor's — Information Technologies, AzTU" },
        { period: "Master's", degree: "Computer Science, AzTU" },
      ],
    },
    activities: {
      title: "Main Activities",
      intro: "The committee's activities are built on four fundamental principles.",
      items: [
        {
          icon: "sports",
          title: "Forming a Physically and Mentally Healthy Youth",
          desc: "Based on the principle that \"a healthy mind resides in a healthy body,\" regular competitions are held in football, basketball, volleyball, chess, and other sports. These activities support youth development and keep them away from harmful habits. Annual competitions are held between faculties in honor of National Leader Heydar Aliyev's birthday, with winning teams receiving awards.",
        },
        {
          icon: "social",
          title: "Social Support for Students",
          desc: "The committee provides material assistance to underprivileged students, refugee families, and families of martyrs. Approximately 300 students are accommodated in university dormitories annually. About 35 disadvantaged students receive free meal vouchers from the university cafeteria each month. Individual assistance is provided to students facing financial difficulties.",
        },
        {
          icon: "flag",
          title: "Formation of Patriotic Spirit",
          desc: "Activities include visiting the graves of January 20 martyrs and National Leader Heydar Aliyev, commemorating Novruz festival traditions, and promoting national customs among students.",
        },
        {
          icon: "communication",
          title: "Development of Communicative Youth",
          desc: "Debates and discussions on various topics are organized to encourage students to express their views freely and communicate comfortably.",
        },
      ],
    },
    clubs: {
      title: "Clubs",
      intro: "A number of clubs and associations operate under the Student Trade Union Committee.",
      items: [
        {
          icon: "music",
          title: "Cultural Club",
          subItems: ["Music", "Musical instruments", "Dance", "Artistic creativity"],
        },
        {
          icon: "intellectual",
          title: "Intellectual Club",
          subItems: [],
        },
        {
          icon: "sports",
          title: "Sports Club",
          subItems: [],
        },
      ],
    },
    membership: {
      title: "Membership Requirements",
      intro: "Joining the organization is very simple. Any student of Azerbaijan Technical University who accepts the organization's Charter can become a member.",
      rightsTitle: "Member Rights",
      rights: [
        "To elect and be elected to the governing bodies of the organization",
        "To freely participate in the discussion of matters related to the organization's activities",
        "To use the protection of the organization",
        "To participate in events organized by the organization",
      ],
      obligationsTitle: "Member Obligations",
      obligations: [
        "To comply with the provisions of the Charter",
        "To implement the decisions of the governing bodies",
        "To apply through the committee regarding matters related to exam results",
      ],
    },
    contact: {
      title: "Contact",
      phone: "(+994 12) 539 14 41",
      email: "thik@aztu.edu.az",
      address: "25 Heydar Aliyev Ave, Baku, Azerbaijan AZ 1073",
    },
  },
};

const activityIcons: Record<string, React.ReactNode> = {
  sports: <SportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  social: <VolunteerActivismIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  flag: <FlagIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  communication: <RecordVoiceOverIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
};

const clubIcons: Record<string, React.ReactNode> = {
  music: <MusicNoteIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  intellectual: <PsychologyIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  sports: <FitnessCenterIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
};

export default function TelebeHemkarlarIttifaqiPage() {
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

                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">{p.chair.careerTitle}</h3>
                      <div className="space-y-3">
                        {p.chair.career.map((item, i) => (
                          <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-2xl px-6 py-4 border border-gray-100 dark:border-white/10">
                            <span className="text-sm font-bold text-[#1a2355] dark:text-white">{item.role}</span>
                            <span className="px-3 py-1 rounded-full bg-[#ee7c7e] text-white text-xs font-black">{item.period}</span>
                          </div>
                        ))}
                      </div>
                    </div>

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
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <Image
                        src={CHAIR_PHOTO}
                        alt={p.chair.name}
                        fill
                        className="object-cover"
                        unoptimized
                        sizes="400px"
                      />
                    </div>
                    <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                      <p className="font-black text-[#1a2355] dark:text-white text-sm">{p.chair.name}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.phone1}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.phone2}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <EmailIcon className="text-[#ee7c7e]" fontSize="small" />
                        <span className="text-gray-600 dark:text-gray-300 font-bold break-all">{p.chair.email}</span>
                      </div>
                    </div>
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
                  <p className="text-lg text-gray-500 dark:text-gray-400">{p.activities.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {p.activities.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white dark:bg-white/5 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-[#ee7c7e]/20 transition-all duration-300"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center mb-6">
                          {activityIcons[item.icon]}
                        </div>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-base mb-4 leading-snug">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                      </motion.div>
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
                  <p className="text-lg text-gray-500 dark:text-gray-400">{p.clubs.intro}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {p.clubs.items.map((club, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300 flex flex-col items-center text-center"
                      >
                        <div className="w-20 h-20 rounded-3xl bg-[#ee7c7e]/10 flex items-center justify-center mb-6">
                          {clubIcons[club.icon]}
                        </div>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-lg mb-4">{club.title}</h3>
                        {club.subItems.length > 0 && (
                          <ul className="space-y-2 w-full">
                            {club.subItems.map((sub, j) => (
                              <li key={j} className="flex items-center gap-2 justify-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] shrink-0" />
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── MEMBERSHIP ── */}
              {activeTab === "membership" && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                    <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.membership.title}</h2>
                  </div>

                  <div className="flex items-start gap-4 p-8 rounded-[2rem] bg-[#ee7c7e]/5 border border-[#ee7c7e]/20">
                    <AssignmentIndIcon className="text-[#ee7c7e] shrink-0 mt-0.5" sx={{ fontSize: 28 }} />
                    <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{p.membership.intro}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 shadow-sm">
                      <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                        <GroupsIcon className="text-[#ee7c7e]" />
                        {p.membership.rightsTitle}
                      </h3>
                      <ul className="space-y-4">
                        {p.membership.rights.map((right, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            <CheckCircleIcon className="text-[#ee7c7e] shrink-0 mt-0.5" sx={{ fontSize: 18 }} />
                            {right}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#1a2355] rounded-[2.5rem] p-10 text-white">
                      <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                        <AssignmentIndIcon className="text-[#ee7c7e]" />
                        {p.membership.obligationsTitle}
                      </h3>
                      <ul className="space-y-4">
                        {p.membership.obligations.map((ob, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-2 shrink-0" />
                            {ob}
                          </li>
                        ))}
                      </ul>
                    </div>
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
