"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

const DEAN = {
  full_name: "Əliyev Kamran Rauf oğlu",
  academic_degree: "Texnika elmləri doktoru, professor",
  title: "Dekan",
  photo_url: "https://ui-avatars.com/api/?name=Kamran+Eliyev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
  email: "k.aliyev@aztu.edu.az",
  phone: "+994 12 539 08 24",
  office: "I korpus, 312-ci otaq",
  reception_hours: "Bazar ertəsi, Çərşənbə 14:00–17:00",
  bio: "Kamran Rauf oğlu Əliyev 1972-ci ildə Bakıda anadan olmuşdur. 1994-cü ildə AzTU-nun İnformasiya Texnologiyaları fakültəsini fərqlənmə diplomu ilə bitirmişdir. 1997-ci ildə elmlər namizədi, 2008-ci ildə isə elmlər doktoru elmi dərəcəsi almışdır. 2010-cu ildən professor vəzifəsindədir. 150-dən artıq elmi məqalənin, 4 monoqrafiyanın və 12 dərs vəsaitinin müəllifidir. Bir sıra beynəlxalq layihələrin rəhbəri olmuş, müxtəlif ölkələrin universitetlərində elmi ezamiyyətlərdə bulunmuşdur.",
  research_areas: [
    "Süni intellekt və maşın öyrənməsi",
    "Böyük verilənlər analizi",
    "Kibertəhlükəsizlik sistemləri",
    "İnformasiya sistemlərinin idarəedilməsi",
  ],
  education: [
    { year: "1994", degree: "Bakalavr", institution: "Azərbaycan Texniki Universiteti" },
    { year: "1997", degree: "Elmlər namizədi (PhD)", institution: "AzTU, Bakı" },
    { year: "2008", degree: "Elmlər doktoru (DSc)", institution: "AzTU, Bakı" },
  ],
};

const contactItems = [
  { icon: <EmailIcon sx={{ fontSize: 16 }} />, label: "E-poçt", value: DEAN.email, href: `mailto:${DEAN.email}` },
  { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: "Telefon", value: DEAN.phone, href: `tel:${DEAN.phone}` },
  { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: "Otaq", value: DEAN.office },
  { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, label: "Qəbul saatları", value: DEAN.reception_hours },
];

export default function DekanPage() {
  return (
    <div className="space-y-6">
      <SectionBlock title="Dekan" accent>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700">
              <img src={DEAN.photo_url} alt={DEAN.full_name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">{DEAN.full_name}</h2>
              <p className="text-[#ee7c7e] font-semibold text-sm mt-1">{DEAN.academic_degree}</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{DEAN.title}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                  <span className="text-[#1a2355] dark:text-blue-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-700 dark:text-gray-200 font-semibold hover:text-[#ee7c7e] transition-colors truncate block">{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock title="Biografiya" accent>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-7">{DEAN.bio}</p>
      </SectionBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionBlock title="Elmi tədqiqat sahələri" accent>
          <ul className="space-y-2">
            {DEAN.research_areas.map((area) => (
              <li key={area} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <SchoolIcon sx={{ fontSize: 16, color: "#ee7c7e" }} className="mt-0.5 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock title="Təhsil" accent>
          <ul className="space-y-3">
            {DEAN.education.map((edu) => (
              <li key={edu.year} className="flex items-start gap-3">
                <span className="text-xs font-bold text-[#1a2355] dark:text-blue-400 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-2 py-1 rounded-lg flex-shrink-0 mt-0.5 min-w-[42px] text-center">{edu.year}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug">{edu.degree}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{edu.institution}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionBlock>
      </div>
    </div>
  );
}
