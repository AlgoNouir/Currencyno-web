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

export const coffeeOrderThunk = createAsyncThunk(
    "coffeeOrder",
    async (
        actionData: { name: string; phone: number },
        { rejectWithValue }
    ) => {
        const response = await axiosNoUser.post("coffee/", actionData);
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const jobOfferOrderThunk = createAsyncThunk(
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
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const jobRequestOrderThunk = createAsyncThunk(
    "jobRequestOrder",
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
            edjLevel: string;
            edjField: string;
            desc: string;
        },
        { rejectWithValue }
    ) => {
        const response = await axiosNoUser.post("jobRequest/", actionData);
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const academyOrderThunk = createAsyncThunk(
    "academyOrder",
    async (
        actionData: {
            name: string;
            phone: number;
            birthday: number;
            nationalCode: number;
        },
        { rejectWithValue }
    ) => {
        const response = await axiosNoUser.post("academy/", actionData);
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);

export const fixOrderThunk = createAsyncThunk(
    "fixOrder",
    async (
        actionData: { name: string; phone: number },
        { rejectWithValue }
    ) => {
        const response = await axiosNoUser.post("fix/", actionData);
        console.log(response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.status);
        }
    }
);
