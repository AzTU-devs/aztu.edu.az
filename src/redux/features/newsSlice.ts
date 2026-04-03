import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsList, getNewsById } from "@/services/newsService/newsService";
import type { NewsState, NewsListItem, NewsDetail } from "@/types/news";
import type { Lang } from "@/util/apiClient";

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const fetchNewsList = createAsyncThunk<
    NewsListItem[],
    { categoryId?: string; start?: number; end?: number; lang?: Lang }
>("news/fetchList", async (params, { rejectWithValue }) => {
    try {
        return await getNewsList(params);
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
                state.list = action.payload;
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
