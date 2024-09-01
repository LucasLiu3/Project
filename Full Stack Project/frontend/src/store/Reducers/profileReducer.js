import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const update_profile_image = createAsyncThunk(
  "auth/update_profile_image",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/update_profile_image", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_shop_info = createAsyncThunk(
  "auth/update_shop_info",
  async (shopInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/update_shop_info", shopInfo, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileReducer = createSlice({
  name: "profile",
  initialState: {
    profile: "",
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

      .addCase(update_profile_image.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(update_profile_image.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.profile = action.payload.updateInfo;
      })
      .addCase(update_shop_info.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(update_shop_info.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.profile = action.payload.updateInfo;
      });
  },
});

export const { messageClear } = profileReducer.actions;

export default profileReducer.reducer;
