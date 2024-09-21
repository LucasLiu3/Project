import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/cart/add_to_cart", info, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartProduct = createAsyncThunk(
  "cart/getCartProduct",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get_cart_product/${customerId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/delete_cart_product/${cartId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_add = createAsyncThunk(
  "cart/quantity_add",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/cart/quantity_add/${cartId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_minus = createAsyncThunk(
  "cart/quantity_minus",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/cart/quantity_minus/${cartId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "cart/addToWishList",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/cart/add_to_wishList", info, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWishList = createAsyncThunk(
  "cart/getWishList",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get_wish_list/${customerId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeWishList = createAsyncThunk(
  "cart/removeWishList",
  async (wishListId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/remove_wishList/${wishListId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartTotal: 0,
    wishList: [],
    wishListTotal: 0,
    price: 0,
    shipFee: 0,
    successMessage: "",
    errorMessage: "",
    loader: false,
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.cartTotal += 1;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getCartProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getCartProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.cart = action.payload.shoppingCart;
        state.cartTotal = action.payload.shoppingCart.length;
      })
      .addCase(getCartProduct.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(deleteCartProduct.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(quantity_add.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(quantity_add.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(quantity_add.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(quantity_minus.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(quantity_minus.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(quantity_minus.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(addToWishList.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishListTotal += 1;
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getWishList.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishList = action.payload.allProductsInWishList;
        state.wishListTotal = action.payload.allProductsInWishList.length;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(removeWishList.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(removeWishList.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishListTotal -= 1;
      })
      .addCase(removeWishList.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = cartReducer.actions;

export default cartReducer.reducer;
