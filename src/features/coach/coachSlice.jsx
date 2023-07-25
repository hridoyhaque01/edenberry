import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  coaches: [],
  isRequestLoading: false,
  isResponseError: false,
  isSuccess: false,
  coachData: {},
};

export const fetchCoaches = createAsyncThunk("coach/fetchCoaches", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/coach`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const addCoache = createAsyncThunk(
  "coach/addCoache",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/coach/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCoach = createAsyncThunk(
  "coach/updateCoach",
  async ({ formData, id }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/coach/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const coachSlice = createSlice({
  name: "coachSlice",
  initialState,
  reducers: {
    setCoach: (state, action) => {
      state.coachData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoaches.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchCoaches.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.coaches = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchCoaches.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(addCoache.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addCoache.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(addCoache.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    builder.addCase(updateCoach.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateCoach.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateCoach.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
  },
});

export default coachSlice.reducer;
export const { setCoach } = coachSlice.actions;
