"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

const HEAD = {
  full_name: "Quliyev Rauf Əli oğlu",
  academic_degree: "Texnika elmləri doktoru, professor",
  title: "Kafedra müdiri",
  photo_url: "https://ui-avatars.com/api/?name=Rauf+Quliyev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
  email: "r.quliyev@aztu.edu.az",
  phone: "+994 12 539 09 10",
  office: "II korpus, 215-ci otaq",
  reception_hours: "Çərşənbə, Cümə 10:00–13:00",
  bio: "Rauf Əli oğlu Quliyev 1968-ci ildə Bakıda anadan olmuşdur. 1991-ci ildə AzTU-nu fərqlənmə diplomu ilə bitirmişdir. 1995-ci ildə namizədlik, 2005-ci ildə doktorluq dissertasiyasını müdafiə etmişdir. 120-dən artıq elmi əsərin, 3 monoqrafiyanın müəllifidir. Beynəlxalq elmi konfranslarda fəal iştirak edir, IEEE üzvüdür.",
  research_areas: [
    "Verilənlər bazalarının idarəedilməsi",
    "Paylanmış sistemlər",
    "Bulud hesablamaları",
  ],
  education: [
    { year: "1991", degree: "Bakalavr", institution: "Azərbaycan Texniki Universiteti" },
    { year: "1995", degree: "Elmlər namizədi (PhD)", institution: "AzTU, Bakı" },
    { year: "2005", degree: "Elmlər doktoru (DSc)", institution: "AzTU, Bakı" },
  ],
};

const contactItems = [
  { icon: <EmailIcon sx={{ fontSize: 16 }} />, label: "E-poçt", value: HEAD.email, href: `mailto:${HEAD.email}` },
  { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: "Telefon", value: HEAD.phone, href: `tel:${HEAD.phone}` },
  { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: "Otaq", value: HEAD.office },
  { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, label: "Qəbul saatları", value: HEAD.reception_hours },
];

export default function KafedraMudiriPage() {
  return (
    <div className="space-y-6">
      <SectionBlock title="Kafedra müdiri" accent>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700">
              <img src={HEAD.photo_url} alt={HEAD.full_name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">{HEAD.full_name}</h2>
              <p className="text-[#ee7c7e] font-semibold text-sm mt-1">{HEAD.academic_degree}</p>
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{HEAD.title}</p>
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
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-7">{HEAD.bio}</p>
      </SectionBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionBlock title="Elmi tədqiqat sahələri" accent>
          <ul className="space-y-2">
            {HEAD.research_areas.map((area) => (
              <li key={area} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <SchoolIcon sx={{ fontSize: 16, color: "#ee7c7e" }} className="mt-0.5 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </SectionBlock>
        <SectionBlock title="Təhsil" accent>
          <ul className="space-y-3">
            {HEAD.education.map((edu) => (
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
