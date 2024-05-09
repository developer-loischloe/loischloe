import React from "react";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const Rootlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default Rootlayout;
