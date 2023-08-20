import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../account/thunk";
import { cartToOrderThunk } from "./thunk";
import { productType } from "../product/slice";
import { OrderProduct } from "../account/slice";

export enum OrderStatusEnum {
  "در حال بررسی سفارش",
  "در حال آماده سازی",
  "ارسال شده",
  "سفارش انجام شده",
}

export type orderType = {
  id: number;
  created_at: Date;
  price: number;
  count: number;
  done: OrderStatusEnum;
  products: OrderProduct[];
};

const initialState: orderType[] = [];

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      return action.payload.orders;
    });
  },
});

export default orderSlice.reducer;
