import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";

export enum OrderStatusEnum {
    "pending",
    "done",
}

export interface OrderProduct extends productType {
    orderStatus: OrderStatusEnum;
}

export type userType = {
    fName: string;
    lName: string;
    address: [number, number, string];
    phone: number;
    email: string;
    nationalCode: number;
    product: OrderProduct[];
};

const initialState: {
    login: "inLogin" | "rejected" | "pending" | "accepted";
    user?: userType;
} = {
    login: "inLogin",
    user: {
        fName: "مهدی",
        lName: "نوری",
        address: [0, 0, "آدرس تست"],
        phone: 9143707245,
        nationalCode: 1451829159,
        product: [],
        email: "",
    },
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {},
});

export default accountSlice.reducer;
