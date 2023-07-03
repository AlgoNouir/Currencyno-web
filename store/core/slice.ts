import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getInitDataThunk } from "./thunk";
import { changeAccountDataThunk } from "../account/thunk";

export type categoryType = {
    [key: string]: {
        id: number;
        parent?: number;
        icon?: any;
        depth: number;
    };
};

const initialState: {
    serverStatus: "connect" | "disconnect" | "pending" | "init";
    notif: {
        title: string;
        message: string;
        type: "error" | "success" | "info" | "";
    };
    category: categoryType;
} = {
    serverStatus: "init",
    notif: { title: "", message: "", type: "" },
    category: {
        "لوازم جانبی موبایل": {
            id: 0,
            depth: 0,
        },
        شارژر: {
            id: 21,
            depth: 0,
            parent: 0,
        },
        "شارژر فندکی": { id: 1, depth: 1, parent: 21 },
        "شارژر وایرلس": { id: 2, depth: 1, parent: 21 },
        "کابل AUX": { id: 3, depth: 1, parent: 0 },
        هولدر: { id: 4, depth: 1, parent: 0 },
        پاوربانک: { id: 5, depth: 1, parent: 21 },
        "ساعت هوشمند": { id: 6, depth: 1, parent: 0 },
        "ساعت مچی": { id: 7, depth: 1, parent: 0 },
        "هدفون سیمی": { id: 8, depth: 1, parent: 0 },
        "هدفون بلوتوثی": { id: 9, depth: 1, parent: 0 },
        "هندزفری سیمی": { id: 10, depth: 1, parent: 0 },
        "هندزفری بلوتوثی": { id: 11, depth: 1, parent: 0 },
        "اسپیکر بلوتوثی": { id: 12, depth: 1, parent: 0 },
        "اسپیکر سیمی": { id: 13, depth: 1, parent: 0 },
        "موس بیسیم": { id: 14, depth: 1, parent: 0 },
        "موس بلوتوثی": { id: 15, depth: 1, parent: 0 },
        "کیبورد بیسیم": { id: 16, depth: 1, parent: 0 },
        "کیبورد بلوتوثی": { id: 17, depth: 1, parent: 0 },
        "کول پد": { id: 18, depth: 1, parent: 0 },
        "کیف لپتاب": { id: 19, depth: 1, parent: 0 },
        "کابل شارژر": { id: 20, depth: 1, parent: 0 },
    },
};

const coreSlice = createSlice({
    name: "coreSlice",
    initialState,
    reducers: {
        setNotif: (
            state,
            action: PayloadAction<{
                title: string;
                message: string;
                type: "error" | "success" | "info" | "";
            }>
        ) => {
            state.notif = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(getInitDataThunk.rejected, (state) => {
            state.serverStatus = "disconnect";
        });
        builder.addCase(getInitDataThunk.pending, (state) => {
            state.serverStatus = "pending";
        });
        builder.addCase(changeAccountDataThunk.fulfilled, (state, action) => {
            state.notif = {
                type: "success",
                title: "ثبت تغیرات کاربر",
                message: "مشخصات کاربر با موفقیت تغییر یافت",
            };
        });
    },
});

export default coreSlice.reducer;
export const { setNotif } = coreSlice.actions;
