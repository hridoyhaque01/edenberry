import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  coaches: [],
  isRequestLoading: false,
  isUpdateError: false,
  isUpdateSuccess: false,
  isAddError: false,
  isAddSuccess: false,
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
        `${import.meta.env.VITE_API_BASE_URL}/approveCoach/add`,
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
      state.isRequestLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
      state.isAddError = false;
      state.isAddSuccess = false;
    });
    builder.addCase(fetchCoaches.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(addCoache.pending, (state) => {
      state.isRequestLoading = true;
      state.isAddError = false;
      state.isAddSuccess = false;
    });
    builder.addCase(addCoache.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isAddError = false;
      state.isAddSuccess = true;
    });
    builder.addCase(addCoache.rejected, (state) => {
      state.isRequestLoading = false;
      state.isAddError = true;
      state.isAddSuccess = false;
    });

    builder.addCase(updateCoach.pending, (state) => {
      state.isRequestLoading = true;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
    });
    builder.addCase(updateCoach.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = true;
    });
    builder.addCase(updateCoach.rejected, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = true;
      state.isUpdateSuccess = false;
    });
  },
});

export default coachSlice.reducer;
export const { setCoach } = coachSlice.actions;
