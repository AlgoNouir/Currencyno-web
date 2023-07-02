import { createSlice } from "@reduxjs/toolkit";

export enum OrderStatusEnum {
    "در حال بررسی سفارش",
    "در حال آماده سازی",
    "ارسال شده",
    "سفارش انجام شده",
}

export type orderType = {
    id: number;
    product: number;
    count: number;
    orderStatus: OrderStatusEnum;
};

const initialState: orderType[] = [];

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
});

export default orderSlice.reducer;
