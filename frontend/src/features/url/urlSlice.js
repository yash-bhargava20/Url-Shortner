import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ================= Fetch All URLs =================
export const fetchUrls = createAsyncThunk(
  "url/fetchUrls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/urls");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch URLs",
      );
    }
  },
);

// ================= Create URL =================
export const createUrl = createAsyncThunk(
  "url/createUrl",
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await api.post("/urls", urlData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create URL",
      );
    }
  },
);

// ================= Delete URL =================
export const deleteUrl = createAsyncThunk(
  "url/deleteUrl",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/urls/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete URL",
      );
    }
  },
);

const initialState = {
  urls: [],
  analytics: {
    totalClicks: 0,
    mostVisited: [],
    recent: [],
  },
  loading: false,
  error: null,
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    clearUrlError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= Fetch =================
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload.urls;
        state.analytics = action.payload.analytics;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Create =================
      .addCase(createUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls.unshift(action.payload);
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Delete =================
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.urls = state.urls.filter((url) => url._id !== action.payload);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearUrlError } = urlSlice.actions;

export default urlSlice.reducer;
