import { createSlice } from "@reduxjs/toolkit";
import { createStripePayment, verifyStripePayment } from "./stripePaymentApi";

interface StripePaymentState {
  gatewayURL: string | null;
  loading: boolean;
  verifying: boolean;
  verified: boolean;
  error: string | null;
}

const initialState: StripePaymentState = {
  gatewayURL: null,
  loading: false,
  verifying: false,
  verified: false,
  error: null,
};

const stripePaymentSlice = createSlice({
  name: "stripePayment",
  initialState,
  reducers: {
    clearStripePayment(state) {
      state.gatewayURL = null;
      state.error = null;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create payment
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
      })
      // Verify payment
      .addCase(verifyStripePayment.pending, (state) => {
        state.verifying = true;
        state.error = null;
      })
      .addCase(verifyStripePayment.fulfilled, (state) => {
        state.verifying = false;
        state.verified = true;
      })
      .addCase(verifyStripePayment.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStripePayment } = stripePaymentSlice.actions;
export default stripePaymentSlice.reducer;