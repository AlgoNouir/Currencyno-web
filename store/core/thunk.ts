import { axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInitDataThunk = createAsyncThunk(
    "getInitData",
    async (_, { rejectWithValue }) => {
        const response = await axiosUser.get("products/");

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);
