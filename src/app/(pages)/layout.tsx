import { Suspense } from "react";
import dynamic from "next/dynamic";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";

const FacebookMessanger = dynamic(() => import("./FacebookMessanger"), {
  ssr: false,
});

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
