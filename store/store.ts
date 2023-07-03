import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import products from "./product/slice";
import account from "./account/slice";
import core from "./core/slice";
import orders from "./order/slice";

export const store = configureStore({
    reducer: {
        products,
        account,
        core,
        orders,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
