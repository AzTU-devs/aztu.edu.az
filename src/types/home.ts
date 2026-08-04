/** One home-page metric, already resolved to a single language by the API. */
export interface HomeMetric {
    /** Numeric part as a string — "801", "10000". Animated in the numbers group. */
    value: string;
    /** Trailing decoration — "+", "" — appended after the value/animated count. */
    suffix: string;
    /** Short caption, e.g. "QS Reytinqi" / "Fakültə". */
    label: string;
    /** Second line under the label — used by the "numbers" group only. */
    sublabel?: string;
}

/** The home page's CMS payload: two ordered metric lists. */
export interface HomePage {
    page_key: string;
    is_active: boolean;
    /** Hero rail stats — QS / THE / GreenMetric / Accreditation, in order. */
    hero_metrics: HomeMetric[];
    /** Count-up figures in the stats section, in order. */
    number_metrics: HomeMetric[];
}
