import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderProduct, OrderStatusEnum } from "./slice";

export const accountThunk = createAsyncThunk(
    "account",
    async (state, action) => {}
);

export const addToCartThunk = createAsyncThunk(
    "addToCartThunk",
    async (
        actionData: { product: number; count: number },
        { rejectWithValue }
    ) => {
        const response = await axiosUser.post("user/", actionData);
        if (response.status === 202) {
            return {
                ...actionData,
                ...response.data,
                orderStatus: OrderStatusEnum.pending,
            };
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
        const response = await axiosNoUser.get("user");

        console.log("response -> ", response.data);

        // axiosUser.data.defaults.headers.Authorization = `Bearer ${access}`;

        console.log(response.data.user);
        // {
        //     last_login: "2023-07-02T08:17:47Z",
        //     phone: 1,
        //     fName: "مهدی",
        //     lName: "نوری",
        //     address: "اردبیل - یک مکان تستی جالب",
        //     lat: 1,
        //     long: 1,
        //     email: "algo.mahdi.nouri@gmail.com",
        //     nationalCode: 1,
        // };

        return response.data.user;
    }
);
