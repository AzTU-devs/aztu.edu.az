const en = {
  common: {
    readMore: "Read More",
    viewAll: "View All",
    loading: "Loading...",
    home: "Home",
    lms: "LMS",
    alumni: "Alumni",
    aztuTv: "AzTU TV",
    quickMenu: "Quick Menu",
    search: "Search",
  },

  hero: {
    title: "Discover Azerbaijan Technical University",
    button: "Explore More",
    videoAriaLabel: (n: number) => `Switch to video ${n}`,
  },

  news: {
    sectionLabel: "Latest News",
    sectionTitle: "News",
    sectionTitleAccent: "Events",
    viewAll: "All News",
    readMore: "Read More",
    // news page
    breadcrumb: "Azerbaijan Technical University",
    pageTitle: "News",
    pageDescription: "Discover the latest events, scientific achievements, and campus updates at AzTU.",
    categoryAll: "All",
    otherNews: "Other News",
    errorMessage: "An error occurred while loading news.",
    noNews: "No news found in this category.",
    loadMore: "Load More",
  },

  stats: {
    sectionLabel: "AzTU By Numbers",
    sectionTitle: "About Our University",
    items: [
      { label: "Faculty", sublabel: "Teaching Faculties" },
      { label: "Specialization", sublabel: "Bachelor & Master" },
      { label: "Student", sublabel: "Active Students" },
      { label: "Teacher", sublabel: "Academic Staff" },
      { label: "Partner", sublabel: "International Collaboration" },
      { label: "Years of History", sublabel: "Since 1920" },
    ],
  },

  announcements: {
    sectionLabel: "AzTU Announcements",
    sectionTitle: "Announcements",
    viewAll: "All Announcements",
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
  },

  projects: {
    sectionLabel: "Research & Innovation",
    sectionTitle: "Projects",
    viewAll: "All Projects",
  },

  collaborators: {
    sectionLabel: "Global Partners",
    sectionTitle: "Collaborators",
    viewAll: "All Collaborators",
  },

  search: {
    header: "Search in AzTU",
    placeholder: "Enter search query…",
    popularLabel: "Popular Searches",
    suggestions: [
      "Admission Requirements",
      "Department List",
      "Curriculum",
      "Master's Program",
      "Scientific Journals",
      "Laboratories",
    ],
  },

  footer: {
    contactTitle: "Contact",
    defaultAddress: "Address: H.Cavid Avenue 25, Baku, Azerbaijan AZ 1073 Azerbaijan Technical University.",
    copyright: (year: number) => `${year} Azerbaijan Technical University. All rights reserved.`,
    quickLinks: [
      { label: "e-Library" },
      { label: "Rankings" },
      { label: "Admission" },
    ],
    columns: [
      {
        title: "About",
        links: [
          { label: "University History", url: "/haqqimizda/history" },
          { label: "Rector's Message", url: "/haqqimizda/rector-message" },
          { label: "Honorary Graduates", url: "/haqqimizda/honorary-graduates" },
          { label: "Honorary Doctors", url: "/haqqimizda/honorary-doctors" },
          { label: "Our Heroes", url: "/haqqimizda/heroes" },
          { label: "Councils", url: "/haqqimizda/councils" },
          { label: "Campus", url: "/haqqimizda/campus" },
        ],
      },
      {
        title: "Structure",
        links: [
          { label: "Leadership", url: "/struktur/leadership" },
          { label: "Faculties", url: "/faculties" },
          { label: "Departments", url: "/cafedras" },
          { label: "Lifelong Learning School", url: "/struktur/lifelong-learning" },
          { label: "Higher Education Institute", url: "/struktur/higher-education" },
          { label: "Units", url: "/struktur/departments" },
          { label: "Colleges", url: "/struktur/colleges" },
        ],
      },
      {
        title: "Research",
        links: [
          { label: "Institutes", url: "/tedqiqat/institutes" },
          { label: "Scientific Innovation Strategy", url: "/tedqiqat/strategy" },
          { label: "Activity Directions", url: "/tedqiqat/directions" },
          { label: "R&D Department", url: "/tedqiqat/r-and-d" },
          { label: "Innovations", url: "/tedqiqat/innovations" },
          { label: "Library Information Center", url: "/tedqiqat/library" },
          { label: "Conferences", url: "/tedqiqat/conferences" },
          { label: "Student Science Society", url: "/tedqiqat/student-science" },
        ],
      },
    ],
  },

  comingSoon: {
    defaultLabel: "This section is being prepared",
    subtitle: "Information will be added soon",
  },
} as const;

export default en;
