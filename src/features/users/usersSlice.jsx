import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
  isSuccess: false,
  userData: {},
};

export const addUser = createAsyncThunk("users/add", async (formData) => {
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
});

export const updateUser = createAsyncThunk(
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
    setUser: (state, action) => {
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
      state.isSuccess = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.users = [];
    });

    // update user data

    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });

    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // update user data

    builder.addCase(updateUser.pending, (state) => {
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isError = false;
      state.isSuccess = true;
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default usersSlice.reducer;
export const { setUser } = usersSlice.actions;
