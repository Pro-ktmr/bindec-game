import App, { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>BinDec Game</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
