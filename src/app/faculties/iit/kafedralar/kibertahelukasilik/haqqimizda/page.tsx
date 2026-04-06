"use client";

import { use } from "react";
import Link from "next/link";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";

const statsData = [
    { label: "Bakalavr proqramları", value: "1" },
    { label: "Magistratura proqramları", value: "5" },
    { label: "Doktorantura proqramları", value: "2+" },
    { label: "Beynəlxalq əməkdaşlıq", value: "7+" },
    { label: "Laboratoriyalar", value: "3" },
    { label: "Layihə və patent", value: "1+" },
    { label: "Sənaye əməkdaşlığı", value: "5+" },
    { label: "SDG", value: "SDG 4, 9, 16" },
];

export default function CafedraHaqqimizdaPage() {
  const facultyId = "iit";
  const cafedraId = "kibertahelukasilik";

  const subPages = [
    {
      label: "Kafedra müdiri",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/kafedra-mudiri`,
      icon: <PersonIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedra müdiri haqqında ətraflı məlumat",
    },
    {
      label: "Əməkdaşlar",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar`,
      icon: <GroupIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedranın bütün əməkdaşları",
    },
    {
      label: "Xəbərlər",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/xeberler`,
      icon: <ArticleIcon sx={{ color: "#1a2355" }} />,
      desc: "Kafedranın son xəbərləri və elanları",
    },
    {
      label: "Əlaqə",
      href: `/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/elaqe`,
      icon: <PhoneIcon sx={{ color: "#1a2355" }} />,
      desc: "Əlaqə məlumatları",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <SectionBlock title="Kafedra haqqında ümumi məlumat" accent>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <p>
            Kibertəhlükəsizlik kafedrası Azərbaycan Texniki Universiteti (AzTU) Elmi Şurasının 12 iyul 2022-ci il tarixli qərarı ilə yaradılmışdır. Kafedra regionda kibertəhlükəsizlik və informasiya təhlükəsizliyi sahəsində təhsil və elmi-tədqiqat üzrə qabaqcıl mərkəzə çevrilməyi qarşısına məqsəd qoymuşdur.
          </p>
          <p>
            Kafedranın missiyası innovativ və kreativ düşüncəyə malik, analitik bacarıqları inkişaf etmiş, müasir texnologiyalar əsasında effektiv həllər təqdim edə bilən yüksək ixtisaslı mütəxəssislər hazırlamaqdır. Bu mütəxəssislər informasiya təhlükəsizliyi sahəsində yeni yanaşmaların formalaşdırılması və cəmiyyətin rəqəmsal təhlükəsizliyinin təmin edirlər.
          </p>
          <p>
            Kafedra təhsil, elmi-tədqiqat və sənaye əməkdaşlığının vəhdət təşkil etdiyi müasir və inklüziv akademik mühitin formalaşdırılmasına çalışır. Böyük verilənlərin analizi, süni intellekt tətbiqləri, kibertəhlükəsizlik, IoT və smart sistemlərin təhlükəsizliyi, eləcə də texnoloji sahibkarlıq istiqamətində həyata keçirilən təşəbbüslər vasitəsilə nəzəri biliklərin praktik tətbiqlərə çevrilməsi təmin olunur.
          </p>
        </div>
      </SectionBlock>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center justify-center"
              >
                  <span className="text-2xl font-black text-[#1a2355] dark:text-blue-400 mb-1">{stat.value}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-tight">{stat.label}</span>
              </motion.div>
          ))}
      </div>

      {/* Fəaliyyət istiqaməti */}
      <SectionBlock title="Kafedranın fəaliyyət istiqaməti" accent>
        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <p>
            Kibertəhlükəsizlik kafedrası informasiya sistemlərinin, şəbəkələrin və rəqəmsal infrastrukturların təhlükəsizliyi sahəsində tədris, elmi-tədqiqat və innovasiya fəaliyyətini həyata keçirir. Kafedranın fəaliyyəti müasir texnologiyalara əsaslanan bilik və bacarıqların formalaşdırılmasına, eləcə də dövlət və sənayenin ehtiyaclarına uyğun həllərin inkişafına yönəlmişdir.
          </p>
          <p>Kafedranın əsas fəaliyyət istiqamətləri aşağıdakılardır:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>İnformasiya təhlükəsizliyi üzrə müasir və beynəlxalq standartlara uyğun tədris proqramlarının hazırlanması və tətbiqi</li>
            <li>Sənaye və dövlət qurumları ilə əməkdaşlıq çərçivəsində praktiki bacarıqlara malik mütəxəssislərin hazırlanması</li>
            <li>Kritik informasiya infrastrukturunun qorunması üçün metod və texnologiyaların inkişaf etdirilməsi</li>
            <li>Müxtəlif sektorlar üzrə informasiya təhlükəsizliyinin təmin edilməsi istiqamətində elmi tədqiqatların aparılması və innovativ həllərin işlənməsi</li>
          </ul>
        </div>
      </SectionBlock>

      {/* Sub-pages Grid */}
      <SectionBlock title="Bu bölmənin alt səhifələri" accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-start gap-4 bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600 rounded-2xl p-5 hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/40 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0">
                {page.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1a2355] dark:text-white text-sm mb-1">
                  {page.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {page.desc}
                </p>
              </div>
              <ChevronRightIcon
                sx={{ fontSize: 18, color: "#1a2355" }}
                className="opacity-30 group-hover:opacity-70 transition-opacity mt-1"
              />
            </Link>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
