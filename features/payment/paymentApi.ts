import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosClient";


export const createPayment = createAsyncThunk(
  "payment/create",
  async (
    payload: { userId: string; amount: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/payment", payload);
      const {gatewayURL} = res.data

      if(gatewayURL){
        window.location.href = gatewayURL;
      }

      return res.data; 

    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Payment initiation failed"
      );
    }
  }
);