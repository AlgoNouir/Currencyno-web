import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import Script from "next/script";

export default function Document(props: any) {
  const torob = props.__NEXT_DATA__.props.pageProps.torob;

  return (
    <Html dir="rtl" lang="fa">
      <Head>
        {torob !== undefined ? (
          Object.entries(torob).map(([indx, trb]: [string, any]) =>
            trb.name === "image" ? (
              <meta
                key={trb.keyOverride}
                property="og:image"
                content={trb.content}
              />
            ) : (
              <meta
                key={trb.keyOverride}
                name={trb.name}
                content={trb.content}
              />
            )
          )
        ) : (
          <></>
        )}
      </Head>
      <body className="bg-bg-100">
        <Main />
        <NextScript />
      </body>
      <Script type="text/javascript" src={require("@/js/index")} />
    </Html>
  );
}
