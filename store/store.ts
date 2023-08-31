import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import products from "./product/slice";
import account from "./account/slice";
import core from "./core/slice";
import orders from "./order/slice";

const reducer = {
  products,
  account,
  core,
  orders,
};

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["core"],
};

const persist = persistCombineReducers(persistConfig, reducer);

export const store = configureStore({
  reducer: persist,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
