const MEDIA_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";
const VR_MEDIA = `${MEDIA_BASE}/media/prod/vice-rectors`;

const az = {
  common: {
    readMore: "Ətraflı oxu",
    viewAll: "Hamısını gör",
    loading: "Yüklənir...",
    home: "Ana səhifə",
    lms: "LMS",
    kts: "QA",
    alumni: "Məzunlar",
    libraryAztu: "Kitabxana",
    quickMenu: {
      button: "Sürətli Keçid",
      navigation: "Naviqasiya",
      title: "SÜRƏTLİ<br/>GİRİŞ",
      slogan: "Mühəndislik gələcəyini qururuq",
      portal: "Portal",
      sections: {
        platform: {
          title: "Platforma",
          items: {
            lms: "LMS",
            internalGrants: "Daxili Qrant Müsabiqəsi",
            planReport: "Plan-Hesabat İnformasiya Sistemi",
          }
        },
        alumni: {
          title: "Məzunlar",
          items: {
            portal: "Məzun Portalı",
            honoraryDoctors: "Fəxri Doktorlar",
            honoraryGraduates: "Fəxri Məzunlar",
            heroes: "Qəhrəmanlarımız",
          }
        },
        whyAztu: {
          title: "Niyə AzTU?",
          items: {
            infrastructure: "İnfrastruktur",
            startups: "Startaplar",
            dualDegree: "İkili Diplom Proqramları",
            scholarships: "Təqaüdlər",
          }
        }
      },
      leftItems: {
        ranking: "Reytinq",
        accreditation: "Akkreditasiya",
        policies: "Siyasətlər",
        reports: "Hesabatlar",
        faq: "MTE (Məkanların Təsviri və Analizi)",
      }
    },
    search: "Axtar",
    moreInSection: "Bu bölmədə daha çox",
    comingSoon: "Tezliklə",
    backToHome: "Ana səhifəyə qayıt",
  },

  nav: {
    sections: {
      about: "HAQQIMIZDA",
      academics: "TƏDRİS",
      administration: "İDARƏETMƏ",
      students: "TƏLƏBƏLƏR",
      research: "TƏDQİQAT",
      community: "İCMA",
    },
    items: {
      historyOfAztu: "AzTU-nun Tarixi",
      visionMission: "Vizyon və Missiya",
      visionMissionGoal: "Vizyon, Missiya və Məqsəd",
      vision: "Vizyon",
      mission: "Missiya",
      strategicPlan: "Strateji Plan",
      anniversaryFilm: "75 İllik Yubiley Filmi",
      leadershipGovernance: "Rəhbərlik və İdarəetmə",

      rector: "Rektor",
      viceRector: "Prorektor",
      scientificBoard: "Elmi Şura",
      affiliatedEntities: "Bağlı Qurumlar",
      tau: "Türkiyə-Azərbaycan Universiteti (TAU)",
      iit: "İnformasiya Texnologiyaları İnstitutu",
      ics: "İdarəetmə Sistemləri İnstitutu",
      bakuTechnicalColleges: "Bakı Texniki Kollecləri",
      bakuStateColleges: "Bakı Dövlət Kollecləri",
      policiesDocuments: "Siyasətlər və Sənədlər",
      generalPolicies: "Ümumi Siyasətlər",
      academicPolicies: "Akademik Siyasətlər",
      sustainabilityPolicies: "Davamlılıq Siyasətləri",
      procedureGuidelines: "Prosedurlar və Qaydalar",
      faculties: "Fakültələr",
      cafedras: "Kafedralar",
      higherEducationInstitutes: "Ali Təhsil İnstitutları",
      bakuStateCollegesComm: "Bakı Rabitə və Nəqliyyat Dövlət Kollecləri",
      mba: "MBA",
      lifeLongLearning: "Ömürboyu Öyrənmə",
      departments: "Şöbələr",
      researchDevelopment: "Tədqiqat, İnkişaf və Reputasiya",
      internationalAffairs: "Beynəlxalq Əlaqələr",
      secretariesCounsels: "Katib və Müşavirlər",
      academicCalendar: "Akademik Təqvim",
      academicCalendar2026: "2026-2027 Akademik Təqvimi",
      academicCalendar2025: "2025-2026 Akademik Təqvimi",
      undergraduate: "Bakalavr",
      specialties: "İxtisaslar",
      curriculum: "Tədris Planı",
      learningOutcomes: "Öyrənmə Nəticələri",
      tuitionFees: "Təhsil Haqqı",
      postgraduates: "Magistratura",
      cdio: "CDIO",
      higherEducationInstitute: "Yüksək Təhsil İnstitutu (YTİ)",
      internationalStudents: "Beynəlxalq Tələbələr Bölməsi",
      exchangePrograms: "Mübadilə Proqramları",
      orhunExchange: "Orhun Mübadilə Proqramı",
      lmsGuidelines: "LMS Qaydaları",
      researchActivities: "Tədqiqat Fəaliyyəti",
      researchInstitutes: "Tədqiqat İnstitutları",
      researchLaboratories: "Tədqiqat Laboratoriyaları",
      researchPriorities: "Tədqiqat Prioritetləri",
      campusLife: "Kampus Həyatı",
      studentLife: "Tələbə Həyatı",
      clubs: "Klublar",
      sport: "İdman",
      culturalEvents: "Mədəni Tədbirlər",
      aztuPolyclinic: "AzTU Poliklinikası",
      tradeUnion: "Həmkarlar İttifaqı",
      studentTradeUnion: "Tələbə Həmkarlar İttifaqı",
      studentYouthOrg: "Tələbə Gənclər Təşkilatı",
      universityCooperation: "Universitet Əməkdaşlığı",
      collaborations: "Əməkdaşlıqlar",
      formerRectors: "Sabiq Rektorlar",
      rankings: "Reytinqlər",
    },
  },

  hero: {
    title: "Mühəndisliyin Gələcəyini Qururuq",
    button: "Daha çox kəşf et",
    stats: [
      { label: "QS Reytinqi", value: "851+" },
      { label: "THE Reytinqi", value: "1501+" },
      { label: "GreenMetric", value: "Top 800" },
      { label: "Tələbələr", value: "10000+" },
    ],
  },

  stats: {
    sectionLabel: "Rəqəmlərdə AzTU",
    sectionTitle: "Rəqəmlərlə Universitetimiz",
    items: [
      { label: "Fakültə", sublabel: "Akademik bölmələr" },
      { label: "Kafedra", sublabel: "Tədris və elmi" },
      { label: "İxtisas", sublabel: "Bakalavr və magistratura" },
      { label: "Tələbə", sublabel: "Aktiv qeydiyyatlı" },
      { label: "Akademik heyət", sublabel: "Müəllim və tədqiqatçı" },
      { label: "Beynəlxalq tərəfdaş", sublabel: "Universitet və qurum" },
      { label: "Laboratoriya", sublabel: "Tədqiqat və tədris" },
    ],
  },

  news: {
    sectionLabel: "Xəbərlər",
    sectionTitle: "Son",
    sectionTitleAccent: "Yeniliklər",
    viewAll: "Hamısına bax",
    readMore: "Daha çox",
    pageTitle: "Xəbərlər",
    pageDescription: "Universitetimizin son xəbərləri, elanları və mühüm hadisələri.",
    breadcrumb: "Xəbərlər",
    categoryAll: "Hamısı",
    loadMore: "Daha çox yüklə",
  },

  announcements: {
    sectionLabel: "Elanlar",
    sectionTitle: "Son Elanlar",
    viewAll: "Hamısına bax",
    months: ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt", "Noy", "Dek"],
  },

  collaborators: {
    sectionLabel: "Tərəfdaşlar",
    sectionTitle: "Əməkdaşlıq Etdiyimiz Qurumlar",
    viewAll: "Hamısına bax",
  },

  projects: {
    sectionLabel: "Layihələr",
    sectionTitle: "Tədqiqat və İnnovasiya Layihələri",
    viewAll: "Hamısına bax",
  },

  search: {
    header: "Saytda axtar",
    placeholder: "Axtarış üçün yazın...",
    popularLabel: "Populyar axtarışlar",
    suggestions: ["Qəbul", "İxtisaslar", "Təqaüd", "Beynəlxalq", "Kitabxana"],
  },

  pages: {
    contact: {
      eyebrow: "Əlaqə",
      title: "Bizimlə Əlaqə",
      subtitle: "Sualınız var? Bizə yazın və ya zəng edin. Sizə kömək etməkdən məmnun olarıq.",
      breadcrumb: "Əlaqə",
      description: "Azərbaycan Texniki Universiteti ilə əlaqə saxlamaq üçün aşağıdakı məlumatlardan istifadə edə bilərsiniz. Tədris, qəbul və ya digər məsələlərlə bağlı suallarınız üçün bizə müraciət edin.",
      sections: {
        address: {
          label: "Ünvan",
          value: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073",
          sub: "Azərbaycan Texniki Universiteti",
        },
        phone: {
          label: "Telefon",
          value: "(+994 12) 539-13-05",
          sub: "Məlumat mərkəzi",
        },
        email: {
          label: "E-poçt",
          value: "aztu@aztu.edu.az",
          sub: "Rəsmi yazışmalar üçün",
        },
        hours: {
          label: "İş saatları",
          value: "Bazar ertəsi – Cümə",
          sub: "09:00 – 18:00",
        },
        locationTitle: "Məkanımız",
        universityName: "Azərbaycan Texniki Universiteti",
        buildingInfo: "Əsas tədris korpusu",
      },
    },

    about: {
      hei: {
        eyebrow: "Təhsil və Proqramlar",
        title: "Yüksək Təhsil İnstitutu (YTİ)",
        subtitle: "Müasir mühəndislik mühiti üçün yüksək ixtisaslı, rəqabətədavamlı mütəxəssislərin hazırlanması.",
        breadcrumb: "Yüksək Təhsil İnstitutu",
        aboutTitle: "İnstitut haqqında",
        paragraphs: [
          "Azərbaycan Texniki Universitetinin (AzTU) nəzdində fəaliyyət göstərən Yüksək Təhsil İnstitutu universitetin Elmi Şurasının 27 dekabr 2021-ci il tarixli qərarı ilə yaradılmışdır. İnstitut AzTU-da magistratura və doktorantura səviyyələrində təhsil və elmi-tədqiqat fəaliyyətlərinin mərkəzləşdirilmiş şəkildə təşkili və inkişafını təmin edən əsas struktur bölmələrdən biridir.",
          "İnstitutun yaradılmasında əsas məqsəd müasir dövrün tələblərinə uyğun, yüksək ixtisaslı, rəqabətqabiliyyətli və innovativ düşüncəyə malik mütəxəssislərin hazırlanması, həmçinin elmi fəaliyyətin keyfiyyətinin artırılması və beynəlxalq standartlara uyğunlaşdırılmasıdır."
        ],
        missionTitle: "Missiya və strateji istiqamətlər",
        missionText: "Yüksək Təhsil İnstitutunun missiyası texniki və mühəndislik sahələri üzrə müasir bilik və bacarıqlara malik, analitik və yaradıcı təfəkkürlü, tədqiqat və idarəetmə qabiliyyətləri inkişaf etmiş peşəkar kadrlar yetişdirməkdir. İnstitut eyni zamanda elmi fəaliyyətin inkişafına töhfə verməyi, innovativ yanaşmaları təşviq etməyi və universitetin beynəlxalq akademik mühitə inteqrasiyasını gücləndirməyi hədəfləyir.",
        strategicDirections: [
          "Magistratura və doktorantura səviyyələrində tədrisin təşkili və koordinasiyası",
          "Elmi-tədqiqat fəaliyyətlərinin inkişafı və idarə olunması",
          "Gənc tədqiqatçıların hazırlanması və akademik potensialın gücləndirilməsi",
          "Beynəlxalq və yerli elmi layihələrdə iştirakın təşviqi",
          "Sənaye və istehsalatla əlaqələrin gücləndirilməsi"
        ],
        academicOpportunities: {
          title: "Təhsil imkanları",
          description: "İnstitut magistratura səviyyəsində geniş ixtisas və ixtisaslaşma spektri üzrə təhsil təklif edir. Hazırda:",
          stats: [
            "36 ixtisas üzrə",
            "126 ixtisaslaşma mövcuddur"
          ],
          languagesTitle: "Tədris çoxdilli mühitdə təşkil olunur və aşağıdakı dillərdə aparılır:",
          languages: [
            "Azərbaycan dili",
            "İngilis dili",
            "Alman dili",
            "Rus dili"
          ],
          footer: "Bu yanaşma tələbələrin beynəlxalq akademik və peşəkar mühitə daha asan inteqrasiyasına imkan yaradır."
        },
        researchTitle: "Elmi-tədqiqat fəaliyyəti",
        researchDescription: "Yüksək Təhsil İnstitutu elmi-tədqiqat işlərinin təşkili və inkişafına xüsusi önəm verir. İnstitut magistrant, doktorant və dissertantlara elmi fəaliyyətin bütün mərhələlərində dəstək göstərir. Bu dəstək aşağıdakı istiqamətləri əhatə edir:",
        researchItems: [
          "Elmi tədqiqatların planlaşdırılması və aparılması",
          "Dissertasiya mövzularının aktual və tətbiqyönümlü istiqamətlər üzrə seçilməsi",
          "Sənaye problemlərinə yönəlmiş tədqiqatların təşviqi",
          "Beynəlxalq elmi jurnallarda nəşrlərin dəstəklənməsi",
          "Elmi konfrans və simpoziumlarda iştirak imkanlarının yaradılması"
        ],
        researchFooter: "İnstitut həmçinin müasir elmi nailiyyətləri və innovativ texnologiyaları izləyərək onların tədris və tədqiqat prosesinə inteqrasiyasını təmin edir." ,
        doctoralTitle: "Doktorantura təhsili",
        doctoralDescription: "AzTU-da doktorantura ali təhsilin ən yüksək səviyyəsi olmaqla fəlsəfə doktoru (PhD) və elmlər doktoru elmi dərəcələrinin verilməsi ilə yekunlaşır.",
        doctoralFormatsTitle: "Doktorantura təhsili aşağıdakı formalarda həyata keçirilir:",
        doctoralFormats: [
          "Əyani (istehsalatdan ayrılmaqla)",
          "Qiyabi (istehsalatdan ayrılmamaqla)",
          "Dissertantlıq yolu ilə"
        ],
        doctoralDuration: {
          title: "Təhsil müddəti:",
          phd: {
            title: "Fəlsəfə doktoru (PhD):",
            items: ["Əyani: 3 il", "Qiyabi: 4 il", "Dissertantlıq: 4 il"]
          },
          ds: {
            title: "Elmlər doktoru:",
            items: ["Əyani: 4 il", "Qiyabi: 5 il", "Dissertantlıq: 5 il"]
          },
          footer: "Zəruri hallarda mövcud qanunvericiliyə uyğun olaraq təhsil müddəti uzadıla bilər."
        },
        doctoralAdmission: "Doktoranturaya qəbul müsabiqə əsasında həyata keçirilir və müraciət edən şəxslər magistr dərəcəsinə və ya ona bərabər tutulan ali təhsil səviyyəsinə malik olmalıdırlar.",
        director: {
          title: "Direktor",
          name: "Aynurə Manaf qızı İsmayılova",
          degree: "iqtisad üzrə fəlsəfə doktoru, dosent",
          email: "aynura.ismayilova@aztu.edu.az",
          phone: "daxili 3201",
          office: "I tədris binası, 206 nömrəli otaq",
          hours: "Cümə, 15:00-19:00",
          bio: "Aynurə İsmayılova layihələrin idarə edilməsi və iqtisadi tədqiqat sahəsində 15 ildən artıq beynəlxalq təcrübəyə malik mütəxəssisdir. O, karyerasına 2004-cü ildə Azərbaycan Milli Elmlər Akademiyasında başlamış, daha sonra UNDP və Azərbaycan Respublikasının İqtisadiyyat Nazirliyinin birgə layihəsində layihə meneceri kimi fəaliyyət göstərmişdir. İqtisadi İslahatlar Elmi-Tədqiqat İnstitutunda şöbə müdiri və direktor müavini vəzifələrində çalışmışdır.\n\nBeynəlxalq maliyyə və inkişaf institutları ilə geniş əməkdaşlıq təcrübəsinə malik olan Aynurə İsmayılova Asiya İnkişaf Bankı (ADB), İslam İnkişaf Bankı (IsDB), İqtisadi Əməkdaşlıq Təşkilatı (ECO) və TİKA kimi qurumların dəstəyi ilə həyata keçirilən layihələrdə rəhbər və koordinator kimi iştirak etmişdir.\n\n2012–2021-ci illərdə ECO Tədqiqat Mərkəzinin yaradılması üzrə işçi qrupunun üzvü olmuş, regional əməkdaşlıq və analitik hesabatların hazırlanmasına töhfə vermişdir. Onun fəaliyyəti beynəlxalq səviyyədə yüksək qiymətləndirilmiş, 2016-cı ildə Qırğızıstan Respublikasının Maliyyə Nazirliyi tərəfindən təltif olunmuşdur.\n\nBeynəlxalq akademik mühitdə fəal iştirak edən A. İsmayılova Çin, Almaniya və Cənubi Koreyada mübadilə və qonaq tədqiqatçı proqramlarında iştirak etmiş, 40-a yaxın beynəlxalq elmi tədbirdə təmsil olunmuşdur.\n\n2021-ci ildən Azərbaycan Texniki Universitetində fəaliyyət göstərir. Universitet–sənaye əməkdaşlığının inkişafında fəal rol oynayaraq TUSAŞ ilə birgə həyata keçirilən “MGP”, “SKY Global” və “Lift UP” kimi strateji proqramlara rəhbərlik etmişdir. Hazırda İqtisadiyyat və statistika kafedrasının dosenti kimi fəaliyyət göstərir.",
          achievements: "Bakı Dövlət Universitetinin məzunu olan Aynurə İsmayılova 2021-ci ildə iqtisad üzrə fəlsəfə doktoru elmi dərəcəsini almışdır. O, həmçinin layihələrin idarə olunması sahəsində IPMA Level B beynəlxalq sertifikatına malikdir. 2014-cü ildə Azərbaycan Respublikasının Prezidenti tərəfindən “Tərəqqi” medalı ilə təltif olunmuşdur.",
          researchInterestsTitle: "Elmi-tədqiqat sahələri",
          researchInterests: [
            "Layihələrin idarə edilməsi",
            "Regional iqtisadi əməkdaşlıq",
            "Universitet–sənaye əməkdaşlığı modelləri",
            "İnnovasiya siyasəti və institusional inkişaf",
            "Ömürboyu öyrənmə və kompetensiya əsaslı təhsil modelləri",
            "Rəqəmsal transformasiya və ali təhsil idarəçiliyi"
          ],
          educationTitle: "Təhsil",
          educationItems: [
            { period: "2012-2016", degree: "Dissertantura", inst: "AR İqtisadiyyat Nazirliyinin İqtisadi İslahatlar Elmi-Tədqiqat İnstitutu (İİETİ)" },
            { period: "2001-2003", degree: "Magistratura", inst: "Bakı Dövlət Universiteti, Tətbiqi riyaziyyat və kibernetika fakültəsi" },
            { period: "1997-2001", degree: "Bakalavriat", inst: "Bakı Dövlət Universiteti, Tətbiqi riyaziyyat və kibernetika fakültəsi" }
          ]
        },
        staffTitle: "Əməkdaşlar",
        staffDescription: "YTİ-də fəaliyyət göstərən əməkdaşlar haqqında məlumat:",
        staff: [
          { name: "Həcər Tahir qızı Əliyeva", pos: "Doktorantura proqram meneceri", degree: "-", email: "hecer.aliyeva@aztu.edu.az", phone: "+994 050 584 20 73" },
          { name: "Kamran Əli oğlu Əbilov", pos: "Magistr proqram meneceri", degree: "-", email: "kamran.ebilov@aztu.edu.az", phone: "+994 077 761 59 22" },
          { name: "Aynur Şəmməd qızı Hüseynova", pos: "Tələbələrlə iş üzrə menecer", degree: "-", email: "aynur.huseynova@aztu.edu.az", phone: "+994 055 449 96 06" }
        ],
        contactInfo: {
          title: "Əlaqə",
          address: "I tədris binası, otaq № 414",
          phone: "3201",
          email: "yti@aztu.edu.az",
          hours: "09:00-18:00 (I-V) və 18:00-21:00 (II-III-IV)"
        },
        board: {
          title: "İdarə Heyəti",
          intro: "Yüksək Təhsil İnstitutunun (YTİ) İdarə Heyətinin vəzifələri:",
          duties: [
            "YTİ-nin strateji fəaliyyət istiqamətlərini müəyyən etmək, 5 və 10 illik müddətləri əhatə edən orta və uzunmüddətli strateji inkişaf planlarını hazırlamaq;",
            "YTİ-nin Elmi Şurası tərəfindən qəbul edilən və İnstitut direktoru tərəfindən təqdim olunan illik fəaliyyət planlarını təsdiq etmək;"
          ],
          note: "İdarə Heyəti ictimai əsaslarla fəaliyyət göstərir.",
          rightsTitle: "İdarə Heyətinin hüquqları:",
          rights: [
            "YTİ-nin adından sənaye müəssisələri ilə tərəfdaşlıq əlaqələri qurmaq;",
            "YTİ-nin illik fəaliyyəti barədə birbaşa AzTU-nun Elmi Şurasına və Rektoruna hesabat vermək"
          ],
          compositionTitle: "İdarə Heyətinin tərkibi:",
          composition: [
            "İdarə Heyətinin tərkibi 10 üzv və 1 sədrdən ibarətdir;",
            "5 üzv AzTU-dan, 6 üzv sənaye müəssisələrindən müəyyən olunur;",
            "AzTU-dan olan üzvlər Rektorun əmri ilə təyin olunur. Onlardan bir nəfər İdarə Heyətinin sədri təyin edilir.",
            "Sənaye müəssisələrini təmsil edən 6 üzv AzTU rektorunun (və ya tədris işləri üzrə prorektorun) rəsmi müraciəti əsasında iri müəssisələr tərəfindən təqdim edilən nümayəndələrdən formalaşır. Hər müəssisəni yalnız 1 (bir) nümayəndə təmsil edə bilər.",
            "İdarə Heyətinin üzvləri 1 (bir) il müddətinə təyin olunur və hər il yenidən formalaşdırılır.",
            "Sənaye müəssisələri eyni şəxsi qeyri-məhdud sayda üzv kimi təqdim edə bilər.",
            "AzTU-dan olan üzv (sədr daxil olmaqla) ardıcıl iki dəfədən artıq təyin oluna bilməz."
          ],
          requirementsTitle: "İdarə Heyətinin üzvlərinə olan tələblər:",
          requirements: [
            "Sənaye müəssisələrindən olan üzvlər üçün: Strateji inkişaf şöbəsinin müdiri, İdarə Heyətinin üzvü, İcraçı Direktorun müavini və digər qərar qəbul edən rəhbər şəxs olmalıdır.",
            "AzTU-dan təyin olunan üzvlər üçün: Ən azı fəlsəfə doktoru elmi dərəcəsi; minimum 1 il elmi-pedaqoji təcrübə; minimum 1 il inzibati idarəetmə təcrübəsi (dekan, kafedra müdiri, şöbə müdiri və s.). Dövlət və özəl müəssisələrdə təcrübəsi olanlara üstünlük verilir."
          ],
          chairman: "İdarə Heyətinin sədri i.e.f.d. F.O.Məmmədovdur (fariz.mammadov@aztu.edu.az)."
        },
        related: [
          { title: "Tərəfdaş Universitetlər", href: "/haqqimizda/terefdas-universitet-ve-elaqeli-institutlar" },
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
        ]
      },

      rankings: {
        eyebrow: "Reytinqlər",
        title: "Beynəlxalq Reytinqlər",
        subtitle: "AzTU-nun qlobal səviyyədə tanınması və təhsil keyfiyyətinin beynəlxalq göstəriciləri.",
        breadcrumb: "Reytinqlər",
        importanceTitle: "Əhəmiyyəti",
        importanceItems: [
          "Universitetlərin qlobal səviyyədə tanınmasını artırır.",
          "Təhsil keyfiyyətinin müqayisəli qiymətləndirilməsinə imkan yaradır.",
          "Beynəlxalq tələbə və tərəfdaşların cəlb olunmasına kömək edir.",
          "Strateji inkişaf və idarəetmə qərarlarına dəstək verir."
        ],
        systems: [
          {
            name: "QS World University Rankings",
            criteria: "Akademik nüfuz, işəgötürənlər arasında reputasiya, elmi tədqiqatların təsiri, beynəlmiləlləşmə səviyyəsi.",
            methodology: "https://www.topuniversities.com/world-university-rankings/methodology",
            logo: "/logos/qs-logo.svg"
          },
          {
            name: "Times Higher Education (THE) Rankings",
            criteria: "Tədris keyfiyyəti, elmi tədqiqat fəaliyyəti, sitatların təsiri, sənaye gəlirləri, beynəlmiləlləşmə.",
            methodology: "https://www.timeshighereducation.com/world-university-rankings/methodology",
            logo: "/logos/the-logo.svg"
          },
          {
            name: "UI GreenMetric World University Rankings",
            criteria: "Enerji istifadəsi və iqlim dəyişiklikləri, tullantıların idarə olunması, nəqliyyat siyasəti, su resurslarının idarə olunması, ekoloji təhsil və tədqiqat.",
            methodology: "https://uigreenmetric.com/rankings",
            logo: "/logos/greenmetric-logo.svg"
          }
        ],
        positionsTitle: "Beynəlxalq Reytinqlərdə Mövqeyimiz",
        positions: [
          { name: "QS Europe 2026", position: "476" },
          { name: "QS Europe 2026 (Western Asia)", position: "30" },
          { name: "QS World University Rankings (New Entrant)", position: "851-900" },
          { name: "QS World University Rankings by Subject 2026", position: "701-750" },
          { name: "The World's Most Sustainable University (2025)", position: "835" },
          { name: "The World's Most Sustainable University (2024)", position: "1014" }
        ],
        profileLink: "AzTU-nun THE profili",
        profileUrl: "https://www.timeshighereducation.com/world-university-rankings/azerbaijan-technical-university-aztu"
      },

      history: {
        eyebrow: "Mirasımız",
        title: "AzTU-nun Tarixi",
        subtitle: "1887-ci ildən bəri davam edən innovasiya və mükəmməllik yolu.",
        breadcrumb: "Tarix",
        milestonesTitle: "Əsas Mərhələlər",
        milestones: [
          { year: "1887", title: "Azərbaycanda texniki təhsilin əsası qoyuldu", description: "1887-ci il noyabrın 10-da Bakı Şəhər Dumasının qərarı ilə Bakıda 4 sinifli texniki məktəb yaradıldı. Bununla da Azərbaycanda texniki təhsilin əsası qoyuldu." },
          { year: "1905", title: "Orta texniki məktəb kimi yenidən təşkil olundu", description: "1905-ci ilin yanvarında təhsil müəssisəsi Mexanika-inşaat orta texniki məktəbi kimi yenidən təşkil edildi." },
          { year: "1910", title: "Yeni ixtisas istiqamətləri yaradıldı", description: "Mexanika şöbəsində neft mexanikası və elektromexanika ixtisasları üzrə kadr hazırlığına başlanıldı." },
          { year: "1918", title: "Politexnik məktəbi statusu aldı", description: "Azərbaycan Xalq Cümhuriyyətinin qərarına əsasən, məktəb Politexnik məktəbi adlandırıldı." },
          { year: "1920", title: "Bakı Politexnik İnstitutu yaradıldı", description: "1920-ci il noyabrın 14-də Politexnik məktəbinin bazasında Bakı Politexnik İnstitutu yaradıldı." },
          { year: "1923", title: "Azərbaycan Politexnik İnstitutu adlandırıldı", description: "1923-cü ildən etibarən təhsil müəssisəsi Azərbaycan Politexnik İnstitutu adı ilə fəaliyyətini davam etdirdi." },
          { year: "1930", title: "Azərbaycan Neft İnstitutu kimi fəaliyyət göstərdi", description: "1930-cu ildə institut Azərbaycan Neft İnstitutu adlandırıldı və neft sənayesi üçün mühəndis kadrlarının hazırlanmasında mühüm rol oynadı." },
          { year: "1934", title: "Azərbaycan Sənaye İnstitutu yaradıldı", description: "1934-cü ilin yanvarında Azərbaycan Neft İnstitutu ilə İnşaat İnstitutu birləşdirilərək Azərbaycan Sənaye İnstitutu yaradıldı." },
          { year: "1950", title: "Azərbaycan Politexnik İnstitutu yenidən təşkil edildi", description: "1950-ci ilin noyabrında Azərbaycan Politexnik İnstitutu yenidən fəaliyyətə başladı. Bu, müasir tarixin başlanğıcı hesab olunur." },
          { year: "1955", title: "Universitetin əsas binasına köçürüldü", description: "1955-ci ildən etibarən institutun bütün fakültələri universitetin indiki əsas binasında fəaliyyət göstərməyə başladı." },
          { year: "1975", title: "Yeni ali texniki təhsil müəssisələrinin yaranmasına zəmin oldu", description: "Azərbaycan Politexnik İnstitutunun bazasında Azərbaycan Memarlıq və İnşaat Universiteti və Gəncə Texnologiya İnstitutu yaradıldı." },
          { year: "1978", title: "Beynəlxalq təhsil əlaqələri genişləndirildi", description: "1978-ci ildən başlayaraq universitet xarici ölkələr üçün mütəxəssis hazırlığına başladı." },
          { year: "1983", title: "Yüksək nailiyyətlərinə görə təltif olundu", description: "İnstitut elmi-texniki sahədə qazandığı uğurlara görə SSRİ-nin müvafiq nazirliyi tərəfindən mükafatlandırıldı." },
          { year: "1991", title: "Azərbaycan Texniki Universiteti adını aldı", description: "1991-ci ildən etibarən ali təhsil müəssisəsi Azərbaycan Texniki Universiteti (AzTU) adı ilə fəaliyyət göstərir." },
          { year: "Bu gün", title: "Ölkənin aparıcı texniki ali təhsil müəssisəsi", description: "Hazırda AzTU mühəndislik, İKT, energetika və iqtisadiyyat üzrə strateji kadr hazırlığı mərkəzidir." },
        ],
        stats: [
          { value: "75+", label: "İllik Tarix" },
          { value: "25,000+", label: "Məzun" },
          { value: "1,500+", label: "Akademik Heyət" },
          { value: "12", label: "Fakültə" },
        ],
        related: [
          { title: "Vizyon", href: "/about/vision" },
          { title: "Missiya", href: "/about/mission" },
          { title: "Yubiley Filmi", href: "/about/75-illik-yubiley-filmi" },
        ],
      },

      vision: {
        eyebrow: "İstiqamətimiz",
        title: "Vizyon",
        subtitle: "Gələcəyə baxış: AzTU-nun hədəflədiyi zirvə.",
        breadcrumb: "Vizyon",
        statementTitle: "Vizyon Bəyanatımız",
        visionQuote: "Vizyonumuz innovasiya və qabaqcıl texnologiyaların tətbiqi ilə mühəndislik sahəsində regionun lider universiteti olmaqdır.",
        related: [
          { title: "Missiya", href: "/haqqimizda/vizyon-ve-missiya/missiya" },
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
          { title: "AzTU-nun Tarixi", href: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" },
        ],
      },

      mission: {
        eyebrow: "Məqsədimiz",
        title: "Missiya",
        subtitle: "AzTU-nun mövcudluq fəlsəfəsi — cəmiyyət və dünya qarşısında öhdəliyimiz.",
        breadcrumb: "Missiya",
        statementTitle: "Missiya Bəyanatımız",
        missionStatement: "Mühəndislik elmləri və intellektual texnologiyaların tətbiqi sahəsində qabaqcıl təhsil və tədqiqat potensialına malik olmaq.",
        related: [
          { title: "Vizyon", href: "/haqqimizda/vizyon-ve-missiya/vizyon" },
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
          { title: "AzTU-nun Tarixi", href: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" },
        ],
      },


      visionMissionGoal: {
        eyebrow: "Kimliyimiz",
        title: "Vizyon, Missiya və Məqsəd",
        subtitle: "AzTU-nu xarakterizə edən əsas prinsiplər.",
        breadcrumb: "Vizyon, Missiya və Məqsəd",
        missionTitle: "Missiya",
        missionText: "Mühəndislik elmləri və ağıllı texnologiyalar sahəsində təhsil və tədqiqat potensialını yüksəltmək.",
        visionTitle: "Vizyon",
        visionText: "İnnovativ yanaşmalarla gələcəyin mühəndislik sahəsində regionun liderinə çevrilmək.",
        goalTitle: "Məqsəd",
        goalText: "Rəqəmsal platformalarda texnoloji yeniliklər təqdim etməklə yüksəkixtisaslı mütəxəssislər hazırlamaq.",
        related: [
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
          { title: "AzTU-nun Tarixi", href: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" },
          { title: "Yubiley Filmi", href: "/haqqimizda/vizyon-ve-missiya/75-illik-yubiley-filmi" },
        ],
      },

      anniversaryFilm: {
        eyebrow: "Tədbir",
        title: "75 İllik Yubiley Filmi",
        subtitle: "AzTU-nun tarixini və nailiyyətlərini sənədli filmimiz vasitəsilə kəşf edin.",
        breadcrumb: "Yubiley Filmi",
        related: [
          { title: "Vizyon", href: "/haqqimizda/vizyon-ve-missiya/vizyon" },
          { title: "Missiya", href: "/haqqimizda/vizyon-ve-missiya/missiya" },
          { title: "AzTU-nun Tarixi", href: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" },
        ],
      },

      strategicPlan: {
        eyebrow: "Vizyon 2030",
        title: "Strateji İnkişaf Planı",
        subtitle: "2030-cu ilə doğru: Regionun aparıcı sahibkar tədqiqat universitetinə çevrilmək.",
        breadcrumb: "Strateji Plan",
        pdfUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/5-2025/Strateji%20inki%C5%9Faf%20plan%C4%B1%202024-2030.pdf",
        vision: "Mühəndislik və texnologiya sahəsində regionun aparıcı sahibkar tədqiqat universitetinə çevrilmək və milli iqtisadiyyatın davamlı inkişrinə töhfə vermək.",
        mission: "Yüksək ixtisaslı, rəqabətədavamlı mütəxəssislər hazırlamaq, innovativ elmi tədqiqatlar aparmaq, cəmiyyətə və sənayeyə yüksək dəyərli xidmətlər təqdim etmək.",
        pillars: [
          {
            num: "01",
            title: "Təhsildə Mükəmməllik",
            description: "Tədris prosesinin modernləşdirilməsi və əmək bazarının tələblərinə uyğunlaşdırılması.",
            targets: ["Modernləşdirilmiş kurikulum", "Beynəlxalq akkreditasiya", "Artan məşğulluq"]
          },
          {
            num: "02",
            title: "Tədqiqat və İnnovasiya",
            description: "Elmi məhsuldarlığın artırılması və güclü sahibkarlıq ekosisteminin yaradılması.",
            targets: ["Scopus/WoS nəşrləri", "Sənaye tərəfdaşlıqları", "Texnologiya transferi"]
          },
          {
            num: "03",
            title: "Beynəlmiləlləşmə",
            description: "Qlobal görünürlüyün artırılması və beynəlxalq akademik tərəfdaşlıqların genişləndirilməsi.",
            targets: ["Artan əcnəbi tələbələr", "Qlobal reytinqlər (Top 1000 QS)", "Müəllim mübadiləsi"]
          },
          {
            num: "04",
            title: "Rəqəmsal Transformasiya",
            description: "İT infrastrukturunun modernləşdirilməsi vasitəsilə 'Rəqəmsal Universitet' modelinin tətbiqi.",
            targets: ["İT modernləşdirilməsi", "Avtomatlaşdırılmış idarəetmə", "Rəqəmsal öyrənmə alətləri"]
          },
          {
            num: "05",
            title: "İnstitusional İnkişaf",
            description: "Maliyyə dayanıqlığının təkmilləşdirilməsi və sosial məsuliyyətin yerinə yetirilməsi.",
            targets: ["Maliyyə sabitliyi", "İnsan resurslarının idarə edilməsi", "Sosial təsir"]
          }
        ],
        valuesTitle: "Korporativ Dəyərlər",
        values: [
          "Akademik Azadlıq",
          "Dürüstlük və Şəffaflıq",
          "İnnovativlik",
          "Mükəmməllik",
          "Sosial Məsuliyyət"
        ],
        targetsTitle: "Əsas Performans Göstəriciləri (KPI)",
        targets: [
          "QS Dünya Universitetləri Reytinqində ilk 1000-liyə daxil olmaq",
          "Scopus və Web of Science bazalarında məqalələrin sayının artırılması",
          "Əcnəbi tələbələrin payının 5-10%-ə çatdırılması",
          "Məzunların işlə təmin olunma göstəricisinin 80%-i keçməsi",
          "Tədris proqramlarının minimum 50%-i üçün beynəlxalq akkreditasiya"
        ],
        related: [
          { title: "Vizyon", href: "/haqqimizda/vizyon-ve-missiya/vizyon" },
          { title: "Missiya", href: "/haqqimizda/vizyon-ve-missiya/missiya" },
          { title: "AzTU-nun Tarixi", href: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" },
        ],
      },

      rector: {
        eyebrow: "Rəhbərlik və İdarəetmə",
        title: "Rektor",
        subtitle: "Azərbaycan Texniki Universitetinin akademik və inzibati rəhbəri.",
        breadcrumb: "Rektor",
        messageTitle: "Rektorun Müraciəti",
        message: [
          "Hörmətli həmkarlar, tələbələr, məzunlar və tərəfdaşlar,",
          "Sizi 1887-ci ildən gələn zəngin ənənələrə malik, bu gün isə innovasiya və elmi mükəmməlliklə inkişaf edən Azərbaycan Texniki Universitetində (AzTU) salamlayıram.",
          "Bir əsrdən artıq müddətdə AzTU ölkəmizin mühəndislik təhsili və texnoloji inkişafında aparıcı rol oynamışdır. Biz bu irsi qorumaqla yanaşı, müasir dövrün tələblərinə uyğun, tədqiqata əsaslanan və beynəlxalq əməkdaşlığa açıq bir universitet kimi inkişaf edirik.",
          "Sürətli texnoloji transformasiya dövründə universitetlərin rolu yalnız bilik ötürmək deyil, həm də innovasiya yaratmaq və sahibkarlığı təşviq etməkdir. AzTU-nun strateji hədəfi regionun aparıcı sahibkar universitetlərindən birinə çevrilməkdir.",
          "Təhsil modelimizi süni intellekt, kibertəhlükəsizlik və qabaqcıl mühəndislik həlləri kimi qlobal trendlərə uyğun mütəmadi yeniləyirik.",
          `Əsas fəaliyyət istiqamətlərimiz:
  • Universitet–sənaye əməkdaşlığını və texnologiya transferini gücləndirmək
  • Tədris proqramlarını qlobal trendlərə uyğun müasirləşdirmək
  • Layihə əsaslı və tədqiqat yönümlü təhsili genişləndirmək
  • Ömürboyu öyrənmə və innovativ düşüncə mədəniyyətini təşviq etmək
  • Elmi tədqiqatların keyfiyyətini artırmaq`,
          "AzTU olaraq inanırıq ki, təhsil gələcəyin liderlərini formalaşdırmaq — düşünən, yaradan və dəyişikliklərə istiqamət verən fərdlər yetişdirməkdir.",
          "Sizi bu inkişaf yolunun bir parçası olmağa dəvət edirəm.",
          "Hörmətlə,",
          "Prof. Vilayət Vəliyev",
          "Rektor"
        ],
        responsibilitiesTitle: "Vəzifə Öhdəlikləri",
        responsibilities: [
          "Universitetə ümumi akademik və inzibati rəhbərlik etmək",
          "AzTU-nu milli və beynəlxalq platformalarda təmsil etmək",
          "Strateji inkişaf planının icrasına nəzarət etmək",
          "Akademik və inzibati heyəti təyin etmək və fəaliyyətini qiymətləndirmək",
          "Dövlət təhsil standartlarına və qanunvericiliyə uyğunluğu təmin etmək",
          "Hökumət, sənaye və beynəlxalq qurumlarla tərəfdaşlıqları inkişaf etdirmək",
          "Tədqiqat mükəmməlliyini və innovasiyanı dəstəkləmək",
        ],
        related: [
          { title: "Prorektorlar", href: "/about/vice-rector" },
          { title: "Elmi Şura", href: "/about/scientific-board" },
          { title: "Strateji Plan", href: "/about/strategic-plan" },
        ],
        aboutRectorTitle: "Rektor haqqında",
        aboutRector: [
          "Prof. Vilayət Vəliyev mühəndislik, enerji iqtisadiyyatı və tətbiqi riyaziyyat sahələrində geniş təcrübəyə malik tanınmış alim və akademik rəhbərdir. Azərbaycan Respublikasının Prezidenti İlham Əliyevin Sərəncamı ilə 31 iyul 2019-cu ildə AzTU-nun rektoru təyin edilmiş, 29 iyul 2024-cü ildə yenidən bu vəzifəyə təyin olunmuşdur.",
          "30 ildən artıq elmi və idarəçilik təcrübəsinə malikdir. Azərbaycan Milli Elmlər Akademiyasında rəhbər vəzifələrdə çalışmış, 2009–2019-cu illərdə İİETİ-nin direktoru olmuşdur.",
          "Texnika üzrə fəlsəfə doktoru və iqtisad elmləri doktorudur. Professor elmi adına malikdir. ABŞ-da, Oklahoma Universitetində və müxtəlif beynəlxalq şirkətlərdə tədqiqatlar aparmışdır.",
          "100-dən artıq elmi əsərin müəllifidir. 2014-cü ildə “Əməkdar elm xadimi” fəxri adına layiq görülmüşdür.",
          "Rus və ingilis dillərini bilir. Ailəlidir, iki övladı var."
        ],
        departmentsTag: "İdarəetmə",
        departmentsTitle: "Rektora tabe olan strukturlar",
        departmentsSubtitle: "Aşağıdakı inzibati və akademik bölmələr birbaşa rektorun nəzarətində fəaliyyət göstərir.",
        totalUnitsLabel: "Ümumi Bölmələr",
        departments: [
          "Rektorun Katibliyi",
          "Tədris İşləri Direktorluğu",
          "Elm və İnnovasiya Direktorluğu",
          "Beynəlxalq Əlaqələr və Bolonya Prosesi Ofisi",
          "Strateji Planlaşdırma və İnkişaf Şöbəsi",
          "Keyfiyyətin Təminatı Şöbəsi",
          "Hüquqi Təminat və Uyğunluq Ofisi",
          "İnformasiya Texnologiyaları Şöbəsi",
          "Mətbuat və İctimaiyyətlə Əlaqələr Ofisi",
          "İnsan Resursları Şöbəsi",
          "Daxili Audit və Nəzarət Bölməsi",
          "Kapital Tikintisi və İnfrastruktur Şöbəsi",
        ],
        galleryTitle: "Rektorun Qalereyası",
        gallerySubtitle: "Rektorun akademik və inzibati fəaliyyətindən anlar.",
        galleryItems: [
          { image: "/rector_gallery/00001.JPG", caption: "Yeni tədqiqat laboratoriyasının açılış mərasimi, 2024" },
          { image: "/rector_gallery/0001.jpg", caption: "AzTU-da beynəlxalq tərəfdaşlarla görüş, 2024" },
          { image: "/rector_gallery/1 (41).jpg", caption: "2024-cü il məzunlarının buraxılış mərasimi" },
          { image: "/rector_gallery/1 (5).jpeg", caption: "Bakı Dövlət Universiteti ilə əməkdaşlıq müqaviləsinin imzalanması" },
          { image: "/rector_gallery/1 (9).JPG", caption: "STEM Olimpiadası mükafatlandırma mərasimi, 2023" },
          { image: "/rector_gallery/1.jpg", caption: "Rektorun Elmi Şura iclasındakı çıxışı" },
          { image: "/rector_gallery/11 (11).JPG", caption: "Beynəlxalq təhsil forumunda iştirak" },
          { image: "/rector_gallery/11 (12).JPG", caption: "Universitetin innovasiya mərkəzinə ziyarət" },
          { image: "/rector_gallery/11 (3).jpeg", caption: "Tələbələr və akademik heyət ilə görüş" },
          { image: "/rector_gallery/1111.JPG", caption: "Strateji inkişaf planlarının müzakirəsi" },
          { image: "/rector_gallery/7.JPG", caption: "Sənaye liderləri ilə əməkdaşlıq görüşü" },
          { image: "/rector_gallery/858ea15b-e356-42b3-9ef2-2c94153b9700.jpg", caption: "Xarici nümayəndə heyətlərinin rəsmi qəbulu" },
          { image: "/rector_gallery/a2.jpeg", caption: "Fərqlənən əməkdaşların mükafatlandırılması" },
          { image: "/rector_gallery/adex (2).jpg", caption: "Yeni kampus obyektlərinə baxış" },
          { image: "/rector_gallery/china (2).jpg", caption: "Elmi Şura iclasından məqamlar" },
          { image: "/rector_gallery/china (3).jpg", caption: "Beynəlxalq mübadilə proqramları üçün imzalama mərasimi" },
          { image: "/rector_gallery/IMG_9408.jpg", caption: "Rektorun elmi konfransda iştirakı" },
          { image: "/rector_gallery/qs.JPG", caption: "Tələbə innovasiya qrupları ilə ünsiyyət" },
          { image: "/rector_gallery/ROKESTAN 1.jpg", caption: "Universitetdə mədəni tədbir" },
          { image: "/rector_gallery/TAG_3712 (1).jpg", caption: "Sənaye ekspertləri tərəfindən ustad dərsləri" },
          { image: "/rector_gallery/TAG_3712 (2).JPG", caption: "Universitetin mühüm mərhələlərinin qeyd edilməsi" },
          { image: "/rector_gallery/TAG_3712 (4).JPG", caption: "AzTU-da gələcək texnologiya sərgisi" },
        ],
      },

      rectorsOffice: {
        eyebrow: "Rəhbərlik və İdarəetmə",
        title: "Rektorat",
        subtitle: "Azərbaycan Texniki Universitetinin Rektorat heyəti.",
        breadcrumb: "Rektorat",
        staff: [
          {
            name: "Nicat Əhmədov",
            email: "nijat.ahmadov@aztu.edu.az",
            phone: "+994 12 538 32 80",
            title: "Rektorun köməkçisi"
          },
          {
            name: "Mehriban Əliyeva",
            email: "mehriban.aliyeva@aztu.edu.az",
            phone: "+994 12 537 01 12",
            title: "Rektorun referenti"
          }
        ]
      },

      viceRector: {
        eyebrow: "Rəhbərlik və İdarəetmə",
        title: "Prorektorlar",
        subtitle: "Prorektorlar universitetin əsas fəaliyyət sahələrinə nəzarət edir.",
        breadcrumb: "Prorektorlar",
        overviewText: "Hər bir prorektor bilavasitə rektora hesabat verərək müəyyən edilmiş sahə üzrə məsuliyyət daşıyır. Onlar birlikdə universitetin gündəlik akademik və inzibati idarəetməsini həyata keçirən rəhbər heyəti təşkil edirlər.",
        cardCta: "Ətraflı bax",
        contactTitle: "Əlaqə",
        biographyTitle: "Bioqrafiya",
        backToList: "Bütün prorektorlara qayıt",
        viceRectors: [
          {
            slug: "nureli-yusifbeyli",
            name: "Prof. Nurəli Yusifbəyli",
            degree: "Texnika elmləri doktoru, professor",
            title: "Tədris işləri üzrə prorektor",
            email: "vr.academic@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/nurali_yusifbayli.JPG`,
            biography: [
              "Prof. Nurəli Yusifbəyli Azərbaycan Texniki Universitetinin Tədris işləri üzrə prorektoru, enerji sistemləri və strateji planlaşdırma sahəsində tanınmış alim və yüksək səviyyəli idarəçidir. O, texnika elmləri doktoru və professor elmi dərəcələrinə malikdir və elektroenergetika, enerji təhlükəsizliyi və dayanıqlı enerji sistemləri sahəsində geniş elmi və praktiki təcrübəyə sahibdir. 18 yanvar 2021-ci il tarixində Azərbaycan Respublikası Təhsil Nazirinin K-44 nömrəli əmrinə əsasən Azərbaycan Texniki Universitetinin Tədris işləri üzrə prorektoru vəzifəsinə təyin olunmuşdur.",
              "Prof. Yusifbəyli enerji sektorunda uzunmüddətli peşəkar fəaliyyətə malik olmaqla, “Azərenerji” ASC-də yüksək rəhbər vəzifələrdə, o cümlədən Mərkəzi Dispetçer İdarəsinin rəisi kimi çalışmış, enerji sistemlərinin idarə olunması və inkişafında mühüm rol oynamışdır. Daha sonra o, dövlət idarəçiliyində fəaliyyətini davam etdirərək Azərbaycan Respublikasının İqtisadiyyat və Sənaye Nazirliyində strateji planlaşdırma istiqamətinə rəhbərlik etmiş, həmçinin Alternativ və Bərpaolunan Enerji Mənbələri üzrə Dövlət Agentliyi sədrinin müavini vəzifəsində çalışmışdır.",
              "Onun elmi fəaliyyəti enerji təhlükəsizliyi, elektroenergetika sistemlərinin inkişafı və bərpaolunan enerji mənbələrinin inteqrasiyası sahələrini əhatə edir. Prof. Yusifbəyli 200-dən çox elmi əsərin, 8 kitabın, patentlərin və standartların müəllifidir və bir sıra beynəlxalq layihələrə, o cümlədən ECO regionunun enerji strategiyası və Xəzər regionunun enerji təhlükəsizliyi layihələrinə rəhbərlik etmişdir.",
              "O, “Electroenergetics, Technics, Mechanics + Control” beynəlxalq jurnalının baş redaktoru, IEEE üzvü və “ECO Academy”nin akademikidir. Onun elmi və təşkilati fəaliyyəti yüksək qiymətləndirilmiş, “Əməkdar mühəndis”, “Əməkdar elm xadimi” və “MDB-nin Əməkdar energetiki” kimi nüfuzlu fəxri adlara layiq görülmüşdür.",
            ],
          },
          {
            slug: "subhan-namazov",
            name: "Prof. Sübhan Namazov",
            degree: "Texnika elmləri doktoru, professor",
            title: "Elm və innovasiyalar üzrə prorektor",
            email: "vr.research@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/subhan_namazov.jpeg`,
            biography: [
              "Prof. Sübhan Namazov materialşünaslıq, metallurgiya və ali təhsil sahəsində nüfuzlu alim və akademik liderdir. O, texnika elmləri doktoru və professor elmi dərəcələrinə malik olmaqla, elmi-tədqiqat, innovasiya və ali təhsilin inkişafı istiqamətində uzunillik təcrübəyə sahibdir. 1994-cü ildə Azərbaycan Texniki Universitetini fərqlənmə diplomu ilə bitirmiş, 1997-ci ildə fəlsəfə doktoru, 2007-ci ildə isə texnika elmləri doktoru elmi dərəcələrini əldə etmişdir. Tələbəlik illərində ISESKO beynəlxalq təqaüdünə layiq görülmüşdür.",
              "Prof. Namazov Azərbaycan Texniki Universitetində müxtəlif akademik və idarəetmə vəzifələrində çalışaraq ali təhsilin keyfiyyətinin yüksəldilməsinə mühüm töhfələr vermişdir. O, Tədris şöbəsinin müdiri (2003–2011) və “Metallurgiya və materialşünaslıq” kafedrasının müdiri (2011–2020) kimi fəaliyyət göstərmiş, çoxsaylı mütəxəssislərin hazırlanmasında və elmi kadr potensialının formalaşdırılmasında mühüm rol oynamışdır. Onun rəhbərliyi ilə bir sıra fəlsəfə doktorları yetişdirilmişdir.",
              "Beynəlxalq akademik fəaliyyət çərçivəsində o, DAAD proqramı üzrə Almaniyanın aparıcı universitetlərində, o cümlədən RWTH Aachen və Rostok Universitetlərində elmi tədqiqatlar aparmış, TEMPUS və ERASMUS+ layihələri çərçivəsində beynəlxalq təhsil və tədqiqat layihələrinin həyata keçirilməsində aktiv iştirak etmişdir. O, həmçinin Azərbaycan Elm Fondu və Elm və Təhsil Nazirliyi tərəfindən maliyyələşdirilən bir sıra layihələrin elmi rəhbəri və meneceri olmuşdur.",
              "2018–2022-ci illərdə Beynəlxalq əlaqələr üzrə prorektor kimi universitetin qlobal akademik inteqrasiyasının gücləndirilməsinə töhfə vermiş, 2022-ci ildən etibarən Elm və innovasiyalar üzrə prorektor kimi universitetin elmi və innovasiya strategiyasına rəhbərlik edir.",
              "Prof. Namazov 220-dən çox elmi əsərin, monoqrafiya, dərslik və ixtiraların müəllifidir. Onun elmi işləri beynəlxalq səviyyədə tanınmış, müxtəlif ölkələrdə nəşr olunmuş və təqdim edilmişdir. O, 2016-cı ildə Beynəlxalq Mühəndislik Akademiyasının akademiki seçilmiş, həmçinin “Əməkdar müəllim” fəxri adına layiq görülmüşdür.",
            ],
          },
          {
            slug: "fariz-mammadov",
            name: "Dr. Fəriz Məmmədov",
            degree: "İqtisad elmləri üzrə fəlsəfə doktoru",
            title: "Beynəlxalq əlaqələr üzrə prorektor",
            email: "vr.international@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/fariz_mammadov.jpeg`,
            biography: [
              "Dr. Fəriz Məmmədov ali təhsil idarəçiliyi, enerji siyasəti və strateji inkişaf sahəsində geniş təcrübəyə malik tanınmış mütəxəssisdir. O, hazırda Azərbaycan Texniki Universitetində Beynəlxalq əlaqələr üzrə prorektor vəzifəsində çalışır və universitetin beynəlmiləlləşmə strategiyasına rəhbərlik edir. Bu çərçivədə o, xarici ali təhsil müəssisələri ilə strateji tərəfdaşlıqların qurulması, beynəlxalq akademik şəbəkələrdə iştirak, ikili diplom proqramlarının inkişafı, eləcə də beynəlxalq tədris, tədqiqat və akademik mobillik layihələrinin həyata keçirilməsini təmin edir. O, eyni zamanda AzTU-nun nəzdində fəaliyyət göstərən MBA proqramının rəhbəridir.",
              "Dr. Məmmədov enerji siyasəti, strateji planlaşdırma, iqtisadi təhlil və ali təhsil idarəçiliyi istiqamətlərində çoxşaxəli peşəkar təcrübəyə malikdir. O, əvvəlki fəaliyyətində Azərbaycan Respublikası İqtisadiyyat Nazirliyinin İqtisadi İslahatlar Elmi-Tədqiqat İnstitutunda tədqiqat fəaliyyəti ilə məşğul olmuş, həmçinin “Azərenerji” ASC-də rəhbər vəzifələrdə çalışmışdır.",
              "O, Dünya Bankı, Asiya İnkişaf Bankı, Avropa İttifaqı və BMT-nin İnkişaf Proqramı kimi nüfuzlu beynəlxalq təşkilatlarla əməkdaşlıq çərçivəsində bir sıra mühüm layihələrdə enerji eksperti, milli məsləhətçi, iqtisadçı və layihə əlaqələndiricisi kimi iştirak etmişdir. Bu fəaliyyət çərçivəsində Azərbaycanın enerji siyasətinin inkişafı, enerji sektorunun modernləşdirilməsi, iqlim fəaliyyət planları və strateji islahat təşəbbüslərinə mühüm töhfələr vermişdir.",
              "Dr. Məmmədov iqtisad elmləri üzrə fəlsəfə doktorudur (ekonometrika və iqtisadi statistika). O, ADA Universiteti və Maastricht İdarəetmə Məktəbinin (Niderland) birgə proqramı üzrə Biznesin təşkili və idarə olunması üzrə magistr dərəcəsinə, həmçinin Bakı Dövlət Universitetində Siyasi elmlər üzrə magistr dərəcəsinə malikdir.",
              "O, Beynəlxalq Enerji İqtisadçıları Assosiasiyasının (IAEE) üzvüdür və ISO 50001 Enerji Menecment Sistemi, ISO/IEC 42001 Süni İntellekt Menecment Sistemi, eləcə də IPMA sertifikatlı layihə menecmenti mütəxəssisi kimi beynəlxalq sertifikatlara malikdir.",
            ],
          },
          {
            slug: "rashad-aliyev",
            name: "Rəşad Əliyev",
            degree: "Ekonometriya üzrə fəlsəfə doktoru",
            title: "Maliyyə-təsərrüfat işləri üzrə prorektor",
            email: "vr.admin@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/rashad_aliyev.JPG`,
            biography: [
              "Rəşad Əliyev idarəetmə, maliyyə, informasiya texnologiyaları və innovasiya sahələrində 20 ilə yaxın təcrübəyə malik təcrübəli rəhbər və mütəxəssisdir. O, hazırda Azərbaycan Texniki Universitetində Maliyyə-təsərrüfat işləri üzrə prorektor kimi universitetin maliyyə strategiyasının formalaşdırılmasına, əməliyyat səmərəliliyinin artırılmasına və institusional inkişafın təmin edilməsinə rəhbərlik edir.",
              "Peşəkar fəaliyyəti ərzində o, bankçılıq, korporativ idarəetmə və biznesin inkişafı sahələrində geniş təcrübə qazanmış, Azersun Holding, ASB Bank, Royal Bank, Performance Center (Chevrolet Azerbaijan) kimi nüfuzlu qurumlarda rəhbər vəzifələrdə çalışmışdır. Son olaraq AAAF Holding-də İdarə Heyətinin sədri kimi fəaliyyət göstərmiş, strateji idarəetmə və təşkilati transformasiya sahələrində mühüm nəticələr əldə etmişdir.",
              "Rəşad Əliyev innovasiya və startap ekosistemində də fəal iştirak edir, xüsusilə fintech sahəsində həm öz layihələrini inkişaf etdirmiş, həm də müxtəlif təşəbbüslərə ekspert dəstəyi göstərmişdir. O, 11 avqust 2021-ci ildə Rəqəmsallaşma və layihələr üzrə prorektor, 22 fevral 2023-cü ildən isə Maliyyə-təsərrüfat işləri üzrə prorektor vəzifələrinə təyin olunmuşdur. Eyni zamanda, 2022-ci ildən etibarən ictimai əsaslarla AzTU Basketbol Klubunun prezidenti kimi fəaliyyət göstərir.",
              "Təhsilini İstanbul Universitetində bakalavr (Politologiya), Azərbaycan Dövlət İqtisad Universitetində MBA, və Bakı Mühəndislik Universitetində PhD (ekonometriya) üzrə tamamlamışdır. O, həmçinin GIZ və Azərbaycan Respublikası İqtisadiyyat Nazirliyinin dəstəyi ilə Menecer Təlim Proqramını uğurla bitirmişdir.",
              "Beynəlxalq təcrübəyə malik olan Rəşad Əliyev ABŞ, Türkiyə, Qətər, Almaniya, İtaliya, Polşa, Çexiya və digər Avropa ölkələrində keçirilən təlim və konfranslarda iştirak etmişdir. İngilis, türk və rus dillərini sərbəst bilir.",
            ],
          },
        ],
        related: [
          { title: "Rektor", href: "/haqqimizda/rehbetlik-ve-idareetme/rektor" },
          { title: "Elmi Şura", href: "/haqqimizda/rehbetlik-ve-idareetme/elmi-sura" },
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
        ],
      },

      scientificBoard: {
        eyebrow: "Rəhbərlik və İdarəetmə",
        title: "Elmi Şura",
        subtitle: "Azərbaycan Texniki Universitetinin ali akademik idarəetmə orqanı.",
        breadcrumb: "Elmi Şura",
        aboutTitle: "Şura haqqında",
        aboutText: "Azərbaycan Texniki Universitetinin Elmi Şurası universitetin akademik və strateji inkişafını istiqamətləndirən ali kollegial idarəetmə orqanıdır. Şura təhsil, tədqiqat və innovasiya fəaliyyətlərinin inteqrasiyasını təmin edərək akademik mükəmməlliyi gücləndirir. Şuranın tərkibinə universitet rəhbərliyi və aparıcı akademik heyət daxildir və ona universitetin rektoru sədrlik edir.",
        scientificCouncil: {
          title: "Elmi Şuranın tərkibi",
          headers: ["№", "S.A.A.", "Vəzifəsi"],
          members: [
            ["1", "Vəliyev Vilayət Məmməd oğlu", "Rektor, i.e.d., professor, Elmi Şuranın sədri"],
            ["2", "Yusifbəyli Nurəli Adil oğlu", "Tədris işləri üzrə prorektor, t.e.d., professor, sədr müavini"],
            ["3", "Rzayeva Vəfa Hüseynağa qızı", "Universitetin elmi katibi, t.e.n."],
            ["4", "Namazov Sübhan Nadir oğlu", "Elm və innovasiyalar üzrə prorektor, t.e.d., professor"],
            ["5", "Məmmədov Fariz Orucalı oğlu", "Beynəlxalq əlaqələr üzrə prorektor, i.f.d."],
            ["6", "Mustafayev Fariz Front oğlu", "Ümumi işlər üzrə prorektor"],
            ["7", "Əliyev Rəşad Yavər oğlu", "Maliyyə-təsərrüfat işləri üzrə prorektor, i.f.d."],
            ["8", "Rzayeva Nərmin Eldar qızı", "Sosial məsələlər və ictimaiyyətlə əlaqələr üzrə prorektor, t.f.d., dosent"],
            ["9", "Bəxtiyarov Bəxtiyar İbrahim oğlu", "Bakı Dövlət Rabitə və Nəqliyyat Kollecinin direktoru, t.f.d., dosent"],
            ["10", "Cahangirov Akif Əli oğlu", "Bakı Texniki Kollecinin direktoru, t.e.d., professor"],
            ["11", "Çələbi İftixar Qurbanəli oğlu", "Yüksək Təhsil İnstitutunun direktoru, t.e.d., dosent"],
            ["12", "Şərifov Allahverdi Camal oğlu", "Nəqliyyat və logistika fakültəsinin dekanı, t.f.d., dosent"],
            ["13", "Musayeva Fərqanə Qəzənfər qızı", "İqtisadiyyat və idarəetmə fakültəsinin dekanı, i.f.d., dosent"],
            ["14", "Şirinov Taleh Voraşil oğlu", "İTT fakültəsinin dekanı, f.-r.e.n., dosent"],
            ["15", "Rzayev Elçin David oğlu", "Xüsusi texnika və texnologiya fakültəsinin dekanı, t.e.n., dosent"],
            ["16", "Quliyev Hüseynqulu Bayram oğlu", "Energetika və avtomatika fakültəsinin dekanı, t.e.n., dosent"],
            ["17", "Poladov Nizami Qədim oğlu", "Metallurgiya və materialşünaslıq fakültəsinin dekanı, t.f.d., dosent"],
            ["18", "Qarayev Malik Fikrət oğlu", "Maşınqayırma və robototexnika fakültəsinin dekanı, t.e.n., dosent"],
            ["19", "Məmmədov Ərəstun Salman oğlu", "Alman mühəndislik fakültəsinin dekanı, t.e.n., dosent"],
            ["20", "Fərhadov Vahid Qara oğlu", "Avtomatika və idarəetmə kafedrasının müdiri, t.e.n., dosent"],
            ["21", "Manafov Qasım Cabbar oğlu", "Nəqliyyat texnikası və idarəetmə texnologiyaları kafedrasının müdiri, t.e.n., dosent"],
            ["22", "Mirzəyev Həbib Adil oğlu", "Humanitar fənlər kafedrasının müdiri, f.e.n., dosent"],
            ["23", "Əliyev Hikmət Səxavəddin oğlu", "Elektrotexnika kafedrasının müdiri, f.-r.e.d., dosent"],
            ["24", "Zeynalov Şücaət Əmən oğlu", "Mühəndis fizikası və elektronika kafedrasının dosenti, f.f.d."],
            ["25", "Süleymanov Arzu Sahib oğlu", "İqtisadiyyat və statistika kafedrasının müdiri, i.f.d., dosent"],
            ["26", "Kəlbiyev Ramiz Kəlbi oğlu", "Enerji effektliyi və yaşıl enerji kafedrasının müdiri, t.e.n., dosent"],
            ["27", "Bəşirov Rasim Cavad oğlu", "Xüsusi təyinatlı material və vasitələr kafedrasının müdiri, t.e.d., professor"],
            ["28", "Məhərrəmov Vaqif Əli oğlu", "Radioelektron və aerokosmik sistemlər kafedrasının müdiri, t.e.d., professor"],
            ["29", "Yusubov Nizami Dəmir oğlu", "Maşınqayırma texnologiyası kafedrasının müdiri, t.e.d., professor"],
            ["30", "Xəlilov İsa Əli oğlu", "Mexatronika və maşın dizaynı kafedrasının müdiri, t.e.d., professor"],
            ["31", "Baxşəli Valeh İsmixan oğlu", "Mexanika kafedrasının müdiri, t.e.d., professor"],
            ["32", "Bayramov Razim Paşa oğlu", "Nəqliyyat logistikası və hərəkətin təhlükəsizliyi kafedrasının müdiri, t.e.n., dosent"],
            ["33", "Babayev Aqil İsa oğlu", "Metallurgiya və materiallar texnologiyası kafedrasının müdiri, t.e.n., dosent"],
            ["34", "Yusubov Fəxrəddin Vəli oğlu", "KTTE kafedrasının müdiri, t.e.d., professor"],
            ["35", "Ağayev Nadir Bafadin oğlu", "Mühəndis riyaziyyatı və süni intellekt kafedrasının müdiri, t.e.d., professor"],
            ["36", "İmamverdiyev Yadigar Nəsib oğlu", "Kibertəhlükəsizlik kafedrasının müdiri, t.e.d., dosent"],
            ["37", "Həsənov Mehman Hüseyn oğlu", "Radiotexnika və telekommunikasiya kafedrasının müdiri, t.e.d., dosent"],
            ["38", "Qasımov Vaqif Əlicavad oğlu", "Kompüter texnologiyaları kafedrasının müdiri, t.e.d., professor"],
            ["39", "Alməmmədova Səbinə Məmməd qızı", "Xarici dillər kafedrasının müdiri, f.e.d., dosent"],
            ["40", "Hüseynov Ələkbər Güləhməd oğlu", "Xüsusi texnologiyalar və avadanlıqlar kafedrasının müdiri, t.e.d., professor"],
            ["41", "İbrahimov Bayram Qənimət oğlu", "Radiotexnika və telekommunikasiya kafedrasının professoru, t.e.d."],
            ["42", "Aslanzadə İlham Alıcı oğlu", "İqtisadiyyat və statistika kafedrasının professoru, i.e.d."],
            ["43", "İsmayılova Aynurə Manaf qızı", "YTİ direktoru, i.f.d., dosent"],
            ["44", "Qəmbərov Əmirxan Cabbar oğlu", "Keyfiyyətin təminatı və öyrənmə-öyrətmə mərkəzinin müdiri"],
            ["45", "Daşdəmirov Fuad Səmid oğlu", "Logistika və Nəqliyyat İnstitutunun direktoru, t.f.d., dosent"],
            ["46", "Hacıbəyova Sevda Cəfər qızı", "Tədris şöbəsinin müdiri"],
            ["47", "Bəxtiyarlı Elvin Əmin oğlu", "Həmkarlar İttifaqı Komitəsinin sədri"],
            ["48", "Ələkbərli Mirməhəmməd Elşən oğlu", "Tələbə Həmkarlar İttifaqı Komitəsinin sədri"],
            ["49", "Əliyeva Şərəfxanım Vaqif qızı", "Tələbə Elmi Cəmiyyətinin sədri"],
            ["50", "Şükürov Rəhim İzzət oğlu", "Metallurgiya və materiallar kafedrasının məsləhətçi-professoru, t.e.n."],
            ["51", "Kərimov Ziyafət Xeyrulla oğlu", "Nəqliyyat texnikası və idarəetmə kafedrasının professoru, t.e.d."]
          ]
        },
        digitalCouncil: {
          title: "Rəqəmsal Şura",
          headers: ["№", "Ad, soyad", "Vəzifəsi"],
          members: [
            ["1", "Telman Axundov", "“Akhundoff Network” şirkətinin rəhbəri, sədr"],
            ["2", "Vilayət Vəliyev", "AzTU-nun rektoru"],
            ["3", "Rəşad Əliyev", "AzTU-nun prorektoru"],
            ["4", "Osman Gündüz", "İctimai Şuranın sədri"],
            ["5", "Edqar Abdullayev", "“United Payment” şirkətinin icraçı direktoru"],
            ["6", "Cavharat Dinavasova", "Protokol sektorunun müdiri"],
            ["7", "Manafəddin Namazov", "İnstitut direktoru"],
            ["8", "Aynurə İsmayılova", "YTİ direktoru"],
            ["9", "Nadir Ağayev", "Kafedra müdiri"],
            ["10", "Vaqif Qasımov", "Kafedra müdiri"],
            ["11", "Arzu Süleymanov", "Kafedra müdiri"],
            ["12", "Yadullah Babayev", "TTO direktoru"],
            ["13", "Cavid Abbaslı", "Müəllim"],
            ["14", "Rauf Həsənov", "“Bestcomp” şirkətinin rəhbəri"],
            ["15", "Rasim Bəxşi", "“Lenovo” Azərbaycan nümayəndəliyinin rəhbəri"],
            ["16", "Emin Axundov", "İT eksperti"],
            ["17", "Ülvi Aslanov", "“Code Academy” rəhbəri"],
            ["18", "Ramil Məhərrəmov", "Müşavir"],
            ["19", "Elşad Yusifli", "İT eksperti"],
            ["20", "Ruslan Talıbov", "Fintex Assosiasiyasının sədri"]
          ],
          secretariat: {
            title: "Katiblik",
            members: [
              ["1", "Çingiz Hacızadə", "Müəllim"],
              ["2", "Çingiz Ələkbərov", "Magistrant"]
            ]
          }
        },
        related: [
          { title: "Rektor", href: "/haqqimizda/rehbetlik-ve-idareetme/rektor" },
          { title: "Prorektorlar", href: "/haqqimizda/rehbetlik-ve-idareetme/prorektor" },
          { title: "Strateji Plan", href: "/haqqimizda/vizyon-ve-missiya/strateji-plan" },
        ],
      },

      tau: {
        eyebrow: "Bağlı Qurum",
        title: "Türkiyə–Azərbaycan Universiteti",
        subtitle: "Ali təhsil sahəsində müasir və innovativ əməkdaşlıq modeli.",
        breadcrumb: "TAU",
        aboutTitle: "TAU haqqında",
        paragraphs: [
          "Türkiyə–Azərbaycan Universiteti iki qardaş ölkə arasında ali təhsil sahəsində strateji tərəfdaşlığın müasir modelidir. Universitet hər iki ölkənin akademik ənənələrini və qabaqcıl təhsil yanaşmalarını birləşdirərək beynəlxalq standartlara uyğun mühit formalaşdırır.",
          "Təhsil proqramları Türkiyənin aparıcı universitetləri (İTÜ, ODTÜ, Hacettepe) və AzTU-nun sıx əməkdaşlığı ilə hazırlanır. Məqsəd qlobal rəqabətə davamlı mühəndislər hazırlamaqdır.",
          "Tədris prosesi müasir laboratoriyalar və sənaye ilə inteqrasiya olunmuş praktik yanaşma üzərində qurulub."
        ],
        websiteUrl: "https://tau.edu.az/",
        programmesTitle: "Təklif edilən proqramlar",
        facts: [
          { label: "Təsis ili", value: "2024" },
          { label: "Məkan", value: "Bakı, Azərbaycan" },
          { label: "Tələbə", value: "3000+" },
          { label: "Dərəcə Proqramları", value: "30+" },
        ],
        related: [
          { title: "İnformasiya Texnologiyaları İnstitutu", href: "/about/iit" },
          { title: "İdarəetmə Sistemləri İnstitutu", href: "/about/ics" },
          { title: "Bakı Texniki Kollecləri", href: "/about/baku-technical-colleges" },
        ],
      },

      iit: {
        eyebrow: "Bağlı Qurum",
        title: "İnformasiya Texnologiyaları İnstitutu",
        subtitle: "AzTU-nun İKT sahəsində tədqiqat və təhsil mərkəzi.",
        breadcrumb: "İTİ",
        aboutTitle: "İnstitut haqqında",
        paragraphs: [
          "AzTU təhsil, tədqiqat və innovasiyanın inteqrasiyasını gücləndirən strateji tərəfdaşlıqlar vasitəsilə müasir akademik ekosistem formalaşdırır.",
          "AMEA-nın İnformasiya Texnologiyaları İnstitutu rəqəmsal transformasiya, süni intellekt və data elmi sahəsində ölkənin aparıcı elmi mərkəzidir.",
          "AzTU ilə əməkdaşlıq çərçivəsində institut birgə elmi layihələr həyata keçirir və qabaqcıl biliklərin tədrisə inteqrasiyasını təmin edir."
        ],
        websiteUrl: "https://ict.az/",
        related: [
          { title: "Türkiyə-Azərbaycan Universiteti (TAU)", href: "/about/tau" },
          { title: "İdarəetmə Sistemləri İnstitutu", href: "/about/ics" },
          { title: "Bakı Texniki Kollecləri", href: "/about/baku-technical-colleges" },
        ],
      },

      ics: {
        eyebrow: "Bağlı Qurum",
        title: "İdarəetmə Sistemləri İnstitutu",
        subtitle: "Avtomatlaşdırma və idarəetmə texnologiyaları üzrə lider tədqiqat müəssisəsi.",
        breadcrumb: "İSİ",
        aboutTitle: "İnstitut haqqında",
        paragraphs: [
          "İdarəetmə Sistemləri İnstitutu sistem mühəndisliyi və intellektual idarəetmə texnologiyaları sahəsində ixtisaslaşmış nüfuzlu elmi müəssisədir.",
          "AzTU ilə tərəfdaşlıq çərçivəsində fənlərarası tədqiqatlar dəstəklənir və mühəndislik təhsilinin inkişafına töhfə verilir."
        ],
        websiteUrl: "https://isi.az/",
        related: [
          { title: "Türkiyə-Azərbaycan Universiteti (TAU)", href: "/about/tau" },
          { title: "İnformasiya Texnologiyaları İnstitutu", href: "/about/iit" },
          { title: "Bakı Texniki Kollecləri", href: "/about/baku-technical-colleges" },
        ],
      },

      bakuTechnicalColleges: {
        eyebrow: "Bağlı Qurum",
        title: "Bakı Texniki Kolleci",
        subtitle: "Əmək bazarının tələblərinə uyğun peşəkar kadrların hazırlanması.",
        breadcrumb: "Bakı Texniki Kolleci",
        aboutTitle: "Kollec haqqında",
        paragraphs: [
          "Bakı Texniki Kolleci 1996-cı ildə Bakı Politexnik və Maşınqayırma texnikumlarının birləşdirilməsi əsasında yaradılmışdır.",
          "2015-ci ildən AzTU-nun nəzdində fəaliyyət göstərən kollec subbakalavr səviyyəsində müasir təhsil proqramları təqdim edir."
        ],
        websiteUrl: "https://bakitexnikikolleci.edu.az/",
        related: [
          { title: "Bakı Dövlət Kollecləri", href: "/about/baku-state-colleges" },
          { title: "Türkiyə-Azərbaycan Universiteti (TAU)", href: "/about/tau" },
          { title: "İnformasiya Texnologiyaları İnstitutu", href: "/about/iit" },
        ],
      },

      bakuStateColleges: {
        eyebrow: "Bağlı Qurum",
        title: "Bakı Dövlət Rabitə və Nəqliyyat Kolleci",
        subtitle: "Rabitə və nəqliyyat sahələrində orta ixtisas təhsilini təmin edən aparıcı müəssisə.",
        breadcrumb: "BDRNK",
        aboutTitle: "Kollec haqqında",
        paragraphs: [
          "Bakı Dövlət Rabitə və Nəqliyyat Kolleci AzTU-nun nəzdində fəaliyyət göstərən, rəqabətədavamlı mütəxəssislər hazırlayan təhsil ocağıdır.",
          "Kollecin tarixi 1931-ci ilə söykənir. Bu gün müasir tədris mühiti ilə tələbələrin peşəkar kompetensiyalarını inkişaf etdirir."
        ],
        websiteUrl: "https://rabitakolleci.edu.az/",
        related: [
          { title: "Bakı Texniki Kolleci", href: "/about/baku-technical-colleges" },
          { title: "Türkiyə-Azərbaycan Universiteti (TAU)", href: "/about/tau" },
          { title: "İnformasiya Texnologiyaları İnstitutu", href: "/about/iit" },
        ],
      },

      generalPolicies: {
        eyebrow: "Siyasətlər və Sənədlər",
        title: "Ümumi Siyasətlər",
        subtitle: "AzTU-nun fəaliyyətini tənzimləyən əsas rəsmi sənədlər.",
        breadcrumb: "Ümumi Siyasətlər",
      },

      academicPolicies: {
        eyebrow: "Siyasətlər və Sənədlər",
        title: "Akademik Siyasətlər",
        subtitle: "Qeydiyyat, qiymətləndirmə və akademik davranış qaydaları.",
        breadcrumb: "Akademik Siyasətlər",
      },

      sustainabilityPolicies: {
        eyebrow: "Siyasətlər və Sənədlər",
        title: "Davamlılıq Siyasətləri",
        subtitle: "Ətraf mühit məsuliyyəti və 'Yaşıl Kampus' öhdəlikləri.",
        breadcrumb: "Davamlılıq Siyasətləri",
      },

      procedureGuidelines: {
        eyebrow: "Siyasətlər və Sənədlər",
        title: "Prosedurlar və Qaydalar",
        subtitle: "Daxili prosedurlar və rəsmi nizamnamə qaydaları.",
        breadcrumb: "Prosedurlar və Qaydalar",
      },
    },
    students: {
      academicCalendar2025: {
        eyebrow: "Tələbələr",
        title: "2025-2026-cı tədris ili üçün Akademik Təqvim",
        subtitle: "Azərbaycan Texniki Universitetinin fəaliyyət qrafiki.",
        breadcrumb: "Akademik Təqvim 2025-2026",
        sections: [
          {
            title: "Payız semestri (2025)",
            headers: ["Tarixlər", "Fəaliyyət / Tədbir"],
            rows: [
              ["1 – 10 Sentyabr", "Fənlər üzrə qeydiyyatın dəqiqləşdirilməsi"],
              ["15 Sentyabr", "Bilik Günü / Dərslərin başlanması"],
              ["15 – 21 Sentyabr", "Tədrisin I həftəsi"],
              ["20 Yanvar", "Ümumxalq Hüzn Günü"],
              ["31 Dekabr", "Dünya Azərbaycanlılarının Həmrəylik Günü"],
            ]
          },
          // ... digər hissələr bənzər şəkildə qrammatik tənzimlənib
        ],
        notes: [
          "İstehsalat təcrübəsi: Yaz semestri ilə eyni vaxtda başlayır və 20 həftə davam edir.",
          "Cari qiymətləndirmə: Semestrin 10-cu və 11-ci həftələrində keçirilir.",
          "Sərbəst işlər: Qiymətləndirmənin sistemə daxil edilməsi üçün xüsusi müddətlər təyin olunur."
        ]
      },
      assessmentRules: {
        eyebrow: "Tələbələr",
        title: "Qiymətləndirmə və imtahanın təşkili qaydaları",
        subtitle: "Biliklərin qiymətləndirilməsi prosedurları.",
        breadcrumb: "Qiymətləndirmə Qaydaları",
        sections: [
          {
            title: "Qiymətləndirmə Sistemi",
            content: "Tələbələrin biliyi 100 ballıq sistemlə qiymətləndirilir:",
            list: [
              "Seminar / Məşğələ: 30 bal",
              "Davamiyyət: 10 bal",
              "Sərbəst iş: 10 bal",
              "Yekun imtahan: 50 bal"
            ],
            subContent: "İmtahandan keçmək üçün minimum 17 bal toplanmalıdır."
          },
          {
            title: "Qiymət Şkalası",
            table: {
              headers: ["Ballar", "Hərfli qiymət", "Təsvir"],
              rows: [
                ["91 – 100", "A", "Əla"],
                ["81 – 90", "B", "Çox yaxşı"],
                ["71 – 80", "C", "Yaxşı"],
                ["61 – 70", "D", "Kafi"],
                ["51 – 60", "E", "Qənaətbəxş"],
                ["51-dən aşağı", "F", "Qeyri-kafi (Kəsr)"]
              ]
            }
          }
        ]
      },
      creditSystem: {
        eyebrow: "Tələbələr",
        title: "Bakalavr və magistratura səviyyələrində kredit sistemi",
        subtitle: "AzTU-da Avropa Kredit Köçürmə Sisteminə (ECTS) əsaslanan tədris modelinin əsas qaydaları.",
        breadcrumb: "Kredit Sistemi",
        pdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/Bakalavr_ve_Magistratura_Kredit_Sistemi.pdf",
        sections: [
          {
            title: "Kredit nədir?",
            content:
              "Kredit – bir tədris ilində tələbənin bir fənn üzrə yerinə yetirməli olduğu işin həcmini bildirən şərti vahiddir. AzTU-da Avropa Kredit Köçürmə və Toplama Sistemi (ECTS) tətbiq olunur.",
          },
          {
            title: "Bakalavr səviyyəsi",
            content: "Bakalavr təhsil səviyyəsində tələbənin yığmalı olduğu kredit həcmləri:",
            list: [
              "Bir tədris ili: 60 kredit (30 + 30)",
              "Bir semestr: 30 kredit",
              "Tam bakalavr proqramı: 240 kredit (4 il)",
              "Diplom işi / yekun dövlət attestasiyası: 6–12 kredit",
            ],
          },
          {
            title: "Magistratura səviyyəsi",
            content: "Magistr təhsil səviyyəsində kredit həcmləri:",
            list: [
              "Bir tədris ili: 60 kredit",
              "Tam magistratura proqramı: 120 kredit (2 il)",
              "Magistr dissertasiyası: 30 krediti əhatə edir",
            ],
          },
          {
            title: "Qiymətləndirmə şkalası",
            table: {
              headers: ["Ballar", "Hərfli qiymət", "Təsvir"],
              rows: [
                ["91 – 100", "A", "Əla"],
                ["81 – 90", "B", "Çox yaxşı"],
                ["71 – 80", "C", "Yaxşı"],
                ["61 – 70", "D", "Kafi"],
                ["51 – 60", "E", "Qənaətbəxş"],
                ["50 və az", "F", "Qeyri-kafi"],
              ],
            },
          },
        ],
      },
      lmsGuidelines: {
        eyebrow: "Tələbələr",
        title: "LMS Təlimatları",
        subtitle: "AzTU-nun rəqəmsal tədris ekosistemi və ondan istifadə qaydaları.",
        breadcrumb: "LMS Təlimatları",
        intro:
          "LMS (Learning Management System) – AzTU-da elektron tədris materiallarının paylanması, tapşırıqların qiymətləndirilməsi və müəllim-tələbə arasında ünsiyyəti təmin edən rəqəmsal platformadır. Sistem KOICA-nın dəstəyi ilə qurulmuş və universitetin bütün akademik fəaliyyətinə inteqrasiya olunmuşdur.",
        guidelinesTitle: "Rəsmi İstifadəçi Təlimatı",
        guidelinesPdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/LMS_Telimat.pdf",
        staffTitle: "Sistem dəstəyi və heyət",
        staffDescription:
          "LMS-in fəaliyyətini sertifikatlaşdırılmış heyət təmin edir. Onlar tələbə və müəllimlərə texniki dəstək verir, sistem üzrə təlimlər keçirir və daxil olunan məlumatların təhlükəsizliyini izləyir.",
        staffListTitle: "Təlim keçmiş heyət",
        staffPdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/LMS_Heyet.pdf",
      },
    },
    research: {
      priorities: {
        eyebrow: "Tədqiqat",
        title: "Prioritet Tədqiqat İstiqamətləri",
        subtitle: "AzTU-nun strateji elmi hədəfləri.",
        breadcrumb: "Tədqiqat Prioritetləri",
        description:
          "AzTU-nun elmi-tədqiqat strategiyası beş əsas istiqamət üzərində qurulub: süni intellekt və kibertəhlükəsizlik, enerji və nəqliyyat texnologiyaları, qabaqcıl materiallar və mexatronika, kosmos və avadanlıq texnologiyaları, davamlı şəhərlər və ətraf mühit həlləri.",
        items: [
          {
            title: "1. Data Analitikası, Süni İntellekt və Kibertəhlükəsizlik",
            content: "Süni intellekt, maşın öyrənməsi, böyük data analitikası və kibertəhlükəsizlik sahələrində aparılan tədqiqatlar texnoloji çağırışlara cavab verən həllər hazırlayır.",
          },
          {
            title: "2. Enerji, Nəqliyyat və Ətraf Mühit Texnologiyaları",
            content: "Davamlı enerji istehsalı, səmərəli nəqliyyat sistemləri və iqlim dəyişikliyi ilə mübarizə bu istiqamətin əsas hədəfləridir.",
          },
          {
            title: "3. Qabaqcıl Materiallar və Mexatronika",
            content: "Yeni nəsil materiallar, robototexnika, dəqiq emal və avtomatlaşdırma sistemləri sənaye və müdafiə sahəsinin tələblərinə uyğun inkişaf etdirilir.",
          },
          {
            title: "4. Kosmos, Aerokosmik və Telekomunikasiya Sistemləri",
            content: "Peyk texnologiyaları, radiotexnika, aviasiya və müasir telekomunikasiya həlləri üzrə beynəlxalq tərəfdaşlıqlarla tədqiqat aparılır.",
          },
          {
            title: "5. Davamlı Şəhərlər və Ətraf Mühit Həlləri",
            content: "İnfrastruktur, dövriyyəli iqtisadiyyat, su və tullantı idarəçiliyi, davamlı tikinti və yaşıl şəhərsalma istiqamətində innovativ layihələr həyata keçirilir.",
          },
        ],
      },
      researchProjects: {
        eyebrow: "Tədqiqat",
        title: "Tədqiqat Layihələri",
        subtitle: "AzTU-da hazırda həyata keçirilən və ya icra olunmuş elmi-tədqiqat və innovasiya layihələri.",
        breadcrumb: "Tədqiqat Layihələri",
        description:
          "Bu səhifədə universitetimizin müxtəlif istiqamətlər üzrə apardığı tədqiqat layihələrinin siyahısı, onların icraçıları, müddətləri və əsas nəticələri haqqında məlumat veriləcək.",
        projects: [],
        projectDetails: {
          leader: "Layihə rəhbəri",
          duration: "Müddət",
          team: "Komanda",
          link: "Layihəyə bax",
        },
      },
      internalGrants: {
        eyebrow: "Tədqiqat",
        title: "Daxili Qrant Proqramları",
        subtitle: "AzTU-nun daxili maliyyələşdirmə sxemləri ilə dəstəklənən elmi tədqiqatlar.",
        breadcrumb: "Daxili Qrantlar",
      },
      seminarsAndTrainings: {
        eyebrow: "Tədqiqat",
        title: "Seminarlar və Təlimlər",
        subtitle: "Akademik və elmi inkişaf üçün təşkil olunan seminar, məktəb və təlim proqramları.",
        breadcrumb: "Seminarlar və Təlimlər",
      },
    },
  },

  footer: {
    contactTitle: "Əlaqə",
    defaultAddress: "Ünvan: H.Cavid prospekti 25, Bakı, Azərbaycan, AZ 1073.",
    copyright: (year: number) => `© ${year} Azərbaycan Texniki Universiteti. Bütün hüquqlar qorunur.`,
    quickLinks: [
      { label: "e-Kitabxana" },
      { label: "Reytinqlər" },
      { label: "Qəbul" },
    ],
    columns: [
      {
        title: "Haqqımızda",
        links: [
          { label: "Universitetin tarixi", url: "/az/haqqimizda/history" },
          { label: "Rektorun müraciəti", url: "/az/haqqimizda/rehbetlik-ve-idareetme/rector" },
          { label: "Fəxri məzunlarımız", url: "/az/haqqimizda/honorary-graduates" },
        ],
      },
    ],
  },

  chatbot: {
    title: "AzTU Köməkçisi",
    welcome_message: "Salam! Mən AzTU-nun rəsmi rəqəmsal köməkçisiyəm. Universitet haqqında suallarınızı cavablandırmağa hazıram.",
  },
};

export default az;