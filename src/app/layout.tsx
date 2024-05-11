import React from "react";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(() => import("@/context/authContext"), {
  ssr: false,
});

import "./globals.css";

const Rootlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
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
