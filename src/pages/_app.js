import { Provider } from "react-redux";
import store from "@/redux/store";
import "@/styles/global.css";
import Layout from "@/components/Layout/Layout";
import { Mulish } from "next/font/google";
import ThemeToggle from "@/components/Theme/ThemeToggle";

const openSans = Mulish({ subsets: ["cyrillic"] });

function MyApp({ Component, pageProps }) {
  return (
    // <ThemeToggle>
      <Provider store={store}>
        <main className={openSans.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Provider>
    // </ThemeToggle>
  );
}

export default MyApp;
