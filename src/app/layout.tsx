import React from "react";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
