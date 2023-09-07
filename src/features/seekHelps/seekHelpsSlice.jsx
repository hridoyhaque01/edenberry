import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  seekHelps: [],
  isRequestLoading: false,
  isResponseError: false,
};

export const fetchSeekHelps = createAsyncThunk(
  "seekHelps/fetchSeekHelps",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/seekhelps`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSeekHelp = createAsyncThunk(
  "seekHelps/updateSeekHelp",
  async ({ id, status }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ status }));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/seekhelps/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const seekHelpsSlice = createSlice({
  name: "seekHelpsSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSeekHelps.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchSeekHelps.fulfilled, (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.seekHelps = action.payload?.filter(
        (seekHelp) => seekHelp?.status === "active"
      );
      state.isLoading = false;
    });
    builder.addCase(fetchSeekHelps.rejected, (state) => {
      state.isError = true;
    });
    //   update status
    builder.addCase(updateSeekHelp.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateSeekHelp.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateSeekHelp.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
  },
});

export default seekHelpsSlice.reducer;
