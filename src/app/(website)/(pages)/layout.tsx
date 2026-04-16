import { Suspense } from "react";
import Navbar from "@/components/Redesign/Navbar";
import RedesignFooter from "@/components/Redesign/Footer";
import ReactScrollToTop from "./ReactScrollToTop";
import ReduxProvider from "./ReduxProvider";
import FreeGift from "./FreeGift";
import AiBeautyAssistant from "@/app/agents/ai-beauty-assistant/ui/AiBeautyAssistant";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Suspense>
        <Navbar />
      </Suspense>
      <main className="pt-14 sm:pt-16">{children}</main>
      <RedesignFooter />
      <ReactScrollToTop />
      <FreeGift />
      <AiBeautyAssistant />
    </ReduxProvider>
  );
};

export default layout;
