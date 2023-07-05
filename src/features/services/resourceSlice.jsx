import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  resources: [],
  isSuccess: false,
  activeTab: "postpartum",
};

// fetch course

export const fetchResources = createAsyncThunk(
  "course/fetchResources",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/resources`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// add new course

export const addResource = createAsyncThunk(
  "course/addResource",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/resources/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// add new course

export const updateResource = createAsyncThunk(
  "course/updateResource",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/resources/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const resourceSlice = createSlice({
  name: "resourceSlice",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResources.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchResources.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.resources = action.payload;
    });
    builder.addCase(fetchResources.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // add course
    builder.addCase(addResource.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addResource.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(addResource.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    // update course
    builder.addCase(updateResource.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateResource.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(updateResource.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default resourceSlice.reducer;
export const { changeTab } = resourceSlice.actions;
