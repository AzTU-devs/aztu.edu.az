/** One numbered priority card. */
export interface ResearchPriority {
    title: string | null;
    /** Rich text authored in the dashboard. */
    description: string | null;
}

/** One button in the "More in this section" block. */
export interface ResearchLink {
    url: string | null;
    label: string | null;
}

/** A Research editorial page, already resolved to a single language by the API. */
export interface ResearchPage {
    page_key: string;
    /** Which shape this page is: priorities | patents | seminars | journal. */
    template: string;
    slug: string | null;
    title: string | null;
    /** Rich text, shown under the H1 in the hero. */
    description: string | null;
    /** The "Strateji baxış" paragraph / "About the journal" — rich text. */
    body_html: string | null;
    links_title: string | null;

    // ── Journal template ────────────────────────────────────────────────
    /** Cover image — an absolute URL or a stored path. */
    image_url: string | null;
    issn: string | null;
    eissn: string | null;
    doi: string | null;
    publication_year: string | null;
    /** Yearly publication number ("İllik buraxılış sayı"). */
    yearly_count: string | null;
    /** The "visit journal" button target. */
    button_url: string | null;
    /** The journal's own name (distinct from the page title). */
    journal_name: string | null;
    journal_language: string | null;
    founder: string | null;
    /** The "visit journal" button label. */
    button_label: string | null;
    /** Derived server-side from the copy above — never authored by hand. */
    seo: {
        title: string | null;
        description: string | null;
    };
    priorities: ResearchPriority[];
    links: ResearchLink[];
}
