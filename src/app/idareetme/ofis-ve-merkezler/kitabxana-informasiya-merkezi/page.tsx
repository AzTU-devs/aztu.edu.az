"use client";

import Link from "next/link";
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
import StorageIcon from "@mui/icons-material/Storage";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

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

/** Inner block used inside the annual-report card, one per report chapter. */
const PANEL =
  "rounded-xl border border-slate-200 bg-slate-50/60 p-5 dark:border-white/10 dark:bg-white/5 md:p-6";

const PANEL_HEADING =
  "text-[11px] font-black uppercase tracking-[0.22em] text-[#1a2355] dark:text-white";

const BAR_MAX_HEIGHT = 200;

export default function KitabxanaInformasiyaMerkeziPage() {
  const { lang } = useLanguage();
  const p = DATA[lang];

  const maxVisitors = Math.max(...p.visitors.map((v) => v.count));

  const sections = [
    {
      id: "about",
      label: p.aboutTitle,
      description: lang === "az" ? "Ümumi məlumat" : "Overview",
      icon: InfoOutlinedIcon,
    },
    {
      id: "purpose",
      label: p.purposeTitle,
      description: lang === "az" ? "Nəyə çalışırıq" : "What we aim for",
      icon: FlagOutlinedIcon,
    },
    {
      id: "technical",
      label: p.technicalTitle,
      description: lang === "az" ? "İş prosesləri" : "Work processes",
      icon: SettingsOutlinedIcon,
    },
    {
      id: "dls",
      label: p.dlsTitle,
      description: lang === "az" ? "Rəqəmsal xidmətlər" : "Digital services",
      icon: StorageIcon,
    },
    {
      id: "info-services",
      label: p.infoServicesTitle,
      description: lang === "az" ? "Oxucu xidmətləri" : "Reader services",
      icon: MenuBookIcon,
    },
    {
      id: "activities",
      label: p.activitiesTitle,
      description: lang === "az" ? "Nə edirik" : "What we do",
      icon: CheckCircleOutlineIcon,
    },
    {
      id: "report",
      label: p.reportTitle,
      description: lang === "az" ? "Statistika və hədəflər" : "Statistics & targets",
      icon: BarChartIcon,
    },
    {
      id: "director",
      label: p.directorTitle,
      description: lang === "az" ? "Bioqrafiya və təhsil" : "Biography & education",
      icon: PersonOutlineIcon,
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
        <span className="block break-words text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
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
      stat={{ value: String(p.staff.length), label: lang === "az" ? "əməkdaş" : "staff" }}
    >
      {/* ── About ─────────────────────────────────────────────────────────── */}
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

          <div className="mt-7 flex flex-wrap gap-3">
            {p.departments.map((dep, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 dark:border-white/10 dark:bg-white/5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e]" />
                <span className="text-[13px] font-black text-[#1a2355] dark:text-white">
                  {dep}
                </span>
              </span>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* ── Purpose ───────────────────────────────────────────────────────── */}
      <section id="purpose" className="scroll-mt-28">
        <SectionCard
          icon={FlagOutlinedIcon}
          eyebrow={lang === "az" ? "Nəyə çalışırıq" : "What we aim for"}
          title={p.purposeTitle}
        >
          <p className="text-flow text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.purpose}
          </p>
        </SectionCard>
      </section>

      {/* ── Technical Services Department ─────────────────────────────────── */}
      <section id="technical" className="scroll-mt-28">
        <SectionCard
          icon={SettingsOutlinedIcon}
          eyebrow={lang === "az" ? "İş prosesləri" : "Work processes"}
          title={p.technicalTitle}
          action={counter(p.technicalProcesses.length)}
        >
          <NumberedList items={p.technicalProcesses.map((proc) => proc)} />
        </SectionCard>
      </section>

      {/* ── Digitalization & Library Systems ──────────────────────────────── */}
      <section id="dls" className="scroll-mt-28">
        <SectionCard
          icon={StorageIcon}
          eyebrow={lang === "az" ? "Rəqəmsal xidmətlər" : "Digital services"}
          title={p.dlsTitle}
          action={counter(p.dlsServices.length)}
        >
          <NumberedList items={p.dlsServices.map((svc) => svc)} />
        </SectionCard>
      </section>

      {/* ── Information Services Department ───────────────────────────────── */}
      <section id="info-services" className="scroll-mt-28">
        <SectionCard
          icon={MenuBookIcon}
          eyebrow={lang === "az" ? "Oxucu xidmətləri" : "Reader services"}
          title={p.infoServicesTitle}
          action={counter(p.infoFunctions.length)}
        >
          <p className="text-flow mb-7 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
            {p.infoServicesText}
          </p>
          <NumberedList items={p.infoFunctions.map((fn) => fn)} />
        </SectionCard>
      </section>

      {/* ── Areas of activity ─────────────────────────────────────────────── */}
      <section id="activities" className="scroll-mt-28">
        <SectionCard
          icon={CheckCircleOutlineIcon}
          eyebrow={lang === "az" ? "Nə edirik" : "What we do"}
          title={p.activitiesTitle}
          action={counter(p.activities.length)}
        >
          <NumberedList items={p.activities.map((act) => act)} />
        </SectionCard>
      </section>

      {/* ── Annual report ─────────────────────────────────────────────────── */}
      <section id="report" className="scroll-mt-28">
        <SectionCard
          icon={BarChartIcon}
          eyebrow={lang === "az" ? "İllik hesabat" : "Annual report"}
          title={p.reportTitle}
        >
          <div className="space-y-6">
            <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
              {p.reportIntro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Monthly visitors */}
            <div className={PANEL}>
              <h3 className={`${PANEL_HEADING} mb-5`}>{p.visitorsTitle}</h3>
              <div className="overflow-x-auto">
                <div
                  className="flex min-w-[420px] items-end gap-3 md:gap-6"
                  style={{ height: BAR_MAX_HEIGHT + 60 }}
                >
                  {p.visitors.map((v, i) => {
                    const barHeight = Math.round((v.count / maxVisitors) * BAR_MAX_HEIGHT);
                    const isMax = v.count === maxVisitors;
                    return (
                      <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                        <span
                          className={`text-xs font-black tabular-nums ${
                            isMax ? "text-[#ee7c7e]" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {v.count.toLocaleString()}
                        </span>
                        <div
                          className={`w-full rounded-t-xl transition-all duration-700 ${
                            isMax ? "bg-[#ee7c7e]" : "bg-[#1a2355] dark:bg-[#ee7c7e]/40"
                          }`}
                          style={{ height: barHeight }}
                        />
                        <span className="text-center text-[10px] font-bold leading-tight text-slate-500 dark:text-slate-400 md:text-xs">
                          {v.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Academic databases */}
            <div className={PANEL}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className={PANEL_HEADING}>{p.databasesTitle}</h3>
                {counter(p.databases.length)}
              </div>
              <NumberedList items={p.databases.map((db) => db)} />
            </div>

            {/* Email queries */}
            <div className={PANEL}>
              <h3 className={`${PANEL_HEADING} mb-5`}>{p.emailQueriesTitle}</h3>
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1a2355] text-2xl font-black tabular-nums text-white">
                  79
                </span>
                <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {p.emailQueriesText}
                </p>
              </div>
            </div>

            {/* Future targets */}
            <div className={PANEL}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className={PANEL_HEADING}>{p.targetsTitle}</h3>
                {counter(p.targets.length)}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {p.targets.map((target, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1a2355]/[0.06] dark:bg-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e]" />
                    </span>
                    <p className="text-[13px] font-bold text-slate-600 dark:text-slate-300">
                      {target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* ── Director ──────────────────────────────────────────────────────── */}
      <section id="director" className="scroll-mt-28">
        <SectionCard
          icon={PersonOutlineIcon}
          eyebrow={lang === "az" ? "Rəhbərlik" : "Leadership"}
          title={p.directorTitle}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className={`${PANEL_HEADING} mb-5`}>{p.directorBioTitle}</h3>
              <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                {p.directorBio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h3 className={`${PANEL_HEADING} mb-5 mt-8`}>{p.directorEducationTitle}</h3>
              <div className="relative">
                <div className="absolute bottom-1 left-[9px] top-1 w-px bg-slate-200 dark:bg-white/10" />
                <div className="space-y-6">
                  {sortEducations(p.directorEducation).map((edu, i) => (
                    <div key={i} className="relative pl-9">
                      <span className="absolute left-0 top-1 h-[19px] w-[19px] rounded-full border-4 border-white bg-[#ee7c7e] dark:border-slate-900" />
                      <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.22em] text-[#ee7c7e]">
                        {edu.period}
                      </span>
                      <p className="text-[14px] font-bold leading-relaxed text-[#1a2355] dark:text-white">
                        {edu.degree}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <StaffCard
                fullName={p.director.name}
                role={p.directorTitle}
                degree={p.director.degree}
                email={p.director.email}
                phone={p.director.phone}
                index={0}
              />
              {factTile(
                BusinessIcon,
                lang === "az" ? "Ofis" : "Office",
                p.director.office
              )}
              {factTile(
                AccessTimeIcon,
                lang === "az" ? "İş saatları" : "Working hours",
                p.director.hours
              )}
            </div>
          </div>
        </SectionCard>
      </section>

      {/* ── Staff ─────────────────────────────────────────────────────────── */}
      <section id="staff" className="scroll-mt-28">
        <SectionCard
          icon={GroupsIcon}
          eyebrow={lang === "az" ? "Heyət" : "Team"}
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

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-28">
        <SectionCard
          icon={CallOutlinedIcon}
          eyebrow={lang === "az" ? "Bizə yazın" : "Get in touch"}
          title={p.contactTitle}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {factTile(
              BusinessIcon,
              lang === "az" ? "Ünvan" : "Address",
              p.contact.building
            )}
            {factTile(PhoneIcon, lang === "az" ? "Telefon" : "Phone", p.contact.phone)}
            {factTile(
              EmailIcon,
              lang === "az" ? "E-poçt" : "Email",
              p.contact.email,
              `mailto:${p.contact.email}`
            )}
            {factTile(
              AccessTimeIcon,
              lang === "az" ? "İş saatları" : "Working hours",
              p.contact.hours
            )}
          </div>
        </SectionCard>
      </section>
    </OfficeShell>
  );
}
