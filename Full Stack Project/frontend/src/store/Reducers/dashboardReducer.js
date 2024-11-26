import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_get_dashboard_data = createAsyncThunk(
  "dashboard/admin_get_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/auth/admin_get_dashboard_data/`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_get_dashboard_data = createAsyncThunk(
  "dashboard/seller_get_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/auth/seller_get_dashboard_data`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrder: [],
    recentMessage: [],
    allOrder: [],
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_get_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrder = payload.recentOrder;
        state.recentMessage = payload.messages;
        state.allOrder = payload.allOrder;
      })
      .addCase(seller_get_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalPendingOrder = payload.totalPendingOrder;
        state.recentOrder = payload.recentOrder;
        state.recentMessage = payload.messages;
        state.allOrder = payload.allOrder;
      });
  },
});

export const { messageClear } = dashboardReducer.actions;

export default dashboardReducer.reducer;
