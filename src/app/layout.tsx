import React from "react";
import type { Viewport } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";
import { MetaPixel } from "@/components/MetaPixel";

const AuthProvider = dynamic(() => import("@/context/authContext"), {
  ssr: false,
});

import "./globals.css";
// React Rating CSS
import "@smastrom/react-rating/style.css";
import "react-phone-number-input/style.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2D3436",
};

const Rootlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="tItO_atbw0P1IaSATXuSK_6L09tFfeUDSsqVgumT_KI"
        />
        <meta
          name="facebook-domain-verification"
          content="rteyu9fb0qubnvlzlec9f0j0h6x61i"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>
        <AuthProvider>
          <MetaPixel />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
