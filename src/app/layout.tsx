import type { Metadata } from "next";
import { Belleza, Oooh_Baby } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

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
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1842837406189813');
fbq('track', 'PageView');
`,
        }}
      />

      <GoogleTagManager gtmId={String(process.env.NEXT_PUBLIC_GTM_ID)} />

      <body className={`${belleza.variable} ${ooh_baby.variable}`}>
        {children}
      </body>
    </html>
  );
}
