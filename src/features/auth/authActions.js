// src/features/auth/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const postPhoneNo = createAsyncThunk(
  "postPhoneNo",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login_with_phone", {
        phone: body?.phone,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/verify", body);
      localStorage.setItem("jwt", response.data?.data?.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
