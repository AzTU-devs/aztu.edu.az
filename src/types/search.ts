export type SearchDocType =
    | "news"
    | "announcement"
    | "project"
    | "collaboration"
    | "faculty"
    | "cafedra"
    | "department"
    | "employee"
    | "research_institute";

export interface SearchHit {
    id: string | number;
    type: SearchDocType;
    lang: string;
    title: string | null;
    snippet: string | null;
    url: string | null;
    image?: string | null;
    score?: number;
}

export type SearchResults = Partial<Record<SearchDocType, SearchHit[]>>;

export interface SearchResponse {
    status_code: number;
    query: string;
    lang: string;
    results: SearchResults;
    total: number;
    degraded: boolean;
}
