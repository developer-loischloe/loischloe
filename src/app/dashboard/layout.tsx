import { getLoggedInUser } from "@/appwrite/serverSDK/appwrite";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user) redirect("/signup");

  return (
    <main>
      <div className="flex gap-5">
        <div className="p-5 border-l border-black">
          <DashboardSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default layout;
