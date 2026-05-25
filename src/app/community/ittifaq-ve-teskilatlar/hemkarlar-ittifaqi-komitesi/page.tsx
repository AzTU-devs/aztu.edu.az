"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PersonCard from "@/components/shared/PersonCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import GavelIcon from "@mui/icons-material/Gavel";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import { useLanguage } from "@/context/LanguageContext";

const DATA = {
  az: {
    eyebrow: "İcma",
    breadcrumbSection: "İttifaq və Təşkilatlar",
    title: "Həmkarlar İttifaqı Komitəsi",
    subtitle: "Azərbaycan Texniki Universitetinin Elm və Təhsil İşçiləri Həmkarlar İttifaqı Komitəsi",
    aboutTitle: "Haqqında",
    aboutParagraphs: [
      "Azərbaycan Texniki Universitetinin (AZTU) Həmkarlar İttifaqı Komitəsi universitetdə çalışan əməkdaşların (müəllim, inzibati heyət və s.) sosial-iqtisadi hüquqlarını qorumaq və onların rifahını yaxşılaşdırmaq istiqamətində fəaliyyət göstərən ictimai təşkilatlardan biridir.",
      "Təşkilat maddi yardım və sosial dəstək proqramları təşkil edir, idman və mədəni-kütləvi tədbirlər keçirir, sanatoriya-kurort və istirahət mərkəzlərinə güzəştli yollayışlar təqdim edir, təhsil müəssisələrində təhlükəsiz və sağlam əmək şəraitinin yaradılmasına dəstək verir.",
      "Hal-hazırda təşkilatın 1200-dən artıq üzvü var.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "Təhsil işçilərinin mənafelərini və həmkarlar ittifaqının hüquqlarını pozan qanunvericilik aktları, dövlət orqanlarının qərarları, sərəncamları barədə müvafiq qanunvericilik, icra və məhkəmə orqanlarına müraciət etmək",
      "Təhsil işçilərinin əmək və məişət şəraitinin yaxşılaşdırılmasına, üzvlərinin sağlamlığının möhkəmləndirilməsinə dair təkliflər vermək",
      "Fərdi əmək mübahisələrinin qanunvericilik çərçivəsində həll olunmasına köməklik etmək, kollektiv əmək mübahisələrinə baxılmasında iştirak etmək",
      "Üzvlərinin sağlamlığının möhkəmləndirilməsinə qayğı göstərərək təqaüd təminatının, sanatoriya-kurort müalicəsinin və istirahətlərinin təşkilində onlara köməklik göstərmək",
      "Xarici ölkələrin uyğun həmkarlar ittifaqı təşkilatları ilə əlaqələr, təcrübə və məlumat mübadiləsini təşkil etmək",
      "Dövlət orqanlarında, işəgötürənlərin təşkilatlarında, ictimai və siyasi təşkilatlarda öz üzvlərinin qanuni hüquq və mənafelərini müdafiə etmək",
      "Ətraf mühitə, sağlamlığa mənfi təsir göstərən ekoloji faktorların aradan qaldırılmasına, üzvlərinin sağlam və təhlükəsiz iş şəraiti ilə təmin edilməsinə ictimai nəzarətin həyata keçirilməsinə kömək etmək",
      "Həmkarlar ittifaqı təşkilatlarının həmrəyliyini gücləndirmək, üzvlərə ödənişsiz əmək, sosial və digər hüquqi məsələlər üzrə məsləhətlər vermək, maddi yardım göstərmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      { icon: "gavel", title: "Əmək hüquqlarının müdafiəsi", items: ["İşçilərin əmək hüquqlarını qoruyur və onların qanuni maraqlarını müdafiə edir", "Əmək müqavilələrinin düzgün tətbiqinə nəzarət edir", "Əmək mübahisələrinin həllində hüquqi dəstək göstərir"] },
      { icon: "handshake", title: "Sosial-iqtisadi maraqların təmin edilməsi", items: ["Əməkhaqqının artırılması və sosial təminatların yaxşılaşdırılması istiqamətində təşəbbüslər irəli sürür", "Maddi yardım və sosial dəstək proqramları təşkil edir", "İşçilərin rifahının yüksəldilməsi üçün layihələr həyata keçirir"] },
      { icon: "account_balance", title: "Kollektiv müqavilələrin bağlanması", items: ["İşəgötürənlərlə kollektiv müqavilələrin hazırlanmasında və imzalanmasında iştirak edir", "İşçilərin hüquqlarını təmin edən şərtlərin müqavilələrdə əks olunmasına nəzarət edir"] },
      { icon: "health", title: "Əməyin mühafizəsi və təhlükəsizliyin təmin edilməsi", items: ["Təhsil müəssisələrində təhlükəsiz və sağlam əmək şəraitinin yaradılmasına dəstək verir"] },
      { icon: "beach", title: "İstirahət və sağlamlıq proqramlarının təşkili", items: ["Sanatoriya-kurort və istirahət mərkəzlərinə güzəştli yollayışlar təqdim edir", "İdman və mədəni-kütləvi tədbirlər keçirir"] },
      { icon: "school", title: "Təhsil və peşəkar inkişafın dəstəklənməsi", items: ["Müəllim və alimlərin peşəkar inkişafına dəstək göstərir", "Elmi və pedaqoji təşəbbüsləri təşviq edir"] },
      { icon: "public", title: "Beynəlxalq əməkdaşlıq", items: ["Xarici həmkarlar ittifaqları və beynəlxalq təşkilatlarla əməkdaşlıq edir", "Təcrübə mübadiləsi və beynəlxalq layihələrdə iştirak edir"] },
    ],
    structureTitle: "Struktur",
    structureComposition: [
      { label: "Komitə", count: "17 nəfər" },
      { label: "Rəyasət heyəti", count: "11 nəfər" },
      { label: "Təftiş komissiyası", count: "5 nəfər" },
    ],
    bureausTitle: "Bürolar",
    bureausNote: "Komitənin daxilində 9 ilk təşkilat (büro) fəaliyyət göstərir",
    bureaus: [
      "Nəqliyyat və Logistika fakültəsi bürosu",
      "Energetika fakültəsi bürosu",
      "Maşınqayırma və metallurgiya fakültəsi bürosu",
      "İnformasiya və telekommunikasiya fakültəsi bürosu",
      "Xüsusi texnika və texnologiya fakültəsi bürosu",
      "Sənaye iqtisadiyyatı və menecment fakültəsi bürosu",
      "Təsərrüfat bürosu",
      "Ümumiuniversitet şöbələri bürosu (1)",
      "Ümumiuniversitet şöbələri bürosu (2)",
    ],
    chairTitle: "Sədr",
    chairBioTitle: "Bioqrafiya",
    chairBio: "Piriyeva Lalə Zakir qızı — filologiya üzrə fəlsəfə doktoru, dosent, filologiya sahəsi üzrə ixtisaslaşmış mütəxəssisdir. O, dil və ədəbiyyat istiqamətində elmi və pedaqoji fəaliyyət göstərir.\n\nPiriyeva L.Z pedaqoji fəaliyyətində Azərbaycan dilinin qloballaşma şəraitində zamanın tələblərinə uyğun istifadəsinə və ölkədə dilçiliyin inkişafına dair Dövlət proqramından irəli gələn tələblərə uyğun olaraq tələbələrə Azərbaycan dilində işgüzar və akademik kommunikasiya üzrə materialların aşılanması və mövcud istiqamət üzrə tələbələrə bilik və bacarıqların formalaşdırılması fənnin hədəflərini təşkil edir.\n\nHazırda o, Azərbaycan Texniki Universitetinin Humanitar fənlər kafedrasının dosenti kimi fəaliyyət göstərir. Eyni zamanda AMEA-nın Nəsimi adına Dilçilik İnstitutunun doktorantıdır.\n\nO, 16-dan çox elmi məqalənin və 2 monoqrafiyanın, 1 dərs vəsaitinin, 1 proqramın müəllifidir.",
    chairEducationTitle: "Təhsil",
    chairEducation: [
      { period: "1989–1994", degree: "Bakı Dövlət Universiteti – Filologiya fakültəsi" },
      { period: "1998", degree: "Filologiya üzrə fəlsəfə doktoru, Humanitar fənnlər kafedrasının dosenti" },
      { period: "2018", degree: "AMEA-nın Nəsimi adına Dilçilik İnstitutu – Doktorant" },
    ],
    chair: {
      name: "Piriyeva Lalə Zakir qızı",
      degree: "Fil.ü.f.d, dosent",
      email: "lale.piriyeva@aztu.edu.az",
      phone: "+99450 889 64 46",
      office: "I korpus, 203-cü otaq",
      hours: "Cümə günü 14:00–16:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      { name: "Paşayeva Samirə Möylə qızı", degree: "Magistr", email: "samira.pashayeva@etihi.org", phone: "+99455 244 43 99", title: "Mühasib-məsləhətçi" },
      { name: "Hüseynov Samir Qədir oğlu", degree: "Magistr", email: "samir.huseynov@etihi.org", phone: "+99455 227 47 69", title: "Mütəxəssis" },
    ],
    contactTitle: "Əlaqə",
  },
  en: {
    eyebrow: "Community",
    breadcrumbSection: "Unions & Organizations",
    title: "Trade Union Committee",
    subtitle: "Trade Union Committee of Science and Education Workers of Azerbaijan Technical University",
    aboutTitle: "About",
    aboutParagraphs: [
      "The Trade Union Committee of Azerbaijan Technical University (AZTU) is one of the public organizations working to protect the socio-economic rights of university employees (including academic staff, administrative personnel, etc.) and to improve their welfare.",
      "The organization arranges financial aid and social support programs, holds sports and cultural events, provides discounted vouchers to sanatorium and recreational centers, and supports the creation of safe and healthy working conditions in educational institutions.",
      "Currently, the organization has more than 1,200 members.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "To appeal to relevant legislative, executive, and judicial authorities regarding laws, decisions, and orders that violate the interests of education workers and trade union rights",
      "To submit proposals aimed at improving the working and living conditions of education workers and strengthening the health of members",
      "To assist in resolving individual labor disputes within the framework of legislation and to participate in the consideration of collective labor disputes",
      "To support members in organizing pension provision, sanatorium treatment, and recreation while promoting their health and well-being",
      "To establish relations, exchange experience and information with relevant trade union organizations of foreign countries",
      "To defend the legal rights and interests of its members in state bodies, employers' organizations, and public and political organizations",
      "To assist in public oversight for eliminating environmental factors harmful to health and ensuring safe and healthy working conditions for members",
      "To strengthen and develop solidarity among trade union organizations, provide free legal advice on labor, social, and other issues, and offer financial assistance to members",
    ],
    functionsTitle: "Main Functions",
    functions: [
      { icon: "gavel", title: "Protection of Labor Rights", items: ["Protects employees' labor rights and defends their legal interests", "Monitors the proper implementation of employment contracts", "Provides legal support in resolving labor disputes"] },
      { icon: "handshake", title: "Ensuring Socio-Economic Interests", items: ["Initiates actions aimed at increasing wages and improving social security", "Organizes financial aid and social support programs", "Implements projects to improve employees' welfare"] },
      { icon: "account_balance", title: "Conclusion of Collective Agreements", items: ["Participates in the preparation and signing of collective agreements with employers", "Ensures that employees' rights are reflected in these agreements"] },
      { icon: "health", title: "Occupational Safety and Health", items: ["Supports the creation of safe and healthy working conditions in educational institutions"] },
      { icon: "beach", title: "Organization of Recreation and Health Programs", items: ["Provides discounted access to sanatoriums and recreational centers", "Organizes sports and cultural events"] },
      { icon: "school", title: "Support for Education and Professional Development", items: ["Supports the professional development of teachers and researchers", "Promotes scientific and pedagogical initiatives"] },
      { icon: "public", title: "International Cooperation", items: ["Cooperates with foreign trade unions and international organizations", "Participates in exchange of experience and international projects"] },
    ],
    structureTitle: "Structure",
    structureComposition: [
      { label: "Committee", count: "17 members" },
      { label: "Presidium", count: "11 members" },
      { label: "Audit Commission", count: "5 members" },
    ],
    bureausTitle: "Bureaus",
    bureausNote: "There are 9 primary organizations (bureaus) operating within the committee",
    bureaus: [
      "Faculty of Transport and Logistics Bureau",
      "Faculty of Energy Bureau",
      "Faculty of Mechanical Engineering and Metallurgy Bureau",
      "Faculty of Information and Telecommunications Bureau",
      "Faculty of Special Equipment and Technology Bureau",
      "Faculty of Industrial Economics and Management Bureau",
      "Administrative Services Bureau",
      "General University Departments Bureau (1)",
      "General University Departments Bureau (2)",
    ],
    chairTitle: "Chair",
    chairBioTitle: "Biography",
    chairBio: "Piriyeva Lalə Zakir qızı — Doctor of Philosophy in Philology, Associate Professor, a specialist in the field of philology. She conducts scientific and pedagogical activities in the field of language and literature.\n\nIn her pedagogical activity, the goals of the subject consist of instilling in students materials on business and academic communication in the Azerbaijani language and forming knowledge and skills in the relevant direction, in accordance with the requirements of the State Program on the use of the Azerbaijani language in line with the demands of the time in the context of globalization and the development of linguistics in the country.\n\nShe currently serves as Associate Professor at the Department of Humanities at Azerbaijan Technical University and is also a doctoral candidate at the Institute of Linguistics named after Nasimi at ANAS.\n\nShe is the author of more than 16 scientific articles, 2 monographs, 1 textbook, and 1 program.",
    chairEducationTitle: "Education",
    chairEducation: [
      { period: "1989–1994", degree: "Baku State University – Faculty of Philology" },
      { period: "1998", degree: "Doctor of Philosophy in Philology, Associate Professor at Department of Humanities" },
      { period: "2018", degree: "Institute of Linguistics named after Nasimi, ANAS – Doctoral candidate" },
    ],
    chair: {
      name: "Piriyeva Lalə Zakir qızı",
      degree: "PhD in Philology, Associate Professor",
      email: "lale.piriyeva@aztu.edu.az",
      phone: "+99450 889 64 46",
      office: "Building I, Room 203",
      hours: "Friday 14:00–16:00",
    },
    staffTitle: "Staff",
    staff: [
      { name: "Paşayeva Samirə Möylə qızı", degree: "Master's", email: "samira.pashayeva@etihi.org", phone: "+99455 244 43 99", title: "Accountant-Consultant" },
      { name: "Hüseynov Samir Qədir oğlu", degree: "Master's", email: "samir.huseynov@etihi.org", phone: "+99455 227 47 69", title: "Specialist" },
    ],
    contactTitle: "Contact",
  },
};

const functionIcons: Record<string, React.ReactNode> = {
  gavel: <GavelIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  handshake: <HandshakeIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  account_balance: <AccountBalanceIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  health: <HealthAndSafetyIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  beach: <BeachAccessIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  school: <SchoolIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  public: <PublicIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
};

export default function HemkarlarIttifaqiPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* HERO */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {lang === "az" ? "Ana səhifə" : "Home"}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={lang === "az" ? "/az/icma" : "/en/community"} className="hover:text-white transition-colors">
              {lang === "az" ? "İcma" : "Community"}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-white/40">{p.breadcrumbSection}</span>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                {p.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                {p.title}
              </h1>
              <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                &quot;{p.subtitle}&quot;
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-white/70">
                  <GroupsIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                  <span className="text-sm font-bold">1200+ {lang === "az" ? "üzv" : "members"}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="flex items-center gap-3 text-white/70">
                  <AccountBalanceIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                  <span className="text-sm font-bold">9 {lang === "az" ? "büro" : "bureaus"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-20 py-24 space-y-32 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto">

          {/* ABOUT & CHAIR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.aboutTitle}</h2>
              </div>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                {p.aboutParagraphs.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </motion.div>

            {/* Chair profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <h3 className="text-xl font-black text-[#1a2355] dark:text-white flex items-center gap-3">
                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                {p.chairTitle}
              </h3>
              <PersonCard
                fullName={p.chair.name}
                academicDegree={p.chair.degree}
                title={p.title + " " + p.chairTitle}
                email={p.chair.email}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.office}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <AccessTimeIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.chair.hours}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* OBJECTIVES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.objectivesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] text-xs font-black shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{obj}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FUNCTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#1a2355] dark:bg-white/40 rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.functionsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {p.functions.map((fn, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-[#ee7c7e]/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center mb-5 group-hover:bg-[#ee7c7e]/20 transition-colors">
                    {functionIcons[fn.icon]}
                  </div>
                  <h3 className="font-black text-[#1a2355] dark:text-white text-sm mb-4 leading-snug">{fn.title}</h3>
                  <ul className="space-y-2">
                    {fn.items.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        <div className="w-1 h-1 rounded-full bg-[#ee7c7e] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* STRUCTURE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-white/5 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-white/10 mb-32 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
              <GroupsIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.structureTitle}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {p.structureComposition.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white dark:bg-white/5 rounded-2xl px-6 py-5 border border-gray-100 dark:border-white/10 shadow-sm">
                        <span className="font-bold text-[#1a2355] dark:text-white text-sm">{item.label}</span>
                        <span className="px-4 py-1.5 rounded-full bg-[#ee7c7e] text-white text-xs font-black">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">{p.bureausTitle}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">{p.bureausNote}</p>
                  <div className="space-y-3">
                    {p.bureaus.map((bureau, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 rounded-xl px-5 py-3.5 border border-gray-100 dark:border-white/10">
                        <span className="w-6 h-6 rounded-lg bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[10px] font-black text-[#ee7c7e] shrink-0">{i + 1}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{bureau}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CHAIR BIO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 border-t border-gray-100 dark:border-white/10 pt-32">
            <div className="lg:col-span-8 space-y-12">
              <section>
                <h3 className="text-3xl font-black text-[#1a2355] dark:text-white mb-8">{p.chair.name}</h3>
                <div className="space-y-6">
                  {p.chairBio.split("\n\n").map((para, i) => (
                    <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">{para}</p>
                  ))}
                </div>
              </section>
            </div>
            <div className="lg:col-span-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-[#1a2355] dark:text-white mb-8">{p.chairEducationTitle}</h4>
              <div className="space-y-4">
                {p.chairEducation.map((item, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-[#ee7c7e]/30 pb-4">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#ee7c7e]" />
                    <span className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest block mb-1">{item.period}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">{item.degree}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STAFF */}
          <section className="mb-32">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-[#1a2355] dark:text-white mb-3">{p.staffTitle}</h2>
              <div className="w-16 h-1 bg-[#ee7c7e] rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {p.staff.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PersonCard
                    fullName={member.name}
                    title={member.title}
                    academicDegree={member.degree}
                    email={member.email}
                  />
                  <div className="mt-4 flex items-center gap-3 text-xs font-bold text-gray-400 pl-4">
                    <PhoneIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                    {member.phone}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">{p.contactTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><PhoneIcon /></div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.chair.phone}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><EmailIcon /></div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.chair.email}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]"><BusinessIcon /></div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.chair.office}</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
