import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosClient";

// GET /features/feature1  →  BASIC plan required
export const fetchFeature1 = createAsyncThunk(
  "features/feature1",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/features/feature1");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Access denied"
      );
    }
  }
);

// GET /features/feature2  →  STANDARD plan required
export const fetchFeature2 = createAsyncThunk(
  "features/feature2",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/features/feature2");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Access denied"
      );
    }
  }
);

// GET /features/feature3  →  PREMIUM plan required
export const fetchFeature3 = createAsyncThunk(
  "features/feature3",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/features/feature3");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Access denied"
      );
    }
  }
);