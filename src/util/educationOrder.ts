/**
 * Ordering for a person's education history: highest degree first (PhD → Bachelor).
 *
 * Every education list on the site — dean, cafedra head, structural-unit head,
 * research-institute director, office/centre head, administration director —
 * must read top-down from the most senior qualification. The API gives no
 * ordering hint (none of the education endpoints has an ORDER BY or a
 * display_order column) and the rows arrive in insertion order, which is
 * usually oldest-first. So the order is derived here, from the degree label.
 *
 * The labels are free text typed by editors, in Azerbaijani or English, and the
 * row shape differs per endpoint:
 *
 *   faculty            { degree, university, start_year: string, end_year: string }
 *   cafedra            { degree, university, start_year: number, end_year: number }
 *   department         { degree?, university?, start_year?, end_year? }
 *   research institute { degree, university, start_year: string, end_year: string | null }
 *   office / community { period, degree }          ← and some pages INVERT these,
 *                                                    putting the degree in `period`
 *   static pages       { years, degree }
 *
 * Hence: all fields optional, both `degree` and `period`/`years` are searched
 * for a degree keyword, and years are read from whichever field carries them.
 */

export interface EducationLike {
    degree?: string | null;
    /** Office & community pages — usually the date range, sometimes the degree. */
    period?: string | null;
    /** Static cafedra-head pages. */
    years?: string | null;
    year?: string | number | null;
    start_year?: string | number | null;
    end_year?: string | number | null;
}

/**
 * Seniority ladder. Higher sorts first.
 *
 * PROFESSOR sits above DSC because it is conferred after it; an *awarded*
 * doctorate outranks one still *in progress*; anything with no recognisable
 * degree word (a language course, a research visit, secondary school) sinks to
 * the bottom rather than floating on a year tie-break.
 */
export const DEGREE_RANK = {
    PROFESSOR: 7,
    /** Elmlər doktoru / Doctor of Sciences (DSc). */
    DOCTOR_OF_SCIENCES: 6,
    /** Fəlsəfə doktoru / elmlər namizədi / PhD — awarded. */
    PHD: 5,
    /** Doktorantura / dissertantura / aspirantura / MPhil — doctoral study. */
    DOCTORAL_STUDIES: 4,
    MASTER: 3,
    BACHELOR: 2,
    /** Completed higher education with no degree word (specialist, engineer). */
    HIGHER_EDUCATION: 1,
    /** Non-degree: language courses, research visits, secondary school. */
    NONE: 0,
} as const;

/**
 * Normalises a label for matching. Azerbaijani diacritics must survive, so this
 * only lowercases and folds the curly apostrophe (the EN locale writes
 * "Master’s" with U+2019 while every other file uses a straight quote).
 */
function normalise(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "";
    return String(value).toLowerCase().replace(/[’‘`´]/g, "'");
}

const has = (haystack: string, needles: readonly string[]) =>
    needles.some((needle) => haystack.includes(needle));

/* Order matters: the first block that matches wins, so the most specific and
   most senior patterns are tested first. "Fəlsəfə doktoru" has to be caught
   before the bare "doktoru", or every PhD would be promoted to DSc. */

const PROFESSOR = ["professor"];
/** …but not when it is the *associate* professorship, which is a title that
    routinely shares a string with the PhD that earned it. */
const NOT_PROFESSOR = ["associate professor", "dosent", "dosenti", "assistant professor"];

const PHD_AWARDED = [
    "fəlsəfə doktoru",
    "felsefe doktoru",
    "doctor of philosophy",
    "ph.d",
    "phd",
    "namizədi",
    "namizedi",
    "candidate of",
];

const DOCTOR_OF_SCIENCES = [
    "elmlər doktoru",
    "elmləri doktoru",
    "elmler doktoru",
    "doktoru",
    "doctor of sciences",
    "doctor of technical sciences",
    "doctor of medical sciences",
    "d.sc",
    "dsc",
];

const DOCTORAL_STUDIES = [
    "doktorantura",
    "doktorant",
    "dissertantura",
    "dissertant",
    "aspirantura",
    "doctoral studies",
    "doctoral candidate",
    "postgraduate studies",
    "m.phil",
    "mphil",
];

const MASTER = ["magistr", "magistratura", "master", "m.sc", "msc", "mba"];

const BACHELOR = ["bakalavr", "bakalavriat", "bachelor", "b.sc", "bsc", "lisans"];

const HIGHER_EDUCATION = [
    "mühəndis",
    "muhendis",
    "engineer",
    "ali təhsil",
    "ali tehsil",
    "higher education",
    "ixtisas",
    "specialty",
    "tibb",
    "medicine",
    "universitet",
    "university",
    "institut",
];

/** Explicitly not a qualification — checked before the generic institution test. */
const NON_DEGREE = [
    "elmi araşdırma",
    "elmi arasdirma",
    "scientific research",
    "dinləyici",
    "dinleyici",
    "language studies",
    "orta məktəb",
    "orta mekteb",
    "secondary school",
];

/**
 * Highest degree mentioned across the given labels.
 *
 * Combined labels resolve upward: "Bakalavr + magistr" and "Bachelor's and
 * Master's degrees" both rank as MASTER, because master is tested first.
 */
export function degreeRank(...labels: (string | number | null | undefined)[]): number {
    const text = labels.map(normalise).filter(Boolean).join(" | ");
    if (!text) return DEGREE_RANK.NONE;

    if (has(text, PROFESSOR) && !has(text, NOT_PROFESSOR)) return DEGREE_RANK.PROFESSOR;
    if (has(text, PHD_AWARDED)) return DEGREE_RANK.PHD;
    if (has(text, DOCTOR_OF_SCIENCES)) return DEGREE_RANK.DOCTOR_OF_SCIENCES;
    if (has(text, DOCTORAL_STUDIES)) return DEGREE_RANK.DOCTORAL_STUDIES;
    if (has(text, MASTER)) return DEGREE_RANK.MASTER;
    if (has(text, BACHELOR)) return DEGREE_RANK.BACHELOR;
    if (has(text, NON_DEGREE)) return DEGREE_RANK.NONE;
    if (has(text, HIGHER_EDUCATION)) return DEGREE_RANK.HIGHER_EDUCATION;
    return DEGREE_RANK.NONE;
}

/**
 * Year used to break ties inside one rank — the latest four-digit year the row
 * mentions, wherever it is stored. Rows still in progress ("2026–…",
 * "Hazırda", "Present") keep their start year rather than dropping to 0.
 */
export function educationYear(edu: EducationLike): number {
    const explicit = [edu.end_year, edu.start_year, edu.year];
    for (const candidate of explicit) {
        const parsed = parseInt(String(candidate ?? ""), 10);
        if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }

    const scanned = `${edu.period ?? ""} ${edu.years ?? ""} ${edu.degree ?? ""}`.match(/\d{4}/g);
    if (scanned) return Math.max(...scanned.map(Number));

    return 0;
}

/**
 * "2012 – 2016", or a bare "2016" when only one end of the range is recorded.
 * Falls back to the legacy single `year` field.
 */
export function formatEducationYears(edu: EducationLike): string {
    const range = [edu.start_year, edu.end_year]
        .map((value) => (value === null || value === undefined ? "" : String(value).trim()))
        .filter(Boolean);
    if (range.length > 0) return range.join(" – ");
    return edu.year === null || edu.year === undefined ? "" : String(edu.year).trim();
}

/**
 * Highest degree first, then most recent first. Non-mutating; ties keep source
 * order (Array#sort is stable), so rows the editor deliberately grouped stay
 * grouped.
 */
export function sortEducations<T extends EducationLike>(
    items: readonly T[] | null | undefined
): T[] {
    if (!Array.isArray(items)) return [];
    return [...items].sort((a, b) => {
        const rankDelta = degreeRank(b.degree, b.period, b.years) - degreeRank(a.degree, a.period, a.years);
        if (rankDelta !== 0) return rankDelta;
        return educationYear(b) - educationYear(a);
    });
}
