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

export const get_orders_admin = createAsyncThunk(
  "order/get_orders_admin",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get_orders_admin`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_order_details_admin = createAsyncThunk(
  "order/get_order_details_admin",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/get_order_detail_admin/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_orders_seller = createAsyncThunk(
  "order/get_orders_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/order/get_orders_seller/${sellerId}`, {
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

export const get_order_details_seller = createAsyncThunk(
  "order/get_order_details_seller",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/get_order_details_seller/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const order_update_admin = createAsyncThunk(
  "order/order_update_admin",
  async ({ orderId, state }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/order/order_update_admin/${orderId}`,
        { state },
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const order_update_seller = createAsyncThunk(
  "order/order_update_seller",
  async ({ orderId, state }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/order/order_update_seller/${orderId}`,
        { state },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const create_payment = createAsyncThunk(
  "order/create_payment",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/payment/create_payment/${orderId}`, {
        withCredentials: true,
      });
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
    oneOrder: {},
    ordersDetail: [],
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
    builder
      .addCase(get_orders_admin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(get_orders_admin.fulfilled, (state, action) => {
        state.loader = false;
        state.orders = action.payload.orders;
      })
      .addCase(get_order_details_admin.fulfilled, (state, action) => {
        state.loader = false;
        state.oneOrder = action.payload.oneOrder;
        state.ordersDetail = action.payload.orderDetails;
      })
      .addCase(get_orders_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.orders = action.payload.orders;
      })
      .addCase(get_order_details_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.oneOrder = action.payload.oneOrder;
        state.ordersDetail = action.payload.orderDetails;
      })
      .addCase(order_update_admin.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(order_update_admin.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(order_update_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(order_update_seller.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = orderReducer.actions;

export default orderReducer.reducer;
