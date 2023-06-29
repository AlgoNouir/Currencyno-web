import { axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const accountThunk = createAsyncThunk(
    "account",
    async (state, action) => {}
);

export const addToCartThunk = createAsyncThunk(
    "addToCartThunk",
    async (actionData: { id: number }, { rejectWithValue }) => {
        const response = await axiosUser.post("user/", { id: actionData.id });

        if (response.status === 202) {
            return actionData;
        } else {
            return rejectWithValue(response.status);
        }
    }
);
