import { createSlice } from "@reduxjs/toolkit";
import { getInitDataThunk } from "../core/thunk";

export enum produvtDelivery {
  "تحویل با پست",
}

export type keeperCounterType = {
  id: number;
  amount: number;
  name: string;
};

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
  counts: keeperCounterType[];
  original: boolean;
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
      (state, action) => action.payload.products
    );
  },
});

export default productSlice.reducer;
