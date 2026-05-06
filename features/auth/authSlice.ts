import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authApi";
import { clear, log } from "console";

interface AuthStat{
  user:any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}


const initialState:AuthStat = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout(state){
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError(state){
      state.error = null;
    }
  },
  extraReducers:(builder) =>{
    builder.addCase(registerUser.pending,(state) =>{
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled,(state,action) =>{
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token",action.payload.token);
    });
    builder.addCase(registerUser.rejected,(state,action) =>{
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loginUser.pending,(state) =>{
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled,(state,action) =>{
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token",action.payload.token);
    });
    builder.addCase(loginUser.rejected,(state,action) =>{
      state.loading = false;
      state.error = action.payload as string;
    });
  }
})

export const {logout,clearError} = authSlice.actions;

export default authSlice.reducer;

