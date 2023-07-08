import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activeTab: "guide",
  screen: {},
  innerActiveTab: "postpartum",
};

// fetch wellness

export const fetchWelcomeScreens = createAsyncThunk(
  "services/fetchWelcomeScreens",
  async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/welcomeScreens/find/649a7f64f83cfbb439426b08`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const servicesSlice = createSlice({
  name: "servicesSlice",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
    changeInnerTab: (state, action) => {
      state.innerActiveTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch welcome screen

    builder.addCase(fetchWelcomeScreens.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchWelcomeScreens.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.screen = action.payload;
    });
    builder.addCase(fetchWelcomeScreens.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default servicesSlice.reducer;
export const { changeTab, changeInnerTab } = servicesSlice.actions;
