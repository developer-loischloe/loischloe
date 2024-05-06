import React from "react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import LayoutWrapper from "./LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user || !user.labels.includes("admin")) {
    redirect("/signin");
  }

  return (
    <div className={`${inter.className} h-full`}>
      <div className="flex bg-[#f2f2f2] h-full">
        <LayoutWrapper user={user}>{children}</LayoutWrapper>
      </div>
    </div>
  );
};

export default Dashboardlayout;
