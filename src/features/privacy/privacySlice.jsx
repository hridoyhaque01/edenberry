import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  isRequestLoading: false,
  isResponseError: false,
  privacyPolicies: {},
};

export const fetchPrivacy = createAsyncThunk(
  "privacy/fetchPrivacy",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/privacyPolicies/find/1`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePrivacy = createAsyncThunk(
  "privacy/updatePrivacy",
  async ({ token, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/privacyPolicies/edit/1`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const privacySlice = createSlice({
  name: "privacySlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPrivacy.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchPrivacy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.privacyPolicies = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchPrivacy.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    });

    builder.addCase(updatePrivacy.pending, (state) => {
      state.isRequestLoading = true;
      state.isSuccess = false;
      state.isResponseError = false;
    });
    builder.addCase(updatePrivacy.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isSuccess = true;
      state.isResponseError = false;
    });
    builder.addCase(updatePrivacy.rejected, (state) => {
      state.isRequestLoading = false;
      state.isSuccess = false;
      state.isResponseError = true;
    });
  },
});

export default privacySlice.reducer;
