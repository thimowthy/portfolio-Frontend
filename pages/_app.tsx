import { Layout } from "../components";
import { Toaster } from "react-hot-toast";
import Notifications from "../lib/notifications";
import "../pages/globals.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Notifications />
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
