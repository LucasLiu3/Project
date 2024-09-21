import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const adminLogin = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerRegister = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/seller_register", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerLogin = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/seller_login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);

      // console.log(data);
      // console.log("正确的数据返回");
      return data;
    } catch (error) {
      // console.log(error.response.data);
      // console.log("错误的数据返回");
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

function returnRole(token) {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);

    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    }
    return decodeToken.role;
  }
  return "";
}

const authReducer = createSlice({
  name: "auth",
  initialState: {
    userInfo: "",
    successMessage: "",
    errorMessage: "",
    loader: false,
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(sellerRegister.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(sellerRegister.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(sellerRegister.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(sellerLogin.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_user_info.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.userInfo;
      });
  },
});

export const { messageClear } = authReducer.actions;

export default authReducer.reducer;
