import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellers = createAsyncThunk(
  "sellers/getSellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/seller/sellers-get", {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSeller = createAsyncThunk(
  "sellers/getSeller",
  async (sellerID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/seller-get/${sellerID}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_status = createAsyncThunk(
  "sellers/update_status",
  async (updateInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller/seller-update`, updateInfo, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_create_payment_account = createAsyncThunk(
  "sellers/seller_create_payment_account",

  async () => {
    try {
      const { data } = await api.get(`/payment/seller_create_payment_account`, {
        withCredentials: true,
      });
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  }
);

export const seller_update_payment_status = createAsyncThunk(
  "sellers/seller_update_payment_status",

  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/seller_update_payment_status/${sellerId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

const sellereReducer = createSlice({
  name: "sellers",
  initialState: {
    sellersInfo: [],
    successMessage: "",
    errorMessage: "",
    loader: false,
    seller: "",
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellers.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSellers.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.sellersInfo = action.payload.sellersInfo;
      })
      .addCase(getSellers.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getSeller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getSeller.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.seller = action.payload.sellerInfo;
      })
      .addCase(getSeller.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(update_status.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(update_status.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.seller = action.payload.sellerInfo;
      })
      .addCase(update_status.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = sellereReducer.actions;

export default sellereReducer.reducer;
