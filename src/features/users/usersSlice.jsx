import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  users: [],
  isSuccess: false,
  userData: {},
  isRequestLoading: false,
  isResponseError: false,
};

export const addUser = createAsyncThunk("users/add", async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/add`,
      formData
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/edit/${id}`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk("products/deleteUser", async () => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/products/delete/${id}`
    );
  } catch (error) {
    throw error;
  }
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users`
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

const usersSlice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isError = true;
      state.users = [];
    });

    // update user data

    builder.addCase(addUser.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });

    builder.addCase(addUser.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
    // update user data

    builder.addCase(updateUser.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
    // update user data

    builder.addCase(deleteUser.pending, (state) => {
      state.isRequestLoading = true;
      state.isResponseError = false;
      state.isSuccess = false;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = false;
      state.isSuccess = true;
    });

    builder.addCase(deleteUser.rejected, (state) => {
      state.isRequestLoading = false;
      state.isResponseError = true;
      state.isSuccess = false;
    });
  },
});

export default usersSlice.reducer;
export const { setUser } = usersSlice.actions;
