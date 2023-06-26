import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  lessons: [],
  isSuccess: false,
  type: "",
  editData: {},
  indexNo: "",
};

export const uploadResource = createAsyncThunk(
  "resource/uploadResource",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/resources/add`,
        formData
      );
      console.log(response);
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
  },
  extraReducers: (builder) => {
    builder.addCase(uploadResource.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(uploadResource.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(uploadResource.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default resourceSlice.reducer;
export const { addLesson, editLesson, addType } = resourceSlice.actions;
