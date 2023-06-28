import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";

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
    products: OrderProduct[];
};

const initialState: {
    login: "inLogin" | "rejected" | "pending" | "accepted";
    user?: userType;
} = {
    login: "inLogin",
    user: {
        fName: "مهدی",
        lName: "نوری",
        address: [0, 0, "آدرس تستی که از قبل ثبت شده است"],
        phone: 9143707245,
        nationalCode: 1451829159,
        products: [
            {
                id: 0,
                productID: 0,
                price: 20000,
                orderStatus: OrderStatusEnum.pending,
            },
        ],
    },
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {},
});

export default accountSlice.reducer;
