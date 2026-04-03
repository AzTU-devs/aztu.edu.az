"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";

export default function KafedraMudiriPage() {
  const director = {
    fullName: "İmamverdiyev Yadigar Nəsib oğlu",
    title: "Kibertəhlükəsizlik kafedrasının müdiri",
    academicDegree: "Texnika elmləri doktoru, dosent",
    email: "yadigar.imamverdiyev@aztu.edu.az",
    phone: "+994 12 539 08 24",
    office: "V korpus, K406-cı otaq",
    hours: "Bazar ertəsi, Çərşənbə 14:00–17:00",
    bio: [
      "İmamverdiyev Yadigar Nəsib oğlu — texnika elmləri doktoru, dosent, informasiya təhlükəsizliyi və kriptoqrafiya sahəsi üzrə ixtisaslaşmış alimdir. O, informasiya təhlükəsizliyi və kibertəhlükəsizlik istiqamətində elmi və pedaqoji fəaliyyət göstərir.",
      "Onun elmi tədqiqatlarının əsas istiqamətlərinə informasiya təhlükəsizliyi, tətbiqi kriptoqrafiya və kriptoanaliz, süni intellekt metodları və biometrik texnologiyalar daxildir. Bu sahələr üzrə apardığı tədqiqatların nəticələri nüfuzlu elmi jurnallarda dərc olunmuş və informasiya təhlükəsizliyi sahəsinin inkişafına mühüm töhfə vermişdir.",
      "İmamverdiyev Y.N. pedaqoji fəaliyyətində müasir kibertəhlükəsizlik yanaşmalarını tətbiq edərək tələbələrin analitik və tənqidi düşünmə bacarıqlarının inkişafına, eləcə də gənc mütəxəssislərin hazırlanması və elmi-tədqiqat fəaliyyətinə cəlb olunmasına xüsusi önəm verir.",
      "O, 200-dən çox elmi məqalənin və 8 kitabın müəllifidir, həmçinin ölkədə ilk CERT komandasının yaradılmasında və biometrik identifikasiya sistemlərinin tətbiqi üzrə dövlət layihələrində aktiv iştirak etmişdir.",
    ],
    research: [
      "Süni intellekt metodları",
      "Tətbiqi kriptoqrafiya",
      "Kibertəhlükəsizlik sistemləri",
      "Informatisiya sistemlərinin idarə edilməsi",
      "Kritik infrastrukturun təhlükəsizliyi",
      "Blokçeyn texnologiyaları",
    ],
    education: [
      { years: "1982-1989", degree: "Bakalavr+magistr (Azərbaycan Dövlət Neft və Sənaye Universiteti)" },
      { years: "2003-2006", degree: "Elmlər namizədi (PhD) (AMEA İnformasiya Texnologiyaları İnstitutu)" },
      { years: "2008-2012", degree: "Elmlər doktoru (DSc) (AMEA İnformasiya Texnologiyaları İnstitutu)" },
    ],
    links: [
        { label: "Scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=35731194800" },
        { label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/1400086" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=nQHep3sAAAAJ&hl=en&oi=ao" },
    ]
  };

  return (
    <div className="space-y-6">
      <SectionBlock title="Kafedra müdiri" accent>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
             <PersonCard
                fullName={director.fullName}
                title={director.title}
                academicDegree={director.academicDegree}
                email={director.email}
                phone={director.phone}
                size="lg"
             />
             <div className="mt-4 bg-gray-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-600 space-y-3">
                <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Otaq</p>
                    <p className="text-sm font-semibold text-[#1a2355] dark:text-white">{director.office}</p>
                </div>
                <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Qəbul saatları</p>
                    <p className="text-sm font-semibold text-[#1a2355] dark:text-white">{director.hours}</p>
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                    {director.links.map(link => (
                        <a 
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-[#ee7c7e] hover:underline"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
             </div>
          </div>
          
          <div className="flex-1 space-y-6">
             <div>
                <h4 className="text-[#1a2355] dark:text-white font-bold mb-3 flex items-center gap-2">
                    Bioqrafiya
                </h4>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                   {director.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[#1a2355] dark:text-white font-bold mb-3 flex items-center gap-2">
                        <ScienceIcon sx={{ fontSize: 18, color: '#ee7c7e' }} />
                        Elmi tədqiqat sahələri
                    </h4>
                    <ul className="space-y-2">
                        {director.research.map((item, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] mt-1.5 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-[#1a2355] dark:text-white font-bold mb-3 flex items-center gap-2">
                        <SchoolIcon sx={{ fontSize: 18, color: '#ee7c7e' }} />
                        Təhsil
                    </h4>
                    <ul className="space-y-3">
                        {director.education.map((item, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                                <p className="font-bold text-[#1a2355] dark:text-white text-xs">{item.years}</p>
                                <p className="mt-0.5">{item.degree}</p>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}
