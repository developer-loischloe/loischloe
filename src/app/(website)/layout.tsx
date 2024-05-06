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
  title:
    "LOIS CHLOE- Leading Australian makeup brand that embraces beauty within the nature",
  description:
    "LOIS CHLOE is the number one vegan and cruelty free makeup brand based in Australia which blends sustainable makeup choices with a hint of luxury to your daily makeup necessities. They are dedicated to provide you with the best quality high end products with a diverse line up which definitely has something for all and caters to each of your beauty needs.",
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
