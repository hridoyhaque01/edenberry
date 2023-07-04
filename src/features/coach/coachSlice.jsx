import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  coaches: [],
  isSuccess: true,
};

export const fetchCoaches = createAsyncThunk(
  "coach/fetchCoaches",
  async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coach`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCoache = createAsyncThunk(
  "coach/addCoache",
  async ({ token, formData }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/coach/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const coachSlice = createSlice({
  name: "coachSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCoaches.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.coaches = [];
      state.isSuccess = false;
    });
    builder.addCase(fetchCoaches.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.coaches = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchCoaches.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.coaches = [];
      state.isSuccess = false;
    });

    builder.addCase(addCoache.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addCoache.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(addCoache.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default coachSlice.reducer;
