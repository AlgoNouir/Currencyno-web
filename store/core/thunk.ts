import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../store";

export const getInitDataThunk: any = createAsyncThunk(
  "getInitData",
  async (_, { rejectWithValue }) => {
    const user = store.getState().account.user;
    var response = { status: 403, data: {} };

    console.log(user);

    // get data from server with user
    if (user === undefined) response = await axiosNoUser.get("products/");
    else response = await axiosUser.get("productsUser/");

    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const coffeeOrderThunk: any = createAsyncThunk(
  "coffeeOrder",
  async (
    actionData: { name: string; phone: number; desc: string },
    { rejectWithValue }
  ) => {
    const response = await axiosNoUser.post("coffee/", actionData);

    if (response.status === 201) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const jobOfferOrderThunk: any = createAsyncThunk(
  "jobOfferOrder",
  async (
    actionData: {
      name: string;
      email: string;
      phone: number;
      landlinePhone: number;
      organName: string;
      organWork: string;
      cityName: string;
      provinceName: string;
    },
    { rejectWithValue }
  ) => {
    const response = await axiosNoUser.post("jobOffer/", actionData);
    if (response.status === 201) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const jobRequestOrderThunk: any = createAsyncThunk(
  "jobRequestOrder",
  async (
    actionData: {
      name: string;
      email: string;
      phone: number;
      landlinePhone: number;
      cityName: string;
      provinceName: string;
      edjLevel: string;
      edjField: string;
      desc: string;
    },
    { rejectWithValue }
  ) => {
    const response = await axiosNoUser.post("jobRequest/", actionData);
    if (response.status === 201) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const academyOrderThunk: any = createAsyncThunk(
  "academyOrder",
  async (
    actionData: {
      name: string;
      phone: number;
      birthday?: number;
      nationalCode?: number;
    },
    { rejectWithValue }
  ) => {
    const response = await axiosNoUser.post("academy/", actionData);
    if (response.status === 201) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);

export const fixOrderThunk: any = createAsyncThunk(
  "fixOrder",
  async (actionData: { name: string; phone: number }, { rejectWithValue }) => {
    const response = await axiosNoUser.post("fix/", actionData);
    if (response.status === 201) {
      return response.data;
    } else {
      return rejectWithValue(response.status);
    }
  }
);
