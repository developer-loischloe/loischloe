import React from "react";
import { Inter } from "next/font/google";

import LayoutWrapper from "./LayoutWrapper";
import { AdminProtectedRoute } from "@/context/authContext";

// Font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className}`}>
      <AdminProtectedRoute>
        <LayoutWrapper>{children}</LayoutWrapper>
      </AdminProtectedRoute>
    </div>
  );
};

export default Dashboardlayout;
