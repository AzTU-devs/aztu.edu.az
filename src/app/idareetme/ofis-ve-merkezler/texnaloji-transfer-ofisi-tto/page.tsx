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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface FunctionItem {
  title: string;
  desc: string;
}

interface PartnershipCategory {
  category: string;
  partners: string;
}

interface InternationalItem {
  region: string;
  desc: string;
}

interface InnovationPartner {
  name: string;
  area: string;
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
  title: string;
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
  partnershipTitle: string;
  partnershipSubtitle: string;
  partnerships: PartnershipCategory[];
  internationalTitle: string;
  international: InternationalItem[];
  innovationTitle: string;
  innovationSubtitle: string;
  innovationPartnerHeader: string;
  innovationAreaHeader: string;
  innovationPartners: InnovationPartner[];
  headTitle: string;
  headBioTitle: string;
  headBio: string;
  headEducationTitle: string;
  headEducation: EducationItem[];
  head: {
    name: string;
    degree: string;
    role: string;
    email: string;
    phone: string;
    office: string;
    hours: string;
  };
  staffTitle: string;
  staff: StaffMember[];
  contactTitle: string;
  contact: {
    address: string;
    email: string;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Texnoloji Transfer Ofisi",
    subtitle: "Elmi biliklərin praktiki dəyərə, tədqiqat nəticələrinin isə real texnologiyalara çevrilməsi",
    aboutTitle: "Haqqında",
    aboutText: [
      "Azərbaycan Texniki Universitetinin (AzTU) Texnoloji Transfer Ofisi (TTO) universitetdə yaradılan elmi biliklərin, tədqiqat nəticələrinin və texnoloji həllərin praktiki tətbiqə, sənaye əməkdaşlıqlarına, patentlərə, startaplara və kommersiyalaşdırma imkanlarına çevrilməsini dəstəkləyən struktur bölmədir.",
      "Ofis müəllim heyəti, tədqiqatçılar, tələbələr, startap komandaları, sənaye müəssisələri, dövlət qurumları və beynəlxalq tərəfdaşlarla əməkdaşlıq edərək kommersiya potensialına malik ideya və texnologiyaların müəyyənləşdirilməsi, qorunması, inkişaf etdirilməsi və bazara çıxarılması proseslərinə dəstək göstərir.",
      "Texnoloji Transfer Ofisi innovasiya, əqli mülkiyyətin idarə olunması, sahibkarlıq və universitet-sənaye əməkdaşlığını təşviq etməklə AzTU-nun milli innovasiya ekosistemindəki rolunun gücləndirilməsinə xidmət edir. Ofis həmçinin akademik biliklərin praktiki tətbiqini dəstəkləyir, tələbə və tədqiqatçıların sosial-iqtisadi dəyər yaradan texnoloji həllər hazırlamasını təşviq edir.",
      "TTO öz fəaliyyəti ilə AzTU-nun tədqiqat, innovasiya və tətbiqi texnologiyalar sahəsində aparıcı texniki universitet kimi inkişafına dəstək verir, Azərbaycanın texnoloji inkişafına, rəqabət qabiliyyətinin artırılmasına və bilik əsaslı iqtisadiyyatının formalaşmasına töhfə verir.",
    ],
    objectivesTitle: "Məqsədlər",
    objectives: [
      "AzTU-da yaradılan tədqiqat nəticələrinin və texnoloji həllərin praktiki tətbiqini və kommersiyalaşdırılmasını dəstəkləmək",
      "Şirkətlər, sənaye müəssisələri, dövlət qurumları, investorlar və innovasiya ekosistemi ilə davamlı tərəfdaşlıqlar qurmaq",
      "Tədqiqatçılara patent, müəllif hüququ, lisenziyalaşdırma və digər əqli mülkiyyət prosesləri üzrə dəstək göstərmək",
      "Tələbə və tədqiqatçıların startaplar yaratmasını, biznes ideyalarını inkişaf etdirməsini və innovasiya proqramlarında iştirakını təşviq etmək",
      "Birgə tədqiqatları, prototip hazırlığını, pilot layihələri, lisenziyalaşdırma imkanlarını dəstəkləmək",
      "Universitetin texnoloji inkişafa, iqtisadi artıma və milli innovasiya prioritetlərinə töhfəsini gücləndirmək",
    ],
    functionsTitle: "Əsas Funksiyalar",
    functions: [
      { title: "Əqli mülkiyyətin idarə olunması", desc: "Universitetdə yaradılan patent, müəllif hüququ, faydalı model, nou-hau və digər əqli mülkiyyət obyektlərinin müəyyənləşdirilməsi, qiymətləndirilməsi, qorunması və idarə olunması." },
      { title: "Kommersiyalaşdırma dəstəyi", desc: "Tədqiqat nəticələrinin bazar potensialının qiymətləndirilməsi, lisenziyalaşdırma proseslərinə dəstək göstərilməsi və universitet texnologiyalarının sənaye tələbatı ilə əlaqələndirilməsi." },
      { title: "Sənaye tərəfdaşlıqlarının inkişafı", desc: "Şirkətlər, investorlar, akseleratorlar, inkubatorlar, dövlət qurumları və beynəlxalq innovasiya şəbəkələri ilə əməkdaşlıqların qurulması və koordinasiyası." },
      { title: "Startap və sahibkarlıq dəstəyi", desc: "Tələbə və tədqiqatçı komandalarına ideyanın doğrulanması, biznes modelinin hazırlanması, mentorluq, inkubasiya imkanları və investorlarla görüşlərə hazırlıq üzrə dəstək göstərilməsi." },
      { title: "Layihə və qrant dəstəyi", desc: "İnnovasiya yönümlü layihələrin, texnologiyanın validasiyası fəaliyyətlərinin, tətbiqi tədqiqat təkliflərinin və birgə qrant müraciətlərinin hazırlanmasına dəstək göstərilməsi." },
      { title: "Təlim və maarifləndirmə fəaliyyəti", desc: "Əqli mülkiyyət, kommersiyalaşdırma, sahibkarlıq və innovasiya menecmenti üzrə seminarların, təlimlərin, praktiki seminarların və məsləhət sessiyalarının təşkili." },
      { title: "Monitorinq və hesabatlılıq", desc: "İxtira bildirişləri, patentlər, lisenziyalar, startaplar, sənaye müqavilələri və texnologiya transferi nəticələri üzrə məlumatların toplanması və təhlili." },
    ],
    partnershipTitle: "Tərəfdaşlıq və Ekosistem",
    partnershipSubtitle: "Dövlət qurumları, sənaye şirkətləri və akademik institutlarla geniş əməkdaşlıq şəbəkəsi",
    partnerships: [
      { category: "Dövlət qurumları", partners: "Elm və Təhsil Nazirliyi, Əqli Mülkiyyət Agentliyi və Müdafiə Sənayesi Nazirliyi" },
      { category: "Sənaye tərəfdaşları", partners: "SOCAR və Azərişıq ilə tədqiqat nəticələrinin tətbiqi; Veysəloğlu Şirkətlər Qrupu ilə süni intellektin istehsalata inteqrasiyası" },
      { category: "İnnovasiya və KOB dəstəyi", partners: "INNOLAND, SABAH.LAB və KOB Model Müəssisəsi ilə sahibkarlıq təlimləri və innovasiya yönümlü tədbirlər" },
      { category: "Akademik tərəfdaşlıq", partners: "Bakı Mühəndislik Universiteti, Milli Aviasiya Akademiyası və Azərbaycan Texnologiya Universiteti" },
    ],
    internationalTitle: "Beynəlxalq Əməkdaşlıqlar",
    international: [
      { region: "Türkiyənin aparıcı universitetləri", desc: "İzmir Yüksək Texnologiya İnstitutu, Qaradeniz Texniki Universiteti, Yıldız Texniki Universiteti, ODTÜ və Qazi Universiteti — rəqəmsal transformasiya, açıq innovasiya, ikili diplom proqramları, ortaq laboratoriyalar və birgə tədqiqat layihələri üzrə əməkdaşlıq." },
      { region: "Avropa və Asiya tərəfdaşları", desc: "Brandenburq Texniki Universiteti, eləcə də Qazaxıstan, Özbəkistan və Pakistan universitetləri ilə DAAD və Erasmus+ çərçivəsində innovasiya və texnologiya transferi istiqamətində əməkdaşlıq." },
      { region: "Müdafiə və texnologiya sənayesi", desc: "Müdafiə Sənayesi Nazirliyi, ASELSAN, TÜBİTAK və Türkiyənin texnologiya ekosistemi ilə birgə elmi layihələr və texnologiya transferi əlaqələri." },
    ],
    innovationTitle: "İnnovasiya Mərkəzi: Rezident Şirkətlər və Tərəfdaşlar",
    innovationSubtitle: "AzTU-nun kampusunda fəaliyyət göstərən şirkətlər və tərəfdaşlıq istiqamətləri",
    innovationPartnerHeader: "Tərəfdaş",
    innovationAreaHeader: "Əməkdaşlıq istiqaməti",
    innovationPartners: [
      { name: "Havelsan", area: "Universitet daxilində fəaliyyət göstərən xüsusi tədqiqat və inkişaf (R&D/Ar-Ge) mərkəzləri." },
      { name: "SAHA İstanbul", area: "Türkiyənin ən böyük müdafiə sənayesi klasterinin Azərbaycan mərkəzi." },
      { name: "KOBİA", area: "Texnopark daxilində dövlət dəstəyini təmin edən qurum." },
      { name: "Texnoloji və tədris tərəfdaşları", area: "Ordulu Texnologiya, Cezeri Lab, Peerstack və Intech kimi innovativ təşkilatlar." },
    ],
    headTitle: "Şöbə/Ofis Rəhbəri",
    headBioTitle: "Bioqrafiya",
    headBio: "ODTÜ-nün Metallurgiya və Material Mühəndisliyi bölməsində bakalavr və magistr dərəcələrini tamamlamışdır. Hazırda AzTU-nun Material mühəndisliyi üzrə doktorantura proqramında təhsilini davam etdirir.\n\nTürkiyə, İtaliya və İspaniyada keramika və odadavamlı materiallar istehsalı sahəsində fəaliyyət göstərən müəssisələrdə tədqiqat və inkişaf (R&D/Ar-Ge), eləcə də istehsalat istiqamətləri üzrə mühəndis və rəhbər vəzifələrində çalışmışdır.",
    headEducationTitle: "Təhsil",
    headEducation: [
      { period: "Bakalavr", degree: "ODTÜ — Metallurgiya və Material Mühəndisliyi (ingilis dilində)" },
      { period: "Magistratura", degree: "ODTÜ — Metallurgiya və Material Mühəndisliyi (ingilis dilində)" },
      { period: "Doktorantura (2026–...)", degree: "AzTU — Material Mühəndisliyi" },
    ],
    head: {
      name: "Mehmet Murat Ataman",
      degree: "",
      role: "Texnoloji Transfer Ofisinin rəhbəri",
      email: "murat.ataman@aztu.edu.az",
      phone: "+994 12 525 24 06",
      office: "II korpus, 315-ci otaq",
      hours: "II, III və IV günlər, saat 10:00–13:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Əsgərov Sahib Azər oğlu",
        degree: "Ph.D. (davam edir)",
        email: "s.a.asgerov@aztu.edu.az",
        phone: "",
        title: "TTO-nun marketinq və satış üzrə mütəxəssisi",
      },
      {
        name: "Şirzadov Fərhad Məhəmməd oğlu",
        degree: "Ph.D.",
        email: "farhad.shirzadov@aztu.edu.az",
        phone: "",
        title: "Texnoloji innovasiyalar üzrə mütəxəssis",
      },
    ],
    contactTitle: "Əlaqə Məlumatları",
    contact: {
      address: "H. Cavid prospekti 25, Bakı, Azərbaycan, AZ 1073",
      email: "tto@aztu.edu.az",
    },
  },

  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Technology Transfer Office",
    subtitle: "Transforming scientific knowledge into practical value and research outcomes into real technology",
    aboutTitle: "About",
    aboutText: [
      "The Technology Transfer Office (TTO) at Azerbaijan Technical University (AzTU) serves as a bridge between university research, industry needs, and practical innovation. The office supports the transformation of scientific ideas, research outcomes, and technical solutions into real products, services, start-ups, patents, and industry partnerships.",
      "The TTO works with faculty members, researchers, students, start-up teams, companies, public institutions, and international partners to identify commercially valuable research results and guide them through the stages of protection, validation, partnership development, and commercialization.",
      "By promoting innovation, intellectual property management, entrepreneurship, and university-industry cooperation, the Technology Transfer Office contributes to strengthening AzTU's role in the national innovation ecosystem. The office also supports the practical application of academic knowledge and encourages researchers and students to develop solutions that create social and economic value.",
      "Through its activities, the TTO supports AzTU's mission to become a leading technical university in research, innovation, and applied technology, while contributing to Azerbaijan's technological development, competitiveness, and knowledge-based economy.",
    ],
    objectivesTitle: "Objectives",
    objectives: [
      "Support the practical application and commercialization of research results developed by AzTU faculty, researchers, and students",
      "Build sustainable partnerships with companies, industrial organizations, public institutions, investors, and innovation ecosystem stakeholders",
      "Assist researchers in patenting, copyright, licensing, and related intellectual property processes",
      "Encourage students and researchers to create start-ups, develop business ideas, and participate in innovation programs",
      "Support joint research, prototype development, pilot projects, licensing opportunities, and applied innovation initiatives",
      "Enhance the university's contribution to technological development, economic growth, and national innovation priorities",
    ],
    functionsTitle: "Core Functions",
    functions: [
      { title: "Intellectual Property Management", desc: "Identify, evaluate, protect, and manage patents, copyrights, utility models, know-how, and other intellectual property assets created at the university." },
      { title: "Commercialization Support", desc: "Assess the market potential of research outcomes, support licensing processes, and help connect university technologies with industry demand." },
      { title: "Industry Partnership Development", desc: "Establish and coordinate cooperation with companies, investors, accelerators, incubators, government agencies, and international innovation networks." },
      { title: "Start-up and Entrepreneurship Support", desc: "Provide guidance to student and researcher teams on idea validation, business model development, mentoring, incubation opportunities, and investor readiness." },
      { title: "Project and Grant Support", desc: "Support innovation-oriented projects, technology validation activities, applied research proposals, and collaborative grant applications." },
      { title: "Training and Awareness Activities", desc: "Organize seminars, workshops, bootcamps, and consultation sessions on intellectual property, commercialization, entrepreneurship, and innovation management." },
      { title: "Monitoring and Reporting", desc: "Collect and analyze information on invention disclosures, patents, licenses, start-ups, industry contracts, and technology transfer outcomes." },
    ],
    partnershipTitle: "Partnership & Ecosystem",
    partnershipSubtitle: "A broad collaboration network with government bodies, industry companies, and academic institutions",
    partnerships: [
      { category: "Government Institutions", partners: "Ministry of Science and Education, Intellectual Property Agency, and Ministry of Defense Industry" },
      { category: "Industry Partners", partners: "SOCAR and Azərişıq for industrial application of research; Veysaloglu Group for AI integration in manufacturing" },
      { category: "Innovation & SME Support", partners: "INNOLAND, SABAH.LAB and KOB Model Enterprise for entrepreneurship training and innovation-oriented support activities" },
      { category: "Academic Partnerships", partners: "Baku Engineering University, National Aviation Academy, and Azerbaijan Technology University" },
    ],
    internationalTitle: "International Collaborations",
    international: [
      { region: "Leading Turkish Universities", desc: "Izmir Institute of Technology, Karadeniz Technical University, Yıldız Technical University, METU, and Gazi University — cooperation on digital transformation, open innovation, dual degree programs, joint labs, and collaborative research projects." },
      { region: "European and Asian Partners", desc: "Brandenburg University of Technology and universities in Kazakhstan, Uzbekistan, and Pakistan — innovation and technology transfer cooperation under DAAD and Erasmus+." },
      { region: "Defense and Technology Industry", desc: "Ministry of Defense Industry, ASELSAN, TÜBİTAK, and Turkey's technology ecosystem — joint scientific projects and technology transfer relations." },
    ],
    innovationTitle: "Innovation Center: Resident Companies and Partners",
    innovationSubtitle: "Companies and cooperation areas active within AzTU's campus",
    innovationPartnerHeader: "Partner",
    innovationAreaHeader: "Cooperation Area",
    innovationPartners: [
      { name: "Havelsan", area: "Dedicated R&D centers operating within the university." },
      { name: "SAHA Istanbul", area: "Azerbaijan hub of Turkey's largest defense industry cluster." },
      { name: "KOBİA", area: "State support agency operating within the Technopark." },
      { name: "Technology & Educational Partners", area: "Innovative organizations including Ordulu Texnologiya, Cezeri Lab, Peerstack, and Intech." },
    ],
    headTitle: "Head of Office",
    headBioTitle: "Biography",
    headBio: "He completed his bachelor's and master's degrees in Metallurgy and Materials Engineering at METU (Middle East Technical University). He is currently pursuing a PhD in Materials Engineering at AzTU.\n\nHe has worked as an engineer and manager in R&D and manufacturing at companies specializing in ceramics and refractory materials production in Turkey, Italy, and Spain.",
    headEducationTitle: "Education",
    headEducation: [
      { period: "Bachelor's", degree: "METU — Metallurgy and Materials Engineering (in English)" },
      { period: "Master's", degree: "METU — Metallurgy and Materials Engineering (in English)" },
      { period: "PhD (2026–...)", degree: "AzTU — Materials Engineering" },
    ],
    head: {
      name: "Mehmet Murat Ataman",
      degree: "",
      role: "Head of the Technology Transfer Office",
      email: "murat.ataman@aztu.edu.az",
      phone: "+994 12 525 24 06",
      office: "Building II, Room 315",
      hours: "Tuesdays, Wednesdays & Thursdays, 10:00–13:00",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Sahib Asgerov Azar",
        degree: "PhD (in progress)",
        email: "s.a.asgerov@aztu.edu.az",
        phone: "",
        title: "TTO Marketing and Sales Specialist",
      },
      {
        name: "Farhad Shirzadov Mahammad",
        degree: "PhD",
        email: "farhad.shirzadov@aztu.edu.az",
        phone: "",
        title: "Technology Innovation Specialist",
      },
    ],
    contactTitle: "Contact Information",
    contact: {
      address: "25 H. Javid Avenue, Baku, Azerbaijan, AZ 1073",
      email: "tto@aztu.edu.az",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TTOPage() {
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
      id: "partnerships",
      label: p.partnershipTitle,
      description: lang === "az" ? "Yerli tərəfdaşlar" : "Local partners",
      icon: HandshakeOutlinedIcon,
    },
    {
      id: "international",
      label: p.internationalTitle,
      description: lang === "az" ? "Xarici tərəfdaşlar" : "Global partners",
      icon: PublicOutlinedIcon,
    },
    {
      id: "innovation",
      label: p.innovationTitle,
      description: lang === "az" ? "Rezident şirkətlər" : "Resident companies",
      icon: HubOutlinedIcon,
    },
    {
      id: "leadership",
      label: p.headTitle,
      description: lang === "az" ? "Rəhbərlik" : "Leadership",
      icon: BadgeOutlinedIcon,
    },
    {
      id: "staff",
      label: p.staffTitle,
      description: lang === "az" ? "Heyət" : "Team",
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

  const factTile = (
    Icon: React.ElementType,
    label: string,
    value: string,
    href?: string
  ) => {
    const body = (
      <>
        <span className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          <Icon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
          {label}
        </span>
        <span className="block text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
          {value}
        </span>
      </>
    );
    const shell =
      "block rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 transition-colors dark:border-white/10 dark:bg-white/5";
    return href ? (
      <a key={label} href={href} className={`${shell} hover:border-[#ee7c7e]/50`}>
        {body}
      </a>
    ) : (
      <div key={label} className={shell}>
        {body}
      </div>
    );
  };

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
      {/* ── About ──────────────────────────────────────────────────────────── */}
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

      {/* ── Objectives ─────────────────────────────────────────────────────── */}
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

      {/* ── Core functions ─────────────────────────────────────────────────── */}
      <section id="functions" className="scroll-mt-28">
        <SectionCard
          icon={SettingsOutlinedIcon}
          eyebrow={lang === "az" ? "Nə edirik" : "What we do"}
          title={p.functionsTitle}
          action={counter(p.functions.length)}
        >
          <NumberedList
            items={p.functions.map((fn) => (
              <div key={fn.title}>
                <span className="block text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                  {fn.title}
                </span>
                <span className="mt-1 block text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {fn.desc}
                </span>
              </div>
            ))}
          />
        </SectionCard>
      </section>

      {/* ── Partnership & ecosystem ────────────────────────────────────────── */}
      <section id="partnerships" className="scroll-mt-28">
        <SectionCard
          icon={HandshakeOutlinedIcon}
          eyebrow={lang === "az" ? "Ekosistem" : "Ecosystem"}
          title={p.partnershipTitle}
          action={counter(p.partnerships.length)}
        >
          <p className="mb-6 text-[15px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {p.partnershipSubtitle}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {p.partnerships.map((item) => (
              <div
                key={item.category}
                className="rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#ee7c7e]">
                  {item.category}
                </p>
                <p className="text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.partners}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* ── International collaborations ───────────────────────────────────── */}
      <section id="international" className="scroll-mt-28">
        <SectionCard
          icon={PublicOutlinedIcon}
          eyebrow={lang === "az" ? "Qlobal əlaqələr" : "Global reach"}
          title={p.internationalTitle}
          action={counter(p.international.length)}
        >
          <NumberedList
            items={p.international.map((item) => (
              <div key={item.region}>
                <span className="block text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                  {item.region}
                </span>
                <span className="mt-1 block text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.desc}
                </span>
              </div>
            ))}
          />
        </SectionCard>
      </section>

      {/* ── Innovation centre ──────────────────────────────────────────────── */}
      <section id="innovation" className="scroll-mt-28">
        <SectionCard
          icon={HubOutlinedIcon}
          eyebrow={lang === "az" ? "Kampusda" : "On campus"}
          title={p.innovationTitle}
          action={counter(p.innovationPartners.length)}
        >
          <p className="mb-6 text-[15px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {p.innovationSubtitle}
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead className="bg-slate-50 dark:bg-white/5">
                <tr>
                  <th className="w-1/3 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    {p.innovationPartnerHeader}
                  </th>
                  <th className="px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    {p.innovationAreaHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.innovationPartners.map((row) => (
                  <tr
                    key={row.name}
                    className="border-t border-slate-100 transition-colors hover:bg-slate-50/60 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <td className="px-5 py-4 align-top text-[14px] font-black text-[#1a2355] dark:text-white">
                      {row.name}
                    </td>
                    <td className="px-5 py-4 align-top text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      {row.area}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>

      {/* ── Head of office: profile, biography, education ──────────────────── */}
      <section id="leadership" className="scroll-mt-28">
        <div className="space-y-6">
          <SectionCard
            icon={BadgeOutlinedIcon}
            eyebrow={lang === "az" ? "Rəhbərlik" : "Leadership"}
            title={p.headTitle}
          >
            <div className="mb-6">
              <h3 className="text-xl font-black leading-tight tracking-tight text-[#1a2355] dark:text-white md:text-2xl">
                {p.head.name}
              </h3>
              {p.head.degree && (
                <p className="mt-1.5 text-[13px] font-semibold text-slate-500 dark:text-slate-400">
                  {p.head.degree}
                </p>
              )}
              <p className="mt-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#ee7c7e]">
                {p.head.role}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {factTile(
                PhoneIcon,
                lang === "az" ? "Telefon" : "Phone",
                p.head.phone,
                `tel:${p.head.phone.replace(/\s+/g, "")}`
              )}
              {factTile(
                EmailIcon,
                lang === "az" ? "E-poçt" : "Email",
                p.head.email,
                `mailto:${p.head.email}`
              )}
              {factTile(BusinessIcon, lang === "az" ? "Otaq" : "Room", p.head.office)}
              {factTile(
                AccessTimeIcon,
                lang === "az" ? "Qəbul saatları" : "Office hours",
                p.head.hours
              )}
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
                    <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">
                      {edu.period}
                    </span>
                    <p className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                      {edu.degree}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </SectionCard>
        </div>
      </section>

      {/* ── Staff ──────────────────────────────────────────────────────────── */}
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
                role={member.title}
                email={member.email}
                index={i}
              />
            ))}
          </div>
        </SectionCard>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-28">
        <SectionCard
          icon={CallOutlinedIcon}
          eyebrow={lang === "az" ? "Bizə yazın" : "Get in touch"}
          title={p.contactTitle}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {factTile(
              LocationOnIcon,
              lang === "az" ? "Ünvan" : "Address",
              p.contact.address
            )}
            {factTile(
              EmailIcon,
              lang === "az" ? "E-poçt" : "Email",
              p.contact.email,
              `mailto:${p.contact.email}`
            )}
          </div>
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
