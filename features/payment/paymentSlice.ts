import { createSlice } from "@reduxjs/toolkit";
import { createPayment } from "./paymentApi";

interface PaymentState {
  gatewayURL: string | null;
  payload: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  gatewayURL: null,
  payload: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPayment(state) {
      state.gatewayURL = null;
      state.payload = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.gatewayURL = action.payload.gatewayURL;
        state.payload = action.payload.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;