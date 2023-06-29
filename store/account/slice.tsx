import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";
import { addToCartThunk } from "./thunk";

export enum OrderStatusEnum {
    "pending",
    "done",
}

export interface OrderProduct {
    id: number;
    productID: number;
    price: number;
    orderStatus: OrderStatusEnum;
}

export type userType = {
    fName: string;
    lName: string;
    address: [number, number, string];
    phone: number;
    email?: string;
    nationalCode?: number;
    inCart: number[];
    products: OrderProduct[];
};

const initialState: {
    login: "inLogin" | "rejected" | "pending" | "accepted";
    user?: userType;
} = {
    login: "inLogin",
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addToCartThunk.fulfilled, (state, action) => {
            if (state.user) state.user.inCart.push(action.payload.id);
        });
    },
});

export default accountSlice.reducer;
