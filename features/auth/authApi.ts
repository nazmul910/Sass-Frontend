import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosClient";

export const registerUser = createAsyncThunk("auth/register",async(
    payload:{email:string,password:string},
    {rejectWithValue}
) =>{
    try{
        const res = await api.post("/auth/register",payload);
        return res.data;
    }catch(err:any){
        return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
});



export const loginUser = createAsyncThunk("auth/login",async(payload:{email:string;password:string},{rejectWithValue}) =>{
    try{
        const res = await api.post("/auth/login",payload);
        return res.data;
    }catch(err:any){
        return rejectWithValue(err.response?.data?.message || "Login failed");
    }
});