import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customerRegister = createAsyncThunk(
  "customer/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer_register", info, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customerLogin = createAsyncThunk(
  "customer/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer_login", info, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

function decodeToken(token) {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);

    if (new Date() > expireTime) {
      localStorage.removeItem("customerToken");
      return "";
    }

    return decodeToken;
  }

  return "";
}

const customerReducer = createSlice({
  name: "customer",
  initialState: {
    customerInfo: decodeToken(localStorage.getItem("customerToken")),
    successMessage: "",
    errorMessage: "",
    loader: false,
    // role: returnRole(localStorage.getItem("accessToken")),
    // token: localStorage.getItem("accessToken"),
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerRegister.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(customerRegister.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.customerInfo = decodeToken(action.payload.token);
      })
      .addCase(customerRegister.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(customerLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.customerInfo = decodeToken(action.payload.token);
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = customerReducer.actions;

export default customerReducer.reducer;
