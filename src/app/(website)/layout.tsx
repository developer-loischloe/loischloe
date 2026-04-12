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

import { globalMetaDataConstant } from "../constant";

// Fonts
const belleza = Belleza({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-belleza",
  display: "swap",
});

const ooh_baby = Oooh_Baby({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ooh_baby",
  display: "swap",
});

const { title, description, keywords, website_name, website_url } =
  globalMetaDataConstant;

// Metadata
export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "LOIS CHLOE",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "LOIS CHLOE" }],
  creator: "LOIS CHLOE",
  publisher: "LOIS CHLOE Bangladesh",
  title: {
    template: `%s | LOIS CHLOE Bangladesh`,
    default: title,
  },
  description: description,
  keywords: keywords,
  metadataBase: new URL(website_url),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "LOIS CHLOE \u2014 Cruelty-Free Vegan Makeup from Australia",
    description:
      "Shop LOIS CHLOE\u2019s 100% vegan, cruelty-free makeup. Australian quality, delivered in Bangladesh.",
    url: website_url,
    siteName: website_name,
    images: [
      {
        url: website_url + "/og_image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOIS CHLOE \u2014 Cruelty-Free Vegan Makeup from Australia",
    description:
      "Shop LOIS CHLOE\u2019s 100% vegan, cruelty-free makeup. Australian quality, delivered in Bangladesh.",
    site: "@loischloe",
    creator: "@loischloe",
    images: [
      {
        url: website_url + "/og_image.png",
      },
    ],
  },
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
