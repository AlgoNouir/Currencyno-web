import { useAppDispatch } from "@/store/HOCs";
import { getInitDataThunk } from "@/store/core/thunk";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
    return (
        <Html dir="rtl" lang="fa">
            <Head />
            <body className="bg-bg-100">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
