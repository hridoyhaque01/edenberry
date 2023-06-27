import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  wellness: [],
  lessons: [],
  isSuccess: false,
  type: "",
  editData: {},
  screen: {},
  indexNo: "",
  activeTab: "guide",
};

// fetch wellness

export const fetchWellness = createAsyncThunk(
  "services/fetchWellness",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/wellness`
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      console.log(error);
    }
  }
);

// add new wellness

export const addWellness = createAsyncThunk(
  "services/addWellness",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/wellness/add`,
        formData
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const servicesSlice = createSlice({
  name: "servicesSlice",
  initialState,
  reducers: {
    addLesson: (state, action) => {
      state.lessons.push(action.payload);
      state.type = "";
      state.editData = {};
      state.indexNo = "";
    },

    addType: (state, action) => {
      state.type = action.payload.type;
      state.editData = action.payload.data;
      state.indexNo = action.payload.index;
    },

    editLesson: (state, action) => {
      state.lessons[action.payload.indexNo] = action.payload.data;
      state.type = "";
      state.editData = {};
      state.indexNo = "";
    },
    changeTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWellness.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchWellness.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.wellness = action.payload;
    });
    builder.addCase(fetchWellness.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // add welness
    builder.addCase(addWellness.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addWellness.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(addWellness.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

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
export const { addLesson, editLesson, addType, changeTab } =
  servicesSlice.actions;
