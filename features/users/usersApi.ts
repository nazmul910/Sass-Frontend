import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosClient";

export const fetchMe = createAsyncThunk("users/fetchMe",
    async(_,{ rejectWithValue }) =>{
        try{
            const res = await api.get("/users/me");
            return res.data;
        }catch(err:any){
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user data");
        }
    }
);

export const fetchTenantUsers = createAsyncThunk(
  "users/fetchTenantUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);
 