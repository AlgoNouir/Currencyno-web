import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  academyOrderThunk,
  coffeeOrderThunk,
  fixOrderThunk,
  getInitDataThunk,
  jobOfferOrderThunk,
  jobRequestOrderThunk,
} from "./thunk";
import {
  changeAccountDataThunk,
  loginThunk,
  logoutThunk,
} from "../account/thunk";

export type notifType = {
  title: string;
  message: string;
  type: "error" | "success" | "info" | "warning" | "";
};

const initialState: {
  serverStatus: "connect" | "disconnect" | "pending" | "init";
  notif: notifType;
} = {
  serverStatus: "init",
  notif: { title: "", message: "", type: "" },
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
      state.serverStatus = "connect";
    });
    builder.addCase(changeAccountDataThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "ثبت تغیرات کاربر",
        message: "مشخصات کاربر با موفقیت تغییر یافت",
      };
    });
    builder.addCase(loginThunk.pending, (state, action) => {});
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const { user } = action.payload;
      if (
        user.lName === undefined ||
        user.fName === undefined ||
        user.lName === undefined ||
        user.email === undefined ||
        user.address === undefined ||
        user.lName === null ||
        user.fName === null ||
        user.lName === null ||
        user.email === null ||
        user.address === null
      ) {
        state.notif = {
          type: "warning",
          title: "هشدار کامل نبودن مشخصات",
          message: "برای تکمیل ثبت نام خود لطفا مشخصات کاربری خود را کامل کنید",
        };
      } else {
        state.notif = {
          type: "success",
          title: "ورود موفق",
          message: "با موفقیت وارد حساب کاربری خود شدید",
        };
      }
    });
    builder.addCase(fixOrderThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "درخواست موفق",
        message: "درخواست شما با موفقیت ثبت شد",
      };
    });
    builder.addCase(coffeeOrderThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "درخواست موفق",
        message: "درخواست شما با موفقیت ثبت شد",
      };
    });
    builder.addCase(jobOfferOrderThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "درخواست موفق",
        message: "درخواست شما با موفقیت ثبت شد",
      };
    });
    builder.addCase(jobRequestOrderThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "درخواست موفق",
        message: "درخواست شما با موفقیت ثبت شد",
      };
    });
    builder.addCase(academyOrderThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "درخواست موفق",
        message: "درخواست شما با موفقیت ثبت شد",
      };
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.notif = {
        type: "success",
        title: "خروج از حساب",
        message: "با موفقیت از حساب خود خارج شدید",
      };
    });
  },
});

export default coreSlice.reducer;
export const { setNotif } = coreSlice.actions;
