import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsListPage, getNewsById } from "@/services/newsService/newsService";
import type { NewsState, NewsListItem, NewsDetail } from "@/types/news";
import type { Lang } from "@/util/apiClient";

// ── Async Thunks ──────────────────────────────────────────────────────────────

interface FetchNewsListResult {
    items: NewsListItem[];
    total: number;
    // When false the page is appended to the existing list (Load More);
    // when true the list is replaced (first page / filter change).
    reset: boolean;
}

export const fetchNewsList = createAsyncThunk<
    FetchNewsListResult,
    { categoryId?: string; start?: number; end?: number; lang?: Lang }
>("news/fetchList", async (params, { rejectWithValue }) => {
    try {
        const { news, total } = await getNewsListPage(params);
        return { items: news, total, reset: (params.start ?? 0) === 0 };
    } catch (err: unknown) {
        return rejectWithValue((err as any)?.message ?? "Failed to fetch news list");
    }
});

export const fetchNewsById = createAsyncThunk<
    NewsDetail,
    { id: number; lang?: Lang }
>("news/fetchById", async ({ id, lang }, { rejectWithValue }) => {
    try {
        const data = await getNewsById(id, lang);
        if (!data) return rejectWithValue("News not found");
        return data;
    } catch (err: unknown) {
        return rejectWithValue((err as any)?.message ?? "Failed to fetch news detail");
    }
});

// ── Initial State ─────────────────────────────────────────────────────────────

const initialState: NewsState = {
    list: [],
    listTotal: 0,
    listLoading: false,
    listError: null,
    detail: null,
    detailLoading: false,
    detailError: null,
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        clearNewsDetail(state) {
            state.detail = null;
            state.detailError = null;
        },
    },
    extraReducers: (builder) => {
        // fetchNewsList
        builder
            .addCase(fetchNewsList.pending, (state) => {
                state.listLoading = true;
                state.listError = null;
            })
            .addCase(fetchNewsList.fulfilled, (state, action) => {
                state.listLoading = false;
                const { items, total, reset } = action.payload;
                state.listTotal = total;
                if (reset) {
                    state.list = items;
                } else {
                    // Append the next page, skipping any ids already present
                    // so a double-click or overlap never duplicates cards.
                    const seen = new Set(state.list.map((n) => n.news_id));
                    state.list = [...state.list, ...items.filter((n) => !seen.has(n.news_id))];
                }
            })
            .addCase(fetchNewsList.rejected, (state, action) => {
                state.listLoading = false;
                state.listError = action.payload as string;
            });

        // fetchNewsById
        builder
            .addCase(fetchNewsById.pending, (state) => {
                state.detailLoading = true;
                state.detailError = null;
                state.detail = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.detail = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.detailLoading = false;
                state.detailError = action.payload as string;
            });
    },
});

export const { clearNewsDetail } = newsSlice.actions;
export default newsSlice.reducer;
