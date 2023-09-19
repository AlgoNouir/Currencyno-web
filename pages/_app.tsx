import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Gaurd from "./_gaurd";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosNoUser } from "@/core/axios";
import { MetaTag } from "next-seo/lib/types";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="کارنسینو"
        description="مجموعه خدماتی و فروشگاه آنلاین کارنسینو، تمامی خدمات رزرو کافه در اردبیل، خرید محصولات دیجیتال، اجاره فضا اشتراکی و دیگر خدمات متنوع را در اختیار شما قرار می دهد"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://currencyno.com",
          siteName: "کارنسینو",
        }}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Gaurd>
            <Component {...pageProps} />
          </Gaurd>
        </PersistGate>
      </Provider>
    </>
  );
}
