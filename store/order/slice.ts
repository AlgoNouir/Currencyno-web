import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../account/thunk";
import { OrderProduct } from "../account/slice";
import { getInitDataThunk } from "../core/thunk";

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
    builder.addCase(getInitDataThunk.fulfilled, (state, action) => {
      if (action.payload.orders)
        return action.payload.orders;
      else
        return []
    });
  },
});

export default orderSlice.reducer;
