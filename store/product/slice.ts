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
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        keeperCount: 3,
        data: {
            وزن: "۱۷۰ کیلوگرم",
            توان: "۱۷ کیلوات",
            اندازه: "۱۰۰ اینچ",
            تست: "تست",
            نوع: "LED",
            کیفیت: "بسیار بالا",
            محصول: "ایران",
        },
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
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
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
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
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
