import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async (productInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product/products-add", productInfo, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/product/products-get", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductsAll = createAsyncThunk(
  "product/getProductsAll",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/product/productsAll-get", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product/products-one-get/${productId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOneProduct = createAsyncThunk(
  "product/updateOneProduct",
  async (productObj, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/product/products-one-update`,
        productObj,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/product/products-one-update`,
        formData,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_review = createAsyncThunk(
  "product/update_review",
  async (reviewObejct, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(reviewObejct);
      const { data } = await api.post(`/product/update_review`, reviewObejct, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_reviews = createAsyncThunk(
  "product/get_reviews",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product/get_reviews/${productId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productReducer = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: "",
    successMessage: "",
    errorMessage: "",
    loader: false,
    productsAll: [],
    rating_review: [],
    reviews: [],
    totalReview: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loader = false;
        state.products = action.payload.productInfo;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getOneProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload.oneProductInfo;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload.product;
        state.successMessage = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getProductsAll.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getProductsAll.fulfilled, (state, action) => {
        state.loader = false;
        state.productsAll = action.payload.productsAll;
        state.successMessage = action.payload.message;
      })
      .addCase(getProductsAll.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(update_review.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(update_review.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(update_review.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_reviews.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(get_reviews.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.reviews = action.payload.reviews;
        state.rating_review = action.payload.rating_review;
        state.totalReview = action.payload.totalReview;
      })
      .addCase(get_reviews.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = productReducer.actions;

export default productReducer.reducer;
