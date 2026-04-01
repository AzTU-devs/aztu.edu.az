export interface AdminEducation {
  year: string;
  degree: string;
  institution: string;
}

export interface AdminDirector {
  full_name: string;
  father_name: string;
  title: string;
  academic_degree?: string;
  photo_url: string;
  email: string;
  phone: string;
  office?: string;
  bio: string;
  education: AdminEducation[];
}

export interface AdminWorker {
  id: number;
  full_name: string;
  father_name: string;
  title: string;
  academic_degree?: string;
  photo_url: string;
  email: string;
  phone: string;
  bio: string;
  education?: AdminEducation[];
}

export interface AdminDocument {
  id: number;
  title: string;
  date: string;
  file_url: string;
}

export interface AdminDepartment {
  slug: string;
  name: string;
  name_en: string;
  director: AdminDirector;
  workers: AdminWorker[];
  normativ_senedler: AdminDocument[];
  objectives: string[];
  core_functions: string[];
}

export const ADMIN_DEPARTMENTS: AdminDepartment[] = [
  {
    slug: "research-development",
    name: "Elmi Tədqiqat və Reputasiya İdarəsi",
    name_en: "Research Development and Reputation Office",
    director: {
      full_name: "Əliyev Tərlan",
      father_name: "Rauf oğlu",
      title: "İdarə rəisi",
      academic_degree: "t.f.d., dosent",
      photo_url:
        "https://ui-avatars.com/api/?name=Tarlan+Aliyev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
      email: "t.aliyev@aztu.edu.az",
      phone: "+994 12 539 08 30",
      office: "Baş bina, 312-ci otaq",
      bio: "AzTU-nun elmi tədqiqat fəaliyyətini koordinasiya edir, beynəlxalq reytinq sistemlərindəki mövqeyin artırılmasına cavabdehdir. Universitetin elmi potensialının gücləndirilməsi, tədqiqatçıların elmi nəşrlərinin stimullaşdırılması və institusional reputasiyanın idarə edilməsi istiqamətlərini əhatə edən strategiyaların hazırlanması sahəsindəki fəaliyyəti ilə tanınır.",
      education: [
        { year: "2005", degree: "Bakalavr", institution: "AzTU" },
        { year: "2007", degree: "Magistr", institution: "AzTU" },
        { year: "2012", degree: "Fəlsəfə doktoru", institution: "AMEA" },
      ],
    },
    workers: [
      {
        id: 4001,
        full_name: "Nəsirov Əli",
        father_name: "Kamran oğlu",
        title: "Baş mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Ali+Nasirov&background=263238&color=fff&size=200&bold=true",
        email: "a.nasirov@aztu.edu.az",
        phone: "+994 50-312-44-21",
        bio: "Elmi tədqiqat idarəsinin baş mütəxəssisi. Elmi nəşrlər və indeksləmə sistemləri üzrə koordinasiya işlərini aparır.",
        education: [
          { year: "2010", degree: "Bakalavr", institution: "AzTU" },
          { year: "2013", degree: "Magistr", institution: "AzTU" },
        ],
      },
      {
        id: 4002,
        full_name: "Məmmədova Lalə",
        father_name: "Rəşid qızı",
        title: "Mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Lala+Mammadova&background=880e4f&color=fff&size=200&bold=true",
        email: "l.mammadova@aztu.edu.az",
        phone: "+994 51-422-18-93",
        bio: "Beynəlxalq reytinq sistemləri ilə əlaqədar məlumatların toplanması və hesabatların hazırlanması üzrə mütəxəssisdir.",
      },
      {
        id: 4003,
        full_name: "Hüseynov Elmar",
        father_name: "Samir oğlu",
        title: "Mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Elmar+Huseynov&background=00695c&color=fff&size=200&bold=true",
        email: "e.huseynov@aztu.edu.az",
        phone: "+994 55-613-72-04",
        bio: "Patent tədqiqatı və intellektual mülkiyyət hüquqlarının qorunması üzrə mütəxəssisdir.",
      },
      {
        id: 4004,
        full_name: "Quliyeva Aytən",
        father_name: "Bəhruz qızı",
        title: "Kargüzar",
        photo_url:
          "https://ui-avatars.com/api/?name=Aytan+Quliyeva&background=1565c0&color=fff&size=200&bold=true",
        email: "a.quliyeva.etri@aztu.edu.az",
        phone: "+994 50-899-44-12",
        bio: "İdarənin sənəd dövriyyəsi və arxiv işlərini aparır.",
      },
    ],
    normativ_senedler: [
      {
        id: 5001,
        title: "Elmi tədqiqat fəaliyyəti qaydaları",
        date: "2023-03-15",
        file_url: "#",
      },
      {
        id: 5002,
        title: "Patent siyasəti və intellektual mülkiyyət qaydaları",
        date: "2023-06-01",
        file_url: "#",
      },
      {
        id: 5003,
        title: "Elmi nəşr standartları və tələbləri",
        date: "2024-01-10",
        file_url: "#",
      },
    ],
    objectives: [
      "AzTU-nun elmi tədqiqat potensialını inkişaf etdirmək və elmi nailiyyətlərini beynəlxalq arenada tanıtmaq",
      "Universitetin reytinq göstəricilərini sistematik olaraq izləmək, analiz etmək və artırmaq üçün strategiyalar hazırlamaq",
      "Elmi tədqiqat layihələrinin maliyyələşdirilməsi üçün qrantlar və beynəlxalq fondlarla əməkdaşlığı genişləndirmək",
      "Akademik heyətin elmi fəaliyyətini stimullaşdırmaq, patent, ixtirac və innovativ ideyaların praktikaya tətbiqini dəstəkləmək",
    ],
    core_functions: [
      "Beynəlxalq elmi reytinq sistemlərinin (QS, THE, Scopus, WoS) tələblərinə uyğun məlumatların toplanması və hesabatların hazırlanması",
      "Elmi tədqiqat layihələrinin planlaşdırılması, monitorinqi və hesabatlarının idarə edilməsi",
      "Patent və innovasiya fəaliyyətinin koordinasiyası, intellektual mülkiyyət hüquqlarının qorunması üzrə dəstək",
      "Elmi nəşrlər, konfranslar və simpoziumların təşkili və əlaqələndirilməsi",
      "Tədqiqatçılar üçün elmi qrant müraciətlərinin hazırlanmasına metodiki yardım göstərilməsi",
    ],
  },
  {
    slug: "international-affairs",
    name: "Beynəlxalq Əlaqələr İdarəsi",
    name_en: "International Affairs Office",
    director: {
      full_name: "Hüseynova Gülnar",
      father_name: "Elçin qızı",
      title: "İdarə rəisi",
      photo_url:
        "https://ui-avatars.com/api/?name=Gulnar+Huseynova&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
      email: "g.huseynova@aztu.edu.az",
      phone: "+994 12 539 08 40",
      office: "Baş bina, 215-ci otaq",
      bio: "Beynəlxalq təhsil müəssisələri ilə əməkdaşlığı koordinasiya edir, mübadiləprogramlarını idarə edir. AzTU-nun xarici tərəfdaşlarla münasibətlərinin inkişafında mühüm rol oynayır. Erasmus+, Fulbright və digər beynəlxalq proqramlar çərçivəsində universitetin iştirakını genişləndirmişdir.",
      education: [
        { year: "2003", degree: "Bakalavr", institution: "BDU" },
        { year: "2006", degree: "Magistr", institution: "BDU" },
        { year: "2011", degree: "Fəlsəfə doktoru", institution: "AMEA" },
      ],
    },
    workers: [
      {
        id: 4101,
        full_name: "Babayev Kamran",
        father_name: "Tural oğlu",
        title: "Baş mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Kamran+Babayev&background=0277bd&color=fff&size=200&bold=true",
        email: "k.babayev@aztu.edu.az",
        phone: "+994 50-741-29-83",
        bio: "Beynəlxalq əməkdaşlıq müqavilələrinin hazırlanması və icrasına nəzarət edir. Xarici universitetlərlə əlaqə məsələlərini koordinasiya edir.",
        education: [
          { year: "2008", degree: "Bakalavr", institution: "AzTU" },
          { year: "2011", degree: "Magistr", institution: "AzTU" },
        ],
      },
      {
        id: 4102,
        full_name: "Rzayeva Nigar",
        father_name: "Fuad qızı",
        title: "Mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Nigar+Rzayeva&background=4a148c&color=fff&size=200&bold=true",
        email: "n.rzayeva@aztu.edu.az",
        phone: "+994 51-508-37-64",
        bio: "Tələbə və müəllim mübadilə proqramlarının (Erasmus+, DAAD) inzibati dəstəyini təmin edir.",
      },
      {
        id: 4103,
        full_name: "Səmədov Fərid",
        father_name: "Vüsal oğlu",
        title: "Mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Farid+Samadov&background=1b5e20&color=fff&size=200&bold=true",
        email: "f.samadov@aztu.edu.az",
        phone: "+994 55-229-41-07",
        bio: "Beynəlxalq konfranslar, seminarlar və vebinarların təşkili üzrə mütəxəssisdir.",
      },
      {
        id: 4104,
        full_name: "Cəfərova Xədicə",
        father_name: "Orxan qızı",
        title: "Kargüzar",
        photo_url:
          "https://ui-avatars.com/api/?name=Xadica+Cafarova&background=bf360c&color=fff&size=200&bold=true",
        email: "x.cafarova@aztu.edu.az",
        phone: "+994 50-314-88-56",
        bio: "İdarənin sənəd dövriyyəsi, yazışmaları və arxiv işlərini aparır.",
      },
    ],
    normativ_senedler: [
      {
        id: 5101,
        title: "Beynəlxalq əməkdaşlıq qaydaları",
        date: "2023-02-20",
        file_url: "#",
      },
      {
        id: 5102,
        title: "Tələbə mübadilə proqramlarının əsasnaməsi",
        date: "2023-09-01",
        file_url: "#",
      },
      {
        id: 5103,
        title: "Xarici vətəndaşların qəbul prosedurları",
        date: "2024-02-15",
        file_url: "#",
      },
    ],
    objectives: [
      "AzTU-nun beynəlxalq əlaqələr şəbəkəsini genişləndirmək və yeni tərəfdaşlıqlar qurmaq",
      "Tələbə və akademik heyətin beynəlxalq mübadilə proqramlarına iştirakını artırmaq",
      "Xarici universitetlər, tədqiqat mərkəzləri və sənaye qurumları ilə birgə tədris və tədqiqat layihələri həyata keçirmək",
      "Universitetin beynəlxalq görünürlüğünü artırmaq, qlobal reytinqlər üçün beynəlxalq əməkdaşlıq göstəricilərini yaxşılaşdırmaq",
    ],
    core_functions: [
      "Xarici universitetlər və beynəlxalq təşkilatlarla əməkdaşlıq müqavilələrinin hazırlanması, imzalanması və icrasına nəzarət",
      "Erasmus+, DAAD, Fulbright və digər beynəlxalq mübadilə proqramlarının koordinasiyası",
      "Xarici tələbə, müəllim və tədqiqatçıların AzTU-ya qəbulu prosedurlarının idarə edilməsi",
      "Beynəlxalq konfranslar, sərgilər, yay məktəbləri və birgə akademik tədbirlərin təşkili",
      "Universitetin beynəlxalq veb-saytı, ingilis dilli nəşriyyat materiallarının hazırlanması və yenilənməsi",
    ],
  },
  {
    slug: "secretaries-counsels",
    name: "Katiblik və Hüquq Şöbəsi",
    name_en: "Secretariat and Legal Office",
    director: {
      full_name: "Mustafayev İlham",
      father_name: "Azər oğlu",
      title: "Şöbə rəisi",
      academic_degree: "Hüquq üzrə fəlsəfə doktoru",
      photo_url:
        "https://ui-avatars.com/api/?name=Ilham+Mustafayev&background=1a2355&color=fff&size=300&bold=true&font-size=0.38",
      email: "i.mustafayev@aztu.edu.az",
      phone: "+994 12 539 08 50",
      office: "Baş bina, 102-ci otaq",
      bio: "Universitetin hüquqi məsələlərini koordinasiya edir, normativ sənəd bazasının formalaşdırılmasına rəhbərlik edir. AzTU-nun daxili nizamnamə, əsasnamə və tənzimləyici sənədlərinin hazırlanmasında aparıcı rol oynayır.",
      education: [
        { year: "2000", degree: "Bakalavr", institution: "BDU Hüquq fakültəsi" },
        { year: "2003", degree: "Magistr", institution: "BDU" },
        { year: "2009", degree: "Fəlsəfə doktoru", institution: "AMEA Fəlsəfə İnstitutu" },
      ],
    },
    workers: [
      {
        id: 4201,
        full_name: "Əliyeva Sevinc",
        father_name: "Tahir qızı",
        title: "Baş hüquqşünas",
        photo_url:
          "https://ui-avatars.com/api/?name=Sevinc+Aliyeva&background=37474f&color=fff&size=200&bold=true",
        email: "s.aliyeva.hq@aztu.edu.az",
        phone: "+994 50-521-33-78",
        bio: "Müqavilələrin hüquqi ekspertizası, şikayətlərə baxılması və daxili normativ sənədlərin hazırlanması üzrə mütəxəssisdir.",
      },
      {
        id: 4202,
        full_name: "Kərimov Nicat",
        father_name: "Elnur oğlu",
        title: "Katib",
        photo_url:
          "https://ui-avatars.com/api/?name=Nijat+Karimov&background=c62828&color=fff&size=200&bold=true",
        email: "n.karimov.ktb@aztu.edu.az",
        phone: "+994 51-703-28-41",
        bio: "Universitetin rəsmi yazışmalarını, giriş-çıxış sənədlərini və iclas protokollarını idarə edir.",
      },
      {
        id: 4203,
        full_name: "Abbasova Zəhra",
        father_name: "Ramil qızı",
        title: "Mütəxəssis",
        photo_url:
          "https://ui-avatars.com/api/?name=Zahra+Abbasova&background=006064&color=fff&size=200&bold=true",
        email: "z.abbasova.ktb@aztu.edu.az",
        phone: "+994 55-418-90-22",
        bio: "Daxili normativ aktlar, əmr və sərəncamların qeydiyyatını aparır.",
      },
    ],
    normativ_senedler: [
      {
        id: 5201,
        title: "AzTU Nizamnaməsi",
        date: "2022-09-01",
        file_url: "#",
      },
      {
        id: 5202,
        title: "Daxili intizam qaydaları",
        date: "2023-01-15",
        file_url: "#",
      },
      {
        id: 5203,
        title: "Şikayət və müraciət prosedurları",
        date: "2023-11-20",
        file_url: "#",
      },
    ],
    objectives: [
      "Universitetin hüquqi cəhətdən düzgün fəaliyyətini təmin etmək və qanunvericiliyə uyğunluğa nəzarət etmək",
      "Daxili normativ-hüquqi bazanı müasir tələblərə uyğun formalaşdırmaq və yeniləmək",
      "Tələbə, müəllim və inzibati işçilərin hüquqi məsələlər üzrə müraciətlərinə operativ baxmaq",
      "Universitetin müqavilə öhdəliklərinin düzgün icrası üzərində hüquqi nəzarəti həyata keçirmək",
    ],
    core_functions: [
      "Universitetin nizamnamə, əsasnamə, daxili qayda və prosedurlarının hazırlanması və yenilənməsi",
      "Bağlanan müqavilə və sazişlərə hüquqi ekspertiza aparılması",
      "Tələbə, işçi və tərəfdaşların şikayət və müraciətlərinə baxılması",
      "Universitetin daxili sənəd dövriyyəsinin (əmr, sərəncam, protokol) idarə edilməsi",
      "Dövlət qurumları ilə yazışma və rəsmi əlaqələrin aparılması",
    ],
  },
];

export function getDepartment(slug: string): AdminDepartment | undefined {
  return ADMIN_DEPARTMENTS.find((d) => d.slug === slug);
}
