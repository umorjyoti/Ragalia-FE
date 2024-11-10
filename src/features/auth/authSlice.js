// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { postPhoneNo, verifyOtp } from "./authActions";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  userJWT: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwt");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPhoneNo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postPhoneNo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(postPhoneNo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userJWT = action?.payload?.data?.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
