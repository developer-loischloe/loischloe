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
});

const ooh_baby = Oooh_Baby({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ooh_baby",
});

const { title, description, keywords, website_name, website_url } =
  globalMetaDataConstant;

// Metadata
export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "LOISCHLOE",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "loischloe admin" }],
  creator: "Md Shamim Hossain",
  title: {
    template: `%s | LOISCHLOE`,
    default: `${title} | LOISCHLOE`,
  },
  description: description,
  keywords: keywords,
  metadataBase: new URL(website_url),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: title,
    description: description,
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
    title: title,
    description: description,
    site: "@loischloe",
    creator: "MD Shamim Hossain",
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
