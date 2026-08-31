"use client";

import { motion } from "framer-motion";

import OfficeShell from "@/components/office/OfficeShell";
import StaffCard from "@/components/faculty/StaffCard";
import { SectionCard, NumberedList } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { sortEducations } from "@/util/educationOrder";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
  hours: string;
}

interface ContactLabels {
  phone: string;
  director: string;
  center: string;
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
  contactLabels: ContactLabels;
  contact: {
    phone: string;
    directorEmail: string;
    centerEmail: string;
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "QATİM",
    subtitle:
      "«Qərbi Azərbaycan Texnoloji İrsi» Mərkəzi — deportasiya edilmiş azərbaycanlıların tarixi və mədəni irsinin toplanılması, sistemləşdirilməsi və dinc qayıdış prosesinə dəstək",
    aboutTitle: "Haqqında",
    aboutText: [
      "«Qərbi Azərbaycan Texnoloji İrsi» Mərkəzi (QATİM) Azərbaycan Texniki Universitetinin (AzTU) Elmi Şurasının qərarı, rektorun F-56 saylı, 01 may 2024-cü il tarixli əmri ilə yaradılmışdır.",
      "QATİM AzTU-nun tərkibində fəaliyyət göstərən, indiki Ermənistan ərazisindən deportasiya edilmiş azərbaycanlıların tarixi keçmişi və maddi irsi, memarlıq abidələri, sənətkarlığı, adət-ənənələri, mədəniyyəti ilə bağlı faktiki məlumatların toplanılması və sistemləşdirilməsi, toplanılmış məlumatların Qərbi Azərbaycana dinc şəraitdə qayıdış prosesində müvafiq qurumların istifadəsinə təqdim edilməsi üçün fəaliyyət göstərən ictimai təşkilatdır.",
      "QATİM azərbaycanlılara qarşı Qərbi Azərbaycanda törədilmiş bütün hüquq pozuntuları, o cümlədən mülkiyyət hüququnun pozulması, Ermənistan ərazisində azərbaycanlılara məxsus mədəni irsin məhv edilməsi və onların nəticələrinin dəyərləndirilməsi və aradan qaldırılması işinə dəstək verir.",
      "Hazırda Universitetdə 84 nəfər yalnız Qərbi Azərbaycanda doğulanlar çalışır; Qərbi Azərbaycanlıların öncəki deportasiyaları nəzərə alınarsa, əməkdaşların yarıdan çoxu Qərbi Azərbaycan kökənlidir.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "QATİM və onun üzvləri azərbaycanlılara qarşı törədilmiş bütün hüquq pozuntuları, o cümlədən mülkiyyət hüququnun pozulması məsələlərini və onun neqativ nəticələrini ictimaiyyətə beynəlxalq miqyasda, tarixi faktlarla çatdırılma istiqamətində, onların aradan qaldırılmasında Ermənistan hökuməti və müvafiq beynəlxalq təşkilatların məsuliyyət daşıdığının beynəlxalq hüquqi əsaslarla şərh edilməsi və bu məsələlərin obyektiv həlli istiqamətlərində fəaliyyət göstərməlidirlər.",
      "QATİM və onun üzvləri Ermənistan hökumətinin azərbaycanlılara məxsus olmuş mülkiyyətin və icma torpaqlarının qaytarılması, mülkiyyətə vurulmuş zərərə və mülkiyyətdən istifadənin qarşısının alınmasına görə yaranmış itkilərə görə kompensasiya ödənilməsi məsələlərinin həlli istiqamətində müvafiq strukturlara yardım göstərməlidirlər.",
      "QATİM və onun üzvləri Qərbi Azərbaycanlıların ata-baba torpaqlarında yüz illərlə yaradılmış mədəni irsinin son 100 ildə məhv edilməsi məsələlərini, onun neqativ nəticələrini ictimaiyyətə beynəlxalq miqyasda, tarixi faktlarla çatdırılma istiqamətində, mədəni irsin bərpası və qorunması məsələlərində Ermənistan hökuməti və müvafiq beynəlxalq təşkilatların məsuliyyət daşıdığını beynəlxalq hüquqi əsaslarla şərh etmə və bu məsələlərin obyektiv həlli istiqamətində fəaliyyət göstərməlidirlər.",
      "QATİM və onun üzvləri Ermənistan hökumətinin qərbi azərbaycanlıların mədəni irsinin bərpası və qorunmasından irəli gələn bütün xərcləri ödəməsi və azərbaycanlıların mədəni irsinin planlı şəkildə məhv edilməsindən irəli gələn digər lazımi tədbirlərin görülməsi məsələlərinin həlli istiqamətində fəaliyyət göstərməlidirlər.",
      "QATİM və onun üzvləri BMT-nin ixtisaslaşmış qurumlarının iştirakı ilə Ermənistan ərazisində azərbaycanlılara məxsus mədəni irsin (tarixi abidələr və tikililər, dini abidələr, qəbiristanlıqlar, sənaye və kənd təsərrüfatı məhsullarının istehsal texnologiyaları və s.) vəziyyətinin dəyərləndirilməsinə, o cümlədən, zərər vurulmuş və yer üzündən silinmiş mədəni irs nümunələrinin siyahısının hazırlanmasına və Ermənistan hökumətinin onları bərpa etmək və qorumaq öhdəliyini icra etməsinə nail olmaq üçün səy göstərməlidirlər.",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      {
        title: "«Qayıdış Konsepsiyası» ilə uzlaşma",
        desc: "QATİM-in fəaliyyəti 2023-cü il 26 yanvar tarixində Qərbi Azərbaycan İcması tərəfindən təsdiq edilmiş «Qayıdış Konsepsiyası»nın müddəalarına əsaslanır və onun tələbləri ilə uzlaşdırılır.",
      },
      {
        title: "Qərbi Azərbaycanlıların hüquq pozuntularının dəyərləndirilməsi",
        desc: "QATİM azərbaycanlılara qarşı Qərbi Azərbaycanda törədilmiş bütün hüquq pozuntuları, o cümlədən mülkiyyət hüququnun pozulması, Ermənistan ərazisində azərbaycanlılara məxsus mədəni irsin məhv edilməsi və onların nəticələrinin dəyərləndirilməsi və aradan qaldırılması işinə yardım göstərir.",
      },
      {
        title: "Kollektiv müqavilələrə əsaslanma",
        desc: "Ümumdünya İnsan Hüquqları Bəyannaməsində, Mülki və Siyasi Hüquqlar üzrə Beynəlxalq Paktda, Qaçqınların Statusuna dair Konvensiyada və digər mühüm beynəlxalq aktlarda təsbit olunmuş insanların doğulduğu torpaqlara qayıtmaq hüququna əsaslanaraq, deportasiya edilmiş azərbaycanlıların öz yurdlarına qayıtmalarına şərait yaradılmasını və qayıtdıqdan sonra onların fərdi və kollektiv hüquqlarının təmin edilməsinə köməklik göstərməyi öz fəaliyyətinin əsas istiqamətlərindən biri kimi qəbul edir.",
      },
      {
        title: "Beynəlxalq ictimaiyyətin dəstəyinin əldə edilməsi",
        desc: "QATİM bütün bu vəzifələrin həlli üçün Azərbaycan və Ermənistan ilə yanaşı, geniş beynəlxalq ictimaiyyətin dəstəyinin əldə edilməsinin zəruriliyini vacib hesab edir.",
      },
    ],
    headTitle: "Rəhbər",
    headBioTitle: "Bioqrafiya",
    headBio:
      "Nəriman Rəsulov texnika elmləri doktoru, professor, Əməkdar elm xadimi, maşınqayırma sahəsi üzrə mütəxəssisdir; Qərbi Azərbaycanda anadan olmuşdur.\n\nProf. N.M. Rəsulov 01.05.2024-cü ildə AzTU-da yaradılmış «Qərbi Azərbaycan Texnoloji İrsi» Mərkəzinin rəhbəri təyin edilmişdir.\n\nHazırda o, Azərbaycan Texniki Universitetinin Maşınqayırma texnologiyası kafedrasının məsləhətçi-professoru kimi fəaliyyət göstərir.\n\nO, 350-dən çox elmi əsərin, o cümlədən 18 patent, 5 dərslik, 2 monoqrafiya, dərs vəsaitləri və proqramların müəllifidir.",
    headEducationTitle: "Təhsil",
    headEducation: [
      {
        period: "1963–1968",
        degree:
          "Azərbaycan Politexnik İnstitutu (indiki Azərbaycan Texniki Universiteti, AzTU) — Bakalavr",
      },
      {
        period: "1985–1986",
        degree:
          "M.Torez adına Moskva Dövlət Pedaqoji Xarici Dillər İnstitutu — dinləyici (fransız dili)",
      },
      { period: "1979", degree: "Texnika elmləri namizədi" },
      { period: "2000", degree: "Texnika elmləri doktoru" },
      {
        period: "2006",
        degree: "«Maşınqayırma texnologiyası» kafedrası üzrə professor",
      },
    ],
    head: {
      name: "Rəsulov Nəriman Moğbil oğlu",
      degree: "Texnika elmləri doktoru, professor, məsləhətçi-professor",
      position: "Qərbi Azərbaycan Texnoloji İrsi Mərkəzinin rəhbəri",
      email: "naiman.rasulov@aztu.edu.az",
      phone: "+994 50 359 54 97",
      office: "III bina, 207-ci otaq",
      hours: "İş günləri 12:00–15:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Hüseynova Aynur Şəmməd qızı",
        degree: "",
        position:
          "Tələbələrlə iş üzrə menecer · Yüksək Təhsil İnstitutunun Türk Mühəndislik və Menecment Məktəbinin xarici proqram meneceri",
        email: "",
        phone: "+994 55 449 96 06",
      },
      {
        name: "Almədətli Roza Sultan qızı",
        degree: "",
        position: "Tələbə · Mütəxəssis",
        email: "",
        phone: "+994 77 308 77 03",
      },
    ],
    contactTitle: "Əlaqə",
    contactLabels: {
      phone: "Telefon",
      director: "Rəhbər",
      center: "Mərkəzin e-poçtu",
    },
    contact: {
      phone: "+994 50 359 54 97",
      directorEmail: "naiman.rasulov@aztu.edu.az",
      centerEmail: "qatim@aztu.edu.az",
    },
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "QATİM",
    subtitle:
      "The Center for the Technological Heritage of Western Azerbaijan — documenting the historical and cultural heritage of deported Azerbaijanis and supporting the peaceful return process",
    aboutTitle: "About",
    aboutText: [
      "The Center for the Technological Heritage of Western Azerbaijan (QATİM) was established by the decision of the Scientific Council of Azerbaijan Technical University (AzTU) and by the Rector's Order No. F-56, dated 1 May 2024.",
      "QATİM is a public organization operating within AzTU. Its primary mission is to collect, document, and systematize factual information on the historical heritage, material culture, architectural monuments, traditional crafts, customs, traditions, and cultural values of Azerbaijanis who were deported from the territory of present-day Armenia. The collected information is intended to support relevant institutions in the peaceful return process to Western Azerbaijan by providing a comprehensive and reliable knowledge base.",
      "The Center also supports efforts to document and assess all violations of the rights of Azerbaijanis in Western Azerbaijan, including violations of property rights, the destruction of Azerbaijani cultural heritage in the territory of Armenia, and initiatives aimed at evaluating the consequences of these actions and contributing to their remediation.",
      "Currently, 84 employees of Azerbaijan Technical University were born in Western Azerbaijan. Taking into account the earlier waves of deportations of Western Azerbaijanis, it is estimated that more than half of the University's staff are of Western Azerbaijani origin.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "QATİM and its members shall work to present, at the international level and on the basis of historical evidence, the violations of the rights of Azerbaijanis — including violations of property rights — and their adverse consequences. They shall also promote the interpretation, in accordance with international law, of the responsibility of the Government of Armenia and relevant international organizations for addressing these issues and support efforts aimed at their fair and objective resolution.",
      "QATİM and its members shall assist the relevant authorities in efforts to facilitate the restitution of private property and community lands belonging to Azerbaijanis, as well as the provision of compensation for property damage and losses resulting from the deprivation of the use and enjoyment of such property.",
      "QATİM and its members shall work to raise international awareness, based on historical evidence, of the destruction of the cultural heritage created by Western Azerbaijanis over centuries in their ancestral homeland, particularly during the last century, and its negative consequences. They shall also promote, within the framework of international law, the responsibility of the Government of Armenia and relevant international organizations for the restoration and protection of this cultural heritage, while supporting efforts toward the objective resolution of these issues.",
      "QATİM and its members shall advocate for the Government of Armenia to assume responsibility for covering all costs associated with the restoration and preservation of the cultural heritage of Western Azerbaijanis, as well as for undertaking other necessary measures arising from the systematic destruction of Azerbaijani cultural heritage.",
      "QATİM and its members shall strive to ensure, with the participation of the specialized agencies of the United Nations, the assessment of the condition of the cultural heritage belonging to Azerbaijanis within the territory of Armenia — including historical monuments and structures, religious monuments, cemeteries, traditional industrial and agricultural production technologies, and other heritage assets. They shall also support the preparation of a comprehensive inventory of damaged and destroyed cultural heritage sites and promote the fulfillment by the Government of Armenia of its obligations regarding their restoration and protection.",
    ],
    functionsTitle: "Main Functions",
    functions: [
      {
        title: "Alignment with the \"Concept of Return\"",
        desc: "QATİM carries out its activities in accordance with the provisions of the \"Concept of Return\", approved by the Western Azerbaijan Community on 26 January 2023, and aligns its work with the objectives and principles set forth in this document.",
      },
      {
        title: "Assessment of human rights violations against Western Azerbaijanis",
        desc: "QATİM supports efforts to document, assess, and evaluate all human rights violations committed against Azerbaijanis in Western Azerbaijan, including violations of property rights, the destruction of Azerbaijani cultural heritage within the territory of Armenia, and the consequences of these violations, while contributing to initiatives aimed at their remediation.",
      },
      {
        title: "Commitment to international legal instruments",
        desc: "Guided by the Universal Declaration of Human Rights, the International Covenant on Civil and Political Rights, the Convention Relating to the Status of Refugees, and other relevant international legal instruments recognizing the right of individuals to return to their place of origin, QATİM considers it one of its principal objectives to support the creation of conditions that would enable deported Azerbaijanis to return to their ancestral homeland and to help ensure the protection of their individual and collective rights following their return.",
      },
      {
        title: "Promoting international support",
        desc: "QATİM recognizes that achieving these objectives requires the support and engagement of not only Azerbaijan and Armenia but also the broader international community. Accordingly, the Center works to promote international awareness and cooperation in support of these goals.",
      },
    ],
    headTitle: "Director",
    headBioTitle: "Biography",
    headBio:
      "Prof. Nariman Rasulov is a Doctor of Technical Sciences, Professor, Honored Scientist of Azerbaijan, and a distinguished expert in Mechanical Engineering and Manufacturing Technology. He was born in Western Azerbaijan.\n\nOn 1 May 2024, Prof. Rasulov was appointed as the Director of the Center for the Technological Heritage of Western Azerbaijan (QATİM) at Azerbaijan Technical University (AzTU).\n\nHe currently serves as Consulting Professor at the Department of Manufacturing Technology of Azerbaijan Technical University.\n\nProf. Rasulov is the author of more than 350 scientific publications, including 18 patents, 5 textbooks, 2 monographs, as well as numerous teaching manuals and academic curricula.",
    headEducationTitle: "Education",
    headEducation: [
      {
        period: "1963–1968",
        degree:
          "B.Sc. in Mechanical Engineering — Azerbaijan Polytechnic Institute (now Azerbaijan Technical University, AzTU)",
      },
      {
        period: "1985–1986",
        degree:
          "French Language Studies — Moscow State Pedagogical Institute of Foreign Languages named after Maurice Thorez",
      },
      {
        period: "1979",
        degree: "Candidate of Technical Sciences (Ph.D. equivalent)",
      },
      { period: "2000", degree: "Doctor of Technical Sciences (D.Sc.)" },
      {
        period: "2006",
        degree: "Professor in the field of Manufacturing Technology",
      },
    ],
    head: {
      name: "Prof. Nariman Rasulov",
      degree: "Doctor of Technical Sciences, Professor",
      position:
        "Director, Center for the Technological Heritage of Western Azerbaijan",
      email: "naiman.rasulov@aztu.edu.az",
      phone: "+994 50 359 54 97",
      office: "Building III, Room 207",
      hours: "Working days 12:00–15:00",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Aynur Shammad Huseynova",
        degree: "",
        position:
          "Student Affairs Manager · International Program Manager, Turkish Engineering and Management School, Institute of Higher Education",
        email: "",
        phone: "+994 55 449 96 06",
      },
      {
        name: "Roza Sultan Almadatli",
        degree: "",
        position: "Student · Specialist",
        email: "",
        phone: "+994 77 308 77 03",
      },
    ],
    contactTitle: "Contact",
    contactLabels: {
      phone: "Phone",
      director: "Director",
      center: "Center E-mail",
    },
    contact: {
      phone: "+994 50 359 54 97",
      directorEmail: "naiman.rasulov@aztu.edu.az",
      centerEmail: "qatim@aztu.edu.az",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

/** Labelled fact tile, same shape as the contact rows on the other office pages. */
function InfoTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
        <Icon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
        {label}
      </span>
      <span className="block break-words text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
        {value}
      </span>
    </>
  );

  const shell =
    "block rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 transition-colors dark:border-white/10 dark:bg-white/5";

  return href ? (
    <a href={href} className={`${shell} hover:border-[#ee7c7e]/50`}>
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export default function QatimPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const t = {
    overview: lang === "az" ? "Ümumi məlumat" : "Overview",
    aims: lang === "az" ? "Nəyə çalışırıq" : "What we aim for",
    doing: lang === "az" ? "Nə edirik" : "What we do",
    profile: lang === "az" ? "Profil və əlaqə" : "Profile & contact",
    background: lang === "az" ? "Peşəkar yol" : "Professional background",
    academic: lang === "az" ? "Akademik yol" : "Academic journey",
    team: lang === "az" ? "İnzibati heyət" : "Administrative team",
    getInTouch: lang === "az" ? "Bizə yazın" : "Get in touch",
    emailLabel: lang === "az" ? "E-poçt" : "Email",
    roomLabel: lang === "az" ? "Otaq" : "Room",
    hoursLabel: lang === "az" ? "Qəbul saatları" : "Office hours",
    staffLabel: lang === "az" ? "əməkdaş" : "staff",
  };

  const sections = [
    { id: "about", label: p.aboutTitle, description: t.overview, icon: InfoOutlinedIcon },
    { id: "objectives", label: p.objectivesTitle, description: t.aims, icon: FlagOutlinedIcon },
    { id: "functions", label: p.functionsTitle, description: t.doing, icon: SettingsOutlinedIcon },
    { id: "head", label: p.headTitle, description: t.profile, icon: PersonOutlineIcon },
    { id: "biography", label: p.headBioTitle, description: t.background, icon: ArticleOutlinedIcon },
    { id: "education", label: p.headEducationTitle, description: t.academic, icon: SchoolOutlinedIcon },
    { id: "staff", label: p.staffTitle, description: t.team, icon: GroupsIcon },
    { id: "contact", label: p.contactTitle, description: t.getInTouch, icon: CallOutlinedIcon },
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
      stat={{ value: String(p.staff.length), label: t.staffLabel }}
    >
      <section id="about" className="scroll-mt-28">
        <SectionCard icon={InfoOutlinedIcon} eyebrow={t.overview} title={p.aboutTitle}>
          <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.aboutText.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="objectives" className="scroll-mt-28">
        <SectionCard
          icon={FlagOutlinedIcon}
          eyebrow={t.aims}
          title={p.objectivesTitle}
          action={counter(p.objectives.length)}
        >
          <NumberedList items={p.objectives.map((o) => o)} />
        </SectionCard>
      </section>

      <section id="functions" className="scroll-mt-28">
        <SectionCard
          icon={SettingsOutlinedIcon}
          eyebrow={t.doing}
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
                <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {fn.desc}
                </p>
              </div>
            ))}
          />
        </SectionCard>
      </section>

      <section id="head" className="scroll-mt-28">
        <SectionCard icon={PersonOutlineIcon} eyebrow={t.profile} title={p.headTitle}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,240px)_1fr]">
            <StaffCard
              fullName={p.head.name}
              degree={p.head.degree}
              role={p.head.position}
              email={p.head.email}
              phone={p.head.phone}
              index={0}
            />
            <div className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2">
              <InfoTile
                icon={PhoneIcon}
                label={p.contactLabels.phone}
                value={p.head.phone}
                href={`tel:${p.head.phone}`}
              />
              <InfoTile
                icon={EmailIcon}
                label={t.emailLabel}
                value={p.head.email}
                href={`mailto:${p.head.email}`}
              />
              <InfoTile icon={BusinessIcon} label={t.roomLabel} value={p.head.office} />
              <InfoTile icon={AccessTimeIcon} label={t.hoursLabel} value={p.head.hours} />
            </div>
          </div>
        </SectionCard>
      </section>

      <section id="biography" className="scroll-mt-28">
        <SectionCard
          icon={ArticleOutlinedIcon}
          eyebrow={t.background}
          title={p.headBioTitle}
          delay={0.06}
        >
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
          eyebrow={t.academic}
          title={p.headEducationTitle}
          action={counter(p.headEducation.length)}
        >
          <ol className="relative">
            <span className="absolute bottom-3 left-[7px] top-3 w-px bg-slate-200 dark:bg-white/10" />
            {sortEducations(p.headEducation).map((edu, i) => (
              <motion.li
                key={`${edu.period}-${i}`}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                className="relative flex gap-5 pb-7 last:pb-0"
              >
                <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-white bg-[#1a2355] ring-1 ring-slate-200 dark:border-slate-900 dark:ring-white/15" />
                <div className="min-w-0 flex-1">
                  <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-[#ee7c7e]">
                    {edu.period}
                  </span>
                  <h3 className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                    {edu.degree}
                  </h3>
                </div>
              </motion.li>
            ))}
          </ol>
        </SectionCard>
      </section>

      <section id="staff" className="scroll-mt-28">
        <SectionCard
          icon={GroupsIcon}
          eyebrow={t.team}
          title={p.staffTitle}
          action={counter(p.staff.length)}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {p.staff.map((member, i) => (
              <StaffCard
                key={member.name}
                fullName={member.name}
                degree={member.degree}
                role={member.position}
                email={member.email}
                phone={member.phone}
                index={i}
              />
            ))}
          </div>
        </SectionCard>
      </section>

      <section id="contact" className="scroll-mt-28">
        <SectionCard icon={CallOutlinedIcon} eyebrow={t.getInTouch} title={p.contactTitle}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoTile
              icon={PhoneIcon}
              label={p.contactLabels.phone}
              value={p.contact.phone}
              href={`tel:${p.contact.phone}`}
            />
            <InfoTile
              icon={EmailIcon}
              label={p.contactLabels.director}
              value={p.contact.directorEmail}
              href={`mailto:${p.contact.directorEmail}`}
            />
            <InfoTile
              icon={EmailIcon}
              label={p.contactLabels.center}
              value={p.contact.centerEmail}
              href={`mailto:${p.contact.centerEmail}`}
            />
          </div>
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
