import { axiosNoUser, axiosUser } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInitDataThunk = createAsyncThunk(
    "getInitData",
    async (_, { rejectWithValue }) => {
        const response = await axiosNoUser.get("products/");
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);
