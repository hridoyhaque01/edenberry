import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  wellness: [],
  isSuccess: false,
  isRequestLoading: false,
  isResponseError: false,
  activeTab: "guide",
};

// fetch wellness

export const fetchWellness = createAsyncThunk(
  "wellness/fetchWellness",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/wellness`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new wellness

export const addWellness = createAsyncThunk(
  "wellness/addWellness",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/wellness/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new wellness

export const updateWellness = createAsyncThunk(
  "wellness/updateWellness",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/wellness/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const wellnessSlice = createSlice({
  name: "wellnessSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWellness.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchWellness.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.wellness = action.payload;
    });
    builder.addCase(fetchWellness.rejected, (state) => {
      state.isError = true;
    });

    // add welness
    builder.addCase(addWellness.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addWellness.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(addWellness.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
    // add welness
    builder.addCase(updateWellness.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateWellness.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateWellness.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
  },
});

export default wellnessSlice.reducer;
