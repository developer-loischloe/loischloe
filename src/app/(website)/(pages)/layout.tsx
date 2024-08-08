import { Suspense } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";
import Whatsapp from "./Whatsapp";
import LoisChloeMarquee from "@/components/Shared/LoisChloeMarquee";
import FreeGift from "./FreeGift";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      {/* <LoisChloeMarquee /> */}
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <ReactScrollToTop />
      <Whatsapp />
      <FreeGift />
    </ReduxProvider>
  );
};

export default layout;
