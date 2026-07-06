import type { StudyPlan } from "@/types/studyPlan";

// Faculty of Information Technologies and Telecommunication — English-taught programmes.

const FACULTY = "Information Technologies and Telecommunication";

const computerEngineering: StudyPlan = {
  id: "computer-engineering-en",
  slug: "computer-engineering",
  code: "050620",
  program: "Computer Engineering",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
        { code: "ÜF-2518y", name: "Business and Academic Communication in Foreign Language-1", credits: 4 },
        { code: "İF-40102y", name: "Linear Algebra and Analytic Geometry", credits: 3 },
        { code: "İF-40125y", name: "Discrete Mathematics", credits: 3 },
        { code: "İF-31113y", name: "Fundamentals of Computer Engineering", credits: 8 },
        { code: "İF-40200y", name: "Fundamentals of Programming", credits: 8 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "History of Azerbaijan", credits: 5 },
        { code: "ÜF-2519y", name: "Business and Academic Communication in Foreign Language-2", credits: 4 },
        { code: "İF-40197y", name: "Mathematical Analysis", credits: 7 },
        { code: "İF-2425y", name: "Physics", credits: 5 },
        { code: "İF-31114y", name: "Computer Graphics", credits: 5 },
        { code: "İFS-40213yn", name: "Web Programming (Front-End)", credits: 4 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Business and Academic Communication in Foreign Language-3", credits: 4 },
        { code: "İF-40124y", name: "Differential Equations", credits: 3 },
        { code: "İF-31115y", name: "Operating Systems", credits: 8 },
        { code: "İF-3192y", name: "Architecture of Computers", credits: 8 },
        { code: "İFS-40212yn", name: "Microprocessor Based System Projects", credits: 4 },
        { code: "ÜFS-1303y", name: "Philosophy", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Sociology", credits: 3, selective: true },
        { code: "ÜFS-1304y", name: "Constitution of The Republic of Azerbaijan and Fundamentals of Law", credits: 3, selective: true },
        { code: "ÜFS-1713y", name: "Logic", credits: 3, selective: true },
        { code: "ÜFS-1305y", name: "Ethics and Aesthetics", credits: 3, selective: true },
        { code: "ÜFS-1301y", name: "Introduction to Multiculturalism", credits: 3, selective: true },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Business and Academic Communication in Foreign Language-4", credits: 3 },
        { code: "İF-40126y", name: "Probability Theory and Mathematical Statistics", credits: 3 },
        { code: "İF-40201y", name: "Data Structure and Algorithms", credits: 6 },
        { code: "İF-3196y", name: "Computer Networks", credits: 8 },
        { code: "İF-21107y", name: "Circuit Theory", credits: 7 },
        { code: "İF-4153y", name: "Civil Defense", credits: 3 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-40131y", name: "Database Systems", credits: 7 },
        { code: "İF-1861y", name: "Basics of Electronics", credits: 6 },
        { code: "İF-31119y", name: "Security of Computer Systems", credits: 8 },
        { code: "İFS-40203yn", name: "Technical Foreign Language (Introducing Computing and IT)", credits: 7 },
        { code: "ÜFS-40213y", name: "Information Technologies (Specialization)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Information Management", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Entrepreneurship Basics and Introduction to Business", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Political Science", credits: 3, selective: true },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-31118y", name: "Digital Systems", credits: 7 },
        { code: "İFS-40206yn", name: "Internet and Web Programming", credits: 6 },
        { code: "İFS-40207yn", name: "Data Engineering", credits: 6 },
        { code: "İFS-40208yn", name: "Machine Learning", credits: 6 },
        { code: "İFS-40211yn", name: "Network Management", credits: 5 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-40202y", name: "Computer Modeling", credits: 7 },
        { code: "İFS-40204yn", name: "IoT (Internet of Things) Systems", credits: 6 },
        { code: "İFS-40205yn", name: "Introduction to Fuzzy Logic", credits: 6 },
        { code: "İFS-40209yn", name: "Deep Learning", credits: 6 },
        { code: "İFS-40210yn", name: "Architecting Cloud Solutions", credits: 5 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Experience", credits: 30 }],
    },
  ],
};

const computerSciences: StudyPlan = {
  id: "computer-sciences-en",
  slug: "computer-sciences",
  code: "050509",
  program: "Computer Sciences",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
        { code: "ÜF-2518y", name: "Business and Academic Communication in Foreign Language-1", credits: 4 },
        { code: "İF-40162y", name: "Mathematical Analysis-1", credits: 7 },
        { code: "İF-40166y", name: "Linear Algebra", credits: 4 },
        { code: "İF-40172y", name: "Basics of Programming-1", credits: 8 },
        { code: "İF-2472y", name: "Physics", credits: 3 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "History of Azerbaijan", credits: 5 },
        { code: "ÜF-2519y", name: "Business and Academic Communication in Foreign Language-2", credits: 4 },
        { code: "İF-40163y", name: "Mathematical Analysis-2", credits: 5 },
        { code: "İF-40173y", name: "Basics of Programming-2", credits: 6 },
        { code: "İF-31169y", name: "Computer Architecture", credits: 5 },
        { code: "İF-40236y", name: "Operating Systems", credits: 5 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Business and Academic Communication in Foreign Language-3", credits: 4 },
        { code: "ÜFS-40213y", name: "Information Technologies (Specialization)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Information Management", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Entrepreneurship Basics and Introduction to Business", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Political Science", credits: 3, selective: true },
        { code: "İF-40165y", name: "Analytic Geometry", credits: 4 },
        { code: "İF-40169y", name: "Numerical Methods-1", credits: 6 },
        { code: "İF-40174y", name: "Algorithm Analysis and Preparation Methods", credits: 8 },
        { code: "İF-40175y", name: "Programming Technologies", credits: 5 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Business and Academic Communication in Foreign Language-4", credits: 3 },
        { code: "İF-40167y", name: "Discrete Mathematics", credits: 6 },
        { code: "İF-40168y", name: "Differential Equations", credits: 6 },
        { code: "İF-40170y", name: "Numerical Methods-2", credits: 3 },
        { code: "İF-31116y", name: "Computer Networks", credits: 6 },
        { code: "İFS-31113yn", name: "Graph Theory", credits: 6, selective: true },
        { code: "İFS-31116yn", name: "Elements of The Theory of Integral Transformations", credits: 6, selective: true },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "ÜFS-1303y", name: "Philosophy", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Sociology", credits: 3, selective: true },
        { code: "ÜFS-1304y", name: "Constitution of the Republic of Azerbaijan and Fundamentals of Law", credits: 3, selective: true },
        { code: "ÜFS-1713y", name: "Logic", credits: 3, selective: true },
        { code: "ÜFS-1305y", name: "Ethics and Aesthetics", credits: 3, selective: true },
        { code: "ÜFS-1301y", name: "Introduction to Multiculturalism", credits: 3, selective: true },
        { code: "İF-40118y", name: "Probability Theory and Mathematical Statistics", credits: 4 },
        { code: "İF-40176y", name: "Database", credits: 5 },
        { code: "İFS-31111yn", name: "Statistical Learning", credits: 6 },
        { code: "İFS-31112yn", name: "Number Theory", credits: 6 },
        { code: "İFS-31104yn", name: "Technical Foreign Language (Introducing Computing and IT)", credits: 6 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-40171y", name: "Optimization Methods", credits: 5 },
        { code: "İF-40178y", name: "Artificial Intelligence", credits: 4 },
        { code: "İF-4153y", name: "Civil Defense", credits: 3 },
        { code: "İFS-31107yn", name: "Internet and Web Programming", credits: 6 },
        { code: "İFS-31108yn", name: "Data Engineering", credits: 6 },
        { code: "İFS-31109yn", name: "Machine Learning", credits: 6 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-40164y", name: "Comprehensive Analysis", credits: 4 },
        { code: "İF-31170y", name: "Web Technologies", credits: 4 },
        { code: "İF-40177y", name: "Parallel and Distributed Computing", credits: 4 },
        { code: "İFS-31105yn", name: "IoT (Internet of Things) Systems", credits: 6 },
        { code: "İFS-31106yn", name: "Introduction to Fuzzy Logic", credits: 6 },
        { code: "İFS-31110yn", name: "Deep Learning", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Experience", credits: 30 }],
    },
  ],
};

const informationSecurity: StudyPlan = {
  id: "information-security-en",
  slug: "information-security",
  code: "050615",
  program: "Information Security",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "History of Azerbaijan", credits: 5 },
        { code: "ÜF-2518y", name: "Business and Academic Communication in Foreign Language-1", credits: 4 },
        { code: "İF-17121y", name: "Mathematical Analysis", credits: 6 },
        { code: "İF-2203y", name: "Fundamentals of Information Security", credits: 6 },
        { code: "İF-2204y", name: "Fundamentals of Programming", credits: 6 },
        { code: "ÜFS-1310y", name: "Psychology", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Sociology", credits: 3, selective: true },
        { code: "ÜFS-1309y", name: "Fundamentals of Law", credits: 3, selective: true },
        { code: "ÜFS-1311y", name: "Engineering Ethics", credits: 3, selective: true },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
        { code: "ÜF-2519y", name: "Business and Academic Communication in Foreign Language-2", credits: 4 },
        { code: "İF-1720y", name: "Linear Algebra", credits: 6 },
        { code: "İF-2250y", name: "Basics of Networks", credits: 6 },
        { code: "İF-2201y", name: "The Basics of Cyber Security", credits: 6 },
        { code: "İFS-2220yn", name: "Web Programming (Front-End)", credits: 4 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Business and Academic Communication in Foreign Language-3", credits: 4 },
        { code: "İF-17122y", name: "Discrete Mathematics", credits: 5 },
        { code: "İF-2202y", name: "Security of Networks", credits: 5 },
        { code: "İF-2206y", name: "Operating Systems", credits: 5 },
        { code: "İFS-2225yn", name: "Python for Cyber Security", credits: 5 },
        { code: "İFS-2226yn", name: "Algorithms and Data Structures", credits: 6 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Business and Academic Communication in Foreign Language-4", credits: 3 },
        { code: "İF-17123y", name: "Probability Theory", credits: 5 },
        { code: "İF-2205y", name: "Web Security", credits: 5 },
        { code: "İF-2208y", name: "Legal Aspects of Information Security and Cyber Security", credits: 5 },
        { code: "İFS-2218yn", name: "Industrial Internet of Things (IIoT)", credits: 6 },
        { code: "İFS-2223yn", name: "IT Project Management", credits: 6 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2207y", name: "Information Security Management Systems", credits: 5 },
        { code: "İF-2209y", name: "Security of Databases", credits: 5 },
        { code: "İF-2210y", name: "Cloud Security", credits: 5 },
        { code: "İF-4153y", name: "Civil Defense", credits: 3 },
        { code: "İFS-2217yn", name: "Technical Foreign Language (Cyber Security Fundamentals)", credits: 6 },
        { code: "İFS-2222yn", name: "Java Programming Language", credits: 6 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2211y", name: "Fundamentals of Cryptography", credits: 5 },
        { code: "İF-2212y", name: "Fundamentals of Penetration Testing", credits: 8 },
        { code: "İF-2213y", name: "Fundamentals of Electronics and IoT Security", credits: 5 },
        { code: "İFS-2221yn", name: "Data Analytics", credits: 5 },
        { code: "İFS-2224yn", name: "Mobile Programming", credits: 4 },
        { code: "ÜFS-2701y", name: "Fundamentals of Entrepreneurship and Introduction to Business", credits: 3, selective: true },
        { code: "ÜFS-1312y", name: "Critical Thinking", credits: 3, selective: true },
        { code: "ÜFS-1313y", name: "Education and Career Planning", credits: 3, selective: true },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2214y", name: "Safe Programming", credits: 5 },
        { code: "İF-2215y", name: "Fundamentals of Digital Forensics", credits: 8 },
        { code: "İF-2216y", name: "Security of Industrial Control Systems", credits: 5 },
        { code: "İFS-2219yn", name: "Machine Learning", credits: 6 },
        { code: "İFS-2227yn", name: "Malware Analysis", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Experience", credits: 30 }],
    },
  ],
};

const informationTechnologies: StudyPlan = {
  id: "information-technologies-en",
  slug: "information-technologies",
  code: "050616",
  program: "Information Technologies",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
        { code: "ÜF-2522y", name: "Business and Academic Communication in Foreign Language-1", credits: 4 },
        { code: "İF-40102y", name: "Linear Algebra and Analytic Geometry", credits: 3 },
        { code: "İF-2425y", name: "Physics", credits: 5 },
        { code: "İF-40127y", name: "Fundamentals of Information Technologies", credits: 8 },
        { code: "İF-40128y", name: "Fundamentals of Programming", credits: 6 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1418y", name: "History of Azerbaijan", credits: 5 },
        { code: "ÜF-2523y", name: "Business and Academic Communication in Foreign Language-2", credits: 4 },
        { code: "İF-40123y", name: "Mathematical Analysis", credits: 7 },
        { code: "İF-40130y", name: "Data Structure and Algorithms", credits: 7 },
        { code: "İF-3197y", name: "Web Systems and Technologies", credits: 7 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2524y", name: "Business and Academic Communication in Foreign Language-3", credits: 4 },
        { code: "İF-40124y", name: "Differential Equations", credits: 3 },
        { code: "İF-40129y", name: "Modern Programming Languages", credits: 6 },
        { code: "İF-3192y", name: "Computer Architecture", credits: 8 },
        { code: "İF-40234y", name: "Operating Systems", credits: 6 },
        { code: "ÜFS-40213y", name: "Information Technologies (Specialization)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Information Management", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Fundamentals of Entrepreneurship and Introduction to Business", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Political Science", credits: 3, selective: true },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2525y", name: "Business and Academic Communication in Foreign Language-4", credits: 3 },
        { code: "İF-40125y", name: "Discrete Mathematics", credits: 3 },
        { code: "İF-40126y", name: "Probability Theory and Mathematical Statistics", credits: 3 },
        { code: "İF-40131y", name: "Database Systems", credits: 7 },
        { code: "İF-3196y", name: "Computer Networks", credits: 8 },
        { code: "İFS-40142yn", name: "Cloud and Big Data Technologies", credits: 6 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-40132", name: "Human-computer interface", credits: 7 },
        { code: "İF-40134y", name: "IT project management", credits: 5 },
        { code: "İF-4153y", name: "Civil defense", credits: 3 },
        { code: "İFS-40135yn", name: "Technical foreign language (Introducing computing and IT)", credits: 6 },
        { code: "İFS-40144yn", name: "Database management tools and languages", credits: 6 },
        { code: "ÜFS-1419y", name: "Philosophy", credits: 3, selective: true },
        { code: "ÜFS-1425y", name: "Sociology", credits: 3, selective: true },
        { code: "ÜFS-1420y", name: "Constitution of the Republic of Azerbaijan and Fundamentals of Law", credits: 3, selective: true },
        { code: "ÜFS-40108y", name: "Logic", credits: 3, selective: true },
        { code: "ÜFS-1422y", name: "Ethics and Aesthetics", credits: 3, selective: true },
        { code: "ÜFS-1423y", name: "Introduction to Multiculturalism", credits: 3, selective: true },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-40235y", name: "Multimedia Technologies", credits: 6 },
        { code: "İF-40133y", name: "Artificial Intelligence", credits: 6 },
        { code: "İFS-40138yn", name: "Internet and Web Programming", credits: 6 },
        { code: "İFS-40139yn", name: "Data Engineering", credits: 6 },
        { code: "İFS-40140yn", name: "Machine Learning", credits: 6 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-3195y", name: "Information security", credits: 6 },
        { code: "İFS-40136yn", name: "IoT (Internet of Things) systems", credits: 6 },
        { code: "İFS-40137yn", name: "Introduction to Fuzzy Logic", credits: 6 },
        { code: "İFS-40141yn", name: "Deep learning", credits: 6 },
        { code: "İFS-40143yn", name: "Data mining for business analytics", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Experience", credits: 30 }],
    },
  ],
};

const radioTelecommunications: StudyPlan = {
  id: "radio-telecommunications-engineering-en",
  slug: "radio-telecommunications-engineering",
  code: "050636",
  program: "Radio and Telecommunications Engineering",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "History of Azerbaijan", credits: 5 },
        { code: "ÜF-2518y", name: "Business and Academic Communication in Foreign Language-1", credits: 4 },
        { code: "İF-4096y", name: "Linear Algebra and Analytic Geometry", credits: 4 },
        { code: "İF-2423y", name: "Fundamentals of Physics", credits: 6 },
        { code: "İFS-2270yn", name: "Switching Devices and Systems", credits: 8 },
        { code: "ÜFS-40213y", name: "Information Technologies (Specialization)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Information Management", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Fundamentals of Entrepreneurship and Introduction to Business", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Political Science", credits: 3, selective: true },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
        { code: "ÜF-2519y", name: "Business and Academic Communication in Foreign Language-2", credits: 4 },
        { code: "İF-4097y", name: "Mathematical Analysis-1", credits: 4 },
        { code: "İF-2428y", name: "Applied Physics", credits: 6 },
        { code: "İF-3191y", name: "Computer Technologies and Programming", credits: 8 },
        { code: "İFS-2265yn", name: "International Radio Communication and Radio Exchange", credits: 4 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Business and Academic Communication in Foreign Language-3", credits: 4 },
        { code: "İF-4098y", name: "Mathematical Analysis-2", credits: 4 },
        { code: "İF-3940y", name: "Engineering Graphics and Design", credits: 6 },
        { code: "İF-21106y", name: "Basics of Electric Circuits", credits: 7 },
        { code: "İF-2158y", name: "Electrical Measurements and Tools", credits: 6 },
        { code: "İFS-2266yn", name: "Big Data in Telecommunications", credits: 3 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Business and Academic Communication in Foreign Language-4", credits: 3 },
        { code: "İF-4099y", name: "Applied Mathematics", credits: 4 },
        { code: "İF-3029y", name: "Chemistry", credits: 5 },
        { code: "İF-2254y", name: "Electrodynamics and Propagation of Radio Waves", credits: 6 },
        { code: "İF-2160y", name: "Analog Electronics", credits: 6 },
        { code: "İFS-2271yn", name: "Digital Signal Processing", credits: 6 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-1860y", name: "Digital Electronics and Microprocessors", credits: 7 },
        { code: "İF-2258y", name: "Electrical Communication Theory", credits: 7 },
        { code: "İF-2261y", name: "Signals and Systems", credits: 7 },
        { code: "İFS-2268yn", name: "Technical Foreign Language (Optical Network Technologies in Free Space)", credits: 6 },
        { code: "ÜFS-1303y", name: "Philosophy", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Sociology", credits: 3, selective: true },
        { code: "ÜFS-1304y", name: "Constitution of The Republic of Azerbaijan and Fundamentals of Law", credits: 3, selective: true },
        { code: "ÜFS-1713y", name: "Logic", credits: 3, selective: true },
        { code: "ÜFS-1305y", name: "Ethics and Aesthetics", credits: 3, selective: true },
        { code: "ÜFS-1301y", name: "Introduction to Multiculturalism", credits: 3, selective: true },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-4153y", name: "Civil Defense", credits: 3 },
        { code: "İF-2255y", name: "Basics of Schematic Engineering", credits: 5 },
        { code: "İF-2256y", name: "Electric Food Devices", credits: 6 },
        { code: "İF-2257y", name: "Wireless Communication Technologies", credits: 6 },
        { code: "İF-2259y", name: "Telecommunication Networks and Systems", credits: 7 },
        { code: "İFS-2267yn", name: "Construction and Technology of Radio Technical Means", credits: 3 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İFS-2262yn", name: "Basics of Digital Radio Communication", credits: 7 },
        { code: "İFS-2263yn", name: "Management of GPON-Networks", credits: 8 },
        { code: "İFS-2264yn", name: "Optical Transmission Systems", credits: 8 },
        { code: "İFS-2269yn", name: "Antennas and Microwave Systems", credits: 7 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Experience", credits: 30 }],
    },
  ],
};

export const ittEnPlans: StudyPlan[] = [
  computerEngineering,
  computerSciences,
  informationSecurity,
  informationTechnologies,
  radioTelecommunications,
];
