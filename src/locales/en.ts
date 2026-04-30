const MEDIA_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";
const VR_MEDIA = `${MEDIA_BASE}/media/prod/vice-rectors`;

const en = {
  common: {
    readMore: "Read More",
    viewAll: "View All",
    loading: "Loading...",
    home: "Home",
    lms: "LMS",
    kts: "QA",
    alumni: "Alumni",
    libraryAztu: "Library",
    quickMenu: {
      button: "Quick Access",
      navigation: "Navigation",
      title: "QUICK<br/>ACCESS",
      slogan: "Shaping the future of engineering",
      portal: "Portal",
      sections: {
        platform: {
          title: "Platform",
          items: {
            lms: "LMS",
            internalGrants: "Internal Grant Competition",
            planReport: "Plan-Report Information System",
          }
        },
        alumni: {
          title: "Alumni",
          items: {
            portal: "Alumni Portal",
            honoraryDoctors: "Honorary Doctors",
            honoraryGraduates: "Honorary Graduates",
            heroes: "Our Heroes",
          }
        },
        whyAztu: {
          title: "Why AzTU?",
          items: {
            infrastructure: "Infrastructure",
            startups: "Startups",
            dualDegree: "Dual Degree Programs",
            scholarships: "Scholarships",
          }
        }
      },
      leftItems: {
        ranking: "Rankings",
        accreditation: "Accreditation",
        policies: "Policies",
        reports: "Reports",
        faq: "FAQ",
      }
    },
    search: "Search",
    moreInSection: "More in this section",
    comingSoon: "Coming Soon",
    backToHome: "Back to Home",
  },

  nav: {
    sections: {
      about: "ABOUT",
      academics: "ACADEMICS",
      administration: "ADMINISTRATION",
      students: "STUDENTS",
      research: "RESEARCH",
      community: "COMMUNITY",
    },
    items: {
      historyOfAztu: "History of AzTU",
      visionMission: "Vision & Mission",
      visionMissionGoal: "Vision, Mission & Goal",
      vision: "Vision",
      mission: "Mission",
      strategicPlan: "Strategic Plan",
      anniversaryFilm: "75th Anniversary Film",
      leadershipGovernance: "Leadership & Governance",
      rector: "Rector",
      viceRector: "Vice-Rector",
      scientificBoard: "Scientific Board",
      affiliatedEntities: "Affiliated Entities",
      tau: "Türkiye–Azerbaijan University (TAU)",
      iit: "Institute of Information Technology",
      ics: "Institute of Control Systems",
      bakuTechnicalColleges: "Baku Technical Colleges",
      bakuStateColleges: "Baku State Colleges",
      policiesDocuments: "Policies & Documents",
      generalPolicies: "General Policies",
      academicPolicies: "Academic Policies",
      sustainabilityPolicies: "Sustainability Policies",
      procedureGuidelines: "Procedures & Guidelines",
      faculties: "Faculties",
      cafedras: "Departments",
      higherEducationInstitutes: "Higher Education Institutes",
      bakuStateCollegesComm: "Baku State Colleges of Communication and Transport",
      mba: "MBA",
      lifeLongLearning: "Lifelong Learning",
      departments: "Departments",
      researchDevelopment: "Research Development and Reputation",
      internationalAffairs: "International Affairs",
      secretariesCounsels: "Secretaries and Counselors",
      academicCalendar: "Academic Calendar",
      academicCalendar2026: "2026-2027 Academic Calendar",
      academicCalendar2025: "2025-2026 Academic Calendar",
      undergraduate: "Undergraduate",
      specialties: "Specialties",
      curriculum: "Curriculum",
      learningOutcomes: "Learning Outcomes",
      tuitionFees: "Tuition Fees",
      postgraduates: "Postgraduate",
      cdio: "CDIO",
      higherEducationInstitute: "Graduate School (Higher Education Institute)",
      internationalStudents: "International Students Unit",
      exchangePrograms: "Exchange Programs",
      orhunExchange: "Orhun Exchange Program",
      lmsGuidelines: "LMS Guidelines",
      researchActivities: "Research Activities",
      researchInstitutes: "Research Institutes",
      researchLaboratories: "Research Laboratories",
      researchPriorities: "Research Priorities",
      campusLife: "Campus Life",
      studentLife: "Student Life",
      clubs: "Clubs",
      sport: "Sports",
      culturalEvents: "Cultural Events",
      aztuPolyclinic: "AzTU Health Center",
      tradeUnion: "Trade Union",
      studentTradeUnion: "Student Trade Union",
      studentYouthOrg: "Student Youth Organization",
      universityCooperation: "University Cooperation",
      collaborations: "Collaborations",
      formerRectors: "Former Rectors",
      rankings: "Rankings",
    },
  },

  hero: {
    title: "Shaping the Future of Engineering",
    button: "Discover more",
    stats: [
      { label: "QS Ranking", value: "1001+" },
      { label: "THE Ranking", value: "1501+" },
      { label: "GreenMetric", value: "Top 800" },
      { label: "Students", value: "9000+" },
    ],
  },

  stats: {
    sectionLabel: "AzTU in Numbers",
    sectionTitle: "Our University by the Numbers",
    items: [
      { label: "Faculties", sublabel: "Academic divisions" },
      { label: "Departments", sublabel: "Teaching and research" },
      { label: "Specialties", sublabel: "Bachelor and Master" },
      { label: "Students", sublabel: "Currently enrolled" },
      { label: "Academic staff", sublabel: "Lecturers and researchers" },
      { label: "International partners", sublabel: "Universities and institutions" },
      { label: "Laboratories", sublabel: "Research and teaching" },
    ],
  },

  news: {
    sectionLabel: "News",
    sectionTitle: "Latest",
    sectionTitleAccent: "Stories",
    viewAll: "View all",
    readMore: "Read more",
    pageTitle: "News",
    pageDescription: "The latest news, announcements, and major events from our university.",
    breadcrumb: "News",
    categoryAll: "All",
    loadMore: "Load more",
  },

  announcements: {
    sectionLabel: "Announcements",
    sectionTitle: "Latest Announcements",
    viewAll: "View all",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },

  collaborators: {
    sectionLabel: "Partners",
    sectionTitle: "Institutions We Collaborate With",
    viewAll: "View all",
  },

  projects: {
    sectionLabel: "Projects",
    sectionTitle: "Research and Innovation Projects",
    viewAll: "View all",
  },

  search: {
    header: "Search the site",
    placeholder: "Type to search...",
    popularLabel: "Popular searches",
    suggestions: ["Admissions", "Programs", "Scholarships", "International", "Library"],
  },

  pages: {
    contact: {
      eyebrow: "Contact",
      title: "Contact Us",
      subtitle: "Have a question? Write or call us — we are happy to help.",
      breadcrumb: "Contact",
      description: "Use the information below to get in touch with Azerbaijan Technical University. Reach out to us with questions about admissions, academics, or any other matter.",
      sections: {
        address: {
          label: "Address",
          value: "25 H. Javid Avenue, Baku, Azerbaijan AZ 1073",
          sub: "Azerbaijan Technical University",
        },
        phone: {
          label: "Phone",
          value: "(+994 12) 539-13-05",
          sub: "Information center",
        },
        email: {
          label: "Email",
          value: "aztu@aztu.edu.az",
          sub: "For official correspondence",
        },
        hours: {
          label: "Working Hours",
          value: "Monday – Friday",
          sub: "09:00 – 18:00",
        },
        locationTitle: "Our Location",
        universityName: "Azerbaijan Technical University",
        buildingInfo: "Main academic building",
      },
    },

    about: {
      hei: {
        eyebrow: "Education and Programs",
        title: "Higher Education Institute (HEI)",
        subtitle: "Preparing highly qualified, competitive professionals for the modern engineering landscape.",
        breadcrumb: "Higher Education Institute",
        aboutTitle: "About the Institute",
        paragraphs: [
          "The Higher Education Institute (HEI) at Azerbaijan Technical University (AzTU) was established by the decision of the University's Scientific Board on December 27, 2021. It serves as a key academic unit responsible for the centralized organization and development of graduate education and research at the Master’s and Doctoral levels.",
          "The primary objective of the Graduate School is to prepare highly qualified, competitive professionals who meet modern global demands, possess innovative thinking, and contribute to advancing research quality in line with international standards."
        ],
        missionTitle: "Mission and Strategic Directions",
        missionText: "The mission of the Graduate School is to educate professionals in technical and engineering fields equipped with advanced knowledge, analytical and creative thinking, and strong leadership capabilities. It also aims to foster innovation and strengthen the university’s integration into the global academic environment.",
        strategicDirections: [
          "Coordination of Master’s and Doctoral programs",
          "Management and advancement of research activities",
          "Training young researchers and strengthening academic capacity",
          "Promotion of participation in national and international research projects",
          "Strengthening collaboration between the university and industry"
        ],
        academicOpportunities: {
          title: "Academic Opportunities",
          description: "The Graduate School offers a wide spectrum of programs at the Master’s level:",
          stats: [
            "36 fields of study",
            "126 specializations"
          ],
          languagesTitle: "Instruction is provided in a multilingual environment in:",
          languages: [
            "Azerbaijani",
            "English",
            "German",
            "Russian"
          ],
          footer: "This approach enables students to integrate effectively into the international academic and professional community."
        },
        researchTitle: "Research and Innovation",
        researchDescription: "The Graduate School provides comprehensive support to Master’s and Doctoral students throughout all stages of their research, including:",
        researchItems: [
          "Strategic research planning and execution",
          "Selection of application-oriented dissertation topics",
          "Promotion of research aligned with industry needs",
          "Support for publications in peer-reviewed international journals",
          "Facilitating participation in global conferences and academic events"
        ],
        researchFooter: "It also ensures the integration of modern scientific achievements and innovative technologies into the teaching and research processes.",
        doctoralTitle: "Doctoral Education",
        doctoralDescription: "Doctoral education at AzTU represents the highest academic level and leads to the award of PhD and Doctor of Science degrees.",
        doctoralFormatsTitle: "Programs are offered in the following formats:",
        doctoralFormats: [
          "Full-time (with leave from production)",
          "Part-time (without leave from production)",
          "Dissertation-based"
        ],
        doctoralDuration: {
          title: "Duration of Study:",
          phd: {
            title: "PhD:",
            items: ["Full-time: 3 years", "Part-time: 4 years", "Dissertation-based: 4 years"]
          },
          ds: {
            title: "Doctor of Science:",
            items: ["Full-time: 4 years", "Part-time: 5 years", "Dissertation-based: 5 years"]
          },
          footer: "In necessary cases, the duration may be extended in accordance with current legislation."
        },
        doctoralAdmission: "Admission is competitive and open to applicants holding a Master’s degree or an equivalent higher education qualification.",
        director: {
          title: "Director",
          name: "Aynura Ismayilova",
          degree: "PhD in Economics, Associate Professor",
          email: "aynura.ismayilova@aztu.edu.az",
          phone: "Ext. № 3201",
          office: "Main Academic Building, Room 206",
          hours: "Friday, 15:00–19:00",
          bio: "Aynura Ismayilova is a professional with over 15 years of international experience in project management and economic research. She began her career in 2004 at the Azerbaijan National Academy of Sciences and later served as a Project Manager for a joint project between the UNDP and the Ministry of Economy of the Republic of Azerbaijan. She subsequently held senior positions at the Institute of Economic Reforms, serving as Head of Department and Deputy Director.\n\nWith extensive experience in collaborating with international financial institutions, she has coordinated projects supported by the Asian Development Bank (ADB), Islamic Development Bank (IsDB), and the Turkish Cooperation and Coordination Agency (TİKA).\n\nSince 2021, she has been at Azerbaijan Technical University (AzTU), where she has played a key role in strengthening university–industry collaboration. She currently serves as an Associate Professor in the Department of Economics and Statistics.",
          achievements: "Aynura Ismayilova holds Bachelor’s and Master’s degrees from Baku State University. In 2021, she earned her PhD in Economics. She also holds the internationally recognized IPMA Level B certification in project management. In 2014, she was awarded the “Progress” Medal by the President of the Republic of Azerbaijan.",
          researchInterestsTitle: "Academic Research Interests",
          researchInterests: [
            "Project Management",
            "Regional Economic Cooperation",
            "University–Industry Collaboration Models",
            "Innovation Policy and Institutional Development",
            "Lifelong Learning and Competency-Based Education",
            "Digital Transformation and Higher Education Governance"
          ],
          educationTitle: "Education",
          educationItems: [
            { period: "2012–2016", degree: "Doctoral Studies", inst: "Institute for Scientific Research on Economic Reforms (ISRER)" },
            { period: "2001–2003", degree: "Master’s Degree", inst: "Baku State University, Faculty of Applied Mathematics" },
            { period: "1997–2001", degree: "Bachelor’s Degree", inst: "Baku State University, Faculty of Applied Mathematics" }
          ]
        },
        staffTitle: "Staff Members",
        staffDescription: "Information about the Graduate School staff:",
        staff: [
          { name: "Hajar Aliyeva", pos: "Doctoral Program Manager", degree: "-", email: "hecer.aliyeva@aztu.edu.az", phone: "+994 050 584 20 73" },
          { name: "Kamran Abilov", pos: "Master’s Program Manager", degree: "-", email: "kamran.ebilov@aztu.edu.az", phone: "+994 077 761 59 22" },
          { name: "Aynur Huseynova", pos: "Student Affairs Manager", degree: "-", email: "aynur.huseynova@aztu.edu.az", phone: "+994 055 449 96 06" }
        ],
        contactInfo: {
          title: "Contact",
          address: "Main Academic Building, Room 414",
          phone: "3201",
          email: "yti@aztu.edu.az",
          hours: "09:00–18:00 (Mon-Fri) and 18:00–21:00 (Tue-Thu)"
        },
        board: {
          title: "Management Board",
          intro: "Duties of the Management Board of the Higher Education Institute (HEI):",
          duties: [
            "Determine the strategic directions and prepare medium and long-term development plans (5–10 years);",
            "Approve annual action plans accepted by the Scientific Board and the Director."
          ],
          note: "The Management Board operates on a voluntary public basis.",
          rightsTitle: "Rights of the Management Board:",
          rights: [
            "Establish partnerships with industrial enterprises on behalf of the HEI;",
            "Report directly to the Scientific Board and the Rector concerning annual activities."
          ],
          compositionTitle: "Board Composition:",
          composition: [
            "Consists of 10 members and 1 Chairman;",
            "5 members from AzTU, 6 members from industrial sectors;",
            "AzTU members are appointed by the Rector's order. One is designated as Chairman.",
            "Industrial representatives are nominated from large local and foreign enterprises via official invitation. Only 1 representative per enterprise.",
            "Members are appointed for a 1-year term, with annual renewals.",
            "Industrial enterprises may nominate the same individual multiple times.",
            "AzTU members (including the Chairman) cannot be appointed more than twice consecutively."
          ],
          requirementsTitle: "Member Requirements:",
          requirements: [
            "Industry members: Must be a Head of Strategic Development, Board Member, Deputy Director, or a similar strategic decision-maker.",
            "AzTU members: Must hold at least a PhD; minimum 1 year of pedagogical experience; minimum 1 year of administrative experience (Dean, Dept Head, Advisor, etc.)."
          ],
          chairman: "Chairman of the Board: PhD in Economics F.O. Mammadov (fariz.mammadov@aztu.edu.az)."
        },
        related: [
          { title: "Partner Universities", href: "/about/partner-universities" },
          { title: "Strategic Plan", href: "/about/strategic-plan" },
        ]
      },

      rankings: {
        eyebrow: "Rankings",
        title: "International Rankings",
        subtitle: "Global recognition and educational quality indicators of AzTU.",
        breadcrumb: "Rankings",
        importanceTitle: "Importance",
        importanceItems: [
          "Enhances global visibility and institutional reputation.",
          "Enables comparative assessment of educational quality.",
          "Attracts international students and strategic partners.",
          "Supports evidence-based management and development."
        ],
        systems: [
          {
            name: "QS World University Rankings",
            criteria: "Academic reputation, Employer reputation, Research impact, and Internationalization.",
            methodology: "https://www.topuniversities.com/world-university-rankings/methodology",
            logo: "/logos/qs-logo.svg"
          },
          {
            name: "Times Higher Education (THE) Rankings",
            criteria: "Teaching, Research environment, Citations, Industry income, and International outlook.",
            methodology: "https://www.timeshighereducation.com/world-university-rankings/methodology",
            logo: "/logos/the-logo.svg"
          },
          {
            name: "UI GreenMetric",
            criteria: "Infrastructure, Energy, Waste, Water, Transportation, and Education.",
            methodology: "https://uigreenmetric.com/rankings",
            logo: "/logos/greenmetric-logo.svg"
          }
        ],
        positionsTitle: "Current Ranking Positions",
        positions: [
          { name: "QS Europe 2026", position: "476" },
          { name: "QS Europe 2026 (Western Asia)", position: "30" },
          { name: "QS World University Rankings (New Entrant)", position: "851-900" },
          { name: "QS World Rankings by Subject 2026", position: "701-750" },
          { name: "World's Most Sustainable University (2025)", position: "835" },
          { name: "World's Most Sustainable University (2024)", position: "1014" }
        ],
        profileLink: "View AzTU THE Profile",
        profileUrl: "https://www.timeshighereducation.com/world-university-rankings/azerbaijan-technical-university-aztu"
      },

      history: {
        eyebrow: "Our Legacy",
        title: "History of AzTU",
        subtitle: "A journey of innovation and excellence since 1887.",
        breadcrumb: "History",
        milestonesTitle: "Key Milestones",
        milestones: [
          { year: "1887", title: "Foundation of Technical Education", description: "On November 10, 1887, a four-grade technical school was established in Baku, laying the foundation for technical education in Azerbaijan." },
          { year: "1920", title: "Establishment of the Polytechnic Institute", description: "Baku Polytechnic Institute was established, marking a new era for higher technical education in the country." },
          { year: "1950", title: "Modern Reorganization", description: "The Azerbaijan Polytechnic Institute resumed activities, forming the direct basis of the modern AzTU." },
          { year: "1991", title: "University Status", description: "The institution was officially granted University status and renamed Azerbaijan Technical University (AzTU)." },
          { year: "Today", title: "A Leading Technical Institution", description: "AzTU is a premier hub for engineering, ICT, energy, and economics, training highly qualified specialists for strategic sectors." },
        ],
        stats: [
          { value: "75+", label: "Years of Modern History" },
          { value: "25,000+", label: "Active Students" },
          { value: "1,500+", label: "Academic Staff" },
          { value: "12", label: "Faculties" },
        ],
        related: [
          { title: "Vision", href: "/about/vision" },
          { title: "Mission", href: "/about/mission" },
          { title: "Anniversary Film", href: "/about/75th-anniversary-film" },
        ],
      },

      vision: {
        eyebrow: "Our Direction",
        title: "Vision",
        subtitle: "The future AzTU is building.",
        breadcrumb: "Vision",
        statementTitle: "Our Vision Statement",
        visionQuote: "To become a leading regional university in the engineering fields of the future through innovation and the application of advanced technologies.",
        related: [
          { title: "Mission", href: "/about/mission" },
          { title: "Strategic Plan", href: "/about/strategic-plan" },
          { title: "History", href: "/about/history" },
        ],
      },

      mission: {
        eyebrow: "Our Purpose",
        title: "Mission",
        subtitle: "Why AzTU exists — our commitment to society and the world.",
        breadcrumb: "Mission",
        statementTitle: "Our Mission Statement",
        missionStatement: "To provide advanced education and research excellence in engineering sciences and smart technology applications.",
        related: [
          { title: "Vision", href: "/about/vision" },
          { title: "Strategic Plan", href: "/about/strategic-plan" },
          { title: "History", href: "/about/history" },
        ],
      },

      strategicPlan: {
        eyebrow: "Vision 2030",
        title: "Strategic Development Plan",
        subtitle: "Towards 2030: Becoming a leading entrepreneurial research university.",
        breadcrumb: "Strategic Plan",
        pdfUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/Strategic_Development_Plan_2024-2030.pdf",
        vision: "To become a leading regional entrepreneurial research university specializing in engineering and technology.",
        mission: "To educate competitive professionals, conduct innovative research, and provide high-value services to industry.",
        pillars: [
          {
            num: "01",
            title: "Educational Excellence",
            description: "Modernizing teaching and aligning with global market needs.",
            targets: ["Modernized curriculum", "International accreditation", "High employability"]
          },
          {
            num: "02",
            title: "Research and Innovation",
            description: "Boosting scientific output and fostering entrepreneurship.",
            targets: ["Scopus/WoS publications", "Industry partnerships", "Technology transfer"]
          }
        ],
        valuesTitle: "Core Values",
        values: [
          "Academic Freedom",
          "Integrity & Transparency",
          "Innovation",
          "Excellence",
          "Social Responsibility"
        ],
        targetsTitle: "Major KPIs",
        targets: [
          "Top 1000 in QS World Rankings",
          "Increase in high-impact scientific publications",
          "International student share of 5-10%",
          "Graduate employability exceeding 80%",
          "Accreditation for 50%+ of programs"
        ],
        related: [
          { title: "Vision", href: "/about/vision" },
          { title: "Mission", href: "/about/mission" },
          { title: "History", href: "/about/history" },
        ],
      },

      rector: {
        eyebrow: "Leadership & Governance",
        title: "Rector",
        subtitle: "The academic and administrative leader of AzTU.",
        breadcrumb: "Rector",
        messageTitle: "Message from the Rector",
        message: [
          "Dear Colleagues, Students, Alumni, and Partners,",
          "I welcome you to Azerbaijan Technical University (AzTU) — an institution with a distinguished legacy since 1887, now driving innovation and global engagement.",
          "For over a century, AzTU has been a cornerstone of engineering education in Azerbaijan. Today, we are evolving into a modern, research-driven institution committed to excellence and industry collaboration.",
          "In an era of rapid digital transformation, our goal is to become a leading entrepreneurial university that transforms ideas into real-world solutions.",
          "We invite you to join us on this journey of learning, innovation, and leadership.",
          "Sincerely,",
          "Prof. Vilayat Valiyev",
          "Rector"
        ],
        responsibilitiesTitle: "Responsibilities",
        responsibilities: [
          "Providing overall academic and administrative leadership",
          "Representing AzTU in national and international forums",
          "Overseeing the implementation of the strategic plan",
          "Appointing and evaluating senior faculty and staff",
          "Ensuring compliance with state educational standards",
          "Fostering partnerships with industry and global institutions"
        ],
        aboutRectorTitle: "About the Rector",
        aboutRector: [
          "Prof. Vilayat Valiyev is a distinguished scholar in engineering and energy economics. Appointed by Presidential Decree in 2019 and reappointed in 2024, he has led AzTU’s transformation into a modern entrepreneurial institution.",
          "He holds a PhD in Engineering and a Doctor of Sciences in Economics. He has held senior roles at the Academy of Sciences and directed the ISRER (2009–2019).",
          "He has authored over 100 scientific works and was named an 'Honored Scientist' in 2014.",
          "He is fluent in Russian and English. He is married with two children."
        ],
        departmentsTag: "Management",
        departmentsTitle: "Offices Under the Rector",
        departmentsSubtitle: "The following administrative and academic divisions operate directly under the Rector's supervision.",
        totalUnitsLabel: "Total Units",
        departments: [
          "Office of the Rector",
          "Directorate of Academic Affairs",
          "Directorate of Science and Innovation",
          "International Relations and Bologna Process Office",
          "Strategic Planning and Development",
          "Quality Assurance Department",
          "Legal Affairs and Compliance Office",
          "Information Technology Department",
          "Press and Public Relations Office",
          "Human Resources Department",
          "Internal Audit Unit",
          "Infrastructure and Capital Construction"
        ],
        galleryTitle: "Rector's Gallery",
        gallerySubtitle: "Moments from the Rector's academic and administrative activities.",
        galleryItems: [
          { image: "/rector_gallery/00001.JPG", caption: "Opening of the new research laboratory, 2024" },
          { image: "/rector_gallery/0001.jpg", caption: "Meeting with international partners at AzTU, 2024" },
          { image: "/rector_gallery/1 (41).jpg", caption: "Class of 2024 Commencement Ceremony" },
          { image: "/rector_gallery/1 (5).jpeg", caption: "Signing of the cooperation agreement with Baku State University" },
          { image: "/rector_gallery/1 (9).JPG", caption: "STEM Olympiad Awards Ceremony, 2023" },
          { image: "/rector_gallery/1.jpg", caption: "Rector's address at the Scientific Board meeting" },
          { image: "/rector_gallery/11 (11).JPG", caption: "Participation in the international education forum" },
          { image: "/rector_gallery/11 (12).JPG", caption: "Visit to the university innovation center" },
          { image: "/rector_gallery/11 (3).jpeg", caption: "Meeting with students and academic staff" },
          { image: "/rector_gallery/1111.JPG", caption: "Discussion of strategic development plans" },
          { image: "/rector_gallery/7.JPG", caption: "Cooperation meeting with industry leaders" },
          { image: "/rector_gallery/858ea15b-e356-42b3-9ef2-2c94153b9700.jpg", caption: "Official reception of foreign delegations" },
          { image: "/rector_gallery/a2.jpeg", caption: "Recognition of distinguished staff members" },
          { image: "/rector_gallery/adex (2).jpg", caption: "Tour of new campus facilities" },
          { image: "/rector_gallery/china (2).jpg", caption: "Highlights from the Scientific Board meeting" },
          { image: "/rector_gallery/china (3).jpg", caption: "Signing ceremony for international exchange programs" },
          { image: "/rector_gallery/IMG_9408.jpg", caption: "Rector's participation at a scientific conference" },
          { image: "/rector_gallery/qs.JPG", caption: "Engagement with student innovation groups" },
          { image: "/rector_gallery/ROKESTAN 1.jpg", caption: "Cultural event at the university" },
          { image: "/rector_gallery/TAG_3712 (1).jpg", caption: "Master classes by industry experts" },
          { image: "/rector_gallery/TAG_3712 (2).JPG", caption: "Celebration of key university milestones" },
          { image: "/rector_gallery/TAG_3712 (4).JPG", caption: "Future technologies exhibition at AzTU" },
        ],
        related: [
          { title: "Vice-Rectors", href: "/about/vice-rector" },
          { title: "Scientific Board", href: "/about/scientific-board" },
          { title: "Strategic Plan", href: "/about/strategic-plan" },
        ],
      },

      rectorsOffice: {
        eyebrow: "Leadership & Governance",
        title: "Rector's Office",
        subtitle: "The administrative staff of the Rectorate.",
        breadcrumb: "Rectorate",
        staff: [
          { name: "Nijat Ahmadov", email: "nijat.ahmadov@aztu.edu.az", phone: "+994 12 538 32 80", title: "Assistant to the Rector" },
          { name: "Mehriban Aliyeva", email: "mehriban.aliyeva@aztu.edu.az", phone: "+994 12 537 01 12", title: "Rector’s Secretary" }
        ]
      },

      viceRector: {
        eyebrow: "Leadership & Governance",
        title: "Vice-Rectors",
        subtitle: "The Vice-Rectors oversee core operational domains of the university.",
        breadcrumb: "Vice-Rectors",
        overviewText: "Each Vice-Rector reports directly to the Rector and holds responsibility for a specific portfolio. Together, they form the university's executive leadership team.",
        cardCta: "View profile",
        contactTitle: "Contact",
        biographyTitle: "Biography",
        backToList: "Back to all Vice-Rectors",
        viceRectors: [
          {
            slug: "nureli-yusifbeyli",
            name: "Prof. Nureli Yusifbeyli",
            degree: "Doctor of Technical Sciences, Professor",
            title: "Vice-Rector for Academic Affairs",
            email: "vr.academic@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/nurali_yusifbayli.JPG`,
            biography: [
              "Prof. Nureli Yusifbeyli is Vice-Rector for Academic Affairs at Azerbaijan Technical University and a distinguished scholar in energy systems and strategic planning. He holds a Doctor of Technical Sciences degree and the academic title of Professor, with extensive expertise in electroenergetics, energy security, and sustainable energy systems. He was appointed to his current position on January 18, 2021, by the order of the Ministry of Education of the Republic of Azerbaijan.",
              "Prof. Yusifbeyli brings decades of leadership experience in the energy sector, having held senior positions at Azerenerji JSC, including Head of the Central Dispatch Administration, where he played a key role in the management and development of national energy systems. He later served in public administration at the Ministry of Economy and Industry of Azerbaijan, leading strategic planning initiatives, and as Deputy Chairman of the State Agency for Alternative and Renewable Energy Sources.",
              "His research focuses on energy security, power system development, and the integration of renewable energy sources. He is the author of over 200 scientific publications, 8 books, patents, and national standards, and has led major international projects, including the ECO regional energy strategy and Caspian region energy security initiatives.",
              "Prof. Yusifbeyli serves as Editor-in-Chief of the international journal “Electroenergetics, Technics, Mechanics + Control”, is a member of IEEE, and an academician of the ECO Academy. His contributions have been recognized with prestigious honors, including the titles of Honored Engineer, Honored Scientist of Azerbaijan, and Honored Power Engineer of the CIS.",
            ],
          },
          {
            slug: "subhan-namazov",
            name: "Prof. Subhan Namazov",
            degree: "Doctor of Technical Sciences, Professor",
            title: "Vice-Rector for Science and Innovation",
            email: "vr.research@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/subhan_namazov.jpeg`,
            biography: [
              "Prof. Subhan Namazov is a distinguished scholar and academic leader in materials science, metallurgy, and higher education development. He holds a Doctor of Technical Sciences degree and the academic title of Professor, with extensive experience in research, innovation, and academic leadership. He graduated with distinction from Azerbaijan Technical University in 1994, obtained his PhD in 1997, and his Doctor of Sciences degree in 2007. During his student years, he was awarded the prestigious ISESCO international scholarship.",
              "Prof. Namazov has built a strong academic and leadership career at Azerbaijan Technical University, serving in key roles including Head of the Teaching Department (2003–2011) and Head of the Department of Metallurgy and Materials Science (2011–2020). He has made significant contributions to the development of academic capacity, supervising and mentoring numerous undergraduate, graduate, and doctoral students, including several PhD graduates.",
              "Internationally, he has conducted advanced research under the DAAD program at leading German institutions, including RWTH Aachen University and the University of Rostock. He has actively contributed to TEMPUS and ERASMUS+ projects, playing a key role in international collaboration, quality assurance, and higher education development. He has also led and managed research projects funded by the Azerbaijan Science Foundation and the Ministry of Science and Education.",
              "He served as Vice-Rector for International Relations (2018–2022), significantly strengthening the university's global engagement and international visibility. Since 2022, he has been serving as Vice-Rector for Science and Innovation, leading the university's research and innovation strategy.",
              "Prof. Namazov is the author of over 220 scientific publications, including monographs, textbooks, and patents. His research has been widely published internationally and presented at numerous global conferences. He was elected a full member (academician) of the International Engineering Academy in 2016 and has been awarded the honorary title of “Honored Teacher of Azerbaijan.”",
            ],
          },
          {
            slug: "fariz-mammadov",
            name: "Dr. Fariz Mammadov",
            degree: "PhD in Economics (Econometrics and Economic Statistics)",
            title: "Vice-Rector for International Relations",
            email: "vr.international@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/fariz_mammadov.jpeg`,
            biography: [
              "Dr. Fariz Mammadov is a senior academic leader and expert in international relations, with extensive experience in higher education management, energy policy, and strategic development. He currently serves as Vice-Rector for International Relations at Azerbaijan Technical University (AzTU), where he leads the university's internationalization strategy, including the development of global partnerships, engagement in international academic networks, and the implementation of joint degree programs, academic mobility, and international research initiatives. He also serves as Head of the MBA Program at AzTU's Institute of Higher Education.",
              "Dr. Mammadov has a strong multidisciplinary background in energy policy, strategic planning, economic analysis, and higher education governance. Prior to his current role, he conducted research at the Economic Reforms Scientific Research Institute under the Ministry of Economy of Azerbaijan and held senior management positions at Azerenerji JSC.",
              "He has actively contributed to major international projects in collaboration with leading organizations such as the World Bank, Asian Development Bank, European Union, and UNDP, serving as an energy expert, national consultant, economist, and project coordinator. His work has supported the advancement of Azerbaijan's energy policy, sector modernization, climate action planning, and strategic reform initiatives.",
              "Dr. Mammadov holds a PhD in Economics (Econometrics and Economic Statistics) and a Master's degree in Business Administration from a joint program of ADA University and Maastricht School of Management (Netherlands). He also holds a Master's degree in Political Science from Baku State University.",
              "He is a member of the International Association for Energy Economics (IAEE) and holds internationally recognized certifications, including ISO 50001 Energy Management Systems, ISO/IEC 42001 Artificial Intelligence Management Systems, and IPMA Certified Project Management Professional.",
            ],
          },
          {
            slug: "rashad-aliyev",
            name: "Rashad Aliyev",
            degree: "PhD in Econometrics, MBA",
            title: "Vice-Rector for Finance and Operations",
            email: "vr.admin@aztu.edu.az",
            phone: "+994 12 539 08 57",
            photoUrl: `${VR_MEDIA}/rashad_aliyev.JPG`,
            biography: [
              "Rashad Aliyev is a senior executive with nearly two decades of experience in management, finance, information technologies, marketing, and innovation. He currently serves as Vice-Rector for Finance and Operations at Azerbaijan Technical University, where he leads financial strategy, enhances operational efficiency, and drives institutional development.",
              "Throughout his career, he has built extensive experience across banking, corporate governance, and business development, holding leadership positions at Azersun Holding, ASB Bank, Royal Bank, and Performance Center (Chevrolet Azerbaijan). He most recently served as Chairman of the Board at AAAF Holding, demonstrating strong expertise in strategic management and organizational transformation.",
              "Aliyev is also actively engaged in the startup and innovation ecosystem, particularly in the fintech sector, where he has led his own initiatives and supported emerging entrepreneurs as an expert.",
              "He was appointed Vice-Rector for Digitalization and Projects on August 11, 2021, and Vice-Rector for Finance and Operations on February 22, 2023. Since 2022, he has also served as President of the AzTU Basketball Club on a voluntary basis.",
              "He holds a Bachelor's degree in Political Science from Istanbul University, an MBA from Azerbaijan State University of Economics, and a PhD in Econometrics from Baku Engineering University. He has also completed the Manager Training Program supported by GIZ (Germany) and the Ministry of Economy of Azerbaijan.",
              "Aliyev has participated in international training and conferences across the United States, Turkey, Qatar, Germany, Italy, Poland, the Czech Republic, and other European countries, and is fluent in English, Turkish, and Russian.",
            ],
          },
        ],
        related: [
          { title: "Rector", href: "/about/leadership-and-management/rector" },
          { title: "Scientific Board", href: "/about/leadership-and-management/scientific-board" },
          { title: "Strategic Plan", href: "/about/vision-mission/strategic-plan" },
        ],
      },

      scientificBoard: {
        eyebrow: "Leadership & Governance",
        title: "Scientific Board",
        subtitle: "The supreme academic governing body of AzTU.",
        breadcrumb: "Scientific Board",
        aboutTitle: "About the Board",
        aboutText: "The Scientific Board is the highest collegial body responsible for the university’s academic and strategic direction. It ensures the integration of teaching and research, chaired by the Rector.",
        scientificCouncil: {
          title: "Scientific Board Members",
          headers: ["№", "Name", "Position"],
          members: [
            ["1", "Vilayat Valiyev", "Rector, Professor, Chairman"],
            ["2", "Nureli Yusifbeyli", "Vice-Rector for Academic Affairs, Professor, Vice-Chairman"],
            ["3", "Vafa Rzayeva", "Scientific Secretary"],
            ["4", "Subhan Namazov", "Vice-Rector for Science and Innovation"],
            ["5", "Fariz Mammadov", "Vice-Rector for International Relations"],
            ["6", "Fariz Mustafayev", "Vice-Rector for General Affairs"],
            ["7", "Rashad Aliyev", "Vice-Rector for Finance and Economics"],
            ["8", "Narmin Rzayeva", "Vice-Rector for Social and Public Relations"],
          ]
        },
        digitalCouncil: {
          title: "Digital Council",
          headers: ["№", "Full Name", "Position"],
          members: [
            ["1", "Telman Akhundov", "Head of 'Akhundoff Network', Chairman"],
            ["2", "Vilayat Valiyev", "Rector of AzTU"],
          ]
        },
        related: [
          { title: "Rector", href: "/about/rector" },
          { title: "Vice-Rectors", href: "/about/vice-rectors" },
          { title: "Strategic Plan", href: "/about/strategic-plan" },
        ],
      },

      tau: {
        eyebrow: "Affiliated Entity",
        title: "Türkiye–Azerbaijan University",
        subtitle: "A modern model for strategic academic collaboration.",
        breadcrumb: "TAU",
        aboutTitle: "About TAU",
        paragraphs: [
          "Türkiye–Azerbaijan University (TAU) represents a strategic partnership between two brotherly nations. It combines the academic traditions of both countries to provide international standard education.",
          "Academic programs are developed with top Turkish universities (ITU, METU, Hacettepe) to produce globally competitive engineers.",
          "The curriculum is built on practice-oriented learning in modern laboratories."
        ],
        websiteUrl: "https://tau.edu.az/",
        programmesTitle: "Programs Offered",
        facts: [
          { label: "Established", value: "2024" },
          { label: "Location", value: "Baku, Azerbaijan" },
          { label: "Students", value: "3,000+" },
          { label: "Degrees", value: "30+" },
        ],
        related: [
          { title: "IIT", href: "/about/iit" },
          { title: "ICS", href: "/about/ics" },
          { title: "Technical Colleges", href: "/about/colleges" },
        ],
      },

      iit: {
        eyebrow: "Affiliated Entity",
        title: "Institute of Information Technology",
        subtitle: "AzTU’s hub for ICT research and education.",
        breadcrumb: "IIT",
        aboutTitle: "About the Institute",
        paragraphs: [
          "AzTU fosters a dynamic academic ecosystem through strategic partnerships.",
          "The Institute of Information Technology (ANAS) is a leader in digital transformation, AI, and data science.",
          "Through joint initiatives, we integrate cutting-edge tech into our curricula."
        ],
        websiteUrl: "https://ict.az/en/",
        related: [
          { title: "TAU", href: "/about/tau" },
          { title: "ICS", href: "/about/ics" },
        ],
      },

      ics: {
        eyebrow: "Affiliated Entity",
        title: "Institute of Control Systems",
        subtitle: "Leading research in automation and control technologies.",
        breadcrumb: "ICS",
        aboutTitle: "About the Institute",
        paragraphs: [
          "The Institute of Control Systems specializes in systems engineering and automation.",
          "Our partnership enhances interdisciplinary research and the development of intelligent management systems."
        ],
        websiteUrl: "https://isi.az/en/",
        related: [
          { title: "TAU", href: "/about/tau" },
          { title: "IIT", href: "/about/iit" },
        ],
      },

      bakuTechnicalColleges: {
        eyebrow: "Affiliated Entity",
        title: "Baku Technical College",
        subtitle: "Preparing competitive professionals for the modern labor market.",
        breadcrumb: "Technical College",
        aboutTitle: "About the College",
        paragraphs: [
          "Founded in 1996 through a merger of historic technical schools, it has a long legacy in engineering training.",
          "Since 2015, it has operated under AzTU, offering sub-bachelor level programs in various technical fields."
        ],
        websiteUrl: "https://bakitexnikikolleci.edu.az/",
        related: [
          { title: "Communication College", href: "/about/baku-state-colleges" },
          { title: "TAU", href: "/about/tau" },
        ],
      },

      bakuStateColleges: {
        eyebrow: "Affiliated Entity",
        title: "Baku State College of Communication and Transport",
        subtitle: "A leader in mid-level communication and transport education.",
        breadcrumb: "Communication College",
        aboutTitle: "About the College",
        paragraphs: [
          "AzTU's specialized college for transport and communication, producing competitive experts since 1931.",
          "We emphasize technical proficiency and analytical thinking through modern practice-oriented methods."
        ],
        websiteUrl: "https://rabitakolleci.edu.az/",
        related: [
          { title: "Technical College", href: "/about/baku-technical-colleges" },
          { title: "TAU", href: "/about/tau" },
        ],
      },

      generalPolicies: {
        eyebrow: "Policies & Documents",
        title: "General Policies",
        subtitle: "Main official documents governing university operations.",
        breadcrumb: "General Policies",
      },

      academicPolicies: {
        eyebrow: "Policies & Documents",
        title: "Academic Policies",
        subtitle: "Regulations on registration, assessment, and academic conduct.",
        breadcrumb: "Academic Policies",
      },

      sustainabilityPolicies: {
        eyebrow: "Policies & Documents",
        title: "Sustainability Policies",
        subtitle: "Our commitment to the environment and Green Campus initiatives.",
        breadcrumb: "Sustainability Policies",
      },

      procedureGuidelines: {
        eyebrow: "Policies & Documents",
        title: "Procedures & Guidelines",
        subtitle: "Internal procedures and official regulatory guidelines.",
        breadcrumb: "Procedures & Guidelines",
      },
    },
    students: {
      academicCalendar2025: {
        eyebrow: "Students",
        title: "2025-2026 Academic Calendar",
        subtitle: "AzTU's academic activity schedule.",
        breadcrumb: "Calendar 2025-2026",
        sections: [
          {
            title: "Fall Semester (2025)",
            headers: ["Dates", "Activity / Event"],
            rows: [
              ["Sept 1 – 10", "Course registration adjustments"],
              ["Sept 15", "Knowledge Day / Classes Begin"],
              ["Sept 15 – 21", "Week I of Teaching"],
              ["Jan 20", "National Day of Mourning"],
              ["Dec 31", "International Solidarity Day"],
            ]
          },
        ],
        notes: [
          "Internships: Start with the Spring semester and last 20 weeks.",
          "Assessments: Performed during the 10th and 11th weeks of the semester.",
          "Independent Work: Specific deadlines are set for grade entry into the system."
        ]
      },
      assessmentRules: {
        eyebrow: "Students",
        title: "Assessment and Examination Rules",
        subtitle: "Procedures for evaluating student knowledge.",
        breadcrumb: "Assessment Rules",
        sections: [
          {
            title: "Assessment System",
            content: "Student knowledge is evaluated on a 100-point scale:",
            list: [
              "Seminar / Practical: 30 points",
              "Attendance: 10 points",
              "Independent Work: 10 points",
              "Final Exam: 50 points"
            ],
            subContent: "A minimum of 17 points is required to pass the exam."
          },
          {
            title: "Grading Scale",
            table: {
              headers: ["Points", "Grade", "Description"],
              rows: [
                ["91 – 100", "A", "Excellent"],
                ["81 – 90", "B", "Very Good"],
                ["71 – 80", "C", "Good"],
                ["61 – 70", "D", "Satisfactory"],
                ["51 – 60", "E", "Sufficient"],
                ["Below 51", "F", "Fail (Kəsr)"]
              ]
            }
          }
        ]
      },
      creditSystem: {
        eyebrow: "Students",
        title: "Credit System for Bachelor and Master Levels",
        subtitle:
          "The core rules of the ECTS-based study model used at AzTU.",
        breadcrumb: "Credit System",
        pdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/Bakalavr_ve_Magistratura_Kredit_Sistemi.pdf",
        sections: [
          {
            title: "What is a credit?",
            content:
              "A credit is the standardized unit measuring a student's workload for a single course in an academic year. AzTU operates under the European Credit Transfer and Accumulation System (ECTS).",
          },
          {
            title: "Bachelor level",
            content: "Credit volume a student must accumulate at the bachelor level:",
            list: [
              "One academic year: 60 credits (30 + 30)",
              "One semester: 30 credits",
              "Full bachelor program: 240 credits (4 years)",
              "Diploma project / final state attestation: 6–12 credits",
            ],
          },
          {
            title: "Master level",
            content: "Credit volume at the master level:",
            list: [
              "One academic year: 60 credits",
              "Full master program: 120 credits (2 years)",
              "Master's dissertation: 30 credits",
            ],
          },
          {
            title: "Grading scale",
            table: {
              headers: ["Points", "Letter", "Description"],
              rows: [
                ["91 – 100", "A", "Excellent"],
                ["81 – 90", "B", "Very Good"],
                ["71 – 80", "C", "Good"],
                ["61 – 70", "D", "Satisfactory"],
                ["51 – 60", "E", "Sufficient"],
                ["50 and below", "F", "Fail"],
              ],
            },
          },
        ],
      },
      lmsGuidelines: {
        eyebrow: "Students",
        title: "LMS Guidelines",
        subtitle: "AzTU's digital learning ecosystem and how to use it.",
        breadcrumb: "LMS Guidelines",
        intro:
          "The Learning Management System (LMS) at AzTU is a digital platform for distributing course materials, evaluating assignments, and supporting communication between teachers and students. The system was implemented with KOICA's support and is integrated into all academic activities of the university.",
        guidelinesTitle: "Official User Guidelines",
        guidelinesPdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/LMS_Telimat.pdf",
        staffTitle: "System support and staff",
        staffDescription:
          "Operation of the LMS is ensured by certified staff. They provide technical support to students and lecturers, run trainings on the system, and oversee the security of all data submitted to it.",
        staffListTitle: "Trained Staff",
        staffPdfUrl:
          "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/9-2025/LMS_Heyet.pdf",
      },
    },
    research: {
      priorities: {
        eyebrow: "Research",
        title: "Priority Research Areas",
        subtitle: "AzTU's strategic scientific goals.",
        breadcrumb: "Research Priorities",
        description:
          "AzTU's research strategy is built around five core directions: AI & cybersecurity, energy and transport technologies, advanced materials and mechatronics, aerospace and telecommunications, and sustainable cities and environmental solutions.",
        items: [
          {
            title: "1. Data Analytics, AI, and Cybersecurity",
            content:
              "Research focused on artificial intelligence, machine learning, big-data analytics and cybersecurity to deliver solutions for modern technological challenges.",
          },
          {
            title: "2. Energy, Transport, and Environmental Technologies",
            content:
              "Sustainable energy production, efficient transport systems, and climate adaptation technologies are at the core of this direction.",
          },
          {
            title: "3. Advanced Materials and Mechatronics",
            content:
              "Next-generation materials, robotics, precision manufacturing and automation systems developed for industrial and defense needs.",
          },
          {
            title: "4. Space, Aerospace and Telecommunication Systems",
            content:
              "Satellite technology, radio engineering, aviation and modern telecom solutions developed through international partnerships.",
          },
          {
            title: "5. Sustainable Cities and Environmental Solutions",
            content:
              "Infrastructure, circular economy, water and waste management, sustainable construction and green-city innovation.",
          },
        ],
      },
      researchProjects: {
        eyebrow: "Research",
        title: "Research Projects",
        subtitle: "Ongoing and completed research and innovation projects at AzTU.",
        breadcrumb: "Research Projects",
        description:
          "This page presents the list of research projects carried out by our university across different fields, including their leaders, durations, and key outcomes.",
        projects: [],
        projectDetails: {
          leader: "Project leader",
          duration: "Duration",
          team: "Team",
          link: "View project",
        },
      },
      internalGrants: {
        eyebrow: "Research",
        title: "Internal Grant Programs",
        subtitle: "Research funded by AzTU's internal financing schemes.",
        breadcrumb: "Internal Grants",
      },
      seminarsAndTrainings: {
        eyebrow: "Research",
        title: "Seminars and Trainings",
        subtitle: "Academic and scientific development through seminars, schools and training programs.",
        breadcrumb: "Seminars and Trainings",
      },
    },
  },

  footer: {
    contactTitle: "Contact",
    defaultAddress: "Address: 25 H. Javid Avenue, Baku, Azerbaijan, AZ 1073.",
    copyright: (year: number) => `© ${year} Azerbaijan Technical University. All rights reserved.`,
    quickLinks: [
      { label: "e-Library" },
      { label: "Rankings" },
      { label: "Admission" },
    ],
    columns: [
      {
        title: "About",
        links: [
          { label: "University History", url: "/about/history" },
          { label: "Rector's Message", url: "/about/rector" },
          { label: "Honorary Graduates", url: "/about/honorary-graduates" },
        ],
      },
    ],
  },

  chatbot: {
    title: "AzTU Assistant",
    welcome_message: "Hello! I am the official digital assistant of AzTU. I am ready to answer your questions about the university.",
  },
};

export default en;