import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  guides: [],
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
    console.log(error);
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
      console.log(error);
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
      console.log(error);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGuides.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchGuides.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.guides = action.payload;
    });
    builder.addCase(fetchGuides.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // add daily guide
    builder.addCase(addGuide.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addGuide.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(addGuide.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // update course
    builder.addCase(updateGuide.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateGuide.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateGuide.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default guideSlice.reducer;
export const { changeTab } = guideSlice.actions;
