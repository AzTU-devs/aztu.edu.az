// --- News list item returned by /api/news/public/all ---
export interface NewsListItem {
    news_id: number;
    cateogry_id: string;
    display_order: number;
    is_active: boolean;
    title: string;
    html_content: string;
    cover_image: string;
    created_at: string;
}

export interface NewsListResponse {
    status_code: number;
    message: string;
    news: NewsListItem[];
}

// --- Gallery image inside news detail ---
export interface GalleryImage {
    image_id: number;
    image: string;
}

// --- Full news detail returned by /api/news/:id ---
export interface NewsDetail {
    news_id: number;
    az_title: string;
    az_html_content: string;
    en_title: string;
    en_html_content: string;
    category_id: string;
    cover_image: string;
    gallery_images: GalleryImage[];
}

export interface NewsDetailResponse {
    status_code: number;
    message: string;
    news: NewsDetail;
}

// --- Redux state shape ---
export interface NewsState {
    list: NewsListItem[];
    listLoading: boolean;
    listError: string | null;
    detail: NewsDetail | null;
    detailLoading: boolean;
    detailError: string | null;
}
