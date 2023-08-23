import { axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const cartToOrderThunk: any = createAsyncThunk(
  "cartToOrderThunk",
  async (_, { rejectWithValue }) => {
    const response = await axiosUser.get("order");

    if (response.status === 200) {
      return 0;
    } else {
      return rejectWithValue(response.status);
    }
  }
);
