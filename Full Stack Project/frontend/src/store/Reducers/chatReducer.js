import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const customer_add_friends = createAsyncThunk(
  "chat/customer_add_friends",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/customer_add_friends", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message_to_seller = createAsyncThunk(
  "chat/send_message_to_seller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/send_message_to_seller", info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    customer_side: [],
    customer_side_messages: [],
    customer_current_friend: "",
    successMessage: "",
    errorMessage: "",
    loader: false,
    activeSeller: [],
  },

  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, action) => {
      state.customer_side_messages = [
        ...state.customer_side_messages,
        action.payload,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_add_friends.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(customer_add_friends.fulfilled, (state, action) => {
        state.loader = false;
        state.customer_side = action.payload.friendsList;
        state.customer_current_friend = action.payload.currentFriend;
        state.customer_side_messages = action.payload.messages;
      })
      .addCase(send_message_to_seller.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(send_message_to_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.customer_side = action.payload.friendsList;
        state.customer_side_messages = [
          ...state.customer_side_messages,
          action.payload.newMessage,
        ];
        state.successMessage = "Message Send Success";
      });
  },
});

export const { messageClear } = chatReducer.actions;
export const { updateMessage } = chatReducer.actions;

export default chatReducer.reducer;
