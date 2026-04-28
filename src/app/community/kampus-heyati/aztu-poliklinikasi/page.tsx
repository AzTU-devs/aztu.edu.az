"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BadgeIcon from "@mui/icons-material/Badge";

const IMAGES = [
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2797.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2798.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2799.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2800.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2804.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2805.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2809.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2815.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2814.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2812.jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2815%20(1).jpg",
  "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/4-2025/IMG_2816.jpg",
];

const DATA = {
  az: {
    eyebrow: "Kampus Həyatı",
    breadcrumbSection: "Kampus Həyatı",
    communityLabel: "İcma",
    title: "AzTU Poliklinikası",
    subtitle: "1967-ci ildən AzTU icmasına tibbi xidmət göstərən tələbə poliklinikası",
    homeLabel: "Ana səhifə",
    aboutTitle: "Haqqında",
    aboutParagraphs: [
      "Tələbə Poliklinikası Bakı Əsas Səhiyyə Mərkəzinin tərkibinə daxildir və Azərbaycan Texniki Universitetinin 3-cü korpusunda yerləşir.",
      "Poliklinika 1967-ci ildən fəaliyyət göstərir və universitet icmasına ilkin tibbi yardım, müalicə və profilaktik tibbi xidmətlər göstərir.",
      "AzTU tələbələri, müəllimlər və inzibati heyət şəxsiyyət vəsiqəsi ilə poliklinikaya müraciət edə bilər. İxtisaslaşdırılmış müayinələrə yönləndirmə E-Tabib sistemi vasitəsilə həyata keçirilir.",
    ],
    stats: [
      { icon: "hospital", label: "Otaq", value: "20" },
      { icon: "people", label: "İşçi heyəti", value: "31" },
      { icon: "medical", label: "Həkim", value: "12" },
      { icon: "year", label: "Fəaliyyətdə", value: "1967" },
    ],
    roomsTitle: "Otaqlar və Şöbələr",
    rooms: [
      "Cərrahi otaq",
      "İnfeksion xəstəliklər otağı",
      "Müalicəvi otaq",
      "Laboratoriya",
      "Kardioloji otaq",
      "Oftalmoloji otaq",
      "Stomatoloji otaq",
      "Nevroloji otaq",
      "LOR otağı",
      "Manipulyasiya otağı",
    ],
    servicesTitle: "Xidmətlər",
    servicesText: "Poliklinikanın göstərdiyi xidmətlər İcbari Tibbi Sığorta çərçivəsində dövlət sığortası əsasında həyata keçirilir. Xidmətlərin 95%-i pulsuz göstərilir. Stomatoloji xidmətlər kimi bəzi ixtisaslaşdırılmış xidmətlər ödənişlidir.",
    serviceItems: [
      "İlkin tibbi yardım və müalicə",
      "Profilaktik tibbi xidmətlər",
      "İxtisaslaşdırılmış müayinələr",
      "Laboratoriya analizləri",
      "E-Tabib sistemi üzərindən yönləndirmə",
    ],
    staffTitle: "Tibbi Heyət",
    staffText: "Poliklinikanın cəmi 31 işçisi var, o cümlədən 12 həkim, tibb bacıları və inzibati heyət.",
    staffList: [
      { role: "Baş həkim", count: "1" },
      { role: "Cərrah", count: "1" },
      { role: "Terapevt", count: "4" },
      { role: "Kardioloq", count: "1" },
      { role: "Nevroloq", count: "1" },
      { role: "Laboratoriya həkimi", count: "1" },
      { role: "İnfeksionist", count: "1" },
      { role: "Stomatoloq", count: "1" },
      { role: "LOR həkimi", count: "1" },
    ],
    collaborationTitle: "Əməkdaşlıq",
    collaborationText: "Poliklinika laboratoriya analizləri sahəsində \"Sağlam Ailə\" Profilaktik Müayinə Tibb Mərkəzi ilə əməkdaşlıq edir.",
    hoursTitle: "İş Saatları",
    shifts: [
      { label: "I smena", time: "09:00 – 15:00" },
      { label: "II smena", time: "12:00 – 18:00" },
    ],
    galleryTitle: "Foto Qalereya",
    contactTitle: "Əlaqə",
    contact: {
      address: "H.Cavid prospekti 25, Yasamal rayonu, Bakı",
      building: "III korpus",
      phone1: "(012) 539 13 61",
      phone2: "(012) 539 14 47",
    },
    accessTitle: "Müraciət",
    accessText: "AzTU tələbələri, müəllim heyəti və inzibati işçilər şəxsiyyət vəsiqəsi ilə poliklinikaya müraciət edə bilər.",
  },
  en: {
    eyebrow: "Campus Life",
    breadcrumbSection: "Campus Life",
    communityLabel: "Community",
    title: "AzTU Polyclinic",
    subtitle: "Student polyclinic providing medical services to the AzTU community since 1967",
    homeLabel: "Home",
    aboutTitle: "About",
    aboutParagraphs: [
      "The Student Polyclinic is part of the Baku Main Health Center and is located in the 3rd Building of Azerbaijan Technical University.",
      "The polyclinic has been operating since 1967, providing primary healthcare, treatment, and preventive medical services to the university community.",
      "AzTU students, faculty, and administrative staff can visit the polyclinic with their ID cards. Referrals for specialized examinations are carried out through the E-Tabib system.",
    ],
    stats: [
      { icon: "hospital", label: "Rooms", value: "20" },
      { icon: "people", label: "Staff", value: "31" },
      { icon: "medical", label: "Doctors", value: "12" },
      { icon: "year", label: "Operating since", value: "1967" },
    ],
    roomsTitle: "Rooms & Departments",
    rooms: [
      "Surgical Room",
      "Infectious Diseases Room",
      "Therapeutic Room",
      "Laboratory",
      "Cardiological Room",
      "Ophthalmological Room",
      "Stomatological Room",
      "Neurological Room",
      "ENT Room",
      "Manipulation Room",
    ],
    servicesTitle: "Services",
    servicesText: "The services provided by the polyclinic are carried out under state insurance within the framework of Compulsory Medical Insurance. 95% of services are provided free of charge. Certain specialized services, such as dental care, require payment.",
    serviceItems: [
      "Primary healthcare and treatment",
      "Preventive medical services",
      "Specialized examinations",
      "Laboratory analysis",
      "Referrals via the E-Tabib system",
    ],
    staffTitle: "Medical Staff",
    staffText: "The polyclinic has a total of 31 staff members, including 12 doctors, nurses, and administrative personnel.",
    staffList: [
      { role: "Chief Doctor", count: "1" },
      { role: "Surgeon", count: "1" },
      { role: "Therapist", count: "4" },
      { role: "Cardiologist", count: "1" },
      { role: "Neurologist", count: "1" },
      { role: "Laboratory Doctor", count: "1" },
      { role: "Infectious Disease Specialist", count: "1" },
      { role: "Dentist", count: "1" },
      { role: "ENT Specialist", count: "1" },
    ],
    collaborationTitle: "Collaboration",
    collaborationText: "The polyclinic cooperates with the \"Healthy Family\" Preventive Examination Medical Center in the field of laboratory analysis.",
    hoursTitle: "Working Hours",
    shifts: [
      { label: "1st shift", time: "09:00 – 15:00" },
      { label: "2nd shift", time: "12:00 – 18:00" },
    ],
    galleryTitle: "Photo Gallery",
    contactTitle: "Contact",
    contact: {
      address: "25 Huseyn Javid Avenue, Yasamal District, Baku",
      building: "Building III",
      phone1: "(012) 539 13 61",
      phone2: "(012) 539 14 47",
    },
    accessTitle: "Access",
    accessText: "AzTU students, faculty members, and administrative staff may visit the polyclinic with their ID cards.",
  },
};

const statIcons: Record<string, React.ReactNode> = {
  hospital: <LocalHospitalIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  people: <PeopleIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  medical: <MedicalServicesIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  year: <VerifiedIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
};

export default function AztuPoliklinikasi() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const communityHref = lang === "az" ? "/az/icma" : "/en/community";

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">

      {/* HERO */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem]" />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
          <div
            className="absolute top-0 right-0 w-full lg:w-[85%] h-full opacity-15 rounded-bl-[5rem] lg:rounded-bl-[20rem] overflow-hidden"
            style={{ backgroundImage: `url(${IMAGES[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {p.homeLabel}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link href={communityHref} className="hover:text-white transition-colors">
              {p.communityLabel}
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
              <p className="text-xl text-white/80 font-medium max-w-2xl leading-relaxed italic">
                &quot;{p.subtitle}&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="-mt-16"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {p.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-[#0d1b3e] rounded-[2rem] p-6 border border-gray-100 dark:border-white/10 shadow-xl flex flex-col items-center text-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center">
                    {statIcons[stat.icon]}
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#1a2355] dark:text-white">{stat.value}</p>
                    <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ABOUT + ROOMS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.aboutTitle}</h2>
              </div>
              {p.aboutParagraphs.map((para, i) => (
                <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                  {para}
                </p>
              ))}

              {/* Access info */}
              <div className="mt-8 flex items-start gap-4 p-6 rounded-2xl bg-[#ee7c7e]/5 border border-[#ee7c7e]/20">
                <BadgeIcon className="text-[#ee7c7e] shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-[#1a2355] dark:text-white text-sm mb-1">{p.accessTitle}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{p.accessText}</p>
                </div>
              </div>
            </motion.div>

            {/* Rooms list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-[#1a2355] dark:bg-white/40 rounded-full" />
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">{p.roomsTitle}</h3>
              </div>
              <div className="space-y-2">
                {p.rooms.map((room, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-5 py-3.5 border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-200"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center text-[10px] font-black text-[#ee7c7e] shrink-0">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{room}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* SERVICES + STAFF */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a2355] rounded-[3rem] p-10 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <MedicalServicesIcon sx={{ fontSize: 160 }} />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <MedicalServicesIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                <h2 className="text-2xl font-black">{p.servicesTitle}</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-8 text-sm">{p.servicesText}</p>
              <ul className="space-y-3">
                {p.serviceItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircleIcon className="text-[#ee7c7e] shrink-0" sx={{ fontSize: 18 }} />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Staff */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/5 rounded-[3rem] p-10 border border-gray-100 dark:border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <PeopleIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white">{p.staffTitle}</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{p.staffText}</p>
              <div className="space-y-2">
                {p.staffList.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-xl px-5 py-3 border border-gray-100 dark:border-white/5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.role}</span>
                    <span className="px-3 py-1 rounded-full bg-[#ee7c7e] text-white text-xs font-black">{s.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* COLLABORATION + HOURS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 flex gap-6 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                <HandshakeIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-3">{p.collaborationTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{p.collaborationText}</p>
              </div>
            </motion.div>

            {/* Working hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                  <AccessTimeIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />
                </div>
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">{p.hoursTitle}</h3>
              </div>
              <div className="space-y-4">
                {p.shifts.map((shift, i) => (
                  <div key={i} className="flex items-center justify-between bg-white dark:bg-white/5 rounded-2xl px-6 py-4 border border-gray-100 dark:border-white/10 shadow-sm">
                    <span className="font-black text-[#1a2355] dark:text-white text-sm">{shift.label}</span>
                    <span className="px-4 py-1.5 rounded-full bg-[#ee7c7e] text-white text-sm font-black">{shift.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* GALLERY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.galleryTitle}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative overflow-hidden rounded-[1.5rem] shadow-lg group ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${p.title} - ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">{p.contactTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <LocationOnIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 leading-snug">{p.contact.address}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <BusinessIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">{p.contact.building}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <PhoneIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.contact.phone1}<br />{p.contact.phone2}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <AccessTimeIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">09:00 – 18:00</p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
