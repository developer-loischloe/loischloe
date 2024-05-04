import React from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";
import config from "@/config";
import { cookies } from "next/headers";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const userPromise = await fetch(`${config.next_app_base_url}/api/user`, {
    method: "GET",
    credentials: "same-origin",
  });
  const user = await userPromise.json();
  console.log(user);

  console.log(cookies().get("session"));

  if (!user.success) redirect("/signin");

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
