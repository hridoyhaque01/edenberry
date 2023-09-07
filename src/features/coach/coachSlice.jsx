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
  isApprovedCoachLoading: true,
  isApprovedCoachError: false,
  approvedCoaches: [],
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

export const fetchApprovedCoaches = createAsyncThunk(
  "coach/fetchApprovedCoaches",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/approveCoach`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

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

export const deleteCoach = createAsyncThunk("coach/deleteCoach", async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/coach/delete/${id}`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const deleteApprovedCoach = createAsyncThunk(
  "coach/deleteApprovedCoach",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/approveCoach/delete/${id}`
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

    builder.addCase(fetchApprovedCoaches.pending, (state) => {
      state.isApprovedCoachError = false;
    });
    builder.addCase(fetchApprovedCoaches.fulfilled, (state, action) => {
      state.isApprovedCoachLoading = false;
      state.isApprovedCoachError = false;
      state.approvedCoaches = action.payload;
    });
    builder.addCase(fetchApprovedCoaches.rejected, (state) => {
      state.isApprovedCoachLoading = false;
      state.isApprovedCoachError = true;
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
    // update coach
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

    // delete coach

    builder.addCase(deleteCoach.pending, (state) => {
      state.isRequestLoading = true;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
    });
    builder.addCase(deleteCoach.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteCoach.rejected, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = true;
      state.isUpdateSuccess = false;
    });
    // delete coach

    builder.addCase(deleteApprovedCoach.pending, (state) => {
      state.isRequestLoading = true;
      state.isUpdateError = false;
      state.isUpdateSuccess = false;
    });
    builder.addCase(deleteApprovedCoach.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = false;
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteApprovedCoach.rejected, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = true;
      state.isUpdateSuccess = false;
    });
  },
});

export default coachSlice.reducer;
export const { setCoach } = coachSlice.actions;
