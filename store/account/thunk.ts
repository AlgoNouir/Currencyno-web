import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderProduct } from "./slice";

export const addToCartThunk = createAsyncThunk(
  "addToCartThunk",
  async (
    actionData: { product: number; count: number; select: number },
    { rejectWithValue }
  ) => {
    const response = await axiosUser.post("cart/", actionData);
    if (response.status === 202) {
      return {
        ...actionData,
        ...response.data,
      };
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (
    actionData: { code: string; phone: number; products: OrderProduct[] },
    { rejectWithValue }
  ) => {
    const response = await axiosNoUser.post("login/", actionData);
    console.log(response.data);

    const { user, access, orders } = response.data;
    axiosUser.defaults.headers.Authorization = `Bearer ${access}`;
    return { user, orders };
  }
);

export const changeAccountDataThunk = createAsyncThunk(
  "changeAccountDataThunk",
  async (
    actionData: {
      fName: string;
      lName: string;
      nationalCode: string;
      email: string;
      address: string;
    },
    { rejectWithValue }
  ) => {
    const response = await axiosUser.put("user/", actionData);
    if (response.status === 204) {
      return actionData;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const sendLoginSMS = createAsyncThunk(
  "sendLoginSMS",
  async (actionData: { phone: number }, { rejectWithValue }) => {
    const response = await axiosNoUser.post("login/", {
      phone: actionData.phone,
    });

    if (response.status === 200) {
      return 200;
    } else {
      rejectWithValue(response.status);
    }
  }
);
