"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonCard from "@/components/shared/PersonCard";
import { useLanguage } from "@/context/LanguageContext";

import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScienceIcon from "@mui/icons-material/Science";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

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
      phone: "+994 55 646 41 00",
      office: "II korpus, 315-ci otaq",
      hours: "II, III və IV günlər, saat 10:00–13:00",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "Əsgərov Sahib Azər oğlu",
        degree: "Ph.D. (davam edir)",
        email: "s.a.asgerov@aztu.edu.az",
        phone: "+994 77 520 33 22",
        title: "TTO-nun marketinq və satış üzrə mütəxəssisi",
      },
      {
        name: "Şirzadov Fərhad Məhəmməd oğlu",
        degree: "Ph.D.",
        email: "farhad.shirzadov@aztu.edu.az",
        phone: "+994 55 902 94 46",
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
      phone: "+994 55 646 41 00",
      office: "Building II, Room 315",
      hours: "Tuesdays, Wednesdays & Thursdays, 10:00–13:00",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Sahib Asgerov Azar",
        degree: "PhD (in progress)",
        email: "s.a.asgerov@aztu.edu.az",
        phone: "+994 77 520 33 22",
        title: "TTO Marketing and Sales Specialist",
      },
      {
        name: "Farhad Shirzadov Mahammad",
        degree: "PhD",
        email: "farhad.shirzadov@aztu.edu.az",
        phone: "+994 55 902 94 46",
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

export default function TTOPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AboutHeroVideoBg />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon sx={{ fontSize: 14 }} />
              {lang === "az" ? "Ana səhifə" : "Home"}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link
              href={lang === "az" ? "/idareetme" : "/management"}
              className="hover:text-white transition-colors"
            >
              {p.eyebrow}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <Link
              href="/idareetme/ofis-ve-merkezler"
              className="hover:text-white transition-colors"
            >
              {p.breadcrumbSection}
            </Link>
            <ChevronRightIcon sx={{ fontSize: 12 }} />
            <span className="text-[#ee7c7e] font-bold">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                {p.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                {p.title}
              </h1>
              <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                &quot;{p.subtitle}&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

          {/* 1. About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.aboutTitle}</h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {p.aboutText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* 2. Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.objectivesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {p.objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] font-black text-lg mb-6 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{obj}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3. Core Functions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <ScienceIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black">{p.functionsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {p.functions.map((fn, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#ee7c7e]/20 flex items-center justify-center text-[#ee7c7e] font-black text-xs shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-white font-black text-sm mb-1 leading-snug">{fn.title}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{fn.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4. Partnership & Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.partnershipTitle}</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-10 ml-6 font-medium">{p.partnershipSubtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.partnerships.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all duration-300"
                >
                  <h3 className="text-[#ee7c7e] font-black text-sm uppercase tracking-widest mb-4">{item.category}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{item.partners}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5. International Collaborations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.internationalTitle}</h2>
            </div>
            <div className="space-y-5">
              {p.international.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#1a2355] flex items-center justify-center shrink-0 mt-0.5 text-[#ee7c7e] font-black text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-black text-[#1a2355] dark:text-white mb-2">{item.region}</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 6. Innovation Center Table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.innovationTitle}</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-10 ml-6 font-medium">{p.innovationSubtitle}</p>
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a2355] text-white">
                    <th className="text-left px-8 py-5 font-black uppercase tracking-widest text-xs w-1/3">
                      {p.innovationPartnerHeader}
                    </th>
                    <th className="text-left px-8 py-5 font-black uppercase tracking-widest text-xs">
                      {p.innovationAreaHeader}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.innovationPartners.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-gray-100 dark:border-white/10 transition-colors hover:bg-[#ee7c7e]/5 ${
                        i % 2 === 0 ? "bg-white dark:bg-white/5" : "bg-gray-50/60 dark:bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-8 py-5 font-black text-[#1a2355] dark:text-white align-top">{row.name}</td>
                      <td className="px-8 py-5 text-gray-600 dark:text-gray-300 font-medium leading-relaxed align-top">{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* 7. Head of Office */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-gray-100 dark:border-white/10 pt-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                  <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.head.name}</h2>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[#ee7c7e] mb-2">{p.head.role}</p>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">{p.headBioTitle}</h3>
                <div className="space-y-6">
                  {p.headBio.split("\n\n").map((para, i) => (
                    <p key={i} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-8 flex items-center gap-3">
                  <div className="w-2 h-4 bg-[#ee7c7e] rounded-full" />
                  {p.headEducationTitle}
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10" />
                  <div className="space-y-8">
                    {p.headEducation.map((edu, i) => (
                      <div key={i} className="relative pl-14">
                        <div className="absolute left-[11px] top-1 w-5 h-5 rounded-full bg-[#ee7c7e] border-4 border-white dark:border-[#0b1330]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#ee7c7e] block mb-1">
                          {edu.period}
                        </span>
                        <p className="text-sm font-bold text-[#1a2355] dark:text-white leading-relaxed">
                          {edu.degree}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">{p.headTitle}</h3>
              </div>
              <PersonCard
                fullName={p.head.name}
                academicDegree={p.head.degree}
                title={p.head.role}
                email={p.head.email}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.head.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <EmailIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold break-all">{p.head.email}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.head.office}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <AccessTimeIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">{p.head.hours}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 8. Staff */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.staffTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {p.staff.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all duration-300"
                >
                  <PersonCard
                    fullName={member.name}
                    academicDegree={member.degree}
                    email={member.email}
                  />
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-black text-[#ee7c7e] uppercase tracking-wider">{member.title}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                      <PhoneIcon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                      {member.phone}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 9. Contact */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">{p.contactTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <LocationOnIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 text-center">{p.contact.address}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <EmailIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 break-all">{p.contact.email}</p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
