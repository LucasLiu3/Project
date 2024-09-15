import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// export const customerRegister = createAsyncThunk(
//   "customer/customer_register",
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.post("/customer/customer_register", info, {
//         withCredentials: true,
//       });
//       localStorage.setItem("customerToken", data.token);

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartTotal: 0,
    wishList: [],
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
      });
  },
});

export const { messageClear } = cartReducer.actions;

export default cartReducer.reducer;
