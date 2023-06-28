import { createSlice } from "@reduxjs/toolkit";
import { getInitDataThunk } from "./thunk";

export type categoryType = {
    [key: string]: categoryType | number;
};

const initialState: {
    serverStatus: "connect" | "disconnect" | "pending" | "init";
    category: categoryType;
} = {
    serverStatus: "init",
    category: {
        "لوازم جانبی موبایل": {
            "کابل شارژر": 0,
            "شارژر فندکی": 1,
            "شارژر وایرلس": 2,
            "کابل AUX": 3,
            هولدر: 4,
            پاوربانک: 5,
            "ساعت هوشمند": 6,
            "ساعت مچی": 7,
            "هدفون سیمی": 8,
            "هدفون بلوتوثی": 9,
            "هندزفری سیمی": 10,
            "هندزفری بلوتوثی": 11,
            "اسپیکر بلوتوثی": 12,
            "اسپیکر سیمی": 13,
            "موس بیسیم": 14,
            "موس بلوتوثی": 15,
            "کیبورد بیسیم": 16,
            "کیبورد بلوتوثی": 17,
            "کول پد": 18,
            "کیف لپتاب": 19,
        },
        مانیتور: {
            نو: 20,
            استوک: 21,
        },
        پرینتر: {
            نو: 22,
            استوک: 23,
        },
        لپتاب: {
            نو: 24,
            استوک: 25,
        },
        "مینی کیس": 26,
        "موبایل و تبلت": 27,
    },
};

const coreSlice = createSlice({
    name: "coreSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getInitDataThunk.rejected, (state) => {
            state.serverStatus = "disconnect";
        });
        builder.addCase(getInitDataThunk.pending, (state) => {
            state.serverStatus = "pending";
        });
    },
});

export default coreSlice.reducer;
