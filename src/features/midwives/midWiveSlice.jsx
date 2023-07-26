import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
  midwives: [],
  isRequestLoading: false,
  isResponseError: false,
};

export const fetchMidWives = createAsyncThunk(
  "midwives/fetchMidWives",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/midwives`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateMidWives = createAsyncThunk(
  "midwives/updateMidWives",
  async ({ id, status }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ status }));
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/midwives/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const midwiveSlice = createSlice({
  name: "midwiveSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMidWives.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchMidWives.fulfilled, (state, action) => {
      state.isError = false;
      state.isSuccess = false;

      state.midwives = action.payload?.filter(
        (wive) => wive?.status === "active"
      );
      state.isLoading = false;
    });
    builder.addCase(fetchMidWives.rejected, (state) => {
      state.isError = true;
    });
    //   update status
    builder.addCase(updateMidWives.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateMidWives.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateMidWives.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
  },
});

export default midwiveSlice.reducer;
