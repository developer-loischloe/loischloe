import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import { AdminProtectedRoute } from "@/context/authContext";
import LayoutWrapper from "./LayoutWrapper";

// Font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Metadata
export const metadata: Metadata = {
  title: {
    template: `%s | Dashboard | LOISCHLOE`,
    default: `Dashboard | LOISCHLOE`,
  },
  description: "Loischloe Dashboard",
};

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.className}`}>
      <AdminProtectedRoute>
        <LayoutWrapper>{children}</LayoutWrapper>
      </AdminProtectedRoute>
    </div>
  );
};

export default Dashboardlayout;
