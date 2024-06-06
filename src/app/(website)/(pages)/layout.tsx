import { Suspense } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";
import Whatsapp from "./Whatsapp";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <ReactScrollToTop />
      {/* <Whatsapp /> */}
    </ReduxProvider>
  );
};

export default layout;
