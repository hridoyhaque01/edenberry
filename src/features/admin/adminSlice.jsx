import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  admins: [],
  isUpdateSuccess: false,
  isAddSuccess: false,
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
    throw error;
  }
});

export const addAdmin = createAsyncThunk(
  "auth/addAdmin",
  async ({ token, formData }) => {
    console.log(formData, token);
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
      throw error;
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
      throw error;
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
    handleReset: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isUpdateSuccess = false;
      state.isAddSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmin.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.admins = action.payload;
      state.isAddSuccess = false;
      state.isUpdateSuccess = false;
      state.isRequestLoading = false;
      state.isResponseError = false;
    });
    builder.addCase(fetchAdmin.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addAdmin.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isAddSuccess = false;
    });
    builder.addCase(addAdmin.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isAddSuccess = true;
    });
    builder.addCase(addAdmin.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isAddSuccess = false;
    });

    builder.addCase(updateAdmin.pending, (state) => {
      state.isRequestLoading = true;
      state.isUpdateSuccess = false;
      state.isResponseError = false;
    });
    builder.addCase(updateAdmin.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isUpdateSuccess = true;
      state.isResponseError = false;
    });
    builder.addCase(updateAdmin.rejected, (state) => {
      state.isRequestLoading = false;
      state.isUpdateSuccess = false;
      state.isResponseError = true;
    });
  },
});

export default adminSlice.reducer;
export const { updateStaff, handleReset } = adminSlice.actions;
