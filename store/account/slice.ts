import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productType } from "../product/slice";
import {
  addToCartThunk,
  changeAccountDataThunk,
  loginThunk,
  logoutThunk,
  sendLoginSMS,
} from "./thunk";
import { cartToOrderThunk } from "../order/thunk";

export interface OrderProduct {
  id: number;
  product: number;
  count: number;
  select?: number;
}

export type userType = {
  id: number;
  fName: string;
  lName: string;
  address: string;
  phone: number;
  email?: string;
  nationalCode?: string;
};

const initialState: {
  login:
    | "inLogin"
    | "rejected"
    | "pending"
    | "accepted"
    | "awaitSMS"
    | "smsSended";
  user?: userType;
  products: OrderProduct[];
} = {
  login: "inLogin",
  products: [],
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    addOfflineProduct: (state, action: PayloadAction<OrderProduct>) => {
      const product = state.products.find(
        (p) => p.product === action.payload.product
      );

      if (product === undefined)
        state.products = [...state.products, action.payload];
      else if (action.payload.count === 0)
        state.products = [
          ...state.products.filter((p) => p.product !== action.payload.product),
        ];
      else
        state.products = [
          ...state.products.filter((p) => p.product !== action.payload.product),
          { ...product, count: action.payload.count },
        ];
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      if (state.user) {
        const product = state.products.find(
          (p) => p.product === action.payload.product
        );
        if (product && action.payload.count !== 0) {
          state.products = [
            ...state.products.filter(
              (p) => p.product !== action.payload.product
            ),
            {
              ...product,
              count: action.payload.count,
            },
          ];
        } else if (action.payload.count === 0) {
          state.products = [
            ...state.products.filter(
              (p) => p.product !== action.payload.product
            ),
          ];
        } else {
          state.products.push(action.payload);
        }
      }
    });
    builder.addCase(sendLoginSMS.pending, (state, action) => {
      state.login = "awaitSMS";
    });
    builder.addCase(sendLoginSMS.fulfilled, (state, action) => {
      state.login = "smsSended";
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.login = "rejected";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.login = "accepted";
      state.user = action.payload.user;
      state.products = action.payload.user.products;
    });
    builder.addCase(cartToOrderThunk.fulfilled, (state) => {
      if (state.user) state.products = [];
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = undefined;
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
export const { addOfflineProduct } = accountSlice.actions;
