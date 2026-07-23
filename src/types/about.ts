/** One statement card — Mission, Vision or Goal. */
export interface AboutBlock {
    /** Stable key the page maps to an icon: mission | vision | goal. */
    block_key: string;
    title: string | null;
    /** Rich text authored in the dashboard. */
    body: string | null;
}

/** One button in the "More in this section" block. */
export interface AboutLink {
    url: string | null;
    label: string | null;
}

/** An About screen, already resolved to a single language by the API. */
export interface AboutPage {
    page_key: string;
    slug: string | null;
    title: string | null;
    /** Rich text, shown under the H1 in the hero. */
    description: string | null;
    links_title: string | null;
    /** Derived server-side from the copy above — never authored by hand. */
    seo: {
        title: string | null;
        description: string | null;
    };
    blocks: AboutBlock[];
    links: AboutLink[];
}
