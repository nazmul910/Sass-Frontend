import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosClient";
import axios from "axios";

type AuthPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  user: {
    id: string;
    email: string;
  };
  token: string;
};

// REGISTER
export const registerUser = createAsyncThunk<
  AuthResponse,
  AuthPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/register", payload);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
    return rejectWithValue("Unexpected error");
  }
});

// LOGIN
export const loginUser = createAsyncThunk<
  AuthResponse,
  AuthPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/login", payload);

    // Save token
    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
    return rejectWithValue("Unexpected error");
  }
});