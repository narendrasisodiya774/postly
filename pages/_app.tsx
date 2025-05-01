import "@/styles/globals.css";
import Head from "next/head"; 
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { Metric } from "web-vitals";
import { UserProvider } from "../context/usercontext";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>

      <Head>
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Postly</title>
        <meta name="description" content="A blog application built with Next.js and TypeScript" />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export function reportWebVitals(metric: Metric) {
  console.log(metric);
}

export default appWithTranslation(App, nextI18NextConfig);

