import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Whatsapp from "../(pages)/Whatsapp";
import ReduxProvider from "../(pages)/ReduxProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <Header />
      <main>{children}</main>
      <Whatsapp />
      <Footer />
    </ReduxProvider>
  );
};

export default layout;
