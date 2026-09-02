"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import OfficeShell from "@/components/office/OfficeShell";
import StaffCard from "@/components/faculty/StaffCard";
import { SectionCard, NumberedList } from "@/components/department/ui";

import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface StaffMember {
  name: string;
  role: string;
  email: string;
  phone: string;
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
  functions: string[];
  staffTitle: string;
  staff: StaffMember[];
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  regsBtn: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Ömürboyu Öyrənmə Məktəbi",
    subtitle:
      "Rəqəmsal texnologiyaların təsiri ilə dəyişən əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanması",
    aboutTitle: "Haqqımızda",
    aboutText: [
      "Ömürboyu Öyrənmə Məktəbi Azərbaycan Texniki Universitetinin struktur bölməsi olub, Universitetin Elmi Şurasının 27 dekabr 2023-cü il tarixli iclasının 4 saylı qərarı ilə Universitet–Sənaye Əməkdaşlığı və Ömürboyu Öyrənmə Mərkəzinin bazasında yaradılmışdır.",
      "Məktəbin yaradılmasında əsas məqsəd rəqəmsal texnologiyaların təsiri ilə dəyişən əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanmasını təmin etməkdir.",
      "Ömürboyu Öyrənmə Məktəbi mühəndislik və texniki sahələr üzrə davamlı təhsil proqramlarının təşkili, ikinci ali təhsil, sertifikasiya və qısamüddətli təlimlərin həyata keçirilməsi istiqamətində fəaliyyət göstərir. Eyni zamanda, professor-müəllim heyətinin peşəkar inkişafını və tələbələrin praktik bilik və bacarıqlarının artırılmasını dəstəkləyir.",
      "Məktəb universitetin elmi potensialının sənayeyə transferinə, innovasiya fəaliyyətlərinin inkişafına və universitet–sənaye əməkdaşlığının gücləndirilməsinə töhfə verir.",
    ],
    objectivesTitle: "Məqsədlərimiz",
    objectives: [
      "Əmək bazarının tələblərinə uyğun yüksəkixtisaslı kadrların hazırlanmasını təmin etmək",
      "Mühəndislik və texniki sahələr üzrə bilik və bacarıqların davamlı inkişafı üçün təhsil və sertifikasiya proqramları həyata keçirmək",
      "Universitet–sənaye əməkdaşlığını gücləndirərək praktik biliklərin ötürülməsini və innovasiyaların inkişafını dəstəkləmək",
      "Elmi potensialın sənayeyə transferini təmin edərək iqtisadi dəyər yaratmaq",
      "Tələbələr və mütəxəssislər üçün ömürboyu öyrənmə imkanlarını genişləndirmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      "Davamlı təhsil, ikinci ali təhsil və sertifikasiya proqramlarının təşkili və icrası",
      "Qısamüddətli və ixtisaslaşmış təlimlərin hazırlanması və keçirilməsi",
      "Yerli və beynəlxalq tərəfdaşlarla birgə layihə və təlimlərin təşkili",
      "Professor-müəllim heyətinin peşəkar inkişafının dəstəklənməsi",
      "Tələbələrin praktik bilik və bacarıqlarının inkişafına yönəlmiş fəaliyyətlərin həyata keçirilməsi",
      "Universitetin elmi nəticələrinin sənayeyə tətbiqinin təşviqi",
      "Universitet–sənaye əməkdaşlığının inkişafına dəstək",
      "Ömürboyu öyrənmə mühitinin formalaşdırılması və təşviqi",
    ],
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Əliyeva Şərəfxanım Vaqif qızı",
        role: "f.ü.f.d., müəllim · Şöbə müdiri vəzifəsini müvəqqəti icra edən · Təkrar Ali təhsil üzrə Proqram meneceri",
        email: "sharafxanim@aztu.edu.az",
        phone: "",
      },
      {
        name: "Rüstəmzadə Fərhad Aqil oğlu",
        role: "Sertifikasiya üzrə menecer",
        email: "ferhad.rustamzadeh@aztu.edu.az",
        phone: "",
      },
    ],
    contactTitle: "Əlaqə",
    contactEmail: "sharafxanim@aztu.edu.az",
    contactPhone: "+994 70 478 09 93",
    contactAddress: "Azərbaycan Texniki Universiteti, Bakı, Azərbaycan",
    regsBtn: "Əsasnamə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Lifelong Learning School",
    subtitle:
      "Ensuring the preparation of highly qualified professionals in line with the evolving demands of the labor market shaped by digital technologies",
    aboutTitle: "About Us",
    aboutText: [
      "The Lifelong Learning School is a structural unit of Azerbaijan Technical University (AZTU), established on the basis of the University–Industry Cooperation and Lifelong Learning Center by Decision No. 4 of the University Academic Council dated December 27, 2023.",
      "The main purpose of the School is to ensure the preparation of highly qualified professionals in line with the evolving demands of the labor market shaped by digital technologies.",
      "The Lifelong Learning School operates in the fields of continuing education in engineering and technical disciplines, second higher education programs, certification, and short-term training courses. It also supports the professional development of academic staff and enhances students' practical knowledge and skills.",
      "The School contributes to the transfer of the University's scientific potential to industry, supports the development of innovation activities, and strengthens university–industry cooperation.",
    ],
    objectivesTitle: "Our Objectives",
    objectives: [
      "To ensure the preparation of highly qualified professionals in accordance with labor market demands",
      "To provide continuous development of knowledge and skills in engineering and technical fields through education and certification programs",
      "To strengthen university–industry cooperation and support the transfer of practical knowledge and innovation",
      "To facilitate the transfer of scientific potential to industry and create economic value",
      "To expand lifelong learning opportunities for students and professionals",
    ],
    functionsTitle: "Main Functions",
    functions: [
      "Organization and implementation of continuing education, second higher education, and certification programs",
      "Development and delivery of short-term and specialized training courses",
      "Organization of joint projects and training programs with local and international partners",
      "Support for the professional development of academic staff",
      "Implementation of activities aimed at developing students' practical skills",
      "Promotion of the application of the University's research outcomes in industry",
      "Support for the development of university–industry collaboration",
      "Promotion and development of a lifelong learning environment",
    ],
    staffTitle: "Staff",
    staff: [
      {
        name: "Sharafkhanim Vagif Aliyeva",
        role: "PhD in Philology, Lecturer · Acting Head of Department · Program Manager for Second Higher Education",
        email: "sharafxanim@aztu.edu.az",
        phone: "",
      },
      {
        name: "Farhad Agil Rustamzadeh",
        role: "Certification Manager",
        email: "ferhad.rustamzadeh@aztu.edu.az",
        phone: "",
      },
    ],
    contactTitle: "Contact",
    contactEmail: "sharafxanim@aztu.edu.az",
    contactPhone: "+994 70 478 09 93",
    contactAddress: "Azerbaijan Technical University, Baku, Azerbaijan",
    regsBtn: "Statute",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OmurboyuTehsilPage() {
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
              {p.regsBtn}
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
            <NumberedList items={p.functions.map((f) => f)} />
          </SectionCard>
        </section>
      </div>

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
                role={member.role}
                email={member.email}
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: EmailIcon, label: lang === "az" ? "E-poçt" : "Email", value: p.contactEmail, href: `mailto:${p.contactEmail}` },
              { icon: PhoneIcon, label: lang === "az" ? "Telefon" : "Phone", value: p.contactPhone, href: `tel:${p.contactPhone}` },
              { icon: BusinessIcon, label: lang === "az" ? "Ünvan" : "Address", value: p.contactAddress },
            ].map((row) => {
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
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
