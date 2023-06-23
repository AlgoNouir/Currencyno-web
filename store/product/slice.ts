import { createSlice } from "@reduxjs/toolkit";

export enum produvtDelivery {
    "tahvil ba post",
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
    data: {
        [key: string]: string;
    };
};

const initialState: productType[] = [
    {
        id: 0,
        offerPrice: 0,
        image: [],
        persianName:
            "تلویزیون ال ای دی هوشمند جی پلاس مدل GTV-50PU746N سایز 50 اینچ",
        englishName: "test TV",
        garanty: "24 month garanty",
        category: 1,
        price: 28000000,
        deliveryType: 0,
        desc: "",
        keeperCount: 3,
        data: {},
    },
    {
        id: 1,
        offerPrice: 27500000,
        image: [],
        persianName:
            "تلویزیون ال ای دی هوشمند جی پلاس مدل GTV-50PU746N سایز 50 اینچ",
        englishName: "test TV",
        garanty: "24 month garanty",
        category: 1,
        price: 28000000,
        deliveryType: 0,
        desc: "",
        keeperCount: 3,
        data: {},
    },
    {
        id: 2,
        offerPrice: 27500000,
        image: [],
        persianName:
            "تلویزیون ال ای دی هوشمند جی پلاس مدل GTV-50PU746N سایز 50 اینچ",
        englishName: "test TV",
        garanty: "24 month garanty",
        category: 1,
        price: 28000000,
        deliveryType: 0,
        desc: "",
        keeperCount: 3,
        data: {},
    },
];

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
});

export default productSlice.reducer;
