"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import OfficeShell from "@/components/office/OfficeShell";
import StaffCard from "@/components/faculty/StaffCard";
import { SectionCard, NumberedList } from "@/components/department/ui";
import { sortEducations } from "@/util/educationOrder";

import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface FunctionItem {
  title: string;
  desc: string;
}

interface EducationItem {
  period: string;
  degree: string;
}

interface StaffMember {
  name: string;
  degree: string;
  email: string;
  phone: string;
}

interface HeadContact {
  name: string;
  degree: string;
  email: string;
  phone: string;
  office: string;
  hours: string;
}

interface PageData {
  eyebrow: string;
  breadcrumbSection: string;
  title: string;
  subtitle: string;
  aboutTitle: string;
  aboutText: string[];
  objectivesTitle: string;
  objectives: string[];
  functionsTitle: string;
  functions: FunctionItem[];
  headTitle: string;
  headBioTitle: string;
  headBio: string;
  headEducationTitle: string;
  headEducation: EducationItem[];
  head: HeadContact;
  staffTitle: string;
  staff: StaffMember[];
  contactTitle: string;
  contact: {
    building: string;
    phone: string;
    email: string;
    hours: string;
  };
  esasname: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Karyera və Məşğulluq Mərkəzi",
    subtitle: "Tələbə və magistrantların karyera inkişafına dəstək, əmək bazarına inteqrasiya",
    aboutTitle: "Haqqında",
    aboutText: [
      "Azərbaycan Texniki Universiteti PHŞ Karyera və Məşğulluq Mərkəzi 7 aprel 2016-cı il tarixində yaradılmışdır. Mərkəz öz fəaliyyətində Azərbaycan Respublikası Elm və Təhsil Nazirliyinin müvafiq əmr və sərəncamlarını, Azərbaycan Texniki Universiteti PHŞ-nin Nizamnaməsini və Karyera və Məşğulluq Mərkəzinin Əsasnaməsini rəhbər tutur.",
      "Karyera və Məşğulluq Mərkəzi universitetin tələbə və magistrantlarının karyera inkişafının dəstəklənməsi, ixtisas üzrə istehsalat təcrübələrinin təşkili, praktiki bacarıqların və peşə səriştələrinin artırılması, məşğulluq imkanlarının genişləndirilməsi və əmək bazarına inteqrasiyasının asanlaşdırılması istiqamətində fəaliyyət göstərir.",
      "Mərkəzin əsas məqsədlərindən biri məzunlarla universitet arasında davamlı əməkdaşlığın təmin olunması və onların əmək bazarındakı mövqelərinin izlənməsidir. Bu istiqamətdə fəxri məzunlarla iş, tələbələrə fərdi karyera məsləhətləri verilməsi, universitet-sənaye əməkdaşlığının gücləndirilməsi və innovativ tərəfdaşlıqların təşviqi kimi fəaliyyətlər həyata keçirilir.",
      "Məzunlarla əlaqələrin sistemli şəkildə qurulması məqsədilə Elmi Şuranın 08 iyun 2025-ci il tarixli 10 saylı protokoluna əsasən Karyera və Məşğulluq Mərkəzinin nəzdində Məzunlar Assosiasiyası yaradılmışdır.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "Tələbə və magistrantların karyera inkişafını dəstəkləmək",
      "Praktiki bacarıq və peşə səriştələrinin artırılmasını təmin etmək",
      "İstehsalat təcrübələrinin təşkili",
      "Məşğulluq imkanlarını genişləndirmək",
      "Tələbələrin əmək bazarına inteqrasiyasını asanlaşdırmaq",
      "Məzunlarla universitet arasında davamlı əməkdaşlığı təmin etmək",
      "Məzunların əmək bazarındakı mövqelərini izləmək",
      "Tələbələrə fərdi karyera məsləhətləri vermək",
      "Universitet-sənaye əməkdaşlığını gücləndirmək",
      "İnnovativ tərəfdaşlıqları təşviq etmək",
      "Məzunlarla sistemli əlaqələri qurmaq və inkişaf etdirmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      { title: "Karyera planlaması və fərdi konsultasiya", desc: "Tələbə və məzunlara şəxsi və peşəkar inkişaf strategiyasının qurulmasında dəstək." },
      { title: "Karyera təlim proqramları və karyera sərgiləri", desc: "Tələbələrin ixtisas və maraqlarına uyğun praktik imkanların təmin edilməsi." },
      { title: "İş axtarışı və təcrübə proqramları", desc: "Tələbələrin ixtisas və maraqlarına uyğun təcrübə imkanlarının təmin olunması." },
      { title: "Rezüme və niyyət məktubu hazırlığı, müsahibəyə hazırlıq", desc: "Peşəkar sənədlərin hazırlanması və müsahibə bacarıqlarının təkmilləşdirilməsi." },
      { title: "Müəssisələrlə əlaqələrin qurulması və şəbəkələşmə tədbirləri", desc: "Tələbə və məzunların potensial işəgötürənlərlə əlaqəsinin gücləndirilməsi." },
      { title: "Məzunlarla əməkdaşlıq və ilhamlandırma", desc: "Məzun uğur hekayələri və mentorluq proqramları vasitəsilə tələbələrin motivasiyasının artırılması." },
      { title: "İstehsalat təcrübəsi", desc: "Tələbələrin real iş mühitində praktik bilik və bacarıqlarını inkişaf etdirməsi üçün müəssisələrlə əməkdaşlıq çərçivəsində təcrübə imkanlarının təşkil edilməsi." },
    ],
    headTitle: "Şöbə Müdiri",
    headBioTitle: "Bioqrafiya",
    headBio: "Ülviyyə Zakir qızı Rəsulovanın elmi tədqiqatlarının əsas istiqamətlərinə mexaniki sistemlərin idarə olunması alqoritmləri, sistemli analiz, dinamik sistemlərdə idarəetmə və informasiyanın işlənməsi daxildir. Bu sahələr üzrə apardığı tədqiqatların nəticələri elmi nəşrlərdə dərc olunmuş və müvafiq sahənin inkişafına töhfə vermişdir.\n\nÜ. Z. Rəsulova ali təhsilini Azərbaycan Memarlıq və İnşaat Universiteti-nin \"İnformasiya sistemləri\" ixtisası üzrə almış, 2010-cu ildə bakalavr, 2012-ci ildə isə magistr pilləsini fərqlənmə diplomu ilə bitirmişdir.\n\nO, 2012–2023-cü illərdə həmin universitetdə müxtəlif vəzifələrdə çalışmışdır. 2024-cü ildən etibarən Ülviyyə Rəsulova Azərbaycan Texniki Universiteti-nin Karyera və məşğulluq mərkəzinin müdiri vəzifəsində fəaliyyət göstərir.",
    headEducationTitle: "Təhsil",
    headEducation: [
      { period: "2006–2010", degree: "Bakalavr — Azərbaycan Memarlıq və İnşaat Universiteti" },
      { period: "2010–2012", degree: "Magistr (fərqlənmə ilə) — Azərbaycan Memarlıq və İnşaat Universiteti" },
      { period: "2014–2025", degree: "Doktorantura — Azərbaycan Memarlıq və İnşaat Universiteti" },
    ],
    head: {
      name: "Rəsulova Ülviyyə Zakir qızı",
      degree: "",
      email: "ulviyye.resulova@aztu.edu.az",
      phone: "+994 50 261 38 16",
      office: "I korpus, 309-cu otaq",
      hours: "Həftənin tək günləri 14:00–17:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      { name: "Şahmarova Günel Şahvələd", degree: "", email: "gunel.shahmarova@aztu.edu.az", phone: "+994 51 682 84 08" },
      { name: "Əliyev Malik Etibar", degree: "", email: "malik.eliyev@aztu.edu.az", phone: "+994 55 560 12 08" },
      { name: "Abdullayeva Tuti Tehran", degree: "", email: "tuti.abdullayeva@aztu.edu.az", phone: "+994 55 251 01 15" },
      { name: "Sadıxzadə Bayaz Səbuhi", degree: "", email: "bayaz.sadikhzade@aztu.edu.az", phone: "+994 50 670 55 99" },
      { name: "Hüseynzadə Qərib Zahid", degree: "", email: "garib.huseynzadeh@aztu.edu.az", phone: "+994 50 988 91 68" },
      { name: "Yusubova Aynur Eldar", degree: "", email: "aynur.yusubova@aztu.edu.az", phone: "+994 55 607 66 27" },
    ],
    contactTitle: "Əlaqə",
    contact: {
      building: "I korpus, 310-cu otaq",
      phone: "1130",
      email: "karyera.merkezi@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Əsasnamə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Career and Employment Center",
    subtitle: "Supporting career development of students and graduates, facilitating labor market integration",
    aboutTitle: "About",
    aboutText: [
      "The Career and Employment Center of Azerbaijan Technical University (PHSC) was established on April 7, 2016. The Center operates in accordance with the relevant orders and directives of the Ministry of Science and Education of the Republic of Azerbaijan, the Charter of Azerbaijan Technical University (PHSC), and the Regulations governing the Career and Employment Center.",
      "The Center carries out its activities with the aim of supporting the career development of undergraduate and graduate students, organizing field-specific industrial internships, enhancing practical skills and professional competencies, expanding employment opportunities, and facilitating their effective integration into the labor market.",
      "One of the principal objectives of the Center is to ensure sustainable cooperation between the University and its graduates, as well as to monitor their positions and outcomes in the labor market. In this context, the Center implements activities such as engagement with distinguished alumni, provision of individual career advisory services, strengthening university–industry collaboration, and promotion of innovative partnerships.",
      "An Alumni Association was established under the Career and Employment Center in accordance with Protocol No. 10 of the Scientific Council, dated June 8, 2025, to establish systematic alumni relations and ensure structured cooperation.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Supporting the career development of undergraduate and graduate students",
      "Enhancing practical skills and professional competencies",
      "Organizing industrial internships in relevant fields of study",
      "Expanding employment opportunities",
      "Facilitating students' integration into the labor market",
      "Ensuring sustainable cooperation between the University and its graduates",
      "Monitoring graduates' positions and outcomes in the labor market",
      "Providing individual career advisory services to students",
      "Strengthening university–industry collaboration",
      "Promoting innovative partnerships",
      "Establishing and developing systematic alumni relations",
    ],
    functionsTitle: "Core Functions",
    functions: [
      { title: "Career planning and individual consultation", desc: "Providing support to students and graduates in developing personal and professional growth strategies." },
      { title: "Career training programs and career fairs", desc: "Ensuring access to practical opportunities aligned with students' academic specializations and interests." },
      { title: "Job search and internship programs", desc: "Facilitating access to internship opportunities in accordance with students' fields of study and career interests." },
      { title: "CV and cover letter preparation; interview preparation", desc: "Supporting the development of professional application documents and enhancing interview skills." },
      { title: "Establishment of institutional partnerships and networking events", desc: "Strengthening connections between students, graduates, and potential employers." },
      { title: "Alumni engagement and motivation", desc: "Increasing student motivation through alumni success stories and mentorship programs." },
      { title: "Industrial internships", desc: "Organizing internship opportunities in collaboration with partner organizations to enable students to develop practical knowledge and skills in real working environments." },
    ],
    headTitle: "Head of Department",
    headBioTitle: "Biography",
    headBio: "Ulviyya Zakir gizi Rasulova's main research areas include control algorithms of mechanical systems, systems analysis, control in dynamic systems, and information processing. The results of her research in these fields have been published in scientific journals and have contributed to the advancement of the respective discipline.\n\nU. Z. Rasulova completed her higher education at the Azerbaijan University of Architecture and Construction in the field of Information Systems, graduating with a bachelor's degree in 2010 and a master's degree in 2012, both with honors.\n\nShe worked in various positions at the same university from 2012 to 2023. Since 2024, Ulviyya Rasulova has been serving as the Head of the Career and Employment Center at Azerbaijan Technical University.",
    headEducationTitle: "Education",
    headEducation: [
      { period: "2006–2010", degree: "Bachelor's Degree — Azerbaijan University of Architecture and Construction" },
      { period: "2010–2012", degree: "Master's Degree (with honors) — Azerbaijan University of Architecture and Construction" },
      { period: "2014–2025", degree: "Doctoral Studies — Azerbaijan University of Architecture and Construction" },
    ],
    head: {
      name: "Ulviyya Rasulova Zakir gizi",
      degree: "",
      email: "ulviyye.resulova@aztu.edu.az",
      phone: "+994 50 261 38 16",
      office: "Building I, Room 309",
      hours: "Odd days of the week, 14:00–17:00",
    },
    staffTitle: "Staff",
    staff: [
      { name: "Gunel Shahmarova Shahvalad", degree: "", email: "gunel.shahmarova@aztu.edu.az", phone: "+994 51 682 84 08" },
      { name: "Malik Aliyev Etibar", degree: "", email: "malik.eliyev@aztu.edu.az", phone: "+994 55 560 12 08" },
      { name: "Tuti Abdullayeva Tehran", degree: "", email: "tuti.abdullayeva@aztu.edu.az", phone: "+994 55 251 01 15" },
      { name: "Bayaz Sadikhzade Sabuhi", degree: "", email: "bayaz.sadikhzade@aztu.edu.az", phone: "+994 50 670 55 99" },
      { name: "Garib Huseynzade Zahid", degree: "", email: "garib.huseynzadeh@aztu.edu.az", phone: "+994 50 988 91 68" },
      { name: "Aynur Yusubova Eldar", degree: "", email: "aynur.yusubova@aztu.edu.az", phone: "+994 55 607 66 27" },
    ],
    contactTitle: "Contact",
    contact: {
      building: "Building I, Room 310",
      phone: "1130",
      email: "karyera.merkezi@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Statute",
  },
};

// ─── Local UI ─────────────────────────────────────────────────────────────────

type FactRow = {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
};

/** Labelled contact tiles — same shell as the reference office page. */
function FactTiles({ rows, className = "" }: { rows: FactRow[]; className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className}`}>
      {rows.map((row) => {
        const Icon = row.icon;
        const body = (
          <>
            <span className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              <Icon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
              {row.label}
            </span>
            <span className="block text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
              {row.value}
            </span>
          </>
        );
        const shell =
          "block rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 transition-colors dark:border-white/10 dark:bg-white/5";
        return row.href ? (
          <a key={row.label} href={row.href} className={`${shell} hover:border-[#ee7c7e]/50`}>
            {body}
          </a>
        ) : (
          <div key={row.label} className={shell}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KaryeraMerkeziPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const sections = [
    {
      id: "about",
      label: p.aboutTitle,
      description: lang === "az" ? "Ümumi məlumat" : "Overview",
      icon: InfoOutlinedIcon,
    },
    {
      id: "objectives",
      label: p.objectivesTitle,
      description: lang === "az" ? "Nəyə çalışırıq" : "What we aim for",
      icon: FlagOutlinedIcon,
    },
    {
      id: "functions",
      label: p.functionsTitle,
      description: lang === "az" ? "Nə edirik" : "What we do",
      icon: SettingsOutlinedIcon,
    },
    {
      id: "head",
      label: p.headTitle,
      description: p.head.name,
      icon: PersonOutlineIcon,
    },
    {
      id: "education",
      label: p.headEducationTitle,
      description: lang === "az" ? "Akademik yol" : "Academic journey",
      icon: SchoolOutlinedIcon,
    },
    {
      id: "staff",
      label: p.staffTitle,
      description: lang === "az" ? "Heyət və əlaqə" : "Team & contact",
      icon: GroupsIcon,
    },
    {
      id: "contact",
      label: p.contactTitle,
      description: lang === "az" ? "Ünvan və əlaqə" : "Address & contact",
      icon: CallOutlinedIcon,
    },
  ];

  const counter = (n: number) => (
    <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
      {String(n).padStart(2, "0")}
    </span>
  );

  return (
    <OfficeShell
      eyebrow={p.eyebrow}
      title={p.title}
      subtitle={p.subtitle}
      sections={sections}
      stat={{ value: String(p.staff.length), label: lang === "az" ? "əməkdaş" : "staff" }}
    >
      <section id="about" className="scroll-mt-28">
        <SectionCard
          icon={InfoOutlinedIcon}
          eyebrow={lang === "az" ? "Ümumi məlumat" : "Overview"}
          title={p.aboutTitle}
          action={
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-[11px] font-bold text-[#1a2355] transition-colors hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
            >
              <ArticleIcon sx={{ fontSize: 15 }} />
              {p.esasname}
            </Link>
          }
        >
          <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.aboutText.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </SectionCard>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section id="objectives" className="scroll-mt-28">
          <SectionCard
            icon={FlagOutlinedIcon}
            eyebrow={lang === "az" ? "Nəyə çalışırıq" : "What we aim for"}
            title={p.objectivesTitle}
            action={counter(p.objectives.length)}
          >
            <NumberedList items={p.objectives.map((o) => o)} />
          </SectionCard>
        </section>

        <section id="functions" className="scroll-mt-28">
          <SectionCard
            icon={SettingsOutlinedIcon}
            eyebrow={lang === "az" ? "Nə edirik" : "What we do"}
            title={p.functionsTitle}
            action={counter(p.functions.length)}
            delay={0.06}
          >
            <NumberedList
              items={p.functions.map((fn) => (
                <div key={fn.title}>
                  <p className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                    {fn.title}
                  </p>
                  <p className="mt-1 text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    {fn.desc}
                  </p>
                </div>
              ))}
            />
          </SectionCard>
        </section>
      </div>

      <section id="head" className="scroll-mt-28">
        <SectionCard
          icon={PersonOutlineIcon}
          eyebrow={p.headTitle}
          title={p.head.name}
        >
          {p.head.degree && (
            <p className="mb-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {p.head.degree}
            </p>
          )}

          <FactTiles
            className="lg:grid-cols-4"
            rows={[
              {
                icon: EmailIcon,
                label: lang === "az" ? "E-poçt" : "Email",
                value: p.head.email,
                href: `mailto:${p.head.email}`,
              },
              {
                icon: PhoneIcon,
                label: lang === "az" ? "Telefon" : "Phone",
                value: p.head.phone,
                href: `tel:${p.head.phone.replace(/\s+/g, "")}`,
              },
              {
                icon: BusinessIcon,
                label: lang === "az" ? "Otaq" : "Room",
                value: p.head.office,
              },
              {
                icon: AccessTimeIcon,
                label: lang === "az" ? "Qəbul saatları" : "Office hours",
                value: p.head.hours,
              },
            ]}
          />

          <h3 className="mb-4 mt-8 text-[10px] font-black uppercase tracking-[0.28em] text-[#ee7c7e]">
            {p.headBioTitle}
          </h3>
          <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.headBio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="education" className="scroll-mt-28">
        <SectionCard
          icon={SchoolOutlinedIcon}
          eyebrow={lang === "az" ? "Akademik yol" : "Academic journey"}
          title={p.headEducationTitle}
          action={counter(p.headEducation.length)}
        >
          <ol className="relative">
            <span className="absolute bottom-3 left-[7px] top-3 w-px bg-slate-200 dark:bg-white/10" />
            {sortEducations(p.headEducation).map((edu, index) => (
              <motion.li
                key={`${edu.period}-${index}`}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
                className="relative flex gap-5 pb-7 last:pb-0"
              >
                <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-white bg-[#1a2355] ring-1 ring-slate-200 dark:border-slate-900 dark:ring-white/15" />
                <div className="min-w-0 flex-1">
                  <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-[#ee7c7e]">
                    {edu.period}
                  </span>
                  <h4 className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                    {edu.degree}
                  </h4>
                </div>
              </motion.li>
            ))}
          </ol>
        </SectionCard>
      </section>

      <section id="staff" className="scroll-mt-28">
        <SectionCard
          icon={GroupsIcon}
          eyebrow={lang === "az" ? "İnzibati heyət" : "Administrative team"}
          title={p.staffTitle}
          action={counter(p.staff.length)}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {p.staff.map((member, i) => (
              <StaffCard
                key={member.email || member.name}
                fullName={member.name}
                degree={member.degree}
                email={member.email}
                phone={member.phone}
                index={i}
              />
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="contact" className="scroll-mt-28">
        <SectionCard
          icon={CallOutlinedIcon}
          eyebrow={lang === "az" ? "Bizə yazın" : "Get in touch"}
          title={p.contactTitle}
        >
          <FactTiles
            className="lg:grid-cols-4"
            rows={[
              {
                icon: BusinessIcon,
                label: lang === "az" ? "Ünvan" : "Address",
                value: p.contact.building,
              },
              {
                icon: PhoneIcon,
                label: lang === "az" ? "Telefon" : "Phone",
                value: p.contact.phone,
                href: `tel:${p.contact.phone.replace(/\s+/g, "")}`,
              },
              {
                icon: EmailIcon,
                label: lang === "az" ? "E-poçt" : "Email",
                value: p.contact.email,
                href: `mailto:${p.contact.email}`,
              },
              {
                icon: AccessTimeIcon,
                label: lang === "az" ? "İş saatları" : "Working hours",
                value: p.contact.hours,
              },
            ]}
          />
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
