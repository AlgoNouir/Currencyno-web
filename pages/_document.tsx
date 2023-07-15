import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html dir="rtl" lang="fa">
            <Head />
            <body className="bg-bg-100">
                <div
                    style={{
                        backgroundImage:
                            "url(https://currencyno.storage.iran.liara.space/Core/onlineShopBackgroundWeb.png)",
                    }}
                    className="absolute w-screen top-0 bottom-0 -z-50 opacity-20 h-full"
                ></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
