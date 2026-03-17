const az = {
  common: {
    readMore: "Ətraflı oxu",
    viewAll: "Hamısını gör",
    loading: "Yüklənir...",
    home: "Ana səhifə",
    lms: "LMS",
    alumni: "Alumni",
    aztuTv: "AzTU TV",
    quickMenu: "Quick Menu",
    search: "Axtar",
  },

  hero: {
    title: "Azərbaycan Texniki Universitetini kəşf edin",
    button: "Daha çox kəşf et",
    videoAriaLabel: (n: number) => `${n}-ci videoya keç`,
  },

  news: {
    sectionLabel: "Son Xəbərlər",
    sectionTitle: "Xəbərlər",
    sectionTitleAccent: "Hadisələr",
    viewAll: "Bütün Xəbərlər",
    readMore: "Ətraflı oxu",
    // news page
    breadcrumb: "Azərbaycan Texniki Universiteti",
    pageTitle: "Xəbərlər",
    pageDescription: "AzTU-dakı ən son hadisələr, elmi nailiyyətlər və kampus yenilikləri ilə tanış olun.",
    categoryAll: "Hamısı",
    otherNews: "Digər xəbərlər",
    errorMessage: "Xəbərlər yüklənərkən xəta baş verdi.",
    noNews: "Bu kateqoriyada xəbər tapılmadı.",
    loadMore: "Daha çox yüklə",
  },

  stats: {
    sectionLabel: "AzTU Rəqəmlərlə",
    sectionTitle: "Universitetimiz haqqında",
    items: [
      { label: "Fakültə", sublabel: "Tədris fakültəsi" },
      { label: "İxtisas", sublabel: "Bakalavr & magistr" },
      { label: "Tələbə", sublabel: "Aktiv tələbə" },
      { label: "Müəllim", sublabel: "Akademik heyət" },
      { label: "Tərəfdaş", sublabel: "Beynəlxalq əməkdaşlıq" },
      { label: "İllik Tarix", sublabel: "1920-ci ildən bəri" },
    ],
  },

  announcements: {
    sectionLabel: "AzTU Elanları",
    sectionTitle: "Elanlar",
    viewAll: "Bütün Elanlar",
    months: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
      "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
    ],
  },

  projects: {
    sectionLabel: "Araşdırma & İnnovasiya",
    sectionTitle: "Layihələr",
    viewAll: "Bütün Layihələr",
  },

  collaborators: {
    sectionLabel: "Qlobal Tərəfdaşlar",
    sectionTitle: "Əməkdaşlar",
    viewAll: "Bütün Əməkdaşlar",
  },

  search: {
    header: "AzTU-da axtar",
    placeholder: "Axtarış sorğusu daxil edin…",
    popularLabel: "Populyar axtarışlar",
    suggestions: [
      "Qəbul şərtləri",
      "Kafedra siyahısı",
      "Tədris planı",
      "Magistratura",
      "Elmi jurnallar",
      "Laboratoriyalar",
    ],
  },

  footer: {
    contactTitle: "Əlaqə",
    defaultAddress: "Adres: H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073 Azərbaycan Texniki Universiteti.",
    copyright: (year: number) => `${year} Azerbaijan Technical University. Bütün hüquqlar qorunur.`,
    quickLinks: [
      { label: "e-Kitabxana" },
      { label: "Reytinqlər" },
      { label: "Qəbul" },
    ],
    columns: [
      {
        title: "Haqqımızda",
        links: [
          { label: "Universitetin tarixi", url: "/haqqimizda/history" },
          { label: "Rektorun müraciəti", url: "/haqqimizda/rector-message" },
          { label: "Fəxri məzunlarımız", url: "/haqqimizda/honorary-graduates" },
          { label: "Fəxri doktorlarımız", url: "/haqqimizda/honorary-doctors" },
          { label: "Qəhrəmanlarımız", url: "/haqqimizda/heroes" },
          { label: "Şuralar", url: "/haqqimizda/councils" },
          { label: "Kampus", url: "/haqqimizda/campus" },
        ],
      },
      {
        title: "Struktur",
        links: [
          { label: "Rəhbərlik", url: "/struktur/leadership" },
          { label: "Fakültələr", url: "/faculties" },
          { label: "Kafedralar", url: "/cafedras" },
          { label: "Ömür boyu öyrənmə məktəbi", url: "/struktur/lifelong-learning" },
          { label: "Yüksək Təhsil İnstitutu", url: "/struktur/higher-education" },
          { label: "Şöbələr", url: "/struktur/departments" },
          { label: "Kolleclər", url: "/struktur/colleges" },
        ],
      },
      {
        title: "Tədqiqat",
        links: [
          { label: "İnstitutlar", url: "/tedqiqat/institutes" },
          { label: "Elmi-innovasiya strategiyası", url: "/tedqiqat/strategy" },
          { label: "Fəaliyyət istiqamətləri", url: "/tedqiqat/directions" },
          { label: "Tədqiqat və inkişaf şöbəsi", url: "/tedqiqat/r-and-d" },
          { label: "İnnovasiyalar", url: "/tedqiqat/innovations" },
          { label: "Kitabxana İnformasiya Mərkəzi", url: "/tedqiqat/library" },
          { label: "Konfranslar", url: "/tedqiqat/conferences" },
          { label: "Tələbə Elmi Cəmiyyəti", url: "/tedqiqat/student-science" },
        ],
      },
    ],
  },

  comingSoon: {
    defaultLabel: "Bu bölmə hazırlanır",
    subtitle: "Məlumat tezliklə əlavə olunacaq",
  },
};

export default az;
