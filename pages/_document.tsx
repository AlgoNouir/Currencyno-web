import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html dir="rtl" lang="fa">
            <Head></Head>
            <body className="bg-bg-100">
                <Main />
                <NextScript />
            </body>
            <Script type="text/javascript" src={require("@/js/index")} />
        </Html>
    );
}
