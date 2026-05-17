import api from "@/lib/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createStripePayment = createAsyncThunk(
  "payment/stripe/create",
  async (payload: { userId: string; amount: number }, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment-strip", payload);
      const { gatewayURL } = res.data;

      if (gatewayURL) {
        window.location.href = gatewayURL;
      }

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Payment initiation failed",
      );
    }
  },
);
