import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  guides: [],
  isRequestLoading: false,
  isResponseError: false,
  isSuccess: false,
  activeTab: "postpartum",
};

// fetch course

export const fetchGuides = createAsyncThunk("course/fetchGuides", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/dailyguides`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

// add new course

export const addGuide = createAsyncThunk(
  "course/addGuide",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/dailyguides/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

// add new course

export const updateGuide = createAsyncThunk(
  "course/updateGuide",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/dailyguides/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteGuide = createAsyncThunk(
  "course/deleteGuide",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/dailyguides/delete/${id}`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const guideSlice = createSlice({
  name: "guideSlice",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },

    handleReset: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGuides.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchGuides.fulfilled, (state, action) => {
      state.isError = false;
      state.guides = action.payload;
      state.isSuccess = false;
      state.isLoading = false;
      state.isRequestLoading = false;
      state.isResponseError = false;
    });
    builder.addCase(fetchGuides.rejected, (state) => {
      state.isError = true;
    });

    // add daily guide
    builder.addCase(addGuide.pending, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = true;
      state.isResponseError = false;
    });
    builder.addCase(addGuide.fulfilled, (state) => {
      state.isSuccess = true;
      state.isRequestLoading = false;
      state.isResponseError = false;
    });
    builder.addCase(addGuide.rejected, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = false;
      state.isResponseError = true;
    });

    // update course
    builder.addCase(updateGuide.pending, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = true;
      state.isResponseError = false;
    });
    builder.addCase(updateGuide.fulfilled, (state) => {
      state.isSuccess = true;
      state.isRequestLoading = false;
      state.isResponseError = false;
    });
    builder.addCase(updateGuide.rejected, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = false;
      state.isResponseError = true;
    });

    // update course
    builder.addCase(deleteGuide.pending, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = true;
      state.isResponseError = false;
    });
    builder.addCase(deleteGuide.fulfilled, (state) => {
      state.isSuccess = true;
      state.isRequestLoading = false;
      state.isResponseError = false;
    });
    builder.addCase(deleteGuide.rejected, (state) => {
      state.isSuccess = false;
      state.isRequestLoading = false;
      state.isResponseError = true;
    });
  },
});

export default guideSlice.reducer;
export const { changeTab, handleReset } = guideSlice.actions;
