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

/** One vice-rector card, with its own "see profile" detail copy. */
export interface AboutPerson {
    name: string | null;
    /** Family name — the former-rectors page and a partner institution's director. */
    surname: string | null;
    /** "Doctor of Technical Sciences, Professor". */
    degree: string | null;
    /** "Vice-Rector for Academic Affairs". */
    position: string | null;
    email: string | null;
    phone: string | null;
    /** Optional internal extension. */
    phone_code: string | null;
    /** Portrait — an absolute URL or a stored path. */
    image_url: string | null;
    /** The long profile — rich text. */
    bio: string | null;
}

/** One button in the "More in this section" block. */
export interface AboutLink {
    url: string | null;
    label: string | null;
}

/** A heading that groups documents on a regulatory-documents page. */
export interface AboutDocCategory {
    category_key: string;
    name: string | null;
}

/** The publishing organization a document belongs to — its logo and name are
 *  shown on the document card. */
export interface AboutDocOrganization {
    organization_key: string;
    /** Logo — an absolute URL or a stored path (resolve with getImageUrl). */
    logo_url: string | null;
    name: string | null;
}

/** One downloadable document card. The file is per-language — the API has
 *  already resolved `file_url` to the requested language's file. */
export interface AboutDocument {
    /** Stable id — used to attribute a public view increment. */
    id: number;
    /** Links the card to a doc_categories entry; null = uncategorised. */
    category_key: string | null;
    /** Links the card to a doc_organizations entry; null = none. */
    organization_key: string | null;
    /** Admin-only metric — never displayed on the public page. */
    view_count: number;
    name: string | null;
    /** The language-specific file — an absolute URL or a stored path. */
    file_url: string | null;
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

    // ── Rector template ─────────────────────────────────────────────────
    /** Portrait — an uploaded file's path or a pasted URL. */
    image_url: string | null;
    /** Language-neutral hero fact, e.g. "30+ Years". */
    experience: string | null;
    email: string | null;
    /** Hero stat value, per language — "Texniki elmlər". */
    degree: string | null;
    /** Hero stat value, per language — "Professor". */
    position: string | null;
    /** The rector's message — rich text. */
    message: string | null;
    /** "About the rector" biography — rich text. */
    about: string | null;

    // ── Vice-rector template ────────────────────────────────────────────
    /** Comma/·-separated category line for the hero. */
    domains: string | null;
    /** The page's second heading ("Executive Leadership"). */
    section_title: string | null;
    /** The rich-text paragraph under it. */
    section_body: string | null;

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
    /** Portrait gallery — absolute image URLs, in display order. */
    images: string[];
    /** Vice-rector cards, in display order. */
    persons: AboutPerson[];
    /** Category headings for a regulatory-documents page (empty for a flat list). */
    doc_categories: AboutDocCategory[];
    /** Publishing organizations referenced by the documents (empty if none). */
    doc_organizations: AboutDocOrganization[];
    /** Downloadable document cards, each with a per-language file. */
    documents: AboutDocument[];
}
