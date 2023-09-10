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
import { getInitDataThunk } from "../core/thunk";

export interface OrderProduct {
  id: number;
  product: number;
  count: number;
  select?: number;
}

export type categoryType = {
  id: number;
  parent?: number;
  name: string;
};

export type userType = {
  id: number;
  fName: string;
  lName: string;
  address: string;
  phone: number;
  email?: string;
  nationalCode?: string;
  access: string;
  refresh: string;
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
  category: categoryType[];
  cartProduct: OrderProduct[];
} = {
  login: "inLogin",
  cartProduct: [],
  category: [],
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    addOfflineProduct: (state, action: PayloadAction<OrderProduct>) => {
      const product = state.cartProduct.find(
        (p) => p.product === action.payload.product
      );

      if (product === undefined)
        state.cartProduct = [...state.cartProduct, action.payload];
      else if (action.payload.count === 0)
        state.cartProduct = [
          ...state.cartProduct.filter(
            (p) => p.product !== action.payload.product
          ),
        ];
      else
        state.cartProduct = [
          ...state.cartProduct.filter(
            (p) => p.product !== action.payload.product
          ),
          { ...product, count: action.payload.count },
        ];
    },
    changeAccess: (state, action: PayloadAction<{ access: string }>) => {
      if (state.user) state.user.access = action.payload.access;
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      if (state.user) {
        const product = state.cartProduct.find(
          (p) => p.product === action.payload.product
        );
        if (product && action.payload.count !== 0) {
          state.cartProduct = [
            ...state.cartProduct.filter(
              (p) => p.product !== action.payload.product
            ),
            {
              ...product,
              count: action.payload.count,
            },
          ];
        } else if (action.payload.count === 0) {
          state.cartProduct = [
            ...state.cartProduct.filter(
              (p) => p.product !== action.payload.product
            ),
          ];
        } else {
          state.cartProduct.push(action.payload);
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

      state.cartProduct = action.payload.user.products;
    });
    builder.addCase(cartToOrderThunk.fulfilled, (state) => {
      if (state.user) state.cartProduct = [];
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
    builder.addCase(getInitDataThunk.fulfilled, (state, action) => {
      return {
        ...state,
        category: action.payload.category,
        cartProduct:
          action.payload.cart === undefined
            ? state.cartProduct
            : action.payload.cart,
      };
    });
  },
});

export default accountSlice.reducer;
export const { addOfflineProduct, changeAccess } = accountSlice.actions;
