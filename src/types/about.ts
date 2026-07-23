/** One statement card — Mission, Vision or Goal. */
export interface AboutBlock {
    /** Stable key the page maps to an icon: mission | vision | goal. */
    block_key: string;
    title: string | null;
    /** Rich text authored in the dashboard. */
    body: string | null;
}

/** One year on the history timeline. Already ordered newest-first by the API. */
export interface AboutMilestone {
    /** Shown verbatim — "1950", "1887-1905", "Bu gün". */
    year: string | null;
    title: string | null;
    /** Rich text authored in the dashboard. */
    description: string | null;
}

/** One numbered card under "Strateji Sütunlar". */
export interface AboutPillar {
    title: string | null;
    /** Rich text authored in the dashboard. */
    description: string | null;
    /** Chip labels shown under the card. */
    tags: string[] | null;
}

/** A heading plus one-line entries — the corporate values and the KPIs. */
export interface AboutList {
    list_key: string;
    /** How to render the entries: bullet | number. */
    style: string;
    title: string | null;
    items: string[] | null;
}

/** One button in the "More in this section" block. */
export interface AboutLink {
    url: string | null;
    label: string | null;
}

/** An About screen, already resolved to a single language by the API. */
export interface AboutPage {
    page_key: string;
    /** Which shape this page is: statements | timeline. */
    template: string;
    slug: string | null;
    title: string | null;
    /** Rich text, shown under the H1 in the hero. */
    description: string | null;
    links_title: string | null;
    /** Text on the document download button. */
    document_label: string | null;
    /** Heading above the pillar cards. */
    pillars_title: string | null;
    /** An uploaded file's path or a pasted URL — the page treats them alike. */
    document_url: string | null;
    /** Derived server-side from the copy above — never authored by hand. */
    seo: {
        title: string | null;
        description: string | null;
    };
    blocks: AboutBlock[];
    links: AboutLink[];
    milestones: AboutMilestone[];
    pillars: AboutPillar[];
    lists: AboutList[];
}
