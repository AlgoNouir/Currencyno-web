import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";
import { addToCartThunk, changeAccountDataThunk, loginThunk } from "./thunk";
import { cartToOrderThunk } from "../order/thunk";

export interface OrderProduct {
    id: number;
    product: number;
    count: number;
}

export type userType = {
    fName: string;
    lName: string;
    address: string;
    phone: number;
    email?: string;
    nationalCode?: string;
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
                if (product && action.payload.count !== 0) {
                    state.user.products = [
                        ...state.user.products.filter(
                            (p) => p.product !== action.payload.product
                        ),
                        {
                            ...product,
                            count: action.payload.count,
                        },
                    ];
                } else if (action.payload.count === 0) {
                    state.user.products = [
                        ...state.user.products.filter(
                            (p) => p.product !== action.payload.product
                        ),
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
        builder.addCase(cartToOrderThunk.fulfilled, (state) => {
            if (state.user) state.user.products = [];
        });
        builder.addCase(changeAccountDataThunk.fulfilled, (state, action) => {
            if (state.user)
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
        });
    },
});

export default accountSlice.reducer;
