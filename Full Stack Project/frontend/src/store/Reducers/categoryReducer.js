import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createNewCategory = createAsyncThunk(
  "category/createNewCategory",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const { data } = await api.post("/product/category-add", formData, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/product/category-get", {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    category: [],
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
      .addCase(createNewCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.category = [...state.category, action.payload.category];
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(getCategory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.category = action.payload.categoryInfo;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = categoryReducer.actions;

export default categoryReducer.reducer;
