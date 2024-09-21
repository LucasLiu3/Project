import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({
    products,
    price,
    shippingFee,
    items,
    info,
    customerInfo,
    navigate,
  }) => {
    try {
      const { data } = await api.post(`/order/place_order`, {
        products,
        price,
        shippingFee,
        items,
        info,
        customerInfo,
        navigate,
      });

      window.location.href = data.paymentUrl;

      // navigate("/payment", {
      //   state: {
      //     totalPrice: price + shippingFee,
      //     items,
      //     products,
      //     orderId: data.orderId,
      //   },
      // });
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const update_order = createAsyncThunk(
  "order/update_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/order/update_order/${orderId}`, {
        withCredentials: true,
      });

      window.location.href = data.paymentUrl;

      // return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const pay_later = createAsyncThunk(
  "order/pay_later",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    console.log(orderId);
    try {
      const { data } = await api.post(`/order/pay_later/${orderId}`, {
        withCredentials: true,
      });

      window.location.href = data.paymentUrl;

      // return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const orderReducer = createSlice({
  name: "order",
  initialState: {
    orders: [],
    myOrder: {},
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
    // builder
    //   .addCase(addToCart.pending, (state, action) => {
    //     state.loader = true;
    //   })
    //   .addCase(addToCart.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.successMessage = action.payload.message;
    //     state.cartTotal += 1;
    //   })
    //   .addCase(addToCart.rejected, (state, action) => {
    //     state.loader = false;
    //     state.errorMessage = action.payload.error;
    //   })
    //   .addCase(getCartProduct.pending, (state, action) => {
    //     state.loader = true;
    //   })
    //   .addCase(getCartProduct.fulfilled, (state, action) => {
    //     state.loader = false;
    //     state.successMessage = action.payload.message;
    //     state.cart = action.payload.shoppingCart;
    //     state.cartTotal = action.payload.shoppingCart.length;
    //   })
    //   .addCase(getCartProduct.rejected, (state, action) => {
    //     state.loader = false;
    //     state.errorMessage = action.payload.error;
    //   })
  },
});

export const { messageClear } = orderReducer.actions;

export default orderReducer.reducer;
