import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  admins: [],
  isSuccess: false,
  isRequestLoading: false,
  isResponseError: false,
  activeStaff: {},
};

export const fetchAdmin = createAsyncThunk("auth/fetchAdmin", async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});

export const addAdmin = createAsyncThunk(
  "auth/addAdmin",
  async ({ token, formData }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "auth/updateAdmin",
  async ({ token, formData, id }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/edit/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    updateStaff: (state, action) => {
      state.activeStaff = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.admins = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchAdmin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addAdmin.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addAdmin.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });
    builder.addCase(addAdmin.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });

    builder.addCase(updateAdmin.pending, (state) => {
      state.isRequestLoading = true;
      state.isSuccess = false;
      state.isResponseError = false;
    });
    builder.addCase(updateAdmin.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isSuccess = true;
      state.isResponseError = false;
    });
    builder.addCase(updateAdmin.rejected, (state) => {
      state.isRequestLoading = false;
      state.isSuccess = false;
      state.isResponseError = true;
    });
  },
});

export default adminSlice.reducer;
export const { updateStaff } = adminSlice.actions;
