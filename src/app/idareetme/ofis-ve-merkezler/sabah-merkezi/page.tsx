"use client";

import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import OfficeShell from "@/components/office/OfficeShell";
import StaffCard from "@/components/faculty/StaffCard";
import { SectionCard, NumberedList } from "@/components/department/ui";
import { sortEducations } from "@/util/educationOrder";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
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
  position?: string;
}

interface HeadContact {
  name: string;
  degree: string;
  position: string;
  email: string;
  phone: string;
  office: string;
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
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "SABAH proqramları qrupu",
    subtitle:
      "SABAH qrupları — müasir tələblərə cavab verən, yüksək ixtisaslı gənc kadrların hazırlanmasına yönəlmiş qabaqcıl təhsil modeli",
    aboutTitle: "Haqqında",
    aboutText: [
      "SABAH proqramı ali təhsildə tədrisin keyfiyyətinin yüksəldilməsi, ali təhsil sistemində yeni və fərqli mühitin formalaşdırılması, savadlı və bacarıqlı tələbələrin yetişdirilməsi, həmçinin əmək bazarının tələblərinə uyğun kadr hazırlığının təmin olunması məqsədilə yaradılmış mühüm təşəbbüsdür.",
      "Bu proqram çərçivəsində tələbələr yalnız nəzəri biliklərlə kifayətlənmir, eyni zamanda praktik bacarıqlara da yiyələnirlər. Tədris prosesi müasir və innovativ metodlar əsasında qurulur, interaktiv dərslər, layihə əsaslı öyrənmə və real iş mühitinə uyğun təcrübələr tətbiq edilir. Bu yanaşma tələbələrin analitik düşünmə, problem həll etmə və komandada işləmək bacarıqlarının inkişafına xidmət edir.",
      "SABAH qruplarında yerli və beynəlxalq təcrübəyə malik müəllimlər dərs deyir, tələbələr üçün seminarlar, təlimlər və ustad dərsləri təşkil olunur. Bu da onların dünya səviyyəli bilik və bacarıqlara yiyələnməsinə imkan yaradır.",
      "Proqram tələbələrin fərdi inkişafına da xüsusi önəm verir. Liderlik keyfiyyətlərinin formalaşdırılması, təşəbbüskarlığın artırılması və innovativ düşüncənin inkişaf etdirilməsi istiqamətində müxtəlif fəaliyyətlər həyata keçirilir.",
      "Bununla yanaşı, SABAH proqramı əmək bazarı ilə sıx əlaqələr qurur. Müxtəlif müəssisə və təşkilatlarla əməkdaşlıq nəticəsində tələbələr üçün təcrübə və karyera imkanları yaradılır ki, bu da onların gələcəkdə daha hazırlıqlı və rəqabətqabiliyyətli mütəxəssis kimi formalaşmasına şərait yaradır.",
      "Ümumilikdə, SABAH qrupları müasir tələblərə cavab verən, yüksək ixtisaslı və hərtərəfli inkişaf etmiş gənc kadrların hazırlanmasına yönəlmiş qabaqcıl təhsil modelidir.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "SABAH qruplarının tələbələri üçün əlavə təqaüd imkanları təmin olunması",
      "Xarici mübadilə proqramlarında iştirak imkanı yaradılması",
      "Müasir müəssisə və şirkətlərdə ixtisas üzrə təcrübə keçmək imkanı yaratmaq",
      "Tədrisin mütərəqqi forma və metodlar əsasında təşkil olunması",
      "Tələbələrin ixtisas üzrə kompetensiyalara tam yiyələnməsi təmin edilməsi",
      "Xarici dillərin dərinləşdirilmiş şəkildə tədris olunması",
      "Tələbələr üçün müxtəlif tədrisdənkənar fəaliyyətlər təşkil edilməsi",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      {
        title: "Fərdi inkişaf və karyera planlaşdırılması üzrə mentorluq",
        desc: "Tələbələrin peşəkar istiqamətlərini düzgün müəyyən etmələrinə kömək edir.",
      },
      {
        title: "Startap və innovasiya layihələrində iştirak",
        desc: "Tələbələrin yaradıcı və təşəbbüskar potensialının inkişafına şərait yaradır.",
      },
      {
        title: "Beynəlxalq sertifikat proqramları",
        desc: "Tələbələrin qlobal səviyyədə tanınan bilik və bacarıqlara yiyələnməsini dəstəkləyir.",
      },
      {
        title: "Rəqəmsal və texnoloji bacarıqlar",
        desc: "Müasir texnologiyalardan istifadə vərdişlərini formalaşdırır.",
      },
      {
        title: "Akademik mübadilə və ikili diplom proqramları",
        desc: "Tələbələrin beynəlxalq təhsil təcrübəsi qazanmasına şərait yaradır.",
      },
      {
        title: "Elmi-tədqiqat fəaliyyəti",
        desc: "Tələbələrin analitik düşünmə qabiliyyətlərinin inkişafını dəstəkləyir.",
      },
      {
        title: "Peşəkar şəbəkələşmə imkanları",
        desc: "Tələbələrin mütəxəssislərlə əlaqələrinin qurulmasına və genişləndirilməsinə kömək edir.",
      },
      {
        title: "Real layihələr üzərində iş",
        desc: "Praktiki biliklərin tətbiqini gücləndirir.",
      },
    ],
    headTitle: "Şöbə Müdiri",
    headBioTitle: "Bioqrafiya",
    headBio:
      "Aslanova Ayçillər Telman qızı ali təhsil sahəsində akademik idarəetmə, tədris proseslərinin təşkili və rəqəmsal sistemlərin idarə edilməsi üzrə təcrübəyə malikdir. Hazırda Azərbaycan Texniki Universitetində SABAH proqramlarının koordinatoru vəzifəsində çalışır.\n\nHal-hazırda həmin universitetin Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrasında assistent kimi pedaqoji fəaliyyət göstərir. O, poliqrafiya və avtomatlaşdırılmış komplekslər ixtisası üzrə ixtisaslaşmış və bu sahədə peşəkar təhsil almışdır.\n\nKaryerası ərzində ali təhsil müəssisələrində tələbə məlumatlarının idarə olunması, tədris proseslərinin planlaşdırılması, akademik sistemlərin koordinasiyası və inzibati proseslərin təşkili sahələrində geniş təcrübə qazanmışdır.\n\nEyni zamanda elmi fəaliyyətlə məşğul olur və 6 elmi məqalənin müəllifidir. Onun fəaliyyəti tədris keyfiyyətinin yüksəldilməsinə və təhsil proseslərinin daha effektiv şəkildə idarə olunmasına yönəlmişdir.",
    headEducationTitle: "Təhsil",
    headEducation: [
      { period: "2014–2018", degree: "Bakalavr — Azərbaycan Texniki Universiteti" },
      { period: "2018–2020", degree: "Magistr — Azərbaycan Texniki Universiteti" },
    ],
    head: {
      name: "Aslanova Ayçillər Telman qızı",
      degree: "",
      position: "SABAH proqramları koordinatoru",
      email: "ayciller.aslanova@aztu.edu.az",
      phone: "1502 (İP-Tel.)",
      office: "I korpus, Otaq 306-3",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Dostuyeva Rüfanə Araz qızı",
        degree: "",
        email: "rufane.dostuyeva@aztu.edu.az",
        phone: "(050) 762-97-12",
        position: "Tutor",
      },
    ],
    contactTitle: "Əlaqə",
    contact: {
      building: "I korpus, Otaq 306-3",
      phone: "1502",
      email: "ayciller.aslanova@aztu.edu.az",
    },
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "SABAH Program Groups",
    subtitle:
      "SABAH groups — an advanced educational model aimed at training highly qualified and comprehensively developed young professionals who meet modern requirements",
    aboutTitle: "About",
    aboutText: [
      "The SABAH Program is an important initiative established with the aim of improving the quality of higher education, creating a new and distinctive environment within the higher education system, fostering well-educated and skilled students, and ensuring the preparation of personnel in line with the demands of the labor market.",
      "Within the framework of this program, students do not only acquire theoretical knowledge but also gain practical skills. The teaching process is built on modern and innovative methods, including interactive lessons, project-based learning, and practical training in real working environments. This approach contributes to the development of students' analytical thinking, problem-solving, and teamwork skills.",
      "In SABAH groups, instructors with both local and international experience deliver classes, and students are provided with seminars, trainings, and master classes. This enables them to acquire world-class knowledge and competencies.",
      "The program also places special emphasis on students' personal development. Various activities are implemented to develop leadership qualities, increase initiative, and foster innovative thinking.",
      "In addition, the SABAH Program establishes strong connections with the labor market. Through cooperation with various institutions and organizations, internship and career opportunities are created for students, which helps them become better prepared and more competitive professionals in the future.",
      "Overall, SABAH groups represent an advanced educational model aimed at training highly qualified and comprehensively developed young professionals who meet modern requirements.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Provision of additional scholarship opportunities for SABAH group students",
      "Opportunity to participate in international exchange programs",
      "Opportunity to gain professional experience in modern enterprises and companies",
      "Organization of the teaching process based on advanced forms and methods",
      "Ensuring students fully acquire competencies in their field of study",
      "In-depth teaching of foreign languages",
      "Organization of various extracurricular activities for students",
    ],
    functionsTitle: "Core Functions",
    functions: [
      {
        title: "Mentoring support for personal development and career planning",
        desc: "Helping students correctly identify their professional directions.",
      },
      {
        title: "Startup and innovation project participation",
        desc: "Creating conditions for the development of students' creative and entrepreneurial potential.",
      },
      {
        title: "International certification programs",
        desc: "Supporting students in acquiring globally recognized knowledge and skills.",
      },
      {
        title: "Digital and technological competencies",
        desc: "Forming the ability to use modern technologies effectively.",
      },
      {
        title: "Academic exchange and double degree programs",
        desc: "Enabling students to gain international educational experience.",
      },
      {
        title: "Scientific research activities",
        desc: "Supporting the development of students' analytical thinking skills.",
      },
      {
        title: "Professional networking opportunities",
        desc: "Helping students establish and expand connections with specialists.",
      },
      {
        title: "Real project work during study",
        desc: "Strengthening the application of practical knowledge.",
      },
    ],
    headTitle: "Head of Department",
    headBioTitle: "Biography",
    headBio:
      "Aslanova Aychiller Telman gizi has experience in academic administration in higher education, organization of educational processes, and management of digital systems. She is currently serving as the SABAH Programs Coordinator at Azerbaijan Technical University.\n\nShe also works as an assistant at the Department of Machine Design, Mechatronics and Industrial Technologies of the same university. She specializes in the field of printing and automated complexes and has received professional education in this field.\n\nThroughout her career, she has gained extensive experience in managing student data at higher education institutions, planning educational processes, coordinating academic systems, and organizing administrative processes.\n\nShe is also engaged in scientific activities and is the author of 6 scientific articles. Her activities are aimed at improving the quality of education and managing educational processes more effectively.",
    headEducationTitle: "Education",
    headEducation: [
      { period: "2014–2018", degree: "Bachelor's Degree — Azerbaijan Technical University" },
      { period: "2018–2020", degree: "Master's Degree — Azerbaijan Technical University" },
    ],
    head: {
      name: "Aslanova Aychiller Telman gizi",
      degree: "",
      position: "SABAH Programs Coordinator",
      email: "ayciller.aslanova@aztu.edu.az",
      phone: "1502 (IP-Tel.)",
      office: "Building I, Room 306-3",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Dostuyeva Rufane Araz gizi",
        degree: "",
        email: "rufane.dostuyeva@aztu.edu.az",
        phone: "(050) 762-97-12",
        position: "Tutor",
      },
    ],
    contactTitle: "Contact",
    contact: {
      building: "Building I, Room 306-3",
      phone: "1502",
      email: "ayciller.aslanova@aztu.edu.az",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

type Fact = {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
};

export default function SabahMerkeziPage() {
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
      description: lang === "az" ? "Şöbə müdiri haqqında" : "Department head profile",
      icon: PersonOutlineIcon,
    },
    {
      id: "staff",
      label: p.staffTitle,
      description: lang === "az" ? "Heyət və əlaqə" : "Team & contact details",
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

  const facts = (rows: Fact[]) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {rows.map((row) => {
        const Icon = row.icon;
        const body = (
          <>
            <span className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              <Icon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
              {row.label}
            </span>
            <span className="block break-words text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
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

  return (
    <OfficeShell
      eyebrow={p.eyebrow}
      title={p.title}
      subtitle={p.subtitle}
      sections={sections}
      stat={{
        value: String(p.staff.length + 1),
        label: lang === "az" ? "əməkdaş" : "staff",
      }}
    >
      <section id="about" className="scroll-mt-28">
        <SectionCard
          icon={InfoOutlinedIcon}
          eyebrow={lang === "az" ? "Ümumi məlumat" : "Overview"}
          title={p.aboutTitle}
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
        <div className="space-y-6">
          <SectionCard
            icon={PersonOutlineIcon}
            eyebrow={p.headTitle}
            title={p.head.name}
          >
            <div className="space-y-5">
              {p.head.position && (
                <p className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                  {p.head.position}
                </p>
              )}
              {p.head.degree && (
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  {p.head.degree}
                </p>
              )}
              {facts([
                {
                  icon: PhoneIcon,
                  label: lang === "az" ? "Telefon" : "Phone",
                  value: p.head.phone,
                },
                {
                  icon: EmailIcon,
                  label: lang === "az" ? "E-poçt" : "Email",
                  value: p.head.email,
                  href: `mailto:${p.head.email}`,
                },
                {
                  icon: BusinessIcon,
                  label: lang === "az" ? "Otaq" : "Room",
                  value: p.head.office,
                },
              ])}
            </div>
          </SectionCard>

          <SectionCard
            icon={ArticleOutlinedIcon}
            eyebrow={lang === "az" ? "Peşəkar yol" : "Professional background"}
            title={p.headBioTitle}
            delay={0.06}
          >
            <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {p.headBio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={SchoolOutlinedIcon}
            eyebrow={lang === "az" ? "Akademik yol" : "Academic journey"}
            title={p.headEducationTitle}
            action={counter(p.headEducation.length)}
            delay={0.08}
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
                    {edu.period && (
                      <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-[#ee7c7e]">
                        {edu.period}
                      </span>
                    )}
                    <h3 className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                      {edu.degree}
                    </h3>
                  </div>
                </motion.li>
              ))}
            </ol>
          </SectionCard>
        </div>
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
                role={member.position}
                degree={member.degree || undefined}
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
          {facts([
            {
              icon: BusinessIcon,
              label: lang === "az" ? "Ünvan" : "Address",
              value: p.contact.building,
            },
            {
              icon: PhoneIcon,
              label: lang === "az" ? "Telefon" : "Phone",
              value: p.contact.phone,
              href: `tel:${p.contact.phone}`,
            },
            {
              icon: EmailIcon,
              label: lang === "az" ? "E-poçt" : "Email",
              value: p.contact.email,
              href: `mailto:${p.contact.email}`,
            },
          ])}
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
