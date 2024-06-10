import { Suspense } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";
import Whatsapp from "./Whatsapp";
import FreeGiftModal from "@/components/Shared/FreeGiftModal";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <ReactScrollToTop />
      <Whatsapp />
      <FreeGiftModal />
    </ReduxProvider>
  );
};

export default layout;
