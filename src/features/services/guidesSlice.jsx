import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
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
      state.isSuccess = false;
    });
    builder.addCase(fetchGuides.rejected, (state) => {
      state.isLoading = false;
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
  },
});

export default guideSlice.reducer;
export const { changeTab } = guideSlice.actions;
