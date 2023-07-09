import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  products: [],
  isRequestLoading: false,
  isResponseError: false,
  isSuccess: false,
  activeProduct: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/add`,
        formData
      );
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/edit/${id}`,
        formData
      );
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    changeActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.products = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    //   add product

    builder.addCase(addProduct.pending, (state) => {
      state.isResponseError = false;
      state.isRequestLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.isResponseError = false;
      state.isRequestLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.isResponseError = true;
      state.isRequestLoading = false;
    });

    //   add product

    builder.addCase(updateProduct.pending, (state) => {
      state.isResponseError = false;
      state.isRequestLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.isResponseError = false;
      state.isRequestLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isResponseError = true;
      state.isRequestLoading = false;
    });
  },
});

export default productSlice.reducer;
export const { changeActiveProduct } = productSlice.actions;
