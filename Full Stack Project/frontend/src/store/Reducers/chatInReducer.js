import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const seller_get_customers = createAsyncThunk(
  "chatIn/seller_get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller_get_customers/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_get_customers_message = createAsyncThunk(
  "chat/seller_get_customers_message",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/seller_get_customers_message/${customerId}`,
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

export const seller_message_customer = createAsyncThunk(
  "chat/seller_message_customer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/seller_message_customer`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_get_sellers = createAsyncThunk(
  "chat/admin_get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin_get_sellers`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_get_messages = createAsyncThunk(
  "chat/admin_get_messages",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin_get_messages/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_message_seller = createAsyncThunk(
  "chat/admin_message_seller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/admin_message_seller`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_get_messages = createAsyncThunk(
  "chat/seller_get_messages",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller_get_messages`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatInReducer = createSlice({
  name: "chatIn",
  initialState: {
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    adtiveAdmin: "",
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    successMessage: "",
    errorMessage: "",
    sellers: [],
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateSeller: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateSellerMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    updateAdminMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(seller_get_customers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      })
      .addCase(seller_get_customers_message.fulfilled, (state, action) => {
        state.currentCustomer = action.payload.currentCustomer;
        state.messages = action.payload.messages;
      })
      .addCase(seller_message_customer.fulfilled, (state, action) => {
        state.currentCustomer = action.payload.currentCustomer;
        state.customers = action.payload.friendsList;
        state.messages = [...state.messages, action.payload.newMessage];
        state.successMessage = "Message Send Success";
      })
      .addCase(admin_get_sellers.fulfilled, (state, action) => {
        state.sellers = action.payload.sellers;
      })
      .addCase(admin_message_seller.fulfilled, (state, action) => {
        state.seller_admin_message = [
          ...state.seller_admin_message,
          action.payload.message,
        ];
        state.successMessage = "Message Send Success";
      })
      .addCase(admin_get_messages.fulfilled, (state, action) => {
        state.currentSeller = action.payload.currentSeller;
        state.seller_admin_message = action.payload.messages;
      })
      .addCase(seller_get_messages.fulfilled, (state, action) => {
        state.seller_admin_message = action.payload.messages;
      });
  },
});

export const {
  messageClear,
  updateSeller,
  updateCustomer,
  updateSellerMessage,
  updateAdminMessage,
} = chatInReducer.actions;
export const { updateMessage } = chatInReducer.actions;

export default chatInReducer.reducer;
