import { createSlice } from "@reduxjs/toolkit";
import { fetchFeature1, fetchFeature2, fetchFeature3 } from "./featuresApi";

interface FeaturesState {
  feature1: string | null;
  feature2: string | null;
  feature3: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeaturesState = {
  feature1: null,
  feature2: null,
  feature3: null,
  loading: false,
  error: null,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    clearFeaturesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // feature1
    builder
      .addCase(fetchFeature1.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFeature1.fulfilled, (state, action) => {
        state.loading = false;
        state.feature1 = action.payload.message;
      })
      .addCase(fetchFeature1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // feature2
    builder
      .addCase(fetchFeature2.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFeature2.fulfilled, (state, action) => {
        state.loading = false;
        state.feature2 = action.payload.message;
      })
      .addCase(fetchFeature2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // feature3
    builder
      .addCase(fetchFeature3.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFeature3.fulfilled, (state, action) => {
        state.loading = false;
        state.feature3 = action.payload.message;
      })
      .addCase(fetchFeature3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFeaturesError } = featuresSlice.actions;
export default featuresSlice.reducer;