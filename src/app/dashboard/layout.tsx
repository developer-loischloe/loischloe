import React from "react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import { getLoggedInUser } from "@/appwrite/serverSDK/appwriteServerAccountClient";
import LayoutWrapper from "./LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user || !user.labels.includes("admin")) {
    redirect("/signin");
  }

  return (
    <div className={`${inter.className}`}>
      <LayoutWrapper user={user}>{children}</LayoutWrapper>
    </div>
  );
};

export default Dashboardlayout;
