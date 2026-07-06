// Study plan (curriculum) types for foreign-language taught programmes.
// Course names are stored in the language of instruction (en | ru);
// surrounding UI chrome is localised separately via the site locale (az | en).

export type StudyPlanLanguage = "en" | "ru";

export type StudyPlanTerm = "fall" | "spring";

export interface StudyPlanCourse {
  /** Course code, e.g. "İF-40200y". Empty for practice/experience rows. */
  code: string;
  /** Course name in the language of instruction. */
  name: string;
  /** Credits (ECTS). null when the source leaves it blank (alternative selective option). */
  credits: number | null;
  /** True when the course belongs to a selective (elective) group. */
  selective?: boolean;
}

export interface StudyPlanSemester {
  /** Academic year, 1–4. */
  year: number;
  /** Fall or spring term. */
  term: StudyPlanTerm;
  /** Absolute semester number, 1–8. */
  semester: number;
  /** Stated total credits for the semester (usually 30). */
  totalCredits: number;
  courses: StudyPlanCourse[];
}

export interface StudyPlan {
  /** Unique id, `${slug}-${language}` — matches the route segment. */
  id: string;
  /** Programme slug, shared across languages and the Discover Programs table. */
  slug: string;
  /** Official programme code, e.g. "050620". */
  code: string;
  /** Programme name in the language of instruction. */
  program: string;
  /** Faculty name in the language of instruction. */
  faculty: string;
  language: StudyPlanLanguage;
  /** Stated total credits for the whole programme (240). */
  totalCredits: number;
  semesters: StudyPlanSemester[];
}
