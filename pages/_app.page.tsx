import Layout from "../components/layout";
import { GoogleAnalytics } from "@next/third-parties/google";

import "../styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </>
  );
}

export default MyApp;
