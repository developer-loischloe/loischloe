import type { Metadata } from "next";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// React Rating CSS
import "@smastrom/react-rating/style.css";

// Custom CSS
import "./swipper.css";
import "./globals.css";

import { Parisienne, Josefin_Sans } from "next/font/google";

export const josefin_Sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin_Sans",
});

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

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
    <html lang="en">
      <body className={`${josefin_Sans.variable} ${parisienne.variable}`}>
        {children}
      </body>
    </html>
  );
}
