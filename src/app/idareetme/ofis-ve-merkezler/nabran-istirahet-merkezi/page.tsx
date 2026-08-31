"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import OfficeShell from "@/components/office/OfficeShell";
import { SectionCard } from "@/components/department/ui";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ForestIcon from "@mui/icons-material/Forest";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsIcon from "@mui/icons-material/Sports";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ShowerIcon from "@mui/icons-material/Shower";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";

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
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-2_11zon.jpg",
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-1.jpg",
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-7.jpg",
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-8.jpg",
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-5.jpg",
  "https://api.aztu.edu.az/media/prod/nabran-recreation/1-6.jpg",
];

const facilityIcons: Record<string, React.ReactNode> = {
  restaurant: <RestaurantIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
  sports: <SportsIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
  hospital: <LocalHospitalIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
  shower: <ShowerIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
  beach: <BeachAccessIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
  forest: <ForestIcon className="text-[#ee7c7e]" sx={{ fontSize: 24 }} />,
};

const statIcons: Record<string, React.ReactNode> = {
  location: <LocationOnIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />,
  area: <ForestIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />,
  people: <PeopleIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />,
  year: <BeachAccessIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />,
};

export default function NabranPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const sections = [
    {
      id: "about",
      label: p.statsTitle,
      description: lang === "az" ? "Ümumi məlumat" : "Overview",
      icon: InfoOutlinedIcon,
    },
    {
      id: "facilities",
      label: p.facilitiesTitle,
      description: lang === "az" ? "Ərazidəki imkanlar" : "On-site facilities",
      icon: HomeWorkOutlinedIcon,
    },
    {
      id: "gallery",
      label: p.galleryTitle,
      description: lang === "az" ? "Mərkəzdən görüntülər" : "Views of the centre",
      icon: PhotoLibraryOutlinedIcon,
    },
  ];

  const counter = (n: number) => (
    <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
      {String(n).padStart(2, "0")}
    </span>
  );

  const heroStat = p.stats.find((s) => s.icon === "people") ?? p.stats[0];

  return (
    <OfficeShell
      eyebrow={p.eyebrow}
      title={p.title}
      subtitle={p.subtitle}
      sections={sections}
      stat={{ value: heroStat.value, label: heroStat.label }}
    >
      <section id="about" className="scroll-mt-28">
        <SectionCard
          icon={InfoOutlinedIcon}
          eyebrow={lang === "az" ? "Ümumi məlumat" : "Overview"}
          title={p.statsTitle}
        >
          <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {p.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-5 text-center dark:border-white/10 dark:bg-white/5"
              >
                <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ee7c7e]/10">
                  {statIcons[stat.icon]}
                </span>
                <p className="text-2xl font-black tabular-nums tracking-tight text-[#1a2355] dark:text-white">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ee7c7e]">
                  {stat.label}
                </p>
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="facilities" className="scroll-mt-28">
        <SectionCard
          icon={HomeWorkOutlinedIcon}
          eyebrow={lang === "az" ? "Ərazidə" : "On site"}
          title={p.facilitiesTitle}
          action={counter(p.facilities.length)}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {p.facilities.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-5 text-center transition-colors hover:border-[#ee7c7e]/50 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ee7c7e]/10">
                  {facilityIcons[f.icon]}
                </span>
                <span className="text-[13px] font-black leading-snug text-[#1a2355] dark:text-white">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="gallery" className="scroll-mt-28">
        <SectionCard
          icon={PhotoLibraryOutlinedIcon}
          eyebrow={lang === "az" ? "Mərkəzdən görüntülər" : "Views of the centre"}
          title={p.galleryTitle}
          action={counter(IMAGES.length)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {IMAGES.map((src, i) => (
              <div
                key={src}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/10 ${
                  i === 0 ? "aspect-[16/9] sm:col-span-2 lg:col-span-2" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`${p.title} - ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
