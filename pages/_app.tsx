import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Gaurd from "./_gaurd";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Gaurd>
                <Component {...pageProps} />
            </Gaurd>
        </Provider>
    );
}
