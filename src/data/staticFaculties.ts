export interface StaticFaculty {
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
}

export interface StaticCafedra {
  cafedra_id: number;
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
}

export const STATIC_FACULTIES: StaticFaculty[] = [
  {
    faculty_id: 1,
    name: "İnformasiya Texnologiyaları və Sistemlər Mühəndisliyi fakültəsi",
    short_name: "İTSM",
    description:
      "İnformasiya texnologiyaları, kompüter elmləri, proqram mühəndisliyi və sistemlər mühəndisliyi sahəsində yüksəkixtisaslı mütəxəssislər hazırlayan fakültə.",
    is_active: true,
  },
  {
    faculty_id: 2,
    name: "Maşınqayırma və Robotexnika fakültəsi",
    short_name: "MRF",
    description:
      "Maşınqayırma, mexanika, robotexnika və avtomatlaşdırılmış istehsal texnologiyaları sahəsində müasir kadrlar yetişdirən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 3,
    name: "Neft-Kimya Mühəndisliyi fakültəsi",
    short_name: "NKM",
    description:
      "Neft-kimya sənayesi, kimyəvi texnologiyalar və enerji mühəndisliyi sahəsini əhatə edən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 4,
    name: "Elektrotexnika və Elektronika fakültəsi",
    short_name: "EEF",
    description:
      "Elektrik enerjisi sistemləri, elektronika, telekommunikasiya və elektrotexniki cihazlar sahəsində mütəxəssislər hazırlayan fakültə.",
    is_active: true,
  },
  {
    faculty_id: 5,
    name: "İnşaat Mühəndisliyi fakültəsi",
    short_name: "İMF",
    description:
      "Tikinti, hidrotexniki qurğular, yol mühəndisliyi və geotexnika sahəsini əhatə edən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 6,
    name: "Nəqliyyat, Mexanika-Maşınqayırma fakültəsi",
    short_name: "NMM",
    description:
      "Avtomobil nəqliyyatı, dəmir yolu nəqliyyatı, logistika və mexanika-maşınqayırma ixtisaslarını əhatə edən fakültə.",
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
      "Şəbəkə təhlükəsizliyi, kriptoqrafiya, kiberhücumlara qarşı müdafiə metodları kafedras.",
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
  { id: 2007, cafedra_id: 103, full_name: "Əliyev Zaur Bəhruz oğlu", position: "Kafedra müdiri", academic_degree: "Texnika elmləri doktoru", photo_url: "https://ui-avatars.com/api/?name=Zaur+Aliyev&background=b71c1c&color=fff&size=200&bold=true", email: "z.aliyev@aztu.edu.az", phone: "+994 12 598 40 20", bio: "Kibertəhlükəsizlik kafedrasının müdiri. Şəbəkə müdafiəsi və kriptoqrafiya üzrə mütəxəssisdir." },
  { id: 2008, cafedra_id: 103, full_name: "Hüseynova Nərmin Fariz qızı", position: "Dosent", academic_degree: "Elmlər namizədi", photo_url: "https://ui-avatars.com/api/?name=Narmin+Huseynova&background=0d47a1&color=fff&size=200&bold=true", email: "n.huseynova@aztu.edu.az", phone: "+994 12 598 40 21", bio: "Kiberhücumlara qarşı müdafiə metodları üzrə dosent. Etik hacking kurslarını aparır." },
  { id: 2009, cafedra_id: 103, full_name: "Mustafayev Rauf Elnur oğlu", position: "Müəllim", photo_url: "https://ui-avatars.com/api/?name=Rauf+Mustafayev&background=283593&color=fff&size=200&bold=true", email: "r.mustafayev@aztu.edu.az", phone: "+994 12 598 40 22", bio: "Şəbəkə adminstratorluğu və firewall konfiqurasiyası üzrə müəllim." },
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
