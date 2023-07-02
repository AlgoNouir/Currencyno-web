import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";
import { addToCartThunk, loginThunk } from "./thunk";

export interface OrderProduct {
    id: number;
    product: number;
    count: number;
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
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addToCartThunk.fulfilled, (state, action) => {
            if (state.user) {
                const product = state.user.products.find(
                    (p) => p.product === action.payload.product
                );
                console.log(action.payload);

                if (product) {
                    state.user.products = [
                        ...state.user.products.filter(
                            (p) => p.product !== action.payload.product
                        ),
                        {
                            ...product,
                            count: action.payload.count,
                        },
                    ];
                } else {
                    state.user.products.push(action.payload);
                }
            }
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            console.log(action.payload);

            state.login = "accepted";
            state.user = action.payload;
        });
    },
});

export default accountSlice.reducer;
