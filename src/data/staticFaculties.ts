export interface StaticFaculty {
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
}

import type { CafedraInterface } from "@/services/cafedraService/cafedraService";
import type { FacultyDetail, FacultyPerson, SectionItem } from "@/services/facultyService/facultyService";

export interface StaticCafedra {
  cafedra_id: number;
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
  purpose?: string;
  main_directions?: string[];
  stats?: { label: string; value: string }[];
}

export const STATIC_FACULTIES: StaticFaculty[] = [
  {
    faculty_id: 1,
    name: " İnformasiya texnologiyaları və telekommunikasiya fakültəsi",
    short_name: "ITT",
    description:
      "Azərbaycan Texniki Universitetinin (AzTU) İnformasiya texnologiyaları və telekommunikasiya fakültəsi ölkənin rəqəmsal inkişafında strateji rol oynayan aparıcı tədris  mərkəzlərindən biridir. Fakültədə müasir informasiya texnologiyaları, telekommunikasiya sistemləri və rəqəmsal transformasiya istiqamətlərində yüksək ixtisaslı kadrlar hazırlanır. Sürətlə dəyişən texnoloji mühitdə ölkənin dayanıqlı inkişafı üçün rəqabətqabiliyyətli, analitik düşüncəyə malik və innovativ mühəndislərin yetişdirilməsi mühüm əhəmiyyət daşıyır. Tədris və elmi fəaliyyət sənaye  tələblərinə uyğun şəkildə qurulur.",
    is_active: true,
  },
  {
    faculty_id: 2,
    name: "Nəqliyyat və logistika fakültəsi",
    short_name: "NL",
    description:
      "Nəqliyyat və logistika fakültəsi 1950-ci ildən fəaliyyətə başlayıb. 1950-ci ildə Azərbaycan Politexnik İnstitutu (indiki Azərbaycan Texniki Universiteti) fəaliyyətə başladığı zaman bu fakültə Mexanika adlanıb. Sonralar fakültənin adı dəyişdirilərək Avtonəqliyyat, Nəqliyyat, Avtomexanika və dəmir yolu nəqliyyatı adlanıb. 2019-cu ildən fakültə Nəqliyyat və logistika adı ilə fəaliyyət göstərir. Təhsil azərbaycan və rus dillərində aparılır.",
    is_active: true,
  },
  {
    faculty_id: 3,
    name: " Energetika fakültəsi",
    short_name: "",
    description:
      "Energetika fakültəsi ölkəmizdə fəaliyyət göstərən müvafiq sənaye müəssisələrini mühəndis kadrlara olan ehtiyacını ödəmək üçün 1964-cü ildə Ç.İldırım adına Azərbaycan Politexnik İnstitutunda (indiki Azərbaycan Texniki Universiteti) Elektrotexnika adı ilə yaradılıb. Fakültə 2001-ci ildən Elektrotexnika və energetika fakültəsi adlandırılıb. Azərbaycan Respublikası müstəqillik qazandıqdan sonra ölkə iqtisadiyyatında baş verən köklü dəyişikliklər, enerji sahələrinin idarəedilməsinin intellektuallaşdırılması, ekoloji problemlərin həlli və yaşıl enerji texnologiyalarının enerjisistemə inteqrasiyası kadr hazırlığı strategiyasına yenidən baxılması fakültənin strukturunda dəyişikliklərin edilməsi və genişləndirilməsi zəruriliyini nəzərə alarq, 2021-ci ildə universitetin Elmi şurasının qərarı ilə fakültə Energetika və avtomatika, 05.07.2025-ci il tarixli 08 nömrəli qərarı ilə isə, əmək bazarının tələbləri nəzərə alınaraq fakültənin strukturunda yenidən əhəmiyyətli dəyişikliklər edilərək, fakültə “Energetika” olaraq adlandırılıb.",
    is_active: true,
  },
  {
    faculty_id: 4,
    name: "Maşınqayırma və metallurgiya fakültəsi",
    short_name: "EEF",
    description:
      "Fakültə ölkəmizdə fəaliyyət göstərən müvafiq sənaye müəssisələrinin mühəndis kadrlara olan ehtiyacını ödəmək üçün 1982-ci ildə Ç.İldırım adına Azərbaycan Politexnik İnstitutunda (indiki Azərbaycan Texniki Universiteti) Maşınqayırma fakültəsi adı altında yaradılmışdır. Azərbaycan Respublikası müstəqillik qazandıqdan sonra yeni müasir ixtisaslara müvafiq olaraq fakültə xeyli genişləndirilmiş və fakültənin strukturunda əhəmiyyətli dəyişikliklər edilmişdir. Buna müvafiq olaraq, AzTU-nun Elmi şurasının 05.07.2025-ci il tarixli 08 nömrəli qərarı ilə fakültə Maşınqayırma və metallurgiya olaraq adlandırılıb.",
    is_active: true,
  },
  {
    faculty_id: 5,
    name: "Xüsusi texnika və texnologiya fakültəsi",
    short_name: "XTT",
    description:
      "Xüsusi texnika və texnologiya fakültəsi Azərbaycan Respublikası müdafiə sənayesi kompleksi üçün yüksək ixtisaslı kadrların hazırlanması məqsədilə Nazirlər Kabinetinin 07.06.2011-ci il tarixli 91 nömrəli qərarı ilə yaradılıb. Fakültədə nəzəri və praktiki dərslər universitetlə yanaşı, həftədə bir və ya bir neçə gün Müdafiə Sənayesi Nazirliyinin tabeliyində olan zavodlarda, həmçinin sənaye müəssisələrinin təlim mərkəzlərində yaradılmış geniş auditoriyalarda və istehsalat sahələrində keçirilir.Fakültənin III və IV kurs tələbələri müdafiə sənayesi kompleksinə daxil olan müəssisələrdə istehsalat təcrübəsinə cəlb olunurlar. Onlar kurs layihələri və buraxılış işlərini yerinə yetirməklə istehsalat proseslərinin təkmilləşdirilməsinə dair təkliflər irəli sürürlər.",
    is_active: true,
  },
  {
    faculty_id: 6,
    name: "Sənaye iqtisadiyyatı və menecment fakültəsi",
    short_name: "NMM",
    description:
      "Ölkəmizin iqtisadi inkişaf strategiyası yeni dövrün çağırışlarına uyğun olaraq, iqtisadi məsələləri dərindən bilən, müasir idarəetmə və biznes prinsiplərinə bələd olan yüksək ixtisaslı mütəxəssislərin hazırlanmasını zəruri etmişdir. Məhz bu ehtiyacı nəzərə alaraq, 1995-ci ildə Azərbaycan Texniki Universitetində (AzTU) Mühəndis biznesi və menecment fakültəsi yaradılmışdır.",
    is_active: true,
  },
];

export const STATIC_CAFEDRAS: StaticCafedra[] = [
  // Faculty 1 – İTSM
  {
    cafedra_id: 101,
    faculty_id: 1,
    name: "Kompüter Elmləri kafedras",
    short_name: "KEK",
    description:
      "Proqramlaşdırma, alqoritmlər, süni intellekt və məlumat strukturları sahəsini əhatə edən kafedra.",
    is_active: true,
  },
  {
    cafedra_id: 102,
    faculty_id: 1,
    name: "İnformasiya Sistemləri kafedras",
    short_name: "İSK",
    description:
      "İnformasiya sistemlərinin layihələndirilməsi, verilənlər bazaları idarəetməsi və sistem analizi kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 103,
    faculty_id: 1,
    name: "Kibertəhlükəsizlik kafedras",
    short_name: "KTK",
    description:
      "Kibertəhlükəsizlik kafedrası Azərbaycan Texniki Universiteti (AzTU) Elmi Şurasının 12 iyul 2022-ci il tarixli qərarı ilə yaradılmışdır. Kafedra regionda kibertəhlükəsizlik və informasiya təhlükəsizliyi sahəsində təhsil və elmi-tədqiqat üzrə qabaqcıl mərkəzə çevrilməyi qarşısına məqsəd qoymuşdur.",
    purpose:
      "Kafedranın missiyası innovativ və kreativ düşüncəyə malik, analitik bacarıqları inkişaf etmiş, müasir texnologiyalar əsasında effektiv həllər təqdim edə bilən yüksək ixtisaslı mütəxəssislər hazırlamaqdır. Bu mütəxəssislər informasiya təhlükəsizliyi sahəsində yeni yanaşmaların formalaşdırılması və cəmiyyətin rəqəmsal təhlükəsizliyinin təmin edilməsinə töhfə verirlər.",
    main_directions: [
      "İnformasiya təhlükəsizliyi üzrə müasir və beynəlxalq standartlara uyğun tədris proqramlarının hazırlanması və tətbiqi",
      "Sənaye və dövlət qurumları ilə əməkdaşlıq çərçivəsində praktiki bacarıqlara malik mütəxəssislərin hazırlanması",
      "Kritik informasiya infrastrukturunun qorunması üçün metod və texnologiyaların inkişaf etdirilməsi",
      "Müxtəlif sektorlar üzrə informasiya təhlükəsizliyinin təmin edilməsi istiqamətində elmi tədqiqatların aparılması və innovativ həllərin işlənməsi",
    ],
    stats: [
      { label: "Bakalavr proqramları", value: "1" },
      { label: "Magistratura proqramları", value: "5" },
      { label: "Doktorantura proqramları", value: "2+" },
      { label: "Beynəlxalq əməkdaşlıq", value: "7+" },
      { label: "Laboratoriyalar", value: "3" },
      { label: "Layihə və patent", value: "1+" },
      { label: "Sənaye əməkdaşlığı", value: "5+" },
    ],
    is_active: true,
  },
  // Faculty 2 – MRF
  {
    cafedra_id: 201,
    faculty_id: 2,
    name: "Maşın Elementləri kafedras",
    short_name: "MEK",
    description:
      "Maşın elementlərinin hesablanması, layihələndirilməsi və istismarı sahəsini əhatə edən kafedra.",
    is_active: true,
  },
  {
    cafedra_id: 202,
    faculty_id: 2,
    name: "Robotexnika kafedras",
    short_name: "RTK",
    description:
      "Robot sistemləri, sənaye avtomatikası, mexatronika və idarəetmə sistemləri kafedras.",
    is_active: true,
  },
  // Faculty 3 – NKM
  {
    cafedra_id: 301,
    faculty_id: 3,
    name: "Neft-Kimya Texnologiyası kafedras",
    short_name: "NKTK",
    description:
      "Neft-kimya məhsullarının emalı, kimyəvi texnologiyalar və istehsal prosesləri kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 302,
    faculty_id: 3,
    name: "Enerji Mühəndisliyi kafedras",
    short_name: "EMK",
    description:
      "Enerji mənbələri, bərpa olunan enerji sistemləri və enerji effektivliyi kafedras.",
    is_active: true,
  },
  // Faculty 4 – EEF
  {
    cafedra_id: 401,
    faculty_id: 4,
    name: "Elektrotexnika kafedras",
    short_name: "ETK",
    description:
      "Elektrik enerjisi sistemlərinin istehsalı, ötürülməsi, paylanması və istehlakı kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 402,
    faculty_id: 4,
    name: "Elektronika kafedras",
    short_name: "ELK",
    description:
      "Analoq və rəqəmsal elektronika, mikrosxemlər, siqnal emalı kafedras.",
    is_active: true,
  },
  // Faculty 5 – İMF
  {
    cafedra_id: 501,
    faculty_id: 5,
    name: "Tikinti Konstruksiyaları kafedras",
    short_name: "TKK",
    description:
      "Dəmir-beton, polad və ahəng konstruksiyaların hesablanması, layihələndirilməsi kafedras.",
    is_active: true,
  },
  // Faculty 6 – NMM
  {
    cafedra_id: 601,
    faculty_id: 6,
    name: "Avtomobil Nəqliyyatı kafedras",
    short_name: "ANK",
    description:
      "Avtomobil nəqliyyatının təşkili, idarəetməsi və texniki istismarı kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 602,
    faculty_id: 6,
    name: "Logistika kafedras",
    short_name: "LOGİK",
    description:
      "Təchizat zəncirinin idarəedilməsi, nəqliyyat logistikası və anbar idarəetməsi kafedras.",
    is_active: true,
  },
];

export interface StaticEmployee {
  id: number;
  faculty_id?: number;
  cafedra_id?: number;
  full_name: string;
  position: string;
  academic_degree?: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  bio?: string;
  cv_url?: string;
}

export interface StaticCafedraHead {
  cafedra_id: number;
  full_name: string;
  academic_degree?: string;
  title: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  office?: string;
  reception_hours?: string;
  bio?: string;
  research_areas?: string[];
  education?: { year: string; degree: string; institution: string }[];
  scopus_url?: string;
  wos_url?: string;
  scholar_url?: string;
}

export const STATIC_FACULTY_EMPLOYEES: StaticEmployee[] = [
  // Faculty 1 – İTSM
  { id: 1001, faculty_id: 1, full_name: "Rzayeva Aynur Sabir qızı", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Aynur+Rzayeva&background=ee7c7e&color=fff&size=200&bold=true", email: "a.rzayeva@aztu.edu.az", phone: "+994 12 598 34 56", bio: "Fakültənin tədris prosesinin metodiki cəhətdən təmin edilməsindən məsuldur. 10 ildən artıq pedaqoji fəaliyyəti var." },
  { id: 1002, faculty_id: 1, full_name: "Muradov Tərlan Zakir oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Tarlan+Muradov&background=1a2355&color=fff&size=200&bold=true", email: "t.muradov@aztu.edu.az", phone: "+994 12 598 34 57", bio: "Kompüter laboratoriyalarının texniki xidmət və idarəetməsini həyata keçirir." },
  { id: 1003, faculty_id: 1, full_name: "Hümbətova Fidan Elçin qızı", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Fidan+Humbatova&background=c62828&color=fff&size=200&bold=true", email: "f.humbatova@aztu.edu.az", phone: "+994 12 598 34 58", bio: "Proqramlaşdırma laboratoriyasının baş laborantı. Tələbə praktiki işlərinin koordinasiyasını aparır." },
  { id: 1004, faculty_id: 1, full_name: "Babaxanov Cavid Rauf oğlu", position: "Texnik", photo_url: "https://ui-avatars.com/api/?name=Cavid+Babaxanov&background=1b5e20&color=fff&size=200&bold=true", email: "c.babaxanov@aztu.edu.az", phone: "+994 12 598 34 59", bio: "Fakültənin texniki avadanlıqlarının saxlanması və təmir işlərini yerinə yetirir." },
  // Faculty 2 – MRF
  { id: 1005, faculty_id: 2, full_name: "Hüseynov Fərid Əli oğlu", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Farid+Huseynov&background=283593&color=fff&size=200&bold=true", email: "f.huseynov@aztu.edu.az", phone: "+994 12 598 35 10", bio: "Maşınqayırma fakültəsinin metodist işçisi. Tədris planlarının hazırlanmasında bilavasitə iştirak edir." },
  { id: 1006, faculty_id: 2, full_name: "Əliyeva Könül Ramiz qızı", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Konul+Aliyeva&background=880e4f&color=fff&size=200&bold=true", email: "k.aliyeva@aztu.edu.az", phone: "+994 12 598 35 11", bio: "Mexanika laboratoriyasında tələbə praktik məşğələlərinin aparılmasına yardım göstərir." },
  { id: 1007, faculty_id: 2, full_name: "Qasımov Nicat Elxan oğlu", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Nijat+Qasimov&background=37474f&color=fff&size=200&bold=true", email: "n.qasimov@aztu.edu.az", phone: "+994 12 598 35 12", bio: "Robot sistemləri laboratoriyasının baş laborantı. Texniki avadanlıqların quraşdırılması üzrə mütəxəssisdir." },
  { id: 1008, faculty_id: 2, full_name: "Rəsulova Sevinc Tahir qızı", position: "İnzibati işçi", photo_url: "https://ui-avatars.com/api/?name=Sevinj+Rasulova&background=4e342e&color=fff&size=200&bold=true", email: "s.rasulova@aztu.edu.az", phone: "+994 12 598 35 13", bio: "Fakültə dekanlığında inzibati işlər üzrə məsul işçi." },
  // Faculty 3 – NKM
  { id: 1009, faculty_id: 3, full_name: "Nəzərova Zəhra İlham qızı", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Zahra+Nazarova&background=00695c&color=fff&size=200&bold=true", email: "z.nazarova@aztu.edu.az", phone: "+994 12 598 36 01", bio: "Neft-kimya fakültəsinin tədris metodisti. Tədris materiallarının hazırlanmasını koordinasiya edir." },
  { id: 1010, faculty_id: 3, full_name: "Cəfərli Elnur Rauf oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Elnur+Cafarli&background=1a3a5c&color=fff&size=200&bold=true", email: "e.cafarli@aztu.edu.az", phone: "+994 12 598 36 02", bio: "Kimya laboratoriyasında tələbə məşğələlərini dəstəkləyir. Laboratoriya avadanlıqlarının qorunmasına cavabdehdir." },
  { id: 1011, faculty_id: 3, full_name: "Abbasova Günel Tural qızı", position: "İnzibati işçi", photo_url: "https://ui-avatars.com/api/?name=Gunel+Abbasova&background=7b1fa2&color=fff&size=200&bold=true", email: "g.abbasova@aztu.edu.az", phone: "+994 12 598 36 03", bio: "Fakültə dekanlığında inzibati xidmətlər üzrə çalışır." },
  // Faculty 4 – EEF
  { id: 1012, faculty_id: 4, full_name: "Orucov Vasif Mübariz oğlu", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Vasif+Orujov&background=bf360c&color=fff&size=200&bold=true", email: "v.orujov@aztu.edu.az", phone: "+994 12 598 37 01", bio: "Elektrotexnika fakültəsinin tədris prosesinin metodiki dəstəyini həyata keçirir." },
  { id: 1013, faculty_id: 4, full_name: "Quluzadə Aytən Elnur qızı", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Aytan+Quluzade&background=006064&color=fff&size=200&bold=true", email: "a.quluzade@aztu.edu.az", phone: "+994 12 598 37 02", bio: "Elektronika laboratoriyasının baş laborantı. Ölçü cihazları və sxemlərin qurulmasına nəzarət edir." },
  { id: 1014, faculty_id: 4, full_name: "Məmmədov Şəhriyar Toğrul oğlu", position: "Texnik", photo_url: "https://ui-avatars.com/api/?name=Shahriyar+Mammadov&background=33691e&color=fff&size=200&bold=true", email: "sh.mammadov@aztu.edu.az", phone: "+994 12 598 37 03", bio: "Fakültənin elektrik avadanlıqlarının texniki xidmətini yerinə yetirir." },
  // Faculty 5 – İMF
  { id: 1015, faculty_id: 5, full_name: "Səlimova Anar Tofiq qızı", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Anar+Salimova&background=ad1457&color=fff&size=200&bold=true", email: "a.salimova@aztu.edu.az", phone: "+994 12 598 38 01", bio: "İnşaat fakültəsinin metodisti. Tələbə cədvəlləri və tədris planlarının idarəedilməsindən məsuldur." },
  { id: 1016, faculty_id: 5, full_name: "İsgəndərov Azər Şamil oğlu", position: "Laborant", photo_url: "https://ui-avatars.com/api/?name=Azer+Isgandarov&background=1565c0&color=fff&size=200&bold=true", email: "a.isgandarov@aztu.edu.az", phone: "+994 12 598 38 02", bio: "Tikinti materialları laboratoriyasında çalışır. Praktik testlər üçün avadanlıq hazırlayır." },
  { id: 1017, faculty_id: 5, full_name: "Hüseynova Lalə Rauf qızı", position: "İnzibati işçi", photo_url: "https://ui-avatars.com/api/?name=Lale+Huseynova&background=6a1b9a&color=fff&size=200&bold=true", email: "l.huseynova@aztu.edu.az", phone: "+994 12 598 38 03", bio: "Fakültə dekanlığında müxtəlif inzibati işləri yerinə yetirir." },
  // Faculty 6 – NMM
  { id: 1018, faculty_id: 6, full_name: "Rəhimov Kənan Arif oğlu", position: "Metodist", photo_url: "https://ui-avatars.com/api/?name=Kenan+Rahimov&background=0277bd&color=fff&size=200&bold=true", email: "k.rahimov@aztu.edu.az", phone: "+994 12 598 39 01", bio: "Nəqliyyat fakültəsinin tədris metodisti. Tədris proqramlarının hazırlanmasına yardım göstərir." },
  { id: 1019, faculty_id: 6, full_name: "Vəliyeva Türkan Nəcəf qızı", position: "Baş laborant", photo_url: "https://ui-avatars.com/api/?name=Turkan+Valiyeva&background=558b2f&color=fff&size=200&bold=true", email: "t.valiyeva@aztu.edu.az", phone: "+994 12 598 39 02", bio: "Nəqliyyat mühəndisliyi laboratoriyasının baş laborantı." },
  { id: 1020, faculty_id: 6, full_name: "Allahverdiyev Elçin Mübariz oğlu", position: "Texnik", photo_url: "https://ui-avatars.com/api/?name=Elchin+Allahverdiyev&background=4527a0&color=fff&size=200&bold=true", email: "e.allahverdiyev@aztu.edu.az", phone: "+994 12 598 39 03", bio: "Fakültənin texniki avadanlıqlarının qulluğunu yerinə yetirir." },
];

export const STATIC_CAFEDRA_EMPLOYEES: StaticEmployee[] = [
  // Cafedra 101 – KEK
  { id: 2001, cafedra_id: 101, full_name: "Quliyev Rauf Əli oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Rauf+Quliyev&background=1a2355&color=fff&size=200&bold=true", email: "r.quliyev@aztu.edu.az", phone: "+994 12 598 40 01", bio: "Kompüter elmləri kafedrasının müdiri. 25 ildən artıq elm və tədris sahəsindədir. Süni intellekt üzrə tədqiqatçı." },
  { id: 2002, cafedra_id: 101, full_name: "Nəsirov Vüsal Kamil oğlu", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Vusal+Nasirov&background=263238&color=fff&size=200&bold=true", email: "v.nasirov@aztu.edu.az", phone: "+994 12 598 40 02", bio: "Proqramlaşdırma dilləri və alqoritmlər üzrə dosent. Python və Java tədrisini aparır." },
  { id: 2003, cafedra_id: 101, full_name: "Həsənli Aytən Cavid qızı", position: "Müəllim", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Ayten+Hasanli&background=7b1fa2&color=fff&size=200&bold=true", email: "a.hasanli@aztu.edu.az", phone: "+994 12 598 40 03", bio: "Maşın öyrənməsi və data elmi üzrə müəllim. Tədqiqat sahəsi: dərin öyrənmə." },
  // Cafedra 102 – İSK
  { id: 2004, cafedra_id: 102, full_name: "Cəfərov Mübariz Həsən oğlu", position: "Kafedra müdiri", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Mubariz+Cafarov&background=1b5e20&color=fff&size=200&bold=true", email: "m.cafarov@aztu.edu.az", phone: "+994 12 598 40 10", bio: "İnformasiya sistemləri kafedrasının müdiri. Verilənlər bazası idarəetməsi üzrə mütəxəssisdir." },
  { id: 2005, cafedra_id: 102, full_name: "Qasımov Elnur Zakir oğlu", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Elnur+Qasimov&background=37474f&color=fff&size=200&bold=true", email: "e.qasimov@aztu.edu.az", phone: "+994 12 598 40 11", bio: "Sistem analizi və layihə idarəetməsi üzrə dosent. SAP sistemləri sahəsində təcrübəlidir." },
  { id: 2006, cafedra_id: 102, full_name: "Süleymanova Nigar Ramiz qızı", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Nigar+Suleymanova&background=880e4f&color=fff&size=200&bold=true", email: "n.suleymanova@aztu.edu.az", phone: "+994 12 598 40 12", bio: "Web texnologiyaları və informasiya sistemlərinin layihələndirilməsi üzrə müəllim." },
  // Cafedra 103 – KTK
  { id: 3000, cafedra_id: 103, full_name: "İmamverdiyev Yadigar Nəsib oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru, dosent", photo_url: "https://ui-avatars.com/api/?name=Yadigar+Imamverdiyev&background=1a2355&color=fff&size=200&bold=true", email: "yadigar.imamverdiyev@aztu.edu.az", phone: "+994 12 539 08 24", bio: "İmamverdiyev Yadigar Nəsib oğlu — texnika elmləri doktoru, dosent, informasiya təhlükəsizliyi və kriptoqrafiya sahəsi üzrə ixtisaslaşmış alimdir. O, informasiya təhlükəsizliyi və kibertəhlükəsizlik istiqamətində elmi və pedaqoji fəaliyyət göstərir. 200-dən çox elmi məqalənin və 8 kitabın müəllifidir, həmçinin ölkədə ilk CERT komandasının yaradılmasında və biometrik identifikasiya sistemlərinin tətbiqi üzrə dövlət layihələrində aktiv iştirak etmişdir." },
  { id: 3001, cafedra_id: 103, full_name: "Qasımlı Fərid Fikrət oğlu", position: "Baş müəllim", photo_url: "https://ui-avatars.com/api/?name=Farid+Qasimli&background=263238&color=fff&size=200&bold=true", email: "farid.gasimli@aztu.edu.az", phone: "+994 50-403-07-44", bio: "Kibertəhlükəsizlik kafedrasının baş müəllimi. Tədris və tədqiqat sahəsində fəaliyyət göstərir." },
  { id: 3002, cafedra_id: 103, full_name: "Məhərrəmova Aynur Natiq", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Aynur+Maharramova&background=880e4f&color=fff&size=200&bold=true", email: "aynur.meherremova@aztu.edu.az", phone: "+994 51-700-30-30", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3003, cafedra_id: 103, full_name: "Məmmədova Nərmin Ləyaqət", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Narmin+Mammadova&background=00695c&color=fff&size=200&bold=true", email: "narmin.mammadova@aztu.edu.az", phone: "+994 51-526-86-87", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3004, cafedra_id: 103, full_name: "Qəhrəmanova Samirə Həsən", position: "Dosent", academic_degree: "t.f.d., dosent", photo_url: "https://ui-avatars.com/api/?name=Samira+Qahramanova&background=b71c1c&color=fff&size=200&bold=true", email: "samira.qahramanova@aztu.edu.az", phone: "+994 10 527 07 11", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  { id: 3005, cafedra_id: 103, full_name: "Babayeva Arzu Ələm", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Arzu+Babayeva&background=1b5e20&color=fff&size=200&bold=true", email: "arzu.babayeva@aztu.edu.az", phone: "+994 51-430-05-74", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3006, cafedra_id: 103, full_name: "Hüseynova Əzimə Şahin", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Azima+Huseynova&background=4527a0&color=fff&size=200&bold=true", email: "ezime.huseynova@aztu.edu.az", phone: "+994 51-649-82-98", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3007, cafedra_id: 103, full_name: "Qəhrəmanova İlahə Həsən", position: "Baş müəllim", photo_url: "https://ui-avatars.com/api/?name=Ilaha+Qahramanova&background=ad1457&color=fff&size=200&bold=true", email: "ilaha.qahramanova@aztu.edu.az", phone: "+994 50-418-57-30", bio: "Kibertəhlükəsizlik kafedrasının baş müəllimi. Tədris və tədqiqat sahəsində fəaliyyət göstərir." },
  { id: 3008, cafedra_id: 103, full_name: "İbrahimova Aytəkin Bəybala", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Aytekin+Ibrahimova&background=0277bd&color=fff&size=200&bold=true", email: "aytekin.ibrahimova@aztu.edu.az", phone: "+994 55-980-39-70", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3009, cafedra_id: 103, full_name: "Əliyeva Qahirə Tehran", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Qahira+Aliyeva&background=33691e&color=fff&size=200&bold=true", email: "qahire.vahidli@aztu.edu.az", phone: "+994 55-840-97-28", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3010, cafedra_id: 103, full_name: "Quluzadə Pərişan Ceyhun", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Perishan+Quluzade&background=bf360c&color=fff&size=200&bold=true", email: "perishan.guluzade@aztu.edu.az", phone: "+994 50-449-30-56", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3011, cafedra_id: 103, full_name: "Nəcəfli Cavad Vaqif", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Cavad+Nacafli&background=37474f&color=fff&size=200&bold=true", email: "cavad.necefli@aztu.edu.az", phone: "+994 51-340-19-24", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3012, cafedra_id: 103, full_name: "Arifli Aydan Rauf", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Aydan+Arifli&background=6a1b9a&color=fff&size=200&bold=true", email: "aydan.arifli@aztu.edu.az", phone: "+994 55-439-72-28", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3013, cafedra_id: 103, full_name: "Orucova Leyla Sənan", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Leyla+Orucova&background=004d40&color=fff&size=200&bold=true", email: "leyla.orucova@aztu.edu.az", phone: "+994 50-679-72-34", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3014, cafedra_id: 103, full_name: "Şirəliyeva Xumar Rəşad", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Xumar+Shiraliyeva&background=7b1fa2&color=fff&size=200&bold=true", email: "khumar.shiraliyeva@aztu.edu.az", phone: "+994 55-232-07-67", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3015, cafedra_id: 103, full_name: "Abdullayeva İnci Tağı", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Inci+Abdullayeva&background=283593&color=fff&size=200&bold=true", email: "inci.abdullayeva@aztu.edu.az", phone: "+994 50-536-49-26", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3016, cafedra_id: 103, full_name: "Fərzəliyev Azad Novruz", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Azad+Farzaliyev&background=1a3a5c&color=fff&size=200&bold=true", email: "azad.farzaliyev@aztu.edu.az", phone: "+994 51-696-06-44", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3017, cafedra_id: 103, full_name: "Səfərli Ramidə Elşən", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Ramida+Safarli&background=558b2f&color=fff&size=200&bold=true", email: "ramida.safarli@aztu.edu.az", phone: "+994 55-329-83-26", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3018, cafedra_id: 103, full_name: "Kərimova Adilə Yadigar", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Adila+Karimova&background=0d47a1&color=fff&size=200&bold=true", email: "adila.karimova@aztu.edu.az", phone: "+994 51-821-54-17", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3019, cafedra_id: 103, full_name: "Ağababayev Rahib Rəsul", position: "Baş müəllim", photo_url: "https://ui-avatars.com/api/?name=Rahib+Agababayev&background=c62828&color=fff&size=200&bold=true", email: "rahib.agababayev@aztu.edu.az", phone: "+994 51-491-91-81", bio: "Kibertəhlükəsizlik kafedrasının baş müəllimi. Tədris və tədqiqat sahəsində fəaliyyət göstərir." },
  { id: 3020, cafedra_id: 103, full_name: "Quliyev Natiq Əliabbas", position: "Dosent", academic_degree: "f.r.e.n., dosent", photo_url: "https://ui-avatars.com/api/?name=Natiq+Quliyev&background=e65100&color=fff&size=200&bold=true", email: "natiq.quliyev@aztu.edu.az", phone: "+994 70-323-37-36", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  { id: 3021, cafedra_id: 103, full_name: "Sadıqova Rəhilə Hidayət", position: "Dosent", academic_degree: "r.ü.f.d., dosent", photo_url: "https://ui-avatars.com/api/?name=Rahila+Sadiqova&background=4a148c&color=fff&size=200&bold=true", email: "rahila.sadygova@aztu.edu.az", phone: "+994 70-623-31-18", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  { id: 3022, cafedra_id: 103, full_name: "Hüseynov Aydın Fridun", position: "Dosent", academic_degree: "t.e.n., dosent", photo_url: "https://ui-avatars.com/api/?name=Aydin+Huseynov&background=006064&color=fff&size=200&bold=true", email: "aydin.huseynov@aztu.edu.az", phone: "+994 70-386-76-77", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  { id: 3023, cafedra_id: 103, full_name: "Əliyev Əli Əbülfəz", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Ali+Aliyev&background=1565c0&color=fff&size=200&bold=true", email: "ali.aliyev@aztu.edu.az", phone: "+994 50-253-49-53", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3024, cafedra_id: 103, full_name: "Məmmədzadə Nigar Ərəstun", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Nigar+Mammadzade&background=880e4f&color=fff&size=200&bold=true", email: "nigar.mammadzade@aztu.edu.az", phone: "+994 50-493-21-24", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3025, cafedra_id: 103, full_name: "İbayev Elşən Akif", position: "Dosent", academic_degree: "r.ü.f.d., dosent", photo_url: "https://ui-avatars.com/api/?name=Elshen+Ibayev&background=1b5e20&color=fff&size=200&bold=true", email: "elshen.ibayev@aztu.edu.az", phone: "+994 50-501-14-84", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  { id: 3026, cafedra_id: 103, full_name: "Abbasova Əminə Elşad", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Amina+Abbasova&background=bf360c&color=fff&size=200&bold=true", email: "amina.abbasova@aztu.edu.az", phone: "+994 51-724-60-92", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3027, cafedra_id: 103, full_name: "Həsənova Samirə Əfrasiyab", position: "Assistent", photo_url: "https://ui-avatars.com/api/?name=Samira+Hasanova&background=00695c&color=fff&size=200&bold=true", email: "samirahasanova75@gmail.com", phone: "+994 50-349-77-27", bio: "Kibertəhlükəsizlik kafedrasının assistenti. Tələbələrə tədris sahəsində yardım göstərir." },
  { id: 3028, cafedra_id: 103, full_name: "Cəfərov Təbriz Ramal", position: "Dosent", academic_degree: "h.ü.f.d., dosent", photo_url: "https://ui-avatars.com/api/?name=Tabriz+Cafarov&background=37474f&color=fff&size=200&bold=true", email: "tabriz.cafarov@aztu.edu.az", phone: "+994 50-247-48-10", bio: "Kibertəhlükəsizlik kafedrasının dosenti. Sahəsinin aparıcı mütəxəssislərindən biridir." },
  // Cafedra 201 – MEK
  { id: 2010, cafedra_id: 201, full_name: "Babayev Tural Əli oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Tural+Babayev&background=1a2355&color=fff&size=200&bold=true", email: "t.babayev@aztu.edu.az", phone: "+994 12 598 41 01", bio: "Maşın elementləri kafedrasının müdiri. Maşın hissələrinin hesablanması üzrə 20 il təcrübəsi var." },
  { id: 2011, cafedra_id: 201, full_name: "Şirinova Leyla Fərrux qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Leyla+Shirinova&background=4a148c&color=fff&size=200&bold=true", email: "l.shirinova@aztu.edu.az", phone: "+994 12 598 41 02", bio: "Tribologiya və yağlama sistemləri üzrə dosent. Mexaniki konstruksiya dərslərini aparır." },
  { id: 2012, cafedra_id: 201, full_name: "Kərimov Elşən Bəhruz oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Elshan+Karimov&background=004d40&color=fff&size=200&bold=true", email: "e.karimov@aztu.edu.az", phone: "+994 12 598 41 03", bio: "Gücləndirici elementlər və dişli ötürmə mexanizmləri üzrə müəllim." },
  // Cafedra 202 – RTK
  { id: 2013, cafedra_id: 202, full_name: "Rəsulov Kamran Orxan oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Kamran+Rasulov&background=1b5e20&color=fff&size=200&bold=true", email: "k.rasulov@aztu.edu.az", phone: "+994 12 598 41 10", bio: "Robotexnika kafedrasının müdiri. Sənaye robot sistemlərinin proqramlaşdırılması üzrə mütəxəssisdir." },
  { id: 2014, cafedra_id: 202, full_name: "Nəcəfov Orxan Elçin oğlu", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Orxan+Nacafov&background=37474f&color=fff&size=200&bold=true", email: "o.nacafov@aztu.edu.az", phone: "+994 12 598 41 11", bio: "Mexatronika və idarəetmə sistemləri üzrə dosent." },
  { id: 2015, cafedra_id: 202, full_name: "Vəlizadə Kəmalə Elnur qızı", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Kamala+Valizade&background=880e4f&color=fff&size=200&bold=true", email: "k.valizade@aztu.edu.az", phone: "+994 12 598 41 12", bio: "PLC proqramlaşdırma və sənaye avtomatikası üzrə müəllim." },
  // Cafedra 301 – NKTK
  { id: 2016, cafedra_id: 301, full_name: "Əhmədov Sahil Vüqar oğlu", position: "Kafedra müdiri", academic_degree: "Kimya elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Sahil+Ahmadov&background=e65100&color=fff&size=200&bold=true", email: "s.ahmadov@aztu.edu.az", phone: "+994 12 598 42 01", bio: "Neft-kimya texnologiyası kafedrasının müdiri. Neft emalı prosesləri üzrə aparıcı tədqiqatçı." },
  { id: 2017, cafedra_id: 301, full_name: "Bağırova Aynur Şahlar qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Aynur+Bagirova&background=00695c&color=fff&size=200&bold=true", email: "a.bagirova@aztu.edu.az", phone: "+994 12 598 42 02", bio: "Kimyəvi proseslər mühəndisliyi üzrə dosent." },
  { id: 2018, cafedra_id: 301, full_name: "Xəlilov Rəşad Nəriman oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Rashad+Xalilov&background=1a3a5c&color=fff&size=200&bold=true", email: "r.xalilov@aztu.edu.az", phone: "+994 12 598 42 03", bio: "Üzvi kimya və neft-kimya sintezi üzrə müəllim." },
  // Cafedra 302 – EMK
  { id: 2019, cafedra_id: 302, full_name: "İsmayılov Elnur Cavid oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Elnur+Ismayilov&background=0277bd&color=fff&size=200&bold=true", email: "e.ismayilov@aztu.edu.az", phone: "+994 12 598 42 10", bio: "Enerji mühəndisliyi kafedrasının müdiri. Bərpa olunan enerji sistemləri üzrə tədqiqatçı." },
  { id: 2020, cafedra_id: 302, full_name: "Məmmədova Günel Rauf qızı", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Gunel+Mammadova&background=558b2f&color=fff&size=200&bold=true", email: "g.mammadova@aztu.edu.az", phone: "+994 12 598 42 11", bio: "Günəş enerji sistemləri və batareya texnologiyaları üzrə dosent." },
  { id: 2021, cafedra_id: 302, full_name: "Cəlilов Bəhruz Tural oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Bahrus+Calil&background=4527a0&color=fff&size=200&bold=true", email: "b.calil@aztu.edu.az", phone: "+994 12 598 42 12", bio: "Elektrik şəbəkələri və enerji effektivliyi üzrə müəllim." },
  // Cafedra 401 – ETK
  { id: 2022, cafedra_id: 401, full_name: "Rüstəmov Anar Elnur oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Anar+Rustamov&background=bf360c&color=fff&size=200&bold=true", email: "a.rustamov@aztu.edu.az", phone: "+994 12 598 43 01", bio: "Elektrotexnika kafedrasının müdiri. Güc elektronikası və elektrik maşınları sahəsində mütəxəssisdir." },
  { id: 2023, cafedra_id: 401, full_name: "Quluzadə Aytən Elnur qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Aytan+Quluzade&background=006064&color=fff&size=200&bold=true", email: "a.quluzade@aztu.edu.az", phone: "+994 12 598 43 02", bio: "Elektrik stansiyaları və enerji sistemlərinin idarəetməsi üzrə dosent." },
  { id: 2024, cafedra_id: 401, full_name: "Hüseynov Rəşad Teymur oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Rashad+Huseynov&background=33691e&color=fff&size=200&bold=true", email: "r.huseynov@aztu.edu.az", phone: "+994 12 598 43 03", bio: "Elektrik dövrələri və nəzəriyyə üzrə müəllim." },
  // Cafedra 402 – ELK
  { id: 2025, cafedra_id: 402, full_name: "Nəcəfov Tural Ramiz oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Tural+Nacafov&background=1a2355&color=fff&size=200&bold=true", email: "t.nacafov@aztu.edu.az", phone: "+994 12 598 43 10", bio: "Elektronika kafedrasının müdiri. Rəqəmsal sxemlər və mikrokontrollerlər üzrə mütəxəssisdir." },
  { id: 2026, cafedra_id: 402, full_name: "Orucova Lamiyə Nicat qızı", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Lamiya+Orujova&background=ad1457&color=fff&size=200&bold=true", email: "l.orujova@aztu.edu.az", phone: "+994 12 598 43 11", bio: "Analoq elektronika və siqnal emalı üzrə dosent." },
  { id: 2027, cafedra_id: 402, full_name: "Şəkərəliyev Kamil Namiq oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Kamil+Shakaraliyev&background=0d47a1&color=fff&size=200&bold=true", email: "k.shakaraliyev@aztu.edu.az", phone: "+994 12 598 43 12", bio: "Mikrosxemlər və FPGA proqramlaşdırma üzrə müəllim." },
  // Cafedra 501 – TKK
  { id: 2028, cafedra_id: 501, full_name: "Abbasov Nicat Eldar oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Nijat+Abbasov&background=1b5e20&color=fff&size=200&bold=true", email: "n.abbasov@aztu.edu.az", phone: "+994 12 598 44 01", bio: "Tikinti konstruksiyaları kafedrasının müdiri. Dəmir-beton konstruksiyaların hesablanması üzrə professor." },
  { id: 2029, cafedra_id: 501, full_name: "Qurbanova Ülviyyə Sahib qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Ulviyya+Qurbanova&background=880e4f&color=fff&size=200&bold=true", email: "u.qurbanova@aztu.edu.az", phone: "+994 12 598 44 02", bio: "Metal konstruksiyalar və yük daşıma hesablamaları üzrə dosent." },
  { id: 2030, cafedra_id: 501, full_name: "Kərimov Rauf Əkbər oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Rauf+Karimov&background=37474f&color=fff&size=200&bold=true", email: "r.karimov@aztu.edu.az", phone: "+994 12 598 44 03", bio: "Bina tikintisi texnologiyaları və BIM modelləşdirmə üzrə müəllim." },
  // Cafedra 601 – ANK
  { id: 2031, cafedra_id: 601, full_name: "Hüseynli Anar Kamil oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Anar+Huseynli&background=0277bd&color=fff&size=200&bold=true", email: "a.huseynli@aztu.edu.az", phone: "+994 12 598 45 01", bio: "Avtomobil nəqliyyatı kafedrasının müdiri. Nəqliyyat sistemlərinin optimallaşdırılması üzrə tədqiqatçı." },
  { id: 2032, cafedra_id: 601, full_name: "Mustafayeva Könül Farid qızı", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Konul+Mustafayeva&background=4527a0&color=fff&size=200&bold=true", email: "k.mustafayeva@aztu.edu.az", phone: "+994 12 598 45 02", bio: "Nəqliyyat logistikası və yük daşıma planlaması üzrə dosent." },
  { id: 2033, cafedra_id: 601, full_name: "Əliyev Tural Şamil oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Tural+Aliyev&background=558b2f&color=fff&size=200&bold=true", email: "t.aliyev@aztu.edu.az", phone: "+994 12 598 45 03", bio: "Avtomobil texnikası və istismar mühəndisliyi üzrə müəllim." },
  // Cafedra 602 – LOGİK
  { id: 2034, cafedra_id: 602, full_name: "Mehdiyev Elşən Vüsal oğlu", position: "Kafedra müdiri", academic_degree: "İqtisad elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Elshan+Mehdiyev&background=bf360c&color=fff&size=200&bold=true", email: "e.mehdiyev@aztu.edu.az", phone: "+994 12 598 45 10", bio: "Logistika kafedrasının müdiri. Təchizat zənciri idarəetməsi üzrə beynəlxalq sertifikata malikdir." },
  { id: 2035, cafedra_id: 602, full_name: "Əsgərova Günel Tural qızı", position: "Dosent", academic_degree: "Fəlsəfə doktoru", photo_url: "https://ui-avatars.com/api/?name=Gunel+Asgarova&background=006064&color=fff&size=200&bold=true", email: "g.asgarova@aztu.edu.az", phone: "+994 12 598 45 11", bio: "Anbar idarəetməsi və inventar optimallaşdırması üzrə dosent." },
  { id: 2036, cafedra_id: 602, full_name: "Vəliyev Namiq Rauf oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Namiq+Valiyev&background=1a3a5c&color=fff&size=200&bold=true", email: "n.valiyev@aztu.edu.az", phone: "+994 12 598 45 12", bio: "Beynəlxalq ticarət və gömrük logistikası üzrə müəllim." },
];

export function getFacultyById(id: number): StaticFaculty | undefined {
  return STATIC_FACULTIES.find((f) => f.faculty_id === id);
}

export function getCafedrasByFacultyId(facultyId: number): StaticCafedra[] {
  return STATIC_CAFEDRAS.filter((c) => c.faculty_id === facultyId);
}

export function getCafedraById(id: number): StaticCafedra | undefined {
  return STATIC_CAFEDRAS.find((c) => c.cafedra_id === id);
}

export function getFacultyEmployees(facultyId: number): StaticEmployee[] {
  return STATIC_FACULTY_EMPLOYEES.filter((e) => e.faculty_id === facultyId);
}

export function getCafedraEmployees(cafedraId: number): StaticEmployee[] {
  return STATIC_CAFEDRA_EMPLOYEES.filter((e) => e.cafedra_id === cafedraId);
}

export function getFacultyEmployeeById(id: number): StaticEmployee | undefined {
  return STATIC_FACULTY_EMPLOYEES.find((e) => e.id === id);
}

export function getCafedraEmployeeById(id: number): StaticEmployee | undefined {
  return STATIC_CAFEDRA_EMPLOYEES.find((e) => e.id === id);
}

export const STATIC_CAFEDRA_HEADS: StaticCafedraHead[] = [
  {
    cafedra_id: 103,
    full_name: "İmamverdiyev Yadigar Nəsib oğlu",
    academic_degree: "Texnika elmləri doktoru, dosent",
    title: "Kibertəhlükəsizlik kafedrasının müdiri",
    photo_url:
      "https://ui-avatars.com/api/?name=Yadigar+Imamverdiyev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
    email: "yadigar.imamverdiyev@aztu.edu.az",
    phone: "+994 12 539 08 24",
    office: "V korpus, K406-cı otaq",
    reception_hours: "Bazar ertəsi, Çərşənbə 14:00–17:00",
    bio: "İmamverdiyev Yadigar Nəsib oğlu — texnika elmləri doktoru, dosent, informasiya təhlükəsizliyi və kriptoqrafiya sahəsi üzrə ixtisaslaşmış alimdir. O, informasiya təhlükəsizliyi və kibertəhlükəsizlik istiqamətində elmi və pedaqoji fəaliyyət göstərir. 200-dən çox elmi məqalənin və 8 kitabın müəllifidir, həmçinin ölkədə ilk CERT komandasının yaradılmasında və biometrik identifikasiya sistemlərinin tətbiqi üzrə dövlət layihələrində aktiv iştirak etmişdir.",
    research_areas: [
      "Süni intellekt metodları",
      "Tətbiqi kriptoqrafiya",
      "Kibertəhlükəsizlik sistemləri",
      "İnformasiya sistemlərinin idarə edilməsi",
      "Kritik infrastrukturun təhlükəsizliyi",
      "Blokçeyn texnologiyaları",
    ],
    education: [
      {
        year: "1982–1989",
        degree: "Bakalavr + magistr",
        institution: "Azərbaycan Dövlət Neft və Sənaye Universiteti",
      },
      {
        year: "2003–2006",
        degree: "Elmlər namizədi (PhD)",
        institution: "AMEA İnformasiya Texnologiyaları İnstitutu",
      },
      {
        year: "2008–2012",
        degree: "Elmlər doktoru (DSc)",
        institution: "AMEA İnformasiya Texnologiyaları İnstitutu",
      },
    ],
    scopus_url:
      "https://www.scopus.com/authid/detail.uri?authorId=35731194800",
    wos_url:
      "https://www.webofscience.com/wos/author/record/1400086",
    scholar_url:
      "https://scholar.google.com/citations?user=nQHep3sAAAAJ&hl=en&oi=ao",
  },
];

export function getCafedraHead(cafedraId: number): StaticCafedraHead | undefined {
  return STATIC_CAFEDRA_HEADS.find((h) => h.cafedra_id === cafedraId);
}
