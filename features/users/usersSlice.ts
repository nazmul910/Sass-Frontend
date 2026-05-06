import { createSlice } from "@reduxjs/toolkit";
import { fetchMe, fetchTenantUsers } from "./usersApi";

interface UsersState {
  me: any | null;
  tenantUsers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  me: null,
  tenantUsers: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


    builder
      .addCase(fetchTenantUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenantUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.tenantUsers = action.payload;
      })
      .addCase(fetchTenantUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;