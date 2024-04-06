import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";

import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import FacebookMessanger from "./FacebookMessanger";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
      <ReactScrollToTop />
      <Toaster />
      <FacebookMessanger />
    </ReduxProvider>
  );
};

export default layout;
