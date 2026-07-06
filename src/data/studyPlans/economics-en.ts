import type { StudyPlan, StudyPlanCourse, StudyPlanSemester } from "@/types/studyPlan";

// Faculty of Industrial Economics and Management — English-taught programmes.
// Semesters 1 and 2 are shared across all four programmes.

const FACULTY = "Industrial Economics and Management";

const SEM1: StudyPlanSemester = {
  year: 1,
  term: "fall",
  semester: 1,
  totalCredits: 30,
  courses: [
    { code: "ÜF-1306y", name: "Business and Academic Communication in Azerbaijani Language", credits: 4 },
    { code: "ÜF-2528y", name: "Business and Academic Communication in Foreign Language-1", credits: 7 },
    { code: "ÜFS-1304y", name: "Constitution of The Republic of Azerbaijan and Fundamentals of Law", credits: 3, selective: true },
    { code: "ÜFS-1303y", name: "Philosophy", credits: 3, selective: true },
    { code: "ÜFS-1308y", name: "Sociology", credits: 3, selective: true },
    { code: "ÜFS-1713y", name: "Logic", credits: null, selective: true },
    { code: "ÜFS-1310y", name: "Ethics", credits: null, selective: true },
    { code: "ÜFS-1301y", name: "Introduction to Multiculturalism", credits: null, selective: true },
    { code: "İF-40100y", name: "Linear Algebra and Mathematical Analysis", credits: 8 },
    { code: "İF-3184y", name: "ICT - Basic Computer Knowledge", credits: 8 },
  ],
};

const SEM2: StudyPlanSemester = {
  year: 1,
  term: "spring",
  semester: 2,
  totalCredits: 30,
  courses: [
    { code: "ÜF-1302y", name: "History of Azerbaijan", credits: 5 },
    { code: "ÜF-2529y", name: "Business and Academic Communication in Foreign Language-2", credits: 8 },
    { code: "İF-2602y", name: "Introduction to Economics", credits: 6 },
    { code: "İF-40101y", name: "Probability Theory and Mathematical Statistics", credits: 8 },
    { code: "İF-3061y", name: "Civil Defense", credits: 3 },
  ],
};

const SEM4_SELECTIVES: StudyPlanCourse[] = [
  { code: "ÜFS-3173y", name: "Information Technologies (Specialization)", credits: 3, selective: true },
  { code: "ÜFS-17112y", name: "Information Management", credits: 3, selective: true },
  { code: "ÜFS-2701y", name: "Basics of Entrepreneurship and Introduction to Business", credits: 3, selective: true },
  { code: "ÜFS-1307y", name: "Political Science", credits: 3, selective: true },
];

const businessManagement: StudyPlan = {
  id: "business-management-en",
  slug: "business-management",
  code: "6004002",
  program: "Business Management",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    SEM1,
    SEM2,
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "İF-2603y", name: "Microeconomy", credits: 10 },
        { code: "İF-2605y", name: "Statistics", credits: 10 },
        { code: "İF-2749y", name: "Basics of Business", credits: 6 },
        { code: "İF-2667y", name: "Human Resource Management", credits: 4 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        ...SEM4_SELECTIVES,
        { code: "İF-2604y", name: "Macroeconomics", credits: 10 },
        { code: "İF-2718y", name: "Marketing", credits: 6 },
        { code: "İFS-2632y", name: "Business Process Automation (BPA)", credits: 6 },
        { code: "İFS-2725y", name: "Firm Economics", credits: 6 },
        { code: "TC-2766y", name: "Career Planning", credits: 5 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2607y", name: "Econometrics", credits: 10 },
        { code: "İF-2609y", name: "Management", credits: 7 },
        { code: "İF-2791y", name: "Business Strategy", credits: 4 },
        { code: "TC-2767y", name: "Soft Skills", credits: 9 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2790y", name: "Organizational Behavior", credits: 4 },
        { code: "İF-2649y", name: "Operations Management", credits: 4 },
        { code: "İF-2792y", name: "International Business", credits: 6 },
        { code: "İF-2666y", name: "Project Management", credits: 6 },
        { code: "TC-2768y", name: "Hard Skills", credits: 10 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2703y", name: "Financial Accounting", credits: 6 },
        { code: "İF-2650y", name: "Strategic Management", credits: 6 },
        { code: "İFS-2636y", name: "Data Analytics", credits: 6 },
        { code: "İFS-2649y", name: "Sustainability and Corporate Social Responsibility (CSR)", credits: 6 },
        { code: "İFS-2657y", name: "Financial Management", credits: 6, selective: true },
        { code: "İFS-2653y", name: "Innovation and Competitive Advantage", credits: 6, selective: true },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [
        { code: "İF-2756y", name: "Digital Marketing", credits: 6 },
        { code: "İFS-2648y", name: "Sustainable Development Goals (SDGs)", credits: 6 },
        { code: "İFS-2667y", name: "Entrepreneurship and Innovation Management", credits: 6 },
        { code: "İFS-2631y", name: "Business Law", credits: 6, selective: true },
        { code: "İFS-2714y", name: "Business Analytics and Risk Management", credits: 6, selective: true },
        { code: "", name: "Production Experience / Project", credits: 6 },
      ],
    },
  ],
};

const economics: StudyPlan = {
  id: "economics-en",
  slug: "economics",
  code: "6004004",
  program: "Economics",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    SEM1,
    SEM2,
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "İF-2603y", name: "Microeconomy", credits: 10 },
        { code: "İF-2605y", name: "Statistics", credits: 10 },
        { code: "İF-2614y", name: "Environmental Economics", credits: 6 },
        { code: "İF-2615y", name: "History of Economic Thought", credits: 4 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        ...SEM4_SELECTIVES,
        { code: "İF-2604y", name: "Macroeconomics", credits: 10 },
        { code: "İF-2610y", name: "Social Sphere Economics", credits: 6 },
        { code: "İF-2612y", name: "Economy of Azerbaijan", credits: 6 },
        { code: "TC-2766y", name: "Career Planning", credits: 5 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2607y", name: "Econometrics", credits: 10 },
        { code: "İF-2609y", name: "Management", credits: 7 },
        { code: "İF-2611y", name: "Development Economics", credits: 4 },
        { code: "TC-2767y", name: "Soft Skills", credits: 9 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2702y", name: "International Economy", credits: 4 },
        { code: "İF-2613y", name: "Digital Economy (Field Economy)", credits: 6 },
        { code: "İF-2616y", name: "Labor Economics", credits: 4 },
        { code: "İF-2666y", name: "Project Management", credits: 6 },
        { code: "TC-2768y", name: "Hard Skills", credits: 10 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2650y", name: "Strategic Management", credits: 6 },
        { code: "İFS-2636y", name: "Data Analytics", credits: 6 },
        { code: "İFS-2649y", name: "Sustainability and Corporate Social Responsibility (CSR)", credits: 6 },
        { code: "İFS-2662y", name: "Resource Economics", credits: 6, selective: true },
        { code: "İFS-2728y", name: "Knowledge Economy", credits: 6, selective: true },
        { code: "İFS-2669y", name: "Health Economics", credits: 6, selective: true },
        { code: "İFS-2740y", name: "Digital Payments and Electronic Banking", credits: 6, selective: true },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [
        { code: "İF-2756y", name: "Digital Marketing", credits: 6 },
        { code: "İFS-2648y", name: "Sustainable Development Goals (SDGs)", credits: 6 },
        { code: "İFS-2667y", name: "Entrepreneurship and Innovation Management", credits: 6 },
        { code: "İFS-2617y", name: "Agricultural Economics", credits: 6, selective: true },
        { code: "İFS-2623y", name: "Behavioral Economics", credits: 6, selective: true },
        { code: "", name: "Production Experience / Project", credits: 6 },
      ],
    },
  ],
};

const finance: StudyPlan = {
  id: "finance-en",
  slug: "finance",
  code: "6004005",
  program: "Finance",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    SEM1,
    SEM2,
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "İF-2603y", name: "Microeconomy", credits: 10 },
        { code: "İF-2605y", name: "Statistics", credits: 10 },
        { code: "İF-2709y", name: "Public Finance", credits: 6 },
        { code: "İF-2671y", name: "Taxation", credits: 4 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        ...SEM4_SELECTIVES,
        { code: "İF-2604y", name: "Macroeconomics", credits: 10 },
        { code: "İF-2738y", name: "Corporate Finance", credits: 6 },
        { code: "İF-2654y", name: "Investment Management", credits: 6 },
        { code: "TC-2766y", name: "Career Planning", credits: 5 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2607y", name: "Econometrics", credits: 10 },
        { code: "İF-2609y", name: "Management", credits: 7 },
        { code: "İF-2655y", name: "Financial Markets", credits: 4 },
        { code: "TC-2767y", name: "Soft Skills", credits: 9 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2658y", name: "Financial Risk Management", credits: 4 },
        { code: "İF-2657y", name: "Financial Management", credits: 4 },
        { code: "İF-2666y", name: "Project Management", credits: 6 },
        { code: "İFS-2705y", name: "Cost Management", credits: 6, selective: true },
        { code: "İFS-2704y", name: "Financial Reporting", credits: 6, selective: true },
        { code: "TC-2768y", name: "Hard Skills", credits: 10 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2703y", name: "Financial Accounting", credits: 6 },
        { code: "İF-2650y", name: "Strategic Management", credits: 6 },
        { code: "İFS-2636y", name: "Data Analytics", credits: 6 },
        { code: "İFS-2649y", name: "Sustainability and Corporate Social Responsibility (CSR)", credits: 6 },
        { code: "İFS-2634y", name: "Budgeting System", credits: 6, selective: true },
        { code: "İFS-2670y", name: "Mergers, Acquisitions and Private Equity", credits: 6, selective: true },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [
        { code: "İF-2756y", name: "Digital Marketing", credits: 6 },
        { code: "İFS-2648y", name: "Sustainable Development Goals (SDGs)", credits: 6 },
        { code: "İFS-2667y", name: "Entrepreneurship and Innovation Management", credits: 6 },
        { code: "İFS-2630y", name: "International Taxation", credits: 6, selective: true },
        { code: "İFS-2660y", name: "Portfolio Management", credits: 6, selective: true },
        { code: "", name: "Production Experience / Project", credits: 6 },
      ],
    },
  ],
};

const management: StudyPlan = {
  id: "management-en",
  slug: "management",
  code: "6004007",
  program: "Management",
  faculty: FACULTY,
  language: "en",
  totalCredits: 240,
  semesters: [
    SEM1,
    SEM2,
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "İF-2603y", name: "Microeconomy", credits: 10 },
        { code: "İF-2605y", name: "Statistics", credits: 10 },
        { code: "İF-2749y", name: "Basics of Business", credits: 6 },
        { code: "İF-2667y", name: "Human Resource Management", credits: 4 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        ...SEM4_SELECTIVES,
        { code: "İF-2604y", name: "Macroeconomics", credits: 10 },
        { code: "İF-2629y", name: "Corporate Governance", credits: 6 },
        { code: "İFS-2738y", name: "Corporate Finance", credits: 6 },
        { code: "TC-2766y", name: "Career Planning", credits: 5 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2607y", name: "Econometrics", credits: 10 },
        { code: "İF-2609y", name: "Management", credits: 7 },
        { code: "İF-2667y", name: "Quality Management", credits: 4 },
        { code: "TC-2767y", name: "Soft Skills", credits: 9 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2666y", name: "Operations Management", credits: 4 },
        { code: "İF-2651y", name: "Innovation Management", credits: 4 },
        { code: "İF-2666y", name: "Project Management", credits: 6 },
        { code: "İFS-2725y", name: "Firm Economics", credits: 6, selective: true },
        { code: "İF-2769y", name: "Supply Chain Management (SCM)", credits: 6, selective: true },
        { code: "TC-2768y", name: "Hard Skills", credits: 10 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2650y", name: "Strategic Management", credits: 6 },
        { code: "İFS-2737y", name: "Modern Management Methods", credits: 6 },
        { code: "İFS-2636y", name: "Data Analytics", credits: 6 },
        { code: "İFS-2649y", name: "Sustainability and Corporate Social Responsibility (CSR)", credits: 6 },
        { code: "İFS-2635y", name: "Labor Law", credits: 6, selective: true },
        { code: "İFS-2640y", name: "Transnational Corporations (TNCs)", credits: 6, selective: true },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [
        { code: "İF-2756y", name: "Digital Marketing", credits: 6 },
        { code: "İFS-2648y", name: "Sustainable Development Goals (SDGs)", credits: 6 },
        { code: "İFS-2710y", name: "Leadership and Organizational Behavior", credits: 6 },
        { code: "İFS-2644y", name: "Training and Development in Human Resource Management", credits: 6, selective: true },
        { code: "İFS-2705y", name: "Cost Management", credits: 6, selective: true },
        { code: "", name: "Production Experience / Project", credits: 6 },
      ],
    },
  ],
};

export const economicsEnPlans: StudyPlan[] = [businessManagement, economics, finance, management];
