import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_payment_details = createAsyncThunk(
  "payment/get_seller_payment_details",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/get_seller_payment_details/${sellerId}`,
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

export const seller_request_withdraw = createAsyncThunk(
  "payment/seller_request_withdraw",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/seller_request_withdraw`,
        info,
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

export const admin_get_withdraw = createAsyncThunk(
  "payment/admin_get_withdraw",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/admin_get_withdraw`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_approve_withdraw = createAsyncThunk(
  "payment/admin_approve_withdraw",
  async (requestId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/admin_approve_withdraw/${requestId}`,
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

const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    pendingPayment: [],
    successPayment: [],
    totalAmount: 0,
    pendingAmount: 0,
    withdrawalAmount: 0,
    availableAmount: 0,
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
      .addCase(get_seller_payment_details.fulfilled, (state, action) => {
        state.loader = false;
        state.pendingPayment = action.payload.pendingWithdraws;
        state.successPayment = action.payload.successWithdraws;
        state.totalAmount = action.payload.totalAmount;
        state.pendingAmount = action.payload.pendingAmount;
        state.withdrawalAmount = action.payload.successAmount;
        state.availableAmount = action.payload.availableAmount;
      })
      .addCase(seller_request_withdraw.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(admin_get_withdraw.fulfilled, (state, action) => {
        state.loader = false;
        state.pendingPayment = action.payload.withdrawRequest;
      })
      .addCase(admin_approve_withdraw.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      });
  },
});

export const { messageClear } = paymentReducer.actions;

export default paymentReducer.reducer;
