import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const accountThunk = createAsyncThunk(
    "account",
    async (state, action) => {}
);

export const addToCartThunk = createAsyncThunk(
    "addToCartThunk",
    async (actionData: { id: number; count: number }, { rejectWithValue }) => {
        const response = await axiosUser.post("user/", actionData);

        if (response.status === 202) {
            return actionData;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const removeFromCartThunk = createAsyncThunk(
    "removeFromCartThunk",
    async (actionData: { id: number }, { rejectWithValue }) => {
        const response = await axiosUser.put("user/", { id: actionData.id });
    }
);

export const OrderingThunk = createAsyncThunk(
    "OrderingThunk",
    async (_, { rejectWithValue }) => {
        const response = await axiosUser.post("order/");
        if (response.status === 201) {
            return 0;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const loginThunk = createAsyncThunk(
    "loginThunk",
    async (actionData: { code: string }, { rejectWithValue }) => {
        const response = await axiosNoUser.post("api/user/login/", actionData);

        const { access, refresh, user } = response.data;

        axiosUser.defaults.headers.Authorization = `Bearer ${access}`;

        return user;
    }
);
