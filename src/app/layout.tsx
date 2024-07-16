import React from "react";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";

const AuthProvider = dynamic(() => import("@/context/authContext"), {
  ssr: false,
});

import "./globals.css";
// React Rating CSS
import "@smastrom/react-rating/style.css";

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
      </head>

      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
