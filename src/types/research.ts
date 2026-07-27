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
    /** Which shape this page is: priorities | patents. */
    template: string;
    slug: string | null;
    title: string | null;
    /** Rich text, shown under the H1 in the hero. */
    description: string | null;
    /** The "Strateji baxış" paragraph — rich text owned by the page. */
    body_html: string | null;
    links_title: string | null;
    /** Derived server-side from the copy above — never authored by hand. */
    seo: {
        title: string | null;
        description: string | null;
    };
    priorities: ResearchPriority[];
    links: ResearchLink[];
}
