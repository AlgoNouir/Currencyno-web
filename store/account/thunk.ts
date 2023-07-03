import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderProduct } from "./slice";

export const addToCartThunk = createAsyncThunk(
    "addToCartThunk",
    async (
        actionData: { product: number; count: number },
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
    async (actionData: { code: string }, { rejectWithValue }) => {
        const response = await axiosNoUser.get("user");
        return response.data;
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
