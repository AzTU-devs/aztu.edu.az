"use client";

import { use } from "react";
import { getCafedraHead, StaticCafedraHead } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const DEFAULT_HEAD: StaticCafedraHead = {
  cafedra_id: 0,
  full_name: "Quliyev Rauf Əli oğlu",
  academic_degree: "Texnika elmləri doktoru, professor",
  title: "Kafedra müdiri",
  photo_url:
    "https://ui-avatars.com/api/?name=Rauf+Quliyev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
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

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function KafedraMudiriPage({ params }: Props) {
  const { cafedraId } = use(params);
  const head = getCafedraHead(Number(cafedraId)) ?? DEFAULT_HEAD;

  const contactItems = [
    { icon: <EmailIcon sx={{ fontSize: 16 }} />, label: "E-poçt", value: head.email, href: head.email ? `mailto:${head.email}` : undefined },
    { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: "Telefon", value: head.phone, href: head.phone ? `tel:${head.phone}` : undefined },
    { icon: <LocationOnIcon sx={{ fontSize: 16 }} />, label: "Otaq", value: head.office },
    { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, label: "Qəbul saatları", value: head.reception_hours },
  ].filter((item) => item.value);

  const profileLinks = [
    head.scopus_url && { label: "Scopus", url: head.scopus_url, color: "#e07b00" },
    head.wos_url && { label: "Web of Science", url: head.wos_url, color: "#004b87" },
    head.scholar_url && { label: "Google Scholar", url: head.scholar_url, color: "#4285f4" },
  ].filter(Boolean) as { label: string; url: string; color: string }[];

  return (
    <div className="space-y-6">
      <SectionBlock title="Kafedra müdiri" accent>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700">
              {head.photo_url ? (
                <img src={head.photo_url} alt={head.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#1a2355]/10 flex items-center justify-center">
                  <span className="text-[#1a2355] text-4xl font-bold">{head.full_name[0]}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white leading-tight">{head.full_name}</h2>
              {head.academic_degree && (
                <p className="text-[#ee7c7e] font-semibold text-sm mt-1">{head.academic_degree}</p>
              )}
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">{head.title}</p>
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
            {profileLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {profileLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                    style={{ borderColor: link.color, color: link.color }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 12 }} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </SectionBlock>

      {head.bio && (
        <SectionBlock title="Biografiya" accent>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-7">{head.bio}</p>
        </SectionBlock>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {head.research_areas && head.research_areas.length > 0 && (
          <SectionBlock title="Elmi tədqiqat sahələri" accent>
            <ul className="space-y-2">
              {head.research_areas.map((area) => (
                <li key={area} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <SchoolIcon sx={{ fontSize: 16, color: "#ee7c7e" }} className="mt-0.5 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}
        {head.education && head.education.length > 0 && (
          <SectionBlock title="Təhsil" accent>
            <ul className="space-y-3">
              {head.education.map((edu) => (
                <li key={edu.year} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#1a2355] dark:text-blue-400 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-2 py-1 rounded-lg flex-shrink-0 mt-0.5 min-w-[52px] text-center">{edu.year}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug">{edu.degree}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{edu.institution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
