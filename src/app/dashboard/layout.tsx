import React from "react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import DashboardSidebar from "@/components/dashboard/Sidebar";
import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import DashboardTopBar from "@/components/dashboard/TopBar";

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
    <div className={`${inter.className} h-full bg-[#f2f2f2] `}>
      <div className="flex h-full">
        <div className="p-5 border-l border-black bg-red-500 h-full">
          <DashboardSidebar />
        </div>
        <div className="flex-1">
          <div className="h-[80px] p-5 bg-white">
            <DashboardTopBar />
          </div>
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
