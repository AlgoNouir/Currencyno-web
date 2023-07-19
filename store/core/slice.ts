import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { academyOrderThunk, coffeeOrderThunk, fixOrderThunk, getInitDataThunk, jobOfferOrderThunk, jobRequestOrderThunk } from "./thunk";
import { changeAccountDataThunk, loginThunk } from "../account/thunk";

export type categoryType = {
    id: number;
    parent?: number;
    name: string;
};

const initialState: {
    serverStatus: "connect" | "disconnect" | "pending" | "init";
    notif: {
        title: string;
        message: string;
        type: "error" | "success" | "info" | "warning" | "";
    };
    category: categoryType[];
} = {
    serverStatus: "init",
    notif: { title: "", message: "", type: "" },
    category: [],
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
                type: "error" | "success" | "info" | "warning" | "";
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
        builder.addCase(getInitDataThunk.fulfilled, (state, action) => {
            console.log(action.payload.category);

            state.category = action.payload.category;
        });
        builder.addCase(changeAccountDataThunk.fulfilled, (state) => {
            state.notif = {
                type: "success",
                title: "ثبت تغیرات کاربر",
                message: "مشخصات کاربر با موفقیت تغییر یافت",
            };
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const { user } = action.payload;
            if (
                user.lName === undefined ||
                user.fName === undefined ||
                user.lName === undefined ||
                user.email === undefined ||
                user.address === undefined
            ) {
                state.notif = {
                    type: "warning",
                    title: "هشدار کامل نبودن مشخصات",
                    message:
                        "برای تکمیل ثبت نام خود لطفا مشخصات کاربری خود را کامل کنید",
                };
            }
        });
        builder.addCase(fixOrderThunk.fulfilled, () => {})
        builder.addCase(coffeeOrderThunk.fulfilled, () => {})
        builder.addCase(jobOfferOrderThunk.fulfilled, () => {})
        builder.addCase(jobRequestOrderThunk.fulfilled, () => {})
        builder.addCase(academyOrderThunk.fulfilled, () => {})
    },
});

export default coreSlice.reducer;
export const { setNotif } = coreSlice.actions;
