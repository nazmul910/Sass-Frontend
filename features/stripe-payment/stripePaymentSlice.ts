import { createSlice } from "@reduxjs/toolkit";
import { createStripePayment } from "./stripePaymentApi";

interface StripePaymentState {
  gatewayURL: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: StripePaymentState = {
  gatewayURL: null,
  loading: false,
  error: null,
};

const stripePaymentSlice = createSlice({
  name: "stripePayment",
  initialState,
  reducers: {
    clearStripePayment(state) {
      state.gatewayURL = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStripePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStripePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.gatewayURL = action.payload.gatewayURL;
      })
      .addCase(createStripePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStripePayment } = stripePaymentSlice.actions;
export default stripePaymentSlice.reducer;