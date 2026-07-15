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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

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

export default function QatimPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AboutHeroVideoBg />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
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
              href={
                lang === "az"
                  ? "/idareetme/ofis-ve-merkezler"
                  : "/management/ofis-ve-merkezler"
              }
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

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] relative overflow-hidden">
        <div className="relative z-10 max-w-[1600px] mx-auto space-y-32">

          {/* ── 1. About ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.aboutTitle}
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {p.aboutText.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ── 2. Objectives ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.objectivesTitle}
              </h2>
            </div>
            <div className="space-y-5">
              {p.objectives.map((obj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-5 md:gap-6 items-start bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] font-black text-lg shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify font-medium">
                    {obj}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 3. Main Functions ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <AccountBalanceIcon sx={{ fontSize: 200 }} />
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
                    <p className="text-white font-black text-sm mb-1.5 leading-snug">
                      {fn.title}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {fn.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 4. Director Bio ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-gray-100 dark:border-white/10 pt-16">
            {/* Left — Bio + Education timeline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12"
            >
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                  <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                    {p.head.name}
                  </h2>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">
                  {p.headBioTitle}
                </h3>
                <div className="space-y-6">
                  {p.headBio.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Education timeline */}
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

            {/* Right — PersonCard + Contact */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">
                  {p.headTitle}
                </h3>
              </div>
              <PersonCard
                fullName={p.head.name}
                academicDegree={p.head.degree}
                title={p.headTitle}
                email={p.head.email}
                phone={p.head.phone}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-start gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e] mt-0.5" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.phone}
                  </span>
                </div>
                <div className="flex items-start gap-4 text-sm">
                  <EmailIcon className="text-[#ee7c7e] mt-0.5" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold break-all">
                    {p.head.email}
                  </span>
                </div>
                <div className="flex items-start gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e] mt-0.5" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.office}
                  </span>
                </div>
                <div className="flex items-start gap-4 text-sm">
                  <AccessTimeIcon className="text-[#ee7c7e] mt-0.5" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.head.hours}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 5. Staff Grid ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.staffTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {p.staff.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <PersonCard
                    fullName={member.name}
                    academicDegree={member.degree}
                    title={member.position}
                    email={member.email}
                  />
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-400 pl-2">
                    <PhoneIcon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                    {member.phone}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 6. Contact ───────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">
              {p.contactTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <PhoneIcon />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#ee7c7e] font-black">
                  {p.contactLabels.phone}
                </span>
                <a
                  href={`tel:${p.contact.phone}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ee7c7e] transition-colors"
                >
                  {p.contact.phone}
                </a>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <EmailIcon />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#ee7c7e] font-black">
                  {p.contactLabels.director}
                </span>
                <a
                  href={`mailto:${p.contact.directorEmail}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ee7c7e] transition-colors break-all"
                >
                  {p.contact.directorEmail}
                </a>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <EmailIcon />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#ee7c7e] font-black">
                  {p.contactLabels.center}
                </span>
                <a
                  href={`mailto:${p.contact.centerEmail}`}
                  className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#ee7c7e] transition-colors break-all"
                >
                  {p.contact.centerEmail}
                </a>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
