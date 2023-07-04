import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
  userData: {},
  isUpdateError: false,
  isRequestLoading: false,
};

export const updateUserData = createAsyncThunk(
  "users/update",
  async ({ id, formData }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/add`,
        formData
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/update",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/edit/${id}`,
        formData
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users`
    );
    return response?.data;
  } catch (err) {
    console.log(err);
  }
});

const usersSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.users = [];
    });

    // update user data

    builder.addCase(updateUserData.pending, (state) => {
      state.isRequestLoading = true;
      state.isUpdateError = false;
    });
    builder.addCase(updateUserData.rejected, (state) => {
      state.isRequestLoading = false;
      state.isUpdateError = true;
    });
  },
});

export default usersSlice.reducer;
export const { setUserData } = usersSlice.actions;
