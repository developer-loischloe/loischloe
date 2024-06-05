import type { Metadata } from "next";
import { Belleza, Oooh_Baby } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// Custom Swiper CSS
import "./swipper.css";

// React Rating CSS
import "@smastrom/react-rating/style.css";

// Fonts
const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-belleza",
});

const ooh_baby = Oooh_Baby({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ooh_baby",
});

// Metadata
export const metadata: Metadata = {
  title: "Find the Best Deals on Makeup Products in Bangladesh | Lois Chloe",
  description:
    "Buy makeup products from Lois Chloe at the best prices online. Explore our range of Face Palettes, Foundations, Eyeliners, and more. Shop now for unbeatable deals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleTagManager gtmId={String(process.env.NEXT_PUBLIC_GTM_ID)} />

      <div className={`${belleza.variable} ${ooh_baby.variable}`}>
        {children}
      </div>
    </>
  );
}
