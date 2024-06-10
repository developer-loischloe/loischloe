import { Suspense } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";
import Whatsapp from "./Whatsapp";
import FreeGiftModal from "@/components/Shared/FreeGiftModal";
import FreeGiftPopUp from "@/components/FreeGiftPopUp";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      {/* <ReactScrollToTop /> */}
      <Whatsapp />
      <FreeGiftModal />
      <FreeGiftPopUp />
    </ReduxProvider>
  );
};

export default layout;
