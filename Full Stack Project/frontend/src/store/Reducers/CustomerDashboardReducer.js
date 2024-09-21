import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_my_orders = createAsyncThunk(
  "customer/get_my_orders",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/get_my_orders/${customerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_order_detail = createAsyncThunk(
  "customer/get_order_detail",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/get_order_detail/${orderId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product_detail = createAsyncThunk(
  "customer/get_product_detail",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/customer/get_product_detail/${productId}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CustomerDashboardReducer = createSlice({
  name: "customerDashboard",
  initialState: {
    successMessage: "",
    errorMessage: "",
    orders: [],
    orderDetail: {},
    productDetail: {},
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_my_orders.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(get_my_orders.fulfilled, (state, action) => {
        state.loader = false;
        state.orders = action.payload.my_orders;
      })
      .addCase(get_my_orders.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })

      .addCase(get_order_detail.fulfilled, (state, action) => {
        state.loader = false;
        state.orderDetail = action.payload.orderDetail;
      })
      .addCase(get_product_detail.fulfilled, (state, action) => {
        state.loader = false;
        state.productDetail = action.payload.productDetail;
      });
  },
});

export const { messageClear } = CustomerDashboardReducer.actions;

export default CustomerDashboardReducer.reducer;
