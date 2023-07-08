import { createSlice } from "@reduxjs/toolkit";
import { getInitDataThunk } from "../core/thunk";

export enum produvtDelivery {
    "تحویل با پست",
}

export type productType = {
    id: number;
    image: string[];
    garanty: string;
    category: number;
    persianName: string;
    englishName: string;
    deliveryType: produvtDelivery;
    offerPrice: number;
    price: number;
    desc: string;
    keeperCount: number;
    orginal: boolean;
    data: {
        [key: string]: string;
    };
};

const initialState: productType[] = [];

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getInitDataThunk.fulfilled,
            (state, action) => action.payload
        );
    },
});

export default productSlice.reducer;
