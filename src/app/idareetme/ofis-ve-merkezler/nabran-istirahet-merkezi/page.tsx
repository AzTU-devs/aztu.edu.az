"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ForestIcon from "@mui/icons-material/Forest";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsIcon from "@mui/icons-material/Sports";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ShowerIcon from "@mui/icons-material/Shower";

const DATA = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Nabran İstirahət Mərkəzi",
    subtitle: "Xəzər dənizinin şimal sahillərindəki yaşıl meşə əhatəsində AzTU-nun istirahət mərkəzi",
    paragraphs: [
      "Azərbaycan Politexnik İnstitutunda (İndiki AzTU) 1960-cı ildən başlayaraq tətil zamanı tələbə-gənclərin bədən tərbiyəsinə və idmana cəlb edilməsi, onların sağlamlığının möhkəmləndirilməsi üçün idman-sağlamlıq düşərgəsinin yaradılması zərurəti meydana çıxmışdır.",
      "Belə bir düşərgənin yaradılması məqsədilə Azərbaycan SSR Nazirlər Soveti 28 iyun 1965-ci ildə Politexnik İnsititutu üçün müvafiq torpaq sahəsinin ayrılması haqqında sərəncam verdi.",
      "Həmin ilin iyul ayının 14-də Respublika Meşə Təsərrüfatı Baş İdarəsini əmrinə əsasən bu məqsəd üçün 4 hektar torpaq sahəsi ayrıldı.",
      "Bu sahə Bakı şəhərindən təqribən 250 km aralıda, Xəzər dənizinin şimal sahillərindəki Nabran qəsəbəsinin yaxınlığında yaşıl meşə əhatəsində, təbiətin dilbər bir guşəsində yerləşir.",
      "Burada yeməkxana, diskoteka meydanı, idman meydançaları, həkim müayinə otağı, hamam və digər məişət obyektləri istifadəyə verilib.",
      "İndi AzTU-nun Nabran İstirahət Mərkəzində hər il 500 nəfərədək əməkdaş və tələbə yay mövsümündə istirahət edir.",
    ],
    statsTitle: "Mərkəz haqqında",
    stats: [
      { icon: "location", label: "Məsafə", value: "≈ 250 km", sub: "Bakıdan" },
      { icon: "area", label: "Sahə", value: "4 hektar", sub: "Meşə əhatəsində" },
      { icon: "people", label: "İllik ziyarətçi", value: "500+", sub: "Əməkdaş və tələbə" },
      { icon: "year", label: "Yaradılıb", value: "1965", sub: "28 iyun" },
    ],
    facilitiesTitle: "İmkanlar",
    facilities: [
      { icon: "restaurant", label: "Yeməkxana" },
      { icon: "sports", label: "İdman meydançaları" },
      { icon: "hospital", label: "Həkim müayinə otağı" },
      { icon: "shower", label: "Hamam" },
      { icon: "beach", label: "Diskoteka meydanı" },
      { icon: "forest", label: "Yaşıl meşə ərazisi" },
    ],
    galleryTitle: "Foto Qalereya",
    homeLabel: "Ana səhifə",
    managementLabel: "İdarəetmə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Nabran Recreation Center",
    subtitle: "AzTU's recreation center nestled in green forests on the northern shores of the Caspian Sea",
    paragraphs: [
      "Since 1960, at the Azerbaijan Polytechnic Institute (now AzTU), the need arose to establish a sports and recreation camp to engage students in physical education and sports during holidays and to strengthen their health.",
      "For the purpose of establishing such a camp, the Council of Ministers of the Azerbaijan SSR issued a decree on June 28, 1965, on the allocation of the relevant land plot for the Polytechnic Institute.",
      "On July 14 of that year, based on an order from the Main Directorate of Forestry of the Republic, 4 hectares of land were allocated for this purpose.",
      "This area is located approximately 250 km from Baku, near the Nabran settlement on the northern shores of the Caspian Sea, surrounded by green forests — a picturesque corner of nature.",
      "A dining hall, a dance floor, sports fields, a medical examination room, a bathhouse, and other household facilities have been put into use.",
      "Today, up to 500 employees and students of AzTU rest at the Nabran Recreation Center every year during the summer season.",
    ],
    statsTitle: "About the Center",
    stats: [
      { icon: "location", label: "Distance", value: "≈ 250 km", sub: "From Baku" },
      { icon: "area", label: "Area", value: "4 hectares", sub: "Forest surrounded" },
      { icon: "people", label: "Annual visitors", value: "500+", sub: "Staff & students" },
      { icon: "year", label: "Established", value: "1965", sub: "June 28" },
    ],
    facilitiesTitle: "Facilities",
    facilities: [
      { icon: "restaurant", label: "Dining Hall" },
      { icon: "sports", label: "Sports Fields" },
      { icon: "hospital", label: "Medical Examination Room" },
      { icon: "shower", label: "Bathhouse" },
      { icon: "beach", label: "Dance Floor" },
      { icon: "forest", label: "Green Forest Area" },
    ],
    galleryTitle: "Photo Gallery",
    homeLabel: "Home",
    managementLabel: "Management",
  },
};

const IMAGES = [
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-2_11zon.jpg",
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-1.jpg",
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-7.jpg",
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-8.jpg",
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-5.jpg",
  "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/10-2022/1-6.jpg",
];

const facilityIcons: Record<string, React.ReactNode> = {
  restaurant: <RestaurantIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  sports: <SportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  hospital: <LocalHospitalIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  shower: <ShowerIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  beach: <BeachAccessIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
  forest: <ForestIcon className="text-[#ee7c7e]" sx={{ fontSize: 28 }} />,
};

const statIcons: Record<string, React.ReactNode> = {
  location: <LocationOnIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  area: <ForestIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  people: <PeopleIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
  year: <BeachAccessIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />,
};

export default function NabranPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const managementHref = lang === "az" ? "/az/idareetme" : "/en/management";

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">

      {/* HERO */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#0d4a2f] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
          {/* Hero background image */}
          <div
            className="absolute top-0 right-0 w-full lg:w-[85%] h-full opacity-20 rounded-bl-[5rem] lg:rounded-bl-[20rem] overflow-hidden"
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
            <Link href={managementHref} className="hover:text-white transition-colors">
              {p.managementLabel}
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
            transition={{ duration: 0.7 }}
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
                    <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ABOUT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                  <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.statsTitle}</h2>
                </div>
                {p.paragraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                    {para}
                  </p>
                ))}
              </div>

              {/* Facilities */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-[#1a2355] dark:bg-white/40 rounded-full" />
                  <h3 className="text-xl font-black text-[#1a2355] dark:text-white">{p.facilitiesTitle}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {p.facilities.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10 flex flex-col items-center text-center gap-3 hover:border-[#ee7c7e]/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center">
                        {facilityIcons[f.icon]}
                      </div>
                      <span className="text-sm font-bold text-[#1a2355] dark:text-white leading-snug">{f.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* GALLERY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.galleryTitle}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`relative overflow-hidden rounded-[2rem] shadow-lg group ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${p.title} - ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
