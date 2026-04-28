"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonCard from "@/components/shared/PersonCard";
import { useLanguage } from "@/context/LanguageContext";

import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StorageIcon from "@mui/icons-material/Storage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ─── Data ────────────────────────────────────────────────────────────────────

interface VisitorStat {
  month: string;
  count: number;
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

interface DirectorContact {
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
  departments: string[];
  technicalTitle: string;
  technicalProcesses: string[];
  dlsTitle: string;
  dlsServices: string[];
  infoServicesTitle: string;
  infoServicesText: string;
  infoFunctions: string[];
  activitiesTitle: string;
  activities: string[];
  purposeTitle: string;
  purpose: string;
  reportTitle: string;
  reportIntro: string[];
  visitorsTitle: string;
  visitors: VisitorStat[];
  databasesTitle: string;
  databases: string[];
  emailQueriesTitle: string;
  emailQueriesText: string;
  targetsTitle: string;
  targets: string[];
  directorTitle: string;
  directorBioTitle: string;
  directorBio: string;
  directorEducationTitle: string;
  directorEducation: EducationItem[];
  director: DirectorContact;
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

const DATA: Record<"az" | "en", PageData> = {
  az: {
    eyebrow: "İdarəetmə",
    breadcrumbSection: "Ofis və Mərkəzlər",
    title: "Kitabxana İnformasiya Mərkəzi",
    subtitle:
      "Tələbələrin, akademik və inzibati heyətinin müasir məlumat informasiya mühitinə çıxışını təmin edən struktur vahid",
    aboutTitle: "Struktur Bölmə Haqqında",
    aboutText: [
      "Kitabxana İnformasiya Mərkəzi tələbələrin, akademik və inzibati heyətinin müasir məlumat informasiya mühitinə çıxışını təmin edən, onların intellektual və mənəvi potensialının inkişafına xidmət göstərən, elmin və təhsilin inkişaf yönümlü fəaliyyətinə dəstək göstərən struktur vahididir.",
      "KİM istifadəçilərinə informasiya təminatını, yerli və beynəlxalq təşkilatlar, dövlət qurumları, digər ali təhsil müəssisələrinin kitabxanaları ilə əməkdaşlıq çərçivəsində həyata keçirir.",
      "Kitabxana İnformasiya Mərkəzi iki şöbədən təşkil olunmuşdur: Texniki Xidmətlər Şöbəsi və İnformasiya Xidmətləri Şöbəsi.",
    ],
    departments: ["Texniki Xidmətlər Şöbəsi", "İnformasiya Xidmətləri Şöbəsi"],
    technicalTitle: "Texniki Xidmətlər Şöbəsi",
    technicalProcesses: [
      "Sorğuların qəbulu və sorğu olunan resursların analizi və statusunun müəyyənləşdirilməsi",
      "Şirkətlər, nəşriyyatlar, xarici verilənlər bazalarının nümayəndələri ilə qarşılıqlı danışıqların aparılması, onlayn və əyani şəkildə görüşlərin təşkili",
      "AzTU KİM Texniki Xidmətlər üzrə hüquqi sənədlərin hazırlanması, mövcud olan sənədlərin yenilənməsi",
      "Resursların qeyd olunan yollar ilə əldə edilməsi: Satınalma; Hədiyyə; Mübadilə yolu ilə",
      "Əldə olunan resursların lazımi qaydada yoxlanılması, sifariş yazılarının sistem üzərindən qeydiyyatı, mühasibatlıq, hüquq şöbələri ilə qarşılıqlı iş proseslərinin təşkili",
      "İnformasiya resurslarının texniki olaraq işlənilməsi: barkodların tətbiqi, möhürləmə, klassifikasiya kodları, zədəli resursların bərpası",
      "Rəqəmsallaşdırma və Kitabxana Sistemləri (RKS) xidmətləri",
    ],
    dlsTitle: "Rəqəmsallaşdırma və Kitabxana Sistemləri (RKS) Xidmətləri",
    dlsServices: [
      "Kitabxana Menecment Sistemi — kitabxananın bütün əməliyyatlarının idarə olunması, universitetin digər sistemləri ilə inteqrasiya",
      "Rəqəmsal Repozitariya Sistemi — DSpace rəqəmsal repozitariyasının idarəsi, Creative Commons, OAI-PMH, Dublin Core standartları",
      "Elektron Jurnal Platforması — beynəlxalq standartlara uyğun jurnal platforması, Crossref və ORCID inteqrasiyası",
      "Mərkəzin Veb Saytı — daxili qayda və prosedurlar, elektron və çap resursları",
      "İstinad İdarəetmə Cihazları — tədqiqat dəstəyi üçün texniki dəstək",
      "RFID Texnologiyaları — çap resurslarının təhlükəsiz dövriyyəsi",
      "Rəqəmsallaşdırma və Arxivləşdirmə — beynəlxalq standartlara (Library of Congress) uyğun uzun müddətli mühafizə",
      "Akademik Bazalardan İstifadə — abunə əsasında akademik verilənlər bazalarının fasiləsiz işi",
      "Əlçatanlıq (Accessibility) — görmə və eşitmə çatışmazlığı olan istifadəçilər üçün proqram dəstəyi",
      "Kitabxana Tətbiqləri — Online Randevu, Otaq Rezervasiyası",
      "İnformasiya Texnologiyaları — Komputerlər, Printer və Skaner, Smartboardlar",
    ],
    infoServicesTitle: "İnformasiya Xidmətləri Şöbəsi",
    infoServicesText:
      "AzTU Kitabxanasının İnformasiya Xidmətləri Şöbəsi kitabxanadan istifadə edənlərə kitabxana resursları və digər materialların verilməsini təmin edir. Dövriyyə masası, kitab rəfləri, oxu zalı, onlayn kataloqa giriş sistemlərindən ibarət olaraq kitabxananın əsas girişində yerləşir.",
    infoFunctions: [
      "Kitabxana istifadəçilərinə müvafiq materialların verilməsi (kitablar, jurnallar, audiovizual resurslar, qulaqcıqlar, qələmlər, karandaşlar, markerlər)",
      "Kitabxanadan istifadəyə dair statistik məlumatların toplanması, qaytarılan materialların yenidən yoxlanması",
      "Zədələnmiş materialları müəyyən etmək və ya təmir üçün lazımi şöbəyə təhvil vermək",
      "Dövriyyə texnologiyası problemlərinin aradan qaldırılması",
      "İstifadəçilərin qeydiyyata alınması, kitabxanadan istifadə qaydaları haqqında ilkin məlumatların verilməsi",
      "İş otaqlarının müəyyən müddət ərzində tələbələrin qrup dərsləri üçün rezerv edilməsi",
    ],
    activitiesTitle: "Fəaliyyət İstiqamətləri",
    activities: [
      "Kompleks kitabxana-informasiya xidmətləri göstərmək",
      "Çap və digər fiziki məlumat informasiya vasitələrindən istifadəni təmin etmək",
      "Elektron kataloqdan, xarici və beynəlxalq verilənlər bazalarından səmərəli istifadəni həyata keçirmək",
      "KİM istifadəçilərinin məlumat-informasiya təminatını, onların sorğuları üzrə düzgün istiqamətləndirilməsini həyata keçirmək",
      "Kitabxana-informasiya xidmətini müxtəlif üsullarla – dövriyyə xidmətləri, kitabxanalararası və beynəlxalq mübadilə, biblioqrafiya ilə təşkil etmək",
      "AzTU-nun profilinə uyğun kitabxana-informasiya resurslarının toplanılmasından, qorunaraq gələcək nəsillərə çatdırılmasından məsul olmaq",
      "İnformasiya istifadəçilərinin elektron verilənlər bazalarından, elektron arxivin axtarış imkanlarından istifadə bacarıqlarını formalaşdırmaq",
      "Qabaqcıl beynəlxalq təcrübəyə əsaslanmaqla müasir informasiya texnologiyaları vasitəsilə ənənəvi və rəqəmsal xidmət təminatını həyata keçirmək",
    ],
    purposeTitle: "Struktur Bölmənin Məqsədi",
    purpose:
      "Azərbaycan Texniki Universitetinin Kitabxana–İnformasiya Mərkəzinin istifadəçilərinin müasir informasiya mühitinə çıxışını təmin etmək, onların informasiya tələbatını ödəmək, kitabxana-informasiya resurslarından səmərəli istifadəni təşkil etmək və elmi-tədris fəaliyyətinin inkişafına dəstək göstərməkdir. Bununla yanaşı, informasiya resurslarının toplanması, qorunması və gələcək nəsillərə çatdırılması, həmçinin müasir informasiya texnologiyalarından istifadə etməklə ənənəvi və rəqəmsal kitabxana-informasiya xidmətlərinin göstərilməsi də struktur bölmənin əsas məqsədlərindəndir.",
    reportTitle: "Hesabat: 2025-ci il",
    reportIntro: [
      "Universitetimizin təhsil missiyasının mərkəzində dayanan kitabxanamız rəqəmsal və fiziki xidmətlər təklif edərək resursların əlçatanlıq balansını təmin etməyi dəstəkləyir.",
      "Bu hesabat 2025-ci il ərzində Azərbaycan Texniki Universiteti Kitabxana-İnformasiya Mərkəzinin fəaliyyətinin əsas istiqamətlərini, göstərilən xidmətlər, informasiya təminatı və kolleksiya inkişafını əhatə edir.",
      "Hesabat dövründə 83 adda, ümumilikdə 187 nüsxə kitab fondun zənginləşdirilməsi məqsədilə qəbul edilmişdir. Elektron kataloqa 17 021 nüsxə kitab beynəlxalq standartlara uyğun biblioqrafik təsvir edilərək daxil edilmişdir. 572 nəfər oxucu üçün elektron hesab açılmışdır.",
    ],
    visitorsTitle: "Aylar üzrə ziyarətçilərin sayı",
    visitors: [
      { month: "İyun", count: 1815 },
      { month: "İyul", count: 556 },
      { month: "Avqust", count: 844 },
      { month: "Sentyabr", count: 2767 },
      { month: "Oktyabr", count: 4230 },
      { month: "Noyabr", count: 4421 },
      { month: "Dekabr", count: 4987 },
    ],
    databasesTitle: "Akademik Verilənlər Bazaları",
    databases: [
      'EBSCO — "Science & Technology Collection" və "Academic Search Complete" (1 aylıq sınaq: 1 aprel – 3 may 2025)',
      "IEEE Xplore — mühəndislik və texnologiya sahəsində geniş elmi resurslar (1 aylıq sınaq)",
      "O'Reilly — 50 000+ e-kitab, 4 000 onlayn kurs, audio kitablar (1 aylıq sınaq)",
      "HeinOnline — hüquq və humanitar elmlər üzrə elektron resurslar (31 oktyabr 2025-dək)",
      "ProQuest Central — Cambridge, Springer, Elsevier, Emerald nəşriyyatları; 43 000 jurnal, 2.5 milyon konfrans materialı",
      "IEEE Computer Society Rəqəmsal Kitabxanası — kompüter elmləri üzrə 1 illik abunə",
      "Turcademy — Türkiyənin aparıcı akademik e-kitab platforması; 950+ akademik kitab (1 illik)",
      "O'Reilly — AI, proqramlaşdırma, kibertəhlükəsizlik, data elmi; 50 000+ e-kitab (1 illik tam çıxış)",
    ],
    emailQueriesTitle: "E-poçt Sorğuları",
    emailQueriesText:
      "2025-ci il ərzində ümumilikdə 79 (yetmiş doqquz) elektron poçt sorğusu cavablandırılmışdır. Daxil olan sorğuların hər biri mövzu və məzmun baxımından təhlil edilmiş, beynəlxalq elmi standartlara uyğun şəkildə cavablandırılmışdır.",
    targetsTitle: "Qarşıdakı Hədəflər",
    targets: [
      "Elektron resursların sayının artırılması",
      "Rəqəmsallaşdırma prosesinin sürətləndirilməsi",
      "WorldCat — qlobal kataloq platformasına qoşulmaq",
      "Beynəlxalq məlumat bazalarına çıxışın genişləndirilməsi",
      "Oxucular üçün innovativ xidmətlərin tətbiqi",
      "Kitabxana əməkdaşlarının peşəkar inkişafının təmin edilməsi",
    ],
    directorTitle: "Direktor",
    directorBioTitle: "Bioqrafiya",
    directorBio:
      "10 iyul 1988-ci ildə İsmayıllı rayonunda anadan olub. Orta təhsilini İsmayıllı rayon 1 saylı orta məktəbində oxuyub. 2006-2010-cu illərdə Bakı Dövlət Universitetinin İnformasiya və Sənəd Menecmenti fakültəsinin məzunu olub. 2010-2012-ci illərdə həmin fakültənin magistratura pilləsini fərqlənmə ilə bitirib.\n\nKollektivdə peşəkarlıqla işləmək və yeniliklərə doğru addımlamaq bacarığı ona tələbəlik illərində işə başlamağa yardımçı olub. 2011-2024-cü illərdə F.Köçərli adına Respublika Uşaq Kitabxanası, Azərbaycan Dillər Universiteti, Milli Aviasiya Akademiyasının Elmi kitabxana və informasiya mərkəzlərində çalışıb. 2019-2021-ci illərdə Bakı Dövlət Universitetinin İnformasiya və sənəd menecmenti fakültəsində pedaqoji fəaliyyət göstərib.",
    directorEducationTitle: "Təhsil",
    directorEducation: [
      {
        period: "2006–2010",
        degree:
          "Bakı Dövlət Universiteti — Kitabxanaşünaslıq və biblioqrafiya / Bakalavr",
      },
      {
        period: "2010–2012",
        degree:
          "Bakı Dövlət Universiteti — Kitabxana fondlarının formalaşması və istifadəsi / Magistr (fərqlənmə ilə)",
      },
    ],
    director: {
      name: "Ələkbərova Mətanət Rahid qızı",
      degree: "Magistr dərəcəsi",
      email: "matanat.alakbarova@aztu.edu.az",
      phone: "17-00",
      office: "VIII korpus, 2-ci və 3-cü mərtəbə",
      hours: "09:00 – 17:30",
    },
    staffTitle: "Əməkdaşlar",
    staff: [
      {
        name: "İbrahimov İltifat Əli",
        degree: "Magistr dərəcəsi",
        email: "iltifat.ibrahimov@aztu.edu.az",
        phone: "+994 55 204 28 75",
      },
      {
        name: "Hacıyeva Xəyalə Nurullah",
        degree: "Magistr dərəcəsi",
        email: "khayala.hajiyeva@aztu.edu.az",
        phone: "+994 50 981 99 62",
      },
      {
        name: "Cəfərova Yeganə Vidadi",
        degree: "Bakalavr",
        email: "yegane.jafarova@aztu.edu.az",
        phone: "+994 55 829 25 95",
      },
      {
        name: "Quliyev Tural Arif",
        degree: "Bakalavr",
        email: "tural.guliyev@aztu.edu.az",
        phone: "+994 50 552 64 15",
      },
      {
        name: "Əliyeva Məhsəti Baloğlan",
        degree: "Magistr dərəcəsi",
        email: "mahsati.aliyeva@aztu.edu.az",
        phone: "+994 77 720 19 99",
      },
      {
        name: "Mürsəlova Cavahir Camaləddin",
        degree: "Magistr dərəcəsi",
        email: "javahir.mursalova@aztu.edu.az",
        phone: "+994 55 601 08 29",
      },
      {
        name: "Nəsirova Fidan Ramin",
        degree: "Bakalavr",
        email: "fidan.nasirova@aztu.edu.az",
        phone: "+994 77 766 65 49",
      },
      {
        name: "Məmmədova Şəfiqə Maşallah",
        degree: "Bakalavr",
        email: "shafiga.mammadova.m@aztu.edu.az",
        phone: "+994 55 941 14 42",
      },
    ],
    contactTitle: "Əlaqə",
    contact: {
      building: "VIII korpus (ikinci və üçüncü mərtəbə)",
      phone: "17 00 / 17 01",
      email: "library.services@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Əsasnamə",
  },
  en: {
    eyebrow: "Management",
    breadcrumbSection: "Offices & Centers",
    title: "Library Information Center",
    subtitle:
      "A structural unit providing access to modern information and communication environments for students, academic and administrative staff",
    aboutTitle: "General Information",
    aboutText: [
      "Library Information Center is a structural unit that provides access to modern information and communication environments for students, academic and administrative staff, serves the development of their intellectual and moral potential, and supports the development-oriented activities of science and education.",
      "The Library Information Center provides information to users in cooperation with local and international organizations, state agencies, and libraries of other higher education institutions.",
      "The Library Information Center is organized into two departments: Technical Services Department and Information Services Department.",
    ],
    departments: [
      "Technical Services Department",
      "Information Services Department",
    ],
    technicalTitle: "Technical Services Department",
    technicalProcesses: [
      "Receiving requests, analyzing, and determining the status of requested resources",
      "Conducting mutual negotiations with company representatives, publishers, and foreign databases, organizing meetings (online and face-to-face)",
      "Preparation of legal documents for AzTU LIC, Technical Services, and updating existing documents",
      "Obtaining resources: Purchase (procurement); Gift and donation; By exchange",
      "Proper verification of obtained resources, registration of order records, controlling the library services aspects of contracts, organization of work with accounting and legal departments",
      "Technical processing: applying barcodes, stamping, printing classification codes, restoration of damaged resources",
      "Digitalization and Library Systems (DLS) services",
    ],
    dlsTitle: "Digitalization and Library Systems (DLS) Services",
    dlsServices: [
      "Library Management System — full functionality across modules, daily operations monitoring, integrations with other university systems",
      "Digital Repository System — AzTU Digital Repository management, Creative Commons, OAI-PMH, Dublin Core standards",
      "Electronic Journal Platform — journal platform per international standards, Crossref and ORCID integration",
      "Website — internal rules, electronic and printed resources, direct contact methods",
      "Reference Management Devices — technical support for reference management tools",
      "RFID Technologies — secure and free circulation of print resources",
      "Digitization and Archiving — long-term preservation per international standards (Library of Congress)",
      "Academic Database Access — technical support for uninterrupted use of subscribed databases",
      "Accessibility — software supporting special accessibility standards for visually and hearing-impaired users",
      "Library Applications — Online Appointment, Room Reservation",
      "Information Technologies — Computers, Printer and Scanner, Smartboards",
    ],
    infoServicesTitle: "Information Services Department",
    infoServicesText:
      "The Information Services Department of the AzTU Library provides library resources and other materials to library users. Located at the main entrance, it consists of a circulation desk, bookshelves, a reading room, and online catalog access systems.",
    infoFunctions: [
      "Providing library users with relevant materials (books, journals, audiovisual resources, headphones, pens, pencils, markers)",
      "Accumulating statistical data on library usage, rechecking of returned materials",
      "Identify damaged materials or transfer them to the appropriate department for repair or replacement",
      "Eliminate circulation technology problems (kiosks, scanners, printers)",
      "Registration of users, providing initial information about library usage rules",
      "Reserving study rooms for group classes of students for a certain period",
    ],
    activitiesTitle: "Areas of Activity",
    activities: [
      "Provide comprehensive library and information services",
      "Ensure the use of printed and other physical information and information media",
      "Effectively use the electronic catalog, foreign and international databases",
      "Provide information and information support to users, and direct them correctly to their requests",
      "Organize library and information services in various ways — circulation services, inter-library and international exchange, bibliography, individual and mass, written and oral, on-site and remotely",
      "Be responsible for collecting library and information resources in accordance with the profile of AzTU, preserving them and delivering them to future generations",
      "Teach information users how to search for and obtain information, use electronic databases and electronic archives",
      "Implement traditional and digitalized information service provision based on advanced international experience and modern information technologies",
    ],
    purposeTitle: "Purpose of the Structural Unit",
    purpose:
      "Library-Information Center of Azerbaijan Technical University is to provide users with access to a modern information environment, meet their information needs, organize the efficient use of library-information resources, and support the development of scientific and educational activities. Along with this, the collection, preservation, and delivery of information resources to future generations, as well as the provision of traditional and digital library-information services using modern information technologies, are also among the main goals of the structural unit.",
    reportTitle: "Annual Report: 2025",
    reportIntro: [
      "Our library, at the center of the university's educational mission, supports the accessibility balance of resources by offering digital and physical services.",
      "This report covers the main directions of AzTU Library Information Center's activities in 2025, including services rendered, information provision, and collection development.",
      "During the reporting period, 83 titles totaling 187 copies were added to the collection. 17,021 book copies were entered into the electronic catalog per international bibliographic standards. 572 reader accounts were created.",
    ],
    visitorsTitle: "Monthly Visitor Statistics",
    visitors: [
      { month: "June", count: 1815 },
      { month: "July", count: 556 },
      { month: "August", count: 844 },
      { month: "September", count: 2767 },
      { month: "October", count: 4230 },
      { month: "November", count: 4421 },
      { month: "December", count: 4987 },
    ],
    databasesTitle: "Academic Databases",
    databases: [
      'EBSCO — "Science & Technology Collection" and "Academic Search Complete" (1-month trial: April 1 – May 3, 2025)',
      "IEEE Xplore — leading scientific and technical database in engineering and technology (1-month trial)",
      "O'Reilly — 50,000+ e-books, 4,000 online courses, audio books (1-month trial)",
      "HeinOnline — leading electronic resources in law and humanities (until October 31, 2025)",
      "ProQuest Central — Cambridge, Springer, Elsevier, Emerald; 43,000 journals, 2.5M conference papers",
      "IEEE Computer Society Digital Library — 1-year subscription for computer science and engineering",
      "Turcademy — leading Turkish academic e-book platform; 950+ academic books (1-year)",
      "O'Reilly — AI, programming, cybersecurity, data science; 50,000+ e-books (1-year full access)",
    ],
    emailQueriesTitle: "Email Query Statistics",
    emailQueriesText:
      "During 2025, a total of 79 (seventy-nine) email queries were answered. Each incoming query was analyzed by subject and content, with a systematic search process conducted to precisely identify the relevant information need.",
    targetsTitle: "Future Targets",
    targets: [
      "Increase the number of electronic resources",
      "Accelerate the digitalization process",
      "Join WorldCat — global catalog platform",
      "Expand access to international databases",
      "Implement innovative services for readers",
      "Ensure professional development of library staff",
    ],
    directorTitle: "Director",
    directorBioTitle: "Biography",
    directorBio:
      "Born on July 10, 1988, in Ismayilli district. She completed her secondary education at Ismayilli District Secondary School No. 1. From 2006 to 2010, she graduated from the Faculty of Information and Document Management at Baku State University. She completed her master's degree at the same faculty with distinction in 2012.\n\nHer ability to work professionally in a team and embrace innovations helped her start her career during her student years. Between 2011 and 2024, she worked at the F. Kocherli Republican Children's Library, Azerbaijan University of Languages, and Scientific Library and Information Centers of the National Aviation Academy. From 2019 to 2021, she was involved in teaching at the Faculty of Information and Document Management at Baku State University.",
    directorEducationTitle: "Education",
    directorEducation: [
      {
        period: "2006–2010",
        degree:
          "Baku State University — Library Science and Bibliography / Bachelor's Degree",
      },
      {
        period: "2010–2012",
        degree:
          "Baku State University — Formation and Use of Library Collections / Master's Degree (with distinction)",
      },
    ],
    director: {
      name: "Matanat Alakbarova Rahid qizi",
      degree: "Master's Degree",
      email: "matanat.alakbarova@aztu.edu.az",
      phone: "17-00",
      office: "Building VIII, 2nd and 3rd floor",
      hours: "09:00 – 17:30",
    },
    staffTitle: "Staff",
    staff: [
      {
        name: "Iltifat Ibrahimov Ali",
        degree: "Master's Degree",
        email: "iltifat.ibrahimov@aztu.edu.az",
        phone: "+994 55 204 28 75",
      },
      {
        name: "Khayala Hajiyeva Nurullah",
        degree: "Master's Degree",
        email: "khayala.hajiyeva@aztu.edu.az",
        phone: "+994 50 981 99 62",
      },
      {
        name: "Yegana Jafarova Vidadi",
        degree: "Bachelor's Degree",
        email: "yegane.jafarova@aztu.edu.az",
        phone: "+994 55 829 25 95",
      },
      {
        name: "Tural Guliyev Arif",
        degree: "Bachelor's Degree",
        email: "tural.guliyev@aztu.edu.az",
        phone: "+994 50 552 64 15",
      },
      {
        name: "Mahsati Aliyeva Baloghlan",
        degree: "Master's Degree",
        email: "mahsati.aliyeva@aztu.edu.az",
        phone: "+994 77 720 19 99",
      },
      {
        name: "Javahir Mursalova Jamaladdin",
        degree: "Master's Degree",
        email: "javahir.mursalova@aztu.edu.az",
        phone: "+994 55 601 08 29",
      },
      {
        name: "Fidan Nasirova Ramin",
        degree: "Bachelor's Degree",
        email: "fidan.nasirova@aztu.edu.az",
        phone: "+994 77 766 65 49",
      },
      {
        name: "Shafiga Mammadova Mashallah",
        degree: "Bachelor's Degree",
        email: "shafiga.mammadova.m@aztu.edu.az",
        phone: "+994 55 941 14 42",
      },
    ],
    contactTitle: "Contact",
    contact: {
      building: "Building VIII (2nd and 3rd floor)",
      phone: "17 00 / 17 01",
      email: "library.services@aztu.edu.az",
      hours: "09:00 – 17:30",
    },
    esasname: "Statute",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KitabxanaInformasiyaMerkeziPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const maxVisitors = Math.max(...p.visitors.map((v) => v.count));
  const BAR_MAX_HEIGHT = 200;

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1330]" />
          <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(white 0.5px, transparent 0.5px)",
              backgroundSize: "32px 32px",
            }}
          />
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

          {/* ── Əsasnamə Button ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-start"
          >
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-[#ee7c7e] text-[#ee7c7e] font-black text-sm uppercase tracking-widest hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#ee7c7e]/30 hover:shadow-lg"
            >
              <ArticleIcon fontSize="small" />
              {p.esasname}
            </Link>
          </motion.div>

          {/* ── 1. About + Director Card ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
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

              {/* Departments chips */}
              <div className="mt-10 flex flex-wrap gap-4">
                {p.departments.map((dep, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 border border-[#1a2355]/10 dark:border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#ee7c7e]" />
                    <span className="text-sm font-bold text-[#1a2355] dark:text-white">
                      {dep}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Director card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                <h3 className="text-xl font-black text-[#1a2355] dark:text-white">
                  {p.directorTitle}
                </h3>
              </div>
              <PersonCard
                fullName={p.director.name}
                academicDegree={p.director.degree}
                title={p.directorTitle}
                email={p.director.email}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.office}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <AccessTimeIcon
                    className="text-[#ee7c7e]"
                    fontSize="small"
                  />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.hours}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 2. Technical Services ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-white/5 rounded-[3rem] p-10 md:p-14 border border-gray-100 dark:border-white/10"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.technicalTitle}
              </h2>
            </div>
            <ol className="space-y-6">
              {p.technicalProcesses.map((proc, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] font-black text-sm shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] pt-1.5">
                    {proc}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* ── 3. DLS Services ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <StorageIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black">{p.dlsTitle}</h2>
            </div>
            <ul className="space-y-4">
              {p.dlsServices.map((svc, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ee7c7e]/20 flex items-center justify-center text-[#ee7c7e] font-black text-[11px] shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{svc}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── 4. Information Services ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-white/5 rounded-[3rem] p-10 md:p-14 border border-gray-100 dark:border-white/10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <MenuBookIcon sx={{ fontSize: 200 }} />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.infoServicesTitle}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10 text-justify">
              {p.infoServicesText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.infoFunctions.map((fn, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                >
                  <CheckCircleOutlineIcon
                    className="text-[#ee7c7e] shrink-0 mt-0.5"
                    fontSize="small"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {fn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 5. Areas of Activity ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.activitiesTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {p.activities.map((act, i) => (
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {act}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 6. Purpose ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a2355] rounded-[3rem] p-10 md:p-16 text-white"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black">{p.purposeTitle}</h2>
            </div>
            <p className="text-white/80 text-lg leading-relaxed text-justify max-w-5xl">
              {p.purpose}
            </p>
          </motion.div>

          {/* ── 7. Annual Report ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
              <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">
                {p.reportTitle}
              </h2>
            </div>

            {/* Intro paragraphs */}
            <div className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10 space-y-5">
              {p.reportIntro.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Visitor Chart */}
            <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 md:p-14 border border-gray-100 dark:border-white/10 shadow-sm">
              <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-12">
                {p.visitorsTitle}
              </h3>
              <div
                className="flex items-end gap-3 md:gap-6"
                style={{ height: BAR_MAX_HEIGHT + 60 }}
              >
                {p.visitors.map((v, i) => {
                  const barHeight = Math.round(
                    (v.count / maxVisitors) * BAR_MAX_HEIGHT
                  );
                  const isMax = v.count === maxVisitors;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 flex-1 min-w-0"
                    >
                      {/* Count label above bar */}
                      <span
                        className={`text-xs font-black ${
                          isMax
                            ? "text-[#ee7c7e]"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {v.count.toLocaleString()}
                      </span>
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-xl transition-all duration-700 ${
                          isMax ? "bg-[#ee7c7e]" : "bg-[#1a2355] dark:bg-[#ee7c7e]/40"
                        }`}
                        style={{ height: barHeight }}
                      />
                      {/* Month label below */}
                      <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 text-center leading-tight">
                        {v.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Databases */}
            <div className="bg-[#1a2355] rounded-[2.5rem] p-10 md:p-14 text-white">
              <h3 className="text-xl font-black mb-8">{p.databasesTitle}</h3>
              <ol className="space-y-4">
                {p.databases.map((db, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-lg bg-[#ee7c7e]/20 flex items-center justify-center text-[#ee7c7e] font-black text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{db}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Email Queries */}
            <div className="bg-[#ee7c7e]/10 border border-[#ee7c7e]/20 rounded-[2rem] p-10">
              <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-4">
                {p.emailQueriesTitle}
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#ee7c7e] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-3xl">79</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {p.emailQueriesText}
                </p>
              </div>
            </div>

            {/* Future Targets */}
            <div className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-8">
                {p.targetsTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {p.targets.map((target, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#1a2355] dark:bg-[#ee7c7e]/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#ee7c7e]" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                      {target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── 8. Director Bio ──────────────────────────────────────────── */}
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
                    {p.director.name}
                  </h2>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ee7c7e] mb-6">
                  {p.directorBioTitle}
                </h3>
                <div className="space-y-6">
                  {p.directorBio.split("\n\n").map((para, i) => (
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
                  {p.directorEducationTitle}
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10" />
                  <div className="space-y-8">
                    {p.directorEducation.map((edu, i) => (
                      <div key={i} className="relative pl-14">
                        {/* Dot */}
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
              <PersonCard
                fullName={p.director.name}
                academicDegree={p.director.degree}
                title={p.directorTitle}
                email={p.director.email}
                size="lg"
              />
              <div className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-gray-100 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <PhoneIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <EmailIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold break-all">
                    {p.director.email}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <BusinessIcon className="text-[#ee7c7e]" fontSize="small" />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.office}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <AccessTimeIcon
                    className="text-[#ee7c7e]"
                    fontSize="small"
                  />
                  <span className="text-gray-600 dark:text-gray-300 font-bold">
                    {p.director.hours}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── 9. Staff Grid ────────────────────────────────────────────── */}
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
                    email={member.email}
                  />
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-400 pl-2">
                    <PhoneIcon
                      sx={{ fontSize: 13 }}
                      className="text-[#ee7c7e]"
                    />
                    {member.phone}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 10. Contact ──────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12">
              {p.contactTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <BusinessIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 text-center">
                  {p.contact.building}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <PhoneIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.contact.phone}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <EmailIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300 break-all">
                  {p.contact.email}
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                  <AccessTimeIcon />
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                  {p.contact.hours}
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
