import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
};

export const fetchChart = createAsyncThunk("chart/fetch", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/charts`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

const chartSlice = createSlice({
  name: "chart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChart.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchChart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchChart.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default chartSlice.reducer;
