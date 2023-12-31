import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve data from localStorage
const storedUserData = JSON.parse(localStorage.getItem("userData"));
const storedTokenExpiration = localStorage.getItem("tokenExpiration");
const isTokenValid =
  storedTokenExpiration && storedTokenExpiration > Date.now();

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  userData: isTokenValid ? storedUserData : "",
  isRegisterSuccess: false,
  isRegisterError: false,
  isSuccess: false,
  admins: [],
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
      formData
    );
    localStorage.setItem("userData", JSON.stringify(response?.data));
    const tokenExpiration = 7 * 24 * 60 * 60 * 1000;
    const expirationDate = Date.now() + tokenExpiration;
    localStorage.setItem("tokenExpiration", expirationDate);
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admin/register`,
      formData
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const sendEmailRequest = createAsyncThunk(
  "auth/sendEmailRequest",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/register`,
        formData
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedOut: (state) => {
      state.userData = "";
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.userData = "";
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isRegisterError = false;
      state.isRegisterSuccess = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.isRegisterError = false;
      state.isRegisterSuccess = true;
      state.userData = "";
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.isRegisterError = true;
      state.isRegisterSuccess = false;
      state.userData = "";
    });
  },
});

export default authSlice.reducer;
export const { userLoggedOut } = authSlice.actions;
