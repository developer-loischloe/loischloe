import React from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import { redirect } from "next/navigation";
import DashboardTopBar from "@/components/dashboard/TopBar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();
  console.log(user);

  if (!user || !user.labels.includes("admin")) redirect("/signin");

  return (
    <main>
      <div className="flex gap-5">
        <div className="p-5 border-l border-black">
          <DashboardSidebar />
        </div>
        <div className="flex-1">
          <div>
            <DashboardTopBar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default layout;
